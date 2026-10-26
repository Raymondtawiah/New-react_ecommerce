import React, { useState } from 'react';
import { X, Plus, Layers, Laptop, Tv, Home, Headphones, Smartphone, Upload, Check, Trash2, Camera } from 'lucide-react';
import { Product, TechCategory, ProductImageAngles } from '../../types';

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
  const [category, setCategory] = useState<TechCategory>('mobile');
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
  const [graphicType, setGraphicType] = useState('samsung-a08');
  const [colorName, setColorName] = useState('Titanium Gray');
  const [badgeText, setBadgeText] = useState('NEW ARRIVAL');
  const [stockStatus, setStockStatus] = useState('In Stock • Accra & Kumasi');
  const [description, setDescription] = useState('');

  // Multi-Angle Image Uploads
  const [uploadedImages, setUploadedImages] = useState<ProductImageAngles>({});

  if (!isOpen) return null;

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>, angleKey: keyof ProductImageAngles) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setUploadedImages((prev) => ({ ...prev, [angleKey]: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (angleKey: keyof ProductImageAngles) => {
    setUploadedImages((prev) => {
      const copy = { ...prev };
      delete copy[angleKey];
      return copy;
    });
  };

  const handleCategoryChange = (newCat: TechCategory) => {
    setCategory(newCat);
    if (newCat === 'laptops') {
      setBrand('HP');
      setBrandCategory('HP COMPUTING');
      setSpec1('16GB RAM');
      setSpec2('512GB SSD');
      setSpec3('Intel Core i7');
      setGraphicType('laptop-hp');
      setPrice(8999);
    } else if (newCat === 'tvs') {
      setBrand('Samsung');
      setBrandCategory('SAMSUNG VISUAL');
      setSpec1('55" 4K UHD');
      setSpec2('Smart Tizen');
      setSpec3('HDR10+');
      setGraphicType('tv-samsung');
      setPrice(6800);
    } else if (newCat === 'appliances') {
      setBrand('Midea');
      setBrandCategory('MIDEA APPLIANCES');
      setSpec1('Inverter Tech');
      setSpec2('R32 Gas');
      setSpec3('Energy Class A+');
      setGraphicType('appliance-ac');
      setPrice(4500);
    } else if (newCat === 'accessories') {
      setBrand('Oraimo');
      setBrandCategory('ORAIMO SMART');
      setSpec1('Fast Charge');
      setSpec2('LED Display');
      setSpec3('Multi-Port');
      setGraphicType('accessory-powerbank');
      setPrice(350);
    } else {
      setBrand('Samsung');
      setBrandCategory('SAMSUNG GALAXY');
      setSpec1('5000 mAh');
      setSpec2('5G Ready');
      setSpec3('AMOLED 120Hz');
      setGraphicType('samsung-a08');
      setPrice(2200);
    }
  };

  const getCategoryName = (cat: TechCategory) => {
    switch (cat) {
      case 'laptops': return 'Laptops & Computers';
      case 'tvs': return 'Smart TVs & Audio';
      case 'appliances': return 'Home Appliances';
      case 'accessories': return 'Accessories & Wearables';
      case 'mobile':
      default:
        return 'Mobile Phones';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      category,
      categoryName: getCategoryName(category),
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
      graphicType,
      phoneType: graphicType,
      description: description || `Certified authentic ${getCategoryName(category)} backed by 12 months official ApexTech warranty.`,
      inStockBranches: ['Kwame Nkrumah Circle (Flagship)', 'Adum Kumasi', 'Takoradi Central'],
      uploadedImages
    };

    onAddProduct(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-200 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#073c2c] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Add Technology & Accessory Item</h3>
                <p className="text-xs text-slate-500">With multi-angle photos (front, back, side & packaging)</p>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Category Selector Buttons */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5 uppercase text-[11px]">Department Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {[
                  { id: 'mobile', label: 'Phones', icon: Smartphone },
                  { id: 'laptops', label: 'Laptops', icon: Laptop },
                  { id: 'tvs', label: 'Smart TVs', icon: Tv },
                  { id: 'appliances', label: 'Appliances', icon: Home },
                  { id: 'accessories', label: 'Accessories', icon: Headphones }
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => handleCategoryChange(c.id as TechCategory)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        category === c.id
                          ? 'border-[#073c2c] bg-emerald-50 text-emerald-950 font-bold ring-1 ring-[#073c2c]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-bold">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MULTI-ANGLE IMAGE UPLOADER SECTION */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                    Multi-Angle Product Photos (Front, Back)
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {Object.keys(uploadedImages).length} of 2 Angles Added
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Upload images of the product from all 4 mandatory perspectives so customers can inspect every detail before purchase.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 1. Front View */}
                <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col items-center text-center relative group">
                  <span className="text-[10px] font-bold text-slate-600 mb-1.5">1. Front Display</span>
                  {uploadedImages.front ? (
                    <div className="relative w-full h-20 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center bg-slate-50">
                      <img src={uploadedImages.front} alt="Front" className="h-full w-full object-contain" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage('front')}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-md opacity-80 hover:opacity-100 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-20 border-2 border-dashed border-slate-200 hover:border-emerald-600 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors p-1">
                      <Upload className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 mb-1" />
                      <span className="text-[9px] text-slate-500 font-medium">Upload Front</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFile(e, 'front')} />
                    </label>
                  )}
                </div>

                {/* 2. Back View */}
                <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col items-center text-center relative group">
                  <span className="text-[10px] font-bold text-slate-600 mb-1.5">2. Back & Finish</span>
                  {uploadedImages.back ? (
                    <div className="relative w-full h-20 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center bg-slate-50">
                      <img src={uploadedImages.back} alt="Back" className="h-full w-full object-contain" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage('back')}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-md opacity-80 hover:opacity-100 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-20 border-2 border-dashed border-slate-200 hover:border-emerald-600 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors p-1">
                      <Upload className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 mb-1" />
                      <span className="text-[9px] text-slate-500 font-medium">Upload Back</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFile(e, 'back')} />
                    </label>
                  )}
                </div>

              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Manufacturer / Brand</label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setBrandCategory(`${e.target.value.toUpperCase()} OFFICIAL`);
                  }}
                  placeholder="e.g. Samsung, Apple, HP, Midea, Oraimo"
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Brand Category Line</label>
                <input
                  type="text"
                  value={brandCategory}
                  onChange={(e) => setBrandCategory(e.target.value)}
                  placeholder="e.g. HP COMPUTING"
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
                  placeholder="e.g. MacBook Air M3"
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
                  placeholder="e.g. Apple MacBook Air 13.6-Inch Liquid Retina (16GB RAM, 512GB SSD)"
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
                  placeholder="POPULAR"
                  className="w-full border border-slate-200 rounded-xl p-2.5 uppercase font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">3 Highlight Specs</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={spec1}
                  onChange={(e) => setSpec1(e.target.value)}
                  placeholder="Spec 1 (e.g. 16GB RAM)"
                  className="border border-slate-200 rounded-xl p-2 text-xs focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
                <input
                  type="text"
                  value={spec2}
                  onChange={(e) => setSpec2(e.target.value)}
                  placeholder="Spec 2 (e.g. 512GB SSD)"
                  className="border border-slate-200 rounded-xl p-2 text-xs focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
                <input
                  type="text"
                  value={spec3}
                  onChange={(e) => setSpec3(e.target.value)}
                  placeholder="Spec 3 (e.g. 4K UHD)"
                  className="border border-slate-200 rounded-xl p-2 text-xs focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Visual Mockup Silhouette</label>
                <select
                  value={graphicType}
                  onChange={(e) => setGraphicType(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium focus:ring-1 focus:ring-[#073c2c] focus:outline-none"
                >
                  <option value="samsung-a08">Smartphone (Dual Camera)</option>
                  <option value="iphone-15">iPhone / Titanium Phone</option>
                  <option value="laptop-macbook">MacBook / Silver Ultrabook</option>
                  <option value="laptop-hp">HP / Dark Laptop</option>
                  <option value="tv-samsung">Smart TV (4K UHD)</option>
                  <option value="audio-soundbar">Soundbar with Subwoofer</option>
                  <option value="appliance-fridge">Inverter Refrigerator</option>
                  <option value="appliance-ac">Split Air Conditioner</option>
                  <option value="accessory-powerbank">Fast Charge Power Bank</option>
                  <option value="accessory-smartwatch">Smartwatch (Activity Rings)</option>
                  <option value="accessory-earbuds">Wireless Earbuds in Case</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Color / Finish</label>
                <input
                  type="text"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="e.g. Space Gray, Arctic White, Matte Black"
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
                <span>Publish to ApexTech Store</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
