
import React from 'react';
import { useApp } from '../App.tsx';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants.tsx';

const Home: React.FC = () => {
  const { setCurrentPage, setSelectedProductId } = useApp();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Connect Directly with <br/>
              <span className="text-blue-600">Bulk Wholesalers</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              WholeX is the leading digital marketplace for B2B trade. Source clothing, electronics, and accessories at verified wholesale prices.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <button 
                onClick={() => setCurrentPage('shop')}
                className="bg-blue-600 text-white px-8 py-3.5 rounded font-bold text-lg hover:bg-blue-700 transition-all shadow"
              >
                Browse Marketplace
              </button>
              <button 
                onClick={() => setCurrentPage('auth')}
                className="bg-white text-gray-700 border border-gray-300 px-8 py-3.5 rounded font-bold text-lg hover:bg-gray-50 transition-all"
              >
                Start Selling
              </button>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
                alt="Warehouse Wholesale" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map(cat => (
              <div 
                key={cat.id}
                onClick={() => setCurrentPage('shop')}
                className="bg-white p-6 rounded border border-gray-200 text-center cursor-pointer hover:border-blue-500 hover:shadow-sm transition-all group"
              >
                <div className="text-blue-600 mb-3 text-2xl">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="text-blue-600 font-semibold hover:underline"
            >
              View All Products
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.slice(0, 3).map(product => (
              <div 
                key={product.id}
                className="bg-white rounded border border-gray-200 overflow-hidden standard-card-hover cursor-pointer"
                onClick={() => { setSelectedProductId(product.id); setCurrentPage('product'); }}
              >
                <div className="h-56 relative">
                  <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                  <div className="absolute top-2 right-2 bg-white/90 text-blue-600 text-[10px] px-2 py-1 rounded font-bold border border-blue-100 shadow-sm">
                    MOQ: {product.moq}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)} <span className="text-xs text-gray-500 font-normal">/unit</span></p>
                    <button className="bg-gray-100 p-2 rounded text-gray-700 hover:bg-blue-600 hover:text-white transition-colors">
                      <i className="fa-solid fa-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Grow Your Wholesale Business Today</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of retailers who trust WholeX for their supply chain management. Verified sellers, secure payments, and global logistics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setCurrentPage('auth')} className="bg-white text-blue-600 px-8 py-3 rounded font-bold hover:bg-gray-100 transition-colors shadow">
              Create an Account
            </button>
            <button className="border border-white/40 text-white px-8 py-3 rounded font-bold hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
