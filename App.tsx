
import React, { useState, useMemo, createContext, useContext } from 'react';
import { User, UserRole, Product, CartItem, Order } from './types.ts';
import { MOCK_PRODUCTS, DEFAULT_USER } from './constants.tsx';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Shop from './pages/Shop.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Cart from './pages/Cart.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Auth from './pages/Auth.tsx';

// Context for global state
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const contextValue = {
    user, setUser, cart, addToCart, removeFromCart, clearCart, 
    currentPage, setCurrentPage, selectedProductId, setSelectedProductId,
    orders, addOrder
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'shop': return <Shop />;
      case 'product': return <ProductDetail id={selectedProductId!} />;
      case 'cart': return <Cart />;
      case 'dashboard': return <Dashboard />;
      case 'auth': return <Auth />;
      default: return <Home />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          {renderPage()}
        </main>
        <footer className="bg-gray-900 text-white py-12 px-6 mt-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-indigo-400 mb-4">WholeX</h3>
              <p className="text-gray-400 text-sm">
                Digitizing the B2B wholesale experience for a global marketplace.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Marketplace</h4>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li><button onClick={() => setCurrentPage('shop')} className="hover:text-indigo-400">All Products</button></li>
                <li><button className="hover:text-indigo-400">Categories</button></li>
                <li><button className="hover:text-indigo-400">Top Wholesalers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li><button className="hover:text-indigo-400">Help Center</button></li>
                <li><button className="hover:text-indigo-400">Shipping Info</button></li>
                <li><button className="hover:text-indigo-400">Returns</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <div className="flex space-x-4">
                <i className="fa-brands fa-linkedin text-xl cursor-pointer hover:text-indigo-400"></i>
                <i className="fa-brands fa-twitter text-xl cursor-pointer hover:text-indigo-400"></i>
                <i className="fa-brands fa-facebook text-xl cursor-pointer hover:text-indigo-400"></i>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
            © 2024 WholeX B2B Marketplace. All rights reserved.
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  );
};

export default App;
