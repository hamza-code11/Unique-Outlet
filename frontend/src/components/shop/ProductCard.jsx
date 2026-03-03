  // import React, { useState } from "react";
  // import { Link } from "react-router-dom";
  // import { FiShoppingCart, FiCheck } from "react-icons/fi";

  // const ProductCard = ({ product, isDarkMode, onAddToCart }) => {
  //   const [added, setAdded] = useState(false);
    
  //   const name = product.name || "Product";
  //   const price = Number(product.price) || 0;
  //   const slug = product.slug || product.id;
    
  //   // Handle image - use first available image or placeholder
  //   const getImageUrl = () => {
  //     if (product.image1) return `http://127.0.0.1:8000/storage/${product.image1}`;
  //     if (product.image) return product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000/storage/${product.image}`;
  //     // Return empty string - we'll show a color background instead
  //     return '';
  //   };

  //   const imageUrl = getImageUrl();

  //   const handleAddToCart = (e) => {
  //     e.preventDefault();
  //     onAddToCart(product);
  //     setAdded(true);
  //     setTimeout(() => setAdded(false), 1500);
  //   };

  //   return (
  //     <div className={`rounded-lg overflow-hidden shadow hover:shadow-lg transition ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
  //       <Link to={`/product/${slug}`}>
  //         <div className="relative pb-[100%] bg-gray-200">
  //           {imageUrl ? (
  //             <img 
  //               src={imageUrl}
  //               alt={name}
  //               className="absolute inset-0 w-full h-full object-cover"
  //               loading="lazy"
  //               onError={(e) => {
  //                 e.target.style.display = 'none';
  //                 e.target.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>';
  //               }}
  //             />
  //           ) : (
  //             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
  //               No Image
  //             </div>
  //           )}
  //         </div>
  //       </Link>
        
  //       <div className="p-3">
  //         <Link to={`/product/${slug}`}>
  //           <h3 className={`font-medium mb-2 line-clamp-2 h-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
  //             {name}
  //           </h3>
  //         </Link>
          
  //         <div className="flex justify-between items-center mb-3">
  //           <span className="text-lg font-bold text-blue-600">${price.toLocaleString()}</span>
  //         </div>
          
  //         <button
  //           onClick={handleAddToCart}
  //           className={`w-full py-2 px-3 rounded flex items-center justify-center gap-2 transition ${
  //             added ? 'bg-green-600' : 'bg-blue-600'
  //           } text-white hover:opacity-90`}
  //         >
  //           {added ? <FiCheck /> : <FiShoppingCart />}
  //           <span>{added ? 'Added' : 'Add to Cart'}</span>
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };  

  // export default ProductCard;












import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiCheck, FiShoppingBag } from "react-icons/fi";

const ProductCard = ({ product, isDarkMode, onAddToCart }) => {
  const [added, setAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const name = product.name || "Product";
  const price = Number(product.price) || 0;
  const slug = product.slug || product.id;
  
  // Handle image - use first available image or placeholder
  const getImageUrl = () => {
    if (product.image1) return `http://127.0.0.1:8000/storage/${product.image1}`;
    if (product.image) return product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000/storage/${product.image}`;
    return '';
  };

  const imageUrl = getImageUrl();

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // Start animation
    setIsAnimating(true);
    
    // Add to cart
    onAddToCart(product);
    
    // Show success state after animation
    setTimeout(() => {
      setIsAnimating(false);
      setAdded(true);
    }, 300);
    
    // Reset added state
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={`rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <Link to={`/product/${slug}`}>
        <div className="relative pb-[100%] bg-gray-200 overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>';
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${slug}`}>
          <h3 className={`font-medium mb-2 line-clamp-2 h-12 hover:text-blue-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            ${price.toLocaleString()}
          </span>
        </div>
        
        {/* Animated Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAnimating || added}
          className={`relative w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 font-medium overflow-hidden
            ${added 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg'
            } transform hover:scale-[1.02] active:scale-95 disabled:opacity-90 disabled:cursor-not-allowed`}
        >
          {/* Ripple Effect Background */}
          {isAnimating && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="absolute w-full h-full bg-white/30 animate-ping"></span>
            </span>
          )}
          
          {/* Added Success Animation */}
          {added ? (
            <>
              <FiCheck className="text-lg animate-bounce" />
              <span className="animate-pulse">Added to Cart!</span>
            </>
          ) : (
            <>
              {/* Animated Cart Icon */}
              <span className={`relative ${isAnimating ? 'animate-bounce' : ''}`}>
                <FiShoppingBag className="text-lg" />
                {isAnimating && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
                )}
              </span>
              
              {/* Button Text with Loading Dots */}
              <span className="relative">
                {isAnimating ? (
                  <span className="flex items-center gap-1">
                    <span className="animate-bounce [animation-delay:-0.3s]">.</span>
                    <span className="animate-bounce [animation-delay:-0.15s]">.</span>
                    <span className="animate-bounce">.</span>
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </span>
            </>
          )}
        </button>

        {/* Add this CSS to your global styles or component */}
        <style jsx>{`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-4px);
            }
          }
          .animate-bounce {
            animation: bounce 0.5s ease infinite;
          }
          [animation-delay="-0.3s"] {
            animation-delay: -0.3s;
          }
          [animation-delay="-0.15s"] {
            animation-delay: -0.15s;
          }
        `}</style>
      </div>
    </div>
  );
};  

export default ProductCard;