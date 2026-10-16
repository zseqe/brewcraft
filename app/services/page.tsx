"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, X, ArrowRight, CheckCircle2, Coffee, Cpu, Loader2, Receipt, Trash2, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Combined Database (Beans & Gear) - Expanded for easy editing
const products = [
  // --- OUR HARVEST (BEANS) ---
  { 
    id: 1, 
    type: "Harvest", 
    name: "Raw Arabica Seeds (Green)", 
    category: "Green Seeds", 
    price: 15.00, 
    metric: "Unroasted / High Altitude", 
    notes: ["Floral", "Grassy", "Raw"], 
    image: "https://images.pexels.com/photos/32356370/pexels-photo-32356370.jpeg", 
    description: "Raw, unroasted Arabica seeds perfect for home roasters. These green beans retain all their natural moisture and organic acids, ready to be profiled exactly to your liking." 
  },
  { 
    id: 2, 
    type: "Harvest", 
    name: "Sun-Dried Robusta Seeds", 
    category: "Green Seeds", 
    price: 13.50, 
    metric: "Unroasted / Natural Process", 
    notes: ["Earthy", "Woody", "High Caffeine"], 
    image: "https://images.pexels.com/photos/4815900/pexels-photo-4815900.jpeg", 
    description: "Unwashed robusta seeds dried directly in the fruit. These dense green seeds produce an incredibly heavy body and thick crema when roasted for espresso." 
  },
  { 
    id: 3, 
    type: "Harvest", 
    name: "Mysuru Estate Peaberry", 
    category: "Single Origin", 
    price: 26.00, 
    metric: "Natural / Peaberry / 1400m", 
    notes: ["Jackfruit", "Cacao Nibs", "Spiced Rum"], 
    image: "https://images.pexels.com/photos/2562555/pexels-photo-2562555.jpeg", 
    description: "A rare genetic mutation where only one round seed grows inside the coffee cherry. Sourced locally from the estates surrounding Mysuru, this bean roasts incredibly evenly and delivers a dense, syrupy cup." 
  },
  { 
    id: 4, 
    type: "Harvest", 
    name: "Ethiopia Yirgacheffe", 
    category: "Single Origin", 
    price: 22.00, 
    metric: "Washed / Heirloom / 1900m", 
    notes: ["Jasmine", "Peach", "Black Tea"], 
    image: "https://images.pexels.com/photos/33788268/pexels-photo-33788268.jpeg", 
    description: "Grown in the iron-rich soils of the Kochere micro-region, these beautifully uniform washed beans are celebrated for their bright, tea-like body and intense floral aromatics." 
  },
  { 
    id: 5, 
    type: "Harvest", 
    name: "Colombia Supremo", 
    category: "Single Origin", 
    price: 19.50, 
    metric: "Washed / Caturra / 1750m", 
    notes: ["Caramel", "Red Apple", "Milk Chocolate"], 
    image: "https://images.pexels.com/photos/6239866/pexels-photo-6239866.jpeg", 
    description: "A staple of the Huila region. The slow maturation at high altitudes creates a large, dense bean that roasts beautifully, highlighting deep caramel sweetness and red fruit acidity." 
  },
  { 
    id: 6, 
    type: "Harvest", 
    name: "Thermodynamic Espresso", 
    category: "Blends", 
    price: 24.00, 
    metric: "Omni-Roast / 3-Bean Origin", 
    notes: ["Molasses", "Dark Cherry", "Crema"], 
    image: "https://images.pexels.com/photos/25409661/pexels-photo-25409661.jpeg", 
    description: "Our flagship espresso base. By combining a low-acidity Brazilian natural with a bright Ethiopian washed, we've engineered a blend that punches perfectly through milk while maintaining complex fruit notes." 
  },
  { 
    id: 7, 
    type: "Harvest", 
    name: "Algorithmic Dark Roast", 
    category: "Blends", 
    price: 21.00, 
    metric: "Washed / Data-Driven Curve", 
    notes: ["Toffee", "Almond", "Berry Jam"], 
    image: "https://images.pexels.com/photos/7507352/pexels-photo-7507352.jpeg", 
    description: "Engineered using predictive models to map the perfect heat curve. We optimize the airflow parameters minute-by-minute to maximize caramelization without ever tipping into bitterness or ash." 
  },
  { 
    id: 8, 
    type: "Harvest", 
    name: "Panama Gesha Reserve", 
    category: "Micro-Lots", 
    price: 65.00, 
    metric: "Washed / Gesha / 1800m", 
    notes: ["Bergamot", "Honeysuckle", "Papaya"], 
    image: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=800&auto=format&fit=crop", 
    description: "One of the rarest coffee seeds in the world. This exceptionally elongated bean requires extreme care during roasting, resulting in a profoundly delicate cup resembling fine Earl Grey tea." 
  },
  { 
    id: 9, 
    type: "Harvest", 
    name: "Monsoon Malabar AA", 
    category: "Micro-Lots", 
    price: 28.00, 
    metric: "Monsooned / Kent / 1200m", 
    notes: ["Dark Cocoa", "Tobacco", "Heavy Body"], 
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1061&auto=format&fit=crop", 
    description: "These raw seeds are exposed to the moisture-laden monsoon winds of the Malabar Coast for months. They swell, turn pale gold, and lose almost all their acidity, creating an incredibly thick and earthy shot." 
  },
  { 
    id: 10, 
    type: "Harvest", 
    name: "Pacamara Giant Beans", 
    category: "Micro-Lots", 
    price: 32.00, 
    metric: "Honey Process / Pacamara", 
    notes: ["Plum", "Brown Sugar", "Citrus"], 
    image: "https://images.pexels.com/photos/19749806/pexels-photo-19749806.jpeg", 
    description: "A hybrid seed famous for its massive size. Due to the high surface area, heat penetrates the bean differently during roasting, demanding a specialized curve to unlock its rich plum and brown sugar sweetness." 
  },

  // --- PRO GEAR (HARDWARE) ---
  { 
    id: 11, 
    type: "Gear", 
    name: "Semi-Automatic Espresso", 
    category: "Machines", 
    price: 1250.00, 
    metric: "PID Control / Rotary Pump", 
    notes: ["Manual Tamp", "Pro Steam"], 
    image: "https://images.pexels.com/photos/30298107/pexels-photo-30298107.jpeg", 
    description: "Total control over your extraction. Perfect for enthusiasts who want to manage their own grind size, tamping, and yield." 
  },
  { 
    id: 12, 
    type: "Gear", 
    name: "Super-Automatic Machine", 
    category: "Machines", 
    price: 2400.00, 
    metric: "Bean-to-Cup / Touchscreen", 
    notes: ["Auto-Froth", "Built-in Grinder"], 
    image: "https://images.pexels.com/photos/34369008/pexels-photo-34369008.jpeg", 
    description: "Cafe-quality espresso at the touch of a button. Automatically grinds, tamps, extracts, and froths milk." 
  },
  { 
    id: 13, 
    type: "Gear", 
    name: "Precision Flat Burr Grinder", 
    category: "Grinders", 
    price: 450.00, 
    metric: "64mm Steel Burrs / Stepless", 
    notes: ["Zero Retention", "Anti-Static"], 
    image: "https://images.pexels.com/photos/6533958/pexels-photo-6533958.jpeg", 
    description: "Stepless flat burrs provide incredible particle uniformity, bringing out complex flavor notes in light roasts." 
  },
  { 
    id: 14, 
    type: "Gear", 
    name: "Conical Burr Hand Grinder", 
    category: "Grinders", 
    price: 120.00, 
    metric: "Titanium Burrs / Manual", 
    notes: ["Travel Ready", "High Torque"], 
    image: "https://images.pexels.com/photos/34263263/pexels-photo-34263263.jpeg", 
    description: "Aircraft-grade aluminum body with titanium-coated conical burrs for fast, effortless manual grinding." 
  },
  { 
    id: 15, 
    type: "Gear", 
    name: "V60 Copper Dripper", 
    category: "Brewing", 
    price: 55.00, 
    metric: "Size 02 / High Heat Retention", 
    notes: ["Fast Drain", "Crisp Cup"], 
    image: "https://images.pexels.com/photos/5567650/pexels-photo-5567650.jpeg", 
    description: "The industry standard for pour-over coffee. The copper body ensures maximum heat retention during the bloom phase." 
  },
  { 
    id: 16, 
    type: "Gear", 
    name: "Glass Chemex Carafe", 
    category: "Brewing", 
    price: 45.00, 
    metric: "8-Cup / Borosilicate Glass", 
    notes: ["Clean Cup", "Thick Filters"], 
    image: "https://images.pexels.com/photos/30704968/pexels-photo-30704968.jpeg", 
    description: "An iconic piece of design that brews an incredibly clean, tea-like cup of coffee by filtering out all oils and fines." 
  },
  { 
    id: 17, 
    type: "Gear", 
    name: "Bottomless Portafilter", 
    category: "Accessories", 
    price: 65.00, 
    metric: "58mm / Walnut Handle", 
    notes: ["Diagnose Shots", "Beautiful Crema"], 
    image: "https://images.pexels.com/photos/18075759/pexels-photo-18075759.jpeg", 
    description: "Watch your extraction in real-time. Naked portafilters help diagnose channeling and tamping inconsistencies." 
  },
  { 
    id: 18, 
    type: "Gear", 
    name: "Calibrated Tamper", 
    category: "Accessories", 
    price: 85.00, 
    metric: "30lb Spring Load / Stainless", 
    notes: ["Level Tamp", "Ergonomic"], 
    image: "https://images.pexels.com/photos/8936986/pexels-photo-8936986.jpeg", 
    description: "Eliminate human error. This tamper clicks precisely when you hit 30 pounds of pressure, ensuring a perfectly level puck." 
  },
  { 
    id: 19, 
    type: "Gear", 
    name: "Teflon Milk Pitcher", 
    category: "Milk Gear", 
    price: 28.00, 
    metric: "12oz / Precision Spout", 
    notes: ["Latte Art", "Non-Stick"], 
    image: "https://images.pexels.com/photos/13882006/pexels-photo-13882006.jpeg", 
    description: "Designed specifically for latte art. The sharp spout allows for high-contrast, detailed pouring patterns." 
  },
  { 
    id: 20, 
    type: "Gear", 
    name: "Bluetooth Dosing Scale", 
    category: "Measurement", 
    price: 110.00, 
    metric: "0.1g Accuracy / Rapid Response", 
    notes: ["Auto-Timer", "App Sync"], 
    image: "https://images.pexels.com/photos/7833021/pexels-photo-7833021.jpeg", 
    description: "Measure your dose and yield down to the decigram. Features a rapid-response processor to prevent lag during fast espresso shots." 
  },
  { 
    id: 21, 
    type: "Gear", 
    name: "Variable Temp Gooseneck", 
    category: "Kettles", 
    price: 145.00, 
    metric: "1200W / PID Controller", 
    notes: ["Hold Mode", "Flow Control"], 
    image: "https://images.pexels.com/photos/34534521/pexels-photo-34534521.jpeg", 
    description: "Dial in your exact water temperature and hold it for 60 minutes. The gooseneck spout guarantees perfect agitation for pour-overs." 
  },
  { 
    id: 22, 
    type: "Gear", 
    name: "Ceramic Latte Cups (Set of 2)", 
    category: "Serving", 
    price: 34.00, 
    metric: "10oz / Thick Walled", 
    notes: ["Heat Retention", "Stackable"], 
    image: "https://images.pexels.com/photos/10206600/pexels-photo-10206600.jpeg", 
    description: "Competition-style ceramic cups with a curved internal base specifically engineered to preserve crema during the pour." 
  }
];

const beanCategories = ["All", "Single Origin", "Blends", "Micro-Lots", "Green Seeds"];
const gearCategories = ["All", "Machines", "Grinders", "Brewing", "Accessories", "Milk Gear", "Measurement", "Kettles", "Serving"];

type CartItem = typeof products[number] & { cartId: string };

export default function Services() {
  const { user, setShowAuthModal, setAuthTriggerCallback } = useAuth();

  const [activeView, setActiveView] = useState("Harvest"); 
  const [activeCategory, setActiveCategory] = useState("All"); 
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedItem, setAddedItem] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[number] | null>(null);

  // Checkout States
  const [isCheckoutProcessing, setIsCheckoutProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("");
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setActiveCategory("All");
  };

  const currentViewProducts = products.filter(p => p.type === activeView);
  const filteredProducts = activeCategory === "All" 
    ? currentViewProducts 
    : currentViewProducts.filter(p => p.category === activeCategory);

  const currentCategories = activeView === "Harvest" ? beanCategories : gearCategories;
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (e: React.MouseEvent, product: typeof products[number]) => {
    e.stopPropagation();
    const cartItem: CartItem = { ...product, cartId: `${product.id}-${Date.now()}` };
    setCart(prev => [...prev, cartItem]);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Checkout — requires auth
  const handleCheckoutClick = () => {
    if (!user) {
      // Not logged in — show auth modal, then proceed to checkout after login
      setAuthTriggerCallback(() => () => {
        setIsCartOpen(false);
        doCheckout();
      });
      setShowAuthModal(true);
      return;
    }
    setIsCartOpen(false);
    doCheckout();
  };

  const doCheckout = () => {
    setFinalTotal(cartTotal);
    setIsCheckoutProcessing(true);
    setCheckoutStep("Verifying inventory levels...");

    setTimeout(() => {
      setCheckoutStep("Encrypting payment details...");
      setTimeout(() => {
        setCheckoutStep("Provisioning order for dispatch...");
        setTimeout(() => {
          setIsCheckoutProcessing(false);
          setIsOrderConfirmed(true);
          setOrderId(`ORD-${Math.floor(Math.random() * 10000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`);
          setCart([]);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-12 pb-24">
      {/* Header Area */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">The Catalog</h1>
          <p className="text-gray-400">Explore our curated bean harvests and precision brewing equipment.</p>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-3 px-6 py-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl text-white transition-all shadow-lg group"
        >
          <ShoppingBag size={20} className="text-[#d97706] group-hover:scale-110 transition-transform" />
          <span className="font-medium">View Cart</span>
          {cart.length > 0 && (
            <motion.span
              key={cart.length}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#d97706] text-white text-xs font-bold flex items-center justify-center shadow-lg"
            >
              {cart.length}
            </motion.span>
          )}
        </button>
      </div>

      {/* Master View Toggle (Harvest vs Gear) */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-center">
        <div className="flex bg-white/[0.02] p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => handleViewChange("Harvest")}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
              activeView === "Harvest" ? "bg-[#d97706] text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <Coffee size={18} /> Our Harvest
          </button>
          <button 
            onClick={() => handleViewChange("Gear")}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
              activeView === "Gear" ? "bg-[#d97706] text-white shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            <Cpu size={18} /> Pro Gear
          </button>
        </div>
      </div>

      {/* Sub-Category Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap gap-3 justify-center border-b border-white/5 pb-8">
        {currentCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat 
                ? "bg-white/[0.08] text-white border border-white/20" 
                : "bg-transparent text-gray-500 hover:text-gray-300 border border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all cursor-pointer shadow-lg hover:shadow-[#d97706]/5"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-semibold text-white uppercase tracking-wider border border-white/10">
                    {product.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow relative z-10 bg-[#0a0a0a]">
                  <div className="mb-4 flex-grow">
                    <h3 className="text-lg font-bold text-white leading-tight mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-4">{product.metric}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.map((note, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/[0.05] text-gray-300 border border-white/10">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={(e) => addToCart(e, product)}
                      disabled={addedItem === product.id}
                      className={`p-3 rounded-lg transition-all ${
                        addedItem === product.id 
                          ? "bg-green-500/20 text-green-500" 
                          : "bg-[#d97706]/10 text-[#d97706] hover:bg-[#d97706] hover:text-white"
                      }`}
                      title="Add to cart"
                    >
                      {addedItem === product.id ? <CheckCircle2 size={20} /> : <Plus size={20} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl max-w-2xl w-full relative shadow-2xl flex flex-col md:flex-row gap-8"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10 bg-black/50 p-2 rounded-full backdrop-blur-sm border border-white/10"
              >
                <X size={20} />
              </button>
              
              <div className="relative h-64 md:h-auto w-full md:w-1/2 rounded-xl overflow-hidden border border-white/10">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-[#d97706] text-xs font-bold tracking-widest uppercase mb-2">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedProduct.name}</h2>
                <p className="text-sm text-gray-400 mb-6 pb-6 border-b border-white/10">
                  {selectedProduct.metric}
                </p>
                <p className="text-gray-300 leading-relaxed mb-8 text-sm">
                  {selectedProduct.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-white">${selectedProduct.price.toFixed(2)}</span>
                  <button 
                    onClick={(e) => {
                      addToCart(e, selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold flex items-center gap-2 transition"
                  >
                    Add to Order <Plus size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag size={20} className="text-[#d97706]" /> Your Order
                  {cart.length > 0 && (
                    <span className="text-sm font-normal text-gray-400 ml-1">({cart.length} item{cart.length !== 1 ? "s" : ""})</span>
                  )}
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-white transition p-1">
                  <X size={24} />
                </button>
              </div>

              {/* Auth nudge banner (if not logged in and cart has items) */}
              {!user && cart.length > 0 && (
                <div className="mx-4 mt-4 px-4 py-3 rounded-xl bg-[#d97706]/10 border border-[#d97706]/20 flex items-start gap-3">
                  <User size={16} className="text-[#d97706] mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-300">
                    <span className="text-[#d97706] font-semibold">Sign in</span> to track your orders and save your preferences. Or continue as guest.
                  </p>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p>Your cart is empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-sm text-[#d97706] hover:underline"
                    >
                      Browse the catalog →
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.cartId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 group"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white leading-tight mb-1 truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500 mb-2">{item.type} | {item.category}</p>
                          <span className="text-sm font-bold text-[#d97706]">${item.price.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-gray-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100 shrink-0 self-start"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-white/[0.01]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleCheckoutClick}
                    className="w-full py-4 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-[#d97706]/20 mb-3"
                  >
                    {user ? "Proceed to Checkout" : "Sign In & Checkout"} <ArrowRight size={18} />
                  </button>
                  {!user && (
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        // guest checkout — login as guest then checkout
                        setAuthTriggerCallback(() => () => {
                          doCheckout();
                        });
                        setShowAuthModal(true);
                      }}
                      className="w-full py-3 rounded-xl bg-transparent hover:bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white text-sm font-medium flex items-center justify-center gap-2 transition"
                    >
                      <User size={15} /> Continue as Guest
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Processing Modal */}
      <AnimatePresence>
        {isCheckoutProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-[#0a0a0a] border border-white/10 p-12 rounded-2xl flex flex-col items-center text-center shadow-2xl max-w-sm w-full"
            >
              <div className="relative mb-6">
                <Loader2 className="animate-spin text-[#d97706]" size={48} />
                <div className="absolute inset-0 bg-[#d97706]/20 rounded-full blur-xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Processing Secure Checkout</h3>
              <p className="text-gray-400 text-sm animate-pulse">{checkoutStep}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Confirmed Receipt Modal */}
      <AnimatePresence>
        {isOrderConfirmed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6 mx-auto border border-emerald-500/30"
              >
                <CheckCircle2 size={32} />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-white text-center mb-2">Order Confirmed!</h2>
              <p className="text-gray-400 text-center text-sm mb-8">Your items are being prepped for dispatch.</p>
              
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Receipt size={16} /> Order ID
                  </span>
                  <span className="text-white font-mono font-bold tracking-wider">{orderId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Paid</span>
                  <span className="text-[#d97706] text-xl font-bold">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsOrderConfirmed(false)}
                className="w-full py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold transition"
              >
                Return to Catalog
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}