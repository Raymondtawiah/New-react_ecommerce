import React from 'react';
import { Truck, Phone, MessageSquare, HelpCircle } from 'lucide-react';

interface HeaderTopBarProps {
  onOpenHelp?: () => void;
  onOpenWhatsApp?: () => void;
}

export const HeaderTopBar: React.FC<HeaderTopBarProps> = ({ onOpenHelp, onOpenWhatsApp }) => {
  return (
    <div className="bg-[#05291f] text-emerald-100 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-emerald-950/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left promo */}
        <div className="flex items-center gap-2 font-medium text-center sm:text-left">
          <Truck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
          <span>
            <strong className="text-white font-semibold">LIMITED OFFER:</strong> Save More With Free Delivery Today
          </span>
        </div>

        {/* Right contact links */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] text-emerald-200/90">
          <a
            href="tel:0302225651"
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>Hotline: <strong className="text-white font-medium">030 222 5651</strong></span>
          </a>

          <span className="text-emerald-700 select-none">|</span>

          <button
            onClick={onOpenWhatsApp}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp: <strong className="text-white font-medium">050 360 7980</strong></span>
          </button>

          <span className="text-emerald-700 select-none">|</span>

          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 text-emerald-400" />
            <span>Need Help?</span>
          </button>
        </div>
      </div>
    </div>
  );
};
