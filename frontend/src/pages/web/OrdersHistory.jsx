// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiSearch, FiPackage, FiCalendar, FiUser, FiMapPin, FiPhone, FiMail, FiShoppingBag, FiClock, FiRefreshCw } from 'react-icons/fi';
// import axios from '../../services/axios'; // Import your axios instance
// import Navbar from '../../components/home/Navbar';
// import Footer from '../../components/home/Footer';

// const OrdersHistory = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [orderIdInput, setOrderIdInput] = useState('');
//   const [searchedOrder, setSearchedOrder] = useState(null);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [searchError, setSearchError] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [retryCount, setRetryCount] = useState(0);

//   // Check if user is authenticated
//   const isAuthenticated = () => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');
//     return token && user;
//   };

//   // Fetch all orders on component mount
//   useEffect(() => {
//     // Check authentication first
//     if (!isAuthenticated()) {
//       setError('Please login to view your orders');
//       setLoading(false);
//       return;
//     }
//     fetchAllOrders();
//   }, [retryCount]); // Retry when retryCount changes

//   const fetchAllOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const token = localStorage.getItem('token');
      
//       const response = await axios.get('/user/orders', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.data.success) {
//         setOrders(response.data.orders);
//       }
//     } catch (err) {
//       console.error('Error fetching orders:', err);
      
//       if (err.response?.status === 401) {
//         setError('Your session has expired. Please login again.');
//         // Clear invalid tokens
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
        
//         // Redirect to login after 3 seconds
//         setTimeout(() => {
//           navigate('/login');
//         }, 3000);
//       } else if (err.response?.status === 404) {
//         setError('Orders not found');
//       } else if (err.code === 'ECONNABORTED') {
//         setError('Request timeout. Please check your connection.');
//       } else if (!err.response) {
//         setError('Network error. Please check your internet connection.');
//       } else {
//         setError('Failed to fetch orders. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchOrder = async (e) => {
//     e.preventDefault();
//     if (!orderIdInput.trim()) return;

//     // Check authentication
//     if (!isAuthenticated()) {
//       setSearchError('Please login to track orders');
//       return;
//     }

//     try {
//       setSearchLoading(true);
//       setSearchError(null);
//       setSearchedOrder(null);
      
//       const token = localStorage.getItem('token');
      
//       const response = await axios.get(`/order/${orderIdInput}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.data.success) {
//         setSearchedOrder(response.data.order);
//       }
//     } catch (err) {
//       console.error('Error searching order:', err);
      
//       if (err.response?.status === 401) {
//         setSearchError('Session expired. Please login again.');
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
//       } else if (err.response?.status === 404) {
//         setSearchError(`Order #${orderIdInput} not found`);
//       } else {
//         setSearchError('Failed to fetch order. Please try again.');
//       }
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   const handleRetry = () => {
//     setRetryCount(prev => prev + 1);
//   };

//   const handleLoginRedirect = () => {
//     navigate('/login');
//   };

//   const getStatusColor = (status) => {
//     const statusColors = {
//       pending: 'bg-amber-100 text-amber-700 border-amber-200',
//       processing: 'bg-blue-100 text-blue-700 border-blue-200',
//       completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
//       cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
//       delivered: 'bg-purple-100 text-purple-700 border-purple-200'
//     };
//     return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'pending':
//         return <FiClock className="w-4 h-4" />;
//       case 'processing':
//         return <FiShoppingBag className="w-4 h-4" />;
//       case 'completed':
//       case 'delivered':
//         return <FiPackage className="w-4 h-4" />;
//       default:
//         return null;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const calculateTotal = (items) => {
//     if (!items || !items.length) return '0.00';
//     return items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
//   };

//   // Show login required message if not authenticated
//   if (!isAuthenticated() && !loading) {
//     return (
//       <>
//         <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
//         <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-tranquil'}`}>
//           <div className={`text-center p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl max-w-md`}>
//             <div className="p-4 bg-amber-100 rounded-full inline-block mb-4">
//               <FiPackage className="w-12 h-12 text-amber-600" />
//             </div>
//             <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Login Required
//             </h2>
//             <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               Please login to view your order history and track orders.
//             </p>
//             <button
//               onClick={handleLoginRedirect}
//               className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//         <Footer isDarkMode={isDarkMode} />
//       </>
//     );
//   }

//   if (loading) {
//     return (
//       <>
//         <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
//         <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-tranquil'}`}>
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
//             <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading your orders...</p>
//           </div>
//         </div>
//         <Footer isDarkMode={isDarkMode} />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
//       <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-tranquil'} py-12`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           {/* Header with Wave Effect */}
//           <div className="relative mb-12">
//             <div className="absolute inset-0 flex items-center" aria-hidden="true">
//               <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
//             </div>
//             <div className="relative flex justify-center">
//               <span className={`px-6 py-3 text-3xl font-bold ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} rounded-full shadow-lg`}>
//                 Orders History
//               </span>
//             </div>
//           </div>

//           {/* Error Message with Retry Option */}
//           {error && (
//             <div className={`mb-8 p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl border-l-4 border-rose-500`}>
//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-rose-100 rounded-full">
//                     <FiPackage className="w-6 h-6 text-rose-600" />
//                   </div>
//                   <div>
//                     <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                       {error}
//                     </h3>
//                     <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {error.includes('expired') ? 'You will be redirected to login...' : 'Please try again'}
//                     </p>
//                   </div>
//                 </div>
//                 {!error.includes('expired') && (
//                   <button
//                     onClick={handleRetry}
//                     className="px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all flex items-center gap-2"
//                   >
//                     <FiRefreshCw className="w-4 h-4" />
//                     Retry
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Order Search Section */}
//           <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 mb-8 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <FiSearch className="w-6 h-6 text-blue-600" />
//               </div>
//               <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Track Your Order</h2>
//             </div>
            
//             <form onSubmit={handleSearchOrder} className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <input
//                   type="text"
//                   value={orderIdInput}
//                   onChange={(e) => setOrderIdInput(e.target.value)}
//                   placeholder="Enter Order ID (e.g., 42)"
//                   className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
//                     ${isDarkMode 
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                     }`}
//                   disabled={!isAuthenticated()}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={searchLoading || !isAuthenticated()}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all transform hover:scale-105"
//               >
//                 <FiSearch />
//                 {searchLoading ? 'Searching...' : 'Track Order'}
//               </button>
//             </form>

//             {/* Search Results */}
//             {searchError && (
//               <div className="mt-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-3">
//                 <FiPackage className="w-5 h-5" />
//                 {searchError}
//               </div>
//             )}

//             {searchedOrder && (
//                <div className={`mt-8 border-t pt-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Search Result</h3>
//                 <OrderCard 
//                   order={searchedOrder} 
//                   isDarkMode={isDarkMode} 
//                   getStatusColor={getStatusColor} 
//                   getStatusIcon={getStatusIcon} 
//                   formatDate={formatDate} 
//                   calculateTotal={calculateTotal} 
//                 />
//               </div>
//             )}
//           </div>

//           {/* All Orders List */}
//           <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
//             <div className="flex items-center gap-3 mb-8">
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <FiPackage className="w-6 h-6 text-purple-600" />
//               </div>
//               <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Your Order History</h2>
//             </div>
            
//             {orders.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="p-6 bg-gray-100 rounded-full inline-block mb-4">
//                   <FiShoppingBag className="h-12 w-12 text-gray-400" />
//                 </div>
//                 <h3 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No orders yet</h3>
//                 <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>Looks like you haven't placed any orders.</p>
//                 <button
//                   onClick={() => navigate('/')}
//                   className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
//                 >
//                   Start Shopping
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {orders.map((order) => (
//                   <OrderCard 
//                     key={order.id} 
//                     order={order} 
//                     isDarkMode={isDarkMode}
//                     getStatusColor={getStatusColor}
//                     getStatusIcon={getStatusIcon}
//                     formatDate={formatDate}
//                     calculateTotal={calculateTotal}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer isDarkMode={isDarkMode} />
//     </>
//   );
// };

// // Separate OrderCard component remains the same...
// const OrderCard = ({ order, isDarkMode, getStatusColor, getStatusIcon, formatDate, calculateTotal }) => (
//   <div className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1`}>
//     <div className="flex flex-wrap justify-between items-start mb-6">
//       <div>
//         <div className="flex items-center gap-3 mb-2">
//           <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getStatusColor(order?.status)} flex items-center gap-2`}>
//             {getStatusIcon(order?.status)}
//             {order?.status || 'Unknown'}
//           </span>
//           <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Order #{order?.id}
//           </span>
//         </div>
//         <p className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//           <FiCalendar className="w-4 h-4" />
//           {formatDate(order?.created_at)}
//         </p>
//       </div>
//       <div className="text-right">
//         <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Amount</p>
//         <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//           ${calculateTotal(order?.order_items)}
//         </p>
//       </div>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//       <div className="flex items-start gap-3">
//         <FiUser className={`w-5 h-5 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//         <div>
//           <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order?.name}</p>
//           <p className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             <FiMail className="w-3 h-3" />
//             {order?.email}
//           </p>
//           <p className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             <FiPhone className="w-3 h-3" />
//             {order?.phone}
//           </p>
//         </div>
//       </div>
      
//       <div className="flex items-start gap-3">
//         <FiMapPin className={`w-5 h-5 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//         <div>
//           <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Shipping Address</p>
//           <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{order?.street_address}</p>
//           <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             {order?.town_city}, {order?.country} {order?.postcode}
//           </p>
//         </div>
//       </div>

//       <div className="flex items-start gap-3">
//         <FiShoppingBag className={`w-5 h-5 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//         <div>
//           <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Items ({order?.order_items?.length || 0})
//           </p>
//           <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             {order?.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0} total items
//           </p>
//         </div>
//       </div>
//     </div>

//     <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
//       <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Order Items</p>
//       <div className="space-y-3">
//         {order?.order_items?.map((item) => (
//           <div key={item.id} className="flex justify-between items-center">
//             <div className="flex-1">
//               <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                 {item.product_name}
//               </p>
//               <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 Quantity: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
//               </p>
//             </div>
//             <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               ${(parseFloat(item.price) * item.quantity).toFixed(2)}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default OrdersHistory;










import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPackage, FiCalendar, FiUser, FiMapPin, FiPhone, FiMail, FiShoppingBag, FiClock, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios'; // Direct axios import, not from services
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import { API_URL, STORAGE_URL } from "../../config";


const OrdersHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderIdInput, setOrderIdInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [userId, setUserId] = useState(null);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Get user ID from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.id);
        console.log('User ID from localStorage:', user.id);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user;
  };

  // Fetch all orders on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      setError('Please login to view your orders');
      setLoading(false);
      return;
    }
    
    if (userId) {
      fetchAllOrders();
    }
  }, [retryCount, userId]); // Retry when retryCount changes or userId available

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      
      console.log('Fetching orders for user:', userId);
      console.log('Token:', token ? 'Present' : 'Missing');
      
      const response = await axios.get(`${API_URL}/user/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Orders response:', response.data);
      
      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      
      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else if (err.response?.status === 404) {
        setError('Orders not found');
        setOrders([]);
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please check your connection.');
      } else if (!err.response) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Failed to fetch orders. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOrder = async (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;

    if (!isAuthenticated()) {
      setSearchError('Please login to track orders');
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null);
      setSearchedOrder(null);
      
      const token = localStorage.getItem('token');
      
      console.log('Searching order:', orderIdInput);
      
      const response = await axios.get(`${API_URL}/order/${orderIdInput}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Search response:', response.data);
      
      if (response.data.success && response.data.order) {
        setSearchedOrder(response.data.order);
      } else {
        setSearchError(`Order #${orderIdInput} not found`);
      }
    } catch (err) {
      console.error('Error searching order:', err);
      
      if (err.response?.status === 401) {
        setSearchError('Session expired. Please login again.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else if (err.response?.status === 404) {
        setSearchError(`Order #${orderIdInput} not found`);
      } else {
        setSearchError('Failed to fetch order. Please try again.');
      }
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      processing: 'bg-blue-100 text-blue-700 border-blue-200',
      completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
      delivered: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <FiClock className="w-4 h-4" />;
      case 'processing':
        return <FiShoppingBag className="w-4 h-4" />;
      case 'completed':
      case 'delivered':
        return <FiPackage className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotal = (items) => {
    if (!items || !items.length) return '0.00';
    return items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  // Show login required message if not authenticated
  if (!isAuthenticated() && !loading) {
    return (
      <>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className={`text-center p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl max-w-md`}>
            <div className="p-4 bg-amber-100 rounded-full inline-block mb-4">
              <FiPackage className="w-12 h-12 text-amber-600" />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Login Required
            </h2>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Please login to view your order history and track orders.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Go to Login
            </button>
          </div>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading your orders...</p>
          </div>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </>
    );
  }

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center">
              <span className={`px-6 py-3 text-3xl font-bold ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} rounded-full shadow-lg`}>
                Orders History
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-8 p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl border-l-4 border-rose-500`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-rose-100 rounded-full">
                    <FiPackage className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {error}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {error.includes('expired') ? 'You will be redirected to login...' : 'Please try again'}
                    </p>
                  </div>
                </div>
                {!error.includes('expired') && (
                  <button
                    onClick={handleRetry}
                    className="px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all flex items-center gap-2"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                    Retry
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Order Search Section */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 mb-8 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiSearch className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Track Your Order</h2>
            </div>
            
            <form onSubmit={handleSearchOrder} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="Enter Order ID (e.g., 42)"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    ${isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  disabled={!isAuthenticated()}
                />
              </div>
              <button
                type="submit"
                disabled={searchLoading || !isAuthenticated()}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all transform hover:scale-105"
              >
                <FiSearch />
                {searchLoading ? 'Searching...' : 'Track Order'}
              </button>
            </form>

            {/* Search Results */}
            {searchError && (
              <div className="mt-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-3">
                <FiPackage className="w-5 h-5" />
                {searchError}
              </div>
            )}

            {searchedOrder && (
              <div className={`mt-8 border-t pt-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Search Result</h3>
                <OrderCard 
                  order={searchedOrder} 
                  isDarkMode={isDarkMode} 
                  getStatusColor={getStatusColor} 
                  getStatusIcon={getStatusIcon} 
                  formatDate={formatDate} 
                  calculateTotal={calculateTotal} 
                />
              </div>
            )}
          </div>

          {/* All Orders List */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiPackage className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Your Order History</h2>
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="p-6 bg-gray-100 rounded-full inline-block mb-4">
                  <FiShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No orders yet</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>Looks like you haven't placed any orders.</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    isDarkMode={isDarkMode}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    formatDate={formatDate}
                    calculateTotal={calculateTotal}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </>
  );
};

// OrderCard component (same as before)
const OrderCard = ({ order, isDarkMode, getStatusColor, getStatusIcon, formatDate, calculateTotal }) => (
  <div className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1`}>
    <div className="flex flex-wrap justify-between items-start mb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getStatusColor(order?.status)} flex items-center gap-2`}>
            {getStatusIcon(order?.status)}
            {order?.status || 'Unknown'}
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Order #{order?.id}
          </span>
        </div>
        <p className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <FiCalendar className="w-4 h-4" />
          {formatDate(order?.created_at)}
        </p>
      </div>
      <div className="text-right">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Amount</p>
        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          ${calculateTotal(order?.order_items)}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="flex items-start gap-3">
        <FiUser className={`w-5 h-5 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order?.name}</p>
          <p className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <FiMail className="w-3 h-3" />
            {order?.email}
          </p>
          <p className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <FiPhone className="w-3 h-3" />
            {order?.phone}
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <FiMapPin className={`w-5 h-5 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Shipping Address</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{order?.street_address}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {order?.town_city}, {order?.country} {order?.postcode}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FiShoppingBag className={`w-5 h-5 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Items ({order?.order_items?.length || 0})
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {order?.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0} total items
          </p>
        </div>
      </div>
    </div>

    <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Order Items</p>
      <div className="space-y-3">
        {order?.order_items?.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex-1">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.product_name}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Quantity: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
              </p>
            </div>
            <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ${(parseFloat(item.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default OrdersHistory;