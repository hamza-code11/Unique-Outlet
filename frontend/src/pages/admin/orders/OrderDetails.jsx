// src/pages/admin/orders/OrderDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin,
  FiShoppingBag, FiDollarSign, FiCalendar, FiPackage,
  FiTruck, FiCheckCircle, FiClock, FiXCircle,
  FiSave, FiRefreshCw
} from "react-icons/fi";
import axios from "axios";
import { API_URL, STORAGE_URL } from "../../../config";


const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useOutletContext();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  // Add state for shipping charges (default $2)
  const [shippingCharges, setShippingCharges] = useState(2.00);

  useEffect(() => {
    fetchOrderDetails();
    fetchShippingCharges(); // Fetch shipping charges from payment section
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/order/${id}`);
      
      if (response.data.success && response.data.order) {
        setOrder(response.data.order);
        setSelectedStatus(response.data.order.status);
      } else {
        setError('Order not found');
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Failed to load order details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch shipping charges from payment section
  const fetchShippingCharges = async () => {
    try {
      const response = await axios.get(`${API_URL}/payment-section`);
      if (response.data.success && response.data.payment) {
        setShippingCharges(parseFloat(response.data.payment.shipping_charges) || 2.00);
      }
    } catch (err) {
      console.error('Error fetching shipping charges:', err);
      // Keep default $2
    }
  };

  // Update order status
  const updateOrderStatus = async () => {
    if (!order || selectedStatus === order.status) {
      setSuccessMessage('No changes to save');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    setUpdating(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await axios.post(`${API_URL}/order/${id}/status`, {
        status: selectedStatus
      });

      if (response.data.success) {
        setSuccessMessage('Order status updated successfully!');
        setOrder({ ...order, status: selectedStatus });
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return <FiClock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <FiPackage className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <FiTruck className="w-5 h-5 text-cyan-500" />;
      case 'completed':
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <FiXCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FiPackage className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
      case 'shipped':
        return 'bg-cyan-500/10 text-cyan-600 border-cyan-500/30';
      case 'completed':
      case 'delivered':
        return 'bg-green-500/10 text-green-600 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/10 text-red-600 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/30';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateItemTotal = (price, quantity) => {
    return (parseFloat(price) * quantity).toFixed(2);
  };

  // Calculate order subtotal
  const calculateOrderSubtotal = () => {
    if (!order?.order_items) return '0.00';
    return order.order_items.reduce((sum, item) => 
      sum + (parseFloat(item.price) * item.quantity), 0
    ).toFixed(2);
  };

  // Get shipping charges
  const getShippingCharges = () => {
    return shippingCharges.toFixed(2);
  };

  // Calculate order total with shipping
  const calculateOrderTotal = () => {
    const subtotal = parseFloat(calculateOrderSubtotal());
    return (subtotal + shippingCharges).toFixed(2);
  };

  // Available status options
  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: 'clock', color: 'yellow' },
    { value: 'processing', label: 'Processing', icon: 'package', color: 'blue' },
    { value: 'shipped', label: 'Shipped', icon: 'truck', color: 'cyan' },
    { value: 'completed', label: 'Completed', icon: 'check', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', icon: 'x', color: 'red' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={`p-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <FiPackage className="text-4xl mx-auto mb-3 opacity-50" />
        <p className="text-sm">{error || 'Order not found'}</p>
        <button
          onClick={() => navigate('/admin/orders')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/orders')}
          className={`p-2 rounded-lg transition-colors
            ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
        >
          <FiArrowLeft className="text-xl" />
        </button>
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Order #{order.id}
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            View and manage order details
          </p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-600 flex items-center gap-2">
          <FiCheckCircle className="text-lg" />
          {successMessage}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 flex items-center gap-2">
          <FiXCircle className="text-lg" />
          {error}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer & Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className={`p-6 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FiUser className="text-blue-500" />
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiUser className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {order.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMail className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {order.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {order.phone}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <FiMapPin className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {order.street_address}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {order.town_city}, {order.country}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {order.postcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className={`p-6 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FiShoppingBag className="text-blue-500" />
              Order Items ({order.order_items?.length || 0})
            </h2>
            <div className="space-y-4">
              {order.order_items?.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.product_name}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Price: ${parseFloat(item.price).toFixed(2)}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        ${calculateItemTotal(item.price, item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary & Status */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Summary */}
          <div className={`p-6 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FiPackage className="text-blue-500" />
              Order Summary
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Order ID</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  #{order.id}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Order Date</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatDate(order.created_at)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm items-center">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Current Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between text-sm pt-2">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Subtotal</span>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ${calculateOrderSubtotal()}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Shipping</span>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ${getShippingCharges()}
                </span>
              </div>
              
              <div className={`pt-3 mt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Total Amount
                  </span>
                  <span className={`text-xl font-bold text-blue-600 dark:text-blue-400`}>
                    ${calculateOrderTotal()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Update Status Section */}
          <div className={`p-6 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FiRefreshCw className="text-blue-500" />
              Update Order Status
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Select New Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  disabled={updating}
                  className={`w-full px-4 py-3 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Preview */}
              {selectedStatus && selectedStatus !== order.status && (
                <div className={`p-3 rounded-lg border ${getStatusColor(selectedStatus)} flex items-center gap-2`}>
                  {getStatusIcon(selectedStatus)}
                  <span className="text-sm font-medium">
                    Will change to: {selectedStatus}
                  </span>
                </div>
              )}

              <button
                onClick={updateOrderStatus}
                disabled={updating || selectedStatus === order.status}
                className={`w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                  text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-700 
                  transition-all duration-300 flex items-center justify-center gap-2
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {updating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave className="text-lg" />
                    Update Status
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`p-6 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FiTruck className="text-blue-500" />
              Quick Actions
            </h2>
            
            <div className="space-y-3">
              <button
                onClick={() => window.print()}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                  ${isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Print Invoice
              </button>
              
              <button
                onClick={() => navigate('/admin/orders')}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Back to Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;