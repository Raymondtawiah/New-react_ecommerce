import React from 'react';
import { Flame, ShieldCheck, Award, Truck } from 'lucide-react';

interface SubNavbarProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenWarranty?: () => void;
  onOpenDeals?: () => void;
}

export const SubNavbar: React.FC<SubNavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenWarranty,
  onOpenDeals
}) => {
  const categories = [
    { id: 'mobile', name: 'Mobile Phones' },
    { id: 'laptops', name: 'Laptops & Computers' },
    { id: 'tvs', name: 'Smart TVs & Audio' },
    { id: 'appliances', name: 'Home Appliances' },
    { id: 'accessories', name: 'Accessories' }
  ];

  return (
    <div className="bg-white border-b border-slate-200/90 text-sm overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 py-2">
        {/* Left Categories */}
        <div className="flex items-center gap-1.5 shrink-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 border border-slate-300/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Right Trust & Promotion badges */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-600 shrink-0">
          <button
            onClick={onOpenDeals}
            className="flex items-center gap-1 text-[#dc2626] hover:text-[#991b1b] font-semibold transition-colors cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Hot Deals</span>
          </button>

          <button
            onClick={onOpenWarranty}
            className="flex items-center gap-1 hover:text-[#073c2c] transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Franko Warranty</span>
          </button>

          <div className="flex items-center gap-1 text-slate-600">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Genuine Tech</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fast Nationwide Dispatch</span>
          </div>
        </div>
      </div>
    </div>
  );
};
