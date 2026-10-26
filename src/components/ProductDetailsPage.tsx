import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  MapPin,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Upload,
  Star,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Package,
  Layers,
  Check
} from 'lucide-react';
import { Product, ProductImageAngles } from '../types';
import { TechGraphic } from './TechGraphics';

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onUpdateProductImages: (productId: string, images: ProductImageAngles) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
  onOpenCart: () => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onUpdateProductImages,
  onSelectProduct,
  allProducts,
  onOpenCart
}) => {
  const [selectedAngle, setSelectedAngle] = useState<'duo' | 'front' | 'back' | 'side' | 'detail'>('duo');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'delivery' | 'warranty' | 'reviews'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState(product.storage || '128GB');
  const [selectedColor, setSelectedColor] = useState(product.colorName || 'Default Titanium');

  // Multi-angle options
  const angleTabs: { key: 'duo' | 'front' | 'back' | 'side' | 'detail'; label: string; iconLabel: string }[] = [
    { key: 'duo', label: 'Side-by-Side (Duo)', iconLabel: 'Duo' },
    { key: 'front', label: 'Front Display', iconLabel: 'Front' },
    { key: 'back', label: 'Back & Finish', iconLabel: 'Back' },
    { key: 'side', label: 'Profile & Ports', iconLabel: 'Side' },
    { key: 'detail', label: 'Box & Details', iconLabel: 'Box' }
  ];

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 1));
  const handleResetZoom = () => setZoomLevel(1);

  // Mouse pan on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Direct image upload for current angle
  const handleAngleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, angle: keyof ProductImageAngles) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const currentUploaded = product.uploadedImages || {};
        onUpdateProductImages(product.id, {
          ...currentUploaded,
          [angle]: dataUrl
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    onOpenCart();
  };

  // Related products from same category or brand
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Breadcrumb & Back Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-bold text-[#073c2c] hover:underline cursor-pointer bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-medium">{product.categoryName || 'Tech Catalog'}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-700">{product.brand}</span>
            <ChevronRight className="w-3 h-3 text-slate-400 hidden sm:inline" />
            <span className="font-bold text-slate-900 truncate max-w-[200px] hidden sm:inline">{product.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => onToggleWishlist(product)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer border ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-[#b91c1c]'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
              <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-8">
            
            {/* LEFT COLUMN: Multi-Angle Interactive Gallery & Zoom Controls (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {product.badges.map((b, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider ${b.bgClass}`}
                    >
                      {b.text}
                    </span>
                  ))}
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Ghana Official Warranty
                  </span>
                </div>

                {/* Zoom Level Indicator & Controls */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-slate-700">
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer text-xs font-mono font-bold"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold px-1.5 text-slate-600">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                </div>
              </div>

              {/* Main Interactive Stage */}
              <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
                className="relative w-full h-[360px] sm:h-[440px] bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-center overflow-hidden cursor-crosshair select-none"
              >
                {/* Subtle Grid Accent */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#073c2c 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* Product Graphic / Image */}
                <div
                  className="w-full h-full flex items-center justify-center p-6 transition-transform duration-150 ease-out"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                  }}
                >
                  <TechGraphic
                    category={product.category}
                    type={product.graphicType || product.phoneType || 'phone'}
                    angle={selectedAngle}
                    uploadedImages={product.uploadedImages}
                    zoomLevel={1}
                    className="w-full h-full max-h-[340px]"
                  />
                </div>

                {/* Perspective Badge in bottom left */}
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Viewing: {angleTabs.find((t) => t.key === selectedAngle)?.label}</span>
                </div>

                {/* Hover zoom hint */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-2xs pointer-events-none">
                  Hover & Move to Magnify
                </div>
              </div>

              {/* Perspective Selector Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Choose Camera Perspective:</span>
                  <label className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Upload Photo to This Angle</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleAngleFileUpload(
                          e,
                          selectedAngle === 'duo' ? 'front' : selectedAngle
                        )
                      }
                    />
                  </label>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {angleTabs.map((tab) => {
                    const customImg =
                      tab.key === 'duo'
                        ? product.uploadedImages?.front
                        : product.uploadedImages?.[tab.key];
                    const hasCustom = Boolean(customImg);
                    const isSelected = selectedAngle === tab.key;

                    return (
                      <button
                        key={tab.key}
                        onClick={() => setSelectedAngle(tab.key)}
                        className={`relative rounded-xl border p-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between h-20 ${
                          isSelected
                            ? 'border-[#073c2c] bg-emerald-50/60 ring-2 ring-[#073c2c] text-emerald-950 font-bold'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                        }`}
                      >
                        {hasCustom && customImg ? (
                          <div className="w-full h-10 rounded overflow-hidden flex items-center justify-center bg-slate-100">
                            <img
                              src={customImg}
                              alt={tab.label}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-10 flex items-center justify-center">
                            <TechGraphic
                              category={product.category}
                              type={product.graphicType || product.phoneType || 'phone'}
                              angle={tab.key}
                              uploadedImages={product.uploadedImages}
                              zoomLevel={1}
                              className="h-9 w-9 object-contain"
                            />
                          </div>
                        )}
                        <span className="text-[10px] font-bold leading-tight mt-1 line-clamp-1">
                          {tab.label}
                        </span>
                        {hasCustom && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Details, Pricing & Purchase Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Brand & Stock Status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
                    {product.brandCategory}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{product.stockStatus}</span>
                  </div>
                </div>

                {/* Full Title */}
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {product.fullName || product.name}
                </h1>

                {/* Rating & Review summary */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-black text-slate-900">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">({product.reviewCount} customer reviews in Ghana)</span>
                </div>

                {/* Price Box */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#b91c1c] tracking-tight">
                      GH₵ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm font-semibold text-slate-400 line-through">
                        GH₵ {product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="ml-auto text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                        Save GH₵ {(product.originalPrice - product.price).toLocaleString('en-US')}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">
                    Inclusive of all Ghana statutory taxes & standard 12-month ApexTech warranty seal.
                  </p>
                </div>

                {/* Key Specs Pills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Key Specifications
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.specs.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/80 shadow-2xs"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Storage / Configuration selector if applicable */}
                {product.storage && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Internal Storage
                      </label>
                      <span className="text-xs font-bold text-[#073c2c]">{selectedStorage}</span>
                    </div>
                    <div className="flex gap-2">
                      {['64GB', '128GB', '256GB', '512GB'].map((stg) => (
                        <button
                          key={stg}
                          onClick={() => setSelectedStorage(stg)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            selectedStorage === stg
                              ? 'border-[#073c2c] bg-[#073c2c] text-white'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {stg}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color selector */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Finish Color
                    </label>
                    <span className="text-xs font-semibold text-slate-600">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {['Titanium Gray', 'Phantom Black', 'Ice Blue', 'Deep Emerald'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'border-slate-900 bg-slate-900 text-white font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Order Actions */}
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <label className="text-xs font-bold text-slate-700 uppercase">Quantity:</label>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1.5 hover:bg-slate-200 text-slate-700 font-black cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 font-bold text-sm text-slate-900 bg-white min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1.5 hover:bg-slate-200 text-slate-700 font-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleAdd}
                      className="w-full bg-[#073c2c] hover:bg-[#052d21] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm hover:shadow active:scale-98"
                    >
                      <ShoppingBag className="w-4 h-4 text-emerald-300" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm hover:shadow active:scale-98"
                    >
                      <span>Buy Now (MoMo)</span>
                    </button>
                  </div>

                  {/* Toast Alert */}
                  {addedToast && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-900 p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Added {quantity} × {product.name} to your cart!</span>
                    </div>
                  )}

                  {/* WhatsApp Quick Order button */}
                  <a
                    href={`https://wa.me/233503607980?text=${encodeURIComponent(
                      `Hello ApexTech Ghana! I want to order ${product.fullName || product.name} (${product.price} GHS). Please confirm stock availability.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full border border-emerald-600/40 hover:bg-emerald-50/80 text-emerald-900 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Order via WhatsApp Hotline (050 360 7980)</span>
                  </a>
                </div>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <strong className="block text-slate-900 font-bold">100% Authentic</strong>
                    <span className="text-[11px] text-slate-500">Official Factory Seal</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Ghana Dispatch</strong>
                    <span className="text-[11px] text-slate-500">Same-Day in Accra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOWER SECTION: Comprehensive Information Tabs */}
          <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-8">
            {/* Tab Buttons */}
            <div className="flex border-b border-slate-200 gap-4 sm:gap-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'specs'
                    ? 'border-[#073c2c] text-[#073c2c]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Full Tech Specifications
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`pb-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'delivery'
                    ? 'border-[#073c2c] text-[#073c2c]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Ghana Showroom Availability & Delivery
              </button>
              <button
                onClick={() => setActiveTab('warranty')}
                className={`pb-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'warranty'
                    ? 'border-[#073c2c] text-[#073c2c]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Warranty & Authenticity Seal
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-[#073c2c] text-[#073c2c]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Customer Reviews ({product.reviewCount})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-6">
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {product.description ||
                      `The ${product.fullName} provides premier performance, certified Ghana warranty, and genuine manufacturer specifications designed for power and reliability.`}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex justify-between">
                      <span className="text-slate-500 font-medium">Manufacturer / Brand</span>
                      <span className="font-bold text-slate-900">{product.brand}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex justify-between">
                      <span className="text-slate-500 font-medium">Model Line</span>
                      <span className="font-bold text-slate-900">{product.name}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex justify-between">
                      <span className="text-slate-500 font-medium">Internal Storage</span>
                      <span className="font-bold text-slate-900">{product.storage || '128GB ROM'}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex justify-between">
                      <span className="text-slate-500 font-medium">Memory (RAM)</span>
                      <span className="font-bold text-slate-900">{product.ram || '8GB RAM'}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex justify-between">
                      <span className="text-slate-500 font-medium">Finish & Chassis</span>
                      <span className="font-bold text-slate-900">{selectedColor}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex justify-between">
                      <span className="text-slate-500 font-medium">Country Specification</span>
                      <span className="font-bold text-slate-900">Ghana (Official West Africa Spec)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>Physical Showroom Stock in Ghana</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs">
                      {(product.inStockBranches || [
                        'Kwame Nkrumah Circle (Flagship Showroom)',
                        'Oxford Street, Osu Accra',
                        'Adum Kumasi (Opposite Central Post)',
                        'Kejetia Terminal Kumasi',
                        'Market Circle, Takoradi'
                      ]).map((branch, i) => (
                        <li key={i} className="flex items-center justify-between text-slate-700 pb-2 border-b border-slate-100 last:border-0">
                          <span className="font-medium">{branch}</span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            Available for Walk-in Pickup
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>Doorstep Express Dispatch</span>
                    </h4>
                    <div className="space-y-3 text-xs text-slate-600">
                      <p>
                        <strong className="text-slate-900">Greater Accra:</strong> Same-day dispatch for orders placed before 3:00 PM. Delivered by verified ApexTech rider.
                      </p>
                      <p>
                        <strong className="text-slate-900">Ashanti Region (Kumasi):</strong> Next-day delivery to your doorstep or pickup at Adum / Kejetia hubs.
                      </p>
                      <p>
                        <strong className="text-slate-900">Other Regions (Takoradi, Tamale, Sunyani):</strong> 24–48 hours nationwide express logistics.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'warranty' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Official ApexTech 12-Month Coverage</h4>
                      <p className="text-xs text-slate-500">Full manufacturer replacement and repair warranty across all 35 retail hubs</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every piece of tech purchased from ApexTech Ghana is 100% authentic, brand-new, and sealed with the official distributor warranty sticker. If your device experiences manufacturer defects within 12 months, simply bring your receipt to any ApexTech service desk for prompt diagnostic support, repair, or unit replacement.
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-extrabold uppercase text-slate-900">Verified Customer Feedback</h4>
                      <span className="text-xs font-bold text-emerald-800">100% Verified Ghana Purchases</span>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-slate-800">Kwame Osei - East Legon</strong>
                          <div className="flex text-amber-500 text-xs">★★★★★</div>
                        </div>
                        <p className="text-slate-600">
                          Original sealed device received within 2 hours after paying with MTN MoMo. Customer service was excellent!
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-slate-800">Abena Mensah - Kumasi Adum</strong>
                          <div className="flex text-amber-500 text-xs">★★★★★</div>
                        </div>
                        <p className="text-slate-600">
                          Picked up at the Adum branch. The staff assisted in setup and verified the 12-month warranty certificate right away.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED TECH & ACCESSORIES */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Frequently Bought Together & Related Tech</h3>
                <p className="text-xs text-slate-500 font-medium">Explore matching accessories, chargers, and alternatives</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectProduct(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="w-full h-28 sm:h-36 bg-slate-50 rounded-lg sm:rounded-xl flex items-center justify-center p-1.5 sm:p-2 mb-2 sm:mb-3">
                    <TechGraphic
                      category={rel.category}
                      type={rel.graphicType || rel.phoneType || 'phone'}
                      angle="duo"
                      uploadedImages={rel.uploadedImages}
                      zoomLevel={1}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase">{rel.brandCategory}</span>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-[#073c2c] transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-black text-slate-900">
                      GH₵ {rel.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(rel, 1);
                    }}
                    className="mt-2.5 sm:mt-3 w-full bg-slate-100 hover:bg-[#073c2c] hover:text-white text-slate-800 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
