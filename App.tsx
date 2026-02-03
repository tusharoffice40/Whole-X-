import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Shop from './pages/Shop.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Cart from './pages/Cart.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Auth from './pages/Auth.tsx';

const PageRenderer: React.FC = () => {
  const { currentPage, selectedProductId } = useApp();

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

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <PageRenderer />
      </main>
      <footer className="bg-gray-900 text-white py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">WholeX</h3>
            <p className="text-gray-400 text-sm">
              Digitizing the B2B wholesale experience for a global marketplace.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Marketplace</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><button className="hover:text-blue-400">All Products</button></li>
              <li><button className="hover:text-blue-400">Categories</button></li>
              <li><button className="hover:text-blue-400">Top Wholesalers</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><button className="hover:text-blue-400">Help Center</button></li>
              <li><button className="hover:text-blue-400">Shipping Info</button></li>
              <li><button className="hover:text-blue-400">Returns</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <div className="flex space-x-4">
              <i className="fa-brands fa-linkedin text-xl cursor-pointer hover:text-blue-400"></i>
              <i className="fa-brands fa-twitter text-xl cursor-pointer hover:text-blue-400"></i>
              <i className="fa-brands fa-facebook text-xl cursor-pointer hover:text-blue-400"></i>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          © 2024 WholeX B2B Marketplace. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
};

export default App;