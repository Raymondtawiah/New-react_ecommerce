import { Product } from './index';
import { VendorOrder, ShowroomStockAllocation, VendorPayout, WarrantyClaim } from './vendor';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'Super Administrator' | 'Logistics Dispatcher' | 'Regional Hub Manager' | 'Inventory Controller';
  avatar?: string;
  phone: string;
  assignedHub: string;
  lastLogin: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: 'active' | 'vip' | 'verified';
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  action: string;
  category: 'inventory' | 'orders' | 'security' | 'financial' | 'system';
  actor: string;
  details: string;
}
