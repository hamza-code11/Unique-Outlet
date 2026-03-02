import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiCheck } from "react-icons/fi";

const ProductCard = ({ product, isDarkMode, onAddToCart }) => {
  const [added, setAdded] = useState(false);
  
  const name = product.name || "Product";
  const price = Number(product.price) || 0;
  const slug = product.slug || product.id;
  
  // Handle image - use first available image or placeholder
  const getImageUrl = () => {
    if (product.image1) return `http://127.0.0.1:8000/storage/${product.image1}`;
    if (product.image) return product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000/storage/${product.image}`;
    // Return empty string - we'll show a color background instead
    return '';
  };

  const imageUrl = getImageUrl();

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={`rounded-lg overflow-hidden shadow hover:shadow-lg transition ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <Link to={`/product/${slug}`}>
        <div className="relative pb-[100%] bg-gray-200">
          {imageUrl ? (
            <img 
              src={imageUrl}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
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
      
      <div className="p-3">
        <Link to={`/product/${slug}`}>
          <h3 className={`font-medium mb-2 line-clamp-2 h-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-blue-600">${price.toLocaleString()}</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-3 rounded flex items-center justify-center gap-2 transition ${
            added ? 'bg-green-600' : 'bg-blue-600'
          } text-white hover:opacity-90`}
        >
          {added ? <FiCheck /> : <FiShoppingCart />}
          <span>{added ? 'Added' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};  

export default ProductCard;