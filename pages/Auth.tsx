
import React, { useState } from 'react';
import { useApp } from '../App.tsx';
import { UserRole } from '../types.ts';

const Auth: React.FC = () => {
  const { setUser, setCurrentPage } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>(UserRole.BUYER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: 'usr-' + Date.now(),
      name: 'Demo Partner',
      email: 'demo@wholex.com',
      role: role,
      companyName: 'WholeX Demo Enterprise'
    });
    setCurrentPage('home');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded border border-gray-200 shadow-md p-8">
        <div className="text-center mb-10">
          <div className="bg-blue-600 text-white w-12 h-12 rounded flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{mode === 'login' ? 'Partner Login' : 'Create Business Account'}</h2>
          <p className="text-sm text-gray-500 mt-2">Enter your credentials to access the marketplace.</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded mb-8">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-bold rounded transition-all ${mode === 'login' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-sm font-bold rounded transition-all ${mode === 'register' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">I want to join as a:</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button" 
                  onClick={() => setRole(UserRole.BUYER)}
                  className={`py-2 text-xs font-bold border rounded ${role === UserRole.BUYER ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500'}`}
                >
                  Buyer
                </button>
                <button 
                  type="button" 
                  onClick={() => setRole(UserRole.WHOLESALER)}
                  className={`py-2 text-xs font-bold border rounded ${role === UserRole.WHOLESALER ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500'}`}
                >
                  Wholesaler
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Work Email Address</label>
            <input 
              type="email" required 
              placeholder="example@business.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
            </div>
            <input 
              type="password" required 
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            {mode === 'login' ? 'Sign In to Marketplace' : 'Create My Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
