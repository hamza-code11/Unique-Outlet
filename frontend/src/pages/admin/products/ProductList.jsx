import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, 
  FiChevronLeft, FiChevronRight, FiMoreVertical,
  FiFolder, FiPackage, FiEye, FiEyeOff, FiImage
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const ProductList = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({});
  const [subcategories, setSubcategories] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products`);
      let productsData = [];
      
      if (Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        productsData = response.data.data;
      }
      
      setProducts(productsData);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      const catMap = {};
      (response.data || []).forEach(cat => {
        catMap[cat.id] = cat.name;
      });
      setCategories(catMap);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/subcategories`);
      const subMap = {};
      (response.data || []).forEach(sub => {
        subMap[sub.id] = sub.name;
      });
      setSubcategories(subMap);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  const getImageUrl = (product) => {
    const image = product.image1 || product.image2 || product.image3 || product.image4 || product.image5 || product.image6 || product.image;
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `${API_URL.replace('/api', '')}/storage/${image}`;
  };

  // Handle single delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeleteLoading(true);
    setDeleteId(id);
    
    try {
      // Using the DELETE API endpoint: http://127.0.0.1:8000/api/products/{id}
      await axios.delete(`${API_URL}/products/${id}`);
      
      // Remove from local state
      setProducts(products.filter(p => p.id !== id));
      setSelectedProducts(selectedProducts.filter(pid => pid !== id));
      
      // Show success message (optional)
      console.log('Product deleted successfully');
    } catch (err) {
      console.error("Error deleting product:", err);
      alert(err.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) return;
    
    setDeleteLoading(true);
    
    try {
      // Delete all selected products one by one
      await Promise.all(selectedProducts.map(id => 
        axios.delete(`${API_URL}/products/${id}`)
      ));
      
      // Remove from local state
      setProducts(products.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
      
      console.log('Products deleted successfully');
    } catch (err) {
      console.error("Error deleting products:", err);
      alert("Failed to delete some products");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    categories[product.category_id]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subcategories[product.sub_category_id]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProducts.length === currentItems.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentItems.map(product => product.id));
    }
  };

  // Handle select single
  const handleSelect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(prodId => prodId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // Handle status toggle
  const handleStatusToggle = async (product) => {
    try {
      const newStatus = product.status === 1 ? 0 : 1;
      await axios.put(`${API_URL}/products/${product.id}`, {
        ...product,
        status: newStatus
      });
      
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, status: newStatus } : p
      ));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  // Get status badge color
  const getStatusBadge = (status, stock) => {
    if (status === 0) return 'text-red-500 bg-red-500/10';
    if (stock <= 0) return 'text-red-500 bg-red-500/10';
    if (stock < 10) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-green-500 bg-green-500/10';
  };

  const getStatusText = (status, stock) => {
    if (status === 0) return 'Inactive';
    if (stock <= 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'Active';
  };

  // Format price
  const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
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
          onClick={fetchProducts}
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
            Products
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Total {products.length} products in inventory
          </p>
        </div>
        
        <button
          onClick={() => navigate('/admin/products/create')}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
        >
          <FiPlus className="text-base" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 relative max-w-md">
        <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          type="text"
          placeholder="Search by name, category, brand..."
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
      {selectedProducts.length > 0 && (
        <div className={`p-4 rounded-lg flex items-center justify-between
          ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {selectedProducts.length} product(s) selected
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

      {/* Products Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === currentItems.length && currentItems.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ID</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subcategory</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Brand</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((product) => {
                const imageUrl = getImageUrl(product);
                return (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelect(product.id)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </td>
                    <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      #{product.id}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden
                          ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          {imageUrl ? (
                            <img 
                              src={imageUrl} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '';
                                e.target.parentElement.innerHTML = '<FiImage className="text-gray-400" />';
                              }}
                            />
                          ) : (
                            <FiImage className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {product.name}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {categories[product.category_id] || 'N/A'}
                    </td>
                    <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {subcategories[product.sub_category_id] || 'N/A'}
                    </td>
                    <td className={`p-4 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {formatPrice(product.price)}
                    </td>
                    <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className={product.stock < 10 ? 'text-yellow-500' : ''}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(product.status, product.stock)}`}>
                          {getStatusText(product.status, product.stock)}
                        </span>
                        <button
                          onClick={() => handleStatusToggle(product)}
                          className={`p-1 rounded-lg transition-colors
                            ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                          title={product.status === 1 ? 'Deactivate' : 'Activate'}
                        >
                          {product.status === 1 ? (
                            <FiEye className="text-sm text-green-500" />
                          ) : (
                            <FiEyeOff className="text-sm text-gray-400" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {product.brand_name || 'N/A'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          className={`p-1.5 rounded-lg transition-colors
                            ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                          title="Edit"
                        >
                          <FiEdit2 className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deleteLoading && deleteId === product.id}
                          className={`p-1.5 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20
                            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                          title="Delete"
                        >
                          {deleteLoading && deleteId === product.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-500 border-t-transparent"></div>
                          ) : (
                            <FiTrash2 className="text-sm hover:text-red-500" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className={`p-12 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <FiFolder className="text-5xl mx-auto mb-4 opacity-30" />
            <p className="text-lg mb-2">No products found</p>
            <p className="text-sm mb-4">
              {searchTerm ? 'Try adjusting your search' : 'Add your first product to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate('/admin/products/create')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center gap-2"
              >
                <FiPlus className="text-sm" />
                Add Product
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm order-2 sm:order-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
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

export default ProductList;