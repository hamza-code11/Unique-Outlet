import React from "react";
import { FiDollarSign, FiShoppingCart, FiUsers } from "react-icons/fi";
import { GiCigarette } from "react-icons/gi";

const AdminStats = ({ isDarkMode }) => {
  const stats = [
    { title: "Total Sales", value: "$45,678", change: "+12.5%", icon: <FiDollarSign />, color: "from-blue-500 to-cyan-500" },
    { title: "Total Orders", value: "1,234", change: "+8.2%", icon: <FiShoppingCart />, color: "from-cyan-500 to-blue-500" },
    { title: "Total Products", value: "567", change: "+23", icon: <GiCigarette />, color: "from-blue-500 to-cyan-500" },
    { title: "Total Customers", value: "3,456", change: "+156", icon: <FiUsers />, color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border transition-all duration-300 hover:shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className={`text-xs sm:text-sm mb-0.5 sm:mb-1 truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.title}
              </p>
              <p className={`text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </p>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </p>
            </div>
            <div className={`w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white flex-shrink-0 ml-2`}>
              <span className="text-sm sm:text-base md:text-lg">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;