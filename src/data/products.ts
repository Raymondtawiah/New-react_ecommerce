import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'samsung-a08-128gb',
    brand: 'Samsung',
    brandCategory: 'SAMSUNG GALAXY',
    name: 'Samsung A08 (128GB ...',
    fullName: 'Samsung Galaxy A08 (128GB Storage, 4GB RAM) - Mint Green / Black Dual Edition',
    price: 2399.0,
    rating: 4.8,
    reviewCount: 42,
    badges: [
      { text: 'POPULAR', type: 'popular', bgClass: 'bg-[#064e3b] text-white font-bold' },
      { text: 'Free Glass', type: 'spec', bgClass: 'bg-[#10b981] text-white font-bold' }
    ],
    specs: ['4G LTE', '5000 mAh', 'Dual Cam'],
    storage: '128GB',
    ram: '4GB',
    stockStatus: 'In Stock • Accra & Kumasi',
    isPopular: true,
    hasDiscount: false,
    colorName: 'Mint Green / Onyx Black',
    phoneType: 'samsung-a08',
    description: 'The Samsung Galaxy A08 delivers remarkable battery longevity with its 5000mAh cell, vivid HD+ infinity display, and crisp dual camera system ideal for everyday mobile productivity and streaming.',
    inStockBranches: ['Accra Circle Main', 'Oxford St. Osu', 'Adum Kumasi', 'Kejetia Terminal']
  },
  {
    id: 'infinix-smart20-64gb',
    brand: 'Infinix',
    brandCategory: 'INFINIX MOBILITY',
    name: 'Infinix Smart 20 (64G...',
    fullName: 'Infinix Smart 20 (64GB Storage, 4GB RAM) - Sunrise Gold',
    price: 1250.0,
    rating: 4.6,
    reviewCount: 31,
    badges: [
      { text: 'BEST VALUE', type: 'best-value', bgClass: 'bg-[#064e3b] text-white font-bold' }
    ],
    specs: ['6.6" HD+', '5000mAh', 'Type-C'],
    storage: '64GB',
    ram: '4GB',
    stockStatus: 'Ready for Dispatch',
    isBestValue: true,
    hasDiscount: false,
    colorName: 'Sunrise Gold',
    phoneType: 'infinix-smart20',
    description: 'Infinix Smart 20 provides reliable battery endurance, modern Type-C fast charging, and a bright 6.6-inch display at an unbeatable Ghanaian price point.',
    inStockBranches: ['Takoradi Market Circle', 'Tamale Central', 'Accra Circle Main', 'Sunyani Commercial']
  },
  {
    id: 'tecno-pop20c-64gb',
    brand: 'Tecno Mobile',
    brandCategory: 'TECNO OFFICIAL',
    name: 'Tecno Pop 20C (64GB...',
    fullName: 'Tecno Pop 20C (64GB Storage, 4GB Extended RAM) - Multi-Color Series',
    price: 1495.0,
    originalPrice: 1600.0,
    rating: 4.7,
    reviewCount: 58,
    badges: [
      { text: 'NEW ARRIVAL', type: 'new-arrival', bgClass: 'bg-[#b91c1c] text-white font-bold' },
      { text: 'GH₵ 50 Coupon', type: 'coupon', bgClass: 'bg-[#059669] text-white font-bold' }
    ],
    specs: ['Dynamic Port', 'Stereo Sound'],
    storage: '64GB',
    ram: '4GB',
    stockStatus: 'Online Purchase Only',
    isNewArrival: true,
    hasDiscount: true,
    colorName: 'Magic Skin Blue',
    phoneType: 'tecno-pop20c',
    description: 'Tecno Pop 20C features the innovative Dynamic Port notifications, dual stereo speakers for immersive audio, and smooth daily performance.',
    inStockBranches: ['Online Warehouse Dispatch', 'Accra Central Hub']
  },
  {
    id: 'samsung-galaxy-a18-128gb',
    brand: 'Samsung',
    brandCategory: 'SAMSUNG SERIES A',
    name: 'Samsung Galaxy A18...',
    fullName: 'Samsung Galaxy A18 5G (128GB Storage, 8GB RAM) - Ice Lilac / Platinum Silver',
    price: 4399.0,
    originalPrice: 4599.0,
    rating: 4.9,
    reviewCount: 84,
    badges: [
      { text: 'NEW ARRIVAL', type: 'new-arrival', bgClass: 'bg-[#b91c1c] text-white font-bold' },
      { text: 'Save GH₵ 200', type: 'discount', bgClass: 'bg-[#dc2626] text-white font-bold' }
    ],
    specs: ['5G Ready', '8GB RAM', '50MP OIS'],
    storage: '128GB',
    ram: '8GB',
    stockStatus: 'Express Same-Day Delivery',
    isNewArrival: true,
    hasDiscount: true,
    colorName: 'Platinum Silver / Ice Lilac',
    phoneType: 'samsung-a18',
    description: 'Experience blazing 5G connectivity, 8GB RAM for flawless multitasking, and a 50MP optical image stabilized primary camera backed by Samsung Knox security.',
    inStockBranches: ['Accra Circle Main', 'Oxford St. Osu', 'Kumasi Adum', 'Koforidua Central']
  },
  {
    id: 'apple-iphone-15-128gb',
    brand: 'Apple iPhone',
    brandCategory: 'APPLE INC.',
    name: 'Apple iPhone 15...',
    fullName: 'Apple iPhone 15 (128GB Storage) - Ceramic Titanium Blue (Official Factory Unlocked)',
    price: 11499.0,
    originalPrice: 12200.0,
    rating: 5.0,
    reviewCount: 112,
    badges: [
      { text: 'APPLE CERTIFIED', type: 'certified', bgClass: 'bg-[#064e3b] text-white font-bold' },
      { text: '-6% OFF', type: 'discount', bgClass: 'bg-[#dc2626] text-white font-bold' }
    ],
    specs: ['Dynamic Island', '48MP', 'USB-C'],
    storage: '128GB',
    ram: '6GB',
    stockStatus: '1 Year Official Apple Warranty',
    hasDiscount: true,
    colorName: 'Titanium Blue',
    phoneType: 'iphone-15',
    description: 'Featuring the innovative Dynamic Island, an advanced 48MP main camera with 2x Telephoto, universally compatible USB-C, and aerospace-grade aluminum chassis.',
    inStockBranches: ['Accra Circle Flagship', 'Oxford St. Osu', 'Kumasi Adum', 'All 35 Showrooms']
  },
  {
    id: 'tecno-spark-20-pro-256gb',
    brand: 'Tecno Mobile',
    brandCategory: 'TECNO SERIES',
    name: 'Tecno Spark 20 Pro...',
    fullName: 'Tecno Spark 20 Pro (256GB Storage, 8GB+8GB RAM) - Obsidian Gloss Black',
    price: 2150.0,
    rating: 4.8,
    reviewCount: 65,
    badges: [
      { text: '108MP PRO', type: 'spec', bgClass: 'bg-[#047857] text-white font-bold' }
    ],
    specs: ['108MP', 'Helio G99', '33W Fast'],
    storage: '256GB',
    ram: '8GB',
    stockStatus: 'In Stock • All 35 Showrooms',
    hasDiscount: false,
    colorName: 'Obsidian Gloss Black',
    phoneType: 'tecno-spark20',
    description: 'Empowered with an ultra-sensing 108MP camera, Helio G99 gaming processor, 33W super-charge technology, and massive 256GB storage capacity.',
    inStockBranches: ['All 35 Franko Showrooms Nationwide']
  },
  {
    id: 'infinix-note-40-256gb',
    brand: 'Infinix',
    brandCategory: 'INFINIX SERIES',
    name: 'Infinix Note 40 (256G...',
    fullName: 'Infinix Note 40 (256GB Storage, 8GB RAM) - Champagne Gold with Wireless MagCharge Pad',
    price: 3190.0,
    rating: 4.9,
    reviewCount: 47,
    badges: [
      { text: 'WIRELESS CHARGE', type: 'wireless', bgClass: 'bg-[#059669] text-white font-bold' },
      { text: 'Hot Pick', type: 'popular', bgClass: 'bg-[#dc2626] text-white font-bold' }
    ],
    specs: ['MagCharge', '120Hz AMOLED'],
    storage: '256GB',
    ram: '8GB',
    stockStatus: 'Includes Wireless Pad',
    isPopular: true,
    hasDiscount: false,
    colorName: 'Champagne Gold',
    phoneType: 'infinix-note40',
    description: 'Features 20W Wireless MagCharge technology, ultra-smooth 120Hz AMOLED curved display, JBL sound acoustics, and 108MP super-zoom camera.',
    inStockBranches: ['Accra Circle Main', 'Kumasi Adum', 'Takoradi Central', 'Sunyani']
  },
  {
    id: 'redmi-note-13-128gb',
    brand: 'Xiaomi / Redmi',
    brandCategory: 'XIAOMI OFFICIAL',
    name: 'Redmi Note 13 (128G...',
    fullName: 'Xiaomi Redmi Note 13 (128GB Storage, 8GB RAM) - Mint Blue / Ice Aurora',
    price: 2499.0,
    originalPrice: 2750.0,
    rating: 4.8,
    reviewCount: 93,
    badges: [
      { text: '-10% OFF', type: 'discount', bgClass: 'bg-[#dc2626] text-white font-bold' }
    ],
    specs: ['108MP Triple', 'AMOLED 120Hz'],
    storage: '128GB',
    ram: '8GB',
    stockStatus: 'In Stock • Free Franko Pouch',
    hasDiscount: true,
    colorName: 'Mint Blue Ice',
    phoneType: 'redmi-note13',
    description: 'Remarkable 108MP triple camera setup with 3x in-sensor zoom, 120Hz eye-care FHD+ AMOLED screen with ultra-slim bezels, and 33W fast charging.',
    inStockBranches: ['Accra Circle Main', 'Oxford St. Osu', 'Tamale Central', 'Cape Coast']
  },
  // Additional products for pagination & full brand catalog
  {
    id: 'samsung-s24-ultra',
    brand: 'Samsung',
    brandCategory: 'SAMSUNG GALAXY',
    name: 'Galaxy S24 Ultra...',
    fullName: 'Samsung Galaxy S24 Ultra 5G (512GB, 12GB RAM) - Titanium Gray',
    price: 16999.0,
    originalPrice: 17999.0,
    rating: 5.0,
    reviewCount: 140,
    badges: [
      { text: 'POPULAR', type: 'popular', bgClass: 'bg-[#064e3b] text-white font-bold' },
      { text: 'Save GH₵ 1,000', type: 'discount', bgClass: 'bg-[#dc2626] text-white font-bold' }
    ],
    specs: ['200MP AI', 'S-Pen', 'Snapdragon 8 Gen3'],
    storage: '512GB',
    ram: '12GB',
    stockStatus: 'In Stock • Accra Flagship',
    isPopular: true,
    hasDiscount: true,
    colorName: 'Titanium Gray',
    phoneType: 'samsung-a18',
    description: 'The pinnacle of smartphone innovation: Galaxy AI, built-in S Pen stylus, titanium frame, and 200MP quad telephoto system.',
    inStockBranches: ['Accra Circle Main', 'Oxford St. Osu']
  },
  {
    id: 'google-pixel-8-pro',
    brand: 'Google Pixel',
    brandCategory: 'GOOGLE PIXEL',
    name: 'Pixel 8 Pro 5G...',
    fullName: 'Google Pixel 8 Pro 5G (128GB Storage, 12GB RAM) - Bay Blue',
    price: 8499.0,
    originalPrice: 8999.0,
    rating: 4.9,
    reviewCount: 38,
    badges: [
      { text: 'BEST VALUE', type: 'best-value', bgClass: 'bg-[#064e3b] text-white font-bold' },
      { text: 'Google AI', type: 'spec', bgClass: 'bg-[#047857] text-white font-bold' }
    ],
    specs: ['Tensor G3', '50MP Triple', '7Y Updates'],
    storage: '128GB',
    ram: '12GB',
    stockStatus: 'In Stock • Accra & Kumasi',
    isBestValue: true,
    hasDiscount: true,
    colorName: 'Bay Blue',
    phoneType: 'samsung-a18',
    description: 'Pure Android experience with Google Tensor G3, best-in-class computational photography, Magic Eraser, and 7 years of OS updates.',
    inStockBranches: ['Accra Circle Main', 'Kumasi Adum']
  },
  {
    id: 'tecno-camon-30-premier',
    brand: 'Tecno Mobile',
    brandCategory: 'TECNO SERIES',
    name: 'Tecno Camon 30...',
    fullName: 'Tecno Camon 30 Premier 5G (512GB, 12GB RAM) - Alps Snowy Silver',
    price: 4999.0,
    rating: 4.8,
    reviewCount: 52,
    badges: [
      { text: 'NEW ARRIVAL', type: 'new-arrival', bgClass: 'bg-[#b91c1c] text-white font-bold' }
    ],
    specs: ['PolarAce AI', '70W Ultra', 'Sony IMX890'],
    storage: '512GB',
    ram: '12GB',
    stockStatus: 'In Stock • All 35 Showrooms',
    isNewArrival: true,
    hasDiscount: false,
    colorName: 'Snowy Silver',
    phoneType: 'tecno-spark20',
    description: 'Dedicated PolarAce AI imaging chip, Sony sensor 50MP periscope zoom, and 70W ultra-speed flash charge.',
    inStockBranches: ['All 35 Franko Showrooms Nationwide']
  },
  {
    id: 'apple-iphone-15-pro-max',
    brand: 'Apple iPhone',
    brandCategory: 'APPLE INC.',
    name: 'iPhone 15 Pro Max...',
    fullName: 'Apple iPhone 15 Pro Max (256GB Storage) - Natural Titanium',
    price: 16499.0,
    rating: 5.0,
    reviewCount: 180,
    badges: [
      { text: 'APPLE CERTIFIED', type: 'certified', bgClass: 'bg-[#064e3b] text-white font-bold' }
    ],
    specs: ['A17 Pro', '5x Optical', 'Action Button'],
    storage: '256GB',
    ram: '8GB',
    stockStatus: '1 Year Official Apple Warranty',
    hasDiscount: false,
    colorName: 'Natural Titanium',
    phoneType: 'iphone-15',
    description: 'Aerospace-grade natural titanium design, A17 Pro 3nm chip with console-level gaming capability, and 5x optical telephoto lens.',
    inStockBranches: ['Accra Circle Flagship', 'Oxford St. Osu', 'Kumasi Adum']
  }
];

export const BRAND_COUNTS = [
  { name: 'All Brands', count: 92, key: 'All' },
  { name: 'Samsung', count: 34, key: 'Samsung' },
  { name: 'Tecno', count: 28, key: 'Tecno Mobile' },
  { name: 'Infinix', count: 19, key: 'Infinix' },
  { name: 'Apple iPhone', count: 12, key: 'Apple iPhone' },
  { name: 'Xiaomi', count: 8, key: 'Xiaomi / Redmi' },
  { name: 'Google Pixel', count: 4, key: 'Google Pixel' }
];

export const GHANA_SHOWROOMS = [
  { city: 'Accra', branches: ['Kwame Nkrumah Circle (Flagship)', 'Oxford Street, Osu', 'Madina Market', 'Kaneshie First Light', 'Spintex Road'] },
  { city: 'Kumasi', branches: ['Adum (Opposite Central Post)', 'Kejetia Market Terminal', 'Bantama High Street'] },
  { city: 'Takoradi', branches: ['Market Circle Commercial Area', 'Collins Avenue'] },
  { city: 'Tamale', branches: ['Central Market Commercial Road', 'Hospital Road'] },
  { city: 'Sunyani', branches: ['Central Commercial Strip', 'Post Office Square'] },
  { city: 'Cape Coast', branches: ['Commercial Street Kotokuraba'] },
  { city: 'Koforidua', branches: ['Central Market Street'] }
];
