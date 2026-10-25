import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit3, ExternalLink, Check, RefreshCw } from 'lucide-react';
import { Product } from '../../types';
import { PhoneGraphic } from '../PhoneGraphics';

interface VendorProductsProps {
  products: Product[];
  onOpenAddProduct: () => void;
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onDeleteProduct: (productId: string) => void;
  onViewProductOnStorefront: (product: Product) => void;
}

export const VendorProducts: React.FC<VendorProductsProps> = ({
  products,
  onOpenAddProduct,
  onUpdateProductPrice,
  onDeleteProduct,
  onViewProductOnStorefront
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPriceInput, setEditPriceInput] = useState<number>(0);

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'All' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    return matchesSearch && matchesBrand;
  });

  const handleStartEdit = (p: Product) => {
    setEditingId(p.id);
    setEditPriceInput(p.price);
  };

  const handleSavePrice = (id: string) => {
    onUpdateProductPrice(id, editPriceInput);
    setEditingId(null);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-5">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Smartphone Catalog & Inventory</h3>
          <p className="text-xs text-slate-500">
            {products.length} smartphone model lines registered under your vendor account
          </p>
        </div>

        <button
          onClick={onOpenAddProduct}
          className="bg-[#073c2c] hover:bg-[#05281d] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Smartphone</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by model, storage, specs..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {['All', 'Samsung', 'Tecno Mobile', 'Infinix', 'Apple iPhone', 'Xiaomi / Redmi'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                selectedBrand === b
                  ? 'bg-[#073c2c] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
              <th className="pb-3 pl-2">Product</th>
              <th className="pb-3">Brand & Category</th>
              <th className="pb-3">Storage / RAM</th>
              <th className="pb-3">Specs</th>
              <th className="pb-3 text-right">Price (GH₵)</th>
              <th className="pb-3">Stock Channel</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                      <div className="scale-40">
                        <PhoneGraphic type={prod.phoneType} />
                      </div>
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">{prod.name}</div>
                      <div className="text-[10px] text-slate-400">{prod.colorName}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3">
                  <span className="font-bold text-slate-700">{prod.brand}</span>
                  <div className="text-[10px] text-slate-400 uppercase">{prod.brandCategory}</div>
                </td>

                <td className="py-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold text-[11px]">
                    {prod.storage} • {prod.ram}
                  </span>
                </td>

                <td className="py-3 text-[11px] text-slate-500 max-w-[150px] truncate">
                  {prod.specs.join(', ')}
                </td>

                <td className="py-3 text-right font-black text-slate-900 tabular-nums">
                  {editingId === prod.id ? (
                    <div className="flex items-center justify-end gap-1">
                      <input
                        type="number"
                        value={editPriceInput}
                        onChange={(e) => setEditPriceInput(Number(e.target.value))}
                        className="w-24 border border-slate-300 rounded px-1.5 py-0.5 text-xs text-right font-bold"
                      />
                      <button
                        onClick={() => handleSavePrice(prod.id)}
                        className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                        title="Save"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-1.5">
                      <span>GH₵ {prod.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      <button
                        onClick={() => handleStartEdit(prod)}
                        className="text-slate-400 hover:text-slate-700 p-0.5"
                        title="Edit price"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate max-w-[120px]">{prod.stockStatus}</span>
                  </div>
                </td>

                <td className="py-3 text-right pr-2">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewProductOnStorefront(prod)}
                      className="p-1.5 text-slate-500 hover:text-[#073c2c] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="View on Customer Storefront"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(prod.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
