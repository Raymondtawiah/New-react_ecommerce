export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductBadge {
  text: string;
  type: 'popular' | 'best-value' | 'new-arrival' | 'certified' | 'coupon' | 'discount' | 'spec' | 'wireless';
  bgClass: string;
}

export type TechCategory = 'mobile' | 'laptops' | 'tvs' | 'appliances' | 'accessories';

export interface ProductImageAngles {
  front?: string; // Data URL or Image URL
  back?: string;
  side?: string;
  detail?: string;
}

export interface Product {
  id: string;
  category: TechCategory;
  categoryName: string; // e.g. "Mobile Phones", "Laptops & Computers", "Smart TVs & Audio", "Home Appliances", "Accessories"
  brand: string; // e.g. "Samsung", "HP", "Apple", "LG", "Oraimo", "Midea", "Tecno"
  brandCategory: string; // e.g. "SAMSUNG GALAXY", "HP COMPUTING", "APPLE MAC", "LG APPLIANCES", "ORAIMO SMART"
  name: string;
  fullName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badges: ProductBadge[];
  specs: string[]; // e.g. ["16GB RAM", "512GB SSD", "Intel Core i7"] or ["4K HDR", "Dolby Atmos"]
  storage?: string; // "64GB" | "128GB" | "256GB" | "512GB" | "1TB"
  ram?: string; // "4GB" | "8GB" | "16GB" | "32GB"
  stockStatus: string; // e.g. "In Stock • Accra & Kumasi"
  isNewArrival?: boolean;
  isPopular?: boolean;
  isBestValue?: boolean;
  hasDiscount?: boolean;
  colorName: string;
  graphicType: string; // identifier for TechGraphic render
  phoneType?: string; // backwards compatibility
  description: string;
  inStockBranches: string[];
  uploadedImages?: ProductImageAngles;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string; // "all" | "mobile" | "laptops" | "tvs" | "appliances" | "accessories"
  selectedBrand: string; // "All" or specific brand
  manufacturers: string[];
  minPrice: number;
  maxPrice: number;
  discountedOnly: boolean;
  storageRam: string;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'popular';
}
