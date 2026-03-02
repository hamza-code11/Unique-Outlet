import React from "react";

const SpecificationsTab = ({ isDarkMode }) => {
  const SpecificationItem = ({ label, value }) => (
    <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{label}:</span>
      <span className="font-medium">{value}</span>
    </li>
  );

  return (
    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className={`font-semibold text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Product Specifications
          </h4>
          <ul className="space-y-2">
            <SpecificationItem label="Brand" value="Mr. Vapo" />
            <SpecificationItem label="Flavor" value="Variety Available" />
            <SpecificationItem label="PG/VG Ratio" value="50/50" />
            <SpecificationItem label="Nicotine Strength" value="0mg, 3mg, 6mg, 12mg" />
            <SpecificationItem label="Bottle Material" value="PET Plastic" />
            <SpecificationItem label="Country of Origin" value="USA" />
          </ul>
        </div>
        <div>
          <h4 className={`font-semibold text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Available Sizes
          </h4>
          <ul className="space-y-2">
            <SpecificationItem label="30ml" value="$4.50" />
            <SpecificationItem label="60ml" value="$8.50" />
            <SpecificationItem label="100ml" value="$12.99" />
            <SpecificationItem label="120ml" value="$15.99" />
          </ul>
          
          <h4 className={`font-semibold text-base mb-3 mt-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Additional Information
          </h4>
          <ul className="space-y-2">
            <SpecificationItem label="Shelf Life" value="24 months" />
            <SpecificationItem label="Storage" value="Cool, dry place" />
            <SpecificationItem label="Certification" value="ISO 9001:2015" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsTab;