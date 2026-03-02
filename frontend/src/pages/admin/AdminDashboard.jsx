import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiEye, FiMoreVertical } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";

const AdminDashboard = () => {
  const { isDarkMode } = useOutletContext();

  const recentOrders = [
    { id: "#ORD001", customer: "John Doe", date: "2024-01-15", total: "$156.00", status: "Delivered", items: 3 },
    { id: "#ORD002", customer: "Jane Smith", date: "2024-01-14", total: "$89.50", status: "Processing", items: 2 },
    { id: "#ORD003", customer: "Bob Wilson", date: "2024-01-14", total: "$234.00", status: "Shipped", items: 4 },
    { id: "#ORD004", customer: "Alice Brown", date: "2024-01-13", total: "$67.00", status: "Pending", items: 1 },
    { id: "#ORD005", customer: "Charlie Lee", date: "2024-01-13", total: "$345.00", status: "Delivered", items: 5 },
  ];

  const topProducts = [
    { name: "Mr. Vapo E-liquid", sales: 234, revenue: "$1,053", stock: 156 },
    { name: "Starter Kit Pro", sales: 189, revenue: "$10,206", stock: 89 },
    { name: "Pod System V2", sales: 156, revenue: "$41,652", stock: 34 },
    { name: "Disposable Vape", sales: 145, revenue: "$6,525", stock: 245 },
    { name: "Charger Bundle", sales: 123, revenue: "$2,460", stock: 67 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Processing': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Shipped': return 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20';
      case 'Pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Recent Orders - Horizontally Scrollable Table */}
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
            }`}
          >
            View All <FiArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Horizontally Scrollable Table Container */}
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
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className={`py-3 px-4 text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.id}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.customer}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.date}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.items}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.total}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className={`p-1 rounded-lg ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <FiEye className="text-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products - Horizontally Scrollable Table */}
      <div className={`rounded-lg sm:rounded-xl border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b dark:border-gray-700">
          <h2 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Top Selling Products
          </h2>
          <Link 
            to="/admin/products" 
            className={`text-xs sm:text-sm flex items-center gap-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            View All <FiArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Horizontally Scrollable Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sales</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Revenue</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock</th>
                <th className={`py-3 px-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td className={`py-3 px-4 text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{product.name}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{product.sales}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{product.revenue}</td>
                  <td className={`py-3 px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{product.stock}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      product.stock > 100 
                        ? 'text-green-500 bg-green-500/10 border-green-500/20'
                        : product.stock > 50
                          ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
                          : 'text-red-500 bg-red-500/10 border-red-500/20'
                    }`}>
                      {product.stock > 100 ? 'In Stock' : product.stock > 50 ? 'Low Stock' : 'Critical'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Summary Cards (Optional - uncomment if needed) */}
      {/* <div className="md:hidden grid grid-cols-1 gap-3 mt-4">
        {recentOrders.map((order) => (
          <div key={order.id} className={`p-4 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{order.id}</span>
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.customer}</p>
            <div className="flex justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Items: {order.items}</span>
              <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>Total: {order.total}</span>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default AdminDashboard;