import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";

const Register = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState({
    name: "", // firstName + lastName combined
    email: "",
    password: "",
    password_confirmation: "",
    agreeTerms: false,
  });
  const [passwordError, setPasswordError] = useState("");

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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear password error when typing
    if (name === 'password' || name === 'password_confirmation') {
      setPasswordError("");
    }
    // Clear API error when user types
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.password_confirmation) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    // Validate terms agreement
    if (!formData.agreeTerms) {
      setApiError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      // API call to register
      const response = await axios.post('http://localhost:8000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      console.log("Registration successful:", response.data);

      // Store token in localStorage if returned
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Show success message (optional)
      alert("Registration successful! Welcome to WAPO.");

      // Redirect to home page after successful registration
      navigate('/');

    } catch (error) {
      console.error("Registration error:", error);

      // Handle different error responses
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data.errors) {
          // Handle validation errors
          const errors = error.response.data.errors;
          if (errors.email) {
            setApiError(errors.email[0]);
          } else if (errors.password) {
            setApiError(errors.password[0]);
          } else if (errors.name) {
            setApiError(errors.name[0]);
          } else {
            setApiError("Validation failed. Please check your inputs.");
          }
        } else if (error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError("Registration failed. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setApiError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setApiError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
      <Navbar />

      <ShopBanner
        title="Create Account"
        breadcrumbItems={[
          { name: "WAPO", link: "/" },
          { name: "MY ACCOUNT", link: "/signin" },
          { name: "REGISTER" }
        ]}
        showStats={false}
        showButton={false}
      />

      <div className="container mx-auto px-4 py-12 md:py-16 flex-grow">
        <div className="max-w-lg mx-auto">

          {/* Register Card */}
          <div className={`rounded-xl border p-6 md:p-8 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Create Account
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join us today and start shopping!
              </p>
            </div>

            {/* API Error Message */}
            {apiError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {apiError}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name Field - Replaces firstname and lastname */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                             ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                             ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                             ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <FiEye className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className={`text-base ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                             ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <FiEye className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 accent-blue-600 rounded border-gray-300 mt-0.5"
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    I agree to the{' '}
                    <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                         text-white font-medium rounded-lg hover:from-blue-700 
                         hover:to-cyan-700 transition-all duration-300 transform 
                         hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/30
                         flex items-center justify-center gap-2
                         ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <FiUserPlus className="text-lg" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-3 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Sign-Up Button */}
            <a
              href="http://localhost:8000/api/auth/google/redirect"
              className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border text-sm font-medium
                         transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md
                         ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                }`}
            >
              {/* Google 'G' Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </a>

            {/* Sign In Link */}
            <div className="mt-6 pt-6 border-t text-center dark:border-gray-700">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;