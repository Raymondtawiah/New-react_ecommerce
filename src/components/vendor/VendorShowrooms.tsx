import React, { useState } from 'react';
import { Store, ArrowRightLeft, CheckCircle2, Phone, AlertCircle } from 'lucide-react';
import { ShowroomStockAllocation } from '../../types/vendor';

interface VendorShowroomsProps {
  showrooms: ShowroomStockAllocation[];
  onTransferStock: (fromId: string, toId: string, amount: number) => void;
}

export const VendorShowrooms: React.FC<VendorShowroomsProps> = ({ showrooms, onTransferStock }) => {
  const [fromBranch, setFromBranch] = useState(showrooms[0]?.branchId || '');
  const [toBranch, setToBranch] = useState(showrooms[1]?.branchId || '');
  const [transferAmount, setTransferAmount] = useState(10);
  const [successNote, setSuccessNote] = useState('');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromBranch || !toBranch || fromBranch === toBranch) {
      alert('Please select two distinct ApexTech showroom branches.');
      return;
    }
    onTransferStock(fromBranch, toBranch, transferAmount);
    setSuccessNote(`Successfully dispatched ${transferAmount} smartphones from ${showrooms.find(s=>s.branchId===fromBranch)?.branchName} to ${showrooms.find(s=>s.branchId===toBranch)?.branchName}!`);
    setTimeout(() => setSuccessNote(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Transfer Console */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <ArrowRightLeft className="w-4 h-4 text-[#073c2c]" />
          <h3 className="text-sm font-extrabold text-slate-900">
            Showroom-to-Showroom Stock Rebalancing
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Transfer smartphone inventory between regional warehouses and retail branches across Ghana.
        </p>

        {successNote && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successNote}</span>
          </div>
        )}

        <form onSubmit={handleTransfer} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-500 font-bold mb-1">Source Showroom</label>
            <select
              value={fromBranch}
              onChange={(e) => setFromBranch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium focus:ring-1 focus:ring-[#073c2c]"
            >
              {showrooms.map((s) => (
                <option key={s.branchId} value={s.branchId}>
                  {s.city}: {s.branchName} ({s.stockCount} units)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-1">Destination Showroom</label>
            <select
              value={toBranch}
              onChange={(e) => setToBranch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium focus:ring-1 focus:ring-[#073c2c]"
            >
              {showrooms.map((s) => (
                <option key={s.branchId} value={s.branchId}>
                  {s.city}: {s.branchName} ({s.stockCount} units)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-1">Quantity (Units)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={transferAmount}
              onChange={(e) => setTransferAmount(Number(e.target.value))}
              className="w-full border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900 focus:ring-1 focus:ring-[#073c2c]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#073c2c] hover:bg-[#05291e] text-white py-2.5 px-4 rounded-xl font-bold cursor-pointer transition-colors shadow-xs"
            >
              Authorize Transfer
            </button>
          </div>
        </form>
      </div>

      {/* Showroom Stock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {showrooms.map((sh) => {
          const isLow = sh.stockCount <= sh.lowStockThreshold;
          return (
            <div
              key={sh.branchId}
              className={`bg-white border rounded-2xl p-5 shadow-2xs relative transition-all ${
                isLow ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200/90'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {sh.city} Regional Hub
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-0.5 leading-snug">
                    {sh.branchName}
                  </h4>
                </div>
                <div className={`p-2 rounded-xl shrink-0 ${isLow ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 text-[#073c2c]'}`}>
                  <Store className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between pt-3 border-t border-slate-100">
                <div>
                  <span className="text-2xl font-black text-slate-900 tabular-nums">
                    {sh.stockCount}
                  </span>
                  <span className="text-xs text-slate-400 ml-1 font-semibold">units</span>
                </div>
                {isLow ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <AlertCircle className="w-3 h-3" />
                    <span>Low Stock</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Optimal Stock
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-50">
                <span>Branch Lead Phone:</span>
                <a
                  href={`tel:${sh.managerContact}`}
                  className="font-mono font-bold text-slate-700 hover:text-[#073c2c] flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>{sh.managerContact}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
