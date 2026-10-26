import React, { useState } from 'react';
import { Search, Filter, Truck, CheckCircle2, Clock, Phone, MapPin } from 'lucide-react';
import { VendorOrder } from '../../types/vendor';

interface VendorOrdersProps {
  orders: VendorOrder[];
  onUpdateOrderStatus: (orderId: string, status: VendorOrder['status']) => void;
}

export const VendorOrders: React.FC<VendorOrdersProps> = ({ orders, onUpdateOrderStatus }) => {
  const [statusFilter, setStatusFilter] = useState<'all' | VendorOrder['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesQuery =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.deliveryRegion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Ghana Dispatch & Logistics Queue</h3>
          <p className="text-xs text-slate-500">
            Fulfill and track orders across ApexTech nationwide courier hubs
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'processing', 'dispatched', 'delivered'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize cursor-pointer transition-colors ${
                statusFilter === st
                  ? 'bg-[#073c2c] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by Order ID (e.g. FT-GH-...), customer name, or location..."
          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
              <th className="pb-3 pl-2">Order Ref & Time</th>
              <th className="pb-3">Customer Contact</th>
              <th className="pb-3">Device Item</th>
              <th className="pb-3">Delivery Destination</th>
              <th className="pb-3">Payment Rail</th>
              <th className="pb-3 text-right">Amount (GH₵)</th>
              <th className="pb-3 text-center">Fulfillment Status</th>
              <th className="pb-3 text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 pl-2">
                  <div className="font-mono font-bold text-slate-900">{ord.orderNumber}</div>
                  <div className="text-[10px] text-slate-400">{ord.createdAt}</div>
                </td>

                <td className="py-3">
                  <div className="font-bold text-slate-800">{ord.customerName}</div>
                  <a
                    href={`tel:${ord.customerPhone}`}
                    className="text-[10px] text-emerald-700 hover:underline font-mono flex items-center gap-1"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    <span>{ord.customerPhone}</span>
                  </a>
                </td>

                <td className="py-3 font-semibold text-slate-800">
                  {ord.productName}
                  <span className="text-[10px] text-slate-400 block font-normal">
                    Qty: {ord.quantity}
                  </span>
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-1 text-slate-700 font-medium">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate max-w-[140px]">{ord.deliveryRegion}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    Hub: {ord.dispatchHub}
                  </span>
                </td>

                <td className="py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold">
                    {ord.paymentMethod}
                  </span>
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
                        : ord.status === 'processing'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {ord.status}
                  </span>
                </td>

                <td className="py-3 text-right pr-2">
                  <select
                    value={ord.status}
                    onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as VendorOrder['status'])}
                    className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="processing">Processing</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
