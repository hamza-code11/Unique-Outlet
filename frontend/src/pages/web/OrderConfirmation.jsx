// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const OrderConfirmation = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/order/${id}`);
//         setOrder(response.data.order);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (!order) return <p>Order not found</p>;

//   return (
//     <div>
//       <h2>Order Confirmation</h2>
//       <p>Name: {order.name}</p>
//       <p>Email: {order.email}</p>
//       <p>Phone: {order.phone}</p>
//       <p>Address: {order.street_address}</p>

//       <h3>Products</h3>
//       {order.order_items.map(item => (
//         <div key={item.id}>
//           <p>{item.product_name}</p>
//           <p>Qty: {item.quantity}</p>
//           <p>Price: {item.price}</p>
//         </div>
//       ))}

//       <h3>Bank Details</h3>
//       <p>Bank: HBL</p>
//       <p>Account: 123456789</p>
//     </div>
//   );
// };

// export default OrderConfirmation;













// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { FiCheckCircle, FiHome, FiShoppingBag, FiCopy, FiDownload } from "react-icons/fi";
// import Navbar from "../../components/home/Navbar";
// import Footer from "../../components/home/Footer";
// import ShopBanner from "../../components/banner/Banner";
// import axios from "axios";

// const API_URL = 'http://127.0.0.1:8000/api';

// // Admin bank details
// const BANK_DETAILS = {
//   bankName: "Bank of Example",
//   accountTitle: "Your Store Name",
//   accountNumber: "1234-5678-9012-3456",
//   iban: "PK36ABCD1234567890123456",
//   swiftCode: "EXAMPLEPK"
// };

// // QR Code URL (replace with your actual QR code image)
// const QR_CODE_URL = "/images/payment-qr.png"; // Place this image in your public folder

// const OrderConfirmation = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [copySuccess, setCopySuccess] = useState("");
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Dark mode detection
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };
//     checkDarkMode();
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   // Fetch order details
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/checkout/${orderId}`);
        
//         if (response.data.success) {
//           setOrder(response.data.order);
//         } else {
//           setError('Order not found');
//         }
//       } catch (err) {
//         console.error('Error fetching order:', err);
//         setError('Failed to load order details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrder();
//     } else {
//       // Try to get from session storage
//       const lastOrderId = sessionStorage.getItem('lastOrderId');
//       if (lastOrderId) {
//         navigate(`/order/${lastOrderId}`);
//       } else {
//         setError('No order ID provided');
//         setLoading(false);
//       }
//     }
//   }, [orderId, navigate]);

//   const copyToClipboard = (text, field) => {
//     navigator.clipboard.writeText(text);
//     setCopySuccess(field);
//     setTimeout(() => setCopySuccess(""), 2000);
//   };

//   if (loading) {
//     return (
//       <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <Navbar />
//         <ShopBanner title="Order Confirmation" breadcrumbItems={[{ name: "Home", link: "/" }, { name: "Order Confirmation" }]} />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <Navbar />
//         <ShopBanner title="Order Confirmation" breadcrumbItems={[{ name: "Home", link: "/" }, { name: "Order Confirmation" }]} />
//         <div className="flex-grow container mx-auto px-4 py-12 text-center">
//           <div className="max-w-md mx-auto">
//             <div className="text-red-600 text-6xl mb-4">⚠️</div>
//             <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Order Not Found
//             </h2>
//             <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               {error || "We couldn't find your order. Please check your email for confirmation."}
//             </p>
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <FiHome /> Go to Home
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//       <Navbar />
      
//       <ShopBanner 
//         title="Order Confirmation"
//         breadcrumbItems={[
//           { name: "Home", link: "/" },
//           { name: "Cart", link: "/cart" },
//           { name: "Checkout", link: "/checkout" },
//           { name: "Order Confirmation" }
//         ]}
//         showStats={false}
//         showButton={false}
//       />

//       <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        
//         {/* Success Message */}
//         <div className="max-w-3xl mx-auto text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
//             <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
//           </div>
//           <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Thank You for Your Order!
//           </h1>
//           <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//             Your order has been placed successfully. Order ID: #{order.id}
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* Order Details - Left Column */}
//           <div className="lg:col-span-2 space-y-6">
            
//             {/* Order Items */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//             }`}>
//               <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   <FiShoppingBag /> Order Items
//                 </h2>
//               </div>
//               <div className="p-4">
//                 <div className="space-y-3">
//                   {order.order_items.map((item) => (
//                     <div key={item.id} className="flex justify-between items-center">
//                       <div>
//                         <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                           {item.product_name}
//                         </p>
//                         <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                           Qty: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
//                         </p>
//                       </div>
//                       <p className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//                         ${(item.quantity * item.price).toFixed(2)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                   <div className="flex justify-between font-bold text-lg">
//                     <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
//                     <span className="text-blue-600 dark:text-blue-400">
//                       ${order.order_items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Shipping Details */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//             }`}>
//               <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Shipping Details
//                 </h2>
//               </div>
//               <div className="p-4 space-y-2">
//                 <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   <span className="font-medium">Name:</span> {order.name}
//                 </p>
//                 <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   <span className="font-medium">Email:</span> {order.email}
//                 </p>
//                 <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   <span className="font-medium">Phone:</span> {order.phone}
//                 </p>
//                 <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   <span className="font-medium">Address:</span> {order.street_address}, {order.town_city}, {order.country} - {order.postcode}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Payment Details - Right Column */}
//           <div className="space-y-6">
            
//             {/* Bank Transfer Details */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//             }`}>
//               <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Bank Transfer Details
//                 </h2>
//               </div>
//               <div className="p-4 space-y-3">
//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bank Name</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.bankName}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.bankName, 'bank')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Title</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.accountTitle}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.accountTitle, 'title')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Number</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.accountNumber}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.accountNumber, 'account')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>IBAN</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.iban}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.iban, 'iban')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Swift Code</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.swiftCode}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.swiftCode, 'swift')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 {copySuccess && (
//                   <p className="text-xs text-green-600 dark:text-green-400 text-center">
//                     Copied {copySuccess} to clipboard!
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* QR Code Payment */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//             }`}>
//               <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Scan & Pay
//                 </h2>
//               </div>
//               <div className="p-4 text-center">
//                 <div className="w-48 h-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
//                   {/* Replace with actual QR code image */}
//                   <div className="w-full h-full flex items-center justify-center bg-white dark:bg-gray-800">
//                     <span className="text-gray-400">QR Code</span>
//                   </div>
//                 </div>
//                 <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                   Scan with your banking app to pay
//                 </p>
//                 <button
//                   className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
//                   onClick={() => window.open('/images/payment-qr.png', '_blank')}
//                 >
//                   <FiDownload /> Download QR
//                 </button>
//               </div>
//             </div>

//             {/* Amount to Pay */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-blue-900/20' : 'border-gray-200 bg-blue-50'
//             }`}>
//               <div className="p-4 text-center">
//                 <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   Amount to Pay
//                 </p>
//                 <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                   ${order.order_items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
//                 </p>
//                 <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                   Please transfer exact amount within 24 hours
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             to="/"
//             className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <FiHome /> Continue Shopping
//           </Link>
//           <button
//             onClick={() => window.print()}
//             className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-colors ${
//               isDarkMode 
//                 ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
//                 : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <FiDownload /> Download Invoice
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default OrderConfirmation;















// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { FiCheckCircle, FiHome, FiShoppingBag, FiCopy, FiDownload } from "react-icons/fi";
// import Navbar from "../../components/home/Navbar";
// import Footer from "../../components/home/Footer";
// import ShopBanner from "../../components/banner/Banner";
// import axios from "axios";

// const API_URL = 'http://127.0.0.1:8000/api';

// // Admin bank details
// const BANK_DETAILS = {
//   bankName: "Bank of Example",
//   accountTitle: "Your Store Name",
//   accountNumber: "1234-5678-9012-3456",
//   iban: "PK36ABCD1234567890123456",
//   swiftCode: "EXAMPLEPK"
// };

// // Static shipping charge
// const SHIPPING_CHARGE = 2;

// // QR Code URL - IMPORT IMAGE DIRECTLY
// import qrCodeImage from "../../assets/qrcode/qr-code.png"; // Adjust path according to your structure

// const OrderConfirmation = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [copySuccess, setCopySuccess] = useState("");
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Dark mode detection
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.documentElement.classList.contains('dark'));
//     };
//     checkDarkMode();
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
//     return () => observer.disconnect();
//   }, []);

//   // Fetch order details
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/checkout/${orderId}`);
        
//         if (response.data.success) {
//           setOrder(response.data.order);
//         } else {
//           setError('Order not found');
//         }
//       } catch (err) {
//         console.error('Error fetching order:', err);
//         setError('Failed to load order details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrder();
//     } else {
//       // Try to get from session storage
//       const lastOrderId = sessionStorage.getItem('lastOrderId');
//       if (lastOrderId) {
//         navigate(`/order/${lastOrderId}`);
//       } else {
//         setError('No order ID provided');
//         setLoading(false);
//       }
//     }
//   }, [orderId, navigate]);

//   // Calculate order totals with static shipping
//   const calculateSubtotal = () => {
//     if (!order || !order.order_items) return 0;
//     return order.order_items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
//   };

//   const subtotal = calculateSubtotal();
//   const total = subtotal + SHIPPING_CHARGE;

//   const copyToClipboard = (text, field) => {
//     navigator.clipboard.writeText(text);
//     setCopySuccess(field);
//     setTimeout(() => setCopySuccess(""), 2000);
//   };

//   if (loading) {
//     return (
//       <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <Navbar />
//         <ShopBanner title="Order Confirmation" breadcrumbItems={[{ name: "Home", link: "/" }, { name: "Order Confirmation" }]} />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <Navbar />
//         <ShopBanner title="Order Confirmation" breadcrumbItems={[{ name: "Home", link: "/" }, { name: "Order Confirmation" }]} />
//         <div className="flex-grow container mx-auto px-4 py-12 text-center">
//           <div className="max-w-md mx-auto">
//             <div className="text-red-600 text-6xl mb-4">⚠️</div>
//             <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//               Order Not Found
//             </h2>
//             <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               {error || "We couldn't find your order. Please check your email for confirmation."}
//             </p>
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <FiHome /> Go to Home
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
//       <Navbar />
      
//       <ShopBanner 
//         title="Order Confirmation"
//         breadcrumbItems={[
//           { name: "Home", link: "/" },
//           { name: "Cart", link: "/cart" },
//           { name: "Checkout", link: "/checkout" },
//           { name: "Order Confirmation" }
//         ]}
//         showStats={false}
//         showButton={false}
//       />

//       <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        
//         {/* Success Message */}
//         <div className="max-w-3xl mx-auto text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
//             <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
//           </div>
//           <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//             Thank You for Your Order!
//           </h1>
//           <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//             Your order has been placed successfully. Order ID: #{order.id}
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* Order Details - Left Column */}
//           <div className="lg:col-span-2 space-y-6">
            
//             {/* Order Items */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//             }`}>
//               <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   <FiShoppingBag /> Order Items
//                 </h2>
//               </div>
//               <div className="p-4">
//                 <div className="space-y-3">
//                   {order.order_items.map((item) => (
//                     <div key={item.id} className="flex justify-between items-center">
//                       <div>
//                         <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                           {item.product_name}
//                         </p>
//                         <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                           Qty: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
//                         </p>
//                       </div>
//                       <p className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//                         ${(item.quantity * item.price).toFixed(2)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Subtotal */}
//                 <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                   <div className="flex justify-between text-sm">
//                     <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
//                     <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                       ${subtotal.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Shipping */}
//                 <div className="flex justify-between text-sm mt-2">
//                   <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
//                   <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                     ${SHIPPING_CHARGE.toFixed(2)}
//                   </span>
//                 </div>
                
//                 {/* Total */}
//                 <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
//                   <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
//                   <span className="text-blue-600 dark:text-blue-400">
//                     ${total.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Shipping Details */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//             }`}>
//               <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Shipping Details
//                 </h2>
//               </div>
//               <div className="p-4 space-y-2">
//                 <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   <span className="font-medium">Name:</span> {order.name}
//                 </p>
//                 <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   <span className="font-medium">Email:</span> {order.email}
//                 </p>
//                 <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   <span className="font-medium">Phone:</span> {order.phone}
//                 </p>
//                 <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
//                   <span className="font-medium">Address:</span> {order.street_address}, {order.town_city}, {order.country} - {order.postcode}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Payment Details - Right Column */}
//           <div className="space-y-6">
            
//             {/* Bank Transfer Details */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//             }`}>
//               <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Bank Transfer Details
//                 </h2>
//               </div>
//               <div className="p-4 space-y-3">
//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bank Name</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.bankName}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.bankName, 'bank')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Title</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.accountTitle}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.accountTitle, 'title')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Number</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.accountNumber}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.accountNumber, 'account')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>IBAN</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.iban}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.iban, 'iban')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                   <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Swift Code</p>
//                   <div className="flex justify-between items-center">
//                     <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{BANK_DETAILS.swiftCode}</p>
//                     <button
//                       onClick={() => copyToClipboard(BANK_DETAILS.swiftCode, 'swift')}
//                       className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
//                     >
//                       <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//                     </button>
//                   </div>
//                 </div>

//                 {copySuccess && (
//                   <p className="text-xs text-green-600 dark:text-green-400 text-center">
//                     Copied {copySuccess} to clipboard!
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* QR Code Payment */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
//             }`}>
//               <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Scan & Pay
//                 </h2>
//               </div>
//               <div className="p-4 text-center">
//                 <div className="w-48 h-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
//                   {/* QR Code Image - Imported directly */}
//                   <img 
//                     src={qrCodeImage} 
//                     alt="Payment QR Code"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                   Scan with your banking app to pay
//                 </p>
//                 <button
//                   className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
//                   onClick={() => window.open(qrCodeImage, '_blank')}
//                 >
//                   <FiDownload /> Download QR
//                 </button>
//               </div>
//             </div>

//             {/* Amount to Pay */}
//             <div className={`rounded-lg border overflow-hidden ${
//               isDarkMode ? 'border-gray-700 bg-blue-900/20' : 'border-gray-200 bg-blue-50'
//             }`}>
//               <div className="p-4 text-center">
//                 <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   Amount to Pay
//                 </p>
//                 <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                   ${total.toFixed(2)}
//                 </p>
//                 <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                   (Subtotal: ${subtotal.toFixed(2)} + Shipping: ${SHIPPING_CHARGE.toFixed(2)})
//                 </p>
//                 <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                   Please transfer exact amount within 24 hours
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             to="/"
//             className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <FiHome /> Continue Shopping
//           </Link>
//           <button
//             onClick={() => window.print()}
//             className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-colors ${
//               isDarkMode 
//                 ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
//                 : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <FiDownload /> Download Invoice
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default OrderConfirmation;








import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiHome, FiShoppingBag, FiCopy, FiDownload, FiAlertCircle } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';
const BASE_URL = 'http://127.0.0.1:8000';

// Pre-fetch payment data immediately
let paymentDataCache = null;
let dataPromise = null;

// Start fetching payment data immediately
const fetchPaymentData = async () => {
  if (dataPromise) return dataPromise;
  
  dataPromise = axios.get(`${API_URL}/payment-section`, { timeout: 3000 })
    .then(response => {
      if (response.data.success && response.data.payment) {
        paymentDataCache = response.data.payment;
      }
      return paymentDataCache;
    })
    .catch(() => {
      // Fallback data
      paymentDataCache = {
        shipping_charges: "2",
        bank_name: "HBL Bank",
        account_title: "Unique Outlet",
        account_number: "12345678934692",
        iban: "PK36SCBL0000001123456702",
        qrcode_image: "payments/qBUwpRvvmFaq2p0C2QrllTXMIZpQnPsTY4WXbjho.png",
        other: null
      };
      return paymentDataCache;
    });
  
  return dataPromise;
};

// Start fetching immediately
fetchPaymentData();

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [paymentData, setPaymentData] = useState(paymentDataCache);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Dark mode detection
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Get payment data if not already cached
  useEffect(() => {
    if (!paymentData) {
      fetchPaymentData().then(data => {
        if (data) setPaymentData(data);
      });
    }
  }, [paymentData]);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/checkout/${orderId}`);
        
        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    } else {
      // Try to get from session storage
      const lastOrderId = sessionStorage.getItem('lastOrderId');
      if (lastOrderId) {
        navigate(`/order/${lastOrderId}`);
      } else {
        setError('No order ID provided');
        setLoading(false);
      }
    }
  }, [orderId, navigate]);

  // Calculate order totals with dynamic shipping
  const calculateSubtotal = () => {
    if (!order || !order.order_items) return 0;
    return order.order_items.reduce((sum, item) => sum + (item.quantity * parseFloat(item.price)), 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCharges = parseFloat(paymentData?.shipping_charges || 2);
  const total = subtotal + shippingCharges;

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(field);
    setTimeout(() => setCopySuccess(""), 2000);
  };

  // ✅ FIXED: Correct QR code URL construction
  const qrCodeUrl = paymentData?.qrcode_image 
    ? `${BASE_URL}/storage/${paymentData.qrcode_image}`
    : null;

  // Debug logging
  useEffect(() => {
    if (paymentData?.qrcode_image) {
      console.log('QR Image Path:', paymentData.qrcode_image);
      console.log('Full QR URL:', qrCodeUrl);
    }
  }, [paymentData, qrCodeUrl]);

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Navbar />
        <ShopBanner title="Order Confirmation" breadcrumbItems={[{ name: "Home", link: "/" }, { name: "Order Confirmation" }]} />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Navbar />
        <ShopBanner title="Order Confirmation" breadcrumbItems={[{ name: "Home", link: "/" }, { name: "Order Confirmation" }]} />
        <div className="flex-grow container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Order Not Found
            </h2>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {error || "We couldn't find your order. Please check your email for confirmation."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FiHome /> Go to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Navbar />
      
      <ShopBanner 
        title="Order Confirmation"
        breadcrumbItems={[
          { name: "Home", link: "/" },
          { name: "Cart", link: "/cart" },
          { name: "Checkout", link: "/checkout" },
          { name: "Order Confirmation" }
        ]}
        showStats={false}
        showButton={false}
      />

      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        
        {/* Success Message */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Thank You for Your Order!
          </h1>
          <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your order has been placed successfully. Order ID: #{order.id}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Order Details - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Items */}
            <div className={`rounded-lg border overflow-hidden ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <FiShoppingBag /> Order Items
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.product_name}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Qty: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      <p className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        ${(item.quantity * parseFloat(item.price)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Subtotal */}
                <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between text-sm">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-sm mt-2">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    ${shippingCharges.toFixed(2)}
                  </span>
                </div>
                
                {/* Total */}
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className={`rounded-lg border overflow-hidden ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Shipping Details
                </h2>
              </div>
              <div className="p-4 space-y-2">
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <span className="font-medium">Name:</span> {order.name}
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <span className="font-medium">Email:</span> {order.email}
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <span className="font-medium">Phone:</span> {order.phone}
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <span className="font-medium">Address:</span> {order.street_address}, {order.town_city}, {order.country} - {order.postcode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Details - Right Column */}
          <div className="space-y-6">
            
            {/* Bank Transfer Details */}
            <div className={`rounded-lg border overflow-hidden ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bank Transfer Details
                </h2>
              </div>
              <div className="p-4 space-y-3">
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bank Name</p>
                  <div className="flex justify-between items-center">
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {paymentData?.bank_name || "HBL Bank"}
                    </p>
                    <button
                      onClick={() => copyToClipboard(paymentData?.bank_name || "HBL Bank", 'bank')}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Title</p>
                  <div className="flex justify-between items-center">
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {paymentData?.account_title || "Unique Outlet"}
                    </p>
                    <button
                      onClick={() => copyToClipboard(paymentData?.account_title || "Unique Outlet", 'title')}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Number</p>
                  <div className="flex justify-between items-center">
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {paymentData?.account_number || "12345678934692"}
                    </p>
                    <button
                      onClick={() => copyToClipboard(paymentData?.account_number || "12345678934692", 'account')}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>IBAN</p>
                  <div className="flex justify-between items-center">
                    <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {paymentData?.iban || "PK36SCBL0000001123456702"}
                    </p>
                    <button
                      onClick={() => copyToClipboard(paymentData?.iban || "PK36SCBL0000001123456702", 'iban')}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <FiCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>
                  </div>
                </div>

                {paymentData?.other && (
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Additional Info</p>
                    <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {paymentData.other}
                    </p>
                  </div>
                )}

                {copySuccess && (
                  <p className="text-xs text-green-600 dark:text-green-400 text-center">
                    Copied {copySuccess} to clipboard!
                  </p>
                )}
              </div>
            </div>

            {/* QR Code Payment - FIXED */}
            {qrCodeUrl && (
              <div className={`rounded-lg border overflow-hidden ${
                isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              }`}>
                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Scan & Pay
                  </h2>
                </div>
                <div className="p-4 text-center">
                  <div className="w-48 h-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                    <img 
                      src={qrCodeUrl}
                      alt="Payment QR Code"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.error('QR Image failed to load:', qrCodeUrl);
                        e.target.style.display = 'none';
                        setImageError(true);
                      }}
                      onLoad={() => {
                        console.log('QR Image loaded successfully:', qrCodeUrl);
                        setImageError(false);
                      }}
                    />
                    {imageError && (
                      <div className="text-center p-4">
                        <FiAlertCircle className="mx-auto text-red-500 text-3xl mb-2" />
                        <p className="text-xs text-red-500">QR code not available</p>
                      </div>
                    )}
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Scan with your banking app to pay
                  </p>
                  <button
                    className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                    onClick={() => window.open(qrCodeUrl, '_blank')}
                  >
                    <FiDownload /> Download QR
                  </button>
                </div>
              </div>
            )}

            {/* Amount to Pay */}
            <div className={`rounded-lg border overflow-hidden ${
              isDarkMode ? 'border-gray-700 bg-blue-900/20' : 'border-gray-200 bg-blue-50'
            }`}>
              <div className="p-4 text-center">
                <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Amount to Pay
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${total.toFixed(2)}
                </p>
                <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  (Subtotal: ${subtotal.toFixed(2)} + Shipping: ${shippingCharges.toFixed(2)})
                </p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Please transfer exact amount within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiHome /> Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FiDownload /> Download Invoice
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;