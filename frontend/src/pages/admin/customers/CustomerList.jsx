import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSearch, FiChevronLeft, FiChevronRight, FiMoreVertical,
  FiFolder, FiUsers, FiEye, FiMail, FiPhone,
  FiMapPin, FiShoppingBag, FiDollarSign, FiUser,
  FiFilter, FiRefreshCw, FiX
} from "react-icons/fi";

const CustomerList = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  // Sample customers data
  const customers = [
    { 
      id: 1, 
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      orders: 15,
      spent: 1245.50,
      status: "active",
      joined: "2024-01-15",
      lastActive: "2024-02-10",
      avatar: null
    },
    { 
      id: 2, 
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      orders: 8,
      spent: 678.25,
      status: "active",
      joined: "2024-01-14",
      lastActive: "2024-02-09",
      avatar: null
    },
    { 
      id: 3, 
      name: "Bob Wilson",
      email: "bob.wilson@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      orders: 23,
      spent: 3450.75,
      status: "active",
      joined: "2024-01-14",
      lastActive: "2024-02-10",
      avatar: null
    },
    { 
      id: 4, 
      name: "Alice Brown",
      email: "alice.brown@example.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, TX",
      orders: 5,
      spent: 234.50,
      status: "inactive",
      joined: "2024-01-13",
      lastActive: "2024-01-28",
      avatar: null
    },
    { 
      id: 5, 
      name: "Charlie Lee",
      email: "charlie.lee@example.com",
      phone: "+1 (555) 567-8901",
      location: "Phoenix, AZ",
      orders: 12,
      spent: 890.00,
      status: "active",
      joined: "2024-01-13",
      lastActive: "2024-02-08",
      avatar: null
    },
    { 
      id: 6, 
      name: "Diana Prince",
      email: "diana.prince@example.com",
      phone: "+1 (555) 678-9012",
      location: "Philadelphia, PA",
      orders: 7,
      spent: 456.75,
      status: "active",
      joined: "2024-01-12",
      lastActive: "2024-02-07",
      avatar: null
    },
    { 
      id: 7, 
      name: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      phone: "+1 (555) 789-0123",
      location: "San Antonio, TX",
      orders: 19,
      spent: 2345.00,
      status: "active",
      joined: "2024-01-12",
      lastActive: "2024-02-09",
      avatar: null
    },
    { 
      id: 8, 
      name: "Fiona Glen",
      email: "fiona.glen@example.com",
      phone: "+1 (555) 890-1234",
      location: "San Diego, CA",
      orders: 3,
      spent: 89.99,
      status: "inactive",
      joined: "2024-01-11",
      lastActive: "2024-01-25",
      avatar: null
    },
    { 
      id: 9, 
      name: "George King",
      email: "george.king@example.com",
      phone: "+1 (555) 901-2345",
      location: "Dallas, TX",
      orders: 11,
      spent: 1120.00,
      status: "active",
      joined: "2024-01-11",
      lastActive: "2024-02-06",
      avatar: null
    },
    { 
      id: 10, 
      name: "Hannah Lee",
      email: "hannah.lee@example.com",
      phone: "+1 (555) 012-3456",
      location: "San Jose, CA",
      orders: 6,
      spent: 345.50,
      status: "active",
      joined: "2024-01-10",
      lastActive: "2024-02-05",
      avatar: null
    },
  ];

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
    setSelectedCustomers([]);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Handle select all
  const handleSelectAll = () => {
    if (selectedCustomers.length === currentItems.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(currentItems.map(customer => customer.id));
    }
  };

  // Handle select single
  const handleSelect = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(custId => custId !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      console.log('Delete customer:', id);
      // Add your delete logic here
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedCustomers.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedCustomers.length} customers?`)) {
      console.log('Delete customers:', selectedCustomers);
      setSelectedCustomers([]);
      // Add your bulk delete logic here
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return 'text-green-500 bg-green-500/10';
      case 'inactive':
        return 'text-gray-500 bg-gray-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
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

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if any filter is active
  const isFilterActive = searchTerm !== "" || statusFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Customers
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your customer database
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search customers by name, email, phone or location..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
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
      {selectedCustomers.length > 0 && (
        <div className={`p-4 rounded-lg flex items-center justify-between
          ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {selectedCustomers.length} customer(s) selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Customers Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === currentItems.length && currentItems.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ID</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customer</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Contact</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Orders</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Spent</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Joined</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((customer) => (
                <tr key={customer.id} className={`${isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => handleSelect(customer.id)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    #{customer.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm
                        ${customer.avatar 
                          ? 'bg-cover bg-center' 
                          : isDarkMode 
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white' 
                            : 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white'
                        }`}>
                        {customer.avatar ? (
                          <img src={customer.avatar} alt={customer.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          getInitials(customer.name)
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {customer.name}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          Last active: {formatDate(customer.lastActive)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <FiMail className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {customer.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiPhone className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {customer.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FiMapPin className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {customer.location}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FiShoppingBag className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {customer.orders}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FiDollarSign className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {formatCurrency(customer.spent)}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formatDate(customer.joined)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {/* View customer details */}}
                        className={`p-1.5 rounded-lg transition-colors
                          ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                        title="View Details"
                      >
                        <FiEye className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className={`p-1.5 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20
                          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        title="Delete"
                      >
                        <FiX className="text-sm hover:text-red-500" />
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
            <FiUsers className="text-4xl mx-auto mb-3 opacity-50" />
            <p className="text-sm">No customers found</p>
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
      {totalPages > 1 && filteredCustomers.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm order-2 sm:order-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} customers
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

export default CustomerList;