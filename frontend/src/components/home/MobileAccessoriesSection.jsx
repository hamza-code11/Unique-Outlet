// File name: MobileAccessoriesSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiStar, FiArrowRight, FiCheck } from "react-icons/fi";
import axios from 'axios';
import { useCart } from "../../context/CartContext";
import { API_URL, STORAGE_URL } from "../../config";

const MobileAccessoriesSection = () => {
  const { addToCart } = useCart();
  const sectionRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for button animations
  const [addedStates, setAddedStates] = useState({});
  const [animatingStates, setAnimatingStates] = useState({});

  // Check for dark mode class on html element
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Fetch all products and filter by category ID 2 (Mobile Accessories)
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        
        // Fetch ALL products first
        const response = await axios.get(`${API_URL}/products`);
        
        // Laravel pagination handling
        const rawData = response.data.data || response.data;
        const allProducts = Array.isArray(rawData) ? rawData : [];
        
        // Filter products where category_id is 2 (Mobile Accessories category)
        const accessoriesProducts = allProducts.filter(product => {
          // Check different possible category field names
          const categoryId = product.category_id || product.categoryId || product.category?.id;
          return categoryId == 2; // Use == for comparison (string/number)
        });
        
        console.log('All products:', allProducts.length);
        console.log('Accessories products:', accessoriesProducts.length);
        
        // Randomly select 4 products
        const shuffled = [...accessoriesProducts].sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 4);
        
        setProducts(selectedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load accessories');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAccessories();
  }, []); // Empty dependency array means it runs once on mount

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const getImageUrl = (product) => {
    const img = product.image1 || product.image;
    if (!img) return '';
    return img.startsWith('http') ? img : `${STORAGE_URL}/${img}`;
  };

  // Handle Add to Cart with animation
  const handleAddToCart = async (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productId = product.id;
    
    if (animatingStates[productId] || addedStates[productId]) {
      return;
    }
    
    try {
      setAnimatingStates(prev => ({ ...prev, [productId]: true }));
      
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: getImageUrl(product),
        quantity: 1
      });
      
      setTimeout(() => {
        setAnimatingStates(prev => ({ ...prev, [productId]: false }));
        setAddedStates(prev => ({ ...prev, [productId]: true }));
      }, 500);
      
      setTimeout(() => {
        setAddedStates(prev => ({ ...prev, [productId]: false }));
      }, 2000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAnimatingStates(prev => ({ ...prev, [productId]: false }));
    }
  };

  if (loading) return (
    <div className={`py-20 text-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-2"></div>
      <p>Loading mobile accessories...</p>
    </div>
  );

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Background gradient effects - dynamic */}
      <div className={`absolute top-0 left-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent' 
          : 'bg-gradient-to-br from-blue-100/30 via-blue-50/20 to-transparent'
      }`}></div>
      
      <div className={`absolute bottom-0 right-0 w-3/4 h-3/4 rounded-full blur-3xl transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-tl from-cyan-900/30 via-transparent to-transparent' 
          : 'bg-gradient-to-tl from-cyan-100/30 via-transparent to-transparent'
      }`}></div>
      
      {/* Overlay for depth - dynamic */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
      }`}></div>

      <div 
        ref={sectionRef} 
        style={{ opacity: 0 }} 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section heading with theme styling */}
        <div className="text-center mb-12">
          {/* Heading with gradient */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              Mobile
            </span>{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Accessories
            </span>
          </h2>

          <p className={`text-sm sm:text-base mt-4 max-w-2xl mx-auto transition-colors duration-500 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Complete your setup with our premium mobile accessories. 
            Quality you can trust, style you'll love.
          </p>
          
          {/* Show count if needed */}
          {products.length > 0 && (
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Featuring {products.length} hand-picked accessories
            </p>
          )}
        </div>

        {/* Cards row */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => {
              const isAnimating = animatingStates[product.id];
              const isAdded = addedStates[product.id];
              
              return (
                <div 
                  key={product.id} 
                  className={`group rounded-xl p-5 transition-all duration-300 relative ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700 hover:shadow-lg hover:shadow-blue-900/30 hover:border-blue-700' 
                      : 'bg-white border border-gray-200 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300'
                  }`}
                >
                  {/* NEW Badge if product is new */}
                  {product.is_new && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 
                                  text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      NEW
                    </div>
                  )}

                  <Link to={`/product/${product.slug || product.id}`} className="block">
                    {/* Image container */}
                    <div className="relative mb-4 flex justify-center">
                      {/* Glow effect on hover - dynamic */}
                      <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-500 ${
                                      isDarkMode 
                                        ? 'bg-gradient-to-t from-blue-900/30 to-transparent' 
                                        : 'bg-gradient-to-t from-blue-100/50 to-transparent'
                                    }`}></div>
                      
                      <img
                        src={getImageUrl(product)}
                        alt={product.name}
                        className="relative w-32 h-32 object-contain group-hover:scale-105 
                                 transition-transform duration-500"
                        onError={(e) => { 
                          e.target.src = "https://via.placeholder.com/150?text=Accessory" 
                        }}
                      />
                    </div>

                    {/* Product info */}
                    <div className="text-center">
                      {/* Rating stars */}
                      <div className="flex items-center justify-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`text-sm ${
                              i < (product.rating || 5) 
                                ? 'text-blue-500 fill-current' 
                                : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.rating || 5}.0)</span>
                      </div>

                      <h3 className={`font-semibold text-base mb-2 line-clamp-2 min-h-[48px] transition-colors duration-500 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {product.name}
                      </h3>

                      <p className="text-lg font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                                 bg-clip-text text-transparent">
                        ${Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>

                  {/* Add to cart button with animation */}
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
            <p className="text-lg mb-2">No accessories found</p>
            <p className="text-sm">Check back later for new products</p>
          </div>
        )}

        {/* View all link */}
        {products.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className={`group inline-flex items-center gap-2 font-semibold 
                       transition-colors duration-300 ${
                         isDarkMode 
                           ? 'text-blue-400 hover:text-blue-300' 
                           : 'text-blue-600 hover:text-blue-700'
                       }`}
            >
              <span>View all accessories</span>
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

export default MobileAccessoriesSection;