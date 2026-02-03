import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { UserRole } from '../types.ts';

const Dashboard: React.FC = () => {
  const { user, orders } = useApp();
  const [tab, setTab] = useState<'overview' | 'orders' | 'inventory'>('overview');

  if (!user) return <div className="p-20 text-center text-gray-500">Please sign in to view your dashboard.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your wholesale activity and profile</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center">
            <i className="fa-solid fa-check-circle mr-2"></i> Verified {user.role}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Signed in as</p>
              <p className="font-bold text-gray-900 truncate">{user.name}</p>
            </div>
            <nav className="p-2 space-y-1">
              <button 
                onClick={() => setTab('overview')}
                className={`w-full text-left px-4 py-2.5 rounded text-sm font-medium transition-colors ${tab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <i className="fa-solid fa-house-chimney w-6 text-center mr-2"></i> Overview
              </button>
              <button 
                onClick={() => setTab('orders')}
                className={`w-full text-left px-4 py-2.5 rounded text-sm font-medium transition-colors ${tab === 'orders' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <i className="fa-solid fa-file-invoice-dollar w-6 text-center mr-2"></i> Orders
              </button>
              {user.role === UserRole.WHOLESALER && (
                <button 
                  onClick={() => setTab('inventory')}
                  className={`w-full text-left px-4 py-2.5 rounded text-sm font-medium transition-colors ${tab === 'inventory' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <i className="fa-solid fa-boxes-stacked w-6 text-center mr-2"></i> Inventory
                </button>
              )}
            </nav>
          </div>
        </aside>

        <main className="flex-grow">
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Total Spent</p>
                  <h3 className="text-2xl font-bold text-gray-900">${orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}</h3>
                </div>
                <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-900">{orders.length}</h3>
                </div>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-900">Your Order History</span>
              </div>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                      <tr>
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-blue-600">{o.id}</td>
                          <td className="px-6 py-4 text-gray-600">{new Date(o.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 font-bold text-gray-900">${o.totalAmount.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-20 text-center">
                   <p className="text-gray-400">No orders placed yet.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;