import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Headphones,
  ShieldCheck,
  CreditCard,
  Truck,
  RotateCcw,
  ExternalLink,
  ChevronUp,
  MessageSquare,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CORPORATE_INFO, RETAIL_LOCATIONS, REGION_TABS, RetailLocation } from '../data/locations';

interface FooterProps {
  onOpenShowrooms?: () => void;
  onOpenHelp?: () => void;
  onOpenWarranty?: () => void;
  onOpenDeliveryTrack?: () => void;
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenShowrooms,
  onOpenHelp,
  onOpenWarranty,
  onOpenDeliveryTrack,
  onOpenAdminPortal
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const filteredLocations = selectedRegion === 'all'
    ? RETAIL_LOCATIONS
    : RETAIL_LOCATIONS.filter((loc) => loc.region === selectedRegion);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyPhone = (phone: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedPhone(phone);
      setTimeout(() => setCopiedPhone(null), 2000);
    }
  };

  return (
    <footer className="bg-[#02170f] text-slate-300 pt-14 pb-8 border-t border-emerald-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. NATIONWIDE SERVICE PILLARS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 border-b border-emerald-900/60">
          <div className="bg-[#042418] border border-emerald-800/50 rounded-2xl p-4 flex items-start gap-3.5 hover:border-emerald-600/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Nationwide Fast Dispatch</h4>
              <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
                Same-day delivery in Accra & Kumasi; 24-48 hrs waybill across all 16 Ghana regions.
              </p>
            </div>
          </div>

          <div className="bg-[#042418] border border-emerald-800/50 rounded-2xl p-4 flex items-start gap-3.5 hover:border-emerald-600/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">12-Month Official Warranty</h4>
              <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
                100% certified authentic devices with manufacturer seals & repair center backing.
              </p>
            </div>
          </div>

          <div className="bg-[#042418] border border-emerald-800/50 rounded-2xl p-4 flex items-start gap-3.5 hover:border-emerald-600/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">35+ Walk-in Hubs</h4>
              <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
                Free 15-minute click & collect or in-person demos at convenient retail showrooms.
              </p>
            </div>
          </div>

          <div className="bg-[#042418] border border-emerald-800/50 rounded-2xl p-4 flex items-start gap-3.5 hover:border-emerald-600/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7-Day Replacement Guarantee</h4>
              <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
                Hassle-free replacement for genuine manufacturer defects verified by our technicians.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 2. INTERACTIVE RETAIL HUBS & LOCATIONS EXPLORER ================= */}
        <div className="py-10 border-b border-emerald-900/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Ghana Nationwide Branch Network
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Our Physical Retail Showrooms & Dispatch Hubs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/80 mt-1">
                Visit any of our 35+ verified retail outlets for live smartphone testing, order pick-up, and warranty assistance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenShowrooms}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-950 cursor-pointer"
              >
                <span>Directory & Google Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {REGION_TABS.map((tab) => {
              const isActive = selectedRegion === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-[#042418] text-slate-300 hover:text-white border border-emerald-900/60 hover:border-emerald-700'
                  }`}
                >
                  {tab.label} <span className="text-[11px] opacity-75">({tab.count})</span>
                </button>
              );
            })}
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredLocations.slice(0, 6).map((loc) => (
              <div
                key={loc.id}
                className="bg-[#032015] border border-emerald-900/60 rounded-2xl p-4 hover:border-emerald-600/70 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {loc.name}
                        </h4>
                        <span className="text-[11px] text-emerald-400/90 font-medium">
                          {loc.city} • {loc.region}
                        </span>
                      </div>
                    </div>
                    {loc.isFlagship && (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-emerald-500/30">
                        Flagship
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300/80 mt-2 font-medium">
                    {loc.address}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Landmark: <span className="text-slate-300">{loc.landmark}</span>
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{loc.hours}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{loc.phone}</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/233${loc.whatsapp.replace(/^0/, '')}?text=Hello%20ApexTech%20Ghana,%20I%20am%20inquiry%20about%20stock%20at%20${encodeURIComponent(loc.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-[11px] font-semibold transition-all inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp Hub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLocations.length > 6 && (
            <div className="mt-5 text-center">
              <button
                onClick={onOpenShowrooms}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
              >
                <span>View all {filteredLocations.length} showroom addresses in this sector →</span>
              </button>
            </div>
          )}
        </div>

        {/* ================= 3. FOUR CORE FOOTER COLUMNS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-12 border-b border-emerald-900/60">
          
          {/* Column 1: Corporate Headquarters & Support */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-6 bg-emerald-400 rounded-full" />
              <span className="text-lg font-black tracking-tight text-white">
                APEX TECH GHANA
              </span>
            </div>
            <p className="text-xs text-slate-300/80 leading-relaxed mb-4">
              Ghana's certified consumer electronics retailer and official distributor of original smartphones, laptops, smart televisions, and high-efficiency home appliances.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300/90">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">National Head Office:</strong>
                  <span>{CORPORATE_INFO.headOffice.building}, {CORPORATE_INFO.headOffice.street}, {CORPORATE_INFO.headOffice.city}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Toll-Free & Dispatch Hotlines:</strong>
                  <div className="flex flex-wrap items-center gap-x-2">
                    <a href={`tel:${CORPORATE_INFO.phones.hotline1.replace(/\s+/g, '')}`} className="text-emerald-300 hover:underline">
                      {CORPORATE_INFO.phones.hotline1}
                    </a>
                    <span>•</span>
                    <a href={`tel:${CORPORATE_INFO.phones.hotline2.replace(/\s+/g, '')}`} className="text-emerald-300 hover:underline">
                      {CORPORATE_INFO.phones.hotline2}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Customer Support Email:</strong>
                  <a href={`mailto:${CORPORATE_INFO.emails.support}`} className="text-emerald-300 hover:underline">
                    {CORPORATE_INFO.emails.support}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Operating Hours:</strong>
                  <span>{CORPORATE_INFO.hours.weekdays}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Regional Dispatch Centers & Waybills */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Regional Dispatch Centers</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-300/80">
              <div className="bg-[#032015] border border-emerald-900/50 rounded-xl p-2.5">
                <p className="font-bold text-white">Greater Accra Central Hub</p>
                <p className="text-[11px] text-slate-300">Kwame Nkrumah Circle, Opp. Tip Toe Lane</p>
                <p className="text-[11px] text-emerald-400 mt-1">Direct: 030 222 5651 • Same-Day Dispatch</p>
              </div>

              <div className="bg-[#032015] border border-emerald-900/50 rounded-xl p-2.5">
                <p className="font-bold text-white">Ashanti Regional Central Hub</p>
                <p className="text-[11px] text-slate-300">Prempeh II Street, Opp. General Post Office, Adum</p>
                <p className="text-[11px] text-emerald-400 mt-1">Direct: 032 203 4410 • Kumasi Hub</p>
              </div>

              <div className="bg-[#032015] border border-emerald-900/50 rounded-xl p-2.5">
                <p className="font-bold text-white">Western & Middle Belt Hubs</p>
                <p className="text-[11px] text-slate-300">Takoradi Market Circle & Sunyani Post Office Sq.</p>
                <p className="text-[11px] text-emerald-400 mt-1">Direct: 031 202 8820 • 24hr Courier Link</p>
              </div>
            </div>

            <button
              onClick={onOpenShowrooms}
              className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
            >
              See all 35 regional pickup locations →
            </button>
          </div>

          {/* Column 3: Customer Care & Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span>Customer Care & Policies</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={onOpenDeliveryTrack}
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Track Your Delivery & Waybill</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenHelp}
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Help Center & Frequently Asked Questions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWarranty}
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>12-Month Official Warranty & Repairs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenHelp}
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>7-Day Replacement & Return Policy</span>
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${CORPORATE_INFO.emails.corporate}?subject=Corporate%20Procurement%20Inquiry`}
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Corporate & Educational B2B Sales</span>
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="hover:text-white transition-colors cursor-pointer text-slate-300/80 hover:translate-x-0.5 transform inline-block"
                >
                  Terms of Sale & Buyer Protection
                </a>
              </li>
              {onOpenAdminPortal && (
                <li>
                  <button
                    onClick={onOpenAdminPortal}
                    className="hover:text-emerald-300 text-emerald-400 font-bold transition-colors cursor-pointer text-left flex items-center gap-1.5 pt-1 hover:translate-x-0.5 transform"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ApexTech Admin Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Verified Payments & Security */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Verified Payment Rails</span>
            </h4>
            <p className="text-xs text-slate-300/80 leading-relaxed mb-4">
              Instant, secure mobile money and card checkout powered by Ghana Interbank (GhIPSS) rails.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#032a1d] border border-emerald-800/60 rounded-xl px-2.5 py-2 flex items-center gap-2 text-[11px] font-bold text-white shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0" />
                <span>MTN MoMo</span>
              </div>
              <div className="bg-[#032a1d] border border-emerald-800/60 rounded-xl px-2.5 py-2 flex items-center gap-2 text-[11px] font-bold text-white shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                <span>Telecel Cash</span>
              </div>
              <div className="bg-[#032a1d] border border-emerald-800/60 rounded-xl px-2.5 py-2 flex items-center gap-2 text-[11px] font-bold text-white shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                <span>AT Money</span>
              </div>
              <div className="bg-[#032a1d] border border-emerald-800/60 rounded-xl px-2.5 py-2 flex items-center gap-2 text-[11px] font-bold text-white shadow-xs">
                <CreditCard className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>VISA / Gh-Link</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>NCA Type-Approved Devices Only</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4. BOTTOM COPYRIGHT & REGULATORY BAR ================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} ApexTech Ghana Ltd. All rights reserved.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Company Registration: {CORPORATE_INFO.rcNumber} • Tax Identification: {CORPORATE_INFO.tin}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button onClick={onOpenHelp} className="hover:text-slate-200 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <button onClick={onOpenWarranty} className="hover:text-slate-200 transition-colors cursor-pointer">
              Warranty Terms
            </button>
            <span className="text-slate-700">·</span>
            <button onClick={onOpenShowrooms} className="hover:text-slate-200 transition-colors cursor-pointer">
              Showroom Directory
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer pl-2"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
