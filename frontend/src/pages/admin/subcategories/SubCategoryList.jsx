import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, 
  FiChevronLeft, FiChevronRight, FiMoreVertical,
  FiFolder, FiLayers
} from "react-icons/fi";

const SubCategoryList = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  // Sample subcategory data
  const subCategories = [
    { 
      id: 1, 
      name: "Starter Kits", 
      slug: "starter-kits",
      parentCategory: "Vapes",
      products: 15,
      status: "active",
      createdAt: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Pod Systems", 
      slug: "pod-systems",
      parentCategory: "Vapes",
      products: 12,
      status: "active",
      createdAt: "2024-01-14"
    },
    { 
      id: 3, 
      name: "Box Mods", 
      slug: "box-mods",
      parentCategory: "Vapes",
      products: 8,
      status: "active",
      createdAt: "2024-01-13"
    },
    { 
      id: 4, 
      name: "E-Liquids", 
      slug: "e-liquids",
      parentCategory: "Vapes",
      products: 28,
      status: "active",
      createdAt: "2024-01-12"
    },
    { 
      id: 5, 
      name: "Phone Cases", 
      slug: "phone-cases",
      parentCategory: "Mobile Accessories",
      products: 31,
      status: "active",
      createdAt: "2024-01-11"
    },
    { 
      id: 6, 
      name: "Chargers", 
      slug: "chargers",
      parentCategory: "Mobile Accessories",
      products: 23,
      status: "active",
      createdAt: "2024-01-10"
    },
    { 
      id: 7, 
      name: "Power Banks", 
      slug: "power-banks",
      parentCategory: "Mobile Accessories",
      products: 17,
      status: "inactive",
      createdAt: "2024-01-09"
    },
    { 
      id: 8, 
      name: "Cables", 
      slug: "cables",
      parentCategory: "Mobile Accessories",
      products: 42,
      status: "active",
      createdAt: "2024-01-08"
    },
    { 
      id: 9, 
      name: "Disposable Vapes", 
      slug: "disposable-vapes",
      parentCategory: "Vapes",
      products: 22,
      status: "active",
      createdAt: "2024-01-07"
    },
    { 
      id: 10, 
      name: "Wireless Chargers", 
      slug: "wireless-chargers",
      parentCategory: "Mobile Accessories",
      products: 14,
      status: "active",
      createdAt: "2024-01-06"
    },
  ];

  // Filter subcategories based on search
  const filteredSubCategories = subCategories.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.parentCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Handle delete
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this subcategory?')) {
      console.log('Delete subcategory:', id);
      // Add your delete logic here
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedSubCategories.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedSubCategories.length} subcategories?`)) {
      console.log('Delete subcategories:', selectedSubCategories);
      setSelectedSubCategories([]);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Subcategories
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your product subcategories
          </p>
        </div>
        
        <button
          onClick={() => navigate('/admin/subcategories/create')}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
        >
          <FiPlus className="text-base" />
          <span>Add Subcategory</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 relative max-w-md">
        <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          type="text"
          placeholder="Search subcategories..."
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
            {selectedSubCategories.length} subcategory(ies) selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Delete Selected
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
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subcategory</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Parent Category</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Products</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Created</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((subCategory) => (
                <tr key={subCategory.id}>
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
                    {subCategory.parentCategory}
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {subCategory.products}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(subCategory.status)}`}>
                      {subCategory.status}
                    </span>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(subCategory.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/subcategories/edit/${subCategory.id}`)}
                        className={`p-1.5 rounded-lg transition-colors
                          ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(subCategory.id)}
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
            <p className="text-sm">No subcategories found</p>
            <p className="text-xs mt-1">Try adjusting your search or add a new subcategory</p>
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