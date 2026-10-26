import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  User,
  Search,
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { RETAIL_LOCATIONS, CORPORATE_INFO, REGION_TABS, RetailLocation } from '../data/locations';

interface ShowroomsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowroomsModal: React.FC<ShowroomsModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  if (!isOpen) return null;

  const filtered = RETAIL_LOCATIONS.filter((loc) => {
    const matchesRegion = selectedRegion === 'all' || loc.region === selectedRegion;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      loc.name.toLowerCase().includes(q) ||
      loc.city.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q) ||
      loc.landmark.toLowerCase().includes(q);
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl z-10 border border-slate-200">
          
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  Verified Retail Directory
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                35+ ApexTech Showrooms & Hubs in Ghana
              </h3>
              <p className="text-xs text-slate-500">
                Walk-in device collection, live hardware demonstrations, and certified warranty service
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Region Filters */}
          <div className="mt-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by city (e.g. Accra, Kumasi, Takoradi) or landmark..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#073c2c] focus:bg-white transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {REGION_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedRegion === tab.id
                      ? 'bg-[#073c2c] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Showroom Cards List */}
          <div className="mt-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No retail showroom found matching &ldquo;{search}&rdquo;. Try another search term or select &ldquo;All Showrooms&rdquo;.
              </div>
            ) : (
              filtered.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-slate-50 hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 rounded-2xl p-3.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#073c2c] shrink-0" />
                        <h4 className="text-xs font-bold text-slate-900">{loc.name}</h4>
                        {loc.isFlagship && (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
                            Flagship
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 pl-6">
                        {loc.address}
                      </p>
                      <p className="text-[11px] text-slate-400 pl-6">
                        Landmark: <span className="text-slate-600">{loc.landmark}</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <a
                        href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#073c2c] bg-white border border-slate-200 px-2.5 py-1 rounded-lg hover:border-emerald-500 transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{loc.phone}</span>
                      </a>
                      <a
                        href={`https://wa.me/233${loc.whatsapp.replace(/^0/, '')}?text=Hello%20ApexTech,%20inquiry%20regarding%20${encodeURIComponent(loc.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 hover:underline"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp Hub</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 pl-6 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{loc.hours}</span>
                    </span>
                    <span className="text-emerald-700 font-medium">
                      ✓ Free 15-min pickup available
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>National Hotline: Mon - Sat: 8:00 AM - 7:30 PM</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[#073c2c]">
              <Phone className="w-4 h-4" />
              <span>{CORPORATE_INFO.phones.hotline1}</span>
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
