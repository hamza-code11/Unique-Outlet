// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiShoppingCart,
  FiSun,
  FiMoon,
  FiUser,
  FiSmartphone,
  FiLogOut,
  FiUserCheck,
  FiUserPlus
} from "react-icons/fi";
import { GiCigarette } from "react-icons/gi";

// Import logo image as fallback
import defaultLogo from "../../assets/logo/Untitled design.svg";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const [mobileOpenSubDropdown, setMobileOpenSubDropdown] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Backend states - Initialize from localStorage
  const [logo, setLogo] = useState(() => {
    // Try to get logo from localStorage first
    const cachedLogo = localStorage.getItem('siteLogo');
    return cachedLogo || null;
  });
  const [logoLoading, setLogoLoading] = useState(!localStorage.getItem('siteLogo')); // Only show loading if no cache
  const [logoError, setLogoError] = useState(false);

  // Categories state
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(false);

  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const menuRef = useRef(null);
  const logoFetchAttempted = useRef(false);
  const categoriesFetchAttempted = useRef(false);

  // Fetch logo from backend only once and cache it
  useEffect(() => {
    const fetchLogo = async () => {
      // Don't fetch if we already have a cached logo or already attempted
      if (localStorage.getItem('siteLogo') || logoFetchAttempted.current) {
        setLogoLoading(false);
        return;
      }

      try {
        logoFetchAttempted.current = true;
        setLogoLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/navbar-setting");
        
        if (response.data.logo_image) {
          const logoUrl = `http://127.0.0.1:8000/${response.data.logo_image}`;
          setLogo(logoUrl);
          // Cache in localStorage
          localStorage.setItem('siteLogo', logoUrl);
          setLogoError(false);
        } else {
          setLogoError(true);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
        setLogoError(true);
      } finally {
        setLogoLoading(false);
      }
    };

    fetchLogo();
  }, []);

  // Fetch categories from database
// Fetch categories from database
useEffect(() => {
  const fetchCategories = async () => {
    if (categoriesFetchAttempted.current) return;

    try {
      categoriesFetchAttempted.current = true;
      setCategoriesLoading(true);
      
      // Fetch categories
      const categoriesResponse = await axios.get("http://127.0.0.1:8000/api/categories");
      
      // Fetch subcategories
      const subcategoriesResponse = await axios.get("http://127.0.0.1:8000/api/subcategories");
      
      if (categoriesResponse.data && subcategoriesResponse.data) {
        // Group subcategories by category
        const categoriesWithSubs = categoriesResponse.data.map(category => {
          const categorySubs = subcategoriesResponse.data.filter(
            sub => sub.category_id === category.id
          );
          
          return {
            id: category.id,
            name: category.name,
            slug: category.slug, // Make sure slug is available
            icon: getCategoryIcon(category.name),
            subcategories: categorySubs.map(sub => ({
              id: sub.id,
              name: sub.name,
              slug: sub.slug, // Make sure slug is available
              // ✅ FIX: Use slug instead of ID
              path: `/shop?category=${category.slug}&subcategory=${sub.slug}`
            }))
          };
        });
        
        setCategories(categoriesWithSubs);
        setCategoriesError(false);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoriesError(true);
      setCategories(getDefaultCategories());
    } finally {
      setCategoriesLoading(false);
    }
  };

  fetchCategories();
}, []);


  // Helper function to assign icons based on category name
  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('vape') || name.includes('cigarette') || name.includes('smoke')) {
      return <GiCigarette className="text-base sm:text-lg" />;
    } else if (name.includes('mobile') || name.includes('phone') || name.includes('accessories')) {
      return <FiSmartphone className="text-base sm:text-lg" />;
    } else {
      // Default icon
      return <FiSmartphone className="text-base sm:text-lg" />;
    }
  };

  // Default categories as fallback
  const getDefaultCategories = () => {
    return [
      {
        id: 1,
        name: "Vapes",
        icon: <GiCigarette className="text-base sm:text-lg" />,
        subcategories: [
          { id: 1, name: "Starter Kits", path: "/shop?category=vapes&sub=starter-kits" },
          { id: 2, name: "Pod Systems", path: "/shop?category=vapes&sub=pod-systems" },
          { id: 3, name: "Box Mods", path: "/shop?category=vapes&sub=box-mods" },
          { id: 4, name: "Disposable Vapes", path: "/shop?category=vapes&sub=disposable" },
          { id: 5, name: "E-Liquids", path: "/shop?category=vapes&sub=e-liquids" },
        ],
      },
      {
        id: 2,
        name: "Mobile Accessories",
        icon: <FiSmartphone className="text-base sm:text-lg" />,
        subcategories: [
          { id: 6, name: "Phone Cases", path: "/shop?category=mobile&sub=phone-cases" },
          { id: 7, name: "Power Banks", path: "/shop?category=mobile&sub=power-banks" },
          { id: 8, name: "Cables", path: "/shop?category=mobile&sub=cables" },
          { id: 9, name: "Wireless Chargers", path: "/shop?category=mobile&sub=wireless-chargers" },
        ],
      },
    ];
  };

  // Check login status on mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();

    // Listen for storage changes (if user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close mobile menu and reset mobile dropdowns when window resizes to large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setMobileOpenDropdown(null);
        setMobileOpenSubDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown-container')) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close dropdown when clicking outside (desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        // Call logout API
        await axios.post('http://localhost:8000/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Update state
      setIsLoggedIn(false);
      setUser(null);
      setUserDropdownOpen(false);
      setLogoutLoading(false);
      
      // Redirect to home
      navigate('/');
      
      // Close mobile menu if open
      setIsOpen(false);
    }
  };

  const handleMyAccountClick = () => {
    setUserDropdownOpen(false);
    
    // Role-based redirection
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/my-account');
    }
  };

  const navItems = [
    { name: "Home", path: "/", isLink: true },
    { name: "About", path: "/about", isLink: true },
    { name: "Shop", path: "/shop", isLink: true },
    { name: "Products", hasDropdown: true },
    { name: "Contact", path: "/contact", isLink: true },
  ];

  // Toggle main dropdown on click (desktop)
  const toggleMainDropdown = (itemName) => {
    if (openDropdown === itemName) {
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    } else {
      setOpenDropdown(itemName);
      setOpenSubDropdown(null);
    }
  };

  // Toggle subdropdown on click (desktop)
  const toggleSubDropdown = (catName) => {
    if (openSubDropdown === catName) {
      setOpenSubDropdown(null);
    } else {
      setOpenSubDropdown(catName);
    }
  };

  // Toggle mobile main dropdown
  const toggleMobileMainDropdown = () => {
    if (mobileOpenDropdown === "products") {
      setMobileOpenDropdown(null);
      setMobileOpenSubDropdown(null);
    } else {
      setMobileOpenDropdown("products");
      setMobileOpenSubDropdown(null);
    }
  };

  // Toggle mobile subdropdown
  const toggleMobileSubDropdown = (catName) => {
    if (mobileOpenSubDropdown === catName) {
      setMobileOpenSubDropdown(null);
    } else {
      setMobileOpenSubDropdown(catName);
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Determine logo source
  const logoSrc = logo && !logoError ? logo : defaultLogo;
  const showFallbackText = (!logo || logoError) && !logoLoading;

  // Use categories from state or fallback to default if loading/error
  const displayCategories = categories.length > 0 ? categories : getDefaultCategories();

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
      ? isDarkMode
        ? "bg-gray-900 shadow-lg shadow-blue-900/20"
        : "bg-white shadow-lg shadow-blue-200/50"
      : isDarkMode
        ? "bg-gray-900"
        : "bg-white"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo - Show immediately from cache or fallback */}
          <Link to="/" className="flex items-center">
            {showFallbackText ? (
              // Fallback text logo if no image available
              <span className={`text-xl sm:text-2xl font-bold ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                UNIQUE OUTLET
              </span>
            ) : (
              <img 
                src={logoSrc} 
                alt="Website Logo" 
                className="h-38 sm:h-42 w-auto object-contain"
                onError={() => {
                  setLogoError(true);
                  // Remove from cache if error
                  localStorage.removeItem('siteLogo');
                }}
                loading="eager"
              />
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">

            {/* Navigation Items */}
            {navItems.map((item) => (
              <div key={item.name} className="relative dropdown-container">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleMainDropdown("products")}
                      className={`flex items-center gap-1 text-sm xl:text-base font-medium transition-colors
                                ${isDarkMode 
                                  ? 'text-gray-200 hover:text-blue-400' 
                                  : 'text-gray-700 hover:text-blue-600'}`}
                    >
                      {item.name}
                      <FiChevronDown className={`text-xs transition-transform duration-300 ${
                        openDropdown === "products" ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* First Level Dropdown */}
                    {openDropdown === "products" && (
                      <div className={`absolute top-full left-0 mt-2 w-56 sm:w-64 shadow-xl rounded-xl border z-50 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      }`}>
                        {categoriesLoading ? (
                          <div className="px-4 py-3 text-center">
                            <div className="animate-pulse flex space-x-2 justify-center">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Loading categories...
                            </p>
                          </div>
                        ) : categoriesError ? (
                          <div className="px-4 py-3 text-center">
                            <p className={`text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                              Failed to load categories
                            </p>
                          </div>
                        ) : (
                          displayCategories.map((cat, i) => (
                            <div key={cat.id || i} className="relative">
                              <div
                                onClick={() => toggleSubDropdown(cat.name)}
                                className={`flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer transition-colors ${
                                  isDarkMode 
                                    ? 'hover:bg-gray-700 text-gray-200' 
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                                    {cat.icon}
                                  </span>
                                  <span className="text-sm">{cat.name}</span>
                                </div>
                                {cat.subcategories && cat.subcategories.length > 0 && (
                                  <FiChevronDown className={`text-xs transition-transform duration-300 ${
                                    openSubDropdown === cat.name ? 'rotate-[-90deg]' : ''
                                  }`} />
                                )}
                              </div>

                              {/* Second Level Dropdown */}
                              {openSubDropdown === cat.name && cat.subcategories && cat.subcategories.length > 0 && (
                                <div className={`absolute left-full top-0 w-48 sm:w-56 shadow-xl rounded-xl border ml-2 z-50 ${
                                  isDarkMode 
                                    ? 'bg-gray-800 border-gray-700' 
                                    : 'bg-white border-gray-200'
                                }`}>
                                  {cat.subcategories.map((sub, index) => (
                                    <Link
                                      key={sub.id || index}
                                      to={sub.path}
                                      className={`block px-3 sm:px-4 py-2 text-xs sm:text-sm transition-colors ${
                                        isDarkMode 
                                          ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' 
                                          : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                      }`}
                                      onClick={() => {
                                        setOpenDropdown(null);
                                        setOpenSubDropdown(null);
                                      }}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-sm xl:text-base font-medium transition-colors
                              ${isDarkMode 
                                ? 'text-gray-200 hover:text-blue-400' 
                                : 'text-gray-700 hover:text-blue-600'}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {isDarkMode ? <FiSun className="text-yellow-400 text-lg" /> : <FiMoon className="text-gray-600 text-lg" />}
            </button>

            {/* Cart - Links to Cart Page */}
            <Link to="/cart" className="relative cursor-pointer">
              <FiShoppingCart className={`text-lg ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Conditional Rendering: Sign In or My Account */}
            {isLoggedIn ? (
              <div className="relative user-dropdown-container">
                {/* User Avatar Button */}
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300
                    ${isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 
                                flex items-center justify-center text-white text-sm font-bold">
                    {getUserInitials()}
                  </div>
                  <div className="text-left hidden xl:block">
                    <p className="text-xs opacity-75">Welcome</p>
                    <p className="text-sm font-medium truncate max-w-[100px]">
                      {user?.name?.split(' ')[0] || 'User'}
                    </p>
                  </div>
                  <FiChevronDown className={`text-xs transition-transform duration-300 ${
                    userDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-56 shadow-xl rounded-xl border z-50 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user?.name}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user?.email}
                      </p>
                      {user?.role === 'admin' && (
                        <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    
                    <div className="p-1">
                      <button
                        onClick={handleMyAccountClick}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <FiUserCheck className="text-base" />
                        <span>
                          {user?.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
                        </span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'text-red-400 hover:bg-gray-700 disabled:opacity-50' 
                            : 'text-red-600 hover:bg-gray-100 disabled:opacity-50'
                        }`}
                      >
                        {logoutLoading ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Logging out...</span>
                          </>
                        ) : (
                          <>
                            <FiLogOut className="text-base" />
                            <span>Logout</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Sign In Button */
              <Link
                to="/signin"
                className={`px-4 xl:px-5 py-2 text-sm xl:text-base rounded-lg transition-colors flex items-center gap-2 ${
                  isDarkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <FiUser className="text-base" />
                <span className="hidden xl:inline">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu - Full Screen with Scroll */}
        {isOpen && (
          <div
            ref={menuRef}
            className={`fixed inset-0 top-16 sm:top-20 z-40 overflow-y-auto
                      ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            style={{ height: 'calc(100vh - 64px)' }}
          >
            <div className="container mx-auto px-4 py-4 pb-20">

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className={`border-b py-1 ${
                    isDarkMode ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    {item.hasDropdown ? (
                      <div className="space-y-1">
                        <button
                          onClick={toggleMobileMainDropdown}
                          className={`w-full flex items-center justify-between py-3 px-2 rounded-lg 
                                    font-medium transition-colors text-sm
                                    ${isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          <span>{item.name}</span>
                          <FiChevronDown className={`text-sm transition-transform duration-300 ${
                            mobileOpenDropdown === "products" ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Mobile Categories */}
                        {mobileOpenDropdown === "products" && (
                          <div className="pl-3 mt-1 space-y-1">
                            {categoriesLoading ? (
                              <div className="px-3 py-4 text-center">
                                <div className="animate-pulse flex space-x-2 justify-center">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                </div>
                                <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  Loading categories...
                                </p>
                              </div>
                            ) : categoriesError ? (
                              <div className="px-3 py-4 text-center">
                                <p className={`text-xs ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                                  Failed to load categories
                                </p>
                              </div>
                            ) : (
                              displayCategories.map((cat, catIdx) => (
                                <div key={cat.id || catIdx} className="space-y-1">
                                  <button
                                    onClick={() => toggleMobileSubDropdown(cat.name)}
                                    className={`w-full flex items-center justify-between gap-2 py-2.5 px-3 rounded-lg 
                                              transition-colors text-sm
                                              ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                                        {cat.icon}
                                      </span>
                                      <span>{cat.name}</span>
                                    </div>
                                    {cat.subcategories && cat.subcategories.length > 0 && (
                                      <FiChevronDown className={`text-xs transition-transform duration-300 ${
                                        mobileOpenSubDropdown === cat.name ? 'rotate-180' : ''
                                      }`} />
                                    )}
                                  </button>

                                  {/* Mobile Subcategories */}
                                  {mobileOpenSubDropdown === cat.name && cat.subcategories && cat.subcategories.length > 0 && (
                                    <div className="pl-8 mt-1 space-y-1">
                                      {cat.subcategories.map((sub, subIdx) => (
                                        <Link
                                          key={sub.id || subIdx}
                                          to={sub.path}
                                          className={`block py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer
                                                   ${isDarkMode
                                              ? 'text-gray-400 hover:bg-gray-800 hover:text-blue-400'
                                              : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
                                            }`}
                                          onClick={() => {
                                            setIsOpen(false);
                                            setMobileOpenDropdown(null);
                                            setMobileOpenSubDropdown(null);
                                          }}
                                        >
                                          {sub.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`block py-3 px-2 rounded-lg text-sm transition-colors
                                 ${isDarkMode
                            ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-400'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Bottom Section */}
              <div className={`mt-6 pt-4 border-t space-y-2 ${
                isDarkMode ? 'border-gray-800' : 'border-gray-200'
              }`}>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors
                           ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {isDarkMode ? (
                    <>
                      <FiSun className="text-yellow-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <FiMoon className="text-blue-600" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>

                {/* Cart Button */}
                <Link
                  to="/cart"
                  className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors
                           ${isDarkMode
                      ? 'border border-gray-700 text-gray-300 hover:border-blue-500 hover:bg-gray-800'
                      : 'border border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FiShoppingCart />
                  <span>View Cart (3)</span>
                </Link>

                {/* Conditional Mobile Buttons */}
                {isLoggedIn ? (
                  <>
                    {/* User Info */}
                    <div className={`px-3 py-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 
                                      flex items-center justify-center text-white font-bold">
                          {getUserInitials()}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {user?.name}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {user?.email}
                          </p>
                          {user?.role === 'admin' && (
                            <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* My Account / Admin Dashboard Button */}
                    <button
                      onClick={() => {
                        if (user?.role === 'admin') {
                          navigate('/admin');
                        } else {
                          navigate('/my-account');
                        }
                        setIsOpen(false);
                      }}
                      className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors
                               ${isDarkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <FiUserCheck />
                      <span>{user?.role === 'admin' ? 'Admin Dashboard' : 'My Account'}</span>
                    </button>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors
                               ${isDarkMode
                          ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30 disabled:opacity-50'
                          : 'bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50'
                        }`}
                    >
                      {logoutLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Logging out...</span>
                        </>
                      ) : (
                        <>
                          <FiLogOut />
                          <span>Logout</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  /* Sign In Button for Mobile */
                  <Link
                    to="/signin"
                    className="w-full px-3 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;