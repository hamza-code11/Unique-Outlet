import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSearch, FiChevronLeft, FiChevronRight, FiMoreVertical,
  FiFolder, FiShoppingBag, FiEye, FiFilter, FiX,
  FiUser, FiRefreshCw
} from "react-icons/fi";

const OrderList = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample orders data
  const orders = [
    { 
      id: "ORD-001", 
      customer: "John Doe",
      email: "john@example.com",
      date: "2024-01-15",
      total: 156.00,
      status: "delivered",
      payment: "paid",
      items: 3,
      shipping: "Standard"
    },
    { 
      id: "ORD-002", 
      customer: "Jane Smith",
      email: "jane@example.com",
      date: "2024-01-14",
      total: 89.50,
      status: "processing",
      payment: "paid",
      items: 2,
      shipping: "Express"
    },
    { 
      id: "ORD-003", 
      customer: "Bob Wilson",
      email: "bob@example.com",
      date: "2024-01-14",
      total: 234.00,
      status: "shipped",
      payment: "paid",
      items: 4,
      shipping: "Standard"
    },
    { 
      id: "ORD-004", 
      customer: "Alice Brown",
      email: "alice@example.com",
      date: "2024-01-13",
      total: 67.00,
      status: "pending",
      payment: "unpaid",
      items: 1,
      shipping: "Standard"
    },
    { 
      id: "ORD-005", 
      customer: "Charlie Lee",
      email: "charlie@example.com",
      date: "2024-01-13",
      total: 345.00,
      status: "delivered",
      payment: "paid",
      items: 5,
      shipping: "Express"
    },
    { 
      id: "ORD-006", 
      customer: "Diana Prince",
      email: "diana@example.com",
      date: "2024-01-12",
      total: 78.50,
      status: "cancelled",
      payment: "refunded",
      items: 2,
      shipping: "Standard"
    },
    { 
      id: "ORD-007", 
      customer: "Ethan Hunt",
      email: "ethan@example.com",
      date: "2024-01-12",
      total: 423.00,
      status: "processing",
      payment: "paid",
      items: 6,
      shipping: "Express"
    },
    { 
      id: "ORD-008", 
      customer: "Fiona Glen",
      email: "fiona@example.com",
      date: "2024-01-11",
      total: 156.00,
      status: "shipped",
      payment: "paid",
      items: 3,
      shipping: "Standard"
    },
    { 
      id: "ORD-009", 
      customer: "George King",
      email: "george@example.com",
      date: "2024-01-11",
      total: 289.00,
      status: "delivered",
      payment: "paid",
      items: 4,
      shipping: "Express"
    },
    { 
      id: "ORD-010", 
      customer: "Hannah Lee",
      email: "hannah@example.com",
      date: "2024-01-10",
      total: 134.50,
      status: "pending",
      payment: "unpaid",
      items: 2,
      shipping: "Standard"
    },
  ];

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered':
        return 'text-green-500 bg-green-500/10';
      case 'processing':
        return 'text-blue-500 bg-blue-500/10';
      case 'shipped':
        return 'text-cyan-500 bg-cyan-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Get payment badge color
  const getPaymentBadge = (payment) => {
    switch(payment) {
      case 'paid':
        return 'text-green-500 bg-green-500/10';
      case 'unpaid':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'refunded':
        return 'text-gray-500 bg-gray-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if any filter is active
  const isFilterActive = searchTerm !== "" || statusFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Orders
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage and track customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search orders by ID, customer or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
          />
        </div>

        {/* Status Filter */}
        <div className="relative min-w-[150px]">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border text-sm appearance-none
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
              }`}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <FiFilter className={`absolute right-3 top-3 text-sm pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>

        {/* Reset Filters Button - appears when filters are active */}
        {isFilterActive && (
          <button
            onClick={resetFilters}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
              ${isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            <FiRefreshCw className="text-sm" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {isFilterActive && (
        <div className={`p-3 rounded-lg flex flex-wrap items-center gap-2 text-sm
          ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Active filters:
          </span>
          {searchTerm && (
            <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1
              ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-700'}`}>
              Search: "{searchTerm}"
              <button onClick={() => setSearchTerm("")} className="ml-1">
                <FiX className="text-xs" />
              </button>
            </span>
          )}
          {statusFilter !== "all" && (
            <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1
              ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-700'}`}>
              Status: {statusFilter}
              <button onClick={() => setStatusFilter("all")} className="ml-1">
                <FiX className="text-xs" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Order ID</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customer</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Items</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Payment</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((order) => (
                <tr key={order.id} className={`${isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                  <td className="p-4">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {order.id}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center
                        ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <FiUser className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {order.customer}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {order.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formatDate(order.date)}
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {order.items}
                  </td>
                  <td className={`p-4 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPaymentBadge(order.payment)}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className={`p-1.5 rounded-lg transition-colors
                          ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                        title="View Details"
                      >
                        <FiEye className="text-sm" />
                      </button>
                      <button className={`p-1.5 rounded-lg transition-colors lg:hidden
                        ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                        <FiMoreVertical className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className={`p-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <FiFolder className="text-4xl mx-auto mb-3 opacity-50" />
            <p className="text-sm">No orders found</p>
            <p className="text-xs mt-1">Try adjusting your filters</p>
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && filteredOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm order-2 sm:order-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors
                ${currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
            >
              <FiChevronLeft className="text-sm" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm transition-colors
                  ${currentPage === i + 1
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors
                ${currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
            >
              <FiChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;