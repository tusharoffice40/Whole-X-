import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';

const Navbar: React.FC = () => {
  const { user, cart, setCurrentPage, currentPage } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart.length;

  return (
    <nav className="bg-white border-b border-slate-200 fixed top-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => setCurrentPage('home')}
          >
            <div className="bg-blue-600 text-white p-1.5 rounded transition-transform group-hover:scale-105">
              <i className="fa-solid fa-store"></i>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">WholeX</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-semibold transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className={`text-sm font-semibold transition-colors ${currentPage === 'shop' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Marketplace
            </button>
            {user && (
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`text-sm font-semibold transition-colors ${currentPage === 'dashboard' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Dashboard
              </button>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors"
              title="Shopping Cart"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3 pl-5 border-l border-slate-200">
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{user.role}</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm">
                  {user.name.charAt(0)}
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('auth')}
                className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-95"
              >
                Business Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-6 space-y-4 shadow-xl">
          <button onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-semibold text-slate-700">Home</button>
          <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-semibold text-slate-700">Marketplace</button>
          <button onClick={() => { setCurrentPage('dashboard'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-semibold text-slate-700">Dashboard</button>
          <button onClick={() => { setCurrentPage('cart'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-semibold text-slate-700">Cart ({cartItemCount})</button>
          <div className="pt-4">
            <button onClick={() => { setCurrentPage('auth'); setIsMobileMenuOpen(false); }} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Sign In</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;