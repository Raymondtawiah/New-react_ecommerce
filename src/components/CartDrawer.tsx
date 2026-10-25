import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { PhoneGraphic } from './PhoneGraphics';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  subtotal: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  subtotal
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'telecel' | 'card' | 'cod'>('momo');
  const [momoNumber, setMomoNumber] = useState('024 456 7890');
  const [customerName, setCustomerName] = useState('');
  const [deliveryRegion, setDeliveryRegion] = useState('Greater Accra (Same-day dispatch)');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FRANKO50') {
      setDiscount(50);
    } else {
      alert('Invalid code. Try FRANKO50');
    }
  };

  const finalTotal = Math.max(0, subtotal - discount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {checkoutStep === 'cart' ? 'Your Shopping Cart' : checkoutStep === 'checkout' ? 'Ghana Express Checkout' : 'Order Confirmed!'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {items.length} item{items.length !== 1 ? 's' : ''} in cart
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {checkoutStep === 'cart' ? (
              items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <X className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 mt-1">Explore our genuine smartphones catalog and add your favorites.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free Delivery meter */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900">
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>✓ Eligible for FREE Nationwide Express Delivery!</span>
                    </div>
                    <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-full" />
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-slate-100">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="py-3 flex items-center gap-3">
                        <div className="w-16 h-16 bg-slate-50 rounded-xl border border-slate-200 p-1 flex items-center justify-center shrink-0">
                          <div className="scale-65">
                            <PhoneGraphic type={product.phoneType} />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {product.name}
                          </h4>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {product.storage} • {product.ram} RAM
                          </div>
                          <div className="text-xs font-black text-slate-900 mt-1">
                            GH₵ {(product.price * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Promo code input */}
                  <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (try FRANKO50)"
                      className="flex-1 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {discount > 0 && (
                    <div className="text-xs text-emerald-600 font-bold">
                      ✓ Promo FRANKO50 applied (-GH₵ 50.00)
                    </div>
                  )}
                </div>
              )
            ) : checkoutStep === 'checkout' ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Kwame Mensah"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Destination Region</label>
                  <select
                    value={deliveryRegion}
                    onChange={(e) => setDeliveryRegion(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                  >
                    <option>Greater Accra (Same-day dispatch)</option>
                    <option>Ashanti Region - Kumasi (Next-day)</option>
                    <option>Western Region - Takoradi</option>
                    <option>Northern Region - Tamale</option>
                    <option>Bono Region - Sunyani</option>
                    <option>Central Region - Cape Coast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Payment Rail</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('momo')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        paymentMethod === 'momo'
                          ? 'border-[#073c2c] bg-emerald-50 text-emerald-950 font-bold ring-1 ring-[#073c2c]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-xs">🟡 MTN MoMo</span>
                      <span className="text-[10px] text-slate-500 font-normal">Ghana's #1 mobile wallet</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('telecel')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        paymentMethod === 'telecel'
                          ? 'border-[#073c2c] bg-emerald-50 text-emerald-950 font-bold ring-1 ring-[#073c2c]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-xs">🔴 Telecel Cash</span>
                      <span className="text-[10px] text-slate-500 font-normal">Instant 0% fees</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#073c2c] bg-emerald-50 text-emerald-950 font-bold ring-1 ring-[#073c2c]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-xs">💳 Bank Card</span>
                      <span className="text-[10px] text-slate-500 font-normal">Visa / Mastercard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#073c2c] bg-emerald-50 text-emerald-950 font-bold ring-1 ring-[#073c2c]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-xs">📦 Cash on Delivery</span>
                      <span className="text-[10px] text-slate-500 font-normal">Accra & Kumasi only</span>
                    </button>
                  </div>
                </div>

                {(paymentMethod === 'momo' || paymentMethod === 'telecel') && (
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Mobile Money Number</label>
                    <input
                      type="text"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      placeholder="024 XXX XXXX"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      A prompt will appear on your handset to authorize Ghana Cedi payment.
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Payment Confirmed!
                </h3>
                <p className="text-xs text-slate-600 mt-2 max-w-xs mx-auto">
                  Your order has been registered in the Franko Trading central dispatch system. Order tracking ID: <strong className="font-mono text-slate-900">FT-GH-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </p>
                <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dispatch Hub:</span>
                    <span className="font-bold text-slate-800">Kwame Nkrumah Circle Central</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Official Warranty:</span>
                    <span className="font-bold text-emerald-700">12 Months Full Coverage</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Paid:</span>
                    <span className="font-bold text-slate-900">GH₵ {finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {items.length > 0 && checkoutStep !== 'success' && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50">
              <div className="space-y-1.5 mb-4 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    GH₵ {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount (FRANKO50)</span>
                    <span>-GH₵ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Nationwide Express Delivery</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-base text-[#b91c1c]">
                    GH₵ {finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <span>Proceed to Ghana Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl font-bold text-xs cursor-pointer transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCheckoutStep('success')}
                    className="w-2/3 bg-[#073c2c] hover:bg-[#05291e] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Authorize GH₵ {finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="w-full bg-[#073c2c] hover:bg-[#05291e] text-white py-3 rounded-xl font-bold text-xs cursor-pointer transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
