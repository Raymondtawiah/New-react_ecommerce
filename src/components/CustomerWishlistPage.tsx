import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Product } from '../types';
import { TechGraphic } from './TechGraphics';

interface CustomerWishlistPageProps {
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  onBackToShop: () => void;
  onMoveAllToCart: () => void;
}

export const CustomerWishlistPage: React.FC<CustomerWishlistPageProps> = ({
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
  onBackToShop,
  onMoveAllToCart
}) => {
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const handleItemAddToCart = (product: Product) => {
    onAddToCart(product, 1);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Top Breadcrumb & Header */}
      <div className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <button
                  onClick={onBackToShop}
                  className="inline-flex items-center gap-1 font-bold text-[#073c2c] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Storefront</span>
                </button>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="font-semibold text-slate-700">Account</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="font-bold text-slate-900">My Wishlist</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-[#b91c1c] flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  My Saved Tech ({wishlistProducts.length})
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Save your favorite smartphones, laptops, TVs, and accessories to track price drops and showroom stock.
              </p>
            </div>

            {wishlistProducts.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={onMoveAllToCart}
                  className="bg-[#073c2c] hover:bg-[#052d21] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-300" />
                  <span>Move All to Cart</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#b91c1c] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You haven't saved any items yet. Browse our verified phones, laptops, and electronics and tap the heart icon to save them here.
            </p>
            <button
              onClick={onBackToShop}
              className="mt-5 inline-flex items-center gap-2 bg-[#073c2c] hover:bg-[#052d21] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Explore Tech Catalog</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
            {wishlistProducts.map((product) => {
              const isAdded = addedItemMap[product.id];
              return (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all group relative"
                >
                  {/* Top Row: Category tag and Remove button */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black tracking-wider text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                      {product.brandCategory}
                    </span>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-1.5 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image Area - click to view details */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-44 my-2 cursor-pointer rounded-xl bg-slate-50 flex items-center justify-center p-2 group-hover:bg-slate-100/70 transition-colors"
                  >
                    <TechGraphic
                      category={product.category}
                      type={product.graphicType || product.phoneType || 'phone'}
                      angle="duo"
                      uploadedImages={product.uploadedImages}
                      zoomLevel={1}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="mt-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="text-sm font-extrabold text-slate-900 group-hover:text-[#073c2c] transition-colors cursor-pointer line-clamp-2"
                      >
                        {product.fullName || product.name}
                      </h3>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.specs.slice(0, 2).map((sp, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                          >
                            {sp}
                          </span>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-base font-black text-slate-900">
                          GH₵ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            GH₵ {product.originalPrice.toLocaleString('en-US')}
                          </span>
                        )}
                      </div>

                      {/* Stock availability */}
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                        ● {product.stockStatus}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                      <button
                        onClick={() => handleItemAddToCart(product)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#073c2c] hover:bg-[#052d21] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                            <span>Added to Cart!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-emerald-300" />
                            <span>Move to Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onSelectProduct(product)}
                        className="w-full py-2 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>View Product Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
