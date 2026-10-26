import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Boxes,
  Store,
  Users,
  Wallet,
  Settings,
  ShieldCheck,
  ArrowLeft,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
  ExternalLink,
  Trash2,
  Edit3,
  TrendingUp,
  MapPin,
  ChevronRight,
  Phone,
  LogOut,
  Sparkles,
  KeyRound,
  Copy,
  Check,
  RefreshCw,
  FileText,
  DollarSign,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { Product } from '../../types';
import { VendorOrder, ShowroomStockAllocation, VendorPayout, WarrantyClaim } from '../../types/vendor';
import { CustomerOrder } from '../CustomerOrdersPage';
import { AdminUser, AdminCustomer, SystemAuditLog } from '../../types/admin';
import { DEFAULT_ADMIN_CREDENTIALS, INITIAL_ADMIN_CUSTOMERS, INITIAL_AUDIT_LOGS } from '../../data/adminData';
import { AddProductModal } from '../vendor/AddProductModal';
import { Logo } from '../Logo';
import { TechGraphic } from '../TechGraphics';

interface AdminDashboardProps {
  products: Product[];
  vendorOrders: VendorOrder[];
  customerOrders: CustomerOrder[];
  showrooms: ShowroomStockAllocation[];
  payouts: VendorPayout[];
  warrantyClaims: WarrantyClaim[];
  adminUser: AdminUser;
  onUpdateAdminUser?: (user: AdminUser) => void;
  onBackToStorefront: () => void;
  onLogout: () => void;
  onAddProduct: (product: Product) => void;
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: any) => void;
  onTransferStock: (fromId: string, toId: string, amount: number) => void;
  onRequestPayout: (payout: VendorPayout) => void;
  onViewProductOnStorefront: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  vendorOrders,
  customerOrders,
  showrooms,
  payouts,
  warrantyClaims,
  adminUser,
  onUpdateAdminUser,
  onBackToStorefront,
  onLogout,
  onAddProduct,
  onUpdateProductPrice,
  onDeleteProduct,
  onUpdateOrderStatus,
  onTransferStock,
  onRequestPayout,
  onViewProductOnStorefront
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'catalog' | 'orders' | 'showrooms' | 'customers' | 'finance' | 'settings'
  >('overview');

  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('all');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingPriceInput, setEditingPriceInput] = useState<number>(0);

  // Orders Tab filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'processing' | 'dispatched' | 'delivered'>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Stock Transfer State
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferFromHub, setTransferFromHub] = useState('sh-01');
  const [transferToHub, setTransferToHub] = useState('sh-03');
  const [transferAmount, setTransferAmount] = useState(20);
  const [transferSuccessMsg, setTransferSuccessMsg] = useState('');

  // Customers State
  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_ADMIN_CUSTOMERS);
  const [customerSearch, setCustomerSearch] = useState('');

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>(INITIAL_AUDIT_LOGS);

  // Settings State
  const [adminNameInput, setAdminNameInput] = useState(adminUser.name);
  const [adminPhoneInput, setAdminPhoneInput] = useState(adminUser.phone);
  const [adminPasswordInput, setAdminPasswordInput] = useState(DEFAULT_ADMIN_CREDENTIALS.password);
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Payout request modal/form state
  const [payoutAmount, setPayoutAmount] = useState(15000);
  const [payoutChannel, setPayoutChannel] = useState<'MTN MoMo' | 'Telecel Cash' | 'Ghana Interbank (GIP)'>('MTN MoMo');
  const [payoutRecipient, setPayoutRecipient] = useState('024 456 7890 (ApexTech Central Reserve)');
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState('');

  // Calculations
  const totalRevenue = 348750.0 + vendorOrders.reduce((acc, o) => acc + (o.status !== 'cancelled' ? o.totalPrice : 0), 0);
  const activeOrdersCount = vendorOrders.filter(o => o.status === 'processing' || o.status === 'dispatched').length;
  const totalShowroomUnits = showrooms.reduce((sum, s) => sum + s.stockCount, 0);

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.fullName.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedProductCategory === 'all' || p.category === selectedProductCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtered Orders
  const filteredOrders = vendorOrders.filter(o => {
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.productName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.deliveryRegion.toLowerCase().includes(orderSearchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered Customers
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.phone.includes(customerSearch) ||
    c.region.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateAdminUser) {
      onUpdateAdminUser({
        ...adminUser,
        name: adminNameInput,
        phone: adminPhoneInput
      });
    }
    setSettingsSuccessMsg('Administrator profile & security parameters updated successfully');
    setTimeout(() => setSettingsSuccessMsg(''), 4000);
  };

  const handleExecuteTransfer = () => {
    if (transferFromHub === transferToHub) {
      alert('Source and destination hubs must be different');
      return;
    }
    onTransferStock(transferFromHub, transferToHub, transferAmount);
    const fromName = showrooms.find(s => s.branchId === transferFromHub)?.branchName || 'Origin Hub';
    const toName = showrooms.find(s => s.branchId === transferToHub)?.branchName || 'Target Hub';
    
    // Append to audit log
    const newLog: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      action: 'Emergency Stock Rebalancing',
      category: 'inventory',
      actor: `${adminUser.username} (${adminUser.name})`,
      details: `Rebalanced ${transferAmount} device units from ${fromName} to ${toName}`
    };
    setAuditLogs([newLog, ...auditLogs]);

    setTransferSuccessMsg(`Successfully transferred ${transferAmount} units to ${toName}!`);
    setTimeout(() => {
      setTransferSuccessMsg('');
      setTransferModalOpen(false);
    }, 2000);
  };

  const handleCreatePayout = (e: React.FormEvent) => {
    e.preventDefault();
    const newPayout: VendorPayout = {
      id: `pay-${Date.now()}`,
      payoutRef: `PAY-GH-${Math.floor(10000 + Math.random() * 90000)}`,
      amount: payoutAmount,
      channel: payoutChannel,
      recipientNumber: payoutRecipient,
      status: 'processing',
      date: 'Today, Just now'
    };
    onRequestPayout(newPayout);
    setPayoutSuccessMsg(`Disbursement request of GH₵ ${payoutAmount.toLocaleString()} initiated via ${payoutChannel}`);
    setTimeout(() => setPayoutSuccessMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col antialiased">
      {/* 1. Admin Top Console Bar */}
      <header className="bg-gradient-to-r from-[#052d21] via-[#073c2c] to-[#04241a] text-white border-b border-emerald-950/60 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left Brand + Console Badge */}
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <div onClick={onBackToStorefront} className="cursor-pointer shrink-0">
              <Logo />
            </div>
            <div className="h-6 w-px bg-emerald-800/80 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Central Admin Console
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-200/90 font-medium truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="hidden lg:inline">Accra Operations HQ</span>
              </span>
            </div>
          </div>

          {/* Right Admin Controls & Storefront Return */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Quick Add Product */}
            <button
              onClick={() => setAddProductModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              title="Add New Tech Product"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Tech Item</span>
            </button>

            {/* Back to Customer Storefront */}
            <button
              onClick={onBackToStorefront}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
              title="Return to Customer Storefront"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">Storefront</span>
            </button>

            {/* Admin Logout */}
            <button
              onClick={onLogout}
              className="bg-red-600/90 hover:bg-red-700 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
              title="Log Out Administrator"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Admin Workspace (Sidebar + Dynamic Viewport) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-4">
          {/* Admin Identity Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
            <div className="pb-3 border-b border-slate-100 mb-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#073c2c] text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                {adminUser.avatar || 'AD'}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-black text-slate-900 truncate">
                    {adminUser.name}
                  </h4>
                </div>
                <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-200/60">
                  {adminUser.role}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
                { id: 'catalog', label: 'Tech Catalog & SKUs', icon: Boxes, badge: products.length },
                { id: 'orders', label: 'Orders & Express Dispatch', icon: Package, badge: activeOrdersCount },
                { id: 'showrooms', label: 'Ghana Hubs & Stock (28+)', icon: Store },
                { id: 'customers', label: 'Customers Directory', icon: Users, badge: customers.length },
                { id: 'finance', label: 'Finance & MoMo Payouts', icon: Wallet },
                { id: 'settings', label: 'Admin Security & Roles', icon: Settings }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#073c2c] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-1.5 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Default Credentials Summary Callout */}
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                Active Credentials
              </span>
              <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-bold px-1.5 py-0.2 rounded">
                Default
              </span>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-700 bg-white/80 p-2.5 rounded-xl border border-emerald-200/50">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px] uppercase">User:</span>
                <span className="font-bold text-slate-900">{DEFAULT_ADMIN_CREDENTIALS.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px] uppercase">Pass:</span>
                <span className="font-bold text-slate-900">{DEFAULT_ADMIN_CREDENTIALS.password}</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400 uppercase">Email:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[130px]">{DEFAULT_ADMIN_CREDENTIALS.email}</span>
              </div>
            </div>
            <p className="text-[10px] text-emerald-800 leading-tight">
              Pre-authorized for Kwame Nkrumah Circle Flagship Hub administration.
            </p>
          </div>
        </aside>

        {/* Right Active Viewport */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Executive Welcome Banner */}
              <div className="bg-gradient-to-r from-[#073c2c] to-[#04281d] rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm border border-emerald-950">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-emerald-400/30 mb-2">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    ApexTech Ghana Central Operations
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black">
                    Welcome back, {adminUser.name}
                  </h2>
                  <p className="text-xs text-emerald-100/80 mt-1 max-w-xl leading-relaxed">
                    All 28+ Ghana showrooms, live warehouse stock, and express MoMo dispatch corridors are currently fully synchronized.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setAddProductModalOpen(true)}
                    className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-4 py-2.5 rounded-xl font-black text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Tech</span>
                  </button>
                  <button
                    onClick={() => setTransferModalOpen(true)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Rebalance Stock</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Platform Revenue */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Sales (GH₵)</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#073c2c] flex items-center justify-center font-black text-xs">
                      ₵
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-black text-slate-900 tabular-nums">
                      GH₵ {totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+24.8% this month</span>
                    </div>
                  </div>
                </div>

                {/* 2. Active Orders */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Active Orders</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-black text-slate-900 tabular-nums">
                      {vendorOrders.length + customerOrders.length} Orders
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold mt-1">
                      <Truck className="w-3.5 h-3.5" />
                      <span>{activeOrdersCount} out for express delivery</span>
                    </div>
                  </div>
                </div>

                {/* 3. Catalog SKUs */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Active Catalog SKUs</span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Boxes className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-black text-slate-900 tabular-nums">
                      {products.length} Products
                    </span>
                    <div className="text-xs text-slate-500 mt-1">
                      Phones, Laptops, TVs & Appliances
                    </div>
                  </div>
                </div>

                {/* 4. Showroom Units */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Showroom Units</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Store className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-black text-slate-900 tabular-nums">
                      {totalShowroomUnits} Units
                    </span>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">
                      Across 28+ Ghana Showrooms
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Dispatch Grid & Quick Dispatch Table */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2 Cols: Recent Customer Orders Requiring Dispatch */}
                <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-black text-slate-900">Recent Nationwide Orders</h3>
                      <p className="text-xs text-slate-500">Real-time express orders awaiting pickup or rider dispatch</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#073c2c] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({vendorOrders.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                          <th className="pb-2.5">Order No</th>
                          <th className="pb-2.5">Customer & Phone</th>
                          <th className="pb-2.5">Item & Total</th>
                          <th className="pb-2.5">Region</th>
                          <th className="pb-2.5 text-center">Status</th>
                          <th className="pb-2.5 text-right">Quick Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {vendorOrders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                            <td className="py-3">
                              <div className="font-bold text-slate-800">{ord.customerName}</div>
                              <div className="text-[11px] text-slate-500 font-mono">{ord.customerPhone}</div>
                            </td>
                            <td className="py-3">
                              <div className="font-semibold text-slate-800 truncate max-w-[150px]">{ord.productName}</div>
                              <div className="text-[11px] font-bold text-[#073c2c]">GH₵ {ord.totalPrice.toLocaleString()}</div>
                            </td>
                            <td className="py-3 text-slate-600 truncate max-w-[120px]">{ord.deliveryRegion}</td>
                            <td className="py-3 text-center">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                  ord.status === 'delivered'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : ord.status === 'dispatched'
                                    ? 'bg-blue-100 text-blue-800'
                                    : ord.status === 'processing'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {ord.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              {ord.status === 'processing' ? (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'dispatched')}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                                >
                                  Dispatch
                                </button>
                              ) : ord.status === 'dispatched' ? (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                                >
                                  Mark Done
                                </button>
                              ) : (
                                <span className="text-slate-400 text-[10px]">Completed</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 1 Col: Regional Hub Sales Share & System Status */}
                <div className="space-y-4">
                  {/* Regional Breakdown Card */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
                    <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Regional Revenue Share
                    </h3>
                    <div className="space-y-2.5 pt-1 text-xs">
                      {[
                        { region: 'Greater Accra (Circle, Osu, Mall)', share: '58%', color: 'bg-emerald-600', val: 'GH₵ 202,275' },
                        { region: 'Ashanti (Adum, Kejetia, KNUST)', share: '26%', color: 'bg-emerald-500', val: 'GH₵ 90,675' },
                        { region: 'Western (Takoradi Market Circle)', share: '10%', color: 'bg-teal-500', val: 'GH₵ 34,875' },
                        { region: 'Northern & Other Regions', share: '6%', color: 'bg-amber-500', val: 'GH₵ 20,925' }
                      ].map((reg, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-center text-[11px] font-bold">
                            <span className="text-slate-700">{reg.region}</span>
                            <span className="text-slate-900">{reg.share}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className={`h-full ${reg.color} rounded-full`} style={{ width: reg.share }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System Infrastructure Telemetry */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
                    <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Core System Telemetry
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-600">Product Database</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Operational (0.1ms)
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-600">MTN MoMo API</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Connected
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-600">SMS Rider Dispatch</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-600">Admin Clearance</span>
                        <span className="text-purple-700 font-black">
                          {adminUser.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECH CATALOG & SKUs */}
          {activeTab === 'catalog' && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-5 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">ApexTech Store Catalog & Inventory</h3>
                  <p className="text-xs text-slate-500">
                    Live management of {products.length} registered SKUs across smartphones, computers, smart TVs, appliances & accessories
                  </p>
                </div>
                <button
                  onClick={() => setAddProductModalOpen(true)}
                  className="bg-[#073c2c] hover:bg-[#05281d] text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Tech SKU</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by device model, brand, or specifications..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'mobile', label: 'Phones' },
                    { id: 'laptops', label: 'Laptops' },
                    { id: 'tvs', label: 'Smart TVs' },
                    { id: 'appliances', label: 'Appliances' },
                    { id: 'accessories', label: 'Accessories' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedProductCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                        selectedProductCategory === cat.id
                          ? 'bg-[#073c2c] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="pb-3 pl-2">Product & Preview</th>
                      <th className="pb-3">Department</th>
                      <th className="pb-3">Brand</th>
                      <th className="pb-3">Stock Status</th>
                      <th className="pb-3">Retail Price (GH₵)</th>
                      <th className="pb-3 text-right pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                              <TechGraphic type={p.graphicType || p.id} category={p.category} />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">
                                {p.fullName}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                                {p.specs.slice(0, 2).join(' • ')}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="capitalize px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 font-bold text-slate-800">{p.brand}</td>
                        <td className="py-3">
                          <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {p.stockStatus || 'In Stock'}
                          </span>
                        </td>
                        <td className="py-3">
                          {editingProductId === p.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={editingPriceInput}
                                onChange={(e) => setEditingPriceInput(Number(e.target.value))}
                                className="w-24 px-2 py-1 bg-white border border-emerald-500 rounded text-xs font-bold"
                              />
                              <button
                                onClick={() => {
                                  onUpdateProductPrice(p.id, editingPriceInput);
                                  setEditingProductId(null);
                                }}
                                className="bg-[#073c2c] text-white p-1 rounded hover:bg-[#05281d] cursor-pointer"
                                title="Save price"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-900 font-mono">
                                GH₵ {p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingProductId(p.id);
                                  setEditingPriceInput(p.price);
                                }}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded"
                                title="Edit Price"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3 text-right pr-2">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onViewProductOnStorefront(p)}
                              className="p-1.5 text-slate-400 hover:text-[#073c2c] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              title="Preview on Storefront"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to remove "${p.name}" from the store catalog?`)) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS & EXPRESS DISPATCH */}
          {activeTab === 'orders' && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-5 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">Orders & Ghana Express Dispatch</h3>
                  <p className="text-xs text-slate-500">
                    Live delivery tracking and MoMo payment validation across Greater Accra, Kumasi, Takoradi & Tamale
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Status Filter:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold focus:outline-none"
                  >
                    <option value="all">All Statuses ({vendorOrders.length})</option>
                    <option value="processing">Processing</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Order Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  placeholder="Search by order number (FT-GH-...), customer name, or location..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                />
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="pb-3 pl-2">Order #</th>
                      <th className="pb-3">Customer Details</th>
                      <th className="pb-3">Product Ordered</th>
                      <th className="pb-3">Payment & Amount</th>
                      <th className="pb-3">Dispatch Hub</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3 text-right pr-2">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 pl-2 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                        <td className="py-3.5">
                          <div className="font-bold text-slate-800">{ord.customerName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{ord.customerPhone}</div>
                          <div className="text-[10px] text-slate-400">{ord.deliveryRegion}</div>
                        </td>
                        <td className="py-3.5">
                          <div className="font-semibold text-slate-900">{ord.productName}</div>
                          <div className="text-[11px] text-slate-500">Qty: {ord.quantity} unit(s)</div>
                        </td>
                        <td className="py-3.5">
                          <div className="font-bold text-[#073c2c] font-mono">
                            GH₵ {ord.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </div>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3.5 text-slate-600">
                          <div className="font-medium">{ord.dispatchHub}</div>
                          <div className="text-[10px] text-slate-400">{ord.createdAt}</div>
                        </td>
                        <td className="py-3.5 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              ord.status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'dispatched'
                                ? 'bg-blue-100 text-blue-800'
                                : ord.status === 'processing'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right pr-2">
                          <div className="flex items-center justify-end gap-1">
                            {ord.status === 'processing' && (
                              <button
                                onClick={() => onUpdateOrderStatus(ord.id, 'dispatched')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                              >
                                Mark Dispatched
                              </button>
                            )}
                            {ord.status === 'dispatched' && (
                              <button
                                onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                              >
                                Confirm Delivered
                              </button>
                            )}
                            {ord.status === 'delivered' && (
                              <span className="text-emerald-700 text-[11px] font-bold flex items-center gap-1 justify-end">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Fulfilled
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: GHANA SHOWROOMS & STOCK HUBS */}
          {activeTab === 'showrooms' && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-5 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">Showroom Stock & Regional Hubs</h3>
                  <p className="text-xs text-slate-500">
                    Live device units allocated across 28+ verified ApexTech Ghana showrooms
                  </p>
                </div>
                <button
                  onClick={() => setTransferModalOpen(true)}
                  className="bg-[#073c2c] hover:bg-[#05281d] text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-300" />
                  <span>Transfer / Rebalance Stock</span>
                </button>
              </div>

              {/* Showrooms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {showrooms.map((hub) => (
                  <div
                    key={hub.branchId}
                    className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                          {hub.city} Region
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                          {hub.branchName}
                        </h4>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-slate-900 tabular-nums">
                          {hub.stockCount} <span className="text-xs font-bold text-slate-400">units</span>
                        </div>
                        {hub.stockCount <= hub.lowStockThreshold ? (
                          <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1 justify-end">
                            <AlertTriangle className="w-3 h-3" />
                            Low Stock Alert
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 justify-end">
                            <Check className="w-3 h-3" />
                            Healthy Reserve
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>Manager: {hub.managerContact}</span>
                      </div>
                      <button
                        onClick={() => {
                          setTransferToHub(hub.branchId);
                          setTransferModalOpen(true);
                        }}
                        className="text-xs font-bold text-[#073c2c] hover:underline cursor-pointer"
                      >
                        Replenish +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMERS DIRECTORY */}
          {activeTab === 'customers' && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-5 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">Registered Customer Directory</h3>
                  <p className="text-xs text-slate-500">
                    Client records, verified contact information and cumulative purchase history
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-500">
                  Total Clients: <span className="text-slate-900 font-black">{customers.length}</span>
                </div>
              </div>

              {/* Customer Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Search customer by name, email, phone number, or region..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                />
              </div>

              {/* Customers Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="pb-3 pl-2">Customer Name</th>
                      <th className="pb-3">Contact Email & Phone</th>
                      <th className="pb-3">Delivery Region</th>
                      <th className="pb-3">Orders Completed</th>
                      <th className="pb-3">Total Spend (GH₵)</th>
                      <th className="pb-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCustomers.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 pl-2 font-bold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#073c2c] flex items-center justify-center font-bold text-xs">
                              {c.name.charAt(0)}
                            </div>
                            <span>{c.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <div className="text-slate-800 font-medium">{c.email}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{c.phone}</div>
                        </td>
                        <td className="py-3.5 text-slate-600">{c.region}</td>
                        <td className="py-3.5 font-bold text-slate-800">{c.ordersCount} orders</td>
                        <td className="py-3.5 font-mono font-black text-[#073c2c]">
                          GH₵ {c.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              c.status === 'vip'
                                ? 'bg-purple-100 text-purple-800'
                                : c.status === 'verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: FINANCE & MOMO PAYOUTS */}
          {activeTab === 'finance' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Finance & Mobile Money Settlements</h3>
                    <p className="text-xs text-slate-500">
                      Automated disbursement to MTN MoMo, Telecel Cash & GCB Ghana Interbank
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Settled Reserve</span>
                    <div className="text-xl font-black text-emerald-700 font-mono">
                      GH₵ 110,200.00
                    </div>
                  </div>
                </div>

                {/* Form to Request Settlement */}
                <form onSubmit={handleCreatePayout} className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-700">
                    Initiate Disbursement Transfer
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Amount (GH₵)
                      </label>
                      <input
                        type="number"
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(Number(e.target.value))}
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Settlement Channel
                      </label>
                      <select
                        value={payoutChannel}
                        onChange={(e) => setPayoutChannel(e.target.value as any)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                      >
                        <option value="MTN MoMo">MTN MoMo Gateway</option>
                        <option value="Telecel Cash">Telecel Cash Merchant</option>
                        <option value="Ghana Interbank (GIP)">Ghana Interbank (GIP)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Recipient Account / Number
                      </label>
                      <input
                        type="text"
                        value={payoutRecipient}
                        onChange={(e) => setPayoutRecipient(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  {payoutSuccessMsg && (
                    <div className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                      {payoutSuccessMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="bg-[#073c2c] hover:bg-[#05281d] text-white px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-colors"
                  >
                    Process Disbursement
                  </button>
                </form>

                {/* Historical Settlements Table */}
                <div className="pt-2">
                  <h4 className="text-xs font-black uppercase text-slate-500 mb-2.5">
                    Settlement History
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                          <th className="pb-3">Reference #</th>
                          <th className="pb-3">Amount (GH₵)</th>
                          <th className="pb-3">Channel</th>
                          <th className="pb-3">Recipient Details</th>
                          <th className="pb-3">Timestamp</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {payouts.map((pay) => (
                          <tr key={pay.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 font-mono font-bold text-slate-900">{pay.payoutRef}</td>
                            <td className="py-3 font-mono font-black text-[#073c2c]">
                              GH₵ {pay.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-3 font-medium text-slate-800">{pay.channel}</td>
                            <td className="py-3 text-slate-600 font-mono text-[11px]">{pay.recipientNumber}</td>
                            <td className="py-3 text-slate-500">{pay.date}</td>
                            <td className="py-3 text-right">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                                {pay.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ADMIN SECURITY, ROLES & DEFAULT CREDENTIALS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Highlighted Default Credentials Card */}
              <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 border-2 border-emerald-300 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-200/80">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-[#073c2c] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                      <KeyRound className="w-3.5 h-3.5 text-emerald-300" />
                      Default System Credentials
                    </div>
                    <h3 className="text-lg font-black text-slate-900">
                      Standard Administrator Access Credentials
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      These are the pre-configured administrator credentials built directly into ApexTech Ghana:
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-900 font-black px-3 py-1.5 rounded-xl border border-emerald-300 shrink-0 self-start sm:self-auto">
                    Role: {DEFAULT_ADMIN_CREDENTIALS.role}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
                  {/* Default Username */}
                  <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-2xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Default Username
                      </span>
                      <div className="text-base font-black font-mono text-slate-900 mt-1">
                        {DEFAULT_ADMIN_CREDENTIALS.username}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        (also accepts '{DEFAULT_ADMIN_CREDENTIALS.altUsername}')
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(DEFAULT_ADMIN_CREDENTIALS.username, 'sett-user')}
                      className="mt-3 w-full py-1.5 px-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'sett-user' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied Username</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Username</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Default Email */}
                  <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-2xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Default Admin Email
                      </span>
                      <div className="text-sm font-black font-mono text-slate-900 mt-1 break-all">
                        {DEFAULT_ADMIN_CREDENTIALS.email}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        Official Ghana Operations Domain
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(DEFAULT_ADMIN_CREDENTIALS.email, 'sett-email')}
                      className="mt-3 w-full py-1.5 px-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'sett-email' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied Email</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Default Password */}
                  <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-2xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Default Password
                      </span>
                      <div className="text-base font-black font-mono text-slate-900 mt-1">
                        {DEFAULT_ADMIN_CREDENTIALS.password}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        Encrypted SHA-256 Auth Shield
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(DEFAULT_ADMIN_CREDENTIALS.password, 'sett-pass')}
                      className="mt-3 w-full py-1.5 px-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'sett-pass' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied Password</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Edit Admin Profile Parameters */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
                <h3 className="text-base font-black text-slate-900">Administrator Profile Parameters</h3>
                <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                      Administrator Display Name
                    </label>
                    <input
                      type="text"
                      value={adminNameInput}
                      onChange={(e) => setAdminNameInput(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                      Operations Hotline Phone
                    </label>
                    <input
                      type="text"
                      value={adminPhoneInput}
                      onChange={(e) => setAdminPhoneInput(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                      Assigned Regional Operations Hub
                    </label>
                    <input
                      type="text"
                      value={adminUser.assignedHub}
                      disabled
                      className="w-full px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  {settingsSuccessMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{settingsSuccessMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="bg-[#073c2c] hover:bg-[#05281d] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-colors cursor-pointer"
                  >
                    Save Administrator Profile
                  </button>
                </form>
              </div>

              {/* System Audit Trail */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-black text-slate-900">System Security & Audit Trail</h3>
                    <p className="text-xs text-slate-500">Immutable ledger of administrative actions across Ghana hubs</p>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded-md">
                    Live Logging
                  </span>
                </div>

                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">{log.action}</span>
                          <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                            {log.category}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5">{log.details}</p>
                        <span className="text-[10px] text-slate-400 font-mono">By: {log.actor}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap self-start sm:self-center">
                        {log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Rebalance Stock Modal */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Rebalance Showroom Stock</h3>
              <button
                onClick={() => setTransferModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Transfer device units between regional logistics hubs to prevent stockouts.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Source Hub (From)
                </label>
                <select
                  value={transferFromHub}
                  onChange={(e) => setTransferFromHub(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  {showrooms.map((s) => (
                    <option key={s.branchId} value={s.branchId}>
                      {s.branchName} ({s.stockCount} units)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Target Showroom (To)
                </label>
                <select
                  value={transferToHub}
                  onChange={(e) => setTransferToHub(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  {showrooms.map((s) => (
                    <option key={s.branchId} value={s.branchId}>
                      {s.branchName} ({s.stockCount} units)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Quantity to Transfer
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              {transferSuccessMsg && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
                  {transferSuccessMsg}
                </div>
              )}

              <button
                type="button"
                onClick={handleExecuteTransfer}
                className="w-full bg-[#073c2c] hover:bg-[#05281d] text-white py-2.5 rounded-xl text-xs font-black cursor-pointer transition-colors"
              >
                Confirm Stock Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={addProductModalOpen}
        onClose={() => setAddProductModalOpen(false)}
        onAddProduct={onAddProduct}
      />
    </div>
  );
};
