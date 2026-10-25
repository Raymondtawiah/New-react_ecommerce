import React, { useState } from 'react';
import { X, Plus, Smartphone, Check } from 'lucide-react';
import { Product } from '../../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  const [brand, setBrand] = useState('Samsung');
  const [brandCategory, setBrandCategory] = useState('SAMSUNG GALAXY');
  const [name, setName] = useState('');
  const [fullName, setFullName] = useState('');
  const [price, setPrice] = useState<number>(1999);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(2200);
  const [storage, setStorage] = useState('128GB');
  const [ram, setRam] = useState('8GB');
  const [spec1, setSpec1] = useState('5000 mAh');
  const [spec2, setSpec2] = useState('5G Ready');
  const [spec3, setSpec3] = useState('AMOLED 120Hz');
  const [phoneType, setPhoneType] = useState<Product['phoneType']>('samsung-a08');
  const [colorName, setColorName] = useState('Titanium Gray');
  const [badgeText, setBadgeText] = useState('NEW ARRIVAL');
  const [stockStatus, setStockStatus] = useState('In Stock • Accra & Kumasi');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      brand,
      brandCategory: brandCategory || `${brand.toUpperCase()} OFFICIAL`,
      name: name.length > 22 ? name.substring(0, 22) + '...' : name,
      fullName: fullName || name,
      price: Number(price) || 999,
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      rating: 5.0,
      reviewCount: 1,
      badges: [
        {
          text: badgeText || 'NEW ARRIVAL',
          type: badgeText.includes('OFF') ? 'discount' : 'new-arrival',
          bgClass: badgeText.includes('OFF') ? 'bg-[#dc2626] text-white font-bold' : 'bg-[#064e3b] text-white font-bold'
        }
      ],
      specs: [spec1, spec2, spec3].filter(Boolean),
      storage,
      ram,
      stockStatus: stockStatus || 'In Stock • All Showrooms',
      isNewArrival: true,
      hasDiscount: Boolean(originalPrice && originalPrice > price),
      colorName,
      phoneType,
      description: description || 'Certified genuine smartphone with 12 months official Franko warranty.',
      inStockBranches: ['Kwame Nkrumah Circle (Flagship)', 'Adum Kumasi', 'Takoradi Central']
    };

    onAddProduct(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#073c2c] flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Add New Smartphone to Inventory</h3>
                <p className="text-xs text-slate-500">Publish stock across Franko online & showroom channels</p>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Manufacturer / Brand</label>
                <select
                  value={brand}
                  onChange={(e) => {
                    const b = e.target.value;
                    setBrand(b);
                    setBrandCategory(`${b.toUpperCase()} OFFICIAL`);
                  }}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                >
                  <option value="Samsung">Samsung</option>
                  <option value="Tecno Mobile">Tecno Mobile</option>
                  <option value="Infinix">Infinix</option>
                  <option value="Apple iPhone">Apple iPhone</option>
                  <option value="Xiaomi / Redmi">Xiaomi / Redmi</option>
                  <option value="Google Pixel">Google Pixel</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Brand Category Line</label>
                <input
                  type="text"
                  value={brandCategory}
                  onChange={(e) => setBrandCategory(e.target.value)}
                  placeholder="e.g. SAMSUNG GALAXY"
                  className="w-full border border-slate-200 rounded-xl p-2.5 uppercase font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Model Name (Short)</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Galaxy A25 5G"
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Listing Title</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Samsung Galaxy A25 5G (128GB, 8GB RAM)"
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Selling Price (GH₵)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900 focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Original Price (GH₵)</label>
                <input
                  type="number"
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Optional"
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-600 focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="NEW ARRIVAL"
                  className="w-full border border-slate-200 rounded-xl p-2.5 uppercase font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Storage</label>
                <select
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                >
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">RAM</label>
                <select
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                >
                  <option value="4GB">4GB</option>
                  <option value="6GB">6GB</option>
                  <option value="8GB">8GB</option>
                  <option value="12GB">12GB</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">3 Highlight Specs</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={spec1}
                  onChange={(e) => setSpec1(e.target.value)}
                  placeholder="Spec 1 (e.g. 5000 mAh)"
                  className="border border-slate-200 rounded-xl p-2 text-xs focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
                <input
                  type="text"
                  value={spec2}
                  onChange={(e) => setSpec2(e.target.value)}
                  placeholder="Spec 2 (e.g. 50MP OIS)"
                  className="border border-slate-200 rounded-xl p-2 text-xs focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
                <input
                  type="text"
                  value={spec3}
                  onChange={(e) => setSpec3(e.target.value)}
                  placeholder="Spec 3 (e.g. 5G Ready)"
                  className="border border-slate-200 rounded-xl p-2 text-xs focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Display Model Style</label>
                <select
                  value={phoneType}
                  onChange={(e) => setPhoneType(e.target.value as Product['phoneType'])}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                >
                  <option value="samsung-a18">Samsung Series (Modern Triple Ring)</option>
                  <option value="samsung-a08">Mint Green Duo</option>
                  <option value="tecno-spark20">Matte Titanium Pro</option>
                  <option value="infinix-note40">Champagne Gold (MagCharge)</option>
                  <option value="infinix-smart20">Sunrise Gold</option>
                  <option value="iphone-15">Titanium Blue (Dynamic Island)</option>
                  <option value="redmi-note13">Mint Ice Blue</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Color Finish</label>
                <input
                  type="text"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="e.g. Titanium Gray"
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#073c2c] hover:bg-[#05291e] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Publish to Franko Store</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
