
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiStar, FiArrowRight, FiClock, FiCheck } from "react-icons/fi";
import axios from 'axios';
import { useCart } from "../../context/CartContext"; // Import cart context

const ProductsSection = () => {
  const { addToCart } = useCart(); // Get addToCart from context
  const [activeFilter, setActiveFilter] = useState("latest");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for button animations
  const [addedStates, setAddedStates] = useState({});
  const [animatingStates, setAnimatingStates] = useState({});
  
  const sectionRef = useRef(null);

  const filters = [
    { id: "latest", label: "Latest Items", icon: FiClock },
    { id: "rating", label: "Top Rating", icon: FiStar },
  ];

  // Fetch Products logic
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        
        // Laravel pagination handling
        const rawData = response.data.data || response.data;
        setProducts(Array.isArray(rawData) ? rawData : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Dark Mode Observer
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.style.opacity = "1";
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [loading]);

  // Filter products based on active filter
  const getFilteredProducts = () => {
    if (!products.length) return [];
    
    let sorted = [...products];
    
    if (activeFilter === "latest") {
      // Sort by created_at date (newest first)
      sorted.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else if (activeFilter === "rating") {
      // Sort by rating (highest first)
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    return sorted.slice(0, 4); // Show up to 8 products (2 rows of 4)
  };

  const getImageUrl = (product) => {
    const img = product.image1 || product.image;
    if (!img) return '';
    return img.startsWith('http') ? img : `http://127.0.0.1:8000/storage/${img}`;
  };

  // Handle Add to Cart with animation
  const handleAddToCart = async (product, e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    
    const productId = product.id;
    
    // Don't do anything if already animating or added
    if (animatingStates[productId] || addedStates[productId]) {
      return;
    }
    
    try {
      // Start animation
      setAnimatingStates(prev => ({ ...prev, [productId]: true }));
      
      // Add to cart using context
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: getImageUrl(product),
        quantity: 1
      });
      
      // Show success state
      setTimeout(() => {
        setAnimatingStates(prev => ({ ...prev, [productId]: false }));
        setAddedStates(prev => ({ ...prev, [productId]: true }));
      }, 500);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setAddedStates(prev => ({ ...prev, [productId]: false }));
      }, 2000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Reset animation on error
      setAnimatingStates(prev => ({ ...prev, [productId]: false }));
      
      // Show error message (optional)
      alert('Failed to add to cart. Please try again.');
    }
  };

  if (loading) return (
    <div className={`py-20 text-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-2"></div>
      <p>Loading products...</p>
    </div>
  );

  if (error) return (
    <div className={`py-20 text-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <p className="text-red-500">{error}</p>
    </div>
  );

  const filteredProducts = getFilteredProducts();

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      
      {/* Gradient Backgrounds */}
      <div className={`absolute top-0 right-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-bl from-blue-900/30 via-blue-800/10 to-transparent' 
          : 'bg-gradient-to-bl from-blue-100/30 via-blue-50/20 to-transparent'
      }`}></div>
      
      <div className={`absolute bottom-0 left-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-tr from-cyan-900/30 via-transparent to-transparent' 
          : 'bg-gradient-to-tr from-cyan-100/30 via-transparent to-transparent'
      }`}></div>
      
      {/* Overlay for depth */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
      }`}></div>

      <div 
        ref={sectionRef} 
        style={{ opacity: 0 }} 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Header with Title and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          {/* Left side - Dynamic Title */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                {activeFilter === "latest" ? "New Arrivals" : "Top Rated"}
              </span>{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
          </div>

          {/* Right side - Filter Buttons with separators */}
          <div className="flex items-center gap-1">
            {filters.map((filter, index) => {
              const Icon = filter.icon;
              return (
                <React.Fragment key={filter.id}>
                  <button
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300
                      ${activeFilter === filter.id 
                        ? 'text-blue-600' 
                        : isDarkMode 
                          ? 'text-gray-400 hover:text-blue-400' 
                          : 'text-gray-500 hover:text-blue-600'
                      }`}
                  >
                    <Icon className="text-base" />
                    <span>{filter.label}</span>
                  </button>
                  {index < filters.length - 1 && (
                    <span className={`text-lg mx-1 transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-700' : 'text-gray-300'
                    }`}>|</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAnimating = animatingStates[product.id];
              const isAdded = addedStates[product.id];
              
              return (
                <div
                  key={product.id}
                  className={`group rounded-xl p-4 transition-all duration-300 relative ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700 hover:shadow-lg hover:shadow-blue-900/30 hover:border-blue-700' 
                      : 'bg-white border border-gray-200 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300'
                  }`}
                >
                  {/* NEW Badge - show if product is new (you can customize this logic) */}
                  {product.is_new && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 
                                  text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      NEW
                    </div>
                  )}

                  <Link to={`/product/${product.slug || product.id}`} className="block">
                    {/* Image Container */}
                    <div className="relative mb-4 flex justify-center">
                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-500 ${
                                      isDarkMode 
                                        ? 'bg-gradient-to-t from-blue-900/30 to-transparent' 
                                        : 'bg-gradient-to-t from-blue-100/50 to-transparent'
                                    }`}></div>
                      
                      <img
                        src={getImageUrl(product)}
                        alt={product.name}
                        className="relative w-28 h-28 object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { 
                          e.target.src = "https://via.placeholder.com/150?text=No+Image" 
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="text-center">
                      <h4 className={`font-semibold mb-2 text-sm line-clamp-2 min-h-[40px] transition-colors duration-500 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {product.name}
                      </h4>

                      {/* Rating Stars */}
                      <div className="flex items-center justify-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`text-xs ${
                              i < (product.rating || 5) 
                                ? 'text-blue-500 fill-current' 
                                : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.rating || 5}.0)</span>
                      </div>

                      {/* Price */}
                      <p className={`text-lg font-bold mb-3 transition-colors duration-500 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        ${Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>

                  {/* Add to Cart Button with Animation */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={isAnimating || isAdded}
                    className={`w-full px-3 py-2 border rounded-lg text-sm
                             transition-all duration-300
                             flex items-center justify-center gap-2
                             group/btn ${
                               isAdded
                                 ? 'bg-green-500 text-white border-green-500 cursor-not-allowed'
                                 : isAnimating
                                   ? 'bg-blue-400 text-white border-blue-400 cursor-wait'
                                   : isDarkMode 
                                     ? 'border-blue-600 text-blue-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-blue-600' 
                                     : 'border-blue-500 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-blue-600'
                             }`}
                  >
                    {isAdded ? (
                      <>
                        <FiCheck className="text-sm animate-bounce" />
                        <span>Added!</span>
                      </>
                    ) : isAnimating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <FiShoppingBag className="text-sm group-hover/btn:text-white" />
                        <span>Add to cart</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No products found.
          </div>
        )}

        {/* View All Link */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 font-semibold 
                       transition-colors duration-300 text-blue-600 hover:text-blue-700"
            >
              <span>View all products</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fade-in-up { 
          animation: fade-in-up 0.6s ease-out forwards; 
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-bounce {
          animation: bounce 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;