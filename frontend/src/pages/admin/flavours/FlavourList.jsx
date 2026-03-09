// src/pages/admin/flavours/FlavourList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiEdit2, FiPlus, FiSearch, FiRefreshCw,
  FiChevronLeft, FiChevronRight, FiPackage,
  FiDollarSign, FiBox
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const FlavourList = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [flavours, setFlavours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all flavours (you need to create this API endpoint)
  const fetchFlavours = async () => {
    try {
      setLoading(true);
      setError(null);
      // You need to create this endpoint in your backend
      const response = await axios.get(`${API_URL}/flavours`);
      
      if (response.data.success && response.data.flavours) {
        setFlavours(response.data.flavours);
      }
    } catch (err) {
      console.error('Error fetching flavours:', err);
      setError('Failed to load flavours. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlavours();
  }, []);

  // Filter flavours based on search
  const filteredFlavours = flavours.filter(flavour => {
    const matchesSearch = 
      flavour.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flavour.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flavour.flavour?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFlavours.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFlavours.length / itemsPerPage);

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/admin/flavours/edit/${id}`);
  };

  // Handle add new
  const handleAddNew = () => {
    navigate('/admin/flavours/add');
  };

  // Get stock status color
  const getStockColor = (stock) => {
    if (stock > 30) return 'text-green-600 dark:text-green-400';
    if (stock > 10) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Flavour Management
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage product flavours and variants
          </p>
        </div>

        {/* Add New Button */}
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/30 w-full sm:w-auto justify-center"
        >
          <FiPlus className="text-lg" />
          Add New Flavour
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search flavours by name, product or flavour type..."
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

        {/* Refresh Button */}
        <button
          onClick={fetchFlavours}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
            ${isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <FiRefreshCw className="text-sm" />
          Refresh
        </button>
      </div>

      {/* Flavours Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ID</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Flavour Name</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Flavour Type</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.length > 0 ? (
                currentItems.map((flavour) => (
                  <tr key={flavour.id} className={`${isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                    <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      #{flavour.id}
                    </td>
                    <td className="p-4">
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {flavour.name}
                        </p>
                        {flavour.desc && (
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {flavour.desc}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FiPackage className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {flavour.product?.name || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {flavour.category?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {flavour.flavour || 'N/A'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <FiDollarSign className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {parseFloat(flavour.price).toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <FiBox className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`text-sm ${getStockColor(flavour.stock)}`}>
                          {flavour.stock} units
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(flavour.id)}
                        className={`p-1.5 rounded-lg transition-colors
                          ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                        title="Edit Flavour"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-8 text-center">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No flavours found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm order-2 sm:order-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredFlavours.length)} of {filteredFlavours.length} flavours
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
            
            <span className={`text-sm px-3 py-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Page {currentPage} of {totalPages}
            </span>
            
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

export default FlavourList;