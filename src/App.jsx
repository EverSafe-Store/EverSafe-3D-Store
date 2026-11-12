import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Plus, Trash2, Edit3, Settings, 
  CheckCircle, ArrowRight, Package, DollarSign, 
  ShieldCheck, Printer, Cpu, Wrench, Menu, X, ArrowLeft
} from 'lucide-react';

export default function App() {
  // Navigation & View Mode
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Custom Site Branding State
  const [branding, setBranding] = useState({
    siteName: 'EverSafe 3D Store',
    logoUrl: 'https://images.unsplash.com/photo-1615749413665-8e7c10b65b12?w=100',
    heroBg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200',
    heroTitle: 'Next-Gen 3D Printing & Industrial Filaments',
    heroSubtitle: 'High-precision 3D printers, durable filaments, and expert spare parts for creators and industries.',
    announcement: '🔥 Special Promo: Free delivery on orders over 100,000 MMK!'
  });

  // Initial Products State with Stock
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'EverSafe Pro X1 3D Printer',
      category: '3D Printers',
      priceMMK: 1250000,
      priceUSD: 600,
      stock: 5,
      image: 'https://images.unsplash.com/photo-1631541416757-463e26090740?w=600',
      specs: 'Build volume: 300x300x400mm, Auto bed leveling, All-metal hotend.'
    },
    {
      id: 2,
      name: 'Industrial PLA Filament (1kg, Black)',
      category: 'Filaments',
      priceMMK: 35000,
      priceUSD: 18,
      stock: 25,
      image: 'https://images.unsplash.com/photo-1615749413665-8e7c10b65b12?w=600',
      specs: 'Diameter: 1.75mm, High tensile strength, Eco-friendly.'
    },
    {
      id: 3,
      name: 'Carbon Fiber PETG Filament',
      category: 'Filaments',
      priceMMK: 55000,
      priceUSD: 28,
      stock: 12,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
      specs: 'Extremely durable, heat resistant up to 90°C, professional grade.'
    },
    {
      id: 4,
      name: 'Titanium Extruder Upgrade Kit',
      category: 'Spare Parts',
      priceMMK: 85000,
      priceUSD: 42,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600',
      specs: 'Dual gear drive ratio, lightweight aluminum alloy housing.'
    },
    {
      id: 5,
      name: 'High-Flow Nozzle Set (Hardened Steel)',
      category: 'Accessories',
      priceMMK: 25000,
      priceUSD: 12,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600',
      specs: 'Sizes: 0.4, 0.6, 0.8mm. Abrasion resistant for carbon/glow filaments.'
    }
  ]);

  // Cart State
  const [cart, setCart] = useState([]);
  
  // Orders History State
  const [orders, setOrders] = useState([]);

  // Admin Form States for Adding/Editing Products
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', category: '3D Printers', priceMMK: '', priceUSD: '', stock: '', image: '', specs: ''
  });

  // Categories
  const categories = ['All', '3D Printers', 'Filaments', 'Spare Parts', 'Accessories'];

  // Cart Handlers
  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert('This item is currently out of stock.');
      return;
    }
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
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          const targetProduct = products.find(p => p.id === id);
          if (newQty > targetProduct.stock) {
            alert(`Cannot exceed available stock (${targetProduct.stock}).`);
            return item;
          }
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotalMMK = cart.reduce((sum, item) => sum + (item.priceMMK * item.quantity), 0);

  // Checkout Handler (Reduces Stock & Logs Order)
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerInfo = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      paymentMethod: formData.get('paymentMethod')
    };

    // Reduce Stock
    setProducts(prevProducts => 
      prevProducts.map(prod => {
        const cartItem = cart.find(ci => ci.id === prod.id);
        if (cartItem) {
          return { ...prod, stock: Math.max(0, prod.stock - cartItem.quantity) };
        }
        return prod;
      })
    );

    // Record Order
    const newOrder = {
      id: Date.now(),
      customer: customerInfo,
      items: [...cart],
      totalMMK: cartTotalMMK,
      date: new Date().toLocaleString()
    };
    setOrders([newOrder, ...orders]);

    alert('Order placed successfully! Stock updated.');
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Admin Product Handlers
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productForm, priceMMK: Number(productForm.priceMMK), priceUSD: Number(productForm.priceUSD), stock: Number(productForm.stock) } : p));
      setEditingProduct(null);
    } else {
      const newProd = {
        id: Date.now(),
        ...productForm,
        priceMMK: Number(productForm.priceMMK),
        priceUSD: Number(productForm.priceUSD),
        stock: Number(productForm.stock)
      };
      setProducts([...products, newProd]);
    }
    setProductForm({ name: '', category: '3D Printers', priceMMK: '', priceUSD: '', stock: '', image: '', specs: '' });
  };

  const startEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      priceMMK: prod.priceMMK,
      priceUSD: prod.priceUSD,
      stock: prod.stock,
      image: prod.image,
      specs: prod.specs
    });
  };

  const deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-inner">
        {branding.announcement}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setIsAdminMode(false); setSelectedProduct(null); }}>
            <img src={branding.logoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-teal-500/50 shadow-md" />
            <div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {branding.siteName}
              </span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest">3D Tech & Solutions</span>
            </div>
          </div>

          {/* Desktop Nav / Search */}
          {!isAdminMode && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search 3D printers, filaments, parts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500 transition"
                />
              </div>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                isAdminMode 
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {isAdminMode ? <ShoppingBag className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
              <span>{isAdminMode ? 'Customer View' : 'Admin Panel'}</span>
            </button>

            {!isAdminMode && (
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative bg-teal-600 hover:bg-teal-500 text-white p-2.5 rounded-xl transition shadow-lg shadow-teal-600/30 flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {isAdminMode ? (
          // ================= ADMIN DASHBOARD =================
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                  <Settings className="text-teal-400 w-8 h-8" /> Admin Management Dashboard
                </h1>
                <p className="text-slate-400 text-sm mt-1">Manage store products, stock levels, orders, and website branding.</p>
              </div>
            </div>

            {/* Section 1: Branding Settings */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <Edit3 className="w-5 h-5" /> Customize Website Branding & Content
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Website Name</label>
                  <input 
                    type="text" 
                    value={branding.siteName}
                    onChange={(e) => setBranding({...branding, siteName: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Logo Image URL</label>
                  <input 
                    type="text" 
                    value={branding.logoUrl}
                    onChange={(e) => setBranding({...branding, logoUrl: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Announcement Banner Text</label>
                  <input 
                    type="text" 
                    value={branding.announcement}
                    onChange={(e) => setBranding({...branding, announcement: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Hero Background Image URL</label>
                  <input 
                    type="text" 
                    value={branding.heroBg}
                    onChange={(e) => setBranding({...branding, heroBg: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Hero Title</label>
                  <input 
                    type="text" 
                    value={branding.heroTitle}
                    onChange={(e) => setBranding({...branding, heroTitle: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Hero Subtitle</label>
                  <input 
                    type="text" 
                    value={branding.heroSubtitle}
                    onChange={(e) => setBranding({...branding, heroSubtitle: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Add / Edit Products */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" /> {editingProduct ? 'Edit Product Item' : 'Add New Product / Stock'}
              </h2>
              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Product Name</label>
                  <input 
                    type="text" required
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    placeholder="e.g. Ender 3 V3"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select 
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  >
                    <option value="3D Printers">3D Printers</option>
                    <option value="Filaments">Filaments</option>
                    <option value="Spare Parts">Spare Parts</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Price (MMK)</label>
                  <input 
                    type="number" required
                    value={productForm.priceMMK}
                    onChange={(e) => setProductForm({...productForm, priceMMK: e.target.value})}
                    placeholder="e.g. 50000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Price (USD)</label>
                  <input 
                    type="number" required
                    value={productForm.priceUSD}
                    onChange={(e) => setProductForm({...productForm, priceUSD: e.target.value})}
                    placeholder="e.g. 25"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Stock Quantity</label>
                  <input 
                    type="number" required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    placeholder="e.g. 15"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Image URL</label>
                  <input 
                    type="text" required
                    value={productForm.image}
                    onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Specifications / Description</label>
                  <input 
                    type="text" required
                    value={productForm.specs}
                    onChange={(e) => setProductForm({...productForm, specs: e.target.value})}
                    placeholder="Detailed specs..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
                <div className="flex items-end gap-3 md:col-span-1">
                  <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg transition shadow">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  {editingProduct && (
                    <button 
                      type="button" 
                      onClick={() => { setEditingProduct(null); setProductForm({ name: '', category: '3D Printers', priceMMK: '', priceUSD: '', stock: '', image: '', specs: '' }); }}
                      className="bg-slate-700 hover:bg-slate-600 text-white py-2.5 px-4 rounded-lg transition text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </section>

            {/* Section 3: Product Inventory Table */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-hidden">
              <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" /> Current Inventory & Stock List
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock Qty</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {products.map(prod => (
                      <tr key={prod.id} className="hover:bg-slate-800/50">
                        <td className="p-3 flex items-center gap-3">
                          <img src={prod.image} alt="" className="w-10 h-10 rounded object-cover border border-slate-700" />
                          <div>
                            <div className="font-bold text-white">{prod.name}</div>
                            <div className="text-xs text-slate-400 truncate max-w-xs">{prod.specs}</div>
                          </div>
                        </td>
                        <td className="p-3"><span className="bg-slate-800 px-2.5 py-1 rounded-full text-xs text-teal-300 border border-slate-700">{prod.category}</span></td>
                        <td className="p-3 font-semibold text-teal-400">{prod.priceMMK.toLocaleString()} MMK</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${prod.stock > 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                            {prod.stock > 0 ? `${prod.stock} units` : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button onClick={() => startEditProduct(prod)} className="bg-slate-800 hover:bg-slate-700 text-teal-400 p-2 rounded-lg transition border border-slate-700">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteProduct(prod.id)} className="bg-rose-950/50 hover:bg-rose-900 text-rose-400 p-2 rounded-lg transition border border-rose-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4: Customer Orders Log */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Customer Orders Log ({orders.length})
              </h2>
              {orders.length === 0 ? (
                <p className="text-slate-400 text-sm py-4">No orders placed yet.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3 mb-3">
                        <div>
                          <span className="font-bold text-white">Order #{order.id}</span>
                          <span className="text-xs text-slate-400 ml-3">{order.date}</span>
                        </div>
                        <div className="text-teal-400 font-bold">Total: {order.totalMMK.toLocaleString()} MMK</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Customer Info</div>
                          <p className="text-white font-medium">{order.customer.name} ({order.customer.phone})</p>
                          <p className="text-slate-300 text-xs">{order.customer.address}</p>
                          <p className="text-teal-300 text-xs mt-1">Payment: {order.customer.paymentMethod}</p>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Purchased Items</div>
                          <ul className="space-y-1">
                            {order.items.map(item => (
                              <li key={item.id} className="text-xs text-slate-300 flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-semibold">{(item.priceMMK * item.quantity).toLocaleString()} MMK</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        ) : (
          // ================= CUSTOMER STOREFRONT =================
          <div>
            {/* Product Detail Modal */}
            {selectedProduct ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 mb-6 font-medium text-sm transition"
                >
                  <ArrowLeft className="w-4 h-4" /> <span>Back to Catalog</span>
                </button>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-96 object-cover" />
                    <span className="absolute top-4 left-4 bg-teal-500 text-slate-950 font-bold px-3 py-1 rounded-full text-xs shadow">
                      {selectedProduct.category}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between space-y-6">
                    <div>
                      <h1 className="text-3xl font-black text-white">{selectedProduct.name}</h1>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-2xl font-extrabold text-teal-400">{selectedProduct.priceMMK.toLocaleString()} MMK</span>
                        <span className="text-slate-400 text-sm">(${selectedProduct.priceUSD} USD)</span>
                      </div>
                      <div className="mt-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${selectedProduct.stock > 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                          {selectedProduct.stock > 0 ? `In Stock: ${selectedProduct.stock} available` : 'Out of Stock (ကုန်သွားပါပြီ)'}
                        </span>
                      </div>
                      <div className="mt-6 border-t border-slate-800 pt-6">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Specifications</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">{selectedProduct.specs}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button 
                        onClick={() => addToCart(selectedProduct)}
                        disabled={selectedProduct.stock <= 0}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition shadow-xl ${
                          selectedProduct.stock > 0 
                            ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20' 
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        }`}
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>{selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* Hero Section */}
                <div className="relative bg-slate-900 border-b border-slate-800 overflow-hidden py-16 lg:py-24">
                  <div className="absolute inset-0 z-0 opacity-20">
                    <img src={branding.heroBg} alt="Hero Background" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
                      {branding.heroTitle}
                    </h1>
                    <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
                      {branding.heroSubtitle}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                      <a href="#catalog" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-teal-500/20 flex items-center gap-2">
                        Explore Products <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Catalog Section */}
                <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                  
                  {/* Category Filter Tabs */}
                  <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 space-x-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                          selectedCategory === cat 
                            ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20' 
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                      <div 
                        key={product.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-teal-500/50 transition flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative h-52 overflow-hidden bg-slate-950 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-teal-300 font-semibold px-2.5 py-1 rounded-full text-xs border border-slate-700">
                              {product.category}
                            </span>
                            {product.stock <= 0 && (
                              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center">
                                <span className="bg-rose-950 text-rose-400 font-bold px-4 py-2 rounded-xl border border-rose-800 text-sm">
                                  Out of Stock (ကုန်သွားပါပြီ)
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-5 space-y-3">
                            <h3 onClick={() => setSelectedProduct(product)} className="font-bold text-white text-lg cursor-pointer hover:text-teal-400 transition line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-slate-400 text-xs line-clamp-2">{product.specs}</p>
                            <div className="flex items-baseline justify-between pt-2">
                              <span className="text-lg font-extrabold text-teal-400">{product.priceMMK.toLocaleString()} MMK</span>
                              <span className="text-xs text-slate-500">Stock: {product.stock}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 pt-0">
                          <button 
                            onClick={() => addToCart(product)}
                            disabled={product.stock <= 0}
                            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition ${
                              product.stock > 0 
                                ? 'bg-teal-600 hover:bg-teal-500 text-slate-950 shadow-md shadow-teal-600/20' 
                                : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
                            }`}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
                      <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-white">No products found</h3>
                      <p className="text-slate-400 text-sm mt-1">Try searching for something else or switch categories.</p>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="text-teal-400 w-5 h-5" /> Your Shopping Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-center justify-between gap-4">
                      <img src={item.image} alt="" className="w-16 h-16 rounded-lg object-cover border border-slate-700" />
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                        <div className="text-teal-400 text-sm font-semibold mt-1">{item.priceMMK.toLocaleString()} MMK</div>
                        <div className="flex items-center space-x-3 mt-2">
                          <button onClick={() => updateCartQuantity(item.id, -1)} className="bg-slate-700 hover:bg-slate-600 w-6 h-6 rounded flex items-center justify-center text-white font-bold">-</button>
                          <span className="text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, 1)} className="bg-slate-700 hover:bg-slate-600 w-6 h-6 rounded flex items-center justify-center text-white font-bold">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-rose-400 hover:text-rose-300 p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-800 space-y-4 bg-slate-950">
                  <div className="flex justify-between items-center text-lg font-bold text-white">
                    <span>Total Amount:</span>
                    <span className="text-teal-400">{cartTotalMMK.toLocaleString()} MMK</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-teal-500/20"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsCheckoutOpen(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Checkout & Order Details</h3>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                <input type="text" name="name" required placeholder="Mg Mg" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                <input type="tel" name="phone" required placeholder="09-XXXXXXXXX" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Delivery Address</label>
                <textarea name="address" required rows="3" placeholder="Street, Township, City" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200"></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Payment Method</label>
                <select name="paymentMethod" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200">
                  <option value="KBZ Pay / Wave Pay">KBZ Pay / Wave Pay</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                </select>
              </div>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Total Payable:</span>
                  <div className="text-lg font-bold text-teal-400">{cartTotalMMK.toLocaleString()} MMK</div>
                </div>
                <button type="submit" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-teal-500/20">
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-10 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="font-bold text-white">{branding.siteName} — Professional 3D Printers & High-Grade Filaments</p>
          <p className="text-xs text-slate-500">© 2026 EverSafe Store. All rights reserved. Powered by React & Vercel.</p>
        </div>
      </footer>

    </div>
  );
}
