import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiEye, FiChevronLeft, FiChevronRight, 
  FiChevronsLeft, FiChevronsRight, FiDroplet,
  FiWind, FiCoffee
} from "react-icons/fi";

// Import flavor images
import strawberryImg from "../../assets/vapes/01.png";
import mentholImg from "../../assets/vapes/01.png";
import mangoImg from "../../assets/vapes/01.png";
import blueberryImg from "../../assets/vapes/01.png";
import watermelonImg from "../../assets/vapes/01.png";
import vanillaImg from "../../assets/vapes/01.png";

// Flavor data
const FLAVORS = [
  { 
    id: 1, 
    name: "Strawberry", 
    icon: <FiDroplet />, 
    color: "from-pink-500 to-red-500", 
    image: strawberryImg,
    productId: 101,
    price: 4.50,
    description: "Sweet and juicy strawberry with a smooth finish",
    isNew: true,
    stock: 45,
    category: "Fruit"
  },
  { 
    id: 2, 
    name: "Menthol", 
    icon: <FiWind />, 
    color: "from-blue-400 to-cyan-400", 
    image: mentholImg,
    productId: 102,
    price: 4.50,
    description: "Cool and refreshing mint sensation",
    isNew: true,
    stock: 32,
    category: "Mint"
  },
  { 
    id: 3, 
    name: "Mango", 
    icon: <FiCoffee />, 
    color: "from-yellow-500 to-orange-500", 
    image: mangoImg,
    productId: 103,
    price: 5.50,
    description: "Tropical mango paradise in every puff",
    isNew: true,
    stock: 28,
    category: "Tropical"
  },
  { 
    id: 4, 
    name: "Blueberry", 
    icon: <FiDroplet />, 
    color: "from-purple-500 to-indigo-500", 
    image: blueberryImg,
    productId: 104,
    price: 4.50,
    description: "Rich and tangy wild blueberry blend",
    isNew: true,
    stock: 56,
    category: "Berry"
  },
  { 
    id: 5, 
    name: "Watermelon", 
    icon: <FiDroplet />, 
    color: "from-green-500 to-emerald-500", 
    image: watermelonImg,
    productId: 105,
    price: 5.00,
    description: "Fresh and sweet summer watermelon",
    isNew: false,
    stock: 23,
    category: "Fruit"
  },
  { 
    id: 6, 
    name: "Vanilla", 
    icon: <FiDroplet />, 
    color: "from-amber-400 to-yellow-400", 
    image: vanillaImg,
    productId: 106,
    price: 4.50,
    description: "Smooth creamy vanilla custard",
    isNew: false,
    stock: 41,
    category: "Dessert"
  },
];

const ITEMS_PER_PAGE = 5;

const FlavorsTab = ({ isDarkMode, selectedFlavor, setSelectedFlavor }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter flavors based on search
  const filteredFlavors = useMemo(() => {
    return FLAVORS.filter(flavor => 
      flavor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flavor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flavor.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredFlavors.length / ITEMS_PER_PAGE);
  const paginatedFlavors = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredFlavors.slice(startIndex, endIndex);
  }, [filteredFlavors, currentPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle flavor selection
  const handleFlavorClick = (flavorId) => {
    setSelectedFlavor(flavorId);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Flavors List ({filteredFlavors.length} flavors)
        </h3>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search flavors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`px-4 py-2 pl-9 rounded-lg border text-sm w-full sm:w-64
              ${isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <svg
            className={`absolute left-3 top-2.5 h-4 w-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      {/* Table View */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* Table Header */}
          <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Flavor Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {paginatedFlavors.length > 0 ? (
              paginatedFlavors.map((flavor) => (
                <tr 
                  key={flavor.id}
                  onClick={() => handleFlavorClick(flavor.id)}
                  className={`cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50
                    ${flavor.id === selectedFlavor ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                >
                  {/* Image Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative">
                        <img 
                          src={flavor.image} 
                          alt={flavor.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full 
                                      bg-gradient-to-r ${flavor.color} 
                                      flex items-center justify-center text-white text-xs
                                      border ${isDarkMode ? 'border-gray-800' : 'border-white'}`}>
                          {flavor.icon}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Flavor Details Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {flavor.name}
                        {flavor.isNew && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                            NEW
                          </span>
                        )}
                      </span>
                      <p className={`text-xs mt-1 max-w-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {flavor.description}
                      </p>
                    </div>
                  </td>
                  
                  {/* Category Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {flavor.category}
                    </span>
                  </td>
                  
                  {/* Price Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      ${flavor.price.toFixed(2)}
                    </span>
                  </td>
                  
                  {/* Stock Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${
                      flavor.stock > 30 
                        ? 'text-green-600 dark:text-green-400' 
                        : flavor.stock > 10 
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-red-600 dark:text-red-400'
                    }`}>
                      {flavor.stock} units
                    </span>
                  </td>
                  
                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      flavor.stock > 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {flavor.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  
                  {/* Action Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/product/${flavor.productId}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs 
                               bg-gradient-to-r from-blue-600 to-cyan-600 
                               text-white rounded-lg hover:from-blue-700 
                               hover:to-cyan-700 transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiEye className="text-sm" />
                      <span>View</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No flavors found matching your search.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {filteredFlavors.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          filteredFlavors={filteredFlavors}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, setCurrentPage, filteredFlavors, ITEMS_PER_PAGE, isDarkMode }) => (
  <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredFlavors.length)} of {filteredFlavors.length} flavors
    </div>
    
    <div className="flex items-center gap-2">
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-all duration-300
          ${currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : isDarkMode
              ? 'border-gray-700 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
      >
        <FiChevronsLeft className="text-sm" />
      </button>
      
      <button
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-all duration-300
          ${currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : isDarkMode
              ? 'border-gray-700 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
      >
        <FiChevronLeft className="text-sm" />
      </button>
      
      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-300
                  ${currentPage === pageNum
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {pageNum}
              </button>
            );
          } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
            return <span key={i} className="text-gray-400">...</span>;
          }
          return null;
        })}
      </div>
      
      <button
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border transition-all duration-300
          ${currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : isDarkMode
              ? 'border-gray-700 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
      >
        <FiChevronRight className="text-sm" />
      </button>
      
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border transition-all duration-300
          ${currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : isDarkMode
              ? 'border-gray-700 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
      >
        <FiChevronsRight className="text-sm" />
      </button>
    </div>
  </div>
);

export default FlavorsTab;