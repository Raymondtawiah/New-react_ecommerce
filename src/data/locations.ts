export interface RetailLocation {
  id: string;
  name: string;
  city: string;
  region: 'Greater Accra' | 'Ashanti Region' | 'Western & Central' | 'Northern & Eastern';
  address: string;
  landmark: string;
  phone: string;
  altPhone?: string;
  whatsapp: string;
  hours: string;
  isFlagship?: boolean;
  hasServiceCenter?: boolean;
  hasExpressPickup?: boolean;
}

export const CORPORATE_INFO = {
  name: 'ApexTech Ghana Limited',
  tagline: "Ghana's Certified Tech & Mobile Device Retailer",
  rcNumber: 'RC-GH-820194',
  tin: 'C0029481028',
  headOffice: {
    building: 'Apex Central Towers, Level 3 & 4',
    street: 'Plot 14 Commercial Avenue, Graphic Road / Ring Road South',
    city: 'Industrial Area, Accra',
    country: 'Ghana'
  },
  phones: {
    hotline1: '030 222 5651',
    hotline2: '030 222 5652',
    tollFree: '0800 120 400',
    whatsapp: '050 360 7980'
  },
  emails: {
    support: 'support@apextechghana.com',
    orders: 'orders@apextechghana.com',
    corporate: 'b2b@apextechghana.com',
    warranty: 'service@apextechghana.com'
  },
  hours: {
    weekdays: 'Monday – Saturday: 8:00 AM – 7:30 PM',
    sunday: 'Sunday: 11:30 AM – 5:30 PM (Selected Flagship Hubs)',
    supportDesk: '24/7 Priority WhatsApp & Online Ticket Desk'
  },
  delivery: {
    sameDay: 'Same-Day Express Dispatch in Greater Accra & Kumasi (Orders before 2:00 PM)',
    nationwide: '24-48 Hours Express Waybill to all 16 Regions via VIP Express, FedEx & Apex Couriers',
    pickup: 'Free 15-Minute Click & Collect at all 35 Showrooms'
  }
};

export const RETAIL_LOCATIONS: RetailLocation[] = [
  // ================= GREATER ACCRA (10 Locations) =================
  {
    id: 'acc-circle',
    name: 'Kwame Nkrumah Circle Flagship',
    city: 'Accra',
    region: 'Greater Accra',
    address: 'Apex Plaza, Plot 12 Ring Road Central',
    landmark: 'Opposite Tip Toe Lane & VIP Bus Terminal',
    phone: '030 222 5651',
    altPhone: '030 222 5652',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 7:30 PM | Sun: 12:00 PM - 5:30 PM',
    isFlagship: true,
    hasServiceCenter: true,
    hasExpressPickup: true
  },
  {
    id: 'acc-osu',
    name: 'Osu Oxford Street Showroom',
    city: 'Accra',
    region: 'Greater Accra',
    address: 'Cantonments Road, Oxford Street',
    landmark: 'Adjacent TotalEnergies Station & Shoprite',
    phone: '030 277 8910',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:30 AM - 8:00 PM | Sun: 1:00 PM - 6:00 PM',
    isFlagship: true,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'acc-east-legon',
    name: 'East Legon Tech Lounge',
    city: 'Accra',
    region: 'Greater Accra',
    address: 'Lagos Avenue, Block B Commercial',
    landmark: 'Near American House Junction & A&C Corner',
    phone: '030 254 3112',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:30 AM - 8:00 PM',
    isFlagship: false,
    hasServiceCenter: true,
    hasExpressPickup: true
  },
  {
    id: 'acc-madina',
    name: 'Madina Commercial Hub',
    city: 'Accra',
    region: 'Greater Accra',
    address: 'Old Road Commercial Center',
    landmark: 'Near Madina Zongo Junction & Market Footbridge',
    phone: '030 250 8740',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'acc-spintex',
    name: 'Spintex Road Mega Store',
    city: 'Accra',
    region: 'Greater Accra',
    address: 'Baatsona Highway Commercial Complex',
    landmark: 'Near Texpo Junction & Coastal Bus Stop',
    phone: '030 281 2940',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 7:30 PM | Sun: 12:00 PM - 5:00 PM',
    isFlagship: true,
    hasServiceCenter: true,
    hasExpressPickup: true
  },
  {
    id: 'acc-kaneshie',
    name: 'Kaneshie Commercial Arcade',
    city: 'Accra',
    region: 'Greater Accra',
    address: 'First Light Commercial Arcade, Winneba Road',
    landmark: 'Near Kaneshie Complex & Central Footbridge',
    phone: '030 223 1180',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'acc-tema',
    name: 'Tema Community 1 Central',
    city: 'Tema',
    region: 'Greater Accra',
    address: 'Market Commercial Square, Post Office Road',
    landmark: 'Opposite Tema Central Post Office',
    phone: '030 320 6710',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    isFlagship: false,
    hasServiceCenter: true,
    hasExpressPickup: true
  },
  {
    id: 'acc-lapaz',
    name: 'Lapaz Motorway Junction Hub',
    city: 'Accra',
    region: 'Greater Accra',
    address: 'George Walker Bush Motorway Highway',
    landmark: 'Adjacent Nyamekye Junction & Las Palmas',
    phone: '030 240 5512',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 7:30 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'acc-dansoman',
    name: 'Dansoman High Street',
    city: 'Accra',
    region: 'Greater Accra',
    address: 'Dansoman High Street, Near Sahara',
    landmark: 'Close to Dansoman Roundabout & Commercial Bank',
    phone: '030 231 4490',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:30 AM - 7:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },

  // ================= ASHANTI REGION / KUMASI (6 Locations) =================
  {
    id: 'ksi-adum',
    name: 'Adum Kumasi Regional Flagship',
    city: 'Kumasi',
    region: 'Ashanti Region',
    address: 'Prempeh II Street, Central Commercial District',
    landmark: 'Directly Opposite Kumasi General Post Office (GPO)',
    phone: '032 203 4410',
    altPhone: '032 203 4411',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    isFlagship: true,
    hasServiceCenter: true,
    hasExpressPickup: true
  },
  {
    id: 'ksi-kejetia',
    name: 'Kejetia Market Terminal Hub',
    city: 'Kumasi',
    region: 'Ashanti Region',
    address: 'New Kejetia Market Complex, Block C-14',
    landmark: 'Ground Floor Main Terminal Entry',
    phone: '032 204 1220',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 7:30 AM - 7:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'ksi-bantama',
    name: 'Bantama High Street Store',
    city: 'Kumasi',
    region: 'Ashanti Region',
    address: 'Bantama High Street Commercial Plaza',
    landmark: 'Near Cultural Centre & Bantama Market Junction',
    phone: '032 208 9340',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'ksi-knust',
    name: 'KNUST Tech Junction Outlet',
    city: 'Kumasi',
    region: 'Ashanti Region',
    address: 'Commercial Strip, Tech Junction',
    landmark: 'Adjacent Commercial Bank & KNUST Main Gate',
    phone: '032 206 5120',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 7:30 PM',
    isFlagship: false,
    hasServiceCenter: true,
    hasExpressPickup: true
  },
  {
    id: 'ksi-suame',
    name: 'Suame Roundabout Center',
    city: 'Kumasi',
    region: 'Ashanti Region',
    address: 'Off Offinso Road Commercial Center',
    landmark: 'Near Suame Roundabout & Shell Station',
    phone: '032 202 3311',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:30 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'ksi-asafo',
    name: 'Asafo VIP Interchange Branch',
    city: 'Kumasi',
    region: 'Ashanti Region',
    address: 'Asafo Commercial Complex, Near VIP Terminal',
    landmark: 'Opposite Asafo Market Bus Terminal',
    phone: '032 201 8890',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 7:30 AM - 7:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },

  // ================= WESTERN & CENTRAL (5 Locations) =================
  {
    id: 'wst-takoradi-circle',
    name: 'Takoradi Market Circle Flagship',
    city: 'Takoradi',
    region: 'Western & Central',
    address: 'Collins Avenue, Commercial Strip',
    landmark: 'Near Market Circle Commercial Area & Standard Bank',
    phone: '031 202 8820',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:30 PM',
    isFlagship: true,
    hasServiceCenter: true,
    hasExpressPickup: true
  },
  {
    id: 'wst-cape-coast',
    name: 'Cape Coast Kotokuraba Hub',
    city: 'Cape Coast',
    region: 'Western & Central',
    address: 'Commercial Street, Kotokuraba Junction',
    landmark: 'Directly Opposite Kotokuraba Market Terminal',
    phone: '033 213 4560',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:30 PM',
    isFlagship: true,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'wst-tarkwa',
    name: 'Tarkwa Commercial Center',
    city: 'Tarkwa',
    region: 'Western & Central',
    address: 'Main Lorry Station Road, Commercial Strip',
    landmark: 'Near Tarkwa Mining Hub & Post Office',
    phone: '031 232 0910',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:30 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'wst-mankessim',
    name: 'Mankessim Market Strip',
    city: 'Mankessim',
    region: 'Western & Central',
    address: 'Saltpond Road Commercial Junction',
    landmark: 'Near Mankessim Central Roundabout',
    phone: '033 209 1140',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },

  // ================= NORTHERN & EASTERN (7 Locations) =================
  {
    id: 'nth-tamale',
    name: 'Tamale Central Commercial Flagship',
    city: 'Tamale',
    region: 'Northern & Eastern',
    address: 'Bolgatanga Road, Commercial Square',
    landmark: 'Near Tamale Central Market & ADB Bank',
    phone: '037 202 1140',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:30 PM',
    isFlagship: true,
    hasServiceCenter: true,
    hasExpressPickup: true
  },
  {
    id: 'nth-sunyani',
    name: 'Sunyani Post Office Square',
    city: 'Sunyani',
    region: 'Northern & Eastern',
    address: 'Central Commercial Boulevard',
    landmark: 'Opposite Sunyani General Post Office',
    phone: '035 202 7330',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:30 PM',
    isFlagship: true,
    hasServiceCenter: true,
    hasExpressPickup: true
  },
  {
    id: 'nth-koforidua',
    name: 'Koforidua Central Market Hub',
    city: 'Koforidua',
    region: 'Northern & Eastern',
    address: 'Central Market Bypass, Commercial Area',
    landmark: 'Opposite Standard Chartered & Jackson Park',
    phone: '034 202 1990',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:30 PM',
    isFlagship: true,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'nth-techiman',
    name: 'Techiman Central Market Road',
    city: 'Techiman',
    region: 'Northern & Eastern',
    address: 'Central Market Commercial Arcade',
    landmark: 'Near Techiman VIP Station & Market Gate',
    phone: '035 252 2110',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 7:30 AM - 6:30 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'nth-ho',
    name: 'Ho Central Civic Centre Hub',
    city: 'Ho',
    region: 'Northern & Eastern',
    address: 'Central Market Road Commercial Street',
    landmark: 'Opposite Ho Civic Centre & Municipal Library',
    phone: '036 202 4430',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'nth-bolga',
    name: 'Bolgatanga Commercial Strip',
    city: 'Bolgatanga',
    region: 'Northern & Eastern',
    address: 'Commercial Street, Near Central Market',
    landmark: 'Adjacent Commercial Bank Bolga',
    phone: '038 202 2270',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  },
  {
    id: 'nth-wa',
    name: 'Wa Central Station Hub',
    city: 'Wa',
    region: 'Northern & Eastern',
    address: 'Commercial Area, Near Central Lorry Station',
    landmark: 'Upper West Regional Dispatch Point',
    phone: '039 202 1150',
    whatsapp: '050 360 7980',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    isFlagship: false,
    hasServiceCenter: false,
    hasExpressPickup: true
  }
];

export const REGION_TABS = [
  { id: 'all', label: 'All Showrooms', count: RETAIL_LOCATIONS.length },
  { id: 'Greater Accra', label: 'Greater Accra', count: 9 },
  { id: 'Ashanti Region', label: 'Kumasi & Ashanti', count: 6 },
  { id: 'Western & Central', label: 'Western & Central', count: 4 },
  { id: 'Northern & Eastern', label: 'Northern & Eastern', count: 7 }
] as const;
