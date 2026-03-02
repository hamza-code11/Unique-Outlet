import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSearch, FiChevronLeft, FiChevronRight, FiMoreVertical,
  FiFolder, FiMail, FiEye, FiStar, FiTrash2,
  FiFilter, FiRefreshCw, FiX, FiUser, FiClock,
  FiCheckCircle, FiMessageSquare, FiInbox
} from "react-icons/fi";

const ContactMessages = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessages, setSelectedMessages] = useState([]);

  // Sample contact messages data
  const messages = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      subject: "Question about product compatibility",
      message: "I recently purchased a Starter Kit Pro and wanted to know if it's compatible with the Pod System V2 coils?",
      date: "2024-02-15T10:30:00",
      status: "unread",
      priority: "high",
      replied: false
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      subject: "Order delay inquiry",
      message: "My order #ORD-002 was supposed to be delivered yesterday but I haven't received it yet. Can you please provide an update?",
      date: "2024-02-15T09:15:00",
      status: "read",
      priority: "medium",
      replied: true
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob.wilson@example.com",
      subject: "Return request",
      message: "I would like to return my recent purchase of the Phone Case. It doesn't fit my phone properly.",
      date: "2024-02-14T16:45:00",
      status: "unread",
      priority: "medium",
      replied: false
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      subject: "Shipping address change",
      message: "I need to change the shipping address for my order #ORD-004. Can you please help?",
      date: "2024-02-14T14:20:00",
      status: "read",
      priority: "high",
      replied: true
    },
    {
      id: 5,
      name: "Charlie Lee",
      email: "charlie.lee@example.com",
      subject: "Product suggestion",
      message: "I love your products! Any plans to introduce new flavors for the e-liquids?",
      date: "2024-02-14T11:30:00",
      status: "read",
      priority: "low",
      replied: true
    },
    {
      id: 6,
      name: "Diana Prince",
      email: "diana.prince@example.com",
      subject: "Payment issue",
      message: "I tried to place an order but my payment was declined. Can you help me resolve this?",
      date: "2024-02-13T15:10:00",
      status: "unread",
      priority: "high",
      replied: false
    },
    {
      id: 7,
      name: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      subject: "Technical support",
      message: "My device is not charging properly. It worked fine for a month but now it won't charge.",
      date: "2024-02-13T13:25:00",
      status: "read",
      priority: "high",
      replied: true
    },
    {
      id: 8,
      name: "Fiona Glen",
      email: "fiona.glen@example.com",
      subject: "Wholesale inquiry",
      message: "I own a vape shop and would like to inquire about wholesale pricing for your products.",
      date: "2024-02-12T10:45:00",
      status: "unread",
      priority: "medium",
      replied: false
    },
    {
      id: 9,
      name: "George King",
      email: "george.king@example.com",
      subject: "Feedback",
      message: "Great service and fast delivery! Just wanted to say thank you.",
      date: "2024-02-12T09:30:00",
      status: "read",
      priority: "low",
      replied: true
    },
    {
      id: 10,
      name: "Hannah Lee",
      email: "hannah.lee@example.com",
      subject: "Refund status",
      message: "I returned a product last week. When can I expect the refund?",
      date: "2024-02-11T16:00:00",
      status: "unread",
      priority: "medium",
      replied: false
    },
  ];

  // Filter messages based on search and status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
    setSelectedMessages([]);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMessages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  // Handle select all
  const handleSelectAll = () => {
    if (selectedMessages.length === currentItems.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(currentItems.map(msg => msg.id));
    }
  };

  // Handle select single
  const handleSelect = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter(msgId => msgId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  // Handle mark as read/unread
  const handleMarkAsRead = (id) => {
    console.log('Mark as read:', id);
    // Add your update logic here
  };

  // Handle delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      console.log('Delete message:', id);
      // Add your delete logic here
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedMessages.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedMessages.length} messages?`)) {
      console.log('Delete messages:', selectedMessages);
      setSelectedMessages([]);
      // Add your bulk delete logic here
    }
  };

  // Get priority badge color
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'low':
        return 'text-green-500 bg-green-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    return status === 'unread' ? 
      <FiMail className="text-blue-500" /> : 
      <FiMail className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if any filter is active
  const isFilterActive = searchTerm !== "" || statusFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Contact Messages
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage customer inquiries and support messages
          </p>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2
            ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <FiInbox className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              {messages.filter(m => m.status === 'unread').length} unread
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search messages by name, email, subject..."
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
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
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
      {selectedMessages.length > 0 && (
        <div className={`p-4 rounded-lg flex items-center justify-between
          ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {selectedMessages.length} message(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Messages Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedMessages.length === currentItems.length && currentItems.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>From</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subject</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Message</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Priority</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((message) => (
                <tr 
                  key={message.id} 
                  className={`${message.status === 'unread' ? 'font-medium' : ''} 
                    ${isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(message.id)}
                      onChange={() => handleSelect(message.id)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      {getStatusIcon(message.status)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {message.name}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {message.email}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {message.subject}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className={`text-sm truncate max-w-[200px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {message.message}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadge(message.priority)}`}>
                      {message.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {formatDate(message.date)}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {formatTime(message.date)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {/* View message */}}
                        className={`p-1.5 rounded-lg transition-colors
                          ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                        title="View Message"
                      >
                        <FiEye className="text-sm" />
                      </button>
                      {message.status === 'unread' && (
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className={`p-1.5 rounded-lg transition-colors
                            ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                          title="Mark as Read"
                        >
                          <FiCheckCircle className="text-sm" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(message.id)}
                        className={`p-1.5 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20
                          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        title="Delete"
                      >
                        <FiTrash2 className="text-sm hover:text-red-500" />
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
            <FiMessageSquare className="text-4xl mx-auto mb-3 opacity-50" />
            <p className="text-sm">No messages found</p>
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
      {totalPages > 1 && filteredMessages.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm order-2 sm:order-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMessages.length)} of {filteredMessages.length} messages
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

export default ContactMessages;