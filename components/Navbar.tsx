
import React, { useState } from 'react';
import { useApp } from '../App';

const Navbar: React.FC = () => {
  const { user, cart, setCurrentPage, currentPage } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to count items in cart
  const cartItemCount = cart.length;

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="bg-blue-600 text-white p-1.5 rounded">
              <i className="fa-solid fa-store"></i>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">WholeX</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className={`text-sm font-medium ${currentPage === 'shop' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Browse Products
            </button>
            {user && (
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`text-sm font-medium ${currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                My Dashboard
              </button>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 text-gray-500 hover:text-gray-700"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-900 leading-none">{user.name}</p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase mt-0.5">{user.role}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('auth')}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-500"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3 shadow-lg">
          <button onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Home</button>
          <button onClick={() => { setCurrentPage('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Shop</button>
          <button onClick={() => { setCurrentPage('dashboard'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Dashboard</button>
          <button onClick={() => { setCurrentPage('cart'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Cart ({cartItemCount})</button>
          <button onClick={() => { setCurrentPage('auth'); setIsMobileMenuOpen(false); }} className="w-full bg-blue-600 text-white py-2 rounded font-bold">Sign In</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
