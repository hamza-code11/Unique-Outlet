// import React, { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";
// import { Link, useParams } from "react-router-dom";
// import { 
//   FiStar, FiHeart, FiMinus, FiPlus, 
//   FiShoppingBag, FiCheck, FiChevronLeft, FiChevronRight,
//   FiImage
// } from "react-icons/fi";
// import Navbar from "../../components/home/Navbar";
// import Footer from "../../components/home/Footer";
// import ShopBanner from "../../components/banner/Banner";
// import axios from "axios";
// import { useCart } from "../../context/CartContext";

// // Lazy load components
// const TabsSection = lazy(() => import("../../components/tabs/TabsSection"));

// const API_URL = 'http://127.0.0.1:8000/api';
// const NO_IMAGE_SVG = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'600\' viewBox=\'0 0 600 600\'%3E%3Crect width=\'600\' height=\'600\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'300\' y=\'300\' font-family=\'Arial\' font-size=\'24\' fill=\'%23999\' text-anchor=\'middle\' dy=\'.3em\'%3ENo Image%3C/text%3E%3C/svg%3E';

// // Cache system
// const cache = {
//   products: new Map(JSON.parse(localStorage.getItem('productCache') || '[]')),
  
//   set(key, data) {
//     this.products.set(key, data);
//     try {
//       localStorage.setItem('productCache', JSON.stringify([...this.products]));
//     } catch (e) {
//       console.log('Cache storage failed');
//     }
//   },
  
//   get(key) {
//     return this.products.get(key);
//   }
// };

// // Toast Component
// const Toast = ({ message, type = 'success', onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 1500);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-50 animate-slide-in">
//       <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg backdrop-blur-sm text-sm sm:text-base ${
//         type === 'success' ? 'bg-green-500/90' : 'bg-blue-500/90'
//       } text-white`}>
//         {type === 'success' ? <FiCheck className="text-base sm:text-lg" /> : <FiShoppingBag className="text-base sm:text-lg" />}
//         <span className="font-medium">{message}</span>
//       </div>
//     </div>
//   );
// };

// // Optimized Image Component
// const OptimizedImage = ({ src, alt, className, onClick, isThumbnail = false }) => {
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState(false);
//   const imgRef = useRef();

//   useEffect(() => {
//     if (imgRef.current && imgRef.current.complete) {
//       setLoaded(true);
//     }
//   }, []);

//   const imageSrc = error ? NO_IMAGE_SVG : (src || NO_IMAGE_SVG);

//   return (
//     <div className="relative w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
//       {!loaded && !error && (
//         <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
//       )}
//       <img
//         ref={imgRef}
//         src={imageSrc}
//         alt={alt}
//         className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
//         onClick={onClick}
//         loading={isThumbnail ? "eager" : "lazy"}
//         onLoad={() => setLoaded(true)}
//         onError={() => setError(true)}
//       />
//     </div>
//   );
// };

// // Image Slider Component - Responsive
// const ImageSlider = ({ images, selectedImage, onImageChange, isDarkMode, productName }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const index = images.findIndex(img => img === selectedImage);
//     if (index !== -1) setCurrentIndex(index);
//   }, [selectedImage, images]);

//   const handlePrev = useCallback(() => {
//     const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
//     setCurrentIndex(newIndex);
//     onImageChange(images[newIndex]);
//   }, [currentIndex, images, onImageChange]);

//   const handleNext = useCallback(() => {
//     const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
//     setCurrentIndex(newIndex);
//     onImageChange(images[newIndex]);
//   }, [currentIndex, images, onImageChange]);

//   if (!images || images.length === 0) {
//     return (
//       <div className={`rounded-lg sm:rounded-xl border p-4 sm:p-6 flex justify-center items-center h-64 sm:h-80 md:h-96
//         ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
//         <div className="text-center">
//           <FiImage className="text-4xl sm:text-5xl text-gray-400 mx-auto mb-2" />
//           <p className="text-sm sm:text-base text-gray-400">No Image Available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Main Image */}
//       <div className="relative">
//         <div className={`rounded-lg sm:rounded-xl border p-4 sm:p-6 flex justify-center items-center h-64 sm:h-80 md:h-96
//           ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
//           <OptimizedImage
//             src={images[currentIndex]}
//             alt={`${productName} - Image ${currentIndex + 1}`}
//             className="max-h-full max-w-full object-contain"
//           />
//         </div>

//         {/* Navigation Arrows */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={handlePrev}
//               className={`absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full
//                 ${isDarkMode ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-white/80 text-gray-800 hover:bg-white'}
//                 hover:scale-110 transition-all shadow-lg backdrop-blur-sm`}
//               aria-label="Previous image"
//             >
//               <FiChevronLeft className="text-lg sm:text-xl" />
//             </button>
//             <button
//               onClick={handleNext}
//               className={`absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full
//                 ${isDarkMode ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-white/80 text-gray-800 hover:bg-white'}
//                 hover:scale-110 transition-all shadow-lg backdrop-blur-sm`}
//               aria-label="Next image"
//             >
//               <FiChevronRight className="text-lg sm:text-xl" />
//             </button>
//           </>
//         )}
//       </div>

//       {/* Thumbnails */}
//       {images.length > 1 && (
//         <div className="flex justify-center mt-3 sm:mt-4 gap-1 sm:gap-2 overflow-x-auto pb-2 px-2">
//           {images.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setCurrentIndex(index);
//                 onImageChange(image);
//               }}
//               className={`border-2 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0
//                 ${currentIndex === index 
//                   ? 'border-blue-500 scale-105 shadow-lg' 
//                   : isDarkMode 
//                     ? 'border-gray-700 hover:border-gray-500' 
//                     : 'border-gray-200 hover:border-gray-400'
//                 }`}
//               aria-label={`View image ${index + 1}`}
//             >
//               <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
//                 <OptimizedImage
//                   src={image}
//                   alt={`Thumbnail ${index + 1}`}
//                   className="w-full h-full object-cover"
//                   isThumbnail={true}
//                 />
//               </div>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Image Counter */}
//       {images.length > 1 && (
//         <div className="flex justify-center mt-2 sm:mt-3">
//           <span className={`text-xs px-2 sm:px-3 py-1 rounded-full ${
//             isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
//           }`}>
//             {currentIndex + 1} / {images.length}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// const ProductPage = () => {
//   const { id } = useParams();
//   const { addToCart, cartCount } = useCart();
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedFlavor, setSelectedFlavor] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [activeTab, setActiveTab] = useState("flavors");
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [productImages, setProductImages] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   const abortControllerRef = useRef(null);

//   // Dark mode detection
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };
//     checkDarkMode();
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   // Fetch product data
//   useEffect(() => {
//     if (abortControllerRef.current) abortControllerRef.current.abort();
    
//     abortControllerRef.current = new AbortController();

//     const fetchProduct = async () => {
//       const cacheKey = `product-${id}`;
//       const cached = cache.get(cacheKey);
      
//       if (cached) {
//         setProduct(cached.product);
//         setProductImages(cached.images);
//         setRelatedProducts(cached.related || []);
//         setSelectedImage(cached.images[0] || null);
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
      
//       try {
//         const endpoints = [
//           axios.get(`${API_URL}/products/${id}`, { signal: abortControllerRef.current.signal }),
//           axios.get(`${API_URL}/products/slug/${id}`, { signal: abortControllerRef.current.signal })
//         ];

//         const winner = await Promise.race(endpoints.map(p => p.catch(e => e)));
//         let productData = winner.data;

//         if (!productData || productData instanceof Error) {
//           const response = await axios.get(`${API_URL}/products`, { 
//             signal: abortControllerRef.current.signal 
//           });
//           const products = response.data || [];
//           productData = products.find(p => p.slug === id);
//         }

//         if (!productData) throw new Error("Product not found");

//         // Collect images
//         const images = [];
//         for (let i = 1; i <= 6; i++) {
//           const imgKey = `image${i}`;
//           if (productData[imgKey] && productData[imgKey] !== null) {
//             images.push(getImageUrl(productData[imgKey]));
//           }
//         }
        
//         if (productData.image && productData.image !== null) {
//           const mainImageUrl = getImageUrl(productData.image);
//           if (!images.includes(mainImageUrl)) images.unshift(mainImageUrl);
//         }

//         // Fetch related products
//         let related = [];
//         const subCatId = productData.sub_category_id || productData.sub_category?.id;
//         if (subCatId) {
//           try {
//             const relatedRes = await axios.get(`${API_URL}/products/subcategory/${subCatId}`, { 
//               signal: abortControllerRef.current.signal 
//             });
//             related = (relatedRes.data || [])
//               .filter(p => p.id !== productData.id)
//               .slice(0, 4);
//           } catch (err) {
//             console.log("No related products");
//           }
//         }

//         const productWithUrls = { ...productData, imageUrls: images };

//         cache.set(cacheKey, { product: productWithUrls, images, related });

//         setProduct(productWithUrls);
//         setProductImages(images);
//         setRelatedProducts(related);
//         setSelectedImage(images[0] || null);

//       } catch (err) {
//         if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
//           console.error("Error:", err);
//           setError("Failed to load product");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();

//     return () => abortControllerRef.current?.abort();
//   }, [id]);

//   const getImageUrl = useCallback((image) => {
//     if (!image || image === null) return NO_IMAGE_SVG;
//     if (image.startsWith('http') || image.startsWith('data:')) return image;
//     return `${API_URL.replace('/api', '')}/storage/${image}`;
//   }, []);

//   const handleQuantityChange = useCallback((type) => {
//     setQuantity(prev => type === 'increase' ? prev + 1 : Math.max(1, prev - 1));
//   }, []);

//   const toggleWishlist = useCallback(() => {
//     setIsWishlisted(prev => !prev);
//     setToastMessage(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
//     setShowToast(true);
//   }, [isWishlisted]);

//   const handleAddToCart = useCallback(() => {
//     if (!product) return;
//     for (let i = 0; i < quantity; i++) addToCart(product);
//     setToastMessage(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart`);
//     setShowToast(true);
//   }, [product, quantity, addToCart]);

//   const currentPrice = useMemo(() => Number(product?.price) || 0, [product]);
//   const originalPrice = useMemo(() => Number(product?.original_price) || currentPrice * 1.2, [currentPrice, product]);
//   const discountPercentage = useMemo(() => {
//     if (originalPrice <= currentPrice) return 0;
//     return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
//   }, [currentPrice, originalPrice]);

//   const renderStars = useCallback((rating = 4, total = 5) => {
//     return [...Array(total)].map((_, i) => (
//       <FiStar key={i} className={`text-sm sm:text-base ${
//         i < rating ? 'text-yellow-400 fill-current' : isDarkMode ? 'text-gray-600' : 'text-gray-300'
//       }`} />
//     ));
//   }, [isDarkMode]);

//   if (loading) {
//     return (
//       <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <Navbar />
//         <div className="flex-1 container mx-auto px-4 py-4 sm:py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
//             <div className="h-64 sm:h-80 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-lg sm:rounded-xl animate-pulse" />
//             <div className="space-y-3 sm:space-y-4">
//               <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse" />
//               <div className="h-4 sm:h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse" />
//               <div className="h-8 sm:h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse" />
//               <div className="h-16 sm:h-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
//               <div className="h-10 sm:h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <Navbar />
//         <ShopBanner 
//           title="Product Not Found"
//           breadcrumbItems={[
//             { name: "Home", link: "/" },
//             { name: "Shop", link: "/shop" },
//             { name: "Product" }
//           ]}
//         />
//         <div className="flex-1 container mx-auto px-4 py-12 sm:py-16 text-center">
//           <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Product Not Found</h2>
//           <p className="text-sm sm:text-base mb-6 sm:mb-8">The product you're looking for doesn't exist or has been removed.</p>
//           <Link to="/shop" className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700">
//             Continue Shopping
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const productName = product.name || "Product";
//   const categoryName = product.category?.name || product.category_name || "Category";

//   return (
//     <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-white'
//     }`}>
//       <Navbar />
      
//       {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}

//       <ShopBanner 
//         title="Product Details"
//         breadcrumbItems={[
//           { name: "Home", link: "/" },
//           { name: "Shop", link: "/shop" },
//           { name: "Product" }
//         ]}
//         showStats={false}
//         showButton={false}
//       />

//       <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12 flex-grow">
//         {/* Product Main Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          
//           {/* Images */}
//           <ImageSlider
//             images={productImages}
//             selectedImage={selectedImage}
//             onImageChange={setSelectedImage}
//             isDarkMode={isDarkMode}
//             productName={productName}
//           />

//           {/* Details */}
//           <div className="space-y-3 sm:space-y-4">
//             {/* Breadcrumb - Hidden on mobile */}
//             <div className={`hidden sm:block text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               <Link to="/" className="hover:text-blue-600">Home</Link> / 
//               <Link to="/shop" className="hover:text-blue-600 mx-2">Shop</Link> / 
//               <Link to={`/shop?category=${encodeURIComponent(categoryName)}`} className="hover:text-blue-600">{categoryName}</Link>
//             </div>

//             {/* Mobile Category Link */}
//             <div className={`sm:hidden text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               <Link to={`/shop?category=${encodeURIComponent(categoryName)}`} className="hover:text-blue-600">
//                 ← Back to {categoryName}
//               </Link>
//             </div>

//             <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold leading-tight ${
//               isDarkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               {productName}
//             </h1>

//             {/* Rating */}
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-0.5">
//                 {renderStars(product.rating || 4)}
//               </div>
//               <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 ({product.reviews_count || 0} Ratings)
//               </span>
//             </div>

//             {/* Price */}
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//               <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
//                 ${currentPrice.toFixed(2)}
//               </span>
//               {originalPrice > currentPrice && (
//                 <>
//                   <span className={`text-xs sm:text-sm line-through ${
//                     isDarkMode ? 'text-gray-500' : 'text-gray-400'
//                   }`}>
//                     ${originalPrice.toFixed(2)}
//                   </span>
//                   <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-green-500/20 text-green-600 text-xs font-medium rounded-full">
//                     -{discountPercentage}% OFF
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Description */}
//             {product.description && (
//               <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 {product.description}
//               </p>
//             )}

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
//               {/* Quantity Selector */}
//               <div className={`flex items-center justify-between sm:justify-start border rounded-lg ${
//                 isDarkMode ? 'border-gray-700' : 'border-gray-300'
//               }`}>
//                 <button
//                   onClick={() => handleQuantityChange('decrease')}
//                   className={`p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
//                     ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                   aria-label="Decrease quantity"
//                 >
//                   <FiMinus className="text-xs sm:text-sm" />
//                 </button>
//                 <span className={`px-4 sm:px-6 text-sm sm:text-base min-w-[40px] sm:min-w-[60px] text-center ${
//                   isDarkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={() => handleQuantityChange('increase')}
//                   className={`p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
//                     ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                   aria-label="Increase quantity"
//                 >
//                   <FiPlus className="text-xs sm:text-sm" />
//                 </button>
//               </div>

//               {/* Add to Cart Button */}
//               <button
//                 id="add-to-cart-btn"
//                 onClick={handleAddToCart}
//                 className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-medium rounded-lg 
//                          hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base
//                          flex items-center justify-center gap-2
//                          active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <FiShoppingBag className="text-base sm:text-lg" />
//                 <span>ADD TO CART</span>
//               </button>

//               {/* Wishlist Button */}
//               <button
//                 onClick={toggleWishlist}
//                 className={`p-2.5 sm:p-3 rounded-lg border transition-all duration-200
//                   ${isWishlisted
//                     ? 'bg-red-50 border-red-300 text-red-500 dark:bg-red-900/20 dark:border-red-700'
//                     : isDarkMode
//                       ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
//                       : 'border-gray-300 text-gray-600 hover:bg-gray-100'
//                   }`}
//                 aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//               >
//                 <FiHeart className={`text-base sm:text-lg ${isWishlisted ? 'fill-current' : ''}`} />
//               </button>
//             </div>

//             {/* Cart Count */}
//             {cartCount > 0 && (
//               <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 🛒 {cartCount} item{cartCount > 1 ? 's' : ''} in cart
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <Suspense fallback={<div className="h-24 sm:h-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />}>
//           <TabsSection
//             activeTab={activeTab}
//             onTabChange={setActiveTab}
//             isDarkMode={isDarkMode}
//             selectedFlavor={selectedFlavor}
//             setSelectedFlavor={setSelectedFlavor}
//             specifications={product.specifications}
//              product={product}
//           />
//         </Suspense>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-8 sm:mt-12">
//             <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${
//               isDarkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               You May Also Like
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
//               {relatedProducts.map((product) => (
//                 <Link 
//                   to={`/product/${product.slug || product.id}`} 
//                   key={product.id} 
//                   className={`p-3 sm:p-4 rounded-lg border hover:shadow-lg transition-all hover:-translate-y-1
//                     ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
//                 >
//                   <div className="h-16 sm:h-20 md:h-24 mb-2 flex items-center justify-center">
//                     <OptimizedImage
//                       src={getImageUrl(product.image1 || product.image)}
//                       alt={product.name}
//                       className="max-h-full max-w-full object-contain"
//                     />
//                   </div>
//                   <h3 className={`text-xs sm:text-sm font-medium mb-1 line-clamp-2 h-8 sm:h-10 ${
//                     isDarkMode ? 'text-gray-200' : 'text-gray-800'
//                   }`}>
//                     {product.name}
//                   </h3>
//                   <p className="text-xs sm:text-sm font-bold text-blue-600">
//                     ${(Number(product.price) || 0).toFixed(2)}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />

//       <style>{`
//         @keyframes slideIn {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         .animate-slide-in {
//           animation: slideIn 0.2s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductPage;

















// import React, { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";
// import { Link, useParams } from "react-router-dom";
// import { 
//   FiHeart, FiMinus, FiPlus, 
//   FiShoppingBag, FiCheck, FiChevronLeft, FiChevronRight,
//   FiImage
// } from "react-icons/fi";
// import Navbar from "../../components/home/Navbar";
// import Footer from "../../components/home/Footer";
// import ShopBanner from "../../components/banner/Banner";
// import axios from "axios";
// import { useCart } from "../../context/CartContext";

// // Lazy load components
// const TabsSection = lazy(() => import("../../components/tabs/TabsSection"));

// const API_URL = 'http://127.0.0.1:8000/api';
// const NO_IMAGE_SVG = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'600\' viewBox=\'0 0 600 600\'%3E%3Crect width=\'600\' height=\'600\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'300\' y=\'300\' font-family=\'Arial\' font-size=\'24\' fill=\'%23999\' text-anchor=\'middle\' dy=\'.3em\'%3ENo Image%3C/text%3E%3C/svg%3E';

// // Cache system
// const cache = {
//   products: new Map(JSON.parse(localStorage.getItem('productCache') || '[]')),
  
//   set(key, data) {
//     this.products.set(key, data);
//     try {
//       localStorage.setItem('productCache', JSON.stringify([...this.products]));
//     } catch (e) {
//       console.log('Cache storage failed');
//     }
//   },
  
//   get(key) {
//     return this.products.get(key);
//   }
// };

// // Toast Component
// const Toast = ({ message, type = 'success', onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 1500);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-50 animate-slide-in">
//       <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg backdrop-blur-sm text-sm sm:text-base ${
//         type === 'success' ? 'bg-green-500/90' : 'bg-blue-500/90'
//       } text-white`}>
//         {type === 'success' ? <FiCheck className="text-base sm:text-lg" /> : <FiShoppingBag className="text-base sm:text-lg" />}
//         <span className="font-medium">{message}</span>
//       </div>
//     </div>
//   );
// };

// // Optimized Image Component
// const OptimizedImage = ({ src, alt, className, onClick, isThumbnail = false }) => {
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState(false);
//   const imgRef = useRef();

//   useEffect(() => {
//     if (imgRef.current && imgRef.current.complete) {
//       setLoaded(true);
//     }
//   }, []);

//   const imageSrc = error ? NO_IMAGE_SVG : (src || NO_IMAGE_SVG);

//   return (
//     <div className="relative w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
//       {!loaded && !error && (
//         <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
//       )}
//       <img
//         ref={imgRef}
//         src={imageSrc}
//         alt={alt}
//         className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
//         onClick={onClick}
//         loading={isThumbnail ? "eager" : "lazy"}
//         onLoad={() => setLoaded(true)}
//         onError={() => setError(true)}
//       />
//     </div>
//   );
// };

// // Image Slider Component - Responsive
// const ImageSlider = ({ images, selectedImage, onImageChange, isDarkMode, productName }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const index = images.findIndex(img => img === selectedImage);
//     if (index !== -1) setCurrentIndex(index);
//   }, [selectedImage, images]);

//   const handlePrev = useCallback(() => {
//     const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
//     setCurrentIndex(newIndex);
//     onImageChange(images[newIndex]);
//   }, [currentIndex, images, onImageChange]);

//   const handleNext = useCallback(() => {
//     const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
//     setCurrentIndex(newIndex);
//     onImageChange(images[newIndex]);
//   }, [currentIndex, images, onImageChange]);

//   if (!images || images.length === 0) {
//     return (
//       <div className={`rounded-lg sm:rounded-xl border p-4 sm:p-6 flex justify-center items-center h-64 sm:h-80 md:h-96
//         ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
//         <div className="text-center">
//           <FiImage className="text-4xl sm:text-5xl text-gray-400 mx-auto mb-2" />
//           <p className="text-sm sm:text-base text-gray-400">No Image Available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Main Image */}
//       <div className="relative">
//         <div className={`rounded-lg sm:rounded-xl border p-4 sm:p-6 flex justify-center items-center h-64 sm:h-80 md:h-96
//           ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
//           <OptimizedImage
//             src={images[currentIndex]}
//             alt={`${productName} - Image ${currentIndex + 1}`}
//             className="max-h-full max-w-full object-contain"
//           />
//         </div>

//         {/* Navigation Arrows */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={handlePrev}
//               className={`absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full
//                 ${isDarkMode ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-white/80 text-gray-800 hover:bg-white'}
//                 hover:scale-110 transition-all shadow-lg backdrop-blur-sm`}
//               aria-label="Previous image"
//             >
//               <FiChevronLeft className="text-lg sm:text-xl" />
//             </button>
//             <button
//               onClick={handleNext}
//               className={`absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full
//                 ${isDarkMode ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-white/80 text-gray-800 hover:bg-white'}
//                 hover:scale-110 transition-all shadow-lg backdrop-blur-sm`}
//               aria-label="Next image"
//             >
//               <FiChevronRight className="text-lg sm:text-xl" />
//             </button>
//           </>
//         )}
//       </div>

//       {/* Thumbnails */}
//       {images.length > 1 && (
//         <div className="flex justify-center mt-3 sm:mt-4 gap-1 sm:gap-2 overflow-x-auto pb-2 px-2">
//           {images.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setCurrentIndex(index);
//                 onImageChange(image);
//               }}
//               className={`border-2 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0
//                 ${currentIndex === index 
//                   ? 'border-blue-500 scale-105 shadow-lg' 
//                   : isDarkMode 
//                     ? 'border-gray-700 hover:border-gray-500' 
//                     : 'border-gray-200 hover:border-gray-400'
//                 }`}
//               aria-label={`View image ${index + 1}`}
//             >
//               <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
//                 <OptimizedImage
//                   src={image}
//                   alt={`Thumbnail ${index + 1}`}
//                   className="w-full h-full object-cover"
//                   isThumbnail={true}
//                 />
//               </div>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Image Counter */}
//       {images.length > 1 && (
//         <div className="flex justify-center mt-2 sm:mt-3">
//           <span className={`text-xs px-2 sm:px-3 py-1 rounded-full ${
//             isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
//           }`}>
//             {currentIndex + 1} / {images.length}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// const ProductPage = () => {
//   const { id } = useParams();
//   const { addToCart, cartCount } = useCart();
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedFlavor, setSelectedFlavor] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [activeTab, setActiveTab] = useState("flavors");
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [productImages, setProductImages] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   const abortControllerRef = useRef(null);

//   // Dark mode detection
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };
//     checkDarkMode();
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   // Fetch product data
//   useEffect(() => {
//     if (abortControllerRef.current) abortControllerRef.current.abort();
    
//     abortControllerRef.current = new AbortController();

//     const fetchProduct = async () => {
//       const cacheKey = `product-${id}`;
//       const cached = cache.get(cacheKey);
      
//       if (cached) {
//         setProduct(cached.product);
//         setProductImages(cached.images);
//         setRelatedProducts(cached.related || []);
//         setSelectedImage(cached.images[0] || null);
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
      
//       try {
//         const endpoints = [
//           axios.get(`${API_URL}/products/${id}`, { signal: abortControllerRef.current.signal }),
//           axios.get(`${API_URL}/products/slug/${id}`, { signal: abortControllerRef.current.signal })
//         ];

//         const winner = await Promise.race(endpoints.map(p => p.catch(e => e)));
//         let productData = winner.data;

//         if (!productData || productData instanceof Error) {
//           const response = await axios.get(`${API_URL}/products`, { 
//             signal: abortControllerRef.current.signal 
//           });
//           const products = response.data || [];
//           productData = products.find(p => p.slug === id);
//         }

//         if (!productData) throw new Error("Product not found");

//         // Collect images
//         const images = [];
//         for (let i = 1; i <= 6; i++) {
//           const imgKey = `image${i}`;
//           if (productData[imgKey] && productData[imgKey] !== null) {
//             images.push(getImageUrl(productData[imgKey]));
//           }
//         }
        
//         if (productData.image && productData.image !== null) {
//           const mainImageUrl = getImageUrl(productData.image);
//           if (!images.includes(mainImageUrl)) images.unshift(mainImageUrl);
//         }

//         // Fetch related products
//         let related = [];
//         const subCatId = productData.sub_category_id || productData.sub_category?.id;
//         if (subCatId) {
//           try {
//             const relatedRes = await axios.get(`${API_URL}/products/subcategory/${subCatId}`, { 
//               signal: abortControllerRef.current.signal 
//             });
//             related = (relatedRes.data || [])
//               .filter(p => p.id !== productData.id)
//               .slice(0, 4);
//           } catch (err) {
//             console.log("No related products");
//           }
//         }

//         const productWithUrls = { ...productData, imageUrls: images };

//         cache.set(cacheKey, { product: productWithUrls, images, related });

//         setProduct(productWithUrls);
//         setProductImages(images);
//         setRelatedProducts(related);
//         setSelectedImage(images[0] || null);

//       } catch (err) {
//         if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
//           console.error("Error:", err);
//           setError("Failed to load product");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();

//     return () => abortControllerRef.current?.abort();
//   }, [id]);

//   const getImageUrl = useCallback((image) => {
//     if (!image || image === null) return NO_IMAGE_SVG;
//     if (image.startsWith('http') || image.startsWith('data:')) return image;
//     return `${API_URL.replace('/api', '')}/storage/${image}`;
//   }, []);

//   const handleQuantityChange = useCallback((type) => {
//     setQuantity(prev => type === 'increase' ? prev + 1 : Math.max(1, prev - 1));
//   }, []);

//   const toggleWishlist = useCallback(() => {
//     setIsWishlisted(prev => !prev);
//     setToastMessage(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
//     setShowToast(true);
//   }, [isWishlisted]);

//   const handleAddToCart = useCallback(() => {
//     if (!product) return;
//     for (let i = 0; i < quantity; i++) addToCart(product);
//     setToastMessage(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart`);
//     setShowToast(true);
//   }, [product, quantity, addToCart]);

//   const currentPrice = useMemo(() => Number(product?.price) || 0, [product]);
//   const originalPrice = useMemo(() => Number(product?.original_price) || currentPrice * 1.2, [currentPrice, product]);
//   const discountPercentage = useMemo(() => {
//     if (originalPrice <= currentPrice) return 0;
//     return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
//   }, [currentPrice, originalPrice]);

//   if (loading) {
//     return (
//       <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <Navbar />
//         <div className="flex-1 container mx-auto px-4 py-4 sm:py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
//             <div className="h-64 sm:h-80 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-lg sm:rounded-xl animate-pulse" />
//             <div className="space-y-3 sm:space-y-4">
//               <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse" />
//               <div className="h-4 sm:h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse" />
//               <div className="h-8 sm:h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse" />
//               <div className="h-16 sm:h-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
//               <div className="h-10 sm:h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <Navbar />
//         <ShopBanner 
//           title="Product Not Found"
//           breadcrumbItems={[
//             { name: "Home", link: "/" },
//             { name: "Shop", link: "/shop" },
//             { name: "Product" }
//           ]}
//         />
//         <div className="flex-1 container mx-auto px-4 py-12 sm:py-16 text-center">
//           <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Product Not Found</h2>
//           <p className="text-sm sm:text-base mb-6 sm:mb-8">The product you're looking for doesn't exist or has been removed.</p>
//           <Link to="/shop" className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700">
//             Continue Shopping
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const productName = product.name || "Product";
//   const categoryName = product.category?.name || product.category_name || "Category";

//   return (
//     <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-white'
//     }`}>
//       <Navbar />
      
//       {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}

//       <ShopBanner 
//         title="Product Details"
//         breadcrumbItems={[
//           { name: "Home", link: "/" },
//           { name: "Shop", link: "/shop" },
//           { name: "Product" }
//         ]}
//         showStats={false}
//         showButton={false}
//       />

//       <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12 flex-grow">
//         {/* Product Main Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          
//           {/* Images */}
//           <ImageSlider
//             images={productImages}
//             selectedImage={selectedImage}
//             onImageChange={setSelectedImage}
//             isDarkMode={isDarkMode}
//             productName={productName}
//           />

//           {/* Details */}
//           <div className="space-y-3 sm:space-y-4">
//             {/* Breadcrumb - Hidden on mobile */}
//             <div className={`hidden sm:block text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               <Link to="/" className="hover:text-blue-600">Home</Link> / 
//               <Link to="/shop" className="hover:text-blue-600 mx-2">Shop</Link> / 
//               <Link to={`/shop?category=${encodeURIComponent(categoryName)}`} className="hover:text-blue-600">{categoryName}</Link>
//             </div>

//             {/* Mobile Category Link */}
//             <div className={`sm:hidden text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               <Link to={`/shop?category=${encodeURIComponent(categoryName)}`} className="hover:text-blue-600">
//                 ← Back to {categoryName}
//               </Link>
//             </div>

//             <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold leading-tight ${
//               isDarkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               {productName}
//             </h1>

//             {/* Price */}
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//               <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
//                 ${currentPrice.toFixed(2)}
//               </span>
//               {originalPrice > currentPrice && (
//                 <>
//                   <span className={`text-xs sm:text-sm line-through ${
//                     isDarkMode ? 'text-gray-500' : 'text-gray-400'
//                   }`}>
//                     ${originalPrice.toFixed(2)}
//                   </span>
//                   <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-green-500/20 text-green-600 text-xs font-medium rounded-full">
//                     -{discountPercentage}% OFF
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Description */}
//             {product.description && (
//               <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 {product.description}
//               </p>
//             )}

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
//               {/* Quantity Selector */}
//               <div className={`flex items-center justify-between sm:justify-start border rounded-lg ${
//                 isDarkMode ? 'border-gray-700' : 'border-gray-300'
//               }`}>
//                 <button
//                   onClick={() => handleQuantityChange('decrease')}
//                   className={`p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
//                     ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                   aria-label="Decrease quantity"
//                 >
//                   <FiMinus className="text-xs sm:text-sm" />
//                 </button>
//                 <span className={`px-4 sm:px-6 text-sm sm:text-base min-w-[40px] sm:min-w-[60px] text-center ${
//                   isDarkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={() => handleQuantityChange('increase')}
//                   className={`p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
//                     ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                   aria-label="Increase quantity"
//                 >
//                   <FiPlus className="text-xs sm:text-sm" />
//                 </button>
//               </div>

//               {/* Add to Cart Button */}
//               <button
//                 id="add-to-cart-btn"
//                 onClick={handleAddToCart}
//                 className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-medium rounded-lg 
//                          hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base
//                          flex items-center justify-center gap-2
//                          active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <FiShoppingBag className="text-base sm:text-lg" />
//                 <span>ADD TO CART</span>
//               </button>

//               {/* Wishlist Button */}
//               <button
//                 onClick={toggleWishlist}
//                 className={`p-2.5 sm:p-3 rounded-lg border transition-all duration-200
//                   ${isWishlisted
//                     ? 'bg-red-50 border-red-300 text-red-500 dark:bg-red-900/20 dark:border-red-700'
//                     : isDarkMode
//                       ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
//                       : 'border-gray-300 text-gray-600 hover:bg-gray-100'
//                   }`}
//                 aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//               >
//                 <FiHeart className={`text-base sm:text-lg ${isWishlisted ? 'fill-current' : ''}`} />
//               </button>
//             </div>

//             {/* Cart Count */}
//             {cartCount > 0 && (
//               <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 🛒 {cartCount} item{cartCount > 1 ? 's' : ''} in cart
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <Suspense fallback={<div className="h-24 sm:h-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />}>
//           <TabsSection
//             activeTab={activeTab}
//             onTabChange={setActiveTab}
//             isDarkMode={isDarkMode}
//             selectedFlavor={selectedFlavor}
//             setSelectedFlavor={setSelectedFlavor}
//             specifications={product.specifications}
//             product={product}
//           />
//         </Suspense>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-8 sm:mt-12">
//             <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${
//               isDarkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               You May Also Like
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
//               {relatedProducts.map((product) => (
//                 <Link 
//                   to={`/product/${product.slug || product.id}`} 
//                   key={product.id} 
//                   className={`p-3 sm:p-4 rounded-lg border hover:shadow-lg transition-all hover:-translate-y-1
//                     ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
//                 >
//                   <div className="h-16 sm:h-20 md:h-24 mb-2 flex items-center justify-center">
//                     <OptimizedImage
//                       src={getImageUrl(product.image1 || product.image)}
//                       alt={product.name}
//                       className="max-h-full max-w-full object-contain"
//                     />
//                   </div>
//                   <h3 className={`text-xs sm:text-sm font-medium mb-1 line-clamp-2 h-8 sm:h-10 ${
//                     isDarkMode ? 'text-gray-200' : 'text-gray-800'
//                   }`}>
//                     {product.name}
//                   </h3>
//                   <p className="text-xs sm:text-sm font-bold text-blue-600">
//                     ${(Number(product.price) || 0).toFixed(2)}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />

//       <style>{`
//         @keyframes slideIn {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         .animate-slide-in {
//           animation: slideIn 0.2s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductPage;




















import React, { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  FiHeart, FiMinus, FiPlus, 
  FiShoppingBag, FiCheck, FiChevronLeft, FiChevronRight,
  FiImage
} from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";
import axios from "axios";
import { useCart } from "../../context/CartContext";

// Lazy load components
const TabsSection = lazy(() => import("../../components/tabs/TabsSection"));

const API_URL = 'http://127.0.0.1:8000/api';
const NO_IMAGE_SVG = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'600\' viewBox=\'0 0 600 600\'%3E%3Crect width=\'600\' height=\'600\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'300\' y=\'300\' font-family=\'Arial\' font-size=\'24\' fill=\'%23999\' text-anchor=\'middle\' dy=\'.3em\'%3ENo Image%3C/text%3E%3C/svg%3E';

// Cache system
const cache = {
  products: new Map(JSON.parse(localStorage.getItem('productCache') || '[]')),
  
  set(key, data) {
    this.products.set(key, data);
    try {
      localStorage.setItem('productCache', JSON.stringify([...this.products]));
    } catch (e) {
      console.log('Cache storage failed');
    }
  },
  
  get(key) {
    return this.products.get(key);
  }
};

// Toast Component
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-50 animate-slide-in">
      <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg backdrop-blur-sm text-sm sm:text-base ${
        type === 'success' ? 'bg-green-500/90' : 'bg-blue-500/90'
      } text-white`}>
        {type === 'success' ? <FiCheck className="text-base sm:text-lg" /> : <FiShoppingBag className="text-base sm:text-lg" />}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

// Optimized Image Component
const OptimizedImage = ({ src, alt, className, onClick, isThumbnail = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  const imageSrc = error ? NO_IMAGE_SVG : (src || NO_IMAGE_SVG);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClick}
        loading={isThumbnail ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

// ✅ FIXED: ImageSlider Component - Responsive
const ImageSlider = ({ images, selectedImage, onImageChange, isDarkMode, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = images.findIndex(img => img === selectedImage);
    if (index !== -1) setCurrentIndex(index);
  }, [selectedImage, images]);

  const handlePrev = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
    onImageChange(images[newIndex]);
  }, [currentIndex, images, onImageChange]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onImageChange(images[newIndex]);
  }, [currentIndex, images, onImageChange]);

  if (!images || images.length === 0) {
    return (
      <div className={`rounded-lg sm:rounded-xl border p-4 sm:p-6 flex justify-center items-center h-64 sm:h-80 md:h-96
        ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="text-center">
          <FiImage className="text-4xl sm:text-5xl text-gray-400 mx-auto mb-2" />
          <p className="text-sm sm:text-base text-gray-400">No Image Available</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image */}
      <div className="relative">
        <div className={`rounded-lg sm:rounded-xl border p-4 sm:p-6 flex justify-center items-center h-64 sm:h-80 md:h-96
          ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <OptimizedImage
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className={`absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full
                ${isDarkMode ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-white/80 text-gray-800 hover:bg-white'}
                hover:scale-110 transition-all shadow-lg backdrop-blur-sm`}
              aria-label="Previous image"
            >
              <FiChevronLeft className="text-lg sm:text-xl" />
            </button>
            <button
              onClick={handleNext}
              className={`absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full
                ${isDarkMode ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-white/80 text-gray-800 hover:bg-white'}
                hover:scale-110 transition-all shadow-lg backdrop-blur-sm`}
              aria-label="Next image"
            >
              <FiChevronRight className="text-lg sm:text-xl" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center mt-3 sm:mt-4 gap-1 sm:gap-2 overflow-x-auto pb-2 px-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                onImageChange(image);
              }}
              className={`border-2 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0
                ${currentIndex === index 
                  ? 'border-blue-500 scale-105 shadow-lg' 
                  : isDarkMode 
                    ? 'border-gray-700 hover:border-gray-500' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              aria-label={`View image ${index + 1}`}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                <OptimizedImage
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  isThumbnail={true}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="flex justify-center mt-2 sm:mt-3">
          <span className={`text-xs px-2 sm:px-3 py-1 rounded-full ${
            isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, cartCount } = useCart();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("flavors");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // ✅ New state for selected color
  const [selectedColor, setSelectedColor] = useState(null);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // State for product colors
  const [productColors, setProductColors] = useState([]);

  const abortControllerRef = useRef(null);

  // Dark mode detection
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Fetch product data
  useEffect(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    
    abortControllerRef.current = new AbortController();

    const fetchProduct = async () => {
      const cacheKey = `product-${id}`;
      const cached = cache.get(cacheKey);
      
      if (cached) {
        setProduct(cached.product);
        setProductImages(cached.images);
        setRelatedProducts(cached.related || []);
        setSelectedImage(cached.images[0] || null);
        
        // Parse colors if available
        if (cached.product.colors) {
          parseColors(cached.product.colors);
        }
        
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        const endpoints = [
          axios.get(`${API_URL}/products/${id}`, { signal: abortControllerRef.current.signal }),
          axios.get(`${API_URL}/products/slug/${id}`, { signal: abortControllerRef.current.signal })
        ];

        const winner = await Promise.race(endpoints.map(p => p.catch(e => e)));
        let productData = winner.data;

        if (!productData || productData instanceof Error) {
          const response = await axios.get(`${API_URL}/products`, { 
            signal: abortControllerRef.current.signal 
          });
          const products = response.data || [];
          productData = products.find(p => p.slug === id);
        }

        if (!productData) throw new Error("Product not found");

        // Collect images
        const images = [];
        for (let i = 1; i <= 6; i++) {
          const imgKey = `image${i}`;
          if (productData[imgKey] && productData[imgKey] !== null) {
            images.push(getImageUrl(productData[imgKey]));
          }
        }
        
        if (productData.image && productData.image !== null) {
          const mainImageUrl = getImageUrl(productData.image);
          if (!images.includes(mainImageUrl)) images.unshift(mainImageUrl);
        }

        // Parse colors
        if (productData.colors) {
          parseColors(productData.colors);
        }

        // Fetch related products
        let related = [];
        const subCatId = productData.sub_category_id || productData.sub_category?.id;
        if (subCatId) {
          try {
            const relatedRes = await axios.get(`${API_URL}/products/subcategory/${subCatId}`, { 
              signal: abortControllerRef.current.signal 
            });
            related = (relatedRes.data || [])
              .filter(p => p.id !== productData.id)
              .slice(0, 4);
          } catch (err) {
            console.log("No related products");
          }
        }

        const productWithUrls = { ...productData, imageUrls: images };

        cache.set(cacheKey, { product: productWithUrls, images, related });

        setProduct(productWithUrls);
        setProductImages(images);
        setRelatedProducts(related);
        setSelectedImage(images[0] || null);

      } catch (err) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          console.error("Error:", err);
          setError("Failed to load product");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => abortControllerRef.current?.abort();
  }, [id]);

  // Parse colors from product data
  const parseColors = (colors) => {
    try {
      if (typeof colors === 'string') {
        setProductColors(JSON.parse(colors));
      } else if (Array.isArray(colors)) {
        setProductColors(colors);
      } else {
        setProductColors([]);
      }
    } catch (e) {
      console.error('Error parsing colors:', e);
      setProductColors([]);
    }
  };

  const getImageUrl = useCallback((image) => {
    if (!image || image === null) return NO_IMAGE_SVG;
    if (image.startsWith('http') || image.startsWith('data:')) return image;
    return `${API_URL.replace('/api', '')}/storage/${image}`;
  }, []);

  const handleQuantityChange = useCallback((type) => {
    setQuantity(prev => type === 'increase' ? prev + 1 : Math.max(1, prev - 1));
  }, []);

  const toggleWishlist = useCallback(() => {
    setIsWishlisted(prev => !prev);
    setToastMessage(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    setShowToast(true);
  }, [isWishlisted]);

  // ✅ Updated: Handle add to cart with color
  const handleAddToCart = useCallback(() => {
    if (!product) return;
    
    // Check if color is required but not selected
    if (productColors.length > 0 && !selectedColor) {
      setToastMessage('Please select a color first');
      setShowToast(true);
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedColor);
    }
    
    const colorText = selectedColor ? ` (${selectedColor})` : '';
    setToastMessage(`Added ${quantity} ${product.name}${colorText} to cart`);
    setShowToast(true);
    
    // Reset selected color after adding to cart (optional)
    // setSelectedColor(null);
  }, [product, quantity, addToCart, selectedColor, productColors.length]);

  const currentPrice = useMemo(() => Number(product?.price) || 0, [product]);

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <div className="h-64 sm:h-80 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-lg sm:rounded-xl animate-pulse" />
            <div className="space-y-3 sm:space-y-4">
              <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse" />
              <div className="h-4 sm:h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse" />
              <div className="h-8 sm:h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse" />
              <div className="h-16 sm:h-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-10 sm:h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Navbar />
        <ShopBanner 
          title="Product Not Found"
          breadcrumbItems={[
            { name: "Home", link: "/" },
            { name: "Shop", link: "/shop" },
            { name: "Product" }
          ]}
        />
        <div className="flex-1 container mx-auto px-4 py-12 sm:py-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Product Not Found</h2>
          <p className="text-sm sm:text-base mb-6 sm:mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop" className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const productName = product.name || "Product";
  const categoryName = product.category?.name || product.category_name || "Category";

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />
      
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}

      <ShopBanner 
        title="Product Details"
        breadcrumbItems={[
          { name: "Home", link: "/" },
          { name: "Shop", link: "/shop" },
          { name: "Product" }
        ]}
        showStats={false}
        showButton={false}
      />

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12 flex-grow">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          
          {/* Images - ✅ Now ImageSlider is defined */}
          <ImageSlider
            images={productImages}
            selectedImage={selectedImage}
            onImageChange={setSelectedImage}
            isDarkMode={isDarkMode}
            productName={productName}
          />

          {/* Details */}
          <div className="space-y-3 sm:space-y-4">
            {/* Breadcrumb - Hidden on mobile */}
            <div className={`hidden sm:block text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Link to="/" className="hover:text-blue-600">Home</Link> / 
              <Link to="/shop" className="hover:text-blue-600 mx-2">Shop</Link> / 
              <Link to={`/shop?category=${encodeURIComponent(categoryName)}`} className="hover:text-blue-600">{categoryName}</Link>
            </div>

            {/* Mobile Category Link */}
            <div className={`sm:hidden text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Link to={`/shop?category=${encodeURIComponent(categoryName)}`} className="hover:text-blue-600">
                ← Back to {categoryName}
              </Link>
            </div>

            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {productName}
            </h1>

            {/* Price - REMOVED DISCOUNT PRICE */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
                ${currentPrice.toFixed(2)}
              </span>
            </div>

            {/* Colors Section - Updated with selection */}
            {productColors.length > 0 && (
              <div className="mt-2">
                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Available Colors:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {productColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all hover:scale-110
                        ${selectedColor === color 
                          ? 'border-blue-500 scale-110 ring-2 ring-blue-300' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                        }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <FiCheck className="absolute inset-0 m-auto text-white text-sm drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
                {selectedColor && (
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Selected: {selectedColor}
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              {/* Quantity Selector */}
              <div className={`flex items-center justify-between sm:justify-start border rounded-lg ${
                isDarkMode ? 'border-gray-700' : 'border-gray-300'
              }`}>
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className={`p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="text-xs sm:text-sm" />
                </button>
                <span className={`px-4 sm:px-6 text-sm sm:text-base min-w-[40px] sm:min-w-[60px] text-center ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className={`p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  aria-label="Increase quantity"
                >
                  <FiPlus className="text-xs sm:text-sm" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-medium rounded-lg 
                         hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base
                         flex items-center justify-center gap-2
                         active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={productColors.length > 0 && !selectedColor}
              >
                <FiShoppingBag className="text-base sm:text-lg" />
                <span>ADD TO CART</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={toggleWishlist}
                className={`p-2.5 sm:p-3 rounded-lg border transition-all duration-200
                  ${isWishlisted
                    ? 'bg-red-50 border-red-300 text-red-500 dark:bg-red-900/20 dark:border-red-700'
                    : isDarkMode
                      ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <FiHeart className={`text-base sm:text-lg ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Color Selection Warning */}
            {productColors.length > 0 && !selectedColor && (
              <p className={`text-xs text-red-500 mt-1`}>
                * Please select a color
              </p>
            )}

            {/* Cart Count */}
            {cartCount > 0 && (
              <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                🛒 {cartCount} item{cartCount > 1 ? 's' : ''} in cart
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <Suspense fallback={<div className="h-24 sm:h-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />}>
          <TabsSection
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isDarkMode={isDarkMode}
            selectedFlavor={selectedFlavor}
            setSelectedFlavor={setSelectedFlavor}
            specifications={product.specifications}
            product={product}
          />
        </Suspense>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map((product) => (
                <Link 
                  to={`/product/${product.slug || product.id}`} 
                  key={product.id} 
                  className={`p-3 sm:p-4 rounded-lg border hover:shadow-lg transition-all hover:-translate-y-1
                    ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <div className="h-16 sm:h-20 md:h-24 mb-2 flex items-center justify-center">
                    <OptimizedImage
                      src={getImageUrl(product.image1 || product.image)}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className={`text-xs sm:text-sm font-medium mb-1 line-clamp-2 h-8 sm:h-10 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-blue-600">
                    ${(Number(product.price) || 0).toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductPage;