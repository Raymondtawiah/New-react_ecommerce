import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Clock, 
  Tag, 
  ArrowRight, 
  Check, 
  X, 
  Flame, 
  Truck, 
  ShieldCheck, 
  RefreshCw,
  Bell
} from 'lucide-react';

interface Announcement {
  id: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  headline: string;
  subtext: string;
  couponCode?: string;
  ctaText?: string;
  actionType: 'deals' | 'copy' | 'showrooms' | 'category';
  actionTarget?: string;
}

interface AnnouncementBarProps {
  onNavigateDeals?: () => void;
  onOpenShowrooms?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onNavigateDeals,
  onOpenShowrooms,
  onSelectCategory
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Live countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 24, seconds: 48 });

  const announcements: Announcement[] = [
    {
      id: 'flash-sale',
      badge: 'FLASH SALE',
      badgeColor: 'bg-red-600 text-white animate-pulse',
      icon: Flame,
      headline: 'Mid-Week Tech Madness: Up to 35% OFF Original Smartphones & Laptops!',
      subtext: 'Exclusive prices on Samsung, Apple & HP devices.',
      couponCode: 'FRANKO35',
      ctaText: 'Claim Deal',
      actionType: 'deals'
    },
    {
      id: 'free-delivery',
      badge: 'EXPRESS DISPATCH',
      badgeColor: 'bg-emerald-500 text-slate-950 font-black',
      icon: Truck,
      headline: 'Free Same-Day Delivery in Greater Accra on orders above GH₵ 1,200',
      subtext: 'Express 24h delivery to Kumasi, Takoradi, Sunyani & Tamale.',
      ctaText: 'Shop Catalog',
      actionType: 'deals'
    },
    {
      id: 'warranty',
      badge: '100% GENUINE',
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
      icon: ShieldCheck,
      headline: 'Official 12 - 24 Months Manufacturer Warranty & Free Screen Protector',
      subtext: 'With every brand-new phone & laptop purchase at Franko Trading.',
      ctaText: 'Learn More',
      actionType: 'showrooms'
    },
    {
      id: 'tech-swap',
      badge: 'TRADE-IN HUB',
      badgeColor: 'bg-blue-600 text-white',
      icon: RefreshCw,
      headline: 'Upgrade & Trade-In: Swap your old phone for instant store credit!',
      subtext: 'Available at Circle Flagship & all 33 Ghana showrooms.',
      ctaText: 'Find Showroom',
      actionType: 'showrooms'
    },
    {
      id: 'laptops-deal',
      badge: 'HOT TECH BUNDLE',
      badgeColor: 'bg-purple-600 text-white',
      icon: Sparkles,
      headline: 'HP Pavilion & MacBook Air Deals with Free Laptop Bag & Wireless Mouse',
      subtext: 'Save up to GH₵ 1,250 on selected computing hardware.',
      couponCode: 'LAPTOPTECH',
      ctaText: 'Shop Laptops',
      actionType: 'category',
      actionTarget: 'laptops'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (!isPlaying || isDismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, isDismissed, announcements.length]);

  // Live countdown timer ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleActionClick = (announcement: Announcement) => {
    if (announcement.couponCode && announcement.actionType === 'copy') {
      navigator.clipboard?.writeText?.(announcement.couponCode);
      setCopiedCode(announcement.couponCode);
      setTimeout(() => setCopiedCode(null), 2500);
      return;
    }

    if (announcement.actionType === 'deals' && onNavigateDeals) {
      onNavigateDeals();
    } else if (announcement.actionType === 'showrooms' && onOpenShowrooms) {
      onOpenShowrooms();
    } else if (announcement.actionType === 'category' && announcement.actionTarget && onSelectCategory) {
      onSelectCategory(announcement.actionTarget);
    } else if (onNavigateDeals) {
      onNavigateDeals();
    }
  };

  const current = announcements[currentIndex];
  const IconComponent = current.icon;

  if (isDismissed) {
    return (
      <div className="bg-[#03261a] border-b border-emerald-900/60 py-1 px-4 text-center">
        <button
          onClick={() => setIsDismissed(false)}
          className="text-[11px] font-bold text-emerald-300 hover:text-white flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
        >
          <Bell className="w-3 h-3 text-amber-400 animate-bounce" />
          <span>View Flash Sale & Live Announcements</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-gradient-to-r from-[#032217] via-[#073c2c] to-[#04281c] text-white border-b border-emerald-800/50 shadow-md select-none overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Animated Subtle Glow Orb */}
      <div className="absolute top-0 left-1/4 w-96 h-full bg-emerald-500/10 blur-2xl pointer-events-none transform -skew-x-12 animate-pulse" />
      <div className="absolute top-0 right-1/4 w-80 h-full bg-red-500/10 blur-2xl pointer-events-none transform skew-x-12" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 relative z-10">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Previous Arrow */}
          <button
            onClick={handlePrev}
            className="p-1 sm:p-1.5 rounded-lg text-emerald-300/80 hover:text-white hover:bg-emerald-900/50 transition-colors cursor-pointer shrink-0"
            title="Previous announcement"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Center: Animated Announcement Content */}
          <div className="flex-1 min-w-0 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-1.5 sm:gap-3 py-0.5">
            <div 
              key={current.id} 
              className="flex items-center flex-wrap justify-center md:justify-start gap-2 animate-announce transition-all duration-300"
            >
              {/* Badge */}
              <span className={`text-[10px] sm:text-[11px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow-xs flex items-center gap-1 ${current.badgeColor}`}>
                <IconComponent className="w-3 h-3 shrink-0" />
                <span>{current.badge}</span>
              </span>

              {/* Headline */}
              <p className="text-xs sm:text-sm font-bold text-white tracking-tight line-clamp-1">
                {current.headline}
              </p>

              {/* Subtext on desktop */}
              <span className="hidden lg:inline text-xs text-emerald-200/90 font-medium border-l border-emerald-700/60 pl-2">
                {current.subtext}
              </span>

              {/* Coupon Pill if present */}
              {current.couponCode && (
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText?.(current.couponCode!);
                    setCopiedCode(current.couponCode!);
                    setTimeout(() => setCopiedCode(null), 2500);
                  }}
                  className="hidden sm:inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/20 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-amber-300 transition-colors cursor-pointer"
                  title="Click to copy promo code"
                >
                  <Tag className="w-3 h-3" />
                  <span>{current.couponCode}</span>
                  {copiedCode === current.couponCode ? (
                    <span className="text-[10px] text-emerald-400 font-sans font-bold ml-1">Copied!</span>
                  ) : (
                    <span className="text-[9px] text-emerald-300/80 font-sans ml-0.5">Copy</span>
                  )}
                </button>
              )}
            </div>

            {/* Live Flash Countdown Timer */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] bg-black/30 border border-emerald-700/50 rounded-lg px-2 py-0.5 shrink-0 text-emerald-200">
              <Clock className="w-3 h-3 text-red-400 animate-pulse shrink-0" />
              <span className="text-slate-400 text-[10px]">Ends in:</span>
              <span className="font-mono font-extrabold text-white text-xs">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            {/* Quick Action CTA Button */}
            {current.ctaText && (
              <button
                onClick={() => handleActionClick(current)}
                className="hidden md:inline-flex items-center gap-1 bg-[#b91c1c] hover:bg-[#dc2626] text-white text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer shrink-0"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Right: Controls Cluster (Play/Pause, Indicator Dots, Next Arrow, Dismiss) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Indicator Dots */}
            <div className="hidden sm:flex items-center gap-1 px-1">
              {announcements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-4 bg-amber-400' : 'w-1.5 bg-emerald-800 hover:bg-emerald-600'
                  }`}
                  aria-label={`Jump to announcement ${idx + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 sm:p-1.5 rounded-lg text-emerald-300/80 hover:text-white hover:bg-emerald-900/50 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause announcements' : 'Resume auto-play'}
              aria-label={isPlaying ? 'Pause announcements' : 'Resume auto-play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="p-1 sm:p-1.5 rounded-lg text-emerald-300/80 hover:text-white hover:bg-emerald-900/50 transition-colors cursor-pointer"
              title="Next announcement"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Close / Dismiss Announcement */}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 sm:p-1.5 rounded-lg text-emerald-400/60 hover:text-white hover:bg-emerald-900/50 transition-colors cursor-pointer ml-0.5"
              title="Dismiss announcement bar"
              aria-label="Dismiss announcement bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
