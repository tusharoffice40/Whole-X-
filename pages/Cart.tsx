
import React from 'react';
import { useApp } from '../App.tsx';
import { Order } from '../types.ts';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, user, addOrder, setCurrentPage } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!user) {
      setCurrentPage('auth');
      return;
    }
    
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      buyerId: user.id,
      items: [...cart],
      totalAmount: total,
      status: 'PENDING',
      date: new Date().toISOString()
    };

    addOrder(newOrder);
    clearCart();
    alert('Order placed successfully! Check your dashboard for tracking.');
    setCurrentPage('dashboard');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-cart-shopping text-4xl text-gray-300"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Browse our marketplace to find high-quality wholesale inventory for your business.</p>
        <button 
          onClick={() => setCurrentPage('shop')}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Bulk Purchase Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest mb-2">{item.category}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm">
                  <span className="text-gray-500">Price: <span className="font-bold text-gray-900">${item.price}</span></span>
                  <span className="text-gray-500">MOQ: <span className="font-bold text-gray-900">{item.moq}</span></span>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end space-y-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Item Total</p>
                  <p className="text-xl font-bold text-indigo-600">${(item.price * item.quantity).toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 font-medium">({item.quantity} units)</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 text-sm font-bold flex items-center transition-colors"
                >
                  <i className="fa-solid fa-trash-can mr-2"></i> Remove
                </button>
              </div>
            </div>
          ))}
          
          <button 
            onClick={clearCart}
            className="text-gray-400 hover:text-gray-600 font-bold text-sm uppercase tracking-widest"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-xl sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Bulk Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping & Logistics</span>
                <span className="font-bold text-gray-900">{shipping === 0 ? 'FREE' : `$${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-gray-900">${tax.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-indigo-600">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-2xl mb-8 border border-indigo-100">
              <div className="flex items-center space-x-3 text-indigo-700">
                <i className="fa-solid fa-circle-info"></i>
                <p className="text-xs font-semibold">Bulk discount of 5% applied for orders over $10,000.</p>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center"
            >
              Complete Wholesale Order
              <i className="fa-solid fa-arrow-right ml-3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
