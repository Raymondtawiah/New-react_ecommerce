import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingBag,
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Upload,
  Eye,
  Camera
} from 'lucide-react';
import { Product, ProductImageAngles } from '../types';
import { TechGraphic } from './TechGraphics';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onUpdateProductImages?: (productId: string, images: ProductImageAngles) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onUpdateProductImages
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage || '128GB');
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeAngle, setActiveAngle] = useState<'duo' | 'front' | 'back' | 'side' | 'detail'>('duo');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [customUploads, setCustomUploads] = useState<ProductImageAngles>(product?.uploadedImages || {});

  if (!product) return null;

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.5, Math.max(1, +(prev + delta).toFixed(1))));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, angleKey: keyof ProductImageAngles) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const updated = { ...customUploads, [angleKey]: dataUrl };
        setCustomUploads(updated);
        if (onUpdateProductImages) {
          onUpdateProductImages(product.id, updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const currentUploadedImage =
    activeAngle === 'front'
      ? customUploads.front
      : activeAngle === 'back'
      ? customUploads.back
      : activeAngle === 'side'
      ? customUploads.side
      : activeAngle === 'detail'
      ? customUploads.detail
      : undefined;

  const angleTabs: Array<{ id: typeof activeAngle; label: string; icon: string }> = [
    { id: 'duo', label: 'Side-by-Side', icon: '✨' },
    { id: 'front', label: 'Front Display', icon: '📱' },
    { id: 'back', label: 'Back & Camera', icon: '🔄' },
    { id: 'side', label: 'Profile & Ports', icon: '📐' },
    { id: 'detail', label: 'Certified Box', icon: '📦' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Visual Display with Multi-Angle View & Zooming System */}
            <div className="flex flex-col">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[280px]">
                {/* Badges on top-left */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {product.badges.map((b, i) => (
                    <span key={i} className={`text-[9px] px-2 py-0.5 rounded uppercase font-bold ${b.bgClass}`}>
                      {b.text}
                    </span>
                  ))}
                </div>

                {/* Interactive Zoom Controls Floating Bar */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-xl p-1 shadow-xs z-10">
                  <button
                    onClick={() => handleZoom(0.3)}
                    disabled={zoomLevel >= 2.5}
                    className="p-1 text-slate-700 hover:text-black hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                    title="Zoom In (+)"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono font-bold px-1 text-slate-600">
                    {zoomLevel}x
                  </span>
                  <button
                    onClick={() => handleZoom(-0.3)}
                    disabled={zoomLevel <= 1}
                    className="p-1 text-slate-700 hover:text-black hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                    title="Zoom Out (-)"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  {zoomLevel > 1 && (
                    <button
                      onClick={handleResetZoom}
                      className="p-1 text-slate-500 hover:text-black hover:bg-slate-100 rounded-lg cursor-pointer"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Main Visual Display */}
                <div className="w-full py-4 flex items-center justify-center overflow-hidden">
                  <TechGraphic
                    type={product.graphicType || product.phoneType || 'phone'}
                    angle={activeAngle}
                    uploadedImageUrl={currentUploadedImage}
                    zoomLevel={zoomLevel}
                    className="scale-115"
                  />
                </div>

                {/* Angle Tag indicator */}
                <div className="mt-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  View: <span className="text-slate-800">{activeAngle.replace('_', ' ')}</span>
                  {currentUploadedImage && ' • (Custom Uploaded Image)'}
                </div>
              </div>

              {/* Angle Switcher Tabs & Thumbnails */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                  <span>Product Inspection Angles:</span>
                  <span className="text-[10px] text-emerald-700">Click to view angle</span>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {angleTabs.map((tab) => {
                    const isSelected = activeAngle === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveAngle(tab.id);
                          setZoomLevel(1);
                        }}
                        className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-[#073c2c] text-white border-[#073c2c] shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="text-sm">{tab.icon}</span>
                        <span className="text-[9px] font-bold truncate max-w-full block mt-0.5">
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Customer / Vendor Photo Upload Bar */}
                <div className="mt-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span className="text-[11px] font-medium text-slate-600">
                      Upload photo for this angle:
                    </span>
                  </div>
                  <label className="bg-[#073c2c] hover:bg-[#05291e] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Upload {activeAngle}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, activeAngle as keyof ProductImageAngles)}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
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

              {/* Storage / Memory options */}
              {product.storage && (
                <div className="mt-4">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                    Storage / Memory Configuration
                  </label>
                  <div className="flex gap-2">
                    {['64GB', '128GB', '256GB', '512GB'].map((st) => (
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
              )}

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
