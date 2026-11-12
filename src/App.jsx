```react
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingCart, Heart, Search, X, Plus, Minus, Trash2, 
  ChevronRight, Shield, Cpu, Sparkles, Phone, Mail, MapPin, 
  CheckCircle, Truck, PackageCheck, Layers, Wrench, Menu, Filter,
  Edit, PlusCircle, LayoutDashboard, Settings, History, Lock, Eye, AlertTriangle, Image as ImageIcon
} from 'lucide-react';

// Default Initial Product Data
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Bambu Lab X1-Carbon Combo",
    category: "printers",
    categoryLabel: "3D Printers",
    priceMMK: 5450000,
    priceUSD: 1650,
    stock: 5,
    rating: 4.9,
    reviews: 42,
    badge: "Flagship",
    imageUrl: "",
    icon: "🖨️",
    specs: ["CoreXY up to 500 mm/s", "Multi-Color Printing (AMS)", "AI-Powered Inspection", "Build Vol: 256×256×256 mm"],
    inStock: true
  },
  {
    id: 2,
    name: "Creality Ender 3 V3 KE",
    category: "printers",
    categoryLabel: "3D Printers",
    priceMMK: 1150000,
    priceUSD: 350,
    stock: 12,
    rating: 4.7,
    reviews: 89,
    badge: "Best Seller",
    imageUrl: "",
    icon: "🖨️",
    specs: ["Max Speed: 500mm/s", "Sprite Direct Extruder", "CR Touch Auto-leveling", "Build Vol: 220×220×240 mm"],
    inStock: true
  },
  {
    id: 3,
    name: "Elegoo Neptune 4 Pro",
    category: "printers",
    categoryLabel: "3D Printers",
    priceMMK: 1450000,
    priceUSD: 440,
    stock: 4,
    rating: 4.8,
    reviews: 31,
    badge: "Popular",
    imageUrl: "",
    icon: "🖨️",
    specs: ["Klipper Pre-installed", "500mm/s Printing Speed", "Segmented Heatbed", "Build Vol: 225×225×265 mm"],
    inStock: true
  },
  {
    id: 4,
    name: "eSUN PLA+ Filament 1kg (Black)",
    category: "filaments",
    categoryLabel: "Filaments",
    priceMMK: 65000,
    priceUSD: 20,
    stock: 45,
    rating: 4.9,
    reviews: 154,
    badge: "High Toughness",
    imageUrl: "",
    icon: "🧵",
    specs: ["1.75mm Tolerance ±0.03mm", "Enhanced Mechanical Strength", "Smooth Flowing", "100% Eco-Friendly"],
    inStock: true
  },
  {
    id: 5,
    name: "Bambu PETG Basic Filament 1kg",
    category: "filaments",
    categoryLabel: "Filaments",
    priceMMK: 85000,
    priceUSD: 26,
    stock: 20,
    rating: 4.8,
    reviews: 67,
    badge: "Weather Proof",
    imageUrl: "",
    icon: "🧵",
    specs: ["High Heat Resistance", "Excellent Waterproofing", "Low Stringing Formula", "RF ID Tag Compatible"],
    inStock: true
  },
  {
    id: 6,
    name: "TPU Flexible Filament 95A (Red)",
    category: "filaments",
    categoryLabel: "Filaments",
    priceMMK: 78000,
    priceUSD: 24,
    stock: 8,
    rating: 4.6,
    reviews: 28,
    badge: "Flexible",
    imageUrl: "",
    icon: "🧵",
    specs: ["High Elasticity", "Abrasion Resistant", "Shore 95A Hardness", "Ideal for Seals & Dampeners"],
    inStock: true
  },
  {
    id: 7,
    name: "Hardened Steel Nozzle Set (0.4mm / 0.6mm)",
    category: "parts",
    categoryLabel: "Spare Parts",
    priceMMK: 45000,
    priceUSD: 14,
    stock: 30,
    rating: 4.9,
    reviews: 52,
    badge: "Wear Resistant",
    imageUrl: "",
    icon: "🔧",
    specs: ["High Temp Up to 450°C", "Suitable for Carbon Fiber", "Anti-Corrosion Coating", "Universal M6 Thread"],
    inStock: true
  },
  {
    id: 8,
    name: "PEI Magnetic Flexible Build Plate",
    category: "parts",
    categoryLabel: "Spare Parts",
    priceMMK: 95000,
    priceUSD: 29,
    stock: 15,
    rating: 4.7,
    reviews: 44,
    badge: "Dual Textured",
    imageUrl: "",
    icon: "📐",
    specs: ["Textured PEI Surface", "Easy Print Removal", "Strong Magnetic Base", "Fits 235x235mm Beds"],
    inStock: true
  },
  {
    id: 9,
    name: "Filament Dry Box Dryer Cabinet",
    category: "accessories",
    categoryLabel: "Accessories",
    priceMMK: 195000,
    priceUSD: 59,
    stock: 6,
    rating: 4.9,
    reviews: 73,
    badge: "Essential",
    imageUrl: "",
    icon: "📦",
    specs: ["Active Humidity Control", "Temp Range 40-70°C", "Real-time Hygrometer", "Holds 2 Spools"],
    inStock: true
  },
  {
    id: 10,
    name: "3D Print Finishing Tool Kit",
    category: "accessories",
    categoryLabel: "Accessories",
    priceMMK: 55000,
    priceUSD: 17,
    stock: 18,
    rating: 4.8,
    reviews: 61,
    badge: "Starter Kit",
    imageUrl: "",
    icon: "🛠️",
    specs: ["Deburring Blades included", "Precision Tweezers & Pliers", "Spatula & Sanding Blocks", "Sturdy Storage Case"],
    inStock: true
  }
];

// Default Site Customization Branding
const DEFAULT_BRANDING = {
  announcement: "EverSafe 3D Store: 100% Genuine 3D Printers & Official Warranty in Myanmar!",
  siteTitle: "EverSafe",
  siteSubtitle: "3D Tech Hub & Supplies",
  heroTitlePrefix: "Bring Your Ideas To Life With",
  heroTitleHighlight: "EverSafe 3D",
  heroDescription: "မြန်မာနိုင်ငံ၏ စိတ်ချရဆုံး 3D Printer, High-Grade Filament များနှင့် အပိုပစ္စည်းစုံလင်ရာ EverSafe Store မှ ကြိုဆိုပါသည်။ အရည်အသွေးမြင့် ပစ္စည်းများနှင့် တိကျစိတ်ချရသော ဝန်ဆောင်မှုကို ရယူလိုက်ပါ။",
  logoUrl: "",
  heroBgUrl: "",
  contactPhone: "09-770 123 456",
  contactEmail: "support@eversafe3d.com",
  contactAddress: "Kamayut Township, Yangon, Myanmar"
};

export default function App() {
  // State Initialization with local persistence fallback
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('eversafe_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [branding, setBranding] = useState(() => {
    const saved = localStorage.getItem('eversafe_branding');
    return saved ? JSON.parse(saved) : DEFAULT_BRANDING;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('eversafe_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [mode, setMode] = useState('customer'); // 'customer' | 'admin'
  const [adminTab, setAdminTab] = useState('inventory'); // 'inventory' | 'branding' | 'orders'
  
  // Shopping Cart & Wishlist State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form State for Admin Product Add/Edit
  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'printers',
    priceMMK: '',
    priceUSD: '',
    stock: '',
    badge: '',
    imageUrl: '',
    icon: '🖨️',
    specs: ''
  });

  // Customer Checkout Form
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'kpay'
  });

  // Persist State Updates
  useEffect(() => {
    localStorage.setItem('eversafe_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('eversafe_branding', JSON.stringify(branding));
  }, [branding]);

  useEffect(() => {
    localStorage.setItem('eversafe_orders', JSON.stringify(orders));
  }, [orders]);

  // Filter Products based on category & search
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (p.specs && p.specs.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Cart Functions
  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      if (currentQty >= product.stock) {
        alert(`Sorry, maximum available stock reached (${product.stock} left).`);
        return prevCart;
      }
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === id) {
          const product = products.find(p => p.id === id);
          const maxStock = product ? product.stock : 999;
          const newQty = item.quantity + delta;
          if (newQty > maxStock) {
            alert(`Maximum available stock reached (${maxStock} items).`);
            return item;
          }
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const cartTotalMMK = cart.reduce((sum, item) => sum + (item.priceMMK * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // HANDLE CUSTOMER PURCHASE (REDUCES STOCK IN REAL-TIME)
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Verify stock availability before purchase
    for (let cartItem of cart) {
      const product = products.find(p => p.id === cartItem.id);
      if (!product || product.stock < cartItem.quantity) {
        alert(`Stock error: ${cartItem.name} does not have enough items in stock!`);
        return;
      }
    }

    // 1. Deduct Stock from Products State
    setProducts(prevProducts => 
      prevProducts.map(prod => {
        const cartItem = cart.find(c => c.id === prod.id);
        if (cartItem) {
          const updatedStock = Math.max(0, prod.stock - cartItem.quantity);
          return { ...prod, stock: updatedStock };
        }
        return prod;
      })
    );

    // 2. Add to Admin Order History Log
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString('en-GB'),
      customer: customerInfo,
      items: cart.map(i => ({ name: i.name, quantity: i.quantity, priceMMK: i.priceMMK })),
      totalMMK: cartTotalMMK,
      status: 'Pending Delivery'
    };
    setOrders(prev => [newOrder, ...prev]);

    // 3. Complete Checkout UX Feedback
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setOrderPlaced(false);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setCustomerInfo({ name: '', phone: '', address: '', paymentMethod: 'kpay' });
    }, 2500);
  };

  // ADMIN PRODUCT CRUD OPERATIONS
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'printers',
      priceMMK: '',
      priceUSD: '',
      stock: '',
      badge: '',
      imageUrl: '',
      icon: '🖨️',
      specs: ''
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      priceMMK: product.priceMMK,
      priceUSD: product.priceUSD,
      stock: product.stock,
      badge: product.badge || '',
      imageUrl: product.imageUrl || '',
      icon: product.icon || '🖨️',
      specs: product.specs ? product.specs.join(', ') : ''
    });
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product item?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const categoryLabels = {
      printers: '3D Printers',
      filaments: 'Filaments',
      parts: 'Spare Parts',
      accessories: 'Accessories'
    };

    const parsedSpecs = productForm.specs
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const productPayload = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: productForm.name,
      category: productForm.category,
      categoryLabel: categoryLabels[productForm.category] || 'Equipment',
      priceMMK: Number(productForm.priceMMK) || 0,
      priceUSD: Number(productForm.priceUSD) || 0,
      stock: Number(productForm.stock) || 0,
      badge: productForm.badge,
      imageUrl: productForm.imageUrl,
      icon: productForm.icon || '📦',
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviews: editingProduct ? editingProduct.reviews : 1,
      specs: parsedSpecs.length > 0 ? parsedSpecs : ["High-grade Quality Tested", "Official Warranty Included"],
      imageBg: editingProduct ? editingProduct.imageBg : "bg-gradient-to-br from-cyan-900 to-slate-900"
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productPayload : p));
    } else {
      setProducts(prev => [productPayload, ...prev]);
    }

    setIsProductModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-slate-950 text-xs md:text-sm font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>{branding.announcement}</span>
        <Sparkles className="w-4 h-4 animate-pulse hidden sm:inline" />
      </div>

      {/* HEADER / NAVIGATION WITH ADMIN TOGGLE */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMode('customer')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 overflow-hidden">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                {branding.logoUrl ? (
                  <img src={branding.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-[10px]" />
                ) : (
                  <Shield className="w-5 h-5 text-cyan-400" />
                )}
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                {branding.siteTitle}
              </span>
              <span className="block text-[10px] text-teal-400 font-medium tracking-widest uppercase">
                {branding.siteSubtitle}
              </span>
            </div>
          </div>

          {/* Customer Search Bar (Desktop) */}
          {mode === 'customer' && (
            <div className="hidden md:flex flex-1 max-w-md relative">
              <input 
                type="text" 
                placeholder="Search 3D printers, PLA filaments, nozzles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          )}

          {/* Mode Switcher & Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Admin/Customer Mode Toggle Switch */}
            <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button 
                onClick={() => setMode('customer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  mode === 'customer' 
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Customer
              </button>
              <button 
                onClick={() => setMode('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  mode === 'admin' 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lock className="w-3.5 h-3.5" /> Admin Panel
              </button>
            </div>

            {/* Wishlist Button (Customer Mode) */}
            {mode === 'customer' && (
              <button 
                onClick={() => alert(`Saved wishlist: ${wishlist.length} item(s)`)}
                className="relative p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition"
                title="Wishlist"
              >
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            {/* Cart Drawer Trigger */}
            {mode === 'customer' && (
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-slate-950 text-cyan-400 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-slate-400 hover:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {mode === 'customer' && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search printers, filaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* ADMIN DASHBOARD VIEW */}
      {/* ========================================================= */}
      {mode === 'admin' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
                <Lock className="w-3.5 h-3.5" /> Store Management Portal
              </div>
              <h1 className="text-2xl font-black text-white">EverSafe Admin Dashboard</h1>
              <p className="text-slate-400 text-xs">Manage product inventory, edit site branding, and review customer orders.</p>
            </div>

            {/* Admin Tabs */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button 
                onClick={() => setAdminTab('inventory')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  adminTab === 'inventory' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Products & Inventory
              </button>
              <button 
                onClick={() => setAdminTab('branding')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  adminTab === 'branding' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" /> Branding & Content
              </button>
              <button 
                onClick={() => setAdminTab('orders')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition relative ${
                  adminTab === 'orders' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <History className="w-4 h-4" /> Orders ({orders.length})
              </button>
            </div>
          </div>

          {/* TAB 1: PRODUCT & INVENTORY MANAGER */}
          {adminTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Live Product Catalog ({products.length} Items)</h2>
                <button 
                  onClick={handleOpenAddProduct}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition"
                >
                  <PlusCircle className="w-4 h-4" /> Add New Item
                </button>
              </div>

              {/* Products Admin Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Item Details</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price (MMK)</th>
                      <th className="p-4">Stock Level</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xl overflow-hidden flex-shrink-0">
                            {p.imageUrl ? (
                              <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <span>{p.icon}</span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[10px] text-slate-500">{p.badge || 'Standard'}</span>
                          </div>
                        </td>
                        <td className="p-4 font-medium text-slate-400">{p.categoryLabel}</td>
                        <td className="p-4 font-bold text-cyan-400">{p.priceMMK.toLocaleString()} MMK</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            p.stock > 10 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            p.stock > 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {p.stock > 0 ? `${p.stock} in stock` : 'Out of Stock (ကုန်ပြီ)'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 bg-rose-950/60 hover:bg-rose-900 text-rose-400 rounded-lg transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: BRANDING & SITE CONTENT MANAGER */}
          {adminTab === 'branding' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-3xl space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" /> Customize Site Branding & Text Content
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Store Name (Title)</label>
                  <input 
                    type="text" 
                    value={branding.siteTitle}
                    onChange={(e) => setBranding({...branding, siteTitle: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Tagline</label>
                  <input 
                    type="text" 
                    value={branding.siteSubtitle}
                    onChange={(e) => setBranding({...branding, siteSubtitle: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Top Announcement Banner Text</label>
                <input 
                  type="text" 
                  value={branding.announcement}
                  onChange={(e) => setBranding({...branding, announcement: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Title Prefix</label>
                  <input 
                    type="text" 
                    value={branding.heroTitlePrefix}
                    onChange={(e) => setBranding({...branding, heroTitlePrefix: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Title Highlight Word</label>
                  <input 
                    type="text" 
                    value={branding.heroTitleHighlight}
                    onChange={(e) => setBranding({...branding, heroTitleHighlight: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Description Text (Myanmar / English)</label>
                <textarea 
                  rows={3}
                  value={branding.heroDescription}
                  onChange={(e) => setBranding({...branding, heroDescription: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Logo Image URL (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="https://example.com/logo.png"
                    value={branding.logoUrl}
                    onChange={(e) => setBranding({...branding, logoUrl: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Background Image URL (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="https://example.com/hero-bg.jpg"
                    value={branding.heroBgUrl}
                    onChange={(e) => setBranding({...branding, heroBgUrl: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <span className="text-xs text-emerald-400 font-semibold">✓ Branding changes auto-saved to session!</span>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER ORDERS LOG */}
          {adminTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">Received Customer Orders ({orders.length})</h2>

              {orders.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 p-12 text-center rounded-2xl text-slate-500">
                  <PackageCheck className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  No customer orders received yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-mono font-bold text-cyan-400 text-xs">{order.id}</span>
                        <span className="text-[10px] text-slate-400">{order.date}</span>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="font-bold text-white">{order.customer.name}</div>
                        <div className="text-slate-400">📞 {order.customer.phone}</div>
                        <div className="text-slate-400">📍 {order.customer.address}</div>
                        <div className="text-slate-400 uppercase font-semibold text-[10px] pt-1">
                          Payment: <span className="text-teal-400">{order.customer.paymentMethod}</span>
                        </div>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl space-y-1 border border-slate-800 text-xs">
                        <div className="font-semibold text-slate-300 text-[10px] uppercase">Purchased Items:</div>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-slate-400">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-mono">{(item.priceMMK * item.quantity).toLocaleString()} MMK</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-400">Total Paid:</span>
                        <span className="text-sm font-extrabold text-white">{order.totalMMK.toLocaleString()} MMK</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ========================================================= */
        /* CUSTOMER STOREFRONT VIEW */
        /* ========================================================= */
        <>
          {/* HERO BANNER SECTION */}
          <section 
            className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 py-12 lg:py-20 px-4 sm:px-6 lg:px-8"
            style={branding.heroBgUrl ? { backgroundImage: `url(${branding.heroBgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-4">
                  <Cpu className="w-3.5 h-3.5" /> Next-Gen 3D Printing Technology
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                  {branding.heroTitlePrefix} <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">{branding.heroTitleHighlight}</span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  {branding.heroDescription}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#catalog"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                  >
                    Shop Catalog <ChevronRight className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={() => setSelectedCategory('filaments')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-6 py-3 rounded-xl transition"
                  >
                    Explore Filaments
                  </button>
                </div>
              </div>

              {/* Hero Featured Card */}
              <div className="relative flex justify-center">
                <div className="w-full max-w-md bg-gradient-to-tr from-slate-900 to-slate-800 p-6 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-3 right-3 bg-cyan-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured Deal
                  </div>
                  <div className="text-7xl text-center py-8 filter drop-shadow-lg transform group-hover:scale-110 transition duration-300">
                    🖨️
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-cyan-400 font-semibold">Flagship CoreXY Model</div>
                    <h3 className="text-xl font-bold text-white">{products[0]?.name || "Bambu Lab X1-Carbon Combo"}</h3>
                    <p className="text-xs text-slate-400">Multi-color printing with AI nozzle check & ultra-fast speeds.</p>
                    <div className="pt-3 flex items-center justify-between border-t border-slate-700">
                      <div>
                        <span className="text-lg font-bold text-cyan-300">{products[0]?.priceMMK.toLocaleString()} MMK</span>
                        <span className="block text-[10px] text-slate-500 font-sans">({products[0]?.stock} units left)</span>
                      </div>
                      <button 
                        onClick={() => addToCart(products[0])}
                        disabled={products[0]?.stock <= 0}
                        className={`font-bold px-4 py-2 rounded-lg text-xs transition ${
                          products[0]?.stock > 0 
                            ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' 
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {products[0]?.stock > 0 ? 'Quick Add +' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN CATALOG SECTION */}
          <main id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
            
            {/* Category Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-6 h-6 text-cyan-400" /> Product Catalog
                </h2>
                <p className="text-slate-400 text-sm">Real-time stock availability in Myanmar</p>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {[
                  { id: 'all', label: 'All Products', icon: Sparkles },
                  { id: 'printers', label: '3D Printers', icon: Cpu },
                  { id: 'filaments', label: 'Filaments', icon: Layers },
                  { id: 'parts', label: 'Spare Parts', icon: Wrench },
                  { id: 'accessories', label: 'Accessories', icon: Filter }
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                        isActive 
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20' 
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
                <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-medium">No products found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  const isOutOfStock = product.stock <= 0;

                  return (
                    <div 
                      key={product.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition duration-300 flex flex-col group shadow-lg relative"
                    >
                      {/* Image / Graphic Area */}
                      <div className={`relative h-48 ${product.imageBg || 'bg-slate-800'} flex items-center justify-center p-4 overflow-hidden`}>
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="h-full object-contain filter drop-shadow-md" />
                        ) : (
                          <span className="text-6xl transform group-hover:scale-110 transition duration-300 filter drop-shadow-md">
                            {product.icon}
                          </span>
                        )}
                        
                        {/* Badge */}
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-cyan-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                            {product.badge}
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                            isWishlisted ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-950/40 text-slate-400 hover:text-rose-400'
                          }`}
                        >
                          <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                      </div>

                      {/* Details Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
                              {product.categoryLabel}
                            </span>
                            
                            {/* LIVE STOCK BADGE */}
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isOutOfStock 
                                ? 'bg-rose-950 text-rose-400 border border-rose-800' 
                                : 'bg-slate-950 text-emerald-400 border border-slate-800'
                            }`}>
                              {isOutOfStock ? 'ကုန်သွားပါပြီ' : `Stock: ${product.stock}`}
                            </span>
                          </div>

                          <h3 
                            onClick={() => setSelectedProduct(product)}
                            className="font-bold text-white hover:text-cyan-400 cursor-pointer transition line-clamp-1"
                          >
                            {product.name}
                          </h3>

                          {/* Key Specs */}
                          <ul className="mt-3 space-y-1">
                            {product.specs && product.specs.slice(0, 2).map((spec, idx) => (
                              <li key={idx} className="text-xs text-slate-400 flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Pricing & Add to Cart */}
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                          <div>
                            <div className="text-lg font-extrabold text-white">
                              {product.priceMMK.toLocaleString()} <span className="text-xs text-cyan-400 font-normal">MMK</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              ≈ ${product.priceUSD} USD
                            </div>
                          </div>

                          <button 
                            onClick={() => addToCart(product)}
                            disabled={isOutOfStock}
                            className={`p-2.5 rounded-xl transition flex items-center gap-1 font-bold text-xs ${
                              isOutOfStock 
                                ? 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed' 
                                : 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-slate-700'
                            }`}
                            title={isOutOfStock ? "Out of Stock" : "Add to Cart"}
                          >
                            <Plus className="w-4 h-4" />
                            {isOutOfStock ? 'Sold Out' : 'Add'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-lg font-black text-white">{branding.siteTitle}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your trusted partner for 3D printing equipment, premium filaments, and rapid prototyping in Myanmar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:text-cyan-400">3D Printers</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400">PLA / PETG / TPU Filaments</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400">Nozzles & Hotends</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400">Dry Boxes & Tools</a></li>
            </ul>
          </div>

          {/* Contact Care */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Customer Support</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-cyan-400" /> {branding.contactPhone}</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-cyan-400" /> {branding.contactEmail}</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {branding.contactAddress}</li>
            </ul>
          </div>

          {/* Payment Badges */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Accepted Payments</h4>
            <div className="flex flex-wrap gap-2 text-[10px]">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">KBZPay</span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">WavePay</span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">AYA Pay</span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">Cash on Delivery</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 pt-6 text-center text-slate-600">
          © {new Date().getFullYear()} {branding.siteTitle}. All rights reserved. Designed for Myanmar makers.
        </div>
      </footer>

      {/* MODAL: ADMIN ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button 
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              {editingProduct ? 'Edit Product Item' : 'Add New Product Item'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title / Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Bambu Lab A1 Mini"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select 
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="printers">3D Printers</option>
                    <option value="filaments">Filaments</option>
                    <option value="parts">Spare Parts</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity (အရေအတွက်)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    placeholder="e.g. 10"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Price (MMK)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 1150000"
                    value={productForm.priceMMK}
                    onChange={(e) => setProductForm({...productForm, priceMMK: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Price (USD Approx)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 350"
                    value={productForm.priceUSD}
                    onChange={(e) => setProductForm({...productForm, priceUSD: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Flagship / Best Seller"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({...productForm, badge: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Icon Emoji</label>
                  <input 
                    type="text" 
                    placeholder="🖨️ / 🧵 / 🔧"
                    value={productForm.icon}
                    onChange={(e) => setProductForm({...productForm, icon: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
                <input 
                  type="text" 
                  placeholder="https://example.com/image.png"
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Specifications (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="CoreXY Speed, 220x220mm, Auto-leveling"
                  value={productForm.specs}
                  onChange={(e) => setProductForm({...productForm, specs: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl">
            
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
                Shopping Cart ({cartItemCount})
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Your shopping cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 items-center">
                    <div className={`w-12 h-12 ${item.imageBg || 'bg-slate-800'} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <div className="text-xs text-cyan-400 font-bold mt-0.5">
                        {item.priceMMK.toLocaleString()} MMK
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs text-slate-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs text-slate-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-extrabold text-white">{cartTotalMMK.toLocaleString()} MMK</span>
                </div>
                
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: PRODUCT DETAILS */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white bg-slate-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`h-40 ${selectedProduct.imageBg || 'bg-slate-800'} rounded-xl flex items-center justify-center text-7xl mb-4`}>
              {selectedProduct.icon}
            </div>

            <div className="text-xs text-teal-400 font-bold uppercase tracking-wider mb-1">
              {selectedProduct.categoryLabel}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{selectedProduct.name}</h3>

            <div className="flex items-center gap-2 mb-4 text-xs">
              <span className="text-amber-400">★ {selectedProduct.rating}</span>
              <span className="text-slate-600">•</span>
              <span className={selectedProduct.stock > 0 ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
                {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock} available)` : "Out of Stock (ကုန်သွားပါပြီ)"}
              </span>
            </div>

            <div className="space-y-2 mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Key Technical Specs</h4>
              <ul className="space-y-1">
                {selectedProduct.specs && selectedProduct.specs.map((s, idx) => (
                  <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-2xl font-extrabold text-white">{selectedProduct.priceMMK.toLocaleString()} MMK</span>
                <span className="block text-xs text-slate-500">≈ ${selectedProduct.priceUSD} USD</span>
              </div>

              <button 
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                disabled={selectedProduct.stock <= 0}
                className={`font-bold px-6 py-2.5 rounded-xl transition ${
                  selectedProduct.stock > 0 
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {selectedProduct.stock > 0 ? 'Add To Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CHECKOUT WITH AUTOMATIC INVENTORY REDUCTION */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {orderPlaced ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white">Order Received!</h3>
                <p className="text-xs text-slate-400">
                  ကျေးဇူးတင်ပါသည်။ EverSafe အဖွဲ့မှ အော်ဒါအတည်ပြုရန် ဖုန်းဆက်သွယ်ပေးပါမည်။ Stock များကို Website တွင် လျော့ချပေးလိုက်ပါပြီ။
                </p>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                  Checkout & Confirm Order
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Name (အမည်)</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. U Thurein"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (ဖုန်းနံပါတ်)</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="09-XXXXXXXXX"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Address (မြို့နယ်/လိပ်စာ)</label>
                  <textarea 
                    required 
                    rows={2}
                    placeholder="e.g. No. 45, Pyay Road, Kamayut Township, Yangon"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Payment Method (ငွေပေးချေမှု)</label>
                  <select 
                    value={customerInfo.paymentMethod}
                    onChange={(e) => setCustomerInfo({...customerInfo, paymentMethod: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="kpay">KBZPay Transfer</option>
                    <option value="wave">WavePay</option>
                    <option value="cod">Cash On Delivery (COD)</option>
                  </select>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Payable Amount:</span>
                  <span className="text-base font-extrabold text-cyan-400">{cartTotalMMK.toLocaleString()} MMK</span>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition mt-2"
                >
                  Confirm Order & Reduce Stock
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
```
