import React from 'react';
import { Smartphone, Laptop, Tv, Home, Headphones, Watch, Gamepad2, ChevronRight, X } from 'lucide-react';

interface CategoriesMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (catId: string) => void;
}

export const CategoriesMenu: React.FC<CategoriesMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory
}) => {
  if (!isOpen) return null;

  const categories = [
    {
      id: 'mobile',
      name: 'Mobile Phones & Tablets',
      icon: Smartphone,
      subcategories: ['Samsung Galaxy', 'Tecno Spark & Camon', 'Infinix Note & Hot', 'Apple iPhone', 'Xiaomi / Redmi', 'Google Pixel']
    },
    {
      id: 'laptops',
      name: 'Laptops & Computers',
      icon: Laptop,
      subcategories: ['HP Pavilion & Envy', 'Dell Inspiron & XPS', 'Lenovo ThinkPad', 'Apple MacBook', 'Asus ROG Gaming']
    },
    {
      id: 'tvs',
      name: 'Smart TVs & Soundbars',
      icon: Tv,
      subcategories: ['Samsung Crystal UHD', 'LG OLED & QNED', 'TCL Google TVs', 'JBL Soundbars', 'Home Theatres']
    },
    {
      id: 'appliances',
      name: 'Home Appliances',
      icon: Home,
      subcategories: ['Refrigerators & Freezers', 'Washing Machines', 'Microwaves', 'Air Conditioners', 'Blenders & Juicers']
    },
    {
      id: 'accessories',
      name: 'Accessories & Wearables',
      icon: Headphones,
      subcategories: ['Power Banks & MagSafe', 'AirPods & Earbuds', 'Smart Watches', 'Phone Cases & Screen Protectors', 'Original Fast Chargers']
    }
  ];

  return (
    <div className="absolute top-full left-0 right-0 sm:left-4 sm:right-auto sm:w-[480px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 mt-2">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
          All Department Categories
        </h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onClose();
              }}
              className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#073c2c] group-hover:bg-[#073c2c] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#073c2c]">
                      {cat.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                      {cat.subcategories.slice(0, 3).join(', ')}...
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
