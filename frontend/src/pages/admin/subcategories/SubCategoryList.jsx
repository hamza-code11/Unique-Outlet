import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, 
  FiChevronLeft, FiChevronRight, FiMoreVertical,
  FiFolder, FiLayers
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const SubCategoryList = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch both subcategories and categories in parallel
      const [subRes, catRes] = await Promise.all([
        axios.get(`${API_URL}/subcategories`),
        axios.get(`${API_URL}/categories`)
      ]);
      
      setSubCategories(subRes.data || []);
      setCategories(catRes.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load subcategories");
    } finally {
      setLoading(false);
    }
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
  };

  // Handle single delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this Brands?')) return;
    
    setDeleteLoading(true);
    setDeleteId(id);
    
    try {
      await axios.delete(`${API_URL}/subcategories/${id}`);
      setSubCategories(subCategories.filter(s => s.id !== id));
      setSelectedSubCategories(selectedSubCategories.filter(sid => sid !== id));
    } catch (err) {
      console.error("Error deleting Brands:", err);
      alert(err.response?.data?.message || "Failed to delete Brands");
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedSubCategories.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedSubCategories.length} subcategories?`)) return;
    
    setDeleteLoading(true);
    
    try {
      await Promise.all(selectedSubCategories.map(id => 
        axios.delete(`${API_URL}/subcategories/${id}`)
      ));
      setSubCategories(subCategories.filter(s => !selectedSubCategories.includes(s.id)));
      setSelectedSubCategories([]);
    } catch (err) {
      console.error("Error deleting subcategories:", err);
      alert("Failed to delete some subcategories");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter subcategories based on search
  const filteredSubCategories = subCategories.filter(sub => {
    const categoryName = getCategoryName(sub.category_id).toLowerCase();
    return sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           sub.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           categoryName.includes(searchTerm.toLowerCase());
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);

  // Handle select all
  const handleSelectAll = () => {
    if (selectedSubCategories.length === currentItems.length) {
      setSelectedSubCategories([]);
    } else {
      setSelectedSubCategories(currentItems.map(sub => sub.id));
    }
  };

  // Handle select single
  const handleSelect = (id) => {
    if (selectedSubCategories.includes(id)) {
      setSelectedSubCategories(selectedSubCategories.filter(subId => subId !== id));
    } else {
      setSelectedSubCategories([...selectedSubCategories, id]);
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    if (status === 1) {
      return 'text-green-500 bg-green-500/10';
    }
    return 'text-gray-500 bg-gray-500/10';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Subcategories
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Total {subCategories.length} subcategories
          </p>
        </div>
        
        <button
          onClick={() => navigate('/admin/subcategories/create')}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
        >
          <FiPlus className="text-base" />
          <span>Add Brands</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 relative max-w-md">
        <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          type="text"
          placeholder="Search by name, slug or category..."
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

      {/* Bulk Actions */}
      {selectedSubCategories.length > 0 && (
        <div className={`p-4 rounded-lg flex items-center justify-between
          ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {selectedSubCategories.length} Brands(ies) selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={deleteLoading}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {deleteLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <FiTrash2 className="text-sm" />
                <span>Delete Selected</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* SubCategories Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedSubCategories.length === currentItems.length && currentItems.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ID</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Brands</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Parent Category</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Created</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Updated</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((subCategory) => (
                <tr key={subCategory.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedSubCategories.includes(subCategory.id)}
                      onChange={() => handleSelect(subCategory.id)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    #{subCategory.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <FiLayers className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {subCategory.name}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {subCategory.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {getCategoryName(subCategory.category_id)}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(subCategory.status)}`}>
                      {subCategory.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {subCategory.created_at ? new Date(subCategory.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {subCategory.updated_at ? new Date(subCategory.updated_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/subcategories/edit/${subCategory.id}`)}
                        className={`p-1.5 rounded-lg transition-colors
                          ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                        title="Edit"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(subCategory.id)}
                        disabled={deleteLoading && deleteId === subCategory.id}
                        className={`p-1.5 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20
                          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                          disabled:opacity-50 disabled:cursor-not-allowed`}
                        title="Delete"
                      >
                        {deleteLoading && deleteId === subCategory.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-500 border-t-transparent"></div>
                        ) : (
                          <FiTrash2 className="text-sm hover:text-red-500" />
                        )}
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
          <div className={`p-12 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <FiFolder className="text-5xl mx-auto mb-4 opacity-30" />
            <p className="text-lg mb-2">No subcategories found</p>
            <p className="text-sm mb-4">
              {searchTerm ? 'Try adjusting your search' : 'Add your first subcategory to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate('/admin/subcategories/create')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center gap-2"
              >
                <FiPlus className="text-sm" />
                Add Subcategory
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm order-2 sm:order-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSubCategories.length)} of {filteredSubCategories.length} subcategories
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

export default SubCategoryList;