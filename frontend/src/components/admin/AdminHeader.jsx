import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiMenu, FiSun, FiMoon, FiSearch, FiChevronDown, 
  FiUser, FiSettings, FiLogOut, FiX
} from "react-icons/fi";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AdminHeader = ({ 
  isDarkMode, 
  setIsDarkMode,
  isSidebarOpen, 
  toggleSidebar, 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const profileDropdownRef = useRef(null);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Inventory", path: "/admin/inventory" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Reviews", path: "/admin/reviews" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
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
      // Even if API fails, we'll still clear local storage
    } finally {
      // Clear localStorage regardless of API response
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Close dropdown
      setIsProfileDropdownOpen(false);
      setLogoutLoading(false);
      
      // Redirect to home page
      navigate('/');
      
      // Optional: Show success message
      console.log('Logged out successfully');
    }
  };

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem?.name || 'Dashboard';
  };

  // Get user data from localStorage
  const getUserData = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
    return { name: 'Admin User', email: 'admin@wapo.com', role: 'Super Admin' };
  };

  const user = getUserData();

  return (
    <header className={`sticky top-0 z-20 w-full h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 border-b ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sidebar Toggle - Desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:block p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiMenu className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiMenu className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>

        {/* Page Title */}
        <h1 className={`text-sm sm:text-base md:text-lg font-semibold truncate max-w-[120px] sm:max-w-none ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {getPageTitle()}
        </h1>
      </div>

      {/* Search Bar - Desktop */}
      <div className="hidden md:block flex-1 max-w-md mx-4">
        <div className="relative">
          <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
          />
        </div>
      </div>

      {/* Mobile Search Toggle */}
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <FiSearch className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-14 p-3 bg-inherit border-b md:hidden">
          <div className="relative">
            <FiSearch className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-10 py-2 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-2.5"
            >
              <FiX className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-yellow-400' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FiSun className="text-base sm:text-lg" /> : <FiMoon className="text-base sm:text-lg" />}
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center gap-1 sm:gap-2 focus:outline-none"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="hidden sm:block text-xs sm:text-sm text-left">
              <p className={`font-medium truncate max-w-[80px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {user.name?.split(' ')[0] || 'Admin'}
              </p>
              <p className={`text-xs truncate max-w-[80px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {user.role || 'Admin'}
              </p>
            </div>
            <FiChevronDown 
              className={`hidden sm:block text-xs transition-transform duration-300 ${
                isProfileDropdownOpen ? 'rotate-180' : ''
              } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-xl border overflow-hidden z-50 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.name || 'Admin User'}
                </p>
                <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user.email || 'admin@wapo.com'}
                </p>
              </div>
              
              <Link
                to="/admin/profile"
                className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors
                  ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <FiUser className="text-sm" />
                <span>My Profile</span>
              </Link>
              
              <Link
                to="/admin/settings"
                className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors
                  ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <FiSettings className="text-sm" />
                <span>Settings</span>
              </Link>
              
              <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors text-left
                    ${isDarkMode 
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
                      <FiLogOut className="text-sm" />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;