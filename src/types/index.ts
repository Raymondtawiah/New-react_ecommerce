export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductBadge {
  text: string;
  type: 'popular' | 'best-value' | 'new-arrival' | 'certified' | 'coupon' | 'discount' | 'spec' | 'wireless';
  bgClass: string;
}

export interface Product {
  id: string;
  brand: string; // e.g. "SAMSUNG", "INFINIX", "TECNO", "APPLE", "XIAOMI", "GOOGLE"
  brandCategory: string; // e.g. "SAMSUNG GALAXY", "INFINIX MOBILITY", "TECNO OFFICIAL", "SAMSUNG SERIES A", "APPLE INC.", "TECNO SERIES", "INFINIX SERIES", "XIAOMI OFFICIAL"
  name: string;
  fullName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badges: ProductBadge[];
  specs: string[]; // e.g. ["4G LTE", "5000 mAh", "Dual Cam"]
  storage: string; // "64GB" | "128GB" | "256GB" | "512GB"
  ram: string; // "4GB" | "8GB" | "12GB"
  stockStatus: string; // e.g. "In Stock • Accra & Kumasi"
  isNewArrival?: boolean;
  isPopular?: boolean;
  isBestValue?: boolean;
  hasDiscount?: boolean;
  colorName: string;
  phoneType: 'samsung-a08' | 'infinix-smart20' | 'tecno-pop20c' | 'samsung-a18' | 'iphone-15' | 'tecno-spark20' | 'infinix-note40' | 'redmi-note13' | 'pixel-8' | 'samsung-s24' | 'tecno-camon30';
  description: string;
  inStockBranches: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedBrand: string; // "All" or specific brand
  manufacturers: string[]; // ["Samsung", "Tecno Mobile", "Infinix", "Apple iPhone", "Xiaomi / Redmi"]
  minPrice: number;
  maxPrice: number;
  discountedOnly: boolean;
  storageRam: string; // "4GB / 64GB", "4GB / 128GB", "8GB / 256GB", "12GB / 512GB", or "all"
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'popular';
}
