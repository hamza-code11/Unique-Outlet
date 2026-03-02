import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";

const AdminProducts = () => {
  const { isDarkMode } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, name: "Mr. Vapo E-liquid 30ml", category: "Vapes", price: 4.50, stock: 156, status: "Active" },
    { id: 2, name: "Starter Kit Pro", category: "Vapes", price: 54.00, stock: 89, status: "Active" },
    { id: 3, name: "Pod System V2", category: "Vapes", price: 267.00, stock: 34, status: "Active" },
    { id: 4, name: "Phone Case iPhone 15", category: "Accessories", price: 19.99, stock: 245, status: "Active" },
    { id: 5, name: "Power Bank 10000mAh", category: "Accessories", price: 35.00, stock: 67, status: "Low Stock" },
    { id: 6, name: "Wireless Charger", category: "Accessories", price: 29.99, stock: 0, status: "Out of Stock" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Products Management
        </h1>
        
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2">
          <FiPlus />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className={`absolute left-3 top-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search products..."
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
        
        <button className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors
          ${isDarkMode
            ? 'border-gray-700 text-gray-300 hover:bg-gray-700'
            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}>
          <FiFilter />
          <span>Filter</span>
        </button>
      </div>

      {/* Products Table */}
      <div className={`rounded-xl border overflow-hidden ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ID</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product Name</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                <th className={`p-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`}>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>#{product.id}</td>
                  <td className={`p-4 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{product.category}</td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>${product.price.toFixed(2)}</td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{product.stock}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'Active' 
                        ? 'text-green-500 bg-green-500/10'
                        : product.status === 'Low Stock'
                          ? 'text-yellow-500 bg-yellow-500/10'
                          : 'text-red-500 bg-red-500/10'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className={`p-2 rounded-lg transition-colors
                        ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button className={`p-2 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20
                        ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <FiTrash2 className="text-sm hover:text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;