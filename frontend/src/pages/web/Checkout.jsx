// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiShoppingBag, FiTruck, FiShield, FiLock, FiCreditCard, FiArrowLeft, FiCopy } from "react-icons/fi";
// import Navbar from "../../components/home/Navbar";
// import Footer from "../../components/home/Footer";
// import ShopBanner from "../../components/banner/Banner";
// import { useCart } from "../../context/CartContext";
// import axios from "axios";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cartItems, cartTotal, cartCount, clearCart } = useCart();
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("bank");
//   const [createAccount, setCreateAccount] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
  
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     country: "",
//     street_address: "",
//     town_city: "",
//     postcode: "",
//   });

//   // Redirect if cart is empty
//   // useEffect(() => {
//   //   if (cartItems.length === 0) {
//   //     navigate('/cart');
//   //   }
//   // }, [cartItems, navigate]);

//   // Check for dark mode
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };
//     checkDarkMode();
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   // Validate cart items before submission
//   const validateCartItems = () => {
//     for (const item of cartItems) {
//       if (!item.id || isNaN(item.id) || item.id <= 0) {
//         setError(`Invalid product ID for ${item.name}`);
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate cart items first
//     if (!validateCartItems()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);

//     try {
//       // Get user ID from localStorage or context
//       const userId = localStorage.getItem('userId') || 1;

//       // Prepare the order data with payment method
//       const orderData = {
//         user_id: userId,
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         country: formData.country,
//         street_address: formData.street_address,
//         town_city: formData.town_city,
//         postcode: formData.postcode,
//         payment_method: paymentMethod,
//         products: cartItems.map(item => ({
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity
//         }))
//       };

//       console.log('Sending order data:', orderData);

//       // Step 1: Place the order
//       const response = await axios.post('http://127.0.0.1:8000/api/checkout', orderData, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       console.log('Order placed response:', response.data);
      
//       // Clear cart immediately
//       clearCart();
      
//       // Step 2: Try to get order ID from response
//       let orderId = null;
      
//       // Check if order object exists in response
//       if (response.data.order && response.data.order.id) {
//         orderId = response.data.order.id;
//         console.log('Order ID found in response:', orderId);
//       } 
//       // Check if ID is at root level
//       else if (response.data.id) {
//         orderId = response.data.id;
//         console.log('Order ID found at root:', orderId);
//       }
//       // If no order ID, we need to fetch the latest order
//       else {
//         console.log('No order ID in response, fetching latest order...');
        
//         try {
//           // Fetch the latest order for this user
//           const ordersResponse = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/orders/latest`);
//           console.log('Latest order response:', ordersResponse.data);
          
//           if (ordersResponse.data && ordersResponse.data.order) {
//             orderId = ordersResponse.data.order.id;
//             console.log('Latest order ID:', orderId);
//           } else if (ordersResponse.data && ordersResponse.data.id) {
//             orderId = ordersResponse.data.id;
//           }
//         } catch (fetchErr) {
//           console.error('Error fetching latest order:', fetchErr);
//         }
//       }
      
//       // Step 3: Redirect to order confirmation page
//       if (orderId) {
//         console.log('Redirecting to order confirmation:', orderId);
//         navigate(`/order/${orderId}`);
//       } else {
//         // Fallback: Show success message but no redirect
//         setError('Order placed successfully! But we could not retrieve order details. Please check your email for confirmation.');
//         // Optional: Redirect to a generic success page
//         // navigate('/order-success');
//       }
      
//     } catch (err) {
//       console.error('Error placing order:', err);
      
//       // Detailed error logging
//       if (err.response) {
//         console.error('Error response:', err.response.data);
//         console.error('Error status:', err.response.status);
        
//         // Check if order was created despite error
//         if (err.response.data && err.response.data.order && err.response.data.order.id) {
//           console.log('Order created despite error:', err.response.data.order.id);
//           clearCart();
//           navigate(`/order/${err.response.data.order.id}`);
//           return;
//         }
//       }
      
//       // Handle specific error messages
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else if (err.response?.data?.errors) {
//         const validationErrors = Object.values(err.response.data.errors).flat();
//         setError(validationErrors.join(', '));
//       } else if (err.message?.includes('foreign key constraint')) {
//         setError('One or more products in your cart no longer exist. Please refresh the page and try again.');
//       } else if (err.message?.includes('Network Error')) {
//         setError('Network error. Please check your connection and try again.');
//       } else {
//         setError('Failed to place order. Please try again.');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const shipping = 2;
//   const total = cartTotal + shipping;

//   return (
//     <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-white'
//     }`}>
//       <Navbar />

//       <ShopBanner 
//         title="Checkout"
//         breadcrumbItems={[
//           { name: "Home", link: "/" },
//           { name: "Cart", link: "/cart" },
//           { name: "Checkout" }
//         ]}
//         showStats={false}
//         showButton={false}
//       />

//       <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
//         <Link
//           to="/cart"
//           className={`inline-flex items-center gap-2 mb-4 text-sm hover:text-blue-600 transition-colors
//             ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
//         >
//           <FiArrowLeft /> Back to Cart
//         </Link>

//         {error && (
//           <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             <p className="font-medium">Error:</p>
//             <p className="text-sm">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
//             {/* Billing Details */}
//             <div className="w-full lg:w-2/3">
//               <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
//                 isDarkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
//                 Billing Details
//               </h2>

//               <div className="space-y-3 md:space-y-4">
//                 {/* Name Field */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="John Doe"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="john.doe@example.com"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="03001234567"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Country */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Country *
//                   </label>
//                   <select
//                     name="country"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white'
//                                  : 'bg-white border-gray-300 text-gray-900'
//                              }`}
//                   >
//                     <option value="">Select Country</option>
//                     <option value="Pakistan">Pakistan</option>
//                     <option value="United States">United States</option>
//                     <option value="United Kingdom">United Kingdom</option>
//                     <option value="Canada">Canada</option>
//                     <option value="Australia">Australia</option>
//                   </select>
//                 </div>

//                 {/* Street Address */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Street Address *
//                   </label>
//                   <input
//                     type="text"
//                     name="street_address"
//                     value={formData.street_address}
//                     onChange={handleInputChange}
//                     placeholder="123 Main St"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Town/City and Postcode */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
//                   <div>
//                     <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       Town / City *
//                     </label>
//                     <input
//                       type="text"
//                       name="town_city"
//                       value={formData.town_city}
//                       onChange={handleInputChange}
//                       placeholder="Karachi"
//                       required
//                       className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                  isDarkMode
//                                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                                }`}
//                     />
//                   </div>
//                   <div>
//                     <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       Postcode / ZIP *
//                     </label>
//                     <input
//                       type="text"
//                       name="postcode"
//                       value={formData.postcode}
//                       onChange={handleInputChange}
//                       placeholder="75200"
//                       required
//                       className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                  isDarkMode
//                                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                                }`}
//                     />
//                   </div>
//                 </div>

//                 {/* Create Account Option */}
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     id="createAccount"
//                     checked={createAccount}
//                     onChange={(e) => setCreateAccount(e.target.checked)}
//                     className="w-4 h-4 accent-blue-600 rounded border-gray-300"
//                   />
//                   <label htmlFor="createAccount" className={`text-xs md:text-sm ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                   }`}>
//                     Create an account for faster checkout
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="w-full lg:w-1/3">
//               <div className="lg:sticky lg:top-24">
//                 <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
//                   isDarkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
//                   Order Summary ({cartCount} items)
//                 </h2>

//                 <div className={`rounded-lg md:rounded-xl border overflow-hidden ${
//                   isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                 }`}>
//                   {/* Order Items */}
//                   <div className="p-3 md:p-4 border-b dark:border-gray-700 max-h-96 overflow-y-auto">
//                     <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2">
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Product</span>
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Total</span>
//                     </div>

//                     <div className="space-y-3">
//                       {cartItems.map((item) => (
//                         <div key={item.id} className="flex justify-between text-xs md:text-sm">
//                           <div className="flex-1 pr-2">
//                             <span className={`font-medium block ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                               {item.name}
//                             </span>
//                             <span className={`text-xs block ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
//                               Qty: {item.quantity} × ${item.price.toFixed(2)}
//                             </span>
//                           </div>
//                           <span className={`font-medium whitespace-nowrap ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//                             ${(item.price * item.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Totals */}
//                   <div className="p-3 md:p-4 space-y-2">
//                     <div className="flex justify-between text-xs md:text-sm">
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
//                       <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         ${cartTotal.toFixed(2)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-xs md:text-sm">
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
//                       <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         ${shipping.toFixed(2)}
//                       </span>
//                     </div>

//                     <div className="flex justify-between text-base md:text-lg font-bold pt-2 border-t dark:border-gray-700 mt-2">
//                       <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
//                       <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Payment Methods */}
//                 <div className="mt-4 md:mt-6">
//                   <h3 className={`text-sm font-semibold mb-2 md:mb-3 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Payment Method
//                   </h3>
                  
//                   <div className="space-y-2">
//                     {/* Bank Transfer - Available */}
//                     <label className={`flex items-start gap-2 p-2 md:p-3 rounded-lg border cursor-pointer
//                       ${paymentMethod === 'bank'
//                         ? isDarkMode
//                           ? 'border-blue-500 bg-blue-600/10'
//                           : 'border-blue-500 bg-blue-50'
//                         : isDarkMode
//                           ? 'border-gray-700 hover:bg-gray-800/50'
//                           : 'border-gray-200 hover:bg-gray-50'
//                       }`}>
//                       <input
//                         type="radio"
//                         name="payment"
//                         value="bank"
//                         checked={paymentMethod === 'bank'}
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                         className="mt-0.5 accent-blue-600"
//                       />
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-1">
//                             <FiCreditCard className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                             <span className={`text-xs md:text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                               Bank Transfer
//                             </span>
//                           </div>
//                           <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
//                             Available
//                           </span>
//                         </div>
//                       </div>
//                     </label>

//                     {/* Cash on Delivery - Not Available */}
//                     <label className={`flex items-start gap-2 p-2 md:p-3 rounded-lg border cursor-not-allowed opacity-60
//                       ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                       <input
//                         type="radio"
//                         name="payment"
//                         value="cod"
//                         disabled
//                         className="mt-0.5 accent-blue-600"
//                       />
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-1">
//                             <FiShoppingBag className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                             <span className={`text-xs md:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                               Cash on Delivery
//                             </span>
//                           </div>
//                           <span className="text-xs text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
//                             Not Available
//                           </span>
//                         </div>
//                         <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                           Currently unavailable for your region
//                         </p>
//                       </div>
//                     </label>
//                   </div>

//                   {/* Bank Transfer Instructions */}
//                   {paymentMethod === 'bank' && (
//                     <div className={`mt-4 p-3 rounded-lg ${
//                       isDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
//                     }`}>
//                       <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
//                         Bank Transfer Instructions:
//                       </h4>
//                       <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                         After placing your order, you will receive bank details to complete the payment. 
//                         Please transfer the exact amount within 24 hours.
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full mt-4 md:mt-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                            text-white font-medium rounded-lg text-sm md:text-base
//                            hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
//                            transform hover:scale-[1.01] hover:shadow-md
//                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {isSubmitting ? 'Processing...' : `Place Order ($${total.toFixed(2)})`}
//                 </button>

//                 <div className="mt-4 pt-3 border-t dark:border-gray-700">
//                   <div className="flex items-center justify-center gap-3">
//                     <div className="flex items-center gap-1">
//                       <FiTruck className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                       <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         Free Shipping
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <FiShield className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                       <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         Secure
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Checkout;









// import { useLocation } from "react-router-dom";
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiShoppingBag, FiTruck, FiShield, FiCreditCard, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
// import Navbar from "../../components/home/Navbar";
// import Footer from "../../components/home/Footer";
// import ShopBanner from "../../components/banner/Banner";
// import { useCart } from "../../context/CartContext";
// import axios from "axios";

// const API_URL = 'http://127.0.0.1:8000/api';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cartItems, cartTotal, cartCount, clearCart } = useCart();
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("bank");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Flag to prevent redirect after order placement
//   const orderPlaced = useRef(false);
  
//   // Get user ID
//   const [userId, setUserId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     country: "",
//     street_address: "",
//     town_city: "",
//     postcode: "",
//   });

//   // Get user ID on component mount
//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId') || '1';
//     setUserId(storedUserId);
//   }, []);

//   // Modified redirect - only redirect if cart is empty AND order not placed
//   useEffect(() => {
//     // Don't redirect if order was just placed
//     if (orderPlaced.current) {
//       return;
//     }
    
//     if (cartItems.length === 0) {
//       navigate('/cart');
//     }
//   }, [cartItems, navigate]);

//   // Check for dark mode
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };
//     checkDarkMode();
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     if (!formData.name || !formData.email || !formData.phone || 
//         !formData.country || !formData.street_address || 
//         !formData.town_city || !formData.postcode) {
//       setError('Please fill in all fields');
//       return;
//     }

//     // Validate cart
//     if (cartItems.length === 0) {
//       setError('Your cart is empty');
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);

//     try {
//       // Prepare order data
//       const orderData = {
//         user_id: userId,
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         country: formData.country,
//         street_address: formData.street_address,
//         town_city: formData.town_city,
//         postcode: formData.postcode,
//         payment_method: paymentMethod,
//         products: cartItems.map(item => ({
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity
//         }))
//       };

//       console.log('Sending order:', orderData);

//       // Place the order
//       const response = await axios.post(`${API_URL}/checkout`, orderData, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       console.log('Order response:', response.data);

//       if (response.data.success && response.data.order) {
//         // Set flag that order has been placed
//         orderPlaced.current = true;
        
//         // Store order ID before clearing cart
//         const orderId = response.data.order.id;
        
//         // Clear cart
//         clearCart();
        
//         // Store in session storage as backup
//         sessionStorage.setItem('lastOrderId', orderId);
        
//         // Redirect to order confirmation
//         navigate(`/order/${orderId}`);
//       } else {
//         throw new Error('Invalid response from server');
//       }
      
//     } catch (err) {
//       console.error('Checkout error:', err);
      
//       let errorMessage = 'Failed to place order. ';
      
//       if (err.response) {
//         if (err.response.data.errors) {
//           errorMessage += Object.values(err.response.data.errors).flat().join(', ');
//         } else if (err.response.data.message) {
//           errorMessage += err.response.data.message;
//         } else {
//           errorMessage += `Server error (${err.response.status})`;
//         }
//       } else if (err.request) {
//         errorMessage += 'Network error. Please check your connection.';
//       } else {
//         errorMessage += err.message;
//       }
      
//       setError(errorMessage);
//       setIsSubmitting(false);
//     }
//   };

  
// // Inside Checkout component, add:
// const location = useLocation();

// // Add state for shipping
// const [shippingCost, setShippingCost] = useState(2); // default $2
// const [shippingMethod, setShippingMethod] = useState("standard");

// // In useEffect, get shipping data from navigation state or sessionStorage
// useEffect(() => {
//   // First try to get from navigation state
//   if (location.state?.shippingCost) {
//     setShippingCost(location.state.shippingCost);
//     setShippingMethod(location.state.shippingMethod || "standard");
//   } else {
//     // Fallback to sessionStorage
//     const savedCost = sessionStorage.getItem('shippingCost');
//     const savedMethod = sessionStorage.getItem('shippingMethod');
    
//     if (savedCost) {
//       setShippingCost(parseFloat(savedCost));
//     }
//     if (savedMethod) {
//       setShippingMethod(savedMethod);
//     }
//   }
// }, [location.state]);

// // Then use shippingCost in your total calculation
// const total = cartTotal + shippingCost;


//   // Don't render if cart is empty and order not placed
//   if (cartItems.length === 0 && !orderPlaced.current) {
//     return null; // Will redirect via useEffect
//   }

//   return (
//     <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-white'
//     }`}>
//       <Navbar />

//       <ShopBanner 
//         title="Checkout"
//         breadcrumbItems={[
//           { name: "Home", link: "/" },
//           { name: "Cart", link: "/cart" },
//           { name: "Checkout" }
//         ]}
//         showStats={false}
//         showButton={false}
//       />

//       <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
//         <Link
//           to="/cart"
//           className={`inline-flex items-center gap-2 mb-4 text-sm hover:text-blue-600 transition-colors
//             ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
//         >
//           <FiArrowLeft /> Back to Cart
//         </Link>

//         {error && (
//           <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             <p className="font-medium">Error:</p>
//             <p className="text-sm">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
//             {/* Billing Details */}
//             <div className="w-full lg:w-2/3">
//               <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
//                 isDarkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
//                 Billing Details
//               </h2>

//               <div className="space-y-3 md:space-y-4">
//                 {/* Name Field */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="John Doe"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="john.doe@example.com"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="03001234567"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Country - Input field */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Country *
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     placeholder="Pakistan"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Street Address */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Street Address *
//                   </label>
//                   <input
//                     type="text"
//                     name="street_address"
//                     value={formData.street_address}
//                     onChange={handleInputChange}
//                     placeholder="123 Main St"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Town/City and Postcode */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
//                   <div>
//                     <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       Town / City *
//                     </label>
//                     <input
//                       type="text"
//                       name="town_city"
//                       value={formData.town_city}
//                       onChange={handleInputChange}
//                       placeholder="Karachi"
//                       required
//                       className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                  isDarkMode
//                                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                                }`}
//                     />
//                   </div>
//                   <div>
//                     <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       Postcode / ZIP *
//                     </label>
//                     <input
//                       type="text"
//                       name="postcode"
//                       value={formData.postcode}
//                       onChange={handleInputChange}
//                       placeholder="75200"
//                       required
//                       className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                  isDarkMode
//                                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                                }`}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="w-full lg:w-1/3">
//               <div className="lg:sticky lg:top-24">
//                 <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
//                   isDarkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
//                   Order Summary ({cartCount} items)
//                 </h2>

//                 <div className={`rounded-lg md:rounded-xl border overflow-hidden ${
//                   isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                 }`}>
//                   {/* Order Items */}
//                   <div className="p-3 md:p-4 border-b dark:border-gray-700 max-h-96 overflow-y-auto">
//                     <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2">
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Product</span>
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Total</span>
//                     </div>

//                     <div className="space-y-3">
//                       {cartItems.map((item) => (
//                         <div key={item.id} className="flex justify-between text-xs md:text-sm">
//                           <div className="flex-1 pr-2">
//                             <span className={`font-medium block ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                               {item.name}
//                             </span>
//                             <span className={`text-xs block ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
//                               Qty: {item.quantity} × ${item.price.toFixed(2)}
//                             </span>
//                           </div>
//                           <span className={`font-medium whitespace-nowrap ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//                             ${(item.price * item.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Totals */}
//                   <div className="p-3 md:p-4 space-y-2">
//                     <div className="flex justify-between text-xs md:text-sm">
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
//                       <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         ${cartTotal.toFixed(2)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-xs md:text-sm">
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
//                       <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         ${shipping.toFixed(2)}
//                       </span>
//                     </div>

//                     <div className="flex justify-between text-base md:text-lg font-bold pt-2 border-t dark:border-gray-700 mt-2">
//                       <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
//                       <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full mt-4 md:mt-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                            text-white font-medium rounded-lg text-sm md:text-base
//                            hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
//                            transform hover:scale-[1.01] hover:shadow-md flex items-center justify-center gap-2
//                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <FiCheckCircle className="text-lg" />
//                       Place Order (${total.toFixed(2)})
//                     </>
//                   )}
//                 </button>

//                 <div className="mt-4 pt-3 border-t dark:border-gray-700">
//                   <div className="flex items-center justify-center gap-3">
//                     <div className="flex items-center gap-1">
//                       <FiTruck className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                       <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         Free Shipping
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <FiShield className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                       <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         Secure Payment
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Checkout;











// import { useLocation } from "react-router-dom";
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiShoppingBag, FiTruck, FiShield, FiCreditCard, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
// import Navbar from "../../components/home/Navbar";
// import Footer from "../../components/home/Footer";
// import ShopBanner from "../../components/banner/Banner";
// import { useCart } from "../../context/CartContext";
// import axios from "axios";

// const API_URL = 'http://127.0.0.1:8000/api';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cartItems, cartTotal, cartCount, clearCart } = useCart();
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("bank");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Flag to prevent redirect after order placement
//   const orderPlaced = useRef(false);
  
//   // Get user ID
//   const [userId, setUserId] = useState(null);

//   // Static shipping charge - $2 fixed (no migration needed)
//   const SHIPPING_CHARGE = 2;

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     country: "",
//     street_address: "",
//     town_city: "",
//     postcode: "",
//   });

//   // Calculate total with static shipping
//   const total = cartTotal + SHIPPING_CHARGE;

//   // Get user ID on component mount
//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId') || '1';
//     setUserId(storedUserId);
//   }, []);

//   // Modified redirect - only redirect if cart is empty AND order not placed
//   useEffect(() => {
//     // Don't redirect if order was just placed
//     if (orderPlaced.current) {
//       return;
//     }
    
//     if (cartItems.length === 0) {
//       navigate('/cart');
//     }
//   }, [cartItems, navigate]);

//   // Check for dark mode
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };
//     checkDarkMode();
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     if (!formData.name || !formData.email || !formData.phone || 
//         !formData.country || !formData.street_address || 
//         !formData.town_city || !formData.postcode) {
//       setError('Please fill in all fields');
//       return;
//     }

//     // Validate cart
//     if (cartItems.length === 0) {
//       setError('Your cart is empty');
//       return;
//     }

//     setIsSubmitting(true);
//     setError(null);

//     try {
//       // Prepare order data with static shipping
//       const orderData = {
//         user_id: userId,
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         country: formData.country,
//         street_address: formData.street_address,
//         town_city: formData.town_city,
//         postcode: formData.postcode,
//         payment_method: paymentMethod,
//         // Shipping info - static for now
//         shipping_method: "standard",
//         shipping_cost: SHIPPING_CHARGE,
//         total_amount: total,
//         products: cartItems.map(item => ({
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity
//         }))
//       };

//       console.log('Sending order:', orderData);

//       // Place the order
//       const response = await axios.post(`${API_URL}/checkout`, orderData, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       console.log('Order response:', response.data);

//       if (response.data.success && response.data.order) {
//         // Set flag that order has been placed
//         orderPlaced.current = true;
        
//         // Store order ID before clearing cart
//         const orderId = response.data.order.id;
        
//         // Clear cart
//         clearCart();
        
//         // Store in session storage as backup
//         sessionStorage.setItem('lastOrderId', orderId);
        
//         // Redirect to order confirmation
//         navigate(`/order/${orderId}`);
//       } else {
//         throw new Error('Invalid response from server');
//       }
      
//     } catch (err) {
//       console.error('Checkout error:', err);
      
//       let errorMessage = 'Failed to place order. ';
      
//       if (err.response) {
//         if (err.response.data.errors) {
//           errorMessage += Object.values(err.response.data.errors).flat().join(', ');
//         } else if (err.response.data.message) {
//           errorMessage += err.response.data.message;
//         } else {
//           errorMessage += `Server error (${err.response.status})`;
//         }
//       } else if (err.request) {
//         errorMessage += 'Network error. Please check your connection.';
//       } else {
//         errorMessage += err.message;
//       }
      
//       setError(errorMessage);
//       setIsSubmitting(false);
//     }
//   };

//   // Don't render if cart is empty and order not placed
//   if (cartItems.length === 0 && !orderPlaced.current) {
//     return null; // Will redirect via useEffect
//   }

//   return (
//     <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
//       isDarkMode ? 'bg-gray-900' : 'bg-white'
//     }`}>
//       <Navbar />

//       <ShopBanner 
//         title="Checkout"
//         breadcrumbItems={[
//           { name: "Home", link: "/" },
//           { name: "Cart", link: "/cart" },
//           { name: "Checkout" }
//         ]}
//         showStats={false}
//         showButton={false}
//       />

//       <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
//         <Link
//           to="/cart"
//           className={`inline-flex items-center gap-2 mb-4 text-sm hover:text-blue-600 transition-colors
//             ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
//         >
//           <FiArrowLeft /> Back to Cart
//         </Link>

//         {error && (
//           <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             <p className="font-medium">Error:</p>
//             <p className="text-sm">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
//             {/* Billing Details */}
//             <div className="w-full lg:w-2/3">
//               <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
//                 isDarkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
//                 Billing Details
//               </h2>

//               <div className="space-y-3 md:space-y-4">
//                 {/* Name Field */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="John Doe"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="john.doe@example.com"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="03001234567"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Country - Input field */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Country *
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     placeholder="Pakistan"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Street Address */}
//                 <div>
//                   <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                   }`}>
//                     Street Address *
//                   </label>
//                   <input
//                     type="text"
//                     name="street_address"
//                     value={formData.street_address}
//                     onChange={handleInputChange}
//                     placeholder="123 Main St"
//                     required
//                     className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                isDarkMode
//                                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                              }`}
//                   />
//                 </div>

//                 {/* Town/City and Postcode */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
//                   <div>
//                     <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       Town / City *
//                     </label>
//                     <input
//                       type="text"
//                       name="town_city"
//                       value={formData.town_city}
//                       onChange={handleInputChange}
//                       placeholder="Karachi"
//                       required
//                       className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                  isDarkMode
//                                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                                }`}
//                     />
//                   </div>
//                   <div>
//                     <label className={`block text-xs md:text-sm font-medium mb-1 ${
//                       isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       Postcode / ZIP *
//                     </label>
//                     <input
//                       type="text"
//                       name="postcode"
//                       value={formData.postcode}
//                       onChange={handleInputChange}
//                       placeholder="75200"
//                       required
//                       className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                  isDarkMode
//                                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
//                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
//                                }`}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="w-full lg:w-1/3">
//               <div className="lg:sticky lg:top-24">
//                 <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
//                   isDarkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
//                   Order Summary ({cartCount} items)
//                 </h2>

//                 <div className={`rounded-lg md:rounded-xl border overflow-hidden ${
//                   isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                 }`}>
//                   {/* Order Items */}
//                   <div className="p-3 md:p-4 border-b dark:border-gray-700 max-h-96 overflow-y-auto">
//                     <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2">
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Product</span>
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Total</span>
//                     </div>

//                     <div className="space-y-3">
//                       {cartItems.map((item) => (
//                         <div key={item.id} className="flex justify-between text-xs md:text-sm">
//                           <div className="flex-1 pr-2">
//                             <span className={`font-medium block ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                               {item.name}
//                             </span>
//                             <span className={`text-xs block ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
//                               Qty: {item.quantity} × ${item.price.toFixed(2)}
//                             </span>
//                           </div>
//                           <span className={`font-medium whitespace-nowrap ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//                             ${(item.price * item.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Totals */}
//                   <div className="p-3 md:p-4 space-y-2">
//                     <div className="flex justify-between text-xs md:text-sm">
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
//                       <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         ${cartTotal.toFixed(2)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-xs md:text-sm">
//                       <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
//                       <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         ${SHIPPING_CHARGE.toFixed(2)} {/* Static shipping charge */}
//                       </span>
//                     </div>

//                     <div className="flex justify-between text-base md:text-lg font-bold pt-2 border-t dark:border-gray-700 mt-2">
//                       <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
//                       <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full mt-4 md:mt-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
//                            text-white font-medium rounded-lg text-sm md:text-base
//                            hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
//                            transform hover:scale-[1.01] hover:shadow-md flex items-center justify-center gap-2
//                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <FiCheckCircle className="text-lg" />
//                       Place Order (${total.toFixed(2)})
//                     </>
//                   )}
//                 </button>

//                 <div className="mt-4 pt-3 border-t dark:border-gray-700">
//                   <div className="flex items-center justify-center gap-3">
//                     <div className="flex items-center gap-1">
//                       <FiTruck className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                       <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         Shipping: ${SHIPPING_CHARGE.toFixed(2)}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <FiShield className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                       <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         Secure Payment
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Checkout;













import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiTruck, FiShield, FiCreditCard, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";
import { useCart } from "../../context/CartContext";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Flag to prevent redirect after order placement
  const orderPlaced = useRef(false);
  
  // Get user ID
  const [userId, setUserId] = useState(null);

  // Static shipping charge - $2 fixed (no migration needed)
  const SHIPPING_CHARGE = 2;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    street_address: "",
    town_city: "",
    postcode: "",
  });

  // Calculate total with static shipping
  const total = cartTotal + SHIPPING_CHARGE;

  // Get user ID on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId') || '1';
    setUserId(storedUserId);
  }, []);

  // Modified redirect - only redirect if cart is empty AND order not placed
  useEffect(() => {
    // Don't redirect if order was just placed
    if (orderPlaced.current) {
      return;
    }
    
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.country || !formData.street_address || 
        !formData.town_city || !formData.postcode) {
      setError('Please fill in all fields');
      return;
    }

    // Validate cart
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // ✅ FIXED: Calculate total with quantities properly
      const subtotal = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      
      const totalAmount = subtotal + SHIPPING_CHARGE;

      // Prepare order data with correct calculations
      const orderData = {
        user_id: userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        street_address: formData.street_address,
        town_city: formData.town_city,
        postcode: formData.postcode,
        payment_method: paymentMethod,
        // Shipping info
        shipping_method: "standard",
        shipping_cost: SHIPPING_CHARGE,
        subtotal: subtotal, // Send subtotal separately
        total_amount: totalAmount,
        products: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price, // This is per-unit price
          quantity: item.quantity,
          total: item.price * item.quantity // Send item total as well
        }))
      };

      console.log('Sending order with correct prices:', orderData);

      // Place the order
      const response = await axios.post(`${API_URL}/checkout`, orderData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Order response:', response.data);

      if (response.data.success && response.data.order) {
        // Set flag that order has been placed
        orderPlaced.current = true;
        
        // Store order ID before clearing cart
        const orderId = response.data.order.id;
        
        // Clear cart
        clearCart();
        
        // Store in session storage as backup
        sessionStorage.setItem('lastOrderId', orderId);
        
        // Redirect to order confirmation
        navigate(`/order/${orderId}`);
      } else {
        throw new Error('Invalid response from server');
      }
      
    } catch (err) {
      console.error('Checkout error:', err);
      
      let errorMessage = 'Failed to place order. ';
      
      if (err.response) {
        if (err.response.data.errors) {
          errorMessage += Object.values(err.response.data.errors).flat().join(', ');
        } else if (err.response.data.message) {
          errorMessage += err.response.data.message;
        } else {
          errorMessage += `Server error (${err.response.status})`;
        }
      } else if (err.request) {
        errorMessage += 'Network error. Please check your connection.';
      } else {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  // Calculate item total for display
  const getItemTotal = (item) => {
    return item.price * item.quantity;
  };

  // Don't render if cart is empty and order not placed
  if (cartItems.length === 0 && !orderPlaced.current) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />

      <ShopBanner 
        title="Checkout"
        breadcrumbItems={[
          { name: "Home", link: "/" },
          { name: "Cart", link: "/cart" },
          { name: "Checkout" }
        ]}
        showStats={false}
        showButton={false}
      />

      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <Link
          to="/cart"
          className={`inline-flex items-center gap-2 mb-4 text-sm hover:text-blue-600 transition-colors
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <FiArrowLeft /> Back to Cart
        </Link>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* Billing Details */}
            <div className="w-full lg:w-2/3">
              <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                Billing Details
              </h2>

              <div className="space-y-3 md:space-y-4">
                {/* Name Field */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                               isDarkMode
                                 ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    required
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                               isDarkMode
                                 ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="03001234567"
                    required
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                               isDarkMode
                                 ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                </div>

                {/* Country - Input field */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Pakistan"
                    required
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                               isDarkMode
                                 ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label className={`block text-xs md:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street_address"
                    value={formData.street_address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                    required
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                               isDarkMode
                                 ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                 : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                             }`}
                  />
                </div>

                {/* Town/City and Postcode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className={`block text-xs md:text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Town / City *
                    </label>
                    <input
                      type="text"
                      name="town_city"
                      value={formData.town_city}
                      onChange={handleInputChange}
                      placeholder="Karachi"
                      required
                      className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                 isDarkMode
                                   ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                               }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs md:text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Postcode / ZIP *
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      placeholder="75200"
                      required
                      className={`w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                 isDarkMode
                                   ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                               }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="lg:sticky lg:top-24">
                <h2 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                  Order Summary ({cartCount} items)
                </h2>

                <div className={`rounded-lg md:rounded-xl border overflow-hidden ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {/* Order Items */}
                  <div className="p-3 md:p-4 border-b dark:border-gray-700 max-h-96 overflow-y-auto">
                    <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Product</span>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Total</span>
                    </div>

                    <div className="space-y-3">
                      {cartItems.map((item) => {
                        const itemTotal = getItemTotal(item);
                        return (
                          <div key={item.id} className="flex justify-between text-xs md:text-sm">
                            <div className="flex-1 pr-2">
                              <span className={`font-medium block ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                {item.name}
                              </span>
                              <span className={`text-xs block ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </span>
                            </div>
                            <span className={`font-medium whitespace-nowrap ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                              ${itemTotal.toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="p-3 md:p-4 space-y-2">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ${SHIPPING_CHARGE.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-base md:text-lg font-bold pt-2 border-t dark:border-gray-700 mt-2">
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                      <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full mt-4 md:mt-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                           text-white font-medium rounded-lg text-sm md:text-base
                           hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 
                           transform hover:scale-[1.01] hover:shadow-md flex items-center justify-center gap-2
                           ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="text-lg" />
                      Place Order (${total.toFixed(2)})
                    </>
                  )}
                </button>

                <div className="mt-4 pt-3 border-t dark:border-gray-700">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center gap-1">
                      <FiTruck className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Shipping: ${SHIPPING_CHARGE.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiShield className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Secure Payment
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;