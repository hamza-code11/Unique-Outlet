// import React, { useState } from "react";
// import FlavorsTab from "./FlavorsTab";
// import SpecificationsTab from "./SpecificationsTab";
// import ReviewsTab from "./ReviewsTab";

// const TabsSection = ({ 
//   activeTab, 
//   onTabChange, 
//   isDarkMode, 
//   selectedFlavor,
//   setSelectedFlavor
// }) => {
//   const tabs = [
//     { id: "flavors", label: "Flavors", component: FlavorsTab },
//     { id: "specifications", label: "Specifications", component: SpecificationsTab },
//     { id: "reviews", label: "Reviews", component: ReviewsTab },
//   ];

//   const CurrentTabComponent = tabs.find(tab => tab.id === activeTab)?.component || FlavorsTab;

//   return (
//     <div className="mt-12">
//       {/* Tab Headers */}
//       <div className={`flex flex-wrap gap-1 border-b ${
//         isDarkMode ? 'border-gray-800' : 'border-gray-200'
//       }`}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => onTabChange(tab.id)}
//             className={`px-4 py-2 text-sm font-medium transition-all duration-300
//               ${activeTab === tab.id
//                 ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
//                 : isDarkMode
//                   ? 'text-gray-400 hover:text-gray-200'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className={`mt-6 p-6 rounded-lg border ${
//         isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//       }`}>
//         <CurrentTabComponent 
//           isDarkMode={isDarkMode}
//           selectedFlavor={selectedFlavor}
//           setSelectedFlavor={setSelectedFlavor}
//         />
//       </div>
//     </div>
//   );
// };

// export default TabsSection;


















// // src/components/tabs/TabsSection.jsx
// import React, { useState } from "react";
// import FlavorsTab from "./FlavorsTab";
// import SpecificationsTab from "./SpecificationsTab";
// import ReviewsTab from "./ReviewsTab";

// const TabsSection = ({ 
//   activeTab, 
//   onTabChange, 
//   isDarkMode, 
//   selectedFlavor,
//   setSelectedFlavor,
//   product // Pass product prop
// }) => {
//   const tabs = [
//     { id: "flavors", label: "Flavors", component: FlavorsTab },
//     { id: "specifications", label: "Specifications", component: SpecificationsTab },
//     { id: "reviews", label: "Reviews", component: ReviewsTab },
//   ];

//   const CurrentTabComponent = tabs.find(tab => tab.id === activeTab)?.component || FlavorsTab;

//   return (
//     <div className="mt-12">
//       {/* Tab Headers */}
//       <div className={`flex flex-wrap gap-1 border-b ${
//         isDarkMode ? 'border-gray-800' : 'border-gray-200'
//       }`}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => onTabChange(tab.id)}
//             className={`px-4 py-2 text-sm font-medium transition-all duration-300
//               ${activeTab === tab.id
//                 ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
//                 : isDarkMode
//                   ? 'text-gray-400 hover:text-gray-200'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className={`mt-6 p-6 rounded-lg border ${
//         isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//       }`}>
//         {activeTab === "reviews" ? (
//           <ReviewsTab 
//             isDarkMode={isDarkMode}
//             productId={product?.id} // Pass product ID
//           />
//         ) : activeTab === "flavors" ? (
//           <FlavorsTab 
//             isDarkMode={isDarkMode}
//             selectedFlavor={selectedFlavor}
//             setSelectedFlavor={setSelectedFlavor}
//           />
//         ) : (
//           <SpecificationsTab 
//             isDarkMode={isDarkMode}
//             specifications={product?.specifications}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TabsSection;










// src/components/tabs/TabsSection.jsx
import React, { useState } from "react";
import FlavorsTab from "./FlavorsTab";
import SpecificationsTab from "./SpecificationsTab";
import ReviewsTab from "./ReviewsTab";

const TabsSection = ({ 
  activeTab, 
  onTabChange, 
  isDarkMode, 
  selectedFlavor,
  setSelectedFlavor,
  specifications,
  product
}) => {
  const tabs = [
    { id: "flavors", label: "Flavors" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" }
  ];

  return (
    <div className="mt-12">
      {/* Tab Headers */}
      <div className={`flex flex-wrap gap-1 border-b ${
        isDarkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-300
              ${activeTab === tab.id
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : isDarkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`mt-6 p-6 rounded-lg border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {activeTab === "flavors" && (
          <FlavorsTab 
            isDarkMode={isDarkMode}
            selectedFlavor={selectedFlavor}
            setSelectedFlavor={setSelectedFlavor}
            productId={product?.id}
          />
        )}

        {activeTab === "specifications" && (
          <SpecificationsTab 
            isDarkMode={isDarkMode}
            specifications={product?.specifications}
          />
        )}

        {activeTab === "reviews" && (
          <ReviewsTab 
            isDarkMode={isDarkMode}
            productId={product?.id}
          />
        )}
      </div>
    </div>
  );
};

export default TabsSection;