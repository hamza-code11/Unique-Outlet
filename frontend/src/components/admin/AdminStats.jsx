// src/components/admin/AdminStats.jsx
import React, { useState, useEffect } from "react";
import { FiDollarSign, FiShoppingCart, FiUsers } from "react-icons/fi";
import { GiCigarette } from "react-icons/gi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const AdminStats = ({ isDarkMode }) => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    previousPeriod: {
      sales: 0,
      orders: 0,
      products: 0,
      customers: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all required data in parallel
      const [
        ordersResponse,
        productsResponse,
        customersResponse,
        previousOrdersResponse
      ] = await Promise.all([
        axios.get(`${API_URL}/orders`), // Get all orders
        axios.get(`${API_URL}/products`), // Get all products
        axios.get(`${API_URL}/users`), // Get all users
        axios.get(`${API_URL}/orders?period=previous`) // Get previous period orders for comparison
      ]);

      // Calculate total sales from orders
      const orders = ordersResponse.data.orders || [];
      const totalSales = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

      // Calculate previous period sales
      const previousOrders = previousOrdersResponse.data.orders || [];
      const previousSales = previousOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

      // Get products count
      const products = productsResponse.data || [];
      const totalProducts = products.length;

      // Get customers count
      const customers = customersResponse.data.users || [];
      const totalCustomers = customers.length;

      // Calculate previous period orders
      const previousOrdersCount = previousOrders.length;

      // Calculate percentage changes
      const salesChange = previousSales > 0 
        ? ((totalSales - previousSales) / previousSales * 100).toFixed(1)
        : totalSales > 0 ? '+100' : '0';

      const ordersChange = previousOrdersCount > 0
        ? ((orders.length - previousOrdersCount) / previousOrdersCount * 100).toFixed(1)
        : orders.length > 0 ? '+100' : '0';

      setStats({
        totalSales,
        totalOrders: orders.length,
        totalProducts,
        totalCustomers,
        previousPeriod: {
          sales: previousSales,
          orders: previousOrdersCount,
          products: 0, // You can implement if needed
          customers: 0 // You can implement if needed
        }
      });

      // Format stats for display
      const displayStats = [
        { 
          title: "Total Sales", 
          value: formatCurrency(totalSales), 
          change: formatChange(salesChange),
          icon: <FiDollarSign />, 
          color: "from-blue-500 to-cyan-500" 
        },
        { 
          title: "Total Orders", 
          value: formatNumber(orders.length), 
          change: formatChange(ordersChange),
          icon: <FiShoppingCart />, 
          color: "from-cyan-500 to-blue-500" 
        },
        { 
          title: "Total Products", 
          value: formatNumber(totalProducts), 
          change: `+${totalProducts}`, // Just show total for products
          icon: <GiCigarette />, 
          color: "from-blue-500 to-cyan-500" 
        },
        { 
          title: "Total Customers", 
          value: formatNumber(totalCustomers), 
          change: `+${totalCustomers}`, // Just show total for customers
          icon: <FiUsers />, 
          color: "from-cyan-500 to-blue-500" 
        },
      ];

      setStats(displayStats);

    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load statistics');
      
      // Fallback to demo data
      setStats([
        { title: "Total Sales", value: "$45,678", change: "+12.5%", icon: <FiDollarSign />, color: "from-blue-500 to-cyan-500" },
        { title: "Total Orders", value: "1,234", change: "+8.2%", icon: <FiShoppingCart />, color: "from-cyan-500 to-blue-500" },
        { title: "Total Products", value: "567", change: "+23", icon: <GiCigarette />, color: "from-blue-500 to-cyan-500" },
        { title: "Total Customers", value: "3,456", change: "+156", icon: <FiUsers />, color: "from-cyan-500 to-blue-500" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Helper function to format change percentage
  const formatChange = (change) => {
    const num = parseFloat(change);
    if (num > 0) {
      return `+${num}%`;
    } else if (num < 0) {
      return `${num}%`;
    } else {
      return '0%';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border animate-pulse ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className={`h-3 w-16 rounded mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-6 w-20 rounded mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-3 w-12 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error && !stats.length) {
    return (
      <div className={`p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600`}>
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border transition-all duration-300 hover:shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className={`text-xs sm:text-sm mb-0.5 sm:mb-1 truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.title}
              </p>
              <p className={`text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </p>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </p>
            </div>
            <div className={`w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white flex-shrink-0 ml-2`}>
              <span className="text-sm sm:text-base md:text-lg">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
