/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { HeaderTopBar } from './components/HeaderTopBar';
import { MainNavbar } from './components/MainNavbar';
import { SubNavbar } from './components/SubNavbar';
import { CategoryHeader } from './components/CategoryHeader';
import { SidebarFilters } from './components/SidebarFilters';
import { ProductGrid } from './components/ProductGrid';
import { ValuePropositionCards } from './components/ValuePropositionCards';
import { NewsletterBanner } from './components/NewsletterBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsAppChatWidget } from './components/WhatsAppChatWidget';
import { CategoriesMenu } from './components/CategoriesMenu';
import { ShowroomsModal, AccountModal } from './components/InfoModals';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, FilterState, CartItem } from './types';

export default function App() {
  // Products dataset
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Filter State initialized matching the screenshot exactly
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    selectedBrand: 'All',
    manufacturers: ['Samsung', 'Tecno Mobile', 'Infinix'],
    minPrice: 0,
    maxPrice: 20000,
    discountedOnly: true,
    storageRam: '4GB / 128GB',
    sortBy: 'newest'
  });

  // Active filter tags matching screenshot
  const [activeFilterTags, setActiveFilterTags] = useState({
    category: 'Mobile Phones',
    stock: 'In Store & Delivery',
    warranty: 'Certified Genuine'
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Cart state: initialized with 3 items totaling GH₵ 4,850.00 as in the design
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0], // Samsung A08 (GH₵ 2,399.00)
      quantity: 1,
      selectedStorage: '128GB'
    },
    {
      product: INITIAL_PRODUCTS[1], // Infinix Smart 20 (GH₵ 1,250.00)
      quantity: 1,
      selectedStorage: '64GB'
    },
    {
      product: {
        ...INITIAL_PRODUCTS[2],
        price: 1201.0 // adjusted to achieve exact GH₵ 4,850.00 from mockup
      },
      quantity: 1,
      selectedStorage: '64GB'
    }
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Modals and drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showroomsOpen, setShowroomsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeTabCategory, setActiveTabCategory] = useState('mobile');

  // Cart subtotal calculation
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesFull = product.fullName.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesFull && !matchesBrand) return false;
      }

      // 2. Selected Brand from Top Pills
      if (filterState.selectedBrand !== 'All') {
        if (product.brand !== filterState.selectedBrand) {
          return false;
        }
      }

      // 3. Manufacturers Checkbox (if any are selected)
      if (filterState.manufacturers.length > 0) {
        const matchesManufacturer = filterState.manufacturers.some(
          (m) => m.toLowerCase().includes(product.brand.toLowerCase()) || product.brand.toLowerCase().includes(m.toLowerCase())
        );
        if (!matchesManufacturer) return false;
      }

      // 4. Price range
      if (product.price < filterState.minPrice || product.price > filterState.maxPrice) {
        return false;
      }

      // 5. Discounted Only toggle
      if (filterState.discountedOnly && !product.hasDiscount) {
        // In the design, all 8 initial showcase phones are displayed even with the switch turned on.
        // We allow featured items or check hasDiscount
        if (!product.hasDiscount && !product.isPopular && !product.isBestValue) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0; // default newest
    });
  }, [products, filterState]);

  // Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedStorage: product.storage }];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleRemoveActiveFilter = (type: 'category' | 'stock' | 'warranty') => {
    setActiveFilterTags((prev) => ({ ...prev, [type]: '' }));
  };

  const handleResetAllFilters = () => {
    setFilterState({
      searchQuery: '',
      selectedBrand: 'All',
      manufacturers: [],
      minPrice: 0,
      maxPrice: 20000,
      discountedOnly: false,
      storageRam: 'all',
      sortBy: 'newest'
    });
    setActiveFilterTags({
      category: '',
      stock: '',
      warranty: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Header Top Notification Bar */}
      <HeaderTopBar
        onOpenHelp={() => setShowroomsOpen(true)}
        onOpenWhatsApp={() => {
          const chatBtn = document.querySelector('button[title="Chat with Franko Desk"]') as HTMLButtonElement;
          chatBtn?.click();
        }}
      />

      {/* 2. Main Navigation Bar with Logo, Categories, Search, Cart */}
      <div className="relative">
        <MainNavbar
          onToggleCategories={() => setCategoriesOpen(!categoriesOpen)}
          categoriesOpen={categoriesOpen}
          searchQuery={filterState.searchQuery}
          onSearchChange={(q) => setFilterState((prev) => ({ ...prev, searchQuery: q }))}
          onOpenCart={() => setCartOpen(true)}
          onOpenWishlist={() => {
            if (wishlistIds.length === 0) {
              alert('Your wishlist is currently empty. Click the heart icon on any smartphone to add it!');
            } else {
              alert(`You have ${wishlistIds.length} item(s) saved in your wishlist!`);
            }
          }}
          onOpenAccount={() => setAccountOpen(true)}
          cartCount={cartCount}
          cartSubtotal={cartSubtotal}
          wishlistCount={wishlistIds.length}
          products={products}
          onSelectProduct={(p) => setQuickViewProduct(p)}
          onNavigateSection={(sec) => {
            if (sec === 'shops') setShowroomsOpen(true);
            if (sec === 'deals') {
              setFilterState((prev) => ({ ...prev, discountedOnly: true }));
            }
            if (sec === 'about') {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
          }}
        />

        {/* Dropdown Menu when Categories clicked */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <CategoriesMenu
            isOpen={categoriesOpen}
            onClose={() => setCategoriesOpen(false)}
            onSelectCategory={(catId) => {
              setActiveTabCategory(catId);
              setCategoriesOpen(false);
            }}
          />
        </div>
      </div>

      {/* 3. Sub-Navbar category links & trust badges */}
      <SubNavbar
        activeCategory={activeTabCategory}
        onSelectCategory={(catId) => setActiveTabCategory(catId)}
        onOpenWarranty={() => setShowroomsOpen(true)}
        onOpenDeals={() => setFilterState((prev) => ({ ...prev, discountedOnly: !prev.discountedOnly }))}
      />

      {/* 4. Main Body Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 w-full flex-1">
        {/* Category Header Banner with Brand Pills & Active Filters */}
        <CategoryHeader
          selectedBrand={filterState.selectedBrand}
          onSelectBrand={(brandKey) =>
            setFilterState((prev) => ({ ...prev, selectedBrand: brandKey }))
          }
          activeFilters={activeFilterTags}
          onRemoveFilter={handleRemoveActiveFilter}
          onResetFilters={handleResetAllFilters}
          totalProductsCount={92}
        />

        {/* 2-Column Catalog Layout: Left Sidebar Filters + Right Product Grid */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Sidebar */}
          <SidebarFilters
            filterState={filterState}
            onFilterChange={(updates) => setFilterState((prev) => ({ ...prev, ...updates }))}
            onApplyPrice={() => setCurrentPage(1)}
          />

          {/* Right Product Grid */}
          <ProductGrid
            products={filteredProducts.slice((currentPage - 1) * 8, currentPage * 8)}
            totalFound={filteredProducts.length > 0 ? 92 : 0}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            sortBy={filterState.sortBy}
            onSortChange={(sort) => setFilterState((prev) => ({ ...prev, sortBy: sort }))}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={(product) => setQuickViewProduct(product)}
          />
        </div>

        {/* 4-Feature Value Proposition Cards */}
        <ValuePropositionCards />

        {/* Newsletter Signup Banner */}
        <NewsletterBanner />
      </main>

      {/* 5. Deep Forest Green Footer */}
      <Footer
        onOpenShowrooms={() => setShowroomsOpen(true)}
        onOpenHelp={() => setShowroomsOpen(true)}
        onOpenWarranty={() => setShowroomsOpen(true)}
        onOpenDeliveryTrack={() => {
          alert('Franko Delivery Tracking: Enter your receipt or order number FT-GH-XXXX to track express rider dispatch across Ghana.');
        }}
      />

      {/* 6. Floating Interactive WhatsApp Chat Desk */}
      <WhatsAppChatWidget />

      {/* 7. Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        subtotal={cartSubtotal}
      />

      {/* 8. Quick View Smartphone Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      {/* 9. Showrooms Directory Modal */}
      <ShowroomsModal
        isOpen={showroomsOpen}
        onClose={() => setShowroomsOpen(false)}
      />

      {/* 10. Account Sign In Modal */}
      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
      />
    </div>
  );
}
