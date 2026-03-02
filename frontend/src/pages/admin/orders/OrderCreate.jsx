import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiSave, FiX, FiUser, FiMail, FiPhone, FiMapPin,
  FiPackage, FiPlus, FiTrash2, FiShoppingBag,
  FiDollarSign, FiList
} from "react-icons/fi";

const OrderCreate = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "United States"
      }
    },
    items: [
      { id: Date.now(), name: "", sku: "", price: 0, quantity: 1, total: 0 }
    ],
    shipping: {
      method: "standard",
      cost: 5.99
    },
    payment: {
      method: "credit_card",
      status: "unpaid"
    },
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Available products (mock data)
  const availableProducts = [
    { id: 1, name: "Mr. Vapo E-liquid 30ml", sku: "MV-EL-30", price: 4.50 },
    { id: 2, name: "Starter Kit Pro", sku: "SK-PRO-01", price: 54.00 },
    { id: 3, name: "Pod System V2", sku: "PS-V2-01", price: 267.00 },
    { id: 4, name: "Phone Case iPhone 15", sku: "PC-IP15", price: 19.99 },
    { id: 5, name: "Power Bank 10000mAh", sku: "PB-10K", price: 35.00 },
  ];

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = formData.items.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + formData.shipping.cost + tax;
    
    return { subtotal, tax, total };
  }, [formData.items, formData.shipping.cost]);

  // Handle customer field changes
  const handleCustomerChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    }));
    // Clear error for this field
    if (errors[`customer.${field}`]) {
      setErrors(prev => ({ ...prev, [`customer.${field}`]: '' }));
    }
  };

  // Handle address field changes
  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        address: {
          ...prev.customer.address,
          [field]: value
        }
      }
    }));
  };

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    
    if (field === 'product') {
      // Product selected from dropdown
      const product = availableProducts.find(p => p.id === parseInt(value));
      if (product) {
        updatedItems[index] = {
          ...updatedItems[index],
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          quantity: 1,
          total: product.price
        };
      }
    } else {
      // Manual field change
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: field === 'quantity' || field === 'price' ? parseFloat(value) || 0 : value
      };
      
      // Recalculate total
      if (field === 'quantity' || field === 'price') {
        updatedItems[index].total = updatedItems[index].price * updatedItems[index].quantity;
      }
    }

    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  // Add new item row
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: "", sku: "", price: 0, quantity: 1, total: 0 }]
    }));
  };

  // Remove item row
  const removeItem = (index) => {
    if (formData.items.length === 1) {
      alert("At least one item is required");
      return;
    }
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Customer validation
    if (!formData.customer.name.trim()) {
      newErrors['customer.name'] = 'Customer name is required';
    }
    if (!formData.customer.email.trim()) {
      newErrors['customer.email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customer.email)) {
      newErrors['customer.email'] = 'Email is invalid';
    }
    if (!formData.customer.phone.trim()) {
      newErrors['customer.phone'] = 'Phone number is required';
    }

    // Address validation
    if (!formData.customer.address.street.trim()) {
      newErrors['customer.address.street'] = 'Street address is required';
    }
    if (!formData.customer.address.city.trim()) {
      newErrors['customer.address.city'] = 'City is required';
    }
    if (!formData.customer.address.zip.trim()) {
      newErrors['customer.address.zip'] = 'ZIP code is required';
    }

    // Items validation
    formData.items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`items.${index}.name`] = 'Product name is required';
      }
      if (item.price <= 0) {
        newErrors[`items.${index}.price`] = 'Price must be greater than 0';
      }
      if (item.quantity < 1) {
        newErrors[`items.${index}.quantity`] = 'Quantity must be at least 1';
      }
    });

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        ...formData,
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        date: new Date().toISOString(),
        status: 'pending'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Order created:', orderData);
      alert('Order created successfully!');
      navigate('/admin/orders');
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Create New Order
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Add a new customer order
          </p>
        </div>
        
        <button
          onClick={() => navigate('/admin/orders')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
            ${isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <FiList className="text-base" />
          <span>Show Orders</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Customer Information */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b flex items-center gap-2
            ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
            <FiUser className="text-lg" />
            Customer Information
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={formData.customer.name}
                    onChange={(e) => handleCustomerChange('name', e.target.value)}
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors['customer.name'] ? 'border-red-500' : ''}
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
                {errors['customer.name'] && (
                  <p className="text-xs text-red-500 mt-1">{errors['customer.name']}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiMail className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    value={formData.customer.email}
                    onChange={(e) => handleCustomerChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors['customer.email'] ? 'border-red-500' : ''}
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
                {errors['customer.email'] && (
                  <p className="text-xs text-red-500 mt-1">{errors['customer.email']}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiPhone className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="tel"
                  value={formData.customer.phone}
                  onChange={(e) => handleCustomerChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${errors['customer.phone'] ? 'border-red-500' : ''}
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                />
              </div>
              {errors['customer.phone'] && (
                <p className="text-xs text-red-500 mt-1">{errors['customer.phone']}</p>
              )}
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiMapPin className={`absolute left-3 top-2.5 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={formData.customer.address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    placeholder="123 Main St"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${errors['customer.address.street'] ? 'border-red-500' : ''}
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
                {errors['customer.address.street'] && (
                  <p className="text-xs text-red-500 mt-1">{errors['customer.address.street']}</p>
                )}
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.customer.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="New York"
                  className={`w-full px-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${errors['customer.address.city'] ? 'border-red-500' : ''}
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                />
                {errors['customer.address.city'] && (
                  <p className="text-xs text-red-500 mt-1">{errors['customer.address.city']}</p>
                )}
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  State
                </label>
                <input
                  type="text"
                  value={formData.customer.address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  placeholder="NY"
                  className={`w-full px-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                />
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.customer.address.zip}
                  onChange={(e) => handleAddressChange('zip', e.target.value)}
                  placeholder="10001"
                  className={`w-full px-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${errors['customer.address.zip'] ? 'border-red-500' : ''}
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                />
                {errors['customer.address.zip'] && (
                  <p className="text-xs text-red-500 mt-1">{errors['customer.address.zip']}</p>
                )}
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Country
                </label>
                <select
                  value={formData.customer.address.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-base font-medium flex items-center gap-2
              ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FiPackage className="text-lg" />
              Order Items
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <FiPlus className="text-sm" />
              Add Item
            </button>
          </div>

          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={item.id} className={`p-4 rounded-lg border relative
                ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className={`absolute top-2 right-2 p-1 rounded-lg transition-colors
                    ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  <FiTrash2 className="text-sm" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  {/* Product Selection */}
                  <div className="md:col-span-2">
                    <label className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Product
                    </label>
                    <select
                      value={item.id}
                      onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${errors[`items.${index}.name`] ? 'border-red-500' : ''}
                        ${isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                        }`}
                    >
                      <option value="">Select Product</option>
                      {availableProducts.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* SKU */}
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      SKU
                    </label>
                    <input
                      type="text"
                      value={item.sku}
                      onChange={(e) => handleItemChange(index, 'sku', e.target.value)}
                      placeholder="SKU"
                      className={`w-full px-3 py-2 rounded-lg border text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                        }`}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${errors[`items.${index}.price`] ? 'border-red-500' : ''}
                        ${isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                        }`}
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Qty
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${errors[`items.${index}.quantity`] ? 'border-red-500' : ''}
                        ${isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                        }`}
                    />
                  </div>

                  {/* Total */}
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Total
                    </label>
                    <div className={`px-3 py-2 rounded-lg border text-sm font-medium
                      ${isDarkMode ? 'bg-gray-700 border-gray-600 text-blue-400' : 'bg-gray-50 border-gray-300 text-blue-600'}`}>
                      ${item.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                {errors[`items.${index}.name`] && (
                  <p className="text-xs text-red-500 mt-1">{errors[`items.${index}.name`]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col items-end space-y-1">
              <div className="flex gap-8 text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Subtotal:</span>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ${totals.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-8 text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Tax (10%):</span>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ${totals.tax.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-8 text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Shipping:</span>
                <select
                  value={formData.shipping.method}
                  onChange={(e) => {
                    const method = e.target.value;
                    const cost = method === 'express' ? 9.99 : method === 'standard' ? 5.99 : 0;
                    setFormData(prev => ({
                      ...prev,
                      shipping: { method, cost }
                    }));
                  }}
                  className={`px-2 py-1 rounded border text-sm
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                >
                  <option value="standard">Standard ($5.99)</option>
                  <option value="express">Express ($9.99)</option>
                  <option value="free">Free ($0)</option>
                </select>
              </div>
              <div className="flex gap-8 text-base font-bold pt-2 border-t w-full justify-end">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Total:</span>
                <span className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  ${totals.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Method */}
          <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-base font-medium mb-4 flex items-center gap-2
              ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FiDollarSign className="text-lg" />
              Payment
            </h2>

            <div className="space-y-4">
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Payment Method
                </label>
                <select
                  value={formData.payment.method}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    payment: { ...prev.payment, method: e.target.value }
                  }))}
                  className={`w-full px-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Payment Status
                </label>
                <select
                  value={formData.payment.status}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    payment: { ...prev.payment, status: e.target.value }
                  }))}
                  className={`w-full px-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order Notes */}
          <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-base font-medium mb-4 flex items-center gap-2
              ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FiShoppingBag className="text-lg" />
              Order Notes
            </h2>

            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows="4"
              placeholder="Add any notes about this order..."
              className={`w-full px-4 py-2 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
                ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/orders')}
            className={`px-4 py-2 rounded-lg text-sm font-medium
              ${isDarkMode
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
              }`}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <FiSave className="text-sm" />
                <span>Create Order</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderCreate;