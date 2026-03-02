import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiShoppingBag, FiTruck, FiShield, FiArrowRight, FiStar } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";
import { useCart } from "../../context/CartContext";

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const [shippingMethod, setShippingMethod] = useState(() => {
        // Try to get saved shipping method from localStorage
        const saved = localStorage.getItem('shippingMethod');
        return saved || "standard";
    });
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Shipping rates (in $)
    const shippingRates = {
        standard: 2,
        express: 3
    };

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

    // Save shipping method to localStorage
    useEffect(() => {
        localStorage.setItem('shippingMethod', shippingMethod);
    }, [shippingMethod]);

    // Simulate loading state to show data is being fetched
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Force re-render when cart items change
    useEffect(() => {
        // This will trigger a re-render when cartItems change
        console.log("Cart items updated:", cartItems.length);
    }, [cartItems]);

    // Memoized calculations
    const subtotal = useMemo(() => cartTotal, [cartTotal]);

    const shippingCost = useMemo(() => 
        shippingRates[shippingMethod] || shippingRates.standard,
    [shippingMethod]);
    
    const total = useMemo(() => 
        subtotal + shippingCost,
        [subtotal, shippingCost]
    );

    // Optimized handlers
    const handleUpdateQuantity = useCallback((id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
        } else {
            updateQuantity(id, newQuantity);
        }
    }, [updateQuantity, removeFromCart]);

    const handleRemoveItem = useCallback((id) => {
        removeFromCart(id);
    }, [removeFromCart]);

    const handleShippingChange = useCallback((method) => {
        setShippingMethod(method);
    }, []);

    // Get image URL helper
    const getImageUrl = useCallback((item) => {
        if (item.image) {
            return item.image.startsWith('http') 
                ? item.image 
                : `http://127.0.0.1:8000/storage/${item.image}`;
        }
        return '';
    }, []);

    // Handle checkout click
    const handleCheckout = useCallback(() => {
        navigate('/checkout');
    }, [navigate]);

    // If loading, show skeleton
    if (isLoading) {
        return (
            <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <Navbar />
                <ShopBanner 
                    title="Shopping Cart"
                    breadcrumbItems={[
                        { name: "Home", link: "/" },
                        { name: "Cart" }
                    ]}
                    showStats={false}
                    showButton={false}
                />
                <div className="container mx-auto px-4 py-12 flex-grow">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
            <Navbar />

            {/* Shop Banner Component */}
            <ShopBanner 
                title="Shopping Cart"
                breadcrumbItems={[
                    { name: "Home", link: "/" },
                    { name: "Cart" }
                ]}
                showStats={false}
                showButton={false}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items Section */}
                        <div className="flex-1">
                            <div className={`rounded-xl overflow-hidden border ${
                                isDarkMode ? 'border-gray-700' : 'border-gray-200'
                            }`}>
                                {/* Cart Header */}
                                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                                    <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Cart Items ({cartCount})
                                    </h2>
                                </div>

                                {/* Cart Items List */}
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {cartItems.map((item) => {
                                        const itemTotal = item.price * item.quantity;
                                        const imageUrl = getImageUrl(item);
                                        
                                        return (
                                            <div key={item.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`}>
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    {/* Product Image */}
                                                    <Link to={`/product/${item.slug || item.id}`} className="sm:w-24 sm:h-24">
                                                        <div className={`w-full h-24 sm:h-full rounded-lg overflow-hidden border ${
                                                            isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                                        }`}>
                                                            {imageUrl ? (
                                                                <img
                                                                    src={imageUrl}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                    loading="lazy"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = '';
                                                                        e.target.alt = 'No image';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                                                    <span className="text-xs text-gray-400">No image</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>

                                                    {/* Product Details */}
                                                    <div className="flex-1">
                                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                                            <div className="flex-1">
                                                                <Link to={`/product/${item.slug || item.id}`}>
                                                                    <h3 className={`font-medium text-sm mb-1 hover:text-blue-600 transition-colors ${
                                                                        isDarkMode ? 'text-white' : 'text-gray-900'
                                                                    }`}>
                                                                        {item.name}
                                                                    </h3>
                                                                </Link>
                                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                    Unit Price: ${item.price.toFixed(2)}
                                                                </p>
                                                            </div>

                                                            {/* Item Total */}
                                                            <div className="sm:text-right">
                                                                <span className={`text-sm font-semibold ${
                                                                    isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
                                                                }`}>
                                                                    ${itemTotal.toFixed(2)}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center justify-between mt-3">
                                                            <div className={`inline-flex items-center border rounded-lg ${
                                                                isDarkMode ? 'border-gray-700' : 'border-gray-300'
                                                            }`}>
                                                                <button
                                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                                    className={`px-3 py-1 text-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                                    }`}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className={`px-3 py-1 text-sm min-w-[40px] text-center border-x ${
                                                                    isDarkMode
                                                                        ? 'border-gray-700 text-gray-300'
                                                                        : 'border-gray-300 text-gray-700'
                                                                }`}>
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                                    className={`px-3 py-1 text-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                                    }`}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>

                                                            <button
                                                                onClick={() => handleRemoveItem(item.id)}
                                                                className={`p-1 rounded-full transition-colors hover:bg-red-100 dark:hover:bg-red-900/20
                                                                         ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                                                                title="Remove item"
                                                            >
                                                                <FiTrash2 className="text-lg hover:text-red-500 transition-colors" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Continue Shopping */}
                            <Link
                                to="/shop"
                                className={`inline-flex items-center gap-2 mt-4 px-6 py-2 rounded-lg transition-colors
                                           ${isDarkMode
                                                ? 'text-gray-300 hover:bg-gray-800'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                            >
                                <FiArrowRight className="rotate-180" />
                                <span>Continue Shopping</span>
                            </Link>
                        </div>

                        {/* Order Summary Section */}
                        <div className="w-full lg:w-96">
                            <div className={`rounded-xl border p-6 sticky top-24 ${
                                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                            }`}>
                                <h3 className={`text-lg font-bold mb-4 ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Order Summary
                                </h3>

                                {/* Items Count */}
                                <div className="flex justify-between text-sm mb-3">
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Items</span>
                                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {cartCount}
                                    </span>
                                </div>

                                {/* Subtotal */}
                                <div className="flex justify-between text-sm mb-3">
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                                    <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>

                                {/* Shipping Options */}
                                <div className="mb-4">
                                    <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Shipping Method
                                    </h4>                               
                                    
                                    <div className="space-y-2">
                                        {/* Standard Shipping - $2 */}
                                        <label className={`flex items-center justify-between text-sm p-3 rounded-lg border cursor-pointer
                                            ${shippingMethod === 'standard'
                                                ? isDarkMode
                                                    ? 'border-blue-500 bg-blue-600/10'
                                                    : 'border-blue-500 bg-blue-50'
                                                : isDarkMode
                                                    ? 'border-gray-700 hover:bg-gray-700/50'
                                                    : 'border-gray-200 hover:bg-gray-50'
                                            }`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    value="standard"
                                                    checked={shippingMethod === 'standard'}
                                                    onChange={(e) => handleShippingChange(e.target.value)}
                                                    className="accent-blue-600"
                                                />
                                                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    Standard Shipping
                                                </span>
                                            </div>
                                            <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                $2
                                            </span>
                                        </label>

                                        {/* Express Shipping - $3 */}
                                        <label className={`flex items-center justify-between text-sm p-3 rounded-lg border cursor-pointer
                                            ${shippingMethod === 'express'
                                                ? isDarkMode
                                                    ? 'border-purple-500 bg-purple-600/10'
                                                    : 'border-purple-500 bg-purple-50'
                                                : isDarkMode
                                                    ? 'border-gray-700 hover:bg-gray-700/50'
                                                    : 'border-gray-200 hover:bg-gray-50'
                                            }`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    value="express"
                                                    checked={shippingMethod === 'express'}
                                                    onChange={(e) => handleShippingChange(e.target.value)}
                                                    className="accent-purple-600"
                                                />
                                                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    Express Shipping
                                                </span>
                                            </div>
                                            <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                $3
                                            </span>
                                        </label>
                                    </div>

                                    {/* Shipping Cost Display */}
                                    <div className="flex justify-between text-sm mt-3 pt-2 border-t dark:border-gray-700">
                                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping Cost</span>
                                        <span className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                            ${shippingCost.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between text-base font-bold mb-4 pt-3 border-t dark:border-gray-700">
                                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                                    <span className="text-blue-600 dark:text-blue-400">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                                             text-white font-medium rounded-lg hover:from-blue-700 
                                             hover:to-cyan-700 transition-all duration-300 transform 
                                             hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30
                                             flex items-center justify-center gap-2"
                                >
                                    <FiShoppingBag className="text-lg" />
                                    <span>Proceed to Checkout</span>
                                </button>

                                {/* Trust Badges */}
                                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <FiTruck className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Fast Shipping
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiShield className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Secure Payment
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Empty Cart State
                    <div className={`text-center py-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <FiShoppingBag className="text-6xl mx-auto mb-4 opacity-50" />
                        <h3 className="text-2xl font-bold mb-2">Your cart is empty</h3>
                        <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
                        <Link
                            to="/shop"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                                     text-white font-medium rounded-lg hover:from-blue-700 
                                     hover:to-cyan-700 transition-all duration-300"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Cart;