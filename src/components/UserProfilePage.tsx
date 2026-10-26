import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Package, 
  Heart, 
  CreditCard, 
  Bell, 
  Lock, 
  CheckCircle2, 
  Edit3, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  Smartphone, 
  Laptop, 
  Award, 
  Camera, 
  Check, 
  RefreshCw, 
  KeyRound,
  ExternalLink
} from 'lucide-react';

interface DeliveryAddress {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  region: string;
  digitalAddress: string; // GhanaPost GPS
  street: string;
  landmark: string;
  isDefault: boolean;
}

interface PaymentWallet {
  id: string;
  type: 'MTN MoMo' | 'Telecel Cash' | 'Bank Card' | 'Cash on Delivery';
  title: string;
  accountNumber: string;
  holderName: string;
  isDefault: boolean;
}

interface RegisteredDevice {
  id: string;
  deviceName: string;
  category: 'phone' | 'laptop' | 'tv';
  serialImei: string;
  purchaseDate: string;
  warrantyExpiry: string;
  status: 'active' | 'expiring-soon' | 'expired';
}

interface UserProfilePageProps {
  onBackToStore: () => void;
  onNavigateOrders: () => void;
  onNavigateWishlist: () => void;
  ordersCount?: number;
  wishlistCount?: number;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  onBackToStore,
  onNavigateOrders,
  onNavigateWishlist,
  ordersCount = 2,
  wishlistCount = 2
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'addresses' | 'payments' | 'devices' | 'security'>('personal');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // User Profile Data
  const [profile, setProfile] = useState({
    firstName: 'Raymond',
    lastName: 'Tawiah',
    email: 'raymondtawiah23@gmail.com',
    phone: '+233 24 456 7890',
    whatsapp: '+233 50 360 7980',
    gender: 'Male',
    birthDate: '1995-08-14',
    preferredDispatchHub: 'Kwame Nkrumah Circle Flagship Hub',
    membershipTier: 'Franko Platinum Tech VIP',
    loyaltyPoints: 1480,
    avatarUrl: ''
  });

  // Delivery Addresses State
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([
    {
      id: 'addr-1',
      label: 'Home (Primary)',
      recipientName: 'Raymond Tawiah',
      phone: '024 456 7890',
      region: 'Greater Accra',
      digitalAddress: 'GA-183-9024',
      street: 'Plot 14, East Legon Residential',
      landmark: 'Near American House Junction',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Office / Corporate Work',
      recipientName: 'Raymond Tawiah',
      phone: '050 360 7980',
      region: 'Greater Accra',
      digitalAddress: 'GA-052-1982',
      street: 'Ridge Commercial Towers, Floor 4',
      landmark: 'Opposite National Theatre',
      isDefault: false
    },
    {
      id: 'addr-3',
      label: 'Kumasi Residence',
      recipientName: 'Raymond Tawiah (Family)',
      phone: '024 456 7890',
      region: 'Ashanti Region',
      digitalAddress: 'AK-039-4410',
      street: 'House 22, Ahodwo Roundabout',
      landmark: 'Behind Golden Tulip Kumasi',
      isDefault: false
    }
  ]);

  // Payment Wallets State
  const [wallets, setWallets] = useState<PaymentWallet[]>([
    {
      id: 'w-1',
      type: 'MTN MoMo',
      title: 'MTN Mobile Money Primary',
      accountNumber: '024 456 7890',
      holderName: 'RAYMOND TAWIAH',
      isDefault: true
    },
    {
      id: 'w-2',
      type: 'Telecel Cash',
      title: 'Telecel Cash Wallet',
      accountNumber: '050 360 7980',
      holderName: 'RAYMOND TAWIAH',
      isDefault: false
    },
    {
      id: 'w-3',
      type: 'Bank Card',
      title: 'Stanbic Bank Ghana Visa Debit',
      accountNumber: '•••• •••• •••• 4821',
      holderName: 'RAYMOND TAWIAH',
      isDefault: false
    }
  ]);

  // Registered Tech Devices under Franko Warranty
  const [devices, setDevices] = useState<RegisteredDevice[]>([
    {
      id: 'dev-1',
      deviceName: 'Samsung Galaxy S24 Ultra (256GB Titanium)',
      category: 'phone',
      serialImei: '358921102948210',
      purchaseDate: '15 Jan 2024',
      warrantyExpiry: '15 Jan 2026 (24 Months Franko Seal)',
      status: 'active'
    },
    {
      id: 'dev-2',
      deviceName: 'Apple MacBook Air M3 (16GB / 512GB Midnight)',
      category: 'laptop',
      serialImei: 'C02G948KL01',
      purchaseDate: '02 Mar 2024',
      warrantyExpiry: '02 Mar 2025 (Official Apple Care)',
      status: 'active'
    }
  ]);

  // Security & Notification Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    smsDispatchAlerts: true,
    whatsappTrackingUpdates: true,
    dealsNewsletter: true
  });

  // Modal for adding address
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Home',
    recipientName: profile.firstName + ' ' + profile.lastName,
    phone: profile.phone,
    region: 'Greater Accra',
    digitalAddress: '',
    street: '',
    landmark: ''
  });

  // Modal for registering new tech
  const [showRegisterTechModal, setShowRegisterTechModal] = useState(false);
  const [newTech, setNewTech] = useState({
    deviceName: '',
    category: 'phone' as 'phone' | 'laptop' | 'tv',
    serialImei: '',
    purchaseDate: 'Today'
  });

  const notifySave = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    notifySave('Profile details updated successfully!');
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    notifySave('Default delivery address updated!');
  };

  const handleDeleteAddress = (id: string) => {
    if (addresses.length <= 1) {
      alert('You must have at least one delivery address.');
      return;
    }
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    notifySave('Address removed.');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.digitalAddress) {
      alert('Please provide street name and GhanaPost digital address.');
      return;
    }
    const newEntry: DeliveryAddress = {
      id: `addr-${Date.now()}`,
      label: newAddr.label,
      recipientName: newAddr.recipientName,
      phone: newAddr.phone,
      region: newAddr.region,
      digitalAddress: newAddr.digitalAddress.toUpperCase(),
      street: newAddr.street,
      landmark: newAddr.landmark,
      isDefault: addresses.length === 0
    };
    setAddresses((prev) => [...prev, newEntry]);
    setShowAddAddressModal(false);
    notifySave('New delivery address added successfully!');
  };

  const handleRegisterDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTech.deviceName || !newTech.serialImei) {
      alert('Please fill in product name and IMEI / Serial Number.');
      return;
    }
    const newEntry: RegisteredDevice = {
      id: `dev-${Date.now()}`,
      deviceName: newTech.deviceName,
      category: newTech.category,
      serialImei: newTech.serialImei,
      purchaseDate: newTech.purchaseDate,
      warrantyExpiry: '24 Months Franko Guaranteed Warranty',
      status: 'active'
    };
    setDevices((prev) => [newEntry, ...prev]);
    setShowRegisterTechModal(false);
    notifySave('Tech device registered for official warranty!');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Toast Notification */}
      {saveSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#073c2c] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-[#03261a] via-[#073c2c] to-[#044e39] text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/50 shadow-md">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <button
              onClick={onBackToStore}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-200 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Tech Store</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-900/60 px-2.5 py-1 rounded-full border border-emerald-700/60 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Customer Profile</span>
              </span>
            </div>
          </div>

          {/* User Hero Identity Card */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Avatar with Initials or photo */}
              <div className="relative group shrink-0">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl border-2 border-white/20 select-none">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </div>
                <button 
                  onClick={() => notifySave('Avatar upload prompt opened.')}
                  className="absolute -bottom-1 -right-1 bg-white text-slate-800 p-1.5 rounded-full shadow-md hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Change profile avatar"
                >
                  <Camera className="w-3.5 h-3.5 text-slate-700" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-white">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <Award className="w-3 h-3" />
                    <span>{profile.membershipTier}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-emerald-100/90 font-medium">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{profile.email}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{profile.phone}</span>
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-emerald-200/80 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Preferred Hub: <strong>{profile.preferredDispatchHub}</strong></span>
                </div>
              </div>
            </div>

            {/* Loyalty & Rewards Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-4 shrink-0 sm:self-start md:self-center shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-200 tracking-wider">Franko Rewards</span>
                <div className="text-lg font-black text-white">
                  {profile.loyaltyPoints.toLocaleString()} Points
                </div>
                <span className="text-[11px] text-emerald-200">
                  Worth <strong>GH₵ {(profile.loyaltyPoints / 10).toFixed(2)}</strong> store credit
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stat Counters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <button
              onClick={onNavigateOrders}
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-3.5 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-emerald-300 mb-1">
                <Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="text-lg font-black text-white">{ordersCount} Active</div>
              <span className="text-[11px] text-emerald-100/80">Customer Orders</span>
            </button>

            <button
              onClick={onNavigateWishlist}
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-3.5 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-rose-300 mb-1">
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="text-lg font-black text-white">{wishlistCount} Saved</div>
              <span className="text-[11px] text-emerald-100/80">Saved Tech Items</span>
            </button>

            <div 
              onClick={() => setActiveTab('devices')}
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-3.5 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-blue-300 mb-1">
                <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="text-lg font-black text-white">{devices.length} Devices</div>
              <span className="text-[11px] text-emerald-100/80">Under Warranty</span>
            </div>

            <div 
              onClick={() => setActiveTab('addresses')}
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-3.5 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-teal-300 mb-1">
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="text-lg font-black text-white">{addresses.length} Addresses</div>
              <span className="text-[11px] text-emerald-100/80">Ghana Dispatch Hubs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Tabs & Body Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Navigation Tab Bar */}
          <div className="flex items-center gap-1 p-2 sm:p-3 border-b border-slate-200/80 bg-slate-50/60 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'personal'
                  ? 'bg-[#073c2c] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Details</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-[#073c2c] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Delivery Addresses ({addresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'payments'
                  ? 'bg-[#073c2c] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>MoMo & Payments ({wallets.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('devices')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'devices'
                  ? 'bg-[#073c2c] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Registered Devices ({devices.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#073c2c] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Security & Alerts</span>
            </button>
          </div>

          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === 'personal' && (
            <div className="p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Personal Information</h2>
                  <p className="text-xs text-slate-500">Manage your name, contact phone, and dispatch hub preferences.</p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Ghana Verified
                </span>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6 max-w-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Primary Phone Number (MoMo / Calls)
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      WhatsApp Dispatch Number
                    </label>
                    <input
                      type="tel"
                      value={profile.whatsapp}
                      onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Preferred Showroom & Pickup Hub
                    </label>
                    <select
                      value={profile.preferredDispatchHub}
                      onChange={(e) => setProfile({ ...profile, preferredDispatchHub: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all font-semibold cursor-pointer"
                    >
                      <option>Kwame Nkrumah Circle Flagship Hub</option>
                      <option>Osu Oxford Street Showroom</option>
                      <option>Accra Mall Flagship</option>
                      <option>Madina Zongo Junction Branch</option>
                      <option>Tema Community 1 Center</option>
                      <option>Kumasi Adum Central Hub</option>
                      <option>Takoradi Market Circle Branch</option>
                      <option>Sunyani Main Station Branch</option>
                      <option>Tamale Central Hub</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Gender
                    </label>
                    <select
                      value={profile.gender}
                      onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all font-semibold cursor-pointer"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={profile.birthDate}
                      onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#073c2c]/20 focus:border-[#073c2c] transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    className="bg-[#073c2c] hover:bg-[#052d21] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: DELIVERY ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Saved Delivery Addresses</h2>
                  <p className="text-xs text-slate-500">Manage addresses for fast 1-click doorstep delivery across Ghana.</p>
                </div>
                <button
                  onClick={() => setShowAddAddressModal(true)}
                  className="bg-[#073c2c] hover:bg-[#052d21] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                      addr.isDefault
                        ? 'border-[#073c2c] bg-emerald-50/30 ring-1 ring-[#073c2c]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#073c2c]" />
                          <span>{addr.label}</span>
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-[#073c2c] text-white px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-800 font-bold mt-1">
                        {addr.recipientName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {addr.phone}
                      </div>

                      <div className="mt-3 text-xs text-slate-700 space-y-0.5">
                        <p className="font-semibold">{addr.street}</p>
                        <p className="text-[11px] text-slate-500">{addr.landmark}</p>
                        <p className="text-[11px] text-emerald-800 font-bold">
                          GPS: {addr.digitalAddress} • {addr.region}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      {!addr.isDefault ? (
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-xs font-bold text-[#073c2c] hover:underline cursor-pointer"
                        >
                          Set as Default
                        </button>
                      ) : (
                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Primary Destination</span>
                        </span>
                      )}

                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete address"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT & MOMO WALLETS */}
          {activeTab === 'payments' && (
            <div className="p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Payment & Mobile Money Wallets</h2>
                  <p className="text-xs text-slate-500">Fast checkout with MTN MoMo, Telecel Cash, and Bank Cards.</p>
                </div>
                <button
                  onClick={() => notifySave('Add new wallet modal available at checkout.')}
                  className="bg-[#073c2c] hover:bg-[#052d21] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Payment Method</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {wallets.map((w) => (
                  <div
                    key={w.id}
                    className={`border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                      w.isDefault
                        ? 'border-[#073c2c] bg-emerald-50/20 ring-1 ring-[#073c2c]'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          w.type === 'MTN MoMo' ? 'bg-amber-400 text-slate-950 font-black' :
                          w.type === 'Telecel Cash' ? 'bg-red-600 text-white font-black' : 'bg-blue-600 text-white'
                        }`}>
                          {w.type}
                        </span>
                        {w.isDefault && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                            Default
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-extrabold text-slate-900">{w.title}</h4>
                      <p className="text-sm font-mono font-bold text-slate-800 mt-1">{w.accountNumber}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">{w.holderName}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Instant Auto-Debited</span>
                      </span>
                      <button
                        onClick={() => {
                          setWallets(wallets.map(item => ({ ...item, isDefault: item.id === w.id })));
                          notifySave(`Default payment method set to ${w.type}`);
                        }}
                        className="text-xs font-bold text-[#073c2c] hover:underline cursor-pointer"
                      >
                        {w.isDefault ? 'Primary' : 'Make Default'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REGISTERED TECH & WARRANTIES */}
          {activeTab === 'devices' && (
            <div className="p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Registered Devices & Official Warranties</h2>
                  <p className="text-xs text-slate-500">Track manufacturer warranty certificates and showroom service eligibility.</p>
                </div>
                <button
                  onClick={() => setShowRegisterTechModal(true)}
                  className="bg-[#073c2c] hover:bg-[#052d21] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Tech Device</span>
                </button>
              </div>

              <div className="space-y-3">
                {devices.map((dev) => (
                  <div
                    key={dev.id}
                    className="border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-all bg-white"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="p-3 rounded-xl bg-emerald-50 text-[#073c2c] shrink-0">
                        {dev.category === 'phone' ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">{dev.deviceName}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                          <span>Serial/IMEI: <strong className="text-slate-800 font-mono">{dev.serialImei}</strong></span>
                          <span>•</span>
                          <span>Purchased: {dev.purchaseDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                      <div className="text-left md:text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Active Warranty</span>
                        </span>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {dev.warrantyExpiry}
                        </div>
                      </div>

                      <button
                        onClick={() => notifySave(`Warranty certificate generated for ${dev.deviceName}`)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & ALERTS */}
          {activeTab === 'security' && (
            <div className="p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="pb-4 border-b border-slate-100 mb-6">
                <h2 className="text-base font-extrabold text-slate-900">Account Security & Notifications</h2>
                <p className="text-xs text-slate-500">Configure multi-factor authentication, passwords, and SMS delivery alerts.</p>
              </div>

              <div className="max-w-3xl space-y-6">
                {/* Password Change Form */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-[#073c2c]" />
                    <span>Change Account Password</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => notifySave('Password updated successfully!')}
                      className="bg-[#073c2c] hover:bg-[#052d21] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Notifications Toggles */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <div className="text-xs font-bold text-slate-900">SMS Express Dispatch Alerts</div>
                      <div className="text-[11px] text-slate-500">Receive instant SMS updates when your tech order is dispatched from Accra Hub.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.smsDispatchAlerts}
                      onChange={(e) => {
                        setSecuritySettings({ ...securitySettings, smsDispatchAlerts: e.target.checked });
                        notifySave('SMS notification preference saved.');
                      }}
                      className="w-4 h-4 accent-[#073c2c] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <div className="text-xs font-bold text-slate-900">WhatsApp Live Delivery Tracking</div>
                      <div className="text-[11px] text-slate-500">Rider phone number & live delivery PIN sent directly to WhatsApp.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.whatsappTrackingUpdates}
                      onChange={(e) => {
                        setSecuritySettings({ ...securitySettings, whatsappTrackingUpdates: e.target.checked });
                        notifySave('WhatsApp notification preference saved.');
                      }}
                      className="w-4 h-4 accent-[#073c2c] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</div>
                      <div className="text-[11px] text-slate-500">Require 6-digit OTP verification on Ghana mobile number for sensitive orders.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorEnabled}
                      onChange={(e) => {
                        setSecuritySettings({ ...securitySettings, twoFactorEnabled: e.target.checked });
                        notifySave('Two-factor security setting updated.');
                      }}
                      className="w-4 h-4 accent-[#073c2c] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD DELIVERY ADDRESS */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div onClick={() => setShowAddAddressModal(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          <div className="min-h-screen px-4 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl z-10 border border-slate-200">
              <h3 className="text-base font-extrabold text-slate-900 mb-1">Add Delivery Destination in Ghana</h3>
              <p className="text-xs text-slate-500 mb-4">Enter exact street address and GhanaPost GPS code.</p>

              <form onSubmit={handleAddAddress} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Address Label</label>
                  <input
                    type="text"
                    value={newAddr.label}
                    onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                    placeholder="e.g. Home, Office, Kumasi Warehouse"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      value={newAddr.recipientName}
                      onChange={(e) => setNewAddr({ ...newAddr, recipientName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Region</label>
                    <select
                      value={newAddr.region}
                      onChange={(e) => setNewAddr({ ...newAddr, region: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c] cursor-pointer"
                    >
                      <option>Greater Accra</option>
                      <option>Ashanti Region</option>
                      <option>Western Region</option>
                      <option>Central Region</option>
                      <option>Eastern Region</option>
                      <option>Volta Region</option>
                      <option>Northern Region</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">GhanaPost GPS Digital Code</label>
                    <input
                      type="text"
                      placeholder="e.g. GA-183-9024"
                      value={newAddr.digitalAddress}
                      onChange={(e) => setNewAddr({ ...newAddr, digitalAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c] uppercase"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot 14, East Legon Residential"
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Prominent Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Near American House Junction, Blue Gate"
                    value={newAddr.landmark}
                    onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowAddAddressModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#073c2c] hover:bg-[#052d21] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REGISTER TECH DEVICE */}
      {showRegisterTechModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div onClick={() => setShowRegisterTechModal(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          <div className="min-h-screen px-4 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 border border-slate-200">
              <h3 className="text-base font-extrabold text-slate-900 mb-1">Register Franko Tech Device</h3>
              <p className="text-xs text-slate-500 mb-4">Validate your manufacturer warranty seal and showroom support.</p>

              <form onSubmit={handleRegisterDevice} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Product Model & Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Samsung Galaxy S24 Ultra or HP Envy 16"
                    value={newTech.deviceName}
                    onChange={(e) => setNewTech({ ...newTech, deviceName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Tech Category</label>
                  <select
                    value={newTech.category}
                    onChange={(e) => setNewTech({ ...newTech, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c] cursor-pointer"
                  >
                    <option value="phone">Smartphone / Tablet</option>
                    <option value="laptop">Laptop / Computing</option>
                    <option value="tv">Smart TV / Soundbar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Serial Number / IMEI (15 Digits)</label>
                  <input
                    type="text"
                    placeholder="e.g. 358921102948210"
                    value={newTech.serialImei}
                    onChange={(e) => setNewTech({ ...newTech, serialImei: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-1 focus:ring-[#073c2c]"
                    required
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowRegisterTechModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#073c2c] hover:bg-[#052d21] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Activate Warranty
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
