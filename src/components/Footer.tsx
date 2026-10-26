import React from 'react';
import { Headphones, ShieldCheck, CreditCard } from 'lucide-react';

interface FooterProps {
  onOpenShowrooms?: () => void;
  onOpenHelp?: () => void;
  onOpenWarranty?: () => void;
  onOpenDeliveryTrack?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenShowrooms,
  onOpenHelp,
  onOpenWarranty,
  onOpenDeliveryTrack
}) => {
  return (
    <footer className="bg-[#021a12] text-slate-300 pt-14 pb-8 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-emerald-900/50">
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-6 bg-emerald-400 rounded-full" />
              <span className="text-lg font-black tracking-tight text-white">
                APEX TECH GHANA
              </span>
            </div>
            <p className="text-xs text-slate-300/80 leading-relaxed">
              Ghana's premier retailer of certified authentic mobile phones, premium laptops, home appliances, and accessories with nationwide fast-dispatch logistics.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <Headphones className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>24/7 Support Desk Available</span>
            </div>
          </div>

          {/* Column 2: Major Retail Hubs */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Major Retail Hubs
            </h4>
            <div className="space-y-3 text-xs text-slate-300/80">
              <p>
                <strong className="text-white font-semibold">Accra:</strong> Kwame Nkrumah Circle, Oxford St. Osu, Madina Market
              </p>
              <p>
                <strong className="text-white font-semibold">Kumasi:</strong> Adum Opposite Central Post, Kejetia Terminal
              </p>
              <p>
                <strong className="text-white font-semibold">Takoradi:</strong> Market Circle Commercial Area
              </p>
              <p>
                <strong className="text-white font-semibold">Tamale:</strong> Central Market Road
              </p>
              <p>
                <strong className="text-white font-semibold">Sunyani & Koforidua:</strong> Central Commercial Strips
              </p>
            </div>
            <button
              onClick={onOpenShowrooms}
              className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
            >
              View all 35 showroom locations →
            </button>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={onOpenHelp}
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-block"
                >
                  Help Center & FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeliveryTrack}
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-block"
                >
                  Track Your Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWarranty}
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-block"
                >
                  Warranty & Service Centers
                </button>
              </li>
              <li>
                <a
                  href="#returns"
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-block"
                >
                  Returns & Replacement Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-block"
                >
                  Terms of Purchase
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Payments */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Verified Payments
            </h4>
            <p className="text-xs text-slate-300/80 leading-relaxed mb-4">
              Safe and instant checkout backed by Ghana Interbank payment rails.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#032a1d] border border-emerald-800/60 rounded-lg px-2.5 py-2 flex items-center gap-1.5 text-[11px] font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>MTN MoMo</span>
              </div>
              <div className="bg-[#032a1d] border border-emerald-800/60 rounded-lg px-2.5 py-2 flex items-center gap-1.5 text-[11px] font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Telecel Cash</span>
              </div>
              <div className="bg-[#032a1d] border border-emerald-800/60 rounded-lg px-2.5 py-2 flex items-center gap-1.5 text-[11px] font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>AT Money</span>
              </div>
              <div className="bg-[#032a1d] border border-emerald-800/60 rounded-lg px-2.5 py-2 flex items-center gap-1.5 text-[11px] font-bold text-white">
                <CreditCard className="w-3.5 h-3.5 text-emerald-300" />
                <span>VISA / Mastercard</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & policy links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2025 ApexTech Ghana Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <span className="text-slate-600">·</span>
            <a href="#security" className="hover:text-slate-200 transition-colors">Security Notice</a>
            <span className="text-slate-600">·</span>
            <a href="#directory" className="hover:text-slate-200 transition-colors">Store Directory</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
