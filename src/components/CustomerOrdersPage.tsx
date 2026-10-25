import React, { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Phone,
  RotateCcw,
  Download,
  Search,
  ExternalLink,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types';
import { TechGraphic } from './TechGraphics';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'dispatched' | 'delivered';
  totalAmount: number;
  paymentMethod: 'MTN MoMo' | 'Telecel Cash' | 'Bank Card' | 'Cash on Delivery';
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  dispatchHub: string;
  riderName?: string;
  riderPhone?: string;
  items: {
    product: Product;
    quantity: number;
    selectedStorage?: string;
    unitPrice: number;
  }[];
}

interface CustomerOrdersPageProps {
  orders: CustomerOrder[];
  onBackToShop: () => void;
  onSelectProduct: (product: Product) => void;
  onReorder: (order: CustomerOrder) => void;
}

export const CustomerOrdersPage: React.FC<CustomerOrdersPageProps> = ({
  orders,
  onBackToShop,
  onSelectProduct,
  onReorder
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'processing' | 'dispatched' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderModal, setSelectedOrderModal] = useState<CustomerOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      searchQuery.trim() === '' ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((i) => i.product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: CustomerOrder['status']) => {
    switch (status) {
      case 'processing':
        return {
          label: 'Processing at Hub',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500'
        };
      case 'dispatched':
        return {
          label: 'Dispatched with Express Rider',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500 animate-ping'
        };
      case 'delivered':
        return {
          label: 'Delivered & Received',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-600'
        };
    }
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
                <span className="font-bold text-slate-900">My Orders & Tracking</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Customer Orders & Live Delivery Tracking
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Track your authentic technology parcels dispatched from Franko Trading showrooms across Ghana.
              </p>
            </div>

            <button
              onClick={onBackToShop}
              className="self-start sm:self-auto bg-[#073c2c] hover:bg-[#052d21] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span>Browse Tech Catalog</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {(
              [
                { id: 'all', label: `All Orders (${orders.length})` },
                { id: 'dispatched', label: 'On The Way (Rider)' },
                { id: 'processing', label: 'Processing' },
                { id: 'delivered', label: 'Delivered' }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  filterStatus === tab.id
                    ? 'bg-[#073c2c] text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID or product..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
            />
          </div>
        </div>

        {/* Orders Listing */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">No Orders Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You don't have any orders matching this filter. Place an order from the catalog to enjoy same-day express delivery in Ghana.
            </p>
            <button
              onClick={onBackToShop}
              className="mt-5 inline-flex items-center gap-2 bg-[#073c2c] hover:bg-[#052d21] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Explore Latest Technology Deals</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const badge = getStatusBadge(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all overflow-hidden"
                >
                  {/* Order Card Header */}
                  <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
                        <Package className="w-5 h-5 text-[#073c2c]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-black text-slate-900 font-mono">
                            {order.orderNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1.5 ${badge.bg}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          Placed on {order.date} • Paid via {order.paymentMethod}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Order Total</span>
                        <span className="text-sm sm:text-base font-black text-slate-900">
                          GH₵ {order.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedOrderModal(order)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#073c2c] hover:bg-[#052d21] text-white transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>View Tracking</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="p-4 sm:p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Products List */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => onSelectProduct(item.product)}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                          >
                            <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center p-1 shrink-0 border border-slate-200">
                              <TechGraphic
                                category={item.product.category}
                                type={item.product.graphicType || item.product.phoneType || 'phone'}
                                angle="front"
                                uploadedImages={item.product.uploadedImages}
                                zoomLevel={1}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#073c2c] transition-colors truncate">
                                {item.product.fullName || item.product.name}
                              </h4>
                              <p className="text-[11px] text-slate-500">
                                Qty: <strong className="text-slate-800">{item.quantity}</strong>
                                {item.selectedStorage && ` • ${item.selectedStorage}`}
                              </p>
                            </div>
                            <div className="text-xs font-black text-slate-900 shrink-0">
                              GH₵ {(item.unitPrice * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery & Logistics Snippet */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2.5">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-800 font-bold block">Delivery Address:</strong>
                            <span className="text-slate-600">{order.deliveryAddress}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Truck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-800 font-bold block">Dispatch Hub:</strong>
                            <span className="text-slate-600">{order.dispatchHub}</span>
                          </div>
                        </div>

                        {order.riderName && (
                          <div className="flex items-start gap-2 pt-2 border-t border-slate-200">
                            <Phone className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-slate-800 font-bold block">Rider Assigned:</strong>
                              <span className="text-slate-600">
                                {order.riderName} ({order.riderPhone})
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between text-[11px]">
                          <button
                            onClick={() => onReorder(order)}
                            className="font-bold text-[#073c2c] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reorder Items</span>
                          </button>
                          <span className="text-slate-400 font-medium">12-Month Franko Warranty Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* TRACKING MODAL POPUP */}
      {selectedOrderModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div onClick={() => setSelectedOrderModal(null)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
          <div className="min-h-screen px-4 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-200">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Live Dispatch Logistics
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    Order Tracking: {selectedOrderModal.orderNumber}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Central Ghana Dispatch System • {selectedOrderModal.dispatchHub}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrderModal(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Progress Milestones */}
              <div className="py-6">
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {/* Step 1 */}
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -left-6 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">Order Placed & Payment Verified</strong>
                      <span className="text-[11px] text-slate-500">
                        Authorized via {selectedOrderModal.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start gap-3">
                    <div
                      className={`absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white ${
                        selectedOrderModal.status !== 'processing'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 text-white animate-pulse'
                      }`}
                    >
                      <Package className="w-2.5 h-2.5" />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">
                        Inspected & Boxed at {selectedOrderModal.dispatchHub}
                      </strong>
                      <span className="text-[11px] text-slate-500">
                        12-Month Franko Warranty Seal stamped and serial registered
                      </span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-start gap-3">
                    <div
                      className={`absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white ${
                        selectedOrderModal.status === 'delivered'
                          ? 'bg-emerald-600 text-white'
                          : selectedOrderModal.status === 'dispatched'
                          ? 'bg-amber-500 text-white animate-pulse'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      <Truck className="w-2.5 h-2.5" />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">
                        Out for Delivery with Express Rider
                      </strong>
                      <span className="text-[11px] text-slate-500">
                        {selectedOrderModal.riderName
                          ? `Rider: ${selectedOrderModal.riderName} (${selectedOrderModal.riderPhone})`
                          : 'Motorbike express rider departing to recipient address'}
                      </span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex items-start gap-3">
                    <div
                      className={`absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white ${
                        selectedOrderModal.status === 'delivered'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">Delivered & Verified by Customer</strong>
                      <span className="text-[11px] text-slate-500">
                        Handed over safely with official VAT printed receipt
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <a
                  href={`https://wa.me/233503607980?text=${encodeURIComponent(
                    `Hello Franko Trading, I am following up on my order ${selectedOrderModal.orderNumber}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact Hub Dispatch Desk</span>
                </a>
                <button
                  onClick={() => setSelectedOrderModal(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
