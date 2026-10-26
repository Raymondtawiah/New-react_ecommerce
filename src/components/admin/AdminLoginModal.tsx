import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  KeyRound,
  Building2,
  AlertCircle
} from 'lucide-react';
import { DEFAULT_ADMIN_CREDENTIALS } from '../../data/adminData';
import { AdminUser } from '../../types/admin';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (adminUser: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [identifier, setIdentifier] = useState(''); // can be email or username
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleQuickFillAndLogin = () => {
    setIdentifier(DEFAULT_ADMIN_CREDENTIALS.email);
    setPassword(DEFAULT_ADMIN_CREDENTIALS.password);
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        id: 'adm-001',
        username: DEFAULT_ADMIN_CREDENTIALS.username,
        email: DEFAULT_ADMIN_CREDENTIALS.email,
        name: DEFAULT_ADMIN_CREDENTIALS.name,
        role: DEFAULT_ADMIN_CREDENTIALS.role,
        phone: DEFAULT_ADMIN_CREDENTIALS.phone,
        assignedHub: DEFAULT_ADMIN_CREDENTIALS.assignedHub,
        avatar: 'KM',
        lastLogin: 'Just now (Instant Admin Auth)'
      });
      onClose();
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanId = identifier.trim().toLowerCase();
    const isEmailValid = cleanId === DEFAULT_ADMIN_CREDENTIALS.email.toLowerCase();
    const isUsernameValid =
      cleanId === DEFAULT_ADMIN_CREDENTIALS.username.toLowerCase() ||
      cleanId === DEFAULT_ADMIN_CREDENTIALS.altUsername.toLowerCase();

    if (!isEmailValid && !isUsernameValid) {
      setError('Unrecognized admin identifier. Use default email: admin@apextechghana.com or username: admin');
      return;
    }

    if (password !== DEFAULT_ADMIN_CREDENTIALS.password) {
      setError('Incorrect administrator password. Default password is: Admin@Apex2025!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        id: 'adm-001',
        username: DEFAULT_ADMIN_CREDENTIALS.username,
        email: DEFAULT_ADMIN_CREDENTIALS.email,
        name: DEFAULT_ADMIN_CREDENTIALS.name,
        role: DEFAULT_ADMIN_CREDENTIALS.role,
        phone: DEFAULT_ADMIN_CREDENTIALS.phone,
        assignedHub: DEFAULT_ADMIN_CREDENTIALS.assignedHub,
        avatar: 'KM',
        lastLogin: 'Just now'
      });
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header with Dark Forest Green Accent */}
        <div className="bg-gradient-to-r from-[#073c2c] to-[#04281d] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Admin Login Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  ApexTech GH Security Console
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black mt-1">Admin Dashboard Login</h2>
              <p className="text-xs text-emerald-100/80">
                Official Central Management Console for Ghana Hubs & E-Commerce Operations
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body with Scrollable Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Prominent Default Credentials Box */}
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 relative overflow-hidden">
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-black uppercase text-emerald-900 tracking-wide">
                  Default Administrator Credentials
                </span>
              </div>
              <span className="text-[10px] bg-emerald-200/70 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                Pre-configured
              </span>
            </div>

            <p className="text-[11px] text-emerald-800 mb-3 leading-relaxed">
              Use the provided master credentials below or click <strong>1-Click Instant Login</strong> for immediate full admin clearance:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {/* Username */}
              <div className="bg-white border border-emerald-200/80 rounded-xl p-2.5 flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Username
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-800 text-xs">
                    {DEFAULT_ADMIN_CREDENTIALS.username}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(DEFAULT_ADMIN_CREDENTIALS.username, 'username')}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors"
                    title="Copy username"
                  >
                    {copiedField === 'username' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white border border-emerald-200/80 rounded-xl p-2.5 flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Admin Email
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-800 text-[11px] truncate mr-1" title={DEFAULT_ADMIN_CREDENTIALS.email}>
                    {DEFAULT_ADMIN_CREDENTIALS.email}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(DEFAULT_ADMIN_CREDENTIALS.email, 'email')}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors shrink-0"
                    title="Copy email"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="bg-white border border-emerald-200/80 rounded-xl p-2.5 flex flex-col justify-between">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Password
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-800 text-xs">
                    {DEFAULT_ADMIN_CREDENTIALS.password}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(DEFAULT_ADMIN_CREDENTIALS.password, 'password')}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors"
                    title="Copy password"
                  >
                    {copiedField === 'password' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick 1-Click Fill Button */}
            <button
              type="button"
              onClick={handleQuickFillAndLogin}
              disabled={isLoading}
              className="mt-3 w-full bg-[#073c2c] hover:bg-[#05291e] active:scale-[0.99] text-white py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>One-Click Instant Admin Login</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
              Or Sign In Manually
            </span>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                Admin Email or Username
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  {identifier.includes('@') ? (
                    <Mail className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (error) setError('');
                  }}
                  required
                  placeholder="admin@apextechghana.com or admin"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase">
                  Admin Password
                </label>
                <span className="text-[10px] text-slate-400">Default: Admin@Apex2025!</span>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  required
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#b91c1c] hover:bg-[#991b1b] active:scale-[0.99] text-white py-3 rounded-xl text-xs sm:text-sm font-black transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating Administrator...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Access Central Admin Console</span>
                </>
              )}
            </button>
          </form>

          {/* Security Note Footer */}
          <div className="pt-2 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Headquarters: Kwame Nkrumah Circle, Accra, Ghana</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
