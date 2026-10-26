import React from 'react';
import { TechCategory, ProductImageAngles } from '../types';

export interface TechGraphicProps {
  type: string;
  category?: TechCategory;
  angle?: 'duo' | 'front' | 'back' | 'side' | 'detail';
  uploadedImageUrl?: string;
  uploadedImages?: ProductImageAngles;
  zoomLevel?: number;
  className?: string;
}

export const TechGraphic: React.FC<TechGraphicProps> = ({
  type,
  category,
  angle = 'duo',
  uploadedImageUrl,
  uploadedImages,
  zoomLevel = 1,
  className = ''
}) => {
  // If the vendor/product has an uploaded image for this view angle
  const resolvedImageUrl =
    uploadedImageUrl ||
    (uploadedImages
      ? angle === 'duo'
        ? uploadedImages.front
        : uploadedImages[angle]
      : undefined);

  if (resolvedImageUrl) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden p-2 ${className}`}>
        <img
          src={resolvedImageUrl}
          alt="Product angle view"
          className="max-h-full max-w-full object-contain rounded-xl transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        />
      </div>
    );
  }

  // Multi-angle graphic renderer based on selected angle
  const renderAngleView = () => {
    // ----------------- SIDE VIEW (ALL DEVICES) -----------------
    if (angle === 'side') {
      return (
        <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {/* Ultra-slim edge profile */}
          <div className="w-4 h-38 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-full border border-slate-400 shadow-xl relative flex flex-col justify-between py-4 items-center">
            {/* Camera bump extension on left */}
            <div className="w-1.5 h-10 bg-slate-600 rounded-l absolute top-6 -left-1.5 border-l border-slate-500" />
            {/* Volume Buttons on right */}
            <div className="w-1 h-6 bg-slate-600 rounded-r absolute top-10 -right-1" />
            <div className="w-1 h-6 bg-slate-600 rounded-r absolute top-18 -right-1" />
            {/* Power button */}
            <div className="w-1 h-8 bg-amber-500/80 rounded-r absolute top-28 -right-1" />
            {/* USB-C Port at bottom */}
            <div className="w-2 h-1 bg-slate-800 rounded-full mt-auto" />
          </div>
          <div className="absolute -bottom-2 text-[8px] font-bold text-slate-500 tracking-wider">
            7.6mm ULTRA SLIM
          </div>
        </div>
      );
    }

    // ----------------- FRONT VIEW -----------------
    if (angle === 'front') {
      if (type.startsWith('laptop')) {
        return (
          <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-40 h-26 bg-slate-950 rounded-t-xl border-2 border-slate-700 shadow-2xl overflow-hidden relative p-1 flex flex-col justify-between">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mx-auto mt-0.5" />
              <div className="w-full h-full bg-gradient-to-tr from-indigo-950 via-sky-700 to-emerald-500 rounded-t-lg flex items-center justify-center text-white">
                <span className="text-[8px] font-extrabold tracking-widest bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  DISPLAY VIEW
                </span>
              </div>
            </div>
            <div className="w-46 h-3 bg-gradient-to-b from-slate-300 to-slate-500 rounded-b-md shadow-md flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        );
      }

      if (type.startsWith('tv')) {
        return (
          <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-42 h-26 bg-black rounded-sm border-2 border-slate-800 shadow-2xl overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-tr from-amber-600 via-rose-600 to-indigo-900 flex flex-col items-center justify-center text-white p-2">
                <div className="text-[9px] font-black tracking-wider text-yellow-300 drop-shadow">4K CRYSTAL HDR</div>
                <div className="text-[6px] text-white/90">FRONT SCREEN BEZEL-LESS</div>
              </div>
            </div>
            <div className="w-36 flex justify-between px-4">
              <div className="w-1.5 h-3 bg-slate-700" />
              <div className="w-1.5 h-3 bg-slate-700" />
            </div>
          </div>
        );
      }

      // Smartphone Front
      return (
        <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <div className="w-22 h-38 rounded-3xl bg-slate-950 border-2 border-slate-700 shadow-2xl overflow-hidden relative p-1 flex flex-col justify-between">
            <div className="w-7 h-2 bg-black rounded-full mx-auto mt-1 z-20 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-slate-800" />
            </div>
            <div className="w-full h-full bg-gradient-to-b from-teal-400 via-sky-600 to-slate-950 rounded-2xl p-2 flex flex-col justify-between">
              <div className="text-[7px] text-white/90 font-bold text-center pt-1">09:41</div>
              <div className="w-12 h-12 rounded-full bg-white/20 blur-xs mx-auto my-auto" />
              <div className="text-[6px] text-center text-white/80 font-bold pb-1">AMOLED 120Hz DISPLAY</div>
            </div>
          </div>
        </div>
      );
    }

    // ----------------- BACK VIEW -----------------
    if (angle === 'back') {
      if (type.startsWith('laptop')) {
        return (
          <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-42 h-28 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-2xl border-2 border-slate-400 shadow-xl flex items-center justify-center relative">
              <div className="w-8 h-8 rounded-full bg-slate-400/40 border border-slate-500 flex items-center justify-center shadow-inner">
                <span className="text-[8px] font-black text-slate-700">PRO</span>
              </div>
              <span className="absolute bottom-2 text-[6px] font-bold text-slate-500">ANODIZED ALUMINUM TOP</span>
            </div>
          </div>
        );
      }

      // Smartphone Back
      return (
        <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <div className="w-22 h-38 rounded-3xl bg-gradient-to-b from-emerald-100 via-teal-200 to-emerald-300 border-2 border-emerald-400 shadow-2xl p-2.5 flex flex-col justify-between relative">
            <div className="w-9 h-14 rounded-2xl bg-white/60 backdrop-blur-xs border border-emerald-400/60 p-1.5 flex flex-col justify-between shadow-xs">
              <div className="w-4 h-4 rounded-full bg-slate-950 border border-emerald-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              </div>
              <div className="w-4 h-4 rounded-full bg-slate-950 border border-emerald-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              </div>
            </div>
            <div className="text-center text-[7px] font-extrabold tracking-widest text-emerald-900/60">
              OFFICIAL SEAL
            </div>
          </div>
        </div>
      );
    }

    // ----------------- DETAIL / PACKAGING VIEW -----------------
    if (angle === 'detail') {
      return (
        <div className="relative flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <div className="w-36 h-28 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-2xl border-2 border-emerald-500/40 shadow-2xl p-3 flex flex-col justify-between text-white relative">
            <div className="flex justify-between items-center">
              <span className="text-[7px] font-extrabold text-emerald-400">AUTHENTIC SEAL</span>
              <span className="text-[6px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded">ORIGINAL</span>
            </div>
            <div className="my-auto text-center">
              <div className="text-xs font-black">APEX CERTIFIED</div>
              <div className="text-[7px] text-slate-300 mt-0.5">12M Full Warranty Included</div>
            </div>
            <div className="text-[6px] text-center text-slate-400">Factory Sealed Box & Accessories</div>
          </div>
        </div>
      );
    }

    // ----------------- DUO / DEFAULT FRONT + BACK VIEW -----------------
    switch (type) {
      case 'laptop-macbook':
        return (
          <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-36 h-24 bg-slate-900 rounded-t-xl border-2 border-slate-700 shadow-xl overflow-hidden relative p-1 flex flex-col justify-between">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mx-auto mt-0.5" />
              <div className="w-full h-full bg-gradient-to-tr from-indigo-900 via-sky-600 to-emerald-400 rounded-t-lg flex items-center justify-center">
                <div className="text-[7px] text-white font-bold tracking-widest bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  M3 PRO CHIP
                </div>
              </div>
            </div>
            <div className="w-44 h-3.5 bg-gradient-to-b from-slate-300 to-slate-400 rounded-b-md shadow-md flex items-center justify-center relative border-t border-slate-400">
              <div className="w-10 h-1 bg-slate-500 rounded-full" />
            </div>
          </div>
        );

      case 'laptop-hp':
        return (
          <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-36 h-24 bg-slate-950 rounded-t-xl border-2 border-slate-700 shadow-xl overflow-hidden relative p-1 flex flex-col justify-between">
              <div className="w-full h-full bg-gradient-to-br from-blue-950 via-slate-900 to-blue-700 rounded-t-lg flex flex-col items-center justify-center text-white p-2">
                <div className="text-[7px] font-extrabold text-sky-400">HP ENVY x360</div>
                <div className="text-[5px] text-slate-300">Intel Core i7 13th Gen</div>
              </div>
            </div>
            <div className="w-44 h-3.5 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-md shadow-md flex items-center justify-center relative border-t border-slate-700">
              <div className="w-10 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        );

      case 'tv-samsung':
        return (
          <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-40 h-24 bg-black rounded-sm border-2 border-slate-800 shadow-xl overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-tr from-amber-600 via-rose-600 to-indigo-900 flex flex-col items-center justify-center text-white p-2">
                <div className="text-[8px] font-black tracking-wider text-yellow-300 drop-shadow">4K CRYSTAL UHD</div>
                <div className="text-[5px] text-white/90">Smart Tizen OS • HDR10+</div>
              </div>
              <div className="absolute bottom-0.5 right-1 text-[5px] font-bold text-white/60">SAMSUNG</div>
            </div>
            <div className="w-36 flex justify-between px-4">
              <div className="w-1.5 h-3 bg-slate-700 transform -rotate-12" />
              <div className="w-1.5 h-3 bg-slate-700 transform rotate-12" />
            </div>
          </div>
        );

      case 'audio-soundbar':
        return (
          <div className="relative flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-44 h-9 bg-slate-900 rounded-lg border border-slate-700 shadow-lg flex items-center justify-between px-3 relative overflow-hidden">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[6px] font-bold text-white tracking-wider">JBL DOLBY ATMOS</span>
              </div>
              <div className="flex gap-1">
                <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[5px] text-orange-400 font-bold">
                  BASS
                </div>
                <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[5px] text-orange-400 font-bold">
                  500W
                </div>
              </div>
            </div>
            <div className="w-16 h-20 bg-slate-950 rounded-xl border-2 border-slate-800 shadow-xl mt-2 flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-orange-500/60 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-slate-800" />
              </div>
              <span className="text-[5px] text-slate-400 font-bold mt-1">SUBWOOFER</span>
            </div>
          </div>
        );

      case 'appliance-fridge':
        return (
          <div className="w-22 h-36 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-xl border-2 border-slate-400 shadow-xl p-1.5 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-12 bg-gradient-to-r from-slate-100 to-slate-300 rounded-t-lg border-b-2 border-slate-500 relative flex items-center justify-end pr-1">
              <div className="w-1 h-5 bg-slate-500 rounded-full" />
              <div className="absolute top-1 left-1.5 text-[5px] font-bold text-emerald-800 bg-emerald-100 px-1 rounded">
                NO FROST
              </div>
            </div>
            <div className="w-full h-20 bg-gradient-to-r from-slate-100 to-slate-300 rounded-b-lg relative flex items-center justify-end pr-1">
              <div className="w-1 h-8 bg-slate-500 rounded-full" />
              <div className="absolute bottom-2 left-1.5 text-[5px] font-extrabold text-slate-600">
                INVERTER 260L
              </div>
            </div>
          </div>
        );

      case 'appliance-ac':
        return (
          <div className="w-42 h-20 bg-white rounded-xl border-2 border-slate-200 shadow-xl p-2 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300 relative">
            <div className="flex items-center justify-between">
              <span className="text-[7px] font-extrabold text-slate-700">Midea R32</span>
              <div className="bg-emerald-900 text-emerald-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                18°C
              </div>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full border border-slate-200 overflow-hidden mt-2">
              <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-60" />
            </div>
            <div className="flex justify-between items-center text-[6px] text-slate-400 font-bold pt-1">
              <span>1.5HP INVERTER</span>
              <span className="text-emerald-600 font-semibold">● 70% Energy Save</span>
            </div>
          </div>
        );

      case 'accessory-smartwatch':
        return (
          <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-8 h-8 bg-slate-800 rounded-t-lg -mb-1" />
            <div className="w-18 h-22 bg-slate-950 rounded-3xl border-2 border-slate-700 shadow-2xl p-2 relative flex flex-col items-center justify-between z-10">
              <div className="w-1 h-3 bg-amber-500 rounded-r absolute right-0 top-6 -mr-1" />
              <div className="text-[7px] font-bold text-white mt-1">10:08</div>
              <div className="w-8 h-8 rounded-full border-2 border-rose-500 p-0.5 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-emerald-400 p-0.5 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-sky-400" />
                </div>
              </div>
              <div className="text-[5px] text-emerald-400 font-semibold mb-1">SERIES 9</div>
            </div>
            <div className="w-8 h-8 bg-slate-800 rounded-b-lg -mt-1" />
          </div>
        );

      case 'accessory-powerbank':
        return (
          <div className="w-22 h-34 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border-2 border-emerald-500/40 shadow-xl p-3 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
            <div className="flex justify-between items-center">
              <div className="text-[7px] font-extrabold text-orange-400">oraimo</div>
              <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono text-[7px] font-black px-1.5 py-0.5 rounded">
                100%
              </div>
            </div>
            <div className="flex flex-col items-center my-auto">
              <div className="text-sm font-black text-white tracking-tight">30,000</div>
              <div className="text-[6px] text-slate-400 font-bold">mAh POWER BOX</div>
            </div>
            <div className="flex justify-center gap-1.5 pt-2 border-t border-slate-800">
              <div className="w-2 h-1 bg-amber-400 rounded-xs" />
              <div className="w-2 h-1 bg-amber-400 rounded-xs" />
              <div className="w-1.5 h-1 bg-sky-400 rounded-xs" />
            </div>
          </div>
        );

      case 'accessory-earbuds':
        return (
          <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
            <div className="w-24 h-24 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl border-2 border-slate-700 shadow-2xl p-2 flex flex-col justify-between relative overflow-hidden">
              <div className="w-full flex justify-between items-center px-1">
                <span className="text-[6px] font-extrabold text-slate-400">GALAXY BUDS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex justify-around items-center my-auto">
                <div className="w-7 h-9 rounded-2xl bg-gradient-to-b from-purple-400 to-indigo-600 shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>
                <div className="w-7 h-9 rounded-2xl bg-gradient-to-b from-purple-400 to-indigo-600 shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>
              </div>
              <div className="text-[6px] text-center text-slate-400 font-medium">ANC 360° AUDIO</div>
            </div>
          </div>
        );

      case 'samsung-a08':
      default:
        return (
          <div className="relative flex items-center justify-center -space-x-6">
            <div className="w-20 h-36 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-md overflow-hidden relative transform -rotate-3 z-10 transition-transform group-hover:scale-105 duration-300">
              <div className="w-8 h-2 bg-slate-900 rounded-b-md mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-20" />
              <div className="w-full h-full bg-gradient-to-b from-emerald-500 via-teal-600 to-slate-900 p-2 flex flex-col justify-between">
                <div className="text-[7px] text-white/80 font-medium pt-1 text-center">10:45</div>
                <div className="w-12 h-12 rounded-full bg-white/20 blur-sm mx-auto my-auto" />
                <div className="flex justify-center space-x-1 pb-1">
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
            <div className="w-20 h-36 rounded-2xl bg-gradient-to-b from-emerald-100 via-teal-200 to-emerald-300 border-2 border-emerald-300 shadow-lg relative p-2 transform rotate-6 transition-transform group-hover:rotate-12 duration-300">
              <div className="flex flex-col space-y-1.5 pt-1 pl-0.5">
                <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
                <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] tracking-wider font-bold text-emerald-900/40">
                SAMSUNG
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-full h-44 flex items-center justify-center p-2 overflow-hidden ${className}`}>
      <div
        className="transition-transform duration-300 flex items-center justify-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {renderAngleView()}
      </div>
    </div>
  );
};
