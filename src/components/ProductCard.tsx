import React from 'react';
import { Heart, ShoppingBag, Eye, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { TechGraphic } from './TechGraphics';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
  onViewDetails
}) => {
  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    } else if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-200 group relative cursor-pointer"
    >
      {/* Top Badges & Wishlist row */}
      <div className="flex items-start justify-between gap-1 mb-1.5 sm:mb-2 z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-1 items-start">
          {product.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-sm tracking-wider uppercase font-extrabold ${badge.bgClass}`}
            >
              {badge.text}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-1 sm:p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              title="Quick Look"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-1 sm:p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer ${
              isWishlisted ? 'text-[#b91c1c]' : 'text-slate-400 hover:text-slate-600'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Image Area */}
      <div className="w-full h-32 sm:h-44 my-1 overflow-hidden rounded-lg sm:rounded-xl bg-slate-50/60 flex items-center justify-center p-1.5 sm:p-2">
        <TechGraphic
          category={product.category}
          type={product.graphicType || product.phoneType || 'phone'}
          angle="duo"
          uploadedImages={product.uploadedImages}
          zoomLevel={1}
          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="mt-1.5 sm:mt-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand Category */}
          <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-0.5">
            {product.brandCategory}
          </span>

          {/* Title */}
          <h3
            className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#073c2c] transition-colors truncate"
            title={product.fullName}
          >
            {product.name}
          </h3>

          {/* Specs Chips */}
          <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2 overflow-x-auto scrollbar-none py-0.5">
            {product.specs.map((spec, i) => (
              <span
                key={i}
                className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded bg-slate-100 text-slate-700 whitespace-nowrap border border-slate-200/60"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Price Area */}
          <div className="mt-2 sm:mt-2.5 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-sm sm:text-base md:text-lg font-black text-slate-900">
              GH₵ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through font-semibold">
                GH₵ {product.originalPrice.toLocaleString('en-US')}
              </span>
            )}
          </div>

          {/* Stock / Dispatch status */}
          <div className="mt-1 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">{product.stockStatus}</span>
          </div>
        </div>

        {/* Action Buttons row */}
        <div className="mt-2.5 sm:mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 sm:gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline">Add to Cart</span>
            <span className="xs:hidden">Add</span>
          </button>

          <button
            onClick={handleCardClick}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0"
            title="View Product Details"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
