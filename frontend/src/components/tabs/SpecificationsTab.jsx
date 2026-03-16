// import React, { useState, useEffect } from "react";

// const SpecificationsTab = ({ isDarkMode, specifications }) => {
//   const [specs, setSpecs] = useState({});
//   const [vendorInfo, setVendorInfo] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (specifications) {
//       try {
//         // Parse specifications if it's a string
//         if (typeof specifications === 'string') {
//           const parsed = JSON.parse(specifications);
//           setSpecs(parsed);
//         } else {
//           setSpecs(specifications || {});
//         }
//       } catch (err) {
//         console.error('Error parsing specifications:', err);
//         setSpecs({});
//       }
//     }

//     // If vendor_info exists in product, parse it
//     if (specifications?.vendor_info) {
//       try {
//         const vendor = typeof specifications.vendor_info === 'string' 
//           ? JSON.parse(specifications.vendor_info) 
//           : specifications.vendor_info;
//         setVendorInfo(vendor);
//       } catch (err) {
//         console.error('Error parsing vendor info:', err);
//         setVendorInfo({});
//       }
//     }
//   }, [specifications]);

//   const SpecificationItem = ({ label, value }) => {
//     // Don't render if value is null or undefined
//     if (value === null || value === undefined || value === '') return null;
    
//     return (
//       <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
//         <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{label}:</span>
//         <span className="font-medium text-right ml-4">{value}</span>
//       </li>
//     );
//   };

//   // Group specifications into categories
//   const basicSpecs = {};
//   const additionalSpecs = {};

//   Object.entries(specs).forEach(([key, value]) => {
//     // Skip vendor_info as it's handled separately
//     if (key === 'vendor_info') return;
    
//     // Categorize specifications
//     if (['flavor', 'puffs', 'nicotine', 'type', 'brand', 'model'].includes(key.toLowerCase())) {
//       basicSpecs[key] = value;
//     } else {
//       additionalSpecs[key] = value;
//     }
//   });

//   // If no specifications at all
//   if (Object.keys(specs).length === 0 && Object.keys(vendorInfo).length === 0) {
//     return (
//       <div className={`text-sm text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//         <p>No specifications available for this product.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Column - Basic Specifications */}
//         {(Object.keys(basicSpecs).length > 0 || Object.keys(vendorInfo).length > 0) && (
//           <div>
//             <h4 className={`font-semibold text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Product Specifications
//             </h4>
//             <ul className="space-y-2">
//               {/* Vendor/Brand Info */}
//               {vendorInfo.vendor && (
//                 <SpecificationItem label="Brand" value={vendorInfo.vendor} />
//               )}
//               {vendorInfo.country && (
//                 <SpecificationItem label="Country of Origin" value={vendorInfo.country} />
//               )}
              
//               {/* Basic Specs */}
//               {Object.entries(basicSpecs).map(([key, value]) => (
//                 <SpecificationItem 
//                   key={key} 
//                   label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} 
//                   value={value} 
//                 />
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Right Column - Additional Specifications */}
//         {Object.keys(additionalSpecs).length > 0 && (
//           <div>
//             <h4 className={`font-semibold text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Additional Information
//             </h4>
//             <ul className="space-y-2">
//               {Object.entries(additionalSpecs).map(([key, value]) => (
//                 <SpecificationItem 
//                   key={key} 
//                   label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} 
//                   value={value} 
//                 />
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpecificationsTab;












// src/components/tabs/SpecificationsTab.jsx
import React, { useState, useEffect } from "react";
import { API_URL, STORAGE_URL } from "../../config";

const SpecificationsTab = ({ isDarkMode, specifications, product }) => {
  const [specs, setSpecs] = useState({});
  const [vendorInfo, setVendorInfo] = useState({});
  const [productDescription, setProductDescription] = useState('');

  useEffect(() => {
    // Set product description
    if (product?.description) {
      setProductDescription(product.description);
    }

    // Parse specifications
    if (specifications) {
      try {
        if (typeof specifications === 'string') {
          const parsed = JSON.parse(specifications);
          setSpecs(parsed);
        } else {
          setSpecs(specifications || {});
        }
      } catch (err) {
        console.error('Error parsing specifications:', err);
        setSpecs({});
      }
    }

    // Parse vendor info
    if (specifications?.vendor_info) {
      try {
        const vendor = typeof specifications.vendor_info === 'string' 
          ? JSON.parse(specifications.vendor_info) 
          : specifications.vendor_info;
        setVendorInfo(vendor);
      } catch (err) {
        console.error('Error parsing vendor info:', err);
        setVendorInfo({});
      }
    }
  }, [specifications, product]);

  const SpecificationItem = ({ label, value }) => {
    if (value === null || value === undefined || value === '') return null;
    
    return (
      <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{label}:</span>
        <span className="font-medium text-right ml-4">{value}</span>
      </li>
    );
  };

  // Group specifications into categories
  const basicSpecs = {};
  const additionalSpecs = {};

  Object.entries(specs).forEach(([key, value]) => {
    if (key === 'vendor_info') return;
    
    if (['flavor', 'puffs', 'nicotine', 'type', 'brand', 'model'].includes(key.toLowerCase())) {
      basicSpecs[key] = value;
    } else {
      additionalSpecs[key] = value;
    }
  });

  return (
    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      <div className="space-y-6">
        
        {/* ✅ Full Description Section - NEW */}
        {productDescription && (
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className={`font-semibold text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Product Description
            </h4>
            <p className={`leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {productDescription}
            </p>
          </div>
        )}

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column - Basic Specifications */}
          {(Object.keys(basicSpecs).length > 0 || Object.keys(vendorInfo).length > 0) && (
            <div>
              <h4 className={`font-semibold text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Product Specifications
              </h4>
              <ul className="space-y-2">
                {/* Vendor/Brand Info */}
                {vendorInfo.vendor && (
                  <SpecificationItem label="Brand" value={vendorInfo.vendor} />
                )}
                {vendorInfo.country && (
                  <SpecificationItem label="Country of Origin" value={vendorInfo.country} />
                )}
                
                {/* Basic Specs */}
                {Object.entries(basicSpecs).map(([key, value]) => (
                  <SpecificationItem 
                    key={key} 
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} 
                    value={value} 
                  />
                ))}
              </ul>
            </div>
          )}

          {/* Right Column - Additional Specifications */}
          {Object.keys(additionalSpecs).length > 0 && (
            <div>
              <h4 className={`font-semibold text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Additional Information
              </h4>
              <ul className="space-y-2">
                {Object.entries(additionalSpecs).map(([key, value]) => (
                  <SpecificationItem 
                    key={key} 
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} 
                    value={value} 
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* If no data at all */}
        {Object.keys(specs).length === 0 && 
         Object.keys(vendorInfo).length === 0 && 
         !productDescription && (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>No specifications available for this product.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificationsTab;