import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  FiPackage, FiTrendingUp, FiTrendingDown, FiFilter,
  FiRefreshCw, FiX, FiDollarSign, FiShoppingBag,
  FiStar, FiEye, FiEyeOff
} from "react-icons/fi";

const ProductReport = () => {
  const { isDarkMode } = useOutletContext();
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("revenue");
  const [loading, setLoading] = useState(false);

  // Sample product data
  const productData = useMemo(() => ({
    summary: {
      totalProducts: 156,
      activeProducts: 142,
      lowStock: 23,
      outOfStock: 14,
      totalValue: 45678.50,
      averagePrice: 45.50
    },
    products: [
      { 
        id: 1,
        name: "Mr. Vapo E-liquid 30ml",
        category: "E-Liquids",
        price: 4.50,
        cost: 2.25,
        stock: 156,
        sold: 1234,
        revenue: 5553.00,
        profit: 2776.50,
        rating: 4.5,
        status: "active",
        views: 5678,
        conversion: 21.7
      },
      { 
        id: 2,
        name: "Starter Kit Pro",
        category: "Kits",
        price: 54.00,
        cost: 27.00,
        stock: 89,
        sold: 567,
        revenue: 30618.00,
        profit: 15309.00,
        rating: 4.8,
        status: "active",
        views: 3456,
        conversion: 16.4
      },
      { 
        id: 3,
        name: "Pod System V2",
        category: "Devices",
        price: 267.00,
        cost: 133.50,
        stock: 34,
        sold: 234,
        revenue: 62478.00,
        profit: 31239.00,
        rating: 4.7,
        status: "active",
        views: 2345,
        conversion: 10.0
      },
      { 
        id: 4,
        name: "Phone Case iPhone 15",
        category: "Accessories",
        price: 19.99,
        cost: 8.00,
        stock: 245,
        sold: 3456,
        revenue: 69085.44,
        profit: 41451.44,
        rating: 4.3,
        status: "active",
        views: 7890,
        conversion: 43.8
      },
      { 
        id: 5,
        name: "Power Bank 10000mAh",
        category: "Accessories",
        price: 35.00,
        cost: 17.50,
        stock: 67,
        sold: 890,
        revenue: 31150.00,
        profit: 15575.00,
        rating: 4.6,
        status: "low-stock",
        views: 4567,
        conversion: 19.5
      },
      { 
        id: 6,
        name: "Wireless Charger",
        category: "Accessories",
        price: 29.99,
        cost: 12.00,
        stock: 0,
        sold: 234,
        revenue: 7017.66,
        profit: 4206.66,
        rating: 4.2,
        status: "out-of-stock",
        views: 2345,
        conversion: 10.0
      },
    ],
    categories: [
      { name: "E-Liquids", count: 45, revenue: 45678.50 },
      { name: "Kits", count: 23, revenue: 67890.00 },
      { name: "Devices", count: 34, revenue: 89123.50 },
      { name: "Accessories", count: 54, revenue: 34567.00 },
    ]
  }), []);

  const handleApplyFilter = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleReset = () => {
    setCategory("all");
    setSortBy("revenue");
  };

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const formatNumber = (num) => num.toLocaleString();

  const filteredProducts = useMemo(() => {
    let filtered = [...productData.products];
    
    if (category !== "all") {
      filtered = filtered.filter(p => p.category === category);
    }
    
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'revenue': return b.revenue - a.revenue;
        case 'sold': return b.sold - a.sold;
        case 'profit': return b.profit - a.profit;
        case 'stock': return a.stock - b.stock;
        default: return 0;
      }
    });
    
    return filtered;
  }, [productData.products, category, sortBy]);

  const isFilterActive = category !== "all" || sortBy !== "revenue";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Product Report
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Analyze your product performance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Products</p>
          <p className={`text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {productData.summary.totalProducts}
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active</p>
          <p className={`text-xl font-bold mt-1 text-green-500`}>
            {productData.summary.activeProducts}
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Low Stock</p>
          <p className={`text-xl font-bold mt-1 text-yellow-500`}>
            {productData.summary.lowStock}
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Out of Stock</p>
          <p className={`text-xl font-bold mt-1 text-red-500`}>
            {productData.summary.outOfStock}
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Inventory Value</p>
          <p className={`text-xl font-bold mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {formatCurrency(productData.summary.totalValue)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
              }`}
          >
            <option value="all">All Categories</option>
            {productData.categories.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
              }`}
          >
            <option value="revenue">Sort by Revenue</option>
            <option value="sold">Sort by Units Sold</option>
            <option value="profit">Sort by Profit</option>
            <option value="stock">Sort by Stock</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyFilter}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {loading ? <FiRefreshCw className="animate-spin" /> : <FiFilter />}
            Apply
          </button>

          {isFilterActive && (
            <button
              onClick={handleReset}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2
                ${isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              <FiRefreshCw />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sold</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Revenue</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Profit</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rating</th>
                <th className={`p-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="p-3">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.name}
                    </p>
                  </td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {product.category}
                  </td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {formatCurrency(product.price)}
                  </td>
                  <td className={`p-3 text-sm ${
                    product.stock === 0 ? 'text-red-500' :
                    product.stock < 50 ? 'text-yellow-500' :
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {product.stock}
                  </td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formatNumber(product.sold)}
                  </td>
                  <td className={`p-3 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {formatCurrency(product.revenue)}
                  </td>
                  <td className={`p-3 text-sm font-medium text-green-500`}>
                    {formatCurrency(product.profit)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400 text-xs" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {product.rating}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    {product.status === 'active' ? (
                      <FiEye className="text-green-500" />
                    ) : product.status === 'low-stock' ? (
                      <FiEye className="text-yellow-500" />
                    ) : (
                      <FiEyeOff className="text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Performance */}
      <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <h2 className={`text-base font-medium mb-4 flex items-center gap-2
          ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <FiPackage className="text-lg" />
          Category Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productData.categories.map((cat) => (
            <div key={cat.name} className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {cat.name}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {cat.count} products
              </p>
              <p className={`text-lg font-bold mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {formatCurrency(cat.revenue)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReport;