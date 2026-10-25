import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { Search, LayoutGrid, ChevronDown, User, Heart, ShoppingBag, X, Package, Store } from 'lucide-react';
import { Product } from '../types';

interface MainNavbarProps {
  onToggleCategories: () => void;
  categoriesOpen: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders?: () => void;
  onOpenAccount: () => void;
  onOpenVendorPortal: () => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  ordersCount?: number;
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
  onOpenOrders,
  onOpenAccount,
  onOpenVendorPortal,
  cartCount,
  cartSubtotal,
  wishlistCount,
  ordersCount = 0,
  products,
  onSelectProduct,
  onNavigateSection
}) => {
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)) {
        setShowMobileSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.categoryName || '').toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* 1. Left Cluster: Logo & Categories Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <div 
              className="cursor-pointer transition-transform hover:opacity-95" 
              onClick={() => onNavigateSection('home')}
            >
              <Logo />
            </div>

            {/* Categories Dropdown Button */}
            <button
              onClick={onToggleCategories}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shrink-0 shadow-xs ${
                categoriesOpen
                  ? 'bg-[#043324] ring-2 ring-emerald-500 shadow-sm'
                  : 'bg-[#073c2c] hover:bg-[#052d21] active:scale-[0.98]'
              }`}
              aria-label="Browse department categories"
              aria-expanded={categoriesOpen}
              title="Browse department categories"
            >
              <LayoutGrid className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="hidden xs:inline sm:inline">Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-emerald-300 transition-transform duration-200 ${
                  categoriesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* 2. Middle Search Bar (Tablet & Desktop) */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg hidden md:block">
            <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-[#073c2c] focus-within:ring-2 focus-within:ring-[#073c2c]/15 overflow-hidden bg-white shadow-xs transition-all">
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
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setShowSearchSuggestions(false)}
                className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-4 lg:px-5 py-2 text-sm font-semibold transition-colors cursor-pointer shrink-0"
              >
                Search
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {showSearchSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setShowSearchSuggestions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer border-b border-slate-50 last:border-b-0"
                    >
                      <div className="pr-3">
                        <div className="text-xs font-bold text-slate-900 line-clamp-1">{product.fullName}</div>
                        <div className="text-[11px] text-slate-500">{product.brandCategory} • {product.specs.slice(0, 2).join(', ')}</div>
                      </div>
                      <div className="text-xs font-extrabold text-[#b91c1c] shrink-0 ml-2">
                        GH₵ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-slate-500 text-center">
                    No products found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Desktop Navigation Links (Clean: NO text links to orders or wishlist) */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-slate-700">
            <button
              onClick={() => onNavigateSection('home')}
              className="hover:text-[#073c2c] transition-colors cursor-pointer py-1"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateSection('about')}
              className="hover:text-[#073c2c] transition-colors cursor-pointer py-1"
            >
              About
            </button>
            <button
              onClick={() => onNavigateSection('shops')}
              className="hover:text-[#073c2c] transition-colors cursor-pointer py-1"
            >
              Shops
            </button>
            <button
              onClick={() => onNavigateSection('deals')}
              className="hover:text-[#b91c1c] flex items-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              <span>Live Deals</span>
              <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
            </button>
            <button
              onClick={onOpenVendorPortal}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Open Vendor Management Hub"
            >
              <Store className="w-3.5 h-3.5 text-emerald-700" />
              <span>Vendor Hub</span>
            </button>
          </nav>

          {/* 4. Action Controls: Vendor (mobile), Account, Order Icon, Wishlist Icon, Cart Button */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 shrink-0">
            {/* Vendor Portal Quick Button (Mobile & Tablet) */}
            <button
              onClick={onOpenVendorPortal}
              className="xl:hidden px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1"
              title="Open Vendor Portal"
            >
              <Store className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden xs:inline">Vendor</span>
            </button>

            {/* Account Profile Button */}
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2 text-left p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="User Account & Settings"
              aria-label="User Account"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#073c2c] text-white flex items-center justify-center shrink-0 shadow-xs">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="hidden lg:flex flex-col text-xs leading-tight">
                <span className="text-slate-400 text-[10px]">Welcome</span>
                <span className="font-bold text-slate-800">Sign In / Join</span>
              </div>
            </button>

            {/* Order Page Icon Button (Preserved & Responsive) */}
            <button
              onClick={onOpenOrders}
              className="relative p-2 text-slate-700 hover:text-[#073c2c] hover:bg-emerald-50/80 rounded-xl transition-all cursor-pointer group"
              title="Track My Orders"
              aria-label={`Track My Orders (${ordersCount} active)`}
            >
              <Package className="w-5 h-5 transition-transform group-hover:scale-110" />
              {ordersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#073c2c] text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Wishlist Page Icon Button (Preserved & Responsive) */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-700 hover:text-[#b91c1c] hover:bg-red-50/80 rounded-xl transition-all cursor-pointer group"
              title="View Wishlist"
              aria-label={`View Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#b91c1c] text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 border border-slate-200 hover:border-slate-300 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group shadow-xs"
              aria-label={`View Shopping Cart (${cartCount} items)`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-slate-800 group-hover:text-[#b91c1c] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#b91c1c] text-white text-[10px] font-extrabold min-w-4 h-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
                    {cartCount}
                  </span>
                )}
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

        {/* 5. Mobile Search Input & Instant Suggestions (Visible on < md) */}
        <div ref={mobileSearchRef} className="mt-2.5 md:hidden relative">
          <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-[#073c2c] focus-within:ring-2 focus-within:ring-[#073c2c]/15 bg-white overflow-hidden shadow-xs transition-all">
            <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowMobileSuggestions(true);
              }}
              onFocus={() => setShowMobileSuggestions(true)}
              placeholder="Search phones, laptops, TVs, gadgets..."
              className="w-full py-2 px-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="pr-2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => {
                setShowMobileSuggestions(false);
                onSearchChange(searchQuery);
              }}
              className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-3.5 py-2 text-xs font-bold shrink-0 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Mobile Live Suggestions Dropdown */}
          {showMobileSuggestions && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <button
                    key={`m-${product.id}`}
                    onClick={() => {
                      onSelectProduct(product);
                      setShowMobileSuggestions(false);
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center justify-between border-b border-slate-50 last:border-b-0 cursor-pointer"
                  >
                    <div className="pr-2">
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">{product.fullName}</div>
                      <div className="text-[10px] text-slate-500">{product.brandCategory}</div>
                    </div>
                    <div className="text-xs font-black text-[#b91c1c] shrink-0">
                      GH₵ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-slate-500 text-center">
                  No products found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
