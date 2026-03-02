import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminStats from "../../components/admin/AdminStats";
const AdminLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Apply theme on mount and whenever isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Force re-check after mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light' && document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="relative flex flex-col lg:flex-row">
        
        {/* Sidebar Component */}
        <AdminSidebar 
          isDarkMode={isDarkMode}
          isSidebarOpen={isSidebarOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          closeMobileMenu={closeMobileMenu}
        />

        {/* Main Content */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}>
          
          {/* Header Component */}
          <AdminHeader 
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />

          {/* Page Content */}
          <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
            
            {/* Stats Component - Only show on dashboard */}
            {location.pathname === '/admin' && (
              <div className="mb-4 sm:mb-6">
                <AdminStats isDarkMode={isDarkMode} />
              </div>
            )}

            {/* Outlet for nested routes */}
            <div className="w-full">
              <Outlet context={{ isDarkMode }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;