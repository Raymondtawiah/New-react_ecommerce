import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Check, Heart, ShoppingBag, MapPin } from 'lucide-react';
import { Product } from '../types';
import { PhoneGraphic } from './PhoneGraphics';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage || '128GB');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Visual Phone Display */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center justify-center relative">
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.badges.map((b, i) => (
                  <span key={i} className={`text-[9px] px-2 py-0.5 rounded uppercase font-bold ${b.bgClass}`}>
                    {b.text}
                  </span>
                ))}
              </div>

              <div className="py-4">
                <PhoneGraphic type={product.phoneType} className="scale-125" />
              </div>

              <span className="text-[11px] font-bold text-slate-500 mt-2">
                Colorway: {product.colorName}
              </span>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {product.brandCategory}
              </span>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {product.fullName}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-black text-slate-900">
                  GH₵ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through font-semibold">
                    GH₵ {product.originalPrice.toLocaleString('en-US')}
                  </span>
                )}
              </div>

              {/* Specs badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {product.specs.map((s, idx) => (
                  <span key={idx} className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Storage options */}
              <div className="mt-4">
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                  Internal Storage
                </label>
                <div className="flex gap-2">
                  {['64GB', '128GB', '256GB'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStorage(st)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                        selectedStorage === st
                          ? 'border-[#073c2c] bg-[#073c2c] text-white shadow-2xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Showroom Availability */}
              <div className="mt-4 bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Available for immediate pickup in:</span>
                </div>
                <div className="text-[11px] text-emerald-800">
                  {product.inStockBranches.join(' • ')}
                </div>
              </div>

              {/* Actions row */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 cursor-pointer font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 cursor-pointer font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer ${
                    isWishlisted ? 'text-[#b91c1c] border-red-200' : 'text-slate-400'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-4 flex items-center gap-4 text-[10px] text-slate-500">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>12M Official Franko Warranty</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ghana Nationwide Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
