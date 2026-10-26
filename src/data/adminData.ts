import { AdminUser, AdminCustomer, SystemAuditLog } from '../types/admin';

export const DEFAULT_ADMIN_CREDENTIALS = {
  username: 'admin',
  altUsername: 'apex_admin',
  email: 'admin@apextechghana.com',
  password: 'Admin@Apex2025!',
  name: 'Kwame Mensah-Bediako',
  role: 'Super Administrator' as const,
  phone: '+233 24 456 7890',
  assignedHub: 'Accra Central Operations & Dispatch Hub'
};

export const INITIAL_ADMIN_PROFILE: AdminUser = {
  id: 'adm-001',
  username: DEFAULT_ADMIN_CREDENTIALS.username,
  email: DEFAULT_ADMIN_CREDENTIALS.email,
  name: DEFAULT_ADMIN_CREDENTIALS.name,
  role: DEFAULT_ADMIN_CREDENTIALS.role,
  phone: DEFAULT_ADMIN_CREDENTIALS.phone,
  assignedHub: DEFAULT_ADMIN_CREDENTIALS.assignedHub,
  avatar: 'KM',
  lastLogin: 'Just now (Accra Headquarters Console)'
};

export const INITIAL_ADMIN_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'cust-01',
    name: 'Raymond Tawiah',
    email: 'raymond.tawiah@gmail.com',
    phone: '024 456 7890',
    region: 'East Legon, Greater Accra',
    ordersCount: 4,
    totalSpent: 8740.0,
    joinedDate: 'Jan 2026',
    status: 'vip'
  },
  {
    id: 'cust-02',
    name: 'Akosua Mensah',
    email: 'akosua.mensah@yahoo.com',
    phone: '020 819 4432',
    region: 'Ahodwo, Kumasi',
    ordersCount: 2,
    totalSpent: 4440.0,
    joinedDate: 'Feb 2026',
    status: 'verified'
  },
  {
    id: 'cust-03',
    name: 'Emmanuel Ofori',
    email: 'e.ofori@outlook.com',
    phone: '054 332 9918',
    region: 'Airport Residential, Accra',
    ordersCount: 3,
    totalSpent: 16800.0,
    joinedDate: 'Mar 2026',
    status: 'vip'
  },
  {
    id: 'cust-04',
    name: 'Grace Antwi',
    email: 'grace.antwi99@gmail.com',
    phone: '027 761 0023',
    region: 'Market Circle, Takoradi',
    ordersCount: 1,
    totalSpent: 4300.0,
    joinedDate: 'Jun 2026',
    status: 'active'
  },
  {
    id: 'cust-05',
    name: 'Mohammed Alhassan',
    email: 'm.alhassan@tamale.gh',
    phone: '024 119 7782',
    region: 'Central Commercial Area, Tamale',
    ordersCount: 2,
    totalSpent: 3749.0,
    joinedDate: 'Aug 2026',
    status: 'verified'
  },
  {
    id: 'cust-06',
    name: 'Derrick Boateng',
    email: 'derrick.b@icloud.com',
    phone: '055 901 3342',
    region: 'Spintex Road, Accra',
    ordersCount: 3,
    totalSpent: 7899.0,
    joinedDate: 'Sep 2026',
    status: 'active'
  }
];

export const INITIAL_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'log-01',
    timestamp: 'Today, 11:05 AM',
    action: 'Stock Allocation Rebalanced',
    category: 'inventory',
    actor: 'admin (Kwame Mensah-Bediako)',
    details: 'Transferred 25 units of Samsung Galaxy A08 from Accra Circle Hub to Adum Kumasi Showroom'
  },
  {
    id: 'log-02',
    timestamp: 'Today, 10:48 AM',
    action: 'Order Dispatched to Courier',
    category: 'orders',
    actor: 'Dispatch Desk (Kofi Mensah)',
    details: 'Order FT-GH-948210 assigned to rider Kofi Mensah (024 411 9872) for East Legon delivery'
  },
  {
    id: 'log-03',
    timestamp: 'Today, 09:30 AM',
    action: 'Administrator Authentication',
    category: 'security',
    actor: 'admin@apextechghana.com',
    details: 'Super Admin session initiated from Central Operations HQ (IP: 154.160.22.4 - Accra)'
  },
  {
    id: 'log-04',
    timestamp: 'Yesterday, 04:15 PM',
    action: 'Product Catalog Price Update',
    category: 'inventory',
    actor: 'admin (Kwame Mensah-Bediako)',
    details: 'Updated price for iPhone 15 128GB from GH₵ 11,800.00 to GH₵ 11,499.00 (-GH₵ 301 promo discount)'
  },
  {
    id: 'log-05',
    timestamp: '24 Oct 2026, 03:30 PM',
    action: 'Financial Settlement Processed',
    category: 'financial',
    actor: 'Finance Director (MTN MoMo Gateway)',
    details: 'Automated disbursement PAY-GH-78401 of GH₵ 35,000.00 completed successfully'
  }
];
