import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch, 
  FiChevronLeft, FiChevronRight, FiMoreVertical,
  FiTag, FiFolder, FiEyeOff
} from "react-icons/fi";

const CategoryList = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Sample category data
  const categories = [
    { 
      id: 1, 
      name: "Vapes", 
      slug: "vapes",
      parent: null,
      products: 45,
      status: "active",
      image: null,
      createdAt: "2024-01-15",
      featured: true,
      showInMenu: true
    },
    { 
      id: 2, 
      name: "Mobile Accessories", 
      slug: "mobile-accessories",
      parent: null,
      products: 32,
      status: "active",
      image: null,
      createdAt: "2024-01-14",
      featured: false,
      showInMenu: true
    },
    { 
      id: 3, 
      name: "E-Liquids", 
      slug: "e-liquids",
      parent: "Vapes",
      products: 28,
      status: "active",
      image: null,
      createdAt: "2024-01-13",
      featured: true,
      showInMenu: true
    },
    { 
      id: 4, 
      name: "Devices", 
      slug: "devices",
      parent: "Vapes",
      products: 19,
      status: "inactive",
      image: null,
      createdAt: "2024-01-12",
      featured: false,
      showInMenu: false
    },
    { 
      id: 5, 
      name: "Pod Systems", 
      slug: "pod-systems",
      parent: "Devices",
      products: 12,
      status: "active",
      image: null,
      createdAt: "2024-01-11",
      featured: false,
      showInMenu: true
    },
    { 
      id: 6, 
      name: "Starter Kits", 
      slug: "starter-kits",
      parent: "Vapes",
      products: 15,
      status: "active",
      image: null,
      createdAt: "2024-01-10",
      featured: true,
      showInMenu: true
    },
    { 
      id: 7, 
      name: "Chargers", 
      slug: "chargers",
      parent: "Mobile Accessories",
      products: 23,
      status: "active",
      image: null,
      createdAt: "2024-01-09",
      featured: false,
      showInMenu: true
    },
    { 
      id: 8, 
      name: "Phone Cases", 
      slug: "phone-cases",
      parent: "Mobile Accessories",
      products: 31,
      status: "active",
      image: null,
      createdAt: "2024-01-08",
      featured: false,
      showInMenu: true
    },
    { 
      id: 9, 
      name: "Power Banks", 
      slug: "power-banks",
      parent: "Mobile Accessories",
      products: 17,
      status: "inactive",
      image: null,
      createdAt: "2024-01-07",
      featured: false,
      showInMenu: false
    },
    { 
      id: 10, 
      name: "Disposable Vapes", 
      slug: "disposable-vapes",
      parent: "Vapes",
      products: 22,
      status: "active",
      image: null,
      createdAt: "2024-01-06",
      featured: true,
      showInMenu: true
    },
  ];

  // Filter categories based on search
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cat.parent && cat.parent.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Handle select all
  const handleSelectAll = () => {
    if (selectedCategories.length === currentItems.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(currentItems.map(cat => cat.id));
    }
  };

  // Handle select single
  const handleSelect = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(catId => catId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      console.log('Delete category:', id);
      // Add your delete logic here
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedCategories.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedCategories.length} categories?`)) {
      console.log('Delete categories:', selectedCategories);
      setSelectedCategories([]);
      // Add your bulk delete logic here
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'inactive':
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Categories
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your product categories
          </p>
        </div>
        
        <button
          onClick={() => navigate('/admin/categories/create')}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
        >
          <FiPlus className="text-base" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search Bar Only */}
      <div className="flex-1 relative max-w-md">
        <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          type="text"
          placeholder="Search categories..."
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
      {selectedCategories.length > 0 && (
        <div className={`p-4 rounded-lg flex items-center justify-between
          ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {selectedCategories.length} category(ies) selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Categories Table - Border Removed */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedCategories.length === currentItems.length && currentItems.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ID</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Parent</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Products</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Features</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Created</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((category) => (
                <tr key={category.id}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleSelect(category.id)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    #{category.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <FiTag className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {category.name}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {category.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {category.parent || <span className="text-gray-400">—</span>}
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {category.products}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(category.status)}`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {category.featured && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}`}>
                          Featured
                        </span>
                      )}
                      {!category.showInMenu && (
                        <FiEyeOff className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} title="Hidden from menu" />
                      )}
                    </div>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                        className={`p-1.5 rounded-lg transition-colors
                          ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className={`p-1.5 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20
                          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
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
            <FiFolder className="text-4xl mx-auto mb-3 opacity-50" />
            <p className="text-sm">No categories found</p>
            <p className="text-xs mt-1">Try adjusting your search or add a new category</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm order-2 sm:order-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCategories.length)} of {filteredCategories.length} categories
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

export default CategoryList;