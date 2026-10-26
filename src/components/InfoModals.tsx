import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, ShieldCheck, CheckCircle2, User, KeyRound } from 'lucide-react';
import { GHANA_SHOWROOMS } from '../data/products';

interface ShowroomsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowroomsModal: React.FC<ShowroomsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl z-10 border border-slate-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">35+ ApexTech Showrooms in Ghana</h3>
              <p className="text-xs text-slate-500">Pick up your order or get instant warranty servicing</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {GHANA_SHOWROOMS.map((reg) => (
              <div key={reg.city} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#073c2c]" />
                  <h4 className="text-sm font-bold text-slate-900">{reg.city} Hubs</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {reg.branches.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Mon - Sat: 8:00 AM - 6:30 PM</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[#073c2c]">
              <Phone className="w-4 h-4" />
              <span>030 222 5651</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AccountModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl z-10 border border-slate-200 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#073c2c] flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6" />
          </div>

          <h3 className="text-base font-extrabold text-slate-900">
            {isLoggedIn ? 'Account Active' : 'Sign in to ApexTech Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            {isLoggedIn ? 'Welcome back! You have 120 ApexTech Loyalty Points.' : 'Enter your Ghana phone number to track orders and earn warranty rewards.'}
          </p>

          {isLoggedIn ? (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 font-medium">
                ✓ Signed in with {phoneNumber || '024 456 7890'}
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  onClose();
                }}
                className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-3 text-left">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="024 123 4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#073c2c] hover:bg-[#052c20] text-white py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Sign In / Join
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
