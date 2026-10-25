import React from 'react';
import { X } from 'lucide-react';
import { BRAND_COUNTS } from '../data/products';

interface CategoryHeaderProps {
  selectedBrand: string;
  onSelectBrand: (brandKey: string) => void;
  activeFilters: {
    category: string;
    stock: string;
    warranty: string;
  };
  onRemoveFilter: (type: 'category' | 'stock' | 'warranty') => void;
  onResetFilters: () => void;
  totalProductsCount: number;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  selectedBrand,
  onSelectBrand,
  activeFilters,
  onRemoveFilter,
  onResetFilters,
  totalProductsCount
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-6 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-4 border-b border-slate-100">
        {/* Left: Section Title with dark green vertical accent */}
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-10 bg-[#073c2c] rounded-full shrink-0 mt-0.5" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mobile Phones
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {totalProductsCount} products available • Official Manufacturer Stock
            </p>
          </div>
        </div>

        {/* Right: Brand Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {BRAND_COUNTS.map((brand) => {
            const isSelected = selectedBrand === brand.key;
            return (
              <button
                key={brand.key}
                onClick={() => onSelectBrand(brand.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#073c2c] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                {brand.key === 'All' ? brand.name : `${brand.name} (${brand.count})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters Row */}
      <div className="pt-4 flex flex-wrap items-center gap-2.5 text-xs">
        <span className="font-extrabold text-[11px] tracking-wider text-slate-400 mr-1 uppercase">
          Active Filters:
        </span>

        {activeFilters.category && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
            Category: {activeFilters.category}
            <button
              onClick={() => onRemoveFilter('category')}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}

        {activeFilters.stock && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
            Stock: {activeFilters.stock}
            <button
              onClick={() => onRemoveFilter('stock')}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}

        {activeFilters.warranty && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
            Warranty: {activeFilters.warranty}
            <button
              onClick={() => onRemoveFilter('warranty')}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}

        <button
          onClick={onResetFilters}
          className="text-[#b91c1c] hover:text-[#991b1b] text-xs font-bold underline underline-offset-2 ml-1 cursor-pointer transition-colors"
        >
          Reset all
        </button>
      </div>
    </div>
  );
};
