import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiSave } from "react-icons/fi";

const AdminEditProfile = () => {
  const { isDarkMode } = useOutletContext();

  // Form states
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@wapo.com",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [passwordError, setPasswordError] = useState("");

  // Handle profile changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle password changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
    setPasswordError("");
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords if any password field is filled
    if (password.current || password.new || password.confirm) {
      if (password.new !== password.confirm) {
        setPasswordError("New password and confirm password do not match");
        return;
      }
      if (password.new.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        return;
      }
    }
    
    console.log("Profile updated:", { profile, password });
    alert("Profile updated successfully!");
    
    // Clear password fields after successful update
    setPassword({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Edit Profile
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Update your account information
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        
        {/* Profile Information Section */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b ${
            isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
          }`}>
            Profile Information
          </h2>
          
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b ${
            isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
          }`}>
            Change Password
          </h2>
          <p className={`text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Leave empty if you don't want to change your password
          </p>
          
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="password"
                  name="new"
                  value={password.new}
                  onChange={handlePasswordChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                />
              </div>
            </div>

            {/* Password Error */}
            {passwordError && (
              <p className="text-xs text-red-500 mt-1">{passwordError}</p>
            )}

            {/* Password Hint */}
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Password must be at least 6 characters long
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg text-sm font-medium
              ${isDarkMode
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
              }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <FiSave className="text-sm" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProfile;