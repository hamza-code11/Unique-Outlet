import React, { useState, useCallback, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";


const FilterSidebar = ({
  categories = [],
  subcategories = [],
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  priceRange,
  setPriceRange,
  search,
  setSearch,
  maxPrice = 100000,
  handleReset,
  isDarkMode,
  isMobile,
  onClose
}) => {
  // Local state for input fields
  const [minPrice, setMinPrice] = useState(priceRange?.min || 0);
  const [maxPriceValue, setMaxPriceValue] = useState(priceRange?.max || maxPrice);
  const [priceError, setPriceError] = useState("");

  // Update local state when props change
  useEffect(() => {
    setMinPrice(priceRange?.min || 0);
    setMaxPriceValue(priceRange?.max || maxPrice);
  }, [priceRange, maxPrice]);

  // Filter subcategories based on selected category
  const filteredSubs = selectedCategory
    ? subcategories.filter(sub => {
        const cat = categories.find(c => c.name === selectedCategory || c.id == selectedCategory);
        return cat && sub.category_id === cat.id;
      })
    : [];

  // Handle min price change
  const handleMinChange = (e) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    setMinPrice(value);
    setPriceError("");
  };

  // Handle max price change
  const handleMaxChange = (e) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    setMaxPriceValue(value);
    setPriceError("");
  };

  // Apply price filter
  const applyPriceFilter = () => {
    // Validation
    if (minPrice < 0) {
      setPriceError("Minimum price cannot be negative");
      return;
    }
    
    if (maxPriceValue < 0) {
      setPriceError("Maximum price cannot be negative");
      return;
    }
    
    if (minPrice > maxPriceValue) {
      setPriceError("Minimum price cannot be greater than maximum price");
      return;
    }

    if (maxPriceValue > maxPrice) {
      setPriceError(`Maximum price cannot exceed Rs. ${maxPrice.toLocaleString()}`);
      return;
    }

    // Apply valid price range
    setPriceRange({ min: minPrice, max: maxPriceValue });
    setPriceError("");
  };

  // Handle apply filters
  const handleApply = () => {
    applyPriceFilter();
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Handle reset with proper state clearing
  const handleResetClick = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSearch("");
    setMinPrice(0);
    setMaxPriceValue(maxPrice);
    setPriceError("");
    setPriceRange({ min: 0, max: maxPrice });
    
    if (handleReset) {
      handleReset();
    }
    
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
        {isMobile && (
          <button onClick={onClose} className="p-1">
            <FiX className={isDarkMode ? 'text-white' : 'text-gray-700'} />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Search Products
        </label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className={`w-full px-3 py-2 pl-8 rounded border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
            }`}
          />
          <FiSearch className="absolute left-2 top-3 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Category
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          <label className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
            !selectedCategory 
              ? isDarkMode ? 'bg-blue-600/20' : 'bg-blue-50' 
              : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}>
            <input
              type="radio"
              name="category"
              checked={!selectedCategory}
              onChange={() => {
                setSelectedCategory("");
                setSelectedSubCategory("");
              }}
              className="w-4 h-4 accent-blue-600"
            />
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>All Categories</span>
          </label>
          
          {categories.map(cat => (
            <label key={cat.id} className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
              selectedCategory === cat.name || selectedCategory == cat.id
                ? isDarkMode ? 'bg-blue-600/20' : 'bg-blue-50'
                : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.name || selectedCategory == cat.id}
                onChange={() => {
                  setSelectedCategory(cat.name);
                  setSelectedSubCategory("");
                }}
                className="w-4 h-4 accent-blue-600"
              />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {selectedCategory && filteredSubs.length > 0 && (
        <div className="mb-4">
          <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Subcategory
          </label>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            <label className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
              !selectedSubCategory 
                ? isDarkMode ? 'bg-purple-600/20' : 'bg-purple-50'
                : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <input
                type="radio"
                name="subcategory"
                checked={!selectedSubCategory}
                onChange={() => setSelectedSubCategory("")}
                className="w-4 h-4 accent-purple-600"
              />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>All Subcategories</span>
            </label>
            
            {filteredSubs.map(sub => (
              <label key={sub.id} className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                selectedSubCategory === sub.name || selectedSubCategory == sub.id
                  ? isDarkMode ? 'bg-purple-600/20' : 'bg-purple-50'
                  : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <input
                  type="radio"
                  name="subcategory"
                  checked={selectedSubCategory === sub.name || selectedSubCategory == sub.id}
                  onChange={() => setSelectedSubCategory(sub.name)}
                  className="w-4 h-4 accent-purple-600"
                />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{sub.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range - Using Input Fields */}
      <div className="mb-4">
        <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Price Range (Rs.)
        </label>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1">
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={minPrice}
              onChange={handleMinChange}
              placeholder="Min"
              className={`w-full px-3 py-2 rounded border text-sm ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } ${priceError ? 'border-red-500' : ''}`}
            />
          </div>
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>to</span>
          <div className="flex-1">
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={maxPriceValue}
              onChange={handleMaxChange}
              placeholder="Max"
              className={`w-full px-3 py-2 rounded border text-sm ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } ${priceError ? 'border-red-500' : ''}`}
            />
          </div>
        </div>

        {/* Error Message */}
        {priceError && (
          <p className="text-xs text-red-500 mt-1">{priceError}</p>
        )}

      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleApply}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-medium"
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetClick}
          className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;