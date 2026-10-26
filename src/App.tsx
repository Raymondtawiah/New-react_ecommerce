/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { HeaderTopBar } from './components/HeaderTopBar';
import { AnnouncementBar } from './components/AnnouncementBar';
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
import { Login } from './components/Login';
import { VendorDashboard } from './components/vendor/VendorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { ScrollZoomSection } from './components/ScrollZoomSection';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CustomerOrdersPage, CustomerOrder } from './components/CustomerOrdersPage';
import { CustomerWishlistPage } from './components/CustomerWishlistPage';
import { UserProfilePage } from './components/UserProfilePage';
import { INITIAL_PRODUCTS, CATEGORY_METADATA, BRAND_COUNTS } from './data/products';
import {
  INITIAL_VENDOR_ORDERS,
  INITIAL_SHOWROOM_STOCKS,
  INITIAL_VENDOR_PAYOUTS,
  INITIAL_WARRANTY_CLAIMS
} from './data/vendorData';
import { INITIAL_ADMIN_PROFILE } from './data/adminData';
import { Product, FilterState, CartItem, TechCategory, ProductImageAngles } from './types';
import { VendorOrder, ShowroomStockAllocation, VendorPayout, WarrantyClaim } from './types/vendor';
import { AdminUser } from './types/admin';
const INITIAL_CUSTOMER_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-cust-1',
    orderNumber: 'FT-GH-948210',
    date: 'Today, 10:45 AM',
    status: 'dispatched',
    totalAmount: 2399.0,
    paymentMethod: 'MTN MoMo',
    recipientName: 'Raymond Tawiah',
    recipientPhone: '024 456 7890',
    deliveryAddress: 'East Legon, Near American House, Accra',
    dispatchHub: 'Kwame Nkrumah Circle Flagship Hub',
    riderName: 'Kofi Mensah',
    riderPhone: '024 411 9872',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Samsung A08
        quantity: 1,
        selectedStorage: '128GB',
        unitPrice: 2399.0
      }
    ]
  },
  {
    id: 'ord-cust-2',
    orderNumber: 'FT-GH-821045',
    date: 'Yesterday, 3:20 PM',
    status: 'delivered',
    totalAmount: 1250.0,
    paymentMethod: 'Telecel Cash',
    recipientName: 'Raymond Tawiah',
    recipientPhone: '024 456 7890',
    deliveryAddress: 'Osu Oxford Street, Accra',
    dispatchHub: 'Osu Oxford Street Showroom',
    riderName: 'Kwesi Appiah',
    riderPhone: '050 912 3441',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Infinix Smart 20
        quantity: 1,
        selectedStorage: '64GB',
        unitPrice: 1250.0
      }
    ]
  }
];

export default function App() {
  // Navigation View: 'storefront' | 'product-details' | 'orders' | 'wishlist' | 'vendor' | 'profile' | 'admin'
  const [viewMode, setViewMode] = useState<'storefront' | 'product-details' | 'orders' | 'wishlist' | 'vendor' | 'profile' | 'admin'>('storefront');

  // Administrator Session & Authentication
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser>(INITIAL_ADMIN_PROFILE);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Currently inspected product for full details page
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);

  // Products dataset (shared between Storefront & Vendor Hub across all tech)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Customer Orders state
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>(INITIAL_CUSTOMER_ORDERS);

  // Vendor Data State
  const [vendorOrders, setVendorOrders] = useState<VendorOrder[]>(INITIAL_VENDOR_ORDERS);
  const [showroomStocks, setShowroomStocks] = useState<ShowroomStockAllocation[]>(INITIAL_SHOWROOM_STOCKS);
  const [vendorPayouts, setVendorPayouts] = useState<VendorPayout[]>(INITIAL_VENDOR_PAYOUTS);
  const [warrantyClaims, setWarrantyClaims] = useState<WarrantyClaim[]>(INITIAL_WARRANTY_CLAIMS);

  // Active Category Department: 'mobile' | 'laptops' | 'tvs' | 'appliances' | 'accessories' | 'all'
  const [activeTabCategory, setActiveTabCategory] = useState<string>('mobile');

  // Filter State initialized
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'mobile',
    selectedBrand: 'All',
    manufacturers: [],
    minPrice: 0,
    maxPrice: 20000,
    discountedOnly: false,
    storageRam: 'all',
    sortBy: 'newest'
  });

  // Active filter tags
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

  // Wishlist state: preloaded with 2 items for rich UX
  const [wishlistIds, setWishlistIds] = useState<string[]>([INITIAL_PRODUCTS[0].id, INITIAL_PRODUCTS[3].id]);

  // Modals and drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showroomsOpen, setShowroomsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Cart subtotal calculation
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Wishlist items
  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  // Current category metadata
  const currentCategoryMeta = useMemo(() => {
    if (activeTabCategory in CATEGORY_METADATA) {
      return CATEGORY_METADATA[activeTabCategory as TechCategory];
    }
    return {
      title: 'All Technology & Accessories',
      subtitle: 'Complete official technology catalog across smartphones, laptops, smart TVs, appliances & accessories in Ghana',
      bannerBadge: 'OFFICIAL APEXTECH TECH REPOSITORY'
    };
  }, [activeTabCategory]);

  // Filtered products logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Department category filter
      if (activeTabCategory !== 'all') {
        if (product.category !== activeTabCategory) {
          return false;
        }
      }

      // 2. Search Query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesFullName = product.fullName.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = (product.categoryName || '').toLowerCase().includes(q);
        if (!matchesName && !matchesFullName && !matchesBrand && !matchesCategory) {
          return false;
        }
      }

      // 3. Brand Pill Filter
      if (filterState.selectedBrand !== 'All' && product.brand !== filterState.selectedBrand) {
        return false;
      }

      // 4. Multiple Manufacturer checkboxes
      if (filterState.manufacturers.length > 0 && !filterState.manufacturers.includes(product.brand)) {
        return false;
      }

      // 5. Price range
      if (product.price < filterState.minPrice || product.price > filterState.maxPrice) {
        return false;
      }

      // 6. Discount only filter
      if (filterState.discountedOnly && !product.hasDiscount) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return b.isNewArrival ? 1 : -1;
    });
  }, [products, activeTabCategory, filterState]);

  // Add to cart handler
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

  // Toggle wishlist handler
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // Remove from wishlist
  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  // Move all wishlist items to cart
  const handleMoveAllWishlistToCart = () => {
    wishlistProducts.forEach((prod) => {
      handleAddToCart(prod, 1);
    });
    setCartOpen(true);
  };

  // Cart quantity update
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
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove cart item
  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Customer Place Order handler (from Cart Checkout)
  const handlePlaceOrder = (orderInfo: {
    items: CartItem[];
    total: number;
    paymentMethod: 'MTN MoMo' | 'Telecel Cash' | 'Bank Card' | 'Cash on Delivery';
    recipientName: string;
    deliveryRegion: string;
  }) => {
    const newCustOrder: CustomerOrder = {
      id: `ord-cust-${Date.now()}`,
      orderNumber: `FT-GH-${Math.floor(100000 + Math.random() * 900000)}`,
      date: 'Just now',
      status: 'processing',
      totalAmount: orderInfo.total,
      paymentMethod: orderInfo.paymentMethod,
      recipientName: orderInfo.recipientName,
      recipientPhone: '024 456 7890',
      deliveryAddress: orderInfo.deliveryRegion,
      dispatchHub: 'Kwame Nkrumah Circle Flagship Hub',
      items: orderInfo.items.map((i) => ({
        product: i.product,
        quantity: i.quantity,
        selectedStorage: i.selectedStorage,
        unitPrice: i.product.price
      }))
    };

    setCustomerOrders((prev) => [newCustOrder, ...prev]);

    // Also mirror to vendor order pipeline for realism
    const newVendorOrder: VendorOrder = {
      id: `vo-${Date.now()}`,
      orderNumber: newCustOrder.orderNumber,
      customerName: orderInfo.recipientName,
      customerPhone: '024 456 7890',
      productName: orderInfo.items[0]?.product.name || 'Tech Order',
      quantity: orderInfo.items.reduce((s, it) => s + it.quantity, 0),
      totalPrice: orderInfo.total,
      deliveryRegion: orderInfo.deliveryRegion,
      status: 'pending',
      createdAt: 'Just now',
      dispatchHub: 'Kwame Nkrumah Circle Flagship Hub',
      paymentMethod: orderInfo.paymentMethod === 'Bank Card' ? 'Card' : orderInfo.paymentMethod
    };
    setVendorOrders((prev) => [newVendorOrder, ...prev]);

    // Clear cart
    setCartItems([]);
  };

  // Switch to product details page
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setViewMode('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Multi-angle photo updates
  const handleUpdateProductImages = (productId: string, images: ProductImageAngles) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, uploadedImages: images } : p))
    );
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => (prev ? { ...prev, uploadedImages: images } : null));
    }
    if (quickViewProduct && quickViewProduct.id === productId) {
      setQuickViewProduct((prev) => (prev ? { ...prev, uploadedImages: images } : null));
    }
  };

  // Vendor actions
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProductPrice = (id: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: VendorOrder['status']) => {
    setVendorOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleRebalanceStock = (fromHubId: string, toHubId: string, amount: number) => {
    setShowroomStocks((prev) =>
      prev.map((stk) => {
        if (stk.branchId === fromHubId) {
          return { ...stk, stockCount: Math.max(0, stk.stockCount - amount) };
        }
        if (stk.branchId === toHubId) {
          return { ...stk, stockCount: stk.stockCount + amount };
        }
        return stk;
      })
    );
  };

  const handleRequestPayout = (newPayout: VendorPayout) => {
    setVendorPayouts((prev) => [newPayout, ...prev]);
  };

  // Administrator Portal Access Handlers
  const handleOpenAdminPortal = () => {
    if (isAdminLoggedIn) {
      setViewMode('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = (admin: AdminUser) => {
    setIsAdminLoggedIn(true);
    setAdminUser(admin);
    setViewMode('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setViewMode('storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#073c2c] selection:text-white flex flex-col">
      {/* 1. Slim Top Notification & Contact Bar */}
      <HeaderTopBar
        onOpenHelp={() => setShowroomsOpen(true)}
        onOpenWhatsApp={() => {
          window.open?.('https://wa.me/233503607980', '_blank');
        }}
      />

      {/* Animated Announcement Bar on Top of Main Navbar */}
      <AnnouncementBar
        onNavigateDeals={() => {
          setViewMode('storefront');
          setFilterState((prev) => ({ ...prev, discountedOnly: true }));
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }}
        onOpenShowrooms={() => setShowroomsOpen(true)}
        onSelectCategory={(cat) => {
          setActiveTabCategory(cat);
          setFilterState((prev) => ({ ...prev, selectedCategory: cat, selectedBrand: 'All' }));
          setCurrentPage(1);
          if (viewMode !== 'storefront') setViewMode('storefront');
        }}
      />

      {/* 2. Main White Navbar */}
      <MainNavbar
        onToggleCategories={() => setCategoriesOpen(!categoriesOpen)}
        categoriesOpen={categoriesOpen}
        searchQuery={filterState.searchQuery}
        onSearchChange={(q) => {
          setFilterState((prev) => ({ ...prev, searchQuery: q }));
          setCurrentPage(1);
          if (viewMode !== 'storefront') setViewMode('storefront');
        }}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => {
          setViewMode('wishlist');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenOrders={() => {
          setViewMode('orders');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAccount={() => { if (user) setViewMode('profile'); else setLoginOpen(true); }}
        user={user}
        onOpenVendorPortal={handleOpenAdminPortal}
        onOpenAdminPortal={handleOpenAdminPortal}
        isAdmin={isAdminLoggedIn}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        wishlistCount={wishlistIds.length}
        ordersCount={customerOrders.length}
        products={products}
        onSelectProduct={(p) => handleViewProductDetails(p)}
        onNavigateSection={(section) => {
          if (section === 'home') {
            setViewMode('storefront');
          } else if (section === 'deals') {
            setViewMode('storefront');
            setFilterState((prev) => ({ ...prev, discountedOnly: true }));
          } else if (section === 'shops') {
            setShowroomsOpen(true);
          } else if (section === 'about') {
            setShowroomsOpen(true);
          }
        }}
      />

      {/* Dropdown Mega Categories Drawer */}
      <CategoriesMenu
        isOpen={categoriesOpen}
        onClose={() => setCategoriesOpen(false)}
        onSelectCategory={(cat) => {
          setActiveTabCategory(cat);
          setFilterState((prev) => ({ ...prev, selectedCategory: cat, selectedBrand: 'All' }));
          setCurrentPage(1);
          setCategoriesOpen(false);
          if (viewMode !== 'storefront') setViewMode('storefront');
        }}
      />

      {/* CONDITIONAL MAIN CONTENT ROUTING */}
      {viewMode === 'admin' ? (
        /* APEXTECH CENTRAL ADMIN CONSOLE */
        <div className="flex-1 animate-page-zoom-in">
          <AdminDashboard
            products={products}
            vendorOrders={vendorOrders}
            customerOrders={customerOrders}
            showrooms={showroomStocks}
            payouts={vendorPayouts}
            warrantyClaims={warrantyClaims}
            adminUser={adminUser}
            onUpdateAdminUser={setAdminUser}
            onBackToStorefront={() => {
              setViewMode('storefront');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLogout={handleAdminLogout}
            onAddProduct={handleAddProduct}
            onUpdateProductPrice={handleUpdateProductPrice}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onTransferStock={handleRebalanceStock}
            onRequestPayout={handleRequestPayout}
            onViewProductOnStorefront={(prod) => handleViewProductDetails(prod)}
          />
        </div>
      ) : viewMode === 'vendor' ? (
        /* VENDOR DASHBOARD (Partner Central) */
        <div className="flex-1 animate-page-zoom-in">
          <VendorDashboard
            products={products}
            orders={vendorOrders}
            showrooms={showroomStocks}
            payouts={vendorPayouts}
            warrantyClaims={warrantyClaims}
            onBackToStorefront={() => {
              setViewMode('storefront');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddProduct={handleAddProduct}
            onUpdateProductPrice={handleUpdateProductPrice}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onTransferStock={handleRebalanceStock}
            onRequestPayout={handleRequestPayout}
            onViewProductOnStorefront={(prod) => handleViewProductDetails(prod)}
          />
        </div>
      ) : viewMode === 'product-details' && selectedProduct ? (
        /* DEDICATED FULL PRODUCT DETAILS PAGE */
        <div className="flex-1 animate-page-zoom-in">
          <ProductDetailsPage
            product={selectedProduct}
            onBack={() => setViewMode('storefront')}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onUpdateProductImages={handleUpdateProductImages}
            onSelectProduct={handleViewProductDetails}
            allProducts={products}
            onOpenCart={() => setCartOpen(true)}
          />
        </div>
      ) : viewMode === 'orders' ? (
        /* CUSTOMER ORDERS & EXPRESS DISPATCH TRACKING PAGE */
        <div className="flex-1 animate-page-zoom-in">
          <CustomerOrdersPage
            orders={customerOrders}
            onBackToShop={() => setViewMode('storefront')}
            onSelectProduct={handleViewProductDetails}
            onReorder={(order) => {
              order.items.forEach((it) => handleAddToCart(it.product, it.quantity));
              setCartOpen(true);
            }}
          />
        </div>
      ) : viewMode === 'wishlist' ? (
        /* CUSTOMER SAVED TECH & WISHLIST PAGE */
        <div className="flex-1 animate-page-zoom-in">
          <CustomerWishlistPage
            wishlistProducts={wishlistProducts}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={(prod, qty) => handleAddToCart(prod, qty || 1)}
            onSelectProduct={handleViewProductDetails}
            onBackToShop={() => setViewMode('storefront')}
            onMoveAllToCart={handleMoveAllWishlistToCart}
          />
        </div>
      ) : viewMode === 'profile' ? (
        /* CUSTOMER PROFILE & ACCOUNT MANAGEMENT PAGE */
        <div className="flex-1 animate-page-zoom-in">
          <UserProfilePage
            onBackToStore={() => {
              setViewMode('storefront');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateOrders={() => {
              setViewMode('orders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateWishlist={() => {
              setViewMode('wishlist');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdminPortal={handleOpenAdminPortal}
            ordersCount={customerOrders.length}
            wishlistCount={wishlistIds.length}
          />
        </div>
      ) : (
        /* DEFAULT STOREFRONT (ApexTech Ghana Storefront) */
        <div className="flex-1 flex flex-col animate-page-zoom-in">
          {/* 3. Deep Green Sub-Navbar with 5 Technology Departments */}
          <SubNavbar
            activeCategory={activeTabCategory}
            onSelectCategory={(cat) => {
              setActiveTabCategory(cat);
              setFilterState((prev) => ({ ...prev, selectedCategory: cat, selectedBrand: 'All' }));
              setCurrentPage(1);
            }}
          />

          {/* 4. Main Store Catalog Body */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Category Hero Banner with scroll zoom */}
            <ScrollZoomSection effect="zoom-in" threshold={0.1}>
              <CategoryHeader
                categoryTitle={currentCategoryMeta.title}
                categorySubtitle={currentCategoryMeta.subtitle}
                brandList={BRAND_COUNTS}
                selectedBrand={filterState.selectedBrand}
                onSelectBrand={(brandKey) => setFilterState((prev) => ({ ...prev, selectedBrand: brandKey }))}
                activeFilters={activeFilterTags}
                onRemoveFilter={(type: 'category' | 'stock' | 'warranty') => {
                  if (type === 'category') {
                    setActiveTabCategory('all');
                  }
                  setActiveFilterTags((prev) => ({ ...prev, [type]: '' }));
                }}
                onResetFilters={() => {
                  setFilterState((prev) => ({ ...prev, selectedBrand: 'All', minPrice: 0, maxPrice: 20000 }));
                }}
                totalProductsCount={filteredProducts.length}
              />
            </ScrollZoomSection>

            {/* Split Content: Sidebar Filters (Left) + Product Grid (Right) with scroll zoom */}
            <ScrollZoomSection effect="fade-zoom" threshold={0.08}>
              <div className="flex flex-col lg:flex-row gap-6 mt-6 items-start">
                {/* Left Sidebar Filters */}
                <SidebarFilters
                  filterState={filterState}
                  onFilterChange={(updates) => {
                    setCurrentPage(1);
                    setFilterState((prev) => ({ ...prev, ...updates }));
                  }}
                  onApplyPrice={() => setCurrentPage(1)}
                />

                {/* Right Product Grid with onViewDetails pointing to ProductDetailsPage */}
                <ProductGrid
                  products={filteredProducts.slice((currentPage - 1) * 8, currentPage * 8)}
                  totalFound={filteredProducts.length}
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
                  onViewDetails={(product) => handleViewProductDetails(product)}
                />
              </div>
            </ScrollZoomSection>

            {/* 4-Feature Value Proposition Cards with scroll zoom */}
            <ScrollZoomSection effect="zoom-in" threshold={0.15}>
              <ValuePropositionCards />
            </ScrollZoomSection>

            {/* Newsletter Signup Banner with scroll zoom */}
            <ScrollZoomSection effect="zoom-in" threshold={0.2}>
              <NewsletterBanner />
            </ScrollZoomSection>
          </main>
        </div>
      )}

      {/* 5. Deep Forest Green Footer (Visible on all customer views) */}
      {viewMode !== 'vendor' && viewMode !== 'admin' && (
        <Footer
          onOpenShowrooms={() => setShowroomsOpen(true)}
          onOpenHelp={() => setShowroomsOpen(true)}
          onOpenWarranty={() => setShowroomsOpen(true)}
          onOpenDeliveryTrack={() => {
            setViewMode('orders');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAdminPortal={handleOpenAdminPortal}
        />
      )}

      {/* Floating Interactive WhatsApp Chat Desk */}
      <WhatsAppChatWidget />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        subtotal={cartSubtotal}
        onPlaceOrder={handlePlaceOrder}
        onViewOrders={() => {
          setViewMode('orders');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Quick View Smartphone & Tech Item Modal with Multi-Angle View & Zoom */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onUpdateProductImages={handleUpdateProductImages}
      />

      {/* Showrooms Directory Modal */}
      <ShowroomsModal
        isOpen={showroomsOpen}
        onClose={() => setShowroomsOpen(false)}
      />

      {/* Customer Login / Sign Up Modal */}
      {loginOpen && (
        <Login
          onClose={() => setLoginOpen(false)}
          onLogin={(email: string) => setUser({ name: email.split('@')[0], email })}
          onSignUp={(name: string, email: string) => setUser({ name, email })}
          onOpenAdminLogin={() => {
            setLoginOpen(false);
            setAdminLoginModalOpen(true);
          }}
        />
      )}

      {/* Central Administrator Authentication Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
