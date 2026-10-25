import React, { useState } from 'react';
import { ChevronDown, ArrowUpDown, ShieldCheck } from 'lucide-react';
import { FilterState } from '../types';

interface SidebarFiltersProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onApplyPrice: () => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filterState,
  onFilterChange,
  onApplyPrice
}) => {
  const [minInput, setMinInput] = useState<number>(filterState.minPrice);
  const [maxInput, setMaxInput] = useState<number>(filterState.maxPrice);

  const manufacturerOptions = [
    { name: 'Samsung', count: 34 },
    { name: 'Tecno Mobile', count: 28 },
    { name: 'Infinix', count: 19 },
    { name: 'Apple iPhone', count: 12 },
    { name: 'Xiaomi / Redmi', count: 8 }
  ];

  const storageOptions = [
    { label: '4GB / 64GB', value: '4GB / 64GB' },
    { label: '4GB / 128GB', value: '4GB / 128GB' },
    { label: '8GB / 256GB', value: '8GB / 256GB' },
    { label: '12GB / 512GB', value: '12GB / 512GB' }
  ];

  const handleToggleManufacturer = (name: string) => {
    const exists = filterState.manufacturers.includes(name);
    let updated: string[];
    if (exists) {
      updated = filterState.manufacturers.filter((m) => m !== name);
    } else {
      updated = [...filterState.manufacturers, name];
    }
    onFilterChange({ manufacturers: updated });
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ minPrice: Number(minInput) || 0, maxPrice: Number(maxInput) || 20000 });
    onApplyPrice();
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-5">
      {/* 1. Sort By Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
        <label className="block text-xs font-bold text-slate-800 mb-2">
          Sort by
        </label>
        <div className="relative">
          <select
            value={filterState.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#073c2c] cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 2. Price Range */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-900">Price range</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GH₵ CEDI</span>
        </div>

        <form onSubmit={handlePriceApply} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase">MIN</label>
              <div className="flex items-center bg-slate-100 rounded-lg px-2 py-1.5 border border-slate-200 text-xs font-bold text-slate-800">
                <span className="text-slate-400 mr-1">₵</span>
                <input
                  type="number"
                  value={minInput}
                  onChange={(e) => setMinInput(Number(e.target.value))}
                  className="w-full bg-transparent focus:outline-none font-bold text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase">MAX</label>
              <div className="flex items-center bg-slate-100 rounded-lg px-2 py-1.5 border border-slate-200 text-xs font-bold text-slate-800">
                <span className="text-slate-400 mr-1">₵</span>
                <input
                  type="number"
                  value={maxInput}
                  onChange={(e) => setMaxInput(Number(e.target.value))}
                  className="w-full bg-transparent focus:outline-none font-bold text-xs"
                />
              </div>
            </div>
          </div>

          {/* Range Slider Track */}
          <div className="pt-2">
            <input
              type="range"
              min="0"
              max="20000"
              step="250"
              value={maxInput}
              onChange={(e) => {
                setMaxInput(Number(e.target.value));
                onFilterChange({ maxPrice: Number(e.target.value) });
              }}
              className="w-full accent-[#073c2c] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
              <span>GH₵ 0</span>
              <span>GH₵ 20,000+</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#073c2c] hover:bg-[#052c20] text-white rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-xs"
          >
            Apply price
          </button>
        </form>
      </div>

      {/* 3. Discounted Only Toggle */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-sm">🏷</span>
          <span className="text-xs font-bold text-slate-800">Discounted only</span>
        </div>
        <button
          type="button"
          onClick={() => onFilterChange({ discountedOnly: !filterState.discountedOnly })}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            filterState.discountedOnly ? 'bg-[#dc2626]' : 'bg-slate-300'
          }`}
          role="switch"
          aria-checked={filterState.discountedOnly}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              filterState.discountedOnly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* 4. Manufacturer */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-900">Manufacturer</span>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">SELECT</span>
        </div>
        <div className="space-y-2.5">
          {manufacturerOptions.map((brand) => {
            const isChecked = filterState.manufacturers.includes(brand.name);
            return (
              <label
                key={brand.name}
                className="flex items-center justify-between text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer select-none group"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleManufacturer(brand.name)}
                    className="w-4 h-4 rounded text-[#073c2c] border-slate-300 focus:ring-[#073c2c] accent-[#073c2c] cursor-pointer"
                  />
                  <span className={isChecked ? 'font-bold text-slate-900' : 'text-slate-700'}>
                    {brand.name}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold group-hover:text-slate-600">
                  {brand.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Storage & RAM */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
        <label className="block text-xs font-bold text-slate-900 mb-3">
          Storage & RAM
        </label>
        <div className="grid grid-cols-2 gap-2">
          {storageOptions.map((opt) => {
            const isSelected = filterState.storageRam === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() =>
                  onFilterChange({
                    storageRam: isSelected ? 'all' : opt.value
                  })
                }
                className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#073c2c] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Franko Guarantee Banner Box */}
      <div className="bg-[#07392a] text-white rounded-2xl p-4 shadow-sm border border-emerald-900/40 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h4 className="text-xs font-bold tracking-wide text-white">Franko Guarantee</h4>
        </div>
        <p className="text-[11px] text-emerald-100/90 leading-relaxed font-normal">
          Every smartphone purchased includes an official 12-month manufacturer warranty and repair coverage at our 35 nationwide service hubs.
        </p>
      </div>
    </aside>
  );
};
