import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 select-none cursor-pointer ${className}`}>
      {/* Brand Icon */}
      <div className="flex flex-col items-center justify-center">
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circuit/Tech icon motif in Franko red & green */}
          <rect x="2" y="6" width="36" height="28" rx="6" fill="#044e39" />
          <path d="M10 20H15L18 14L22 26L25 20H30" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="20" r="2" fill="#ef4444" />
          <circle cx="30" cy="20" r="2" fill="#ef4444" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-[#044e39] flex items-center">
          FRANKO
        </span>
        <span className="text-[10px] font-black tracking-widest text-[#dc2626] mt-0.5">
          TRADING ENT.
        </span>
      </div>
    </div>
  );
};
