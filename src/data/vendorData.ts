import { VendorOrder, ShowroomStockAllocation, VendorPayout, WarrantyClaim } from '../types/vendor';

export const INITIAL_VENDOR_ORDERS: VendorOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'FT-GH-94281',
    customerName: 'Kwesi Appiah',
    customerPhone: '024 492 1109',
    productName: 'Samsung Galaxy A08 (128GB)',
    quantity: 1,
    totalPrice: 2399.0,
    paymentMethod: 'MTN MoMo',
    deliveryRegion: 'East Legon, Greater Accra',
    status: 'dispatched',
    createdAt: 'Today, 10:14 AM',
    dispatchHub: 'Accra Circle Flagship Hub'
  },
  {
    id: 'ord-102',
    orderNumber: 'FT-GH-94280',
    customerName: 'Akosua Mensah',
    customerPhone: '020 819 4432',
    productName: 'Infinix Note 40 (256GB Gold)',
    quantity: 1,
    totalPrice: 3190.0,
    paymentMethod: 'Telecel Cash',
    deliveryRegion: 'Ahodwo, Kumasi',
    status: 'processing',
    createdAt: 'Today, 09:45 AM',
    dispatchHub: 'Kumasi Adum Central Hub'
  },
  {
    id: 'ord-103',
    orderNumber: 'FT-GH-94279',
    customerName: 'Emmanuel Ofori',
    customerPhone: '054 332 9918',
    productName: 'Apple iPhone 15 (128GB Titanium Blue)',
    quantity: 1,
    totalPrice: 11499.0,
    paymentMethod: 'Card',
    deliveryRegion: 'Airport Residential, Accra',
    status: 'delivered',
    createdAt: 'Yesterday, 04:30 PM',
    dispatchHub: 'Accra Circle Flagship Hub'
  },
  {
    id: 'ord-104',
    orderNumber: 'FT-GH-94278',
    customerName: 'Grace Antwi',
    customerPhone: '027 761 0023',
    productName: 'Tecno Spark 20 Pro (256GB)',
    quantity: 2,
    totalPrice: 4300.0,
    paymentMethod: 'MTN MoMo',
    deliveryRegion: 'Market Circle, Takoradi',
    status: 'dispatched',
    createdAt: 'Yesterday, 02:15 PM',
    dispatchHub: 'Takoradi Commercial Hub'
  },
  {
    id: 'ord-105',
    orderNumber: 'FT-GH-94277',
    customerName: 'Mohammed Alhassan',
    customerPhone: '024 119 7782',
    productName: 'Redmi Note 13 (128GB Mint)',
    quantity: 1,
    totalPrice: 2499.0,
    paymentMethod: 'Cash on Delivery',
    deliveryRegion: 'Central Commercial Area, Tamale',
    status: 'processing',
    createdAt: 'Yesterday, 11:20 AM',
    dispatchHub: 'Tamale Central Dispatch'
  },
  {
    id: 'ord-106',
    orderNumber: 'FT-GH-94276',
    customerName: 'Derrick Boateng',
    customerPhone: '055 901 3342',
    productName: 'Samsung Galaxy A18 5G (128GB)',
    quantity: 1,
    totalPrice: 4399.0,
    paymentMethod: 'MTN MoMo',
    deliveryRegion: 'Spintex Road, Accra',
    status: 'delivered',
    createdAt: '24 Oct 2026',
    dispatchHub: 'Accra Circle Flagship Hub'
  }
];

export const INITIAL_SHOWROOM_STOCKS: ShowroomStockAllocation[] = [
  {
    branchId: 'sh-01',
    city: 'Accra',
    branchName: 'Kwame Nkrumah Circle (Central Flagship)',
    stockCount: 142,
    lowStockThreshold: 20,
    managerContact: '024 411 2233'
  },
  {
    branchId: 'sh-02',
    city: 'Accra',
    branchName: 'Oxford Street, Osu Commercial',
    stockCount: 88,
    lowStockThreshold: 15,
    managerContact: '020 988 7711'
  },
  {
    branchId: 'sh-03',
    city: 'Kumasi',
    branchName: 'Adum (Opposite Central Post)',
    stockCount: 115,
    lowStockThreshold: 20,
    managerContact: '054 220 3344'
  },
  {
    branchId: 'sh-04',
    city: 'Kumasi',
    branchName: 'Kejetia Market Terminal',
    stockCount: 76,
    lowStockThreshold: 15,
    managerContact: '024 330 9988'
  },
  {
    branchId: 'sh-05',
    city: 'Takoradi',
    branchName: 'Market Circle Commercial Area',
    stockCount: 64,
    lowStockThreshold: 12,
    managerContact: '027 882 1199'
  },
  {
    branchId: 'sh-06',
    city: 'Tamale',
    branchName: 'Central Market Commercial Road',
    stockCount: 52,
    lowStockThreshold: 10,
    managerContact: '024 771 5566'
  },
  {
    branchId: 'sh-07',
    city: 'Sunyani',
    branchName: 'Central Commercial Strip',
    stockCount: 38,
    lowStockThreshold: 10,
    managerContact: '050 443 2211'
  }
];

export const INITIAL_VENDOR_PAYOUTS: VendorPayout[] = [
  {
    id: 'pay-01',
    payoutRef: 'PAY-GH-78401',
    amount: 35000.0,
    channel: 'MTN MoMo',
    recipientNumber: '024 456 7890 (Franko Partner Wallet)',
    status: 'completed',
    date: '24 Oct 2026, 03:30 PM'
  },
  {
    id: 'pay-02',
    payoutRef: 'PAY-GH-78400',
    amount: 52400.0,
    channel: 'Ghana Interbank (GIP)',
    recipientNumber: 'GCB Bank - 1041129482910',
    status: 'completed',
    date: '21 Oct 2026, 11:15 AM'
  },
  {
    id: 'pay-03',
    payoutRef: 'PAY-GH-78399',
    amount: 22800.0,
    channel: 'Telecel Cash',
    recipientNumber: '020 900 1122',
    status: 'completed',
    date: '18 Oct 2026, 04:00 PM'
  }
];

export const INITIAL_WARRANTY_CLAIMS: WarrantyClaim[] = [
  {
    id: 'warr-01',
    claimId: 'WR-8910',
    deviceModel: 'Samsung Galaxy A18 5G',
    imei: '354891048291048',
    customerName: 'Kofi Owusu',
    issueDescription: 'Screen touch response intermittently lagging after update',
    repairCenter: 'Accra Circle Official Franko Service Hub',
    status: 'diagnosing',
    dateFiled: 'Today, 08:30 AM'
  },
  {
    id: 'warr-02',
    claimId: 'WR-8909',
    deviceModel: 'Tecno Spark 20 Pro',
    imei: '864920194820194',
    customerName: 'Abena Serwaa',
    issueDescription: 'Camera optical focus motor calibration',
    repairCenter: 'Kumasi Adum Tech Service Center',
    status: 'repaired',
    dateFiled: '23 Oct 2026'
  }
];
