import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  FiDollarSign, FiCalendar, FiDownload, FiFilter,
  FiRefreshCw, FiX, FiTrendingUp, FiTrendingDown,
  FiShoppingBag, FiUsers, FiPackage
} from "react-icons/fi";

const SalesReport = () => {
  const { isDarkMode } = useOutletContext();
  const [dateRange, setDateRange] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Sample sales data
  const salesData = useMemo(() => ({
    summary: {
      totalSales: 45678.50,
      totalOrders: 1245,
      averageOrderValue: 36.70,
      totalCustomers: 892,
      conversionRate: 3.2,
      refundRate: 1.8
    },
    daily: [
      { date: "2024-02-01", sales: 1250.50, orders: 34 },
      { date: "2024-02-02", sales: 1420.75, orders: 38 },
      { date: "2024-02-03", sales: 1100.25, orders: 29 },
      { date: "2024-02-04", sales: 1680.00, orders: 45 },
      { date: "2024-02-05", sales: 1930.50, orders: 52 },
      { date: "2024-02-06", sales: 1750.25, orders: 47 },
      { date: "2024-02-07", sales: 2100.00, orders: 56 },
      { date: "2024-02-08", sales: 1850.75, orders: 49 },
      { date: "2024-02-09", sales: 2200.50, orders: 59 },
      { date: "2024-02-10", sales: 1950.25, orders: 52 },
    ],
    topProducts: [
      { name: "Mr. Vapo E-liquid 30ml", sales: 1250.50, quantity: 278, revenue: 1250.50 },
      { name: "Starter Kit Pro", sales: 2340.00, quantity: 43, revenue: 2340.00 },
      { name: "Pod System V2", sales: 3450.00, quantity: 13, revenue: 3450.00 },
      { name: "Phone Case iPhone 15", sales: 890.50, quantity: 45, revenue: 890.50 },
      { name: "Power Bank 10000mAh", sales: 1560.00, quantity: 45, revenue: 1560.00 },
    ],
    paymentMethods: [
      { method: "Credit Card", count: 645, amount: 24567.50 },
      { method: "PayPal", count: 342, amount: 12345.75 },
      { method: "Bank Transfer", count: 156, amount: 5678.25 },
      { method: "Cash on Delivery", count: 102, amount: 3087.00 },
    ]
  }), []);

  const handleApplyFilter = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleReset = () => {
    setDateRange("month");
    setStartDate("");
    setEndDate("");
  };

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const formatNumber = (num) => num.toLocaleString();

  const isFilterActive = dateRange !== "month" || startDate || endDate;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Sales Report
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Track your store's sales performance
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
              }`}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>

          {dateRange === "custom" && (
            <>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`px-3 py-2 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`px-3 py-2 rounded-lg border text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyFilter}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {loading ? <FiRefreshCw className="animate-spin" /> : <FiFilter />}
            Apply
          </button>

          {isFilterActive && (
            <button
              onClick={handleReset}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2
                ${isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              <FiRefreshCw />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Sales</p>
              <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(salesData.summary.totalSales)}
              </p>
              <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <FiTrendingUp className="inline text-green-500 mr-1" />
                +12.5% from last period
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiDollarSign className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Orders</p>
              <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatNumber(salesData.summary.totalOrders)}
              </p>
              <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <FiTrendingUp className="inline text-green-500 mr-1" />
                +8.3% from last period
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiShoppingBag className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Order Value</p>
              <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(salesData.summary.averageOrderValue)}
              </p>
              <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <FiTrendingUp className="inline text-green-500 mr-1" />
                +3.2% from last period
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiTrendingUp className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Sales Chart (Simplified Table) */}
      <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <h2 className={`text-base font-medium mb-4 flex items-center gap-2
          ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <FiCalendar className="text-lg" />
          Daily Sales
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                <th className={`py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Orders</th>
                <th className={`py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sales</th>
                <th className={`py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {salesData.daily.map((day, index) => {
                const prevDay = salesData.daily[index - 1];
                const change = prevDay ? ((day.sales - prevDay.sales) / prevDay.sales * 100).toFixed(1) : 0;
                const isPositive = change > 0;
                
                return (
                  <tr key={day.date}>
                    <td className={`py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className={`py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{day.orders}</td>
                    <td className={`py-2 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {formatCurrency(day.sales)}
                    </td>
                    <td className="py-2">
                      {index > 0 && (
                        <span className={`text-xs flex items-center gap-1
                          ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
                          {Math.abs(change)}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <h2 className={`text-base font-medium mb-4 flex items-center gap-2
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <FiPackage className="text-lg" />
            Top Products
          </h2>

          <div className="space-y-3">
            {salesData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    #{index + 1}
                  </span>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.name}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {product.quantity} units sold
                    </p>
                  </div>
                </div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {formatCurrency(product.revenue)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <h2 className={`text-base font-medium mb-4 flex items-center gap-2
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <FiDollarSign className="text-lg" />
            Payment Methods
          </h2>

          <div className="space-y-3">
            {salesData.paymentMethods.map((method, index) => {
              const percentage = (method.amount / salesData.summary.totalSales * 100).toFixed(1);
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {method.method}
                    </span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {formatCurrency(method.amount)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {percentage}%
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {method.count} transactions
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;