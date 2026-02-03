import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants.tsx';

const Shop: React.FC = () => {
  const { setSelectedProductId, setCurrentPage } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000);

  const products = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || p.category === category;
      const matchPrice = p.price <= maxPrice;
      return matchSearch && matchCat && matchPrice;
    });
  }, [search, category, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Filter Products</h3>
            
            <div className="mb-8">
              <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Categories</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="cat-all" 
                    name="category" 
                    checked={category === 'All'} 
                    onChange={() => setCategory('All')} 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="cat-all" className="ml-2 text-sm text-gray-700 cursor-pointer">All Categories</label>
                </div>
                {CATEGORIES.map(cat => (
                  <div key={cat.id} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`cat-${cat.id}`} 
                      name="category" 
                      checked={category === cat.name} 
                      onChange={() => setCategory(cat.name)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`cat-${cat.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">{cat.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Price Range (Max)</label>
              <input 
                type="range" 
                min="0" max="5000" step="100" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs font-bold text-gray-900 mt-2">
                <span>$0</span>
                <span>${maxPrice}</span>
              </div>
            </div>

            <button 
              onClick={() => { setSearch(''); setCategory('All'); setMaxPrice(5000); }}
              className="w-full py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Main Product Grid */}
        <div className="flex-grow">
          {/* Top Bar */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">Showing <strong>{products.length}</strong> wholesale products</p>
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search inventory..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => (
                <div 
                  key={p.id}
                  onClick={() => { setSelectedProductId(p.id); setCurrentPage('product'); }}
                  className="bg-white rounded border border-gray-200 overflow-hidden standard-card-hover cursor-pointer flex flex-col"
                >
                  <img src={p.image} className="h-48 w-full object-cover" alt={p.name} />
                  <div className="p-4 flex-grow flex flex-col">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter mb-1">{p.category}</span>
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-1">{p.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">{p.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                      <div>
                        <p className="text-lg font-bold text-gray-900">${p.price.toFixed(2)}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-medium">Min order: {p.moq} units</p>
                      </div>
                      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 shadow-sm transition-colors">
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 border-dashed rounded-lg py-20 text-center">
              <i className="fa-solid fa-box-open text-4xl text-gray-200 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;