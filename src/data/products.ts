import { Product, TechCategory } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // ================= 1. MOBILE PHONES (From original design) =================
  {
    id: 'samsung-a08-128gb',
    category: 'mobile',
    categoryName: 'Mobile Phones',
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
    graphicType: 'samsung-a08',
    phoneType: 'samsung-a08',
    description: 'The Samsung Galaxy A08 delivers remarkable battery longevity with its 5000mAh cell, vivid HD+ infinity display, and crisp dual camera system ideal for everyday mobile productivity.',
    inStockBranches: ['Accra Circle Main', 'Oxford St. Osu', 'Adum Kumasi', 'Kejetia Terminal']
  },
  {
    id: 'infinix-smart20-64gb',
    category: 'mobile',
    categoryName: 'Mobile Phones',
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
    graphicType: 'infinix-smart20',
    phoneType: 'infinix-smart20',
    description: 'Infinix Smart 20 provides reliable battery endurance, modern Type-C fast charging, and a bright 6.6-inch display at an unbeatable Ghanaian price point.',
    inStockBranches: ['Takoradi Market Circle', 'Tamale Central', 'Accra Circle Main', 'Sunyani Commercial']
  },
  {
    id: 'tecno-pop20c-64gb',
    category: 'mobile',
    categoryName: 'Mobile Phones',
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
    graphicType: 'tecno-pop20c',
    phoneType: 'tecno-pop20c',
    description: 'Tecno Pop 20C features the innovative Dynamic Port notifications, dual stereo speakers for immersive audio, and smooth daily performance.',
    inStockBranches: ['Online Warehouse Dispatch', 'Accra Central Hub']
  },
  {
    id: 'samsung-galaxy-a18-128gb',
    category: 'mobile',
    categoryName: 'Mobile Phones',
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
    graphicType: 'samsung-a18',
    phoneType: 'samsung-a18',
    description: 'Experience blazing 5G connectivity, 8GB RAM for flawless multitasking, and a 50MP optical image stabilized primary camera backed by Samsung Knox security.',
    inStockBranches: ['Accra Circle Main', 'Oxford St. Osu', 'Kumasi Adum', 'Koforidua Central']
  },
  {
    id: 'apple-iphone-15-128gb',
    category: 'mobile',
    categoryName: 'Mobile Phones',
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
    graphicType: 'iphone-15',
    phoneType: 'iphone-15',
    description: 'Featuring the innovative Dynamic Island, an advanced 48MP main camera with 2x Telephoto, universally compatible USB-C, and aerospace-grade aluminum chassis.',
    inStockBranches: ['Accra Circle Flagship', 'Oxford St. Osu', 'Kumasi Adum', 'All 35 Showrooms']
  },
  {
    id: 'tecno-spark-20-pro-256gb',
    category: 'mobile',
    categoryName: 'Mobile Phones',
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
    graphicType: 'tecno-spark20',
    phoneType: 'tecno-spark20',
    description: 'Empowered with an ultra-sensing 108MP camera, Helio G99 gaming processor, 33W super-charge technology, and massive 256GB storage capacity.',
    inStockBranches: ['All 35 ApexTech Showrooms Nationwide']
  },
  {
    id: 'infinix-note-40-256gb',
    category: 'mobile',
    categoryName: 'Mobile Phones',
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
    graphicType: 'infinix-note40',
    phoneType: 'infinix-note40',
    description: 'Features 20W Wireless MagCharge technology, ultra-smooth 120Hz AMOLED curved display, JBL sound acoustics, and 108MP super-zoom camera.',
    inStockBranches: ['Accra Circle Main', 'Kumasi Adum', 'Takoradi Central', 'Sunyani']
  },
  {
    id: 'redmi-note-13-128gb',
    category: 'mobile',
    categoryName: 'Mobile Phones',
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
    stockStatus: 'In Stock • Free ApexTech Pouch',
    hasDiscount: true,
    colorName: 'Mint Blue Ice',
    graphicType: 'redmi-note13',
    phoneType: 'redmi-note13',
    description: 'Remarkable 108MP triple camera setup with 3x in-sensor zoom, 120Hz eye-care FHD+ AMOLED screen with ultra-slim bezels, and 33W fast charging.',
    inStockBranches: ['Accra Circle Main', 'Oxford St. Osu', 'Tamale Central', 'Cape Coast']
  },

  // ================= 2. LAPTOPS & COMPUTERS =================
  {
    id: 'macbook-air-m3',
    category: 'laptops',
    categoryName: 'Laptops & Computers',
    brand: 'Apple',
    brandCategory: 'APPLE MACINTOSH',
    name: 'MacBook Air M3 (13.6")...',
    fullName: 'Apple MacBook Air 13.6" Liquid Retina (M3 Chip, 8-Core CPU, 16GB RAM, 512GB SSD) - Space Gray',
    price: 18499.0,
    originalPrice: 19999.0,
    rating: 5.0,
    reviewCount: 74,
    badges: [
      { text: 'APPLE OFFICIAL', type: 'certified', bgClass: 'bg-[#064e3b] text-white font-bold' },
      { text: 'Save GH₵ 1,500', type: 'discount', bgClass: 'bg-[#dc2626] text-white font-bold' }
    ],
    specs: ['Apple M3', '16GB RAM', '512GB SSD'],
    storage: '512GB',
    ram: '16GB',
    stockStatus: 'In Stock • Accra Flagship Hub',
    isPopular: true,
    hasDiscount: true,
    colorName: 'Space Gray',
    graphicType: 'laptop-macbook',
    description: 'Supercharged by Apple M3 silicon with 18-hour battery life, stunning Liquid Retina display, MagSafe 3 charging, and backlit Magic Keyboard.',
    inStockBranches: ['Accra Circle Flagship', 'Oxford St. Osu', 'Kumasi Adum']
  },
  {
    id: 'hp-envy-x360-14',
    category: 'laptops',
    categoryName: 'Laptops & Computers',
    brand: 'HP',
    brandCategory: 'HP COMPUTING',
    name: 'HP Envy x360 14 Touch...',
    fullName: 'HP Envy x360 2-in-1 Convertible Laptop (Intel Core i7 13th Gen, 16GB RAM, 1TB SSD, Stylus Pen Included)',
    price: 12950.0,
    originalPrice: 13800.0,
    rating: 4.8,
    reviewCount: 39,
    badges: [
      { text: 'BEST VALUE', type: 'best-value', bgClass: 'bg-[#064e3b] text-white font-bold' },
      { text: 'Includes Pen', type: 'spec', bgClass: 'bg-[#10b981] text-white font-bold' }
    ],
    specs: ['Core i7 13th', '16GB RAM', '1TB NVMe'],
    storage: '1TB',
    ram: '16GB',
    stockStatus: 'In Stock • All Showrooms',
    hasDiscount: true,
    colorName: 'Natural Silver',
    graphicType: 'laptop-hp',
    description: 'Versatile 360-degree hinge transforms this laptop into a creative tablet with precision touch display, Bang & Olufsen tuned audio, and 1TB ultra-fast storage.',
    inStockBranches: ['Accra Circle Main', 'Takoradi Market Circle', 'Kumasi Adum']
  },
  {
    id: 'dell-inspiron-15',
    category: 'laptops',
    categoryName: 'Laptops & Computers',
    brand: 'Dell',
    brandCategory: 'DELL COMMERCIAL',
    name: 'Dell Inspiron 15 (FHD)...',
    fullName: 'Dell Inspiron 15 3520 (Intel Core i5 12th Gen, 8GB RAM, 512GB SSD, 120Hz Anti-Glare Screen)',
    price: 7499.0,
    rating: 4.7,
    reviewCount: 45,
    badges: [
      { text: 'HOT SELLER', type: 'popular', bgClass: 'bg-[#b91c1c] text-white font-bold' }
    ],
    specs: ['Core i5 12th', '8GB RAM', '120Hz FHD'],
    storage: '512GB',
    ram: '8GB',
    stockStatus: 'Ready for Immediate Dispatch',
    isPopular: true,
    hasDiscount: false,
    colorName: 'Carbon Black',
    graphicType: 'laptop-hp',
    description: 'Work comfortably with a lift hinge design, spill-resistant keyboard, 120Hz smooth FHD panel, and robust Dell build quality.',
    inStockBranches: ['Accra Circle Flagship', 'Kumasi Kejetia', 'Sunyani Commercial']
  },

  // ================= 3. SMART TVS & AUDIO =================
  {
    id: 'samsung-65-crystal-4k',
    category: 'tvs',
    categoryName: 'Smart TVs & Audio',
    brand: 'Samsung',
    brandCategory: 'SAMSUNG VISUAL',
    name: 'Samsung 65" Crystal 4K...',
    fullName: 'Samsung 65-Inch CU7000 Crystal 4K UHD HDR Smart TV (AirSlim Design, Tizen OS, Voice Remote)',
    price: 9899.0,
    originalPrice: 10999.0,
    rating: 4.9,
    reviewCount: 62,
    badges: [
      { text: 'OFFICIAL 4K', type: 'certified', bgClass: 'bg-[#064e3b] text-white font-bold' },
      { text: 'Save GH₵ 1,100', type: 'discount', bgClass: 'bg-[#dc2626] text-white font-bold' }
    ],
    specs: ['65" Crystal', '4K UHD HDR', 'Smart Tizen'],
    stockStatus: 'In Stock • Free Installation in Accra/Kumasi',
    isPopular: true,
    hasDiscount: true,
    colorName: 'Titan Gray Slim Bezel',
    graphicType: 'tv-samsung',
    description: 'Crisp 4K color resolution powered by the Crystal Processor 4K, Object Tracking Sound Lite, and built-in Smart Hub for Netflix, YouTube, and DSTV Stream.',
    inStockBranches: ['Accra Circle Flagship', 'Kumasi Adum', 'Takoradi Commercial']
  },
  {
    id: 'jbl-bar-500-pro',
    category: 'tvs',
    categoryName: 'Smart TVs & Audio',
    brand: 'JBL',
    brandCategory: 'JBL ACOUSTICS',
    name: 'JBL Bar 500 Dolby Atmos...',
    fullName: 'JBL Bar 500 5.1-Channel Soundbar with MultiBeam, Wireless 10" Subwoofer (590W Max Output, AirPlay 2)',
    price: 6499.0,
    rating: 4.9,
    reviewCount: 28,
    badges: [
      { text: 'DOLBY ATMOS', type: 'spec', bgClass: 'bg-[#047857] text-white font-bold' },
      { text: '590W Bass', type: 'spec', bgClass: 'bg-[#b91c1c] text-white font-bold' }
    ],
    specs: ['Dolby Atmos', '590W Peak', 'Wireless Sub'],
    stockStatus: 'In Stock • Accra & Kumasi Hubs',
    hasDiscount: false,
    colorName: 'Matte Black',
    graphicType: 'audio-soundbar',
    description: 'Transform movies and highlife music with 3D cinematic surround sound, PureVoice dialogue enhancement, and deep chest-thumping bass from a 10" wireless subwoofer.',
    inStockBranches: ['Accra Circle Main', 'Oxford St. Osu', 'Tamale Central']
  },

  // ================= 4. HOME APPLIANCES =================
  {
    id: 'samsung-fridge-260l',
    category: 'appliances',
    categoryName: 'Home Appliances',
    brand: 'Samsung',
    brandCategory: 'SAMSUNG APPLIANCES',
    name: 'Samsung 260L No-Frost...',
    fullName: 'Samsung 260-Liter Top Mount Double Door Inverter Refrigerator (Digital Inverter with 10Y Compressor Warranty)',
    price: 5850.0,
    originalPrice: 6300.0,
    rating: 4.8,
    reviewCount: 51,
    badges: [
      { text: '10Y WARRANTY', type: 'certified', bgClass: 'bg-[#064e3b] text-white font-bold' },
      { text: 'Save GH₵ 450', type: 'discount', bgClass: 'bg-[#dc2626] text-white font-bold' }
    ],
    specs: ['260 Litres', 'No-Frost', 'Digital Inverter'],
    stockStatus: 'In Stock • Same-Day Truck Dispatch',
    isBestValue: true,
    hasDiscount: true,
    colorName: 'Elegance Inox Silver',
    graphicType: 'appliance-fridge',
    description: 'Equipped with digital inverter technology that automatically adjusts cooling speed, all-around cooling vents, and frost-free preservation for Ghanaian households.',
    inStockBranches: ['Accra Circle Warehouse', 'Kumasi Adum Hub', 'Takoradi Circle']
  },
  {
    id: 'midea-inverter-ac-15hp',
    category: 'appliances',
    categoryName: 'Home Appliances',
    brand: 'Midea',
    brandCategory: 'MIDEA CLIMATE',
    name: 'Midea 1.5HP Inverter AC...',
    fullName: 'Midea 1.5HP R32 Eco-Inverter Split Air Conditioner (70% Power Saving, Rapid Turbo Cool, Copper Condenser)',
    price: 4699.0,
    rating: 4.9,
    reviewCount: 88,
    badges: [
      { text: '70% POWER SAVE', type: 'spec', bgClass: 'bg-[#059669] text-white font-bold' },
      { text: 'POPULAR', type: 'popular', bgClass: 'bg-[#064e3b] text-white font-bold' }
    ],
    specs: ['1.5 HP Inverter', 'R32 Gas', 'Copper Tubing'],
    stockStatus: 'In Stock • Certified ApexTech Technicians',
    isPopular: true,
    hasDiscount: false,
    colorName: 'Arctic White',
    graphicType: 'appliance-ac',
    description: 'Beat the tropical heat with Midea high-efficiency inverter compressor, anti-corrosive Golden Fin condenser, and low voltage startup designed for Ghana power grids.',
    inStockBranches: ['Accra Circle Main', 'Kumasi Adum', 'Takoradi Central', 'Sunyani']
  },

  // ================= 5. ACCESSORIES & WEARABLES =================
  {
    id: 'oraimo-powerbox-30000',
    category: 'accessories',
    categoryName: 'Accessories & Wearables',
    brand: 'Oraimo',
    brandCategory: 'ORAIMO SMART GADGETS',
    name: 'Oraimo 30000mAh Power...',
    fullName: 'Oraimo PowerBox 30000mAh 22.5W Ultra-Fast Charge Power Bank with AniFast LED Display & SOS Torch',
    price: 499.0,
    originalPrice: 580.0,
    rating: 4.9,
    reviewCount: 215,
    badges: [
      { text: 'BEST SELLER', type: 'popular', bgClass: 'bg-[#b91c1c] text-white font-bold' },
      { text: '22.5W Fast', type: 'spec', bgClass: 'bg-[#059669] text-white font-bold' }
    ],
    specs: ['30,000 mAh', '22.5W PD/QC', 'Triple Output'],
    stockStatus: 'In Stock • Ready for Pickup at All 35 Showrooms',
    isPopular: true,
    hasDiscount: true,
    colorName: 'Textured Black',
    graphicType: 'accessory-powerbank',
    description: 'Never get stranded in power fluctuations: charges an iPhone 15 up to 7 times or Samsung Galaxy up to 6 times with high-speed 22.5W power delivery.',
    inStockBranches: ['All 35 ApexTech Showrooms Nationwide']
  },
  {
    id: 'apple-watch-series-9',
    category: 'accessories',
    categoryName: 'Accessories & Wearables',
    brand: 'Apple',
    brandCategory: 'APPLE WATCH',
    name: 'Apple Watch Series 9...',
    fullName: 'Apple Watch Series 9 GPS 45mm (Midnight Aluminum Case with Midnight Sport Band, S9 SiP, Double Tap Gesture)',
    price: 5999.0,
    originalPrice: 6400.0,
    rating: 5.0,
    reviewCount: 42,
    badges: [
      { text: 'SERIES 9', type: 'certified', bgClass: 'bg-[#064e3b] text-white font-bold' },
      { text: 'Double Tap', type: 'spec', bgClass: 'bg-[#047857] text-white font-bold' }
    ],
    specs: ['S9 SiP', 'ECG & Blood O2', '2000 Nits'],
    stockStatus: 'In Stock • 1 Year Official Apple Warranty',
    isPopular: true,
    hasDiscount: true,
    colorName: 'Midnight Black',
    graphicType: 'accessory-smartwatch',
    description: 'Powered by the S9 chip with the magical Double Tap gesture control, precision heart monitoring, cycle tracking, and bright 2000-nit edge-to-edge display.',
    inStockBranches: ['Accra Circle Flagship', 'Oxford St. Osu', 'Kumasi Adum']
  },
  {
    id: 'samsung-galaxy-buds-2-pro',
    category: 'accessories',
    categoryName: 'Accessories & Wearables',
    brand: 'Samsung',
    brandCategory: 'SAMSUNG AUDIO',
    name: 'Galaxy Buds 2 Pro ANC...',
    fullName: 'Samsung Galaxy Buds 2 Pro True Wireless Earbuds (24-bit Hi-Fi Sound, Active Noise Cancelling, 360 Audio)',
    price: 1899.0,
    originalPrice: 2100.0,
    rating: 4.8,
    reviewCount: 68,
    badges: [
      { text: '24-BIT HI-FI', type: 'spec', bgClass: 'bg-[#059669] text-white font-bold' },
      { text: '-10% OFF', type: 'discount', bgClass: 'bg-[#dc2626] text-white font-bold' }
    ],
    specs: ['Intelligent ANC', '24-Bit Audio', 'IPX7 Water'],
    stockStatus: 'In Stock • All 35 Showrooms',
    hasDiscount: true,
    colorName: 'Bora Purple / Graphite',
    graphicType: 'accessory-earbuds',
    description: 'Studio-grade 24-bit audio clarity, seamless Galaxy device switching, ergonomic design, and intelligent Active Noise Cancelling that filters ambient noise.',
    inStockBranches: ['Accra Circle Main', 'Kumasi Adum', 'Takoradi Central']
  }
];

export const CATEGORY_METADATA: Record<TechCategory, {
  title: string;
  subtitle: string;
  brands: Array<{ name: string; count: number; key: string }>;
}> = {
  mobile: {
    title: 'Mobile Phones & Smartphones',
    subtitle: 'Official Manufacturer Certified Stock • 12-Month Official ApexTech Warranty',
    brands: [
      { name: 'All Brands', count: 92, key: 'All' },
      { name: 'Samsung', count: 34, key: 'Samsung' },
      { name: 'Tecno', count: 28, key: 'Tecno Mobile' },
      { name: 'Infinix', count: 19, key: 'Infinix' },
      { name: 'Apple iPhone', count: 12, key: 'Apple iPhone' },
      { name: 'Xiaomi', count: 8, key: 'Xiaomi / Redmi' },
      { name: 'Google Pixel', count: 4, key: 'Google Pixel' }
    ]
  },
  laptops: {
    title: 'Laptops, MacBooks & Computers',
    subtitle: 'High-performance computing for students, creators & corporate enterprises in Ghana',
    brands: [
      { name: 'All Laptops', count: 46, key: 'All' },
      { name: 'HP', count: 18, key: 'HP' },
      { name: 'Apple Mac', count: 12, key: 'Apple' },
      { name: 'Dell', count: 10, key: 'Dell' },
      { name: 'Lenovo', count: 6, key: 'Lenovo' }
    ]
  },
  tvs: {
    title: 'Smart TVs & Home Theatres',
    subtitle: '4K Crystal UHD, OLED Displays, and Dolby Atmos Soundbars with Free Ghana Installation',
    brands: [
      { name: 'All Screens & Audio', count: 38, key: 'All' },
      { name: 'Samsung', count: 16, key: 'Samsung' },
      { name: 'LG', count: 12, key: 'LG' },
      { name: 'JBL', count: 6, key: 'JBL' },
      { name: 'TCL', count: 4, key: 'TCL' }
    ]
  },
  appliances: {
    title: 'Home Appliances & Inverters',
    subtitle: 'Energy-saving Inverter Refrigerators, Air Conditioners, and Kitchen Equipment',
    brands: [
      { name: 'All Appliances', count: 52, key: 'All' },
      { name: 'Samsung', count: 20, key: 'Samsung' },
      { name: 'Midea', count: 16, key: 'Midea' },
      { name: 'LG', count: 10, key: 'LG' },
      { name: 'Philips', count: 6, key: 'Philips' }
    ]
  },
  accessories: {
    title: 'Accessories, Smartwatches & Audio',
    subtitle: 'Certified Power Banks, AirPods, GaN Chargers, Earbuds & Smart Gadgets',
    brands: [
      { name: 'All Accessories', count: 84, key: 'All' },
      { name: 'Oraimo', count: 35, key: 'Oraimo' },
      { name: 'Apple', count: 22, key: 'Apple' },
      { name: 'Samsung', count: 15, key: 'Samsung' },
      { name: 'Anker', count: 12, key: 'Anker' }
    ]
  }
};

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
