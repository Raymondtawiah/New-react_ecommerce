import React, { useState } from 'react';
import {
  LayoutDashboard,
  Smartphone,
  Package,
  Store,
  Wallet,
  ShieldAlert,
  ArrowLeft,
  Plus,
  Bell,
  User,
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Product } from '../../types';
import { VendorOrder, ShowroomStockAllocation, VendorPayout, WarrantyClaim } from '../../types/vendor';
import { VendorOverview } from './VendorOverview';
import { VendorProducts } from './VendorProducts';
import { VendorOrders } from './VendorOrders';
import { VendorShowrooms } from './VendorShowrooms';
import { VendorPayouts } from './VendorPayouts';
import { AddProductModal } from './AddProductModal';
import { Logo } from '../Logo';

interface VendorDashboardProps {
  products: Product[];
  orders: VendorOrder[];
  showrooms: ShowroomStockAllocation[];
  payouts: VendorPayout[];
  warrantyClaims: WarrantyClaim[];
  onBackToStorefront: () => void;
  onAddProduct: (product: Product) => void;
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: VendorOrder['status']) => void;
  onTransferStock: (fromId: string, toId: string, amount: number) => void;
  onRequestPayout: (payout: VendorPayout) => void;
  onViewProductOnStorefront: (product: Product) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({
  products,
  orders,
  showrooms,
  payouts,
  warrantyClaims,
  onBackToStorefront,
  onAddProduct,
  onUpdateProductPrice,
  onDeleteProduct,
  onUpdateOrderStatus,
  onTransferStock,
  onRequestPayout,
  onViewProductOnStorefront
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'showrooms' | 'payouts' | 'warranty'>('overview');
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);

  interface NavItem {
    id: 'overview' | 'products' | 'orders' | 'showrooms' | 'payouts' | 'warranty';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Inventory & Phones', icon: Smartphone, badge: products.length },
    { id: 'orders', label: 'Orders & Logistics', icon: Package, badge: orders.filter(o => o.status === 'processing' || o.status === 'dispatched').length },
    { id: 'showrooms', label: 'Showroom Stock (35)', icon: Store },
    { id: 'payouts', label: 'Payouts & MoMo', icon: Wallet },
    { id: 'warranty', label: 'Warranty Claims', icon: ShieldAlert, badge: warrantyClaims.length }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col antialiased">
      {/* Vendor Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Brand + Breadcrumb */}
          <div className="flex items-center gap-4">
            <div onClick={onBackToStorefront} className="cursor-pointer">
              <Logo />
            </div>
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="font-bold text-[#073c2c]">Partner Central</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="capitalize text-slate-800 font-semibold">{activeTab}</span>
            </div>
          </div>

          {/* Right Action: Back to Storefront button & Add Smartphone */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAddProductModalOpen(true)}
              className="bg-[#073c2c] hover:bg-[#05291e] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Smartphone</span>
            </button>

            <button
              onClick={onBackToStorefront}
              className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Customer Storefront</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace with Sidebar & Viewport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
            <div className="pb-3 border-b border-slate-100 mb-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#073c2c] flex items-center justify-center font-bold text-xs">
                FT
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-slate-900 truncate">
                  Samsung & Brand Partner
                </h4>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Verified Official
                </span>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#073c2c] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Hub Assistance Info */}
          <div className="bg-[#07392a] text-white rounded-2xl p-4 text-xs space-y-2 border border-emerald-900/40">
            <span className="text-[10px] uppercase font-bold text-emerald-300">
              Partner Desk Support
            </span>
            <p className="text-[11px] text-emerald-100/90 leading-relaxed">
              Need immediate stock re-allocation across Circle, Osu, or Adum Kumasi?
            </p>
            <div className="pt-1 font-mono font-bold text-white">
              Ghana Hub: 030 222 5651
            </div>
          </div>
        </aside>

        {/* Right Active Viewport */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && (
            <VendorOverview
              products={products}
              orders={orders}
              onNavigateTab={(t) => setActiveTab(t as any)}
              onOpenAddProduct={() => setAddProductModalOpen(true)}
              onOpenPayout={() => setActiveTab('payouts')}
            />
          )}

          {activeTab === 'products' && (
            <VendorProducts
              products={products}
              onOpenAddProduct={() => setAddProductModalOpen(true)}
              onUpdateProductPrice={onUpdateProductPrice}
              onDeleteProduct={onDeleteProduct}
              onViewProductOnStorefront={onViewProductOnStorefront}
            />
          )}

          {activeTab === 'orders' && (
            <VendorOrders
              orders={orders}
              onUpdateOrderStatus={onUpdateOrderStatus}
            />
          )}

          {activeTab === 'showrooms' && (
            <VendorShowrooms
              showrooms={showrooms}
              onTransferStock={onTransferStock}
            />
          )}

          {activeTab === 'payouts' && (
            <VendorPayouts
              payouts={payouts}
              onRequestPayout={onRequestPayout}
            />
          )}

          {activeTab === 'warranty' && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900">
                  Franko 12-Month Official Warranty Claims
                </h3>
                <p className="text-xs text-slate-500">
                  Track devices undergoing inspection or authorized repairs at nationwide Franko service hubs
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="pb-3 pl-2">Claim ID</th>
                      <th className="pb-3">Device Model</th>
                      <th className="pb-3">Customer IMEI</th>
                      <th className="pb-3">Reported Issue</th>
                      <th className="pb-3">Repair Center</th>
                      <th className="pb-3 text-center pr-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {warrantyClaims.map((wc) => (
                      <tr key={wc.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 pl-2 font-mono font-bold text-slate-900">{wc.claimId}</td>
                        <td className="py-3 font-semibold text-slate-800">{wc.deviceModel}</td>
                        <td className="py-3 font-mono text-slate-500">{wc.imei}</td>
                        <td className="py-3 text-slate-600 max-w-[200px] truncate">{wc.issueDescription}</td>
                        <td className="py-3 text-slate-500">{wc.repairCenter}</td>
                        <td className="py-3 text-center pr-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                            {wc.status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={addProductModalOpen}
        onClose={() => setAddProductModalOpen(false)}
        onAddProduct={onAddProduct}
      />
    </div>
  );
};
