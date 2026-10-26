import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const NewsletterBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="mt-8 mb-12">
      <div className="bg-[#043324] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-md">
        {/* Subtle geometric background overlay */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-600/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Text */}
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Subscribe to ApexTech Flash Offers
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1.5 leading-relaxed">
              Get direct weekly discounts on flagship smartphones, home electronics, and seasonal promotions delivered to your inbox.
            </p>
          </div>

          {/* Right Input & Action */}
          <div className="w-full lg:w-auto shrink-0 max-w-md">
            {isSubmitted ? (
              <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl py-3 px-5 flex items-center gap-2.5 text-emerald-200 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Thank you! You've unlocked coupon <strong className="text-white font-mono">APEX50</strong> for GH₵ 50 off your next smartphone!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your active email address..."
                  className="w-full sm:w-80 px-4 py-3 rounded-xl bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-medium"
                />
                <button
                  type="submit"
                  className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer shadow-sm active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
