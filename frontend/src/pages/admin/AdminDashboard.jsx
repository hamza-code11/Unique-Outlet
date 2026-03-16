// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiEye } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import AdminStats from "../../components/admin/AdminStats";
import { API_URL, STORAGE_URL } from "../../config";


// Pre-fetch data immediately
let ordersCache = null;
let dataPromise = null;

// Start fetching data immediately
const fetchOrders = async () => {
  if (dataPromise) return dataPromise;
  
  dataPromise = axios.get(`${API_URL}/orders`, { timeout: 3000 })
    .then(response => {
      if (response.data.success && response.data.orders) {
        ordersCache = response.data.orders.slice(-5).reverse().map(order => ({
          id: `#${order.id}`,
          customer: order.name,
          date: new Date(order.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }),
          total: `$${parseFloat(order.total_amount || 0).toFixed(2)}`,
          status: order.status || 'pending',
          items: order.items?.length || 0,
          originalId: order.id
        }));
      }
      return ordersCache;
    })
    .catch(() => {
      // Fallback data
      ordersCache = [
        { id: "#ORD001", customer: "John Doe", date: "2024-01-15", total: "$156.00", status: "delivered", items: 3 },
        { id: "#ORD002", customer: "Jane Smith", date: "2024-01-14", total: "$89.50", status: "processing", items: 2 },
        { id: "#ORD003", customer: "Bob Wilson", date: "2024-01-14", total: "$234.00", status: "shipped", items: 4 },
        { id: "#ORD004", customer: "Alice Brown", date: "2024-01-13", total: "$67.00", status: "pending", items: 1 },
        { id: "#ORD005", customer: "Charlie Lee", date: "2024-01-13", total: "$345.00", status: "delivered", items: 5 },
      ];
      return ordersCache;
    });
  
  return dataPromise;
};

// Start fetching immediately
fetchOrders();

const AdminDashboard = () => {
  const { isDarkMode } = useOutletContext();
  const [recentOrders, setRecentOrders] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Get data from cache
  useEffect(() => {
    // Use cached data if available
    if (ordersCache) {
      setRecentOrders(ordersCache);
    } else {
      // Fetch if not cached
      fetchOrders().then(data => {
        if (data) setRecentOrders(data);
      });
    }
  }, []);

  // Show component immediately with smooth fade
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const getStatusColor = (status) => {
    const statusMap = {
      'delivered': 'text-green-500 bg-green-500/10 border-green-500/20',
      'completed': 'text-green-500 bg-green-500/10 border-green-500/20',
      'processing': 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      'shipped': 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      'pending': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      'cancelled': 'text-red-500 bg-red-500/10 border-red-500/20'
    };
    
    return statusMap[status?.toLowerCase()] || 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  };

  const handleViewOrder = (orderId) => {
    window.location.href = `/admin/orders/${orderId}`;
  };

  // Remove duplicates
  const uniqueOrders = recentOrders.filter((order, index, self) =>
    index === self.findIndex((o) => o.id === order.id)
  );

  return (
    <div className={`space-y-4 sm:space-y-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Stats Cards */}

      {/* Recent Orders - Only Section */}
      <div className={`rounded-lg sm:rounded-xl border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b dark:border-gray-700">
          <h2 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Orders
          </h2>
          <Link 
            to="/admin/orders" 
            className={`text-xs sm:text-sm flex items-center gap-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } hover:text-blue-600 transition-colors`}
          >
            View All <FiArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Order ID</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customer</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Items</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {uniqueOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className={`py-3 px-4 text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.id}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.customer}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.date}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.items}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.total}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => handleViewOrder(order.originalId)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      title="View Order Details"
                    >
                      <FiEye className="text-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {uniqueOrders.length === 0 && (
          <div className="p-8 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No orders found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;