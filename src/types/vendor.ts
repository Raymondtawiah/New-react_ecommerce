export interface VendorOrder {
  id: string;
  orderNumber: string; // e.g. "FT-GH-89421"
  customerName: string;
  customerPhone: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: 'MTN MoMo' | 'Telecel Cash' | 'Card' | 'Cash on Delivery';
  deliveryRegion: string;
  status: 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
  createdAt: string;
  dispatchHub: string;
}

export interface ShowroomStockAllocation {
  branchId: string;
  city: string;
  branchName: string;
  stockCount: number;
  lowStockThreshold: number;
  managerContact: string;
}

export interface VendorPayout {
  id: string;
  payoutRef: string;
  amount: number;
  channel: 'MTN MoMo' | 'Telecel Cash' | 'Ghana Interbank (GIP)';
  recipientNumber: string;
  status: 'completed' | 'processing' | 'failed';
  date: string;
}

export interface WarrantyClaim {
  id: string;
  claimId: string;
  deviceModel: string;
  imei: string;
  customerName: string;
  issueDescription: string;
  repairCenter: string;
  status: 'diagnosing' | 'parts_ordered' | 'repaired' | 'ready_for_pickup';
  dateFiled: string;
}
