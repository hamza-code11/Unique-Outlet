import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setStatus("error");
      setError("Google authentication failed. Please try again.");
      setTimeout(() => navigate("/signin"), 3000);
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(userParam);

        // Store token and user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Set axios default header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setStatus("success");

        // Role-based redirection
        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1500);
      } catch (err) {
        console.error("Error parsing Google callback data:", err);
        setStatus("error");
        setError("Failed to process login data.");
        setTimeout(() => navigate("/signin"), 3000);
      }
    } else {
      setStatus("error");
      setError("No authentication data received.");
      setTimeout(() => navigate("/signin"), 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-4">
        {status === "processing" && (
          <>
            {/* Animated Spinner */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 dark:border-gray-600 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Signing you in...
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Processing your Google authentication
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Login Successful! 🎉
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Redirecting you now...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Failed
            </h2>
            <p className="text-red-500 dark:text-red-400 text-sm mb-2">{error}</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              Redirecting to login page...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
