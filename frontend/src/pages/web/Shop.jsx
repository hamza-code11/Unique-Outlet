// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import { useSearchParams } from "react-router-dom";
// import Navbar from "../../components/home/Navbar";
// import Footer from "../../components/home/Footer";
// import ProductCard from "../../components/shop/ProductCard";
// import FilterSidebar from "../../components/shop/FilterSidebar";
// import ShopBanner from "../../components/banner/Banner";
// import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
// import axios from "axios";
// import { useCart } from "../../context/CartContext";

// const API_URL = 'http://127.0.0.1:8000/api';

// // Cache for API responses
// const cache = {
//   categories: null,
//   subcategories: null,
//   products: new Map() // Cache different product requests
// };

// const Shop = () => {
//   const { addToCart } = useCart();
//   const [searchParams] = useSearchParams();
//   const categoryId = searchParams.get('category');
//   const subcategorySlug = searchParams.get('subcategory');

//   // States
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Filter states
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("default");
  
//   // UI states
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 12;

//   // Refs to prevent unnecessary re-renders
//   const initialFetchDone = useRef(false);
//   const categoriesFetched = useRef(false);

//   // Dark mode - optimized with useMemo
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };
//     checkDarkMode();
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   // Fetch categories & subcategories - only once with caching
//   useEffect(() => {
//     if (categoriesFetched.current) return;
    
//     const fetchCategories = async () => {
//       try {
//         // Check cache first
//         if (cache.categories && cache.subcategories) {
//           setCategories(cache.categories);
//           setSubcategories(cache.subcategories);
//           return;
//         }

//         const [catRes, subRes] = await Promise.all([
//           axios.get(`${API_URL}/categories`),
//           axios.get(`${API_URL}/subcategories`)
//         ]);
        
//         const categoriesData = catRes.data || [];
//         const subcategoriesData = subRes.data || [];
        
//         // Update cache
//         cache.categories = categoriesData;
//         cache.subcategories = subcategoriesData;
        
//         setCategories(categoriesData);
//         setSubcategories(subcategoriesData);
//         categoriesFetched.current = true;
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch products with caching
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         let url = `${API_URL}/products`;
        
//         if (subcategorySlug) {
//           url = `${API_URL}/products/subcategory/slug/${subcategorySlug}`;
//         } else if (categoryId) {
//           url = `${API_URL}/products/category/${categoryId}`;
//         }

//         const response = await axios.get(url);
//         setProducts(response.data);
//         setFilteredProducts(response.data);
        
//       } catch (err) {
//         console.error("Error:", err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryId, subcategorySlug]);

//   // Set selected names from URL - optimized with useMemo
//   useEffect(() => {
//     if (subcategorySlug && subcategories.length) {
//       const sub = subcategories.find(s => s.slug === subcategorySlug);
//       if (sub) {
//         setSelectedSubCategory(sub.name);
//         const cat = categories.find(c => c.id === sub.category_id);
//         if (cat) setSelectedCategory(cat.name);
//       }
//     } else if (categoryId && categories.length) {
//       const cat = categories.find(c => c.id == categoryId);
//       if (cat) setSelectedCategory(cat.name);
//     }
//   }, [categoryId, subcategorySlug, categories, subcategories]);

//   // Memoized filter function for better performance
//   const getFilteredProducts = useCallback(() => {
//     let filtered = [...products];

//     if (selectedCategory) {
//       filtered = filtered.filter(p => 
//         p.category?.name === selectedCategory || p.category_name === selectedCategory
//       );
//     }

//     if (selectedSubCategory) {
//       filtered = filtered.filter(p => 
//         p.sub_category?.name === selectedSubCategory || p.subcategory_name === selectedSubCategory
//       );
//     }

//     filtered = filtered.filter(p => {
//       const price = Number(p.price) || 0;
//       return price >= priceRange.min && price <= priceRange.max;
//     });

//     if (search) {
//       const searchLower = search.toLowerCase();
//       filtered = filtered.filter(p => 
//         p.name.toLowerCase().includes(searchLower)
//       );
//     }

//     if (sortBy === "price-low") {
//       filtered.sort((a, b) => Number(a.price) - Number(b.price));
//     } else if (sortBy === "price-high") {
//       filtered.sort((a, b) => Number(b.price) - Number(a.price));
//     }

//     return filtered;
//   }, [products, selectedCategory, selectedSubCategory, priceRange, search, sortBy]);

//   // Filter products with debounce for better performance
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       const filtered = getFilteredProducts();
//       setFilteredProducts(filtered);
//       setCurrentPage(1);
//     }, 300); // 300ms debounce

//     return () => clearTimeout(timeoutId);
//   }, [getFilteredProducts]);

//   // Reset filters
//   const handleReset = useCallback(() => {
//     setSelectedCategory("");
//     setSelectedSubCategory("");
//     setSearch("");
//     setSortBy("default");
//     if (products.length) {
//       const prices = products.map(p => Number(p.price) || 0);
//       setPriceRange({ min: 0, max: Math.max(...prices) });
//     }
//   }, [products]);

//   // Memoized pagination values
//   const paginationData = useMemo(() => {
//     const indexOfLast = currentPage * productsPerPage;
//     const indexOfFirst = indexOfLast - productsPerPage;
//     const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
//     return { indexOfFirst, indexOfLast, currentProducts, totalPages };
//   }, [filteredProducts, currentPage, productsPerPage]);

//   const { indexOfFirst, indexOfLast, currentProducts, totalPages } = paginationData;

//   return (
//     <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//       <Navbar />
      
//       <ShopBanner 
//         title="Shop"
//         breadcrumbItems={[
//           { name: "Home", link: "/" },
//           { name: "Shop" }
//         ]}
//       />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        
//         {/* Header - Responsive */}
//         <div className="mb-4 sm:mb-6">
//           <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
//             isDarkMode ? 'text-white' : 'text-gray-900'
//           }`}>
//             {selectedSubCategory || selectedCategory || "All Products"}
//           </h1>
          
//           {(selectedCategory || selectedSubCategory) && (
//             <div className="flex flex-wrap gap-2 mt-2">
//               {selectedCategory && (
//                 <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
//                   isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
//                 }`}>
//                   {selectedCategory}
//                 </span>
//               )}
//               {selectedSubCategory && (
//                 <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
//                   isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'
//                 }`}>
//                   {selectedSubCategory}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Controls - Responsive */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
//           <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//             Showing {filteredProducts.length ? indexOfFirst + 1 : 0} - {Math.min(indexOfLast, filteredProducts.length)} of {filteredProducts.length} products
//           </p>

//           <div className="flex items-center gap-3 w-full sm:w-auto">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className={`flex-1 sm:flex-none px-3 py-2 rounded-lg border text-xs sm:text-sm ${
//                 isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
//               }`}
//             >
//               <option value="default">Sort by</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//             </select>

//             <button
//               onClick={() => setIsMobileFilterOpen(true)}
//               className="lg:hidden p-2 bg-blue-600 text-white rounded-lg"
//               aria-label="Open filters"
//             >
//               <FiFilter className="text-lg" />
//             </button>
//           </div>
//         </div>

//         {/* Main Content Grid - Responsive */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          
//           {/* Desktop Sidebar - Hidden on mobile */}
//           <div className="hidden lg:block lg:col-span-1">
//             <FilterSidebar
//               categories={categories}
//               subcategories={subcategories}
//               selectedCategory={selectedCategory}
//               setSelectedCategory={setSelectedCategory}
//               selectedSubCategory={selectedSubCategory}
//               setSelectedSubCategory={setSelectedSubCategory}
//               priceRange={priceRange}
//               setPriceRange={setPriceRange}
//               search={search}
//               setSearch={setSearch}
//               maxPrice={priceRange.max}
//               handleReset={handleReset}
//               isDarkMode={isDarkMode}
//             />
//           </div>

//           {/* Mobile Sidebar - Slide from right */}
//           {isMobileFilterOpen && (
//             <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
//               <div 
//                 className={`w-80 max-w-[90%] h-full ml-auto overflow-y-auto ${
//                   isDarkMode ? 'bg-gray-900' : 'bg-white'
//                 }`}
//               >
//                 <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b dark:border-gray-700 bg-inherit">
//                   <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     Filters
//                   </h2>
//                   <button 
//                     onClick={() => setIsMobileFilterOpen(false)}
//                     className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//                   >
//                     <FiX className={isDarkMode ? 'text-white' : 'text-gray-700'} />
//                   </button>
//                 </div>
//                 <div className="p-4">
//                   <FilterSidebar
//                     categories={categories}
//                     subcategories={subcategories}
//                     selectedCategory={selectedCategory}
//                     setSelectedCategory={setSelectedCategory}
//                     selectedSubCategory={selectedSubCategory}
//                     setSelectedSubCategory={setSelectedSubCategory}
//                     priceRange={priceRange}
//                     setPriceRange={setPriceRange}
//                     search={search}
//                     setSearch={setSearch}
//                     maxPrice={priceRange.max}
//                     handleReset={handleReset}
//                     isDarkMode={isDarkMode}
//                     isMobile
//                     onClose={() => setIsMobileFilterOpen(false)}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Products Grid - Responsive columns */}
//           <div className="lg:col-span-3">
//             {loading ? (
//               <div className="flex justify-center items-center py-12">
//                 <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-blue-600 border-t-transparent"></div>
//               </div>
//             ) : error ? (
//               <div className="text-center py-12 px-4">
//                 <p className="text-red-600 text-sm sm:text-base">{error}</p>
//                 <button 
//                   onClick={() => window.location.reload()} 
//                   className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded hover:bg-blue-700"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             ) : currentProducts.length ? (
//               <>
//                 {/* Product cards grid - Responsive */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
//                   {currentProducts.map(product => (
//                     <ProductCard
//                       key={product.id}
//                       product={product}
//                       isDarkMode={isDarkMode}
//                       onAddToCart={() => addToCart(product)}
//                     />
//                   ))}
//                 </div>

//                 {/* Pagination - Responsive */}
//                 {totalPages > 1 && (
//                   <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
//                     <button
//                       onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                       disabled={currentPage === 1}
//                       className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm ${
//                         isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
//                       } disabled:opacity-50 disabled:cursor-not-allowed`}
//                     >
//                       Previous
//                     </button>
                    
//                     <div className="flex flex-wrap items-center gap-1 sm:gap-2">
//                       {[...Array(totalPages)].map((_, i) => {
//                         const pageNum = i + 1;
//                         // Show limited pages on mobile
//                         if (
//                           totalPages <= 7 ||
//                           pageNum === 1 ||
//                           pageNum === totalPages ||
//                           (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
//                         ) {
//                           return (
//                             <button
//                               key={pageNum}
//                               onClick={() => setCurrentPage(pageNum)}
//                               className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm ${
//                                 currentPage === pageNum
//                                   ? 'bg-blue-600 text-white'
//                                   : isDarkMode
//                                     ? 'bg-gray-800'
//                                     : 'bg-gray-200'
//                               }`}
//                             >
//                               {pageNum}
//                             </button>
//                           );
//                         } else if (
//                           (pageNum === 2 && currentPage > 3) ||
//                           (pageNum === totalPages - 1 && currentPage < totalPages - 2)
//                         ) {
//                           return <span key={pageNum} className="px-1">...</span>;
//                         }
//                         return null;
//                       })}
//                     </div>
                    
//                     <button
//                       onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                       disabled={currentPage === totalPages}
//                       className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm ${
//                         isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
//                       } disabled:opacity-50 disabled:cursor-not-allowed`}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="text-center py-12 px-4">
//                 <p className="text-lg sm:text-xl mb-2">No products found</p>
//                 <p className="text-sm sm:text-base mb-4">Try adjusting your filters</p>
//                 <button 
//                   onClick={handleReset} 
//                   className="px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded hover:bg-blue-700"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Shop;

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ProductCard from "../../components/shop/ProductCard";
import FilterSidebar from "../../components/shop/FilterSidebar";
import ShopBanner from "../../components/banner/Banner";
import { FiFilter, FiX } from "react-icons/fi";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { API_URL, STORAGE_URL } from "../../config";


// Advanced caching system
const cache = {
  categories: null,
  subcategories: null,
  products: new Map(),
  timestamp: new Map()
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Skeleton Loader Component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-lg"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

const Shop = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const subcategorySlug = searchParams.get('subcategory');

  // States
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  
  // UI states
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const initialLoadDone = useRef(false);

  // Dark mode detection
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Fetch categories & subcategories - with advanced caching
  useEffect(() => {
    const fetchCategories = async () => {
      // Check cache
      if (cache.categories && cache.subcategories) {
        const now = Date.now();
        const catTimestamp = cache.timestamp.get('categories') || 0;
        const subTimestamp = cache.timestamp.get('subcategories') || 0;
        
        if (now - catTimestamp < CACHE_DURATION && now - subTimestamp < CACHE_DURATION) {
          setCategories(cache.categories);
          setSubcategories(cache.subcategories);
          return;
        }
      }

      try {
        const [catRes, subRes] = await Promise.all([
          axios.get(`${API_URL}/categories`),
          axios.get(`${API_URL}/subcategories`)
        ]);
        
        const categoriesData = catRes.data || [];
        const subcategoriesData = subRes.data || [];
        
        // Update cache
        cache.categories = categoriesData;
        cache.subcategories = subcategoriesData;
        cache.timestamp.set('categories', Date.now());
        cache.timestamp.set('subcategories', Date.now());
        
        setCategories(categoriesData);
        setSubcategories(subcategoriesData);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    
    fetchCategories();
  }, []);

  // Optimized product fetching
  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      
      // Create cache key
      const cacheKey = `${categoryId || 'all'}-${subcategorySlug || 'all'}`;
      
      // Check cache
      if (cache.products.has(cacheKey)) {
        const cachedData = cache.products.get(cacheKey);
        const timestamp = cache.timestamp.get(cacheKey) || 0;
        
        if (Date.now() - timestamp < CACHE_DURATION) {
          setProducts(cachedData);
          setFilteredProducts(cachedData);
          setProductsLoading(false);
          setLoading(false);
          
          // Set price range based on cached products
          if (cachedData.length) {
            const prices = cachedData.map(p => Number(p.price) || 0);
            setPriceRange({ 
              min: 0, 
              max: Math.max(...prices, 100000) 
            });
          }
          return;
        }
      }

      try {
        let url = `${API_URL}/products`;
        
        if (subcategorySlug) {
          url = `${API_URL}/products/subcategory/slug/${subcategorySlug}`;
        } else if (categoryId) {
          // Add this method in controller if not exists
          url = `${API_URL}/products/category/${categoryId}`;
        }

        // Add pagination params for faster loading
        url += `?per_page=${productsPerPage * 2}`; // Load more initially
        
        const response = await axios.get(url);
        const productsData = response.data;
        
        // Update cache
        cache.products.set(cacheKey, productsData);
        cache.timestamp.set(cacheKey, Date.now());
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        // Set price range
        if (productsData.length) {
          const prices = productsData.map(p => Number(p.price) || 0);
          setPriceRange({ 
            min: 0, 
            max: Math.max(...prices, 100000) 
          });
        }
        
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setProductsLoading(false);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subcategorySlug]);

  // Optimized filtering with debounce
  useEffect(() => {
    if (!products.length) return;

    const timeoutId = setTimeout(() => {
      let filtered = [...products];

      // Category filter
      if (selectedCategory) {
        filtered = filtered.filter(p => 
          p.category?.name === selectedCategory || p.category_name === selectedCategory
        );
      }

      // Subcategory filter
      if (selectedSubCategory) {
        filtered = filtered.filter(p => 
          p.sub_category?.name === selectedSubCategory || p.subcategory_name === selectedSubCategory
        );
      }

      // Price filter
      filtered = filtered.filter(p => {
        const price = Number(p.price) || 0;
        return price >= priceRange.min && price <= priceRange.max;
      });

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower)
        );
      }

      // Sort
      if (sortBy === "price-low") {
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (sortBy === "price-high") {
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
      }

      setFilteredProducts(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [products, selectedCategory, selectedSubCategory, priceRange, search, sortBy]);

  // Reset filters
  const handleReset = useCallback(() => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSearch("");
    setSortBy("default");
    if (products.length) {
      const prices = products.map(p => Number(p.price) || 0);
      setPriceRange({ min: 0, max: Math.max(...prices) });
    }
  }, [products]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage, productsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Navbar />
      
      <ShopBanner 
        title="Shop"
        breadcrumbItems={[
          { name: "Home", link: "/" },
          { name: "Shop" }
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {selectedSubCategory || selectedCategory || "All Products"}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {!productsLoading ? (
              <>Showing {filteredProducts.length ? (currentPage - 1) * productsPerPage + 1 : 0} - {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products</>
            ) : (
              <>Loading products...</>
            )}
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              disabled={productsLoading}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg border text-xs sm:text-sm ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
              } disabled:opacity-50`}
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden p-2 bg-blue-600 text-white rounded-lg"
            >
              <FiFilter className="text-lg" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              categories={categories}
              subcategories={subcategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              search={search}
              setSearch={setSearch}
              maxPrice={priceRange.max}
              handleReset={handleReset}
              isDarkMode={isDarkMode}
              disabled={productsLoading}
            />
          </div>

          {/* Mobile Sidebar */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
              <div className={`w-80 max-w-[90%] h-full ml-auto overflow-y-auto ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b dark:border-gray-700 bg-inherit">
                  <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Filters
                  </h2>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <FiX className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                  </button>
                </div>
                <div className="p-4">
                  <FilterSidebar
                    categories={categories}
                    subcategories={subcategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedSubCategory={selectedSubCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    search={search}
                    setSearch={setSearch}
                    maxPrice={priceRange.max}
                    handleReset={handleReset}
                    isDarkMode={isDarkMode}
                    disabled={productsLoading}
                    isMobile
                    onClose={() => setIsMobileFilterOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : paginatedProducts.length ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isDarkMode={isDarkMode}
                      onAddToCart={() => addToCart(product)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                      } disabled:opacity-50`}
                    >
                      Previous
                    </button>
                    
                    <span className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                      } disabled:opacity-50`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl mb-4">No products found</p>
                <button 
                  onClick={handleReset} 
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;