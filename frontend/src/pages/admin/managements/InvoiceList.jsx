import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSearch, FiChevronLeft, FiChevronRight, FiMoreVertical,
  FiFolder, FiCreditCard, FiEye,
  FiFilter, FiRefreshCw, FiX, FiUser, FiDollarSign,
  FiCalendar, FiCheckCircle, FiClock
} from "react-icons/fi";

const InvoiceList = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  // Sample invoices data
  const invoices = [
    {
      id: "INV-2024-001",
      orderId: "ORD-001",
      customer: "John Doe",
      email: "john.doe@example.com",
      date: "2024-02-15",
      dueDate: "2024-03-15",
      amount: 156.00,
      status: "paid",
      items: 3,
      paymentMethod: "Credit Card"
    },
    {
      id: "INV-2024-002",
      orderId: "ORD-002",
      customer: "Jane Smith",
      email: "jane.smith@example.com",
      date: "2024-02-14",
      dueDate: "2024-03-14",
      amount: 89.50,
      status: "paid",
      items: 2,
      paymentMethod: "PayPal"
    },
    {
      id: "INV-2024-003",
      orderId: "ORD-003",
      customer: "Bob Wilson",
      email: "bob.wilson@example.com",
      date: "2024-02-14",
      dueDate: "2024-03-14",
      amount: 234.00,
      status: "pending",
      items: 4,
      paymentMethod: "Bank Transfer"
    },
    {
      id: "INV-2024-004",
      orderId: "ORD-004",
      customer: "Alice Brown",
      email: "alice.brown@example.com",
      date: "2024-02-13",
      dueDate: "2024-03-13",
      amount: 67.00,
      status: "overdue",
      items: 1,
      paymentMethod: "Credit Card"
    },
    {
      id: "INV-2024-005",
      orderId: "ORD-005",
      customer: "Charlie Lee",
      email: "charlie.lee@example.com",
      date: "2024-02-13",
      dueDate: "2024-03-13",
      amount: 345.00,
      status: "paid",
      items: 5,
      paymentMethod: "PayPal"
    },
    {
      id: "INV-2024-006",
      orderId: "ORD-006",
      customer: "Diana Prince",
      email: "diana.prince@example.com",
      date: "2024-02-12",
      dueDate: "2024-03-12",
      amount: 78.50,
      status: "cancelled",
      items: 2,
      paymentMethod: "Credit Card"
    },
    {
      id: "INV-2024-007",
      orderId: "ORD-007",
      customer: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      date: "2024-02-12",
      dueDate: "2024-03-12",
      amount: 423.00,
      status: "pending",
      items: 6,
      paymentMethod: "Bank Transfer"
    },
    {
      id: "INV-2024-008",
      orderId: "ORD-008",
      customer: "Fiona Glen",
      email: "fiona.glen@example.com",
      date: "2024-02-11",
      dueDate: "2024-03-11",
      amount: 156.00,
      status: "paid",
      items: 3,
      paymentMethod: "PayPal"
    },
    {
      id: "INV-2024-009",
      orderId: "ORD-009",
      customer: "George King",
      email: "george.king@example.com",
      date: "2024-02-11",
      dueDate: "2024-03-11",
      amount: 289.00,
      status: "overdue",
      items: 4,
      paymentMethod: "Credit Card"
    },
    {
      id: "INV-2024-010",
      orderId: "ORD-010",
      customer: "Hannah Lee",
      email: "hannah.lee@example.com",
      date: "2024-02-10",
      dueDate: "2024-03-10",
      amount: 134.50,
      status: "paid",
      items: 2,
      paymentMethod: "PayPal"
    },
  ];

  // Filter invoices based on search and status
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
    setSelectedInvoices([]);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  // Handle select all
  const handleSelectAll = () => {
    if (selectedInvoices.length === currentItems.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(currentItems.map(invoice => invoice.id));
    }
  };

  // Handle select single
  const handleSelect = (id) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(selectedInvoices.filter(invId => invId !== id));
    } else {
      setSelectedInvoices([...selectedInvoices, id]);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      console.log('Delete invoice:', id);
      // Add your delete logic here
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedInvoices.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedInvoices.length} invoices?`)) {
      console.log('Delete invoices:', selectedInvoices);
      setSelectedInvoices([]);
      // Add your bulk delete logic here
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'paid':
        return 'text-green-500 bg-green-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'overdue':
        return 'text-red-500 bg-red-500/10';
      case 'cancelled':
        return 'text-gray-500 bg-gray-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid':
        return <FiCheckCircle className="text-green-500" />;
      case 'pending':
        return <FiClock className="text-yellow-500" />;
      case 'overdue':
        return <FiX className="text-red-500" />;
      default:
        return null;
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
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
          Invoices
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage and track customer invoices
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search invoices by ID, customer or order..."
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <FiFilter className={`absolute right-3 top-3 text-sm pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>

        {/* Reset Filters Button */}
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

      {/* Bulk Actions */}
      {selectedInvoices.length > 0 && (
        <div className={`p-4 rounded-lg flex items-center justify-between
          ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {selectedInvoices.length} invoice(s) selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Invoices Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.length === currentItems.length && currentItems.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Invoice ID</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customer</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Order</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Due Date</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amount</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((invoice) => (
                <tr key={invoice.id} className={`${isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => handleSelect(invoice.id)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FiCreditCard className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {invoice.id}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {invoice.customer}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {invoice.email}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {invoice.orderId}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FiCalendar className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {formatDate(invoice.date)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {formatDate(invoice.dueDate)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FiDollarSign className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {formatCurrency(invoice.amount)}
                      </span>
                    </div>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {invoice.items} items
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.status)}
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {/* View Details Button - Only action */}
                      <button
                        onClick={() => navigate(`/admin/invoices/${invoice.id}`)}
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
            <p className="text-sm">No invoices found</p>
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
      {totalPages > 1 && filteredInvoices.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm order-2 sm:order-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredInvoices.length)} of {filteredInvoices.length} invoices
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

export default InvoiceList;