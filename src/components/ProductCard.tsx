import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PhoneGraphic } from './PhoneGraphics';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-200 group relative">
      {/* Top Badges & Wishlist row */}
      <div className="flex items-start justify-between gap-1 mb-2 z-10">
        <div className="flex flex-col gap-1 items-start">
          {product.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`text-[9px] px-2 py-0.5 rounded-sm tracking-wider uppercase font-extrabold ${badge.bgClass}`}
            >
              {badge.text}
            </span>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer ${
            isWishlisted ? 'text-[#b91c1c]' : 'text-slate-400 hover:text-slate-600'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Area */}
      <div
        onClick={() => onQuickView(product)}
        className="w-full my-1 cursor-pointer overflow-hidden rounded-xl bg-slate-50/50 flex items-center justify-center p-1"
      >
        <PhoneGraphic type={product.phoneType} className="transform transition-transform duration-300 group-hover:scale-102" />
      </div>

      {/* Product Information */}
      <div className="mt-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand Category */}
          <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-0.5">
            {product.brandCategory}
          </span>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm font-extrabold text-slate-900 group-hover:text-[#073c2c] transition-colors cursor-pointer truncate"
            title={product.fullName}
          >
            {product.name}
          </h3>

          {/* Specs Chips */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto scrollbar-none py-0.5">
            {product.specs.map((spec, i) => (
              <span
                key={i}
                className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-700 whitespace-nowrap border border-slate-200/60"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Price Area */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-slate-900">
              GH₵ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-semibold">
                GH₵ {product.originalPrice.toLocaleString('en-US')}
              </span>
            )}
          </div>

          {/* Stock / Dispatch status */}
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">{product.stockStatus}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="mt-3.5 w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
