import React from 'react';
import { DollarSign, Package, TrendingUp, AlertTriangle, ArrowUpRight, Truck, Store, Clock } from 'lucide-react';
import { Product } from '../../types';
import { VendorOrder } from '../../types/vendor';

interface VendorOverviewProps {
  products: Product[];
  orders: VendorOrder[];
  onNavigateTab: (tab: string) => void;
  onOpenAddProduct: () => void;
  onOpenPayout: () => void;
}

export const VendorOverview: React.FC<VendorOverviewProps> = ({
  products,
  orders,
  onNavigateTab,
  onOpenAddProduct,
  onOpenPayout
}) => {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalPrice : 0), 248950);
  const activeOrdersCount = orders.filter(o => o.status === 'processing' || o.status === 'dispatched').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#073c2c] to-[#04281d] rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm border border-emerald-950">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            Franko Partner Central • Official Distributor Desk
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            Welcome back, Samsung & Multi-Brand Hub
          </h2>
          <p className="text-xs text-emerald-100/80 mt-1 max-w-xl">
            Live inventory synchronization across Ghana's 35 official Franko Trading branches and nationwide online dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAddProduct}
            className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            + Add Smartphone
          </button>
          <button
            onClick={onOpenPayout}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
          >
            Request Payout
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">MTD Net Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#073c2c] flex items-center justify-center font-bold text-xs">
              ₵
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 tabular-nums">
              GH₵ {totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Orders Dispatched */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Dispatched Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 tabular-nums">
              418 Units
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
              <span>{activeOrdersCount} in active dispatch right now</span>
            </div>
          </div>
        </div>

        {/* Card 3: Showroom Stock Units */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Live Stock</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 tabular-nums">
              578 Units
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
              <span>Spread across 35 nationwide hubs</span>
            </div>
          </div>
        </div>

        {/* Card 4: Wallet Balance ready for MoMo */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Available MoMo Wallet</span>
            <div className="w-8 h-8 rounded-xl bg-yellow-50 text-yellow-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-[#073c2c] tabular-nums">
              GH₵ 42,500.00
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
              <span>Auto-settlement to MTN / Telecel</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Recent Live Orders & Regional Dispatch Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Recent Customer Orders</h3>
              <p className="text-xs text-slate-500">Live order stream across Ghana payment gateways</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-[#073c2c] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                  <th className="pb-2.5">Order ID</th>
                  <th className="pb-2.5">Customer & Phone</th>
                  <th className="pb-2.5">Device</th>
                  <th className="pb-2.5">Region</th>
                  <th className="pb-2.5 text-right">Total (GH₵)</th>
                  <th className="pb-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                    <td className="py-3">
                      <div className="font-bold text-slate-800">{ord.customerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3 font-medium text-slate-700 truncate max-w-[140px]">
                      {ord.productName}
                    </td>
                    <td className="py-3 text-slate-500 text-[11px] truncate max-w-[120px]">
                      {ord.deliveryRegion}
                    </td>
                    <td className="py-3 text-right font-black text-slate-900 tabular-nums">
                      GH₵ {ord.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'dispatched'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Regional Sales & Showroom Alerts */}
        <div className="space-y-6">
          {/* Ghana Regional Sales Distribution */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
            <h3 className="text-sm font-extrabold text-slate-900 mb-1">Sales by Ghana Region</h3>
            <p className="text-xs text-slate-500 mb-4">Volume distribution across regional hubs</p>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Greater Accra (Circle & Osu)</span>
                  <span className="tabular-nums">54%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#073c2c] h-full rounded-full" style={{ width: '54%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Ashanti Region (Adum & Kejetia)</span>
                  <span className="tabular-nums">26%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '26%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Western Region (Takoradi)</span>
                  <span className="tabular-nums">12%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: '12%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Northern & Bono (Tamale / Sunyani)</span>
                  <span className="tabular-nums">8%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '8%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Hub Logistics Callout */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-amber-900">Takoradi Showroom Low Stock Alert</h4>
              <p className="text-amber-800/90 mt-0.5 leading-relaxed">
                Samsung A08 & Infinix Smart 20 stock is below 12 units in Market Circle Takoradi. Consider dispatching a transfer batch from Circle Central.
              </p>
              <button
                onClick={() => onNavigateTab('showrooms')}
                className="mt-2 text-[11px] font-bold text-amber-900 underline hover:text-black cursor-pointer"
              >
                Manage Showroom Transfers →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
