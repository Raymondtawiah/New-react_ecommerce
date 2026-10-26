import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onClose?: () => void;
  onLogin?: (email: string, password: string) => void;
  onSignUp?: (name: string, email: string, password: string) => void;
  onAuthSuccess?: (data: any) => void;
  onVendorLogin?: (vendor: any) => void;
  onRiderLogin?: (rider: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onClose, onLogin, onSignUp, onAuthSuccess, onVendorLogin, onRiderLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'vendor'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vendorCode, setVendorCode] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'vendor') {
        const res = await fetch('/api/vendors/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: vendorCode }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Vendor login failed');
        if (data.type === 'rider') onRiderLogin?.(data.vendor);
        else onVendorLogin?.(data.vendor);
        onClose?.();
        return;
      }
      if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        onAuthSuccess?.(data);
        onLogin?.(email, password);
        onClose?.();
      } else {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Signup failed');
        onSignUp?.(name, email, password);
        onClose?.();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="relative bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-slate-200">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {mode === 'login'
              ? 'Sign in to your ApexTech Ghana account'
              : 'Join ApexTech Ghana today'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#073c2c] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-[#073c2c] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setMode('vendor')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'vendor'
                ? 'bg-white text-[#073c2c] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Vendor Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'vendor' ? (
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                Vendor Unique Code
              </label>
              <input
                type="text"
                value={vendorCode}
                onChange={(e) => setVendorCode(e.target.value)}
                required
                placeholder="VND-XXXXXX-XXXX"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073c2c]/30 focus:border-[#073c2c]"
              />
            </div>
          ) : (
            <>
              {mode === 'signup' && (
                <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073c2c]/30 focus:border-[#073c2c]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073c2c]/30 focus:border-[#073c2c]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073c2c]/30 focus:border-[#073c2c]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

           {error && <p className="text-sm text-red-600">{error}</p>}

          </>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            {(mode as 'login' | 'signup' | 'vendor') === 'vendor' ? 'Vendor Login' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-[#073c2c] font-bold hover:underline cursor-pointer"
          >
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
         </p>
       </div>
     </div>
   );
 };

export default Login;
