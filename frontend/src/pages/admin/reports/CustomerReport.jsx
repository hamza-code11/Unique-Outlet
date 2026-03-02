import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  FiUsers, FiTrendingUp, FiTrendingDown, FiFilter,
  FiRefreshCw, FiX, FiDollarSign, FiShoppingBag,
  FiStar, FiMapPin, FiMail, FiPhone
} from "react-icons/fi";

const CustomerReport = () => {
  const { isDarkMode } = useOutletContext();
  const [dateRange, setDateRange] = useState("month");
  const [sortBy, setSortBy] = useState("spent");
  const [loading, setLoading] = useState(false);

  // Sample customer data
  const customerData = useMemo(() => ({
    summary: {
      totalCustomers: 1250,
      activeCustomers: 892,
      newCustomers: 156,
      returningCustomers: 736,
      averageOrderValue: 36.70,
      totalSpent: 45678.50,
      averageLifetime: 245
    },
    customers: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        location: "New York, NY",
        orders: 15,
        spent: 1245.50,
        averageOrder: 83.03,
        lastOrder: "2024-02-15",
        joined: "2024-01-15",
        status: "active"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        location: "Los Angeles, CA",
        orders: 8,
        spent: 678.25,
        averageOrder: 84.78,
        lastOrder: "2024-02-14",
        joined: "2024-01-14",
        status: "active"
      },
      {
        id: 3,
        name: "Bob Wilson",
        email: "bob.wilson@example.com",
        location: "Chicago, IL",
        orders: 23,
        spent: 3450.75,
        averageOrder: 150.03,
        lastOrder: "2024-02-13",
        joined: "2024-01-13",
        status: "active"
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice.brown@example.com",
        location: "Houston, TX",
        orders: 5,
        spent: 234.50,
        averageOrder: 46.90,
        lastOrder: "2024-02-10",
        joined: "2024-01-10",
        status: "inactive"
      },
      {
        id: 5,
        name: "Charlie Lee",
        email: "charlie.lee@example.com",
        location: "Phoenix, AZ",
        orders: 12,
        spent: 890.00,
        averageOrder: 74.17,
        lastOrder: "2024-02-12",
        joined: "2024-01-12",
        status: "active"
      },
      {
        id: 6,
        name: "Diana Prince",
        email: "diana.prince@example.com",
        location: "Philadelphia, PA",
        orders: 7,
        spent: 456.75,
        averageOrder: 65.25,
        lastOrder: "2024-02-09",
        joined: "2024-01-09",
        status: "active"
      },
    ],
    locations: [
      { city: "New York", customers: 245, spent: 15678.50 },
      { city: "Los Angeles", customers: 189, spent: 12345.75 },
      { city: "Chicago", customers: 156, spent: 9876.25 },
      { city: "Houston", customers: 134, spent: 8765.00 },
      { city: "Phoenix", customers: 98, spent: 6543.50 },
    ],
    segments: [
      { name: "High Value (>$1000)", count: 145, spent: 234567.50 },
      { name: "Medium ($250-$1000)", count: 389, spent: 156789.00 },
      { name: "Low (<$250)", count: 716, spent: 65432.50 },
    ]
  }), []);

  const handleApplyFilter = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleReset = () => {
    setDateRange("month");
    setSortBy("spent");
  };

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const formatNumber = (num) => num.toLocaleString();

  const filteredCustomers = useMemo(() => {
    let filtered = [...customerData.customers];
    
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'spent': return b.spent - a.spent;
        case 'orders': return b.orders - a.orders;
        case 'newest': return new Date(b.joined) - new Date(a.joined);
        default: return 0;
      }
    });
    
    return filtered;
  }, [customerData.customers, sortBy]);

  const isFilterActive = dateRange !== "month" || sortBy !== "spent";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Customer Report
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Understand your customer behavior
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Customers</p>
          <p className={`text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatNumber(customerData.summary.totalCustomers)}
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active</p>
          <p className={`text-xl font-bold mt-1 text-green-500`}>
            {formatNumber(customerData.summary.activeCustomers)}
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>New (30d)</p>
          <p className={`text-xl font-bold mt-1 text-blue-500`}>
            {formatNumber(customerData.summary.newCustomers)}
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Spent</p>
          <p className={`text-xl font-bold mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {formatCurrency(customerData.summary.totalSpent)}
          </p>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Order Value</p>
          <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {formatCurrency(customerData.summary.averageOrderValue)}
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Returning Rate</p>
          <p className={`text-lg font-bold mt-1 text-green-500`}>
            {((customerData.summary.returningCustomers / customerData.summary.activeCustomers) * 100).toFixed(1)}%
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Lifetime</p>
          <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {customerData.summary.averageLifetime} days
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
              }`}
          >
            <option value="spent">Sort by Total Spent</option>
            <option value="orders">Sort by Orders</option>
            <option value="newest">Sort by Newest</option>
          </select>
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

      {/* Customers Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customer</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Orders</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Spent</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Order</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Order</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Joined</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="p-3">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {customer.name}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {customer.email}
                      </p>
                    </div>
                  </td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {customer.location}
                  </td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {customer.orders}
                  </td>
                  <td className={`p-3 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {formatCurrency(customer.spent)}
                  </td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formatCurrency(customer.averageOrder)}
                  </td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {new Date(customer.lastOrder).toLocaleDateString()}
                  </td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {new Date(customer.joined).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      customer.status === 'active' 
                        ? 'text-green-500 bg-green-500/10' 
                        : 'text-gray-500 bg-gray-500/10'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Locations */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <h2 className={`text-base font-medium mb-4 flex items-center gap-2
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <FiMapPin className="text-lg" />
            Top Locations
          </h2>

          <div className="space-y-3">
            {customerData.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {location.city}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {location.customers} customers
                  </p>
                </div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {formatCurrency(location.spent)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <h2 className={`text-base font-medium mb-4 flex items-center gap-2
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <FiUsers className="text-lg" />
            Customer Segments
          </h2>

          <div className="space-y-3">
            {customerData.segments.map((segment, index) => {
              const percentage = (segment.spent / customerData.summary.totalSpent * 100).toFixed(1);
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {segment.name}
                    </span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {formatCurrency(segment.spent)}
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
                    {segment.count} customers
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

export default CustomerReport;