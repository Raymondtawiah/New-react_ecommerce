import React, { useState } from 'react';
import { Logo } from './Logo';
import { Search, LayoutGrid, ChevronDown, User, Heart, ShoppingBag, X } from 'lucide-react';
import { Product } from '../types';

interface MainNavbarProps {
  onToggleCategories: () => void;
  categoriesOpen: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenVendorPortal: () => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onNavigateSection: (section: string) => void;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({
  onToggleCategories,
  categoriesOpen,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenVendorPortal,
  cartCount,
  cartSubtotal,
  wishlistCount,
  products,
  onSelectProduct,
  onNavigateSection
}) => {
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const searchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          {/* 1. Logo */}
          <div className="shrink-0" onClick={() => onNavigateSection('home')}>
            <Logo />
          </div>

          {/* 2. Categories Dropdown Button */}
          <button
            onClick={onToggleCategories}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all cursor-pointer shrink-0 ${
              categoriesOpen ? 'bg-[#043324] ring-2 ring-emerald-600' : 'bg-[#073c2c] hover:bg-[#052d21]'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-emerald-300" />
            <span className="hidden sm:inline">Categories</span>
            <ChevronDown className={`w-3.5 h-3.5 text-emerald-300 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* 3. Search Bar */}
          <div className="relative flex-1 max-w-lg hidden md:block">
            <div className="flex items-center rounded-lg border border-slate-300 focus-within:border-[#073c2c] focus-within:ring-1 focus-within:ring-[#073c2c] overflow-hidden bg-white shadow-xs">
              <div className="pl-3.5 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                placeholder="Search original phones, laptops, TVs..."
                className="w-full py-2 px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="pr-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setShowSearchSuggestions(false)}
                className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-5 py-2 text-sm font-semibold transition-colors cursor-pointer shrink-0"
              >
                Search
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {showSearchSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setShowSearchSuggestions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{product.fullName}</div>
                        <div className="text-[11px] text-slate-500">{product.brandCategory} • {product.specs.join(', ')}</div>
                      </div>
                      <div className="text-xs font-extrabold text-[#b91c1c] shrink-0 ml-2">
                        GH₵ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-slate-500 text-center">
                    No smartphones found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Top Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-slate-700">
            <button
              onClick={() => onNavigateSection('home')}
              className="hover:text-[#073c2c] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateSection('about')}
              className="hover:text-[#073c2c] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigateSection('shops')}
              className="hover:text-[#073c2c] transition-colors cursor-pointer"
            >
              Shops
            </button>
            <button
              onClick={() => onNavigateSection('deals')}
              className="hover:text-[#b91c1c] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Live Deals</span>
              <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            </button>
            <button
              onClick={onOpenVendorPortal}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Vendor Hub</span>
            </button>
          </nav>

          {/* 5. Right Action Elements: Vendor Hub (mobile/tablet), Account, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={onOpenVendorPortal}
              className="xl:hidden px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Vendor</span>
            </button>
            {/* Account */}
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2 text-left p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#073c2c] text-white flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden lg:flex flex-col text-xs leading-tight">
                <span className="text-slate-400 text-[10px]">Welcome</span>
                <span className="font-bold text-slate-800">Sign In / Join</span>
              </div>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-700 hover:text-[#b91c1c] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            </button>

            {/* Cart Subtotal Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition-all cursor-pointer group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-slate-800 group-hover:text-[#b91c1c] transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-[#b91c1c] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-400 font-medium">Cart Subtotal</span>
                <span className="text-xs font-black text-slate-900">
                  GH₵ {cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="flex items-center rounded-lg border border-slate-300 bg-white overflow-hidden shadow-xs">
            <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search original phones, laptops, TVs..."
              className="w-full py-2 px-3 text-xs text-slate-800 focus:outline-none"
            />
            <button
              onClick={() => onSearchChange(searchQuery)}
              className="bg-[#b91c1c] text-white px-3 py-2 text-xs font-bold"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
