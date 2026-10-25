import React, { useState } from 'react';
import { DollarSign, ShieldCheck, CheckCircle2, ArrowDownLeft, Clock, AlertCircle } from 'lucide-react';
import { VendorPayout } from '../../types/vendor';

interface VendorPayoutsProps {
  payouts: VendorPayout[];
  onRequestPayout: (payout: VendorPayout) => void;
}

export const VendorPayouts: React.FC<VendorPayoutsProps> = ({ payouts, onRequestPayout }) => {
  const [amount, setAmount] = useState<number>(5000);
  const [channel, setChannel] = useState<VendorPayout['channel']>('MTN MoMo');
  const [recipientNumber, setRecipientNumber] = useState('024 456 7890');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const availableBalance = 42500.0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || amount > availableBalance) {
      alert(`Amount must be between GH₵ 100.00 and GH₵ ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
      return;
    }

    const newPayout: VendorPayout = {
      id: `pay-${Date.now()}`,
      payoutRef: `PAY-GH-${Math.floor(10000 + Math.random() * 90000)}`,
      amount,
      channel,
      recipientNumber,
      status: 'completed',
      date: 'Just now'
    };

    onRequestPayout(newPayout);
    setSubmittedMessage(`Payout of GH₵ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} has been processed to your ${channel} wallet!`);
    setTimeout(() => setSubmittedMessage(''), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Payout Header & Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gradient-to-br from-[#073c2c] to-[#04281d] rounded-2xl p-6 text-white border border-emerald-950 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Vendor Net Settlements Wallet
            </span>
            <div className="mt-2 text-3xl sm:text-4xl font-black tabular-nums">
              GH₵ {availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-emerald-100/80 mt-1">
              Available for immediate same-day Mobile Money or Bank settlement across Ghana.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-800/60 flex items-center gap-6 text-xs text-emerald-200">
            <div>
              <span className="text-[10px] uppercase text-emerald-400 block">Settlement Fee</span>
              <strong className="text-white">0% (Franko Partner Rate)</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-emerald-400 block">Processing Speed</span>
              <strong className="text-white">Instant / Same-Day</strong>
            </div>
          </div>
        </div>

        {/* Instant Settlement Action Box */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <h4 className="text-sm font-extrabold text-slate-900 mb-2">Request Instant Payout</h4>
          <p className="text-xs text-slate-500 mb-3">Disburse to verified Ghana mobile wallet</p>

          {submittedMessage && (
            <div className="mb-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-2.5 text-xs flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{submittedMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Amount (GH₵)</label>
              <input
                type="number"
                min="100"
                max={availableBalance}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full border border-slate-200 rounded-xl p-2 font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Payment Rail</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as VendorPayout['channel'])}
                className="w-full border border-slate-200 rounded-xl p-2 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
              >
                <option value="MTN MoMo">MTN Mobile Money</option>
                <option value="Telecel Cash">Telecel Cash</option>
                <option value="Ghana Interbank (GIP)">Ghana Interbank (GIP Bank)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Recipient Account / Phone</label>
              <input
                type="text"
                value={recipientNumber}
                onChange={(e) => setRecipientNumber(e.target.value)}
                placeholder="024 XXX XXXX"
                className="w-full border border-slate-200 rounded-xl p-2 font-mono focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#073c2c] hover:bg-[#05281d] text-white py-2.5 rounded-xl font-bold cursor-pointer transition-colors shadow-xs"
            >
              Authorize Payout
            </button>
          </form>
        </div>
      </div>

      {/* Historical Payouts Ledger */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
        <h3 className="text-sm font-extrabold text-slate-900 mb-1">Settlement History</h3>
        <p className="text-xs text-slate-500 mb-4">Official financial disbursements to your verified accounts</p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                <th className="pb-3 pl-2">Payout Ref</th>
                <th className="pb-3">Date & Time</th>
                <th className="pb-3">Channel Rail</th>
                <th className="pb-3">Recipient Account</th>
                <th className="pb-3 text-right">Amount (GH₵)</th>
                <th className="pb-3 text-center pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 pl-2 font-mono font-bold text-slate-900">{p.payoutRef}</td>
                  <td className="py-3 text-slate-500">{p.date}</td>
                  <td className="py-3 font-semibold text-slate-800">{p.channel}</td>
                  <td className="py-3 font-mono text-slate-600">{p.recipientNumber}</td>
                  <td className="py-3 text-right font-black text-slate-900 tabular-nums">
                    GH₵ {p.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-center pr-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{p.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
