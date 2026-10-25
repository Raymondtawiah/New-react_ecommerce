import React from 'react';

interface PhoneGraphicProps {
  type: string;
  className?: string;
}

export const PhoneGraphic: React.FC<PhoneGraphicProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'samsung-a08':
      // Dual Mint green and Black Samsung phone showcase
      return (
        <div className={`relative w-full h-44 flex items-center justify-center p-2 ${className}`}>
          <div className="relative flex items-center justify-center -space-x-6">
            {/* Front Screen phone */}
            <div className="w-20 h-36 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-md overflow-hidden relative transform -rotate-3 z-10 transition-transform group-hover:scale-105 duration-300">
              {/* Screen Notch */}
              <div className="w-8 h-2 bg-slate-900 rounded-b-md mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-20" />
              {/* Wallpaper */}
              <div className="w-full h-full bg-gradient-to-b from-emerald-500 via-teal-600 to-slate-900 p-2 flex flex-col justify-between">
                <div className="text-[7px] text-white/80 font-medium pt-1 text-center">10:45</div>
                <div className="w-12 h-12 rounded-full bg-white/20 blur-sm mx-auto my-auto" />
                <div className="flex justify-center space-x-1 pb-1">
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                </div>
              </div>
            </div>

            {/* Back Mint Green phone */}
            <div className="w-20 h-36 rounded-2xl bg-gradient-to-b from-emerald-100 via-teal-200 to-emerald-300 border-2 border-emerald-300 shadow-lg relative p-2 transform rotate-6 transition-transform group-hover:rotate-12 duration-300">
              {/* Dual Camera Module */}
              <div className="flex flex-col space-y-1.5 pt-1 pl-0.5">
                <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
                <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-100 border border-slate-300 ml-1.5" />
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] tracking-wider font-bold text-emerald-900/40">
                SAMSUNG
              </div>
            </div>
          </div>
        </div>
      );

    case 'infinix-smart20':
      // Golden yellow textured back Infinix phone
      return (
        <div className={`relative w-full h-44 flex items-center justify-center p-2 ${className}`}>
          <div className="relative flex items-center justify-center -space-x-5">
            {/* Back Gold Phone */}
            <div className="w-20 h-36 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-200 to-yellow-100 border border-amber-300 shadow-md relative p-2 transform -rotate-4 z-0 group-hover:scale-105 duration-300">
              {/* Large Camera Island */}
              <div className="w-8 h-10 rounded-xl bg-amber-300/80 p-1 flex flex-col justify-between">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-amber-400 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-slate-600" />
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-amber-400 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-slate-600" />
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] tracking-widest font-semibold text-amber-900/50">
                Infinix
              </div>
            </div>

            {/* Front Screen Phone */}
            <div className="w-20 h-36 rounded-2xl bg-slate-950 border-2 border-amber-500/40 shadow-xl overflow-hidden relative transform rotate-4 z-10 group-hover:rotate-8 duration-300">
              <div className="w-full h-full bg-gradient-to-b from-yellow-500 via-amber-600 to-slate-900 p-2 flex flex-col justify-between">
                <div className="text-[7px] text-white/90 font-medium pt-1 text-center">09:41</div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-400 opacity-60 blur-xs mx-auto my-auto" />
                <div className="text-[6px] text-center text-white/70">SMART 20 HD+</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'tecno-pop20c':
      // Banner style showing multiple colorful phones (Blue, Green, Black)
      return (
        <div className={`relative w-full h-44 flex items-center justify-center p-2 ${className}`}>
          <div className="relative w-full h-36 bg-gradient-to-r from-sky-50 via-slate-50 to-indigo-50 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
            {/* Background branding subtle */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px] opacity-25" />
            <div className="flex items-center justify-center -space-x-4 z-10 scale-90">
              {/* Phone 1: Black */}
              <div className="w-16 h-28 rounded-xl bg-slate-900 border border-slate-700 shadow transform -rotate-12">
                <div className="p-1">
                  <div className="w-4 h-4 rounded-lg bg-slate-800 border border-slate-600" />
                </div>
              </div>
              {/* Phone 2: Blue */}
              <div className="w-16 h-30 rounded-xl bg-gradient-to-b from-cyan-400 to-blue-600 border border-cyan-300 shadow-lg transform -rotate-3 z-10">
                <div className="p-1.5 flex flex-col space-y-1">
                  <div className="w-4 h-4 rounded-full bg-slate-900 border border-cyan-200" />
                  <div className="w-4 h-4 rounded-full bg-slate-900 border border-cyan-200" />
                </div>
              </div>
              {/* Phone 3: White/Gold */}
              <div className="w-16 h-28 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-300 shadow transform rotate-12">
                <div className="p-1">
                  <div className="w-4 h-4 rounded-lg bg-amber-300" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[8px] font-bold text-slate-700 shadow-xs">
              TECNO POP 20C SERIES
            </div>
          </div>
        </div>
      );

    case 'samsung-a18':
      // Samsung Galaxy A18 lilac/silver 5G Phone
      return (
        <div className={`relative w-full h-44 flex items-center justify-center p-2 ${className}`}>
          <div className="relative w-full h-36 bg-gradient-to-br from-slate-100 to-sky-50 rounded-xl border border-slate-200/80 flex items-center justify-center overflow-hidden">
            <div className="flex items-center justify-center -space-x-3">
              {/* Back Triple Camera */}
              <div className="w-18 h-32 rounded-2xl bg-gradient-to-b from-slate-100 via-indigo-50 to-slate-200 border-2 border-slate-300 shadow-md p-1.5 flex flex-col justify-between transform -rotate-6 group-hover:-rotate-3 transition-transform">
                <div className="flex flex-col space-y-1 pl-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-slate-300" />
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-slate-300" />
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-slate-300" />
                </div>
                <div className="text-center text-[5px] font-bold text-slate-400">SAMSUNG</div>
              </div>
              {/* Front Screen */}
              <div className="w-18 h-32 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-xl overflow-hidden transform rotate-6 group-hover:rotate-3 transition-transform">
                <div className="w-full h-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 p-1 flex flex-col justify-between">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950 mx-auto mt-0.5" />
                  <div className="text-[7px] text-white font-bold text-center">5G READY</div>
                  <div className="text-[5px] text-white/70 text-center pb-1">Super AMOLED</div>
                </div>
              </div>
            </div>
            <div className="absolute top-1 right-2 text-[7px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
              5G OIS
            </div>
          </div>
        </div>
      );

    case 'iphone-15':
      // Apple iPhone 15 Blue titanium
      return (
        <div className={`relative w-full h-44 flex items-center justify-center p-2 ${className}`}>
          <div className="relative flex items-center justify-center -space-x-5">
            {/* Front Screen with Dynamic Island */}
            <div className="w-20 h-36 rounded-3xl bg-slate-950 border-2 border-sky-300 shadow-lg overflow-hidden relative transform -rotate-4 z-10 group-hover:scale-105 transition-transform">
              {/* Dynamic Island pill */}
              <div className="w-6 h-2 bg-black rounded-full mx-auto mt-1 z-20 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-slate-800" />
              </div>
              {/* Apple signature gradient wallpaper */}
              <div className="w-full h-full bg-gradient-to-b from-sky-200 via-sky-400 to-blue-700 p-2 flex flex-col justify-between">
                <div className="text-[7px] text-slate-800 font-semibold pt-2 text-center">9:41</div>
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md mx-auto my-auto" />
                <div className="w-10 h-0.5 bg-white/70 rounded-full mx-auto mb-1" />
              </div>
            </div>

            {/* Back Apple phone with diagonal camera bump */}
            <div className="w-20 h-36 rounded-3xl bg-gradient-to-b from-sky-100 via-sky-200 to-blue-200 border-2 border-sky-200 shadow-md relative p-2 transform rotate-6 group-hover:rotate-10 transition-transform">
              {/* Apple Camera Plateau */}
              <div className="w-8 h-8 rounded-xl bg-white/60 backdrop-blur-xs p-1 shadow-xs flex flex-wrap items-center justify-between">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-sky-300 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
                <div className="w-1 h-1 rounded-full bg-amber-100 border border-slate-300" />
                <div className="w-1 h-1" />
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-sky-300 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
              </div>
              {/* Apple Logo Silhouette */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35">
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.86-12-14.47-6.19-9.45-11.05-20.2-14.59-32.26-3.54-12.06-5.3-23.47-5.3-34.23 0-14.34 3.59-25.99 10.77-34.95 7.18-8.96 16.03-13.59 26.54-13.88 4.58 0 9.77 1.25 15.58 3.75 5.8 2.5 9.77 3.82 11.9 3.96 1.8 0 5.69-1.25 11.66-3.75 5.97-2.5 10.87-3.69 14.69-3.56 12.18.66 21.64 4.88 28.38 12.67-10.77 6.53-16.03 15.68-15.79 27.46.24 9.45 3.87 17.43 10.87 23.94 7 6.51 15.14 10.23 24.41 11.16-2.18 6.53-4.74 13.06-7.67 19.59zM119.22 31.86c0-6.75 2.45-13.2 7.35-19.35 4.9-6.15 11.05-10.61 18.45-13.38-.98 7.08-3.69 13.53-8.14 19.35-4.45 5.82-10.32 10.27-17.66 13.38z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );

    case 'tecno-spark20':
      // Tecno Spark 20 Pro black matte
      return (
        <div className={`relative w-full h-44 flex items-center justify-center p-2 ${className}`}>
          <div className="relative w-full h-36 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-slate-700/60 flex items-center justify-center overflow-hidden group-hover:border-slate-500 transition-colors">
            {/* Holographic rim reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            <div className="flex items-center justify-center -space-x-4">
              {/* Back Phone */}
              <div className="w-18 h-32 rounded-2xl bg-gradient-to-b from-slate-800 via-slate-900 to-black border border-slate-700 shadow-xl p-2 flex flex-col justify-between transform -rotate-5">
                <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-emerald-500/50 p-1 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-slate-950 border border-emerald-400 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  </div>
                </div>
                <div className="text-[6px] tracking-widest text-emerald-400 font-bold">108MP PRO</div>
              </div>
              {/* Front Screen */}
              <div className="w-18 h-32 rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden transform rotate-5">
                <div className="w-full h-full bg-gradient-to-b from-emerald-600 via-slate-900 to-black p-1 flex flex-col justify-between">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                  <div className="text-[7px] text-white font-bold text-center">SPARK 20</div>
                  <div className="text-[5px] text-emerald-400 text-center pb-1">Helio G99</div>
                </div>
              </div>
            </div>
            <div className="absolute top-1 right-2 text-[7px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
              108MP
            </div>
          </div>
        </div>
      );

    case 'infinix-note40':
      // Infinix Note 40 Champagne Gold Wireless MagCharge
      return (
        <div className={`relative w-full h-44 flex items-center justify-center p-2 ${className}`}>
          <div className="relative w-full h-36 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 rounded-xl border border-amber-200/80 flex items-center justify-center overflow-hidden">
            {/* Wireless MagCharge Ring Glow */}
            <div className="absolute w-20 h-20 rounded-full border-2 border-amber-400/40 animate-pulse pointer-events-none" />
            <div className="flex items-center justify-center -space-x-4">
              {/* Back Gold */}
              <div className="w-18 h-32 rounded-2xl bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 border-2 border-amber-300 shadow-lg p-2 flex flex-col justify-between transform -rotate-8 group-hover:scale-105 transition-transform">
                <div className="w-8 h-8 rounded-xl bg-amber-200/80 border border-amber-400 p-1 flex flex-col justify-between">
                  <div className="w-3 h-3 rounded-full bg-slate-900 border border-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-slate-900 border border-amber-400" />
                </div>
                <div className="text-[6px] font-bold text-amber-900/60">NOTE 40</div>
              </div>
              {/* Front Screen with 120Hz AMOLED */}
              <div className="w-18 h-32 rounded-2xl bg-slate-950 border-2 border-amber-400 shadow-xl overflow-hidden transform rotate-6">
                <div className="w-full h-full bg-gradient-to-b from-amber-500 via-orange-600 to-slate-950 p-1 flex flex-col justify-between">
                  <div className="text-[6px] text-white font-medium text-center pt-1">12:00</div>
                  <div className="w-10 h-10 rounded-full bg-amber-300/40 blur-xs mx-auto" />
                  <div className="text-[6px] text-amber-200 text-center pb-1">120Hz AMOLED</div>
                </div>
              </div>
            </div>
            <div className="absolute top-1 right-2 text-[7px] font-bold text-amber-800 bg-amber-200/70 px-1.5 py-0.5 rounded border border-amber-300">
              MagCharge
            </div>
          </div>
        </div>
      );

    case 'redmi-note13':
    default:
      // Xiaomi Redmi Note 13 Mint/Ice Blue
      return (
        <div className={`relative w-full h-44 flex items-center justify-center p-2 ${className}`}>
          <div className="relative flex items-center justify-center -space-x-5">
            {/* Back Mint Blue phone */}
            <div className="w-20 h-36 rounded-2xl bg-gradient-to-b from-teal-100 via-cyan-100 to-blue-200 border-2 border-teal-200 shadow-md p-2 flex flex-col justify-between transform -rotate-4 group-hover:scale-105 transition-transform">
              <div className="w-8 h-10 rounded-xl bg-white/70 p-1 flex flex-col justify-between shadow-xs">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-teal-300" />
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-teal-300" />
              </div>
              <div className="text-[6px] font-bold tracking-widest text-slate-500 text-center">Redmi</div>
            </div>

            {/* Front Screen phone */}
            <div className="w-20 h-36 rounded-2xl bg-slate-950 border-2 border-teal-300 shadow-xl overflow-hidden transform rotate-5">
              <div className="w-full h-full bg-gradient-to-b from-teal-400 via-cyan-600 to-slate-950 p-2 flex flex-col justify-between">
                <div className="text-[7px] text-white/90 font-medium pt-1 text-center">10:45</div>
                <div className="w-12 h-12 rounded-full bg-teal-200/30 blur-xs mx-auto my-auto" />
                <div className="text-[6px] text-center text-teal-100 font-semibold pb-1">108MP TRIPLE</div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};
