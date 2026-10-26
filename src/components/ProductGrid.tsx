import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  totalFound: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  sortBy: FilterState['sortBy'];
  onSortChange: (sort: FilterState['sortBy']) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  totalFound,
  currentPage,
  onPageChange,
  sortBy,
  onSortChange,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onViewDetails
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Items per page
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(totalFound / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFound);

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header of Product Catalog */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* Count and page status */}
        <div className="text-xs text-slate-500 font-semibold">
          <strong className="text-slate-900 font-extrabold text-sm">{totalFound}</strong> products found • page {currentPage} of {totalPages}
        </div>

        {/* View Mode & Sort Dropdown */}
        <div className="flex items-center gap-3">
          {/* View Toggles */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
              className="appearance-none bg-white border border-slate-200 rounded-lg py-1.5 pl-8 pr-7 text-xs font-bold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#073c2c] cursor-pointer shadow-2xs"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product List / Grid */}
      {products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center my-6">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching smartphones found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your price range, clearing storage filters, or picking a different manufacturer.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              onQuickView={onQuickView}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        /* List Mode view */
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div
                  onClick={() => onViewDetails ? onViewDetails(product) : onQuickView(product)}
                  className="w-24 h-24 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center p-1 cursor-pointer"
                >
                  <div className="scale-75">
                    {/* Small preview */}
                    <ProductCard
                      product={product}
                      onAddToCart={() => {}}
                      onToggleWishlist={() => {}}
                      isWishlisted={false}
                      onQuickView={() => {}}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {product.brandCategory}
                  </span>
                  <h4
                    onClick={() => onViewDetails ? onViewDetails(product) : onQuickView(product)}
                    className="text-sm font-bold text-slate-900 hover:text-[#073c2c] cursor-pointer"
                  >
                    {product.fullName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    {product.specs.map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    ● {product.stockStatus}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">
                    GH₵ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-slate-400 line-through">
                      GH₵ {product.originalPrice.toLocaleString('en-US')}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Strip */}
      <div className="mt-8 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-800 font-bold">{totalFound > 0 ? startIndex + 1 : 0} - {endIndex}</strong> of <strong className="text-slate-800 font-bold">{totalFound}</strong> products
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === p
                  ? 'bg-[#073c2c] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          ))}

          <span className="px-1 text-slate-400 text-xs">...</span>

          <button
            onClick={() => onPageChange(10)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentPage === 10
                ? 'bg-[#073c2c] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            10
          </button>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
