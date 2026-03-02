import React, { useState, useRef, useEffect } from "react";
import { 
  FiEye, FiEyeOff, FiUpload, FiSave, FiClock, FiTrash2
} from "react-icons/fi";
import axios from "axios";

const NavbarCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Navbar Data - Only Image Logo
  const [navbarData, setNavbarData] = useState({
    general: {
      logo: {
        showLogo: true,
        logoImage: null,
        logoPreview: null
      }
    },
    active: true
  });

  // Fetch existing logo from backend
  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/navbar-setting");

      if (response.data && response.data.logo_image) {
        setNavbarData(prev => ({
          ...prev,
          general: {
            ...prev.general,
            logo: {
              ...prev.general.logo,
              logoImage: response.data.logo_image,
              logoPreview: `http://127.0.0.1:8000/${response.data.logo_image}`
            }
          }
        }));
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!navbarData.general.logo.logoPreview) {
      alert("Please upload a logo image first");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      if (navbarData.general.logo.logoImage && navbarData.general.logo.logoImage.startsWith('data:')) {
        const response = await fetch(navbarData.general.logo.logoImage);
        const blob = await response.blob();
        const file = new File([blob], "logo.png", { type: "image/png" });
        formData.append("logo_image", file);
      }

      await axios.post("http://127.0.0.1:8000/api/navbar-setting", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Logo updated successfully!");
      await fetchLogo();
    } catch (error) {
      console.error("Error saving logo:", error);
      alert("Failed to update logo.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = () => {
    setNavbarData(prev => ({ ...prev, active: !prev.active }));
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setNavbarData(prev => ({
          ...prev,
          general: {
            ...prev.general,
            logo: {
              ...prev.general.logo,
              logoImage: reader.result,
              logoPreview: reader.result
            }
          }
        }));
        setUploading(false);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeLogoImage = () => {
    setNavbarData(prev => ({
      ...prev,
      general: {
        ...prev.general,
        logo: {
          ...prev.general.logo,
          logoImage: null,
          logoPreview: null
        }
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) handleImageUpload(e.target.files[0]);
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Navbar Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage navigation bar logo
          </p>
        </div>

        <button
          onClick={toggleActive}
          className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
            navbarData.active 
              ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
              : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {navbarData.active ? <FiEye /> : <FiEyeOff />}
          <span className="text-sm">{navbarData.active ? 'Active' : 'Inactive'}</span>
        </button>
      </div>

      {/* Logo Upload Section (Image Only) */}
      <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-base font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Logo Settings
        </h3>

        <div className="space-y-4">



          {/* Image Upload */}
          {navbarData.general.logo.showLogo && (
            <div className="ml-14">
              <div className="mb-2">
                <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Logo Image
                </span>
              </div>

              <div className={`relative rounded-lg border-2 border-dashed overflow-hidden max-w-xs ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <div className="aspect-video relative group">

                  {navbarData.general.logo.logoPreview ? (
                    <img
                      src={navbarData.general.logo.logoPreview}
                      alt="Logo"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className={`w-full h-full flex flex-col items-center justify-center ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}>
                      <FiUpload className={`text-3xl mb-2 ${
                        isDarkMode ? 'text-gray-600' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        No logo uploaded
                      </span>
                    </div>
                  )}

                  {/* Upload Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={triggerFileInput}
                      disabled={uploading}
                      className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-medium hover:bg-gray-100 flex items-center gap-1"
                    >
                      {uploading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <FiUpload size={12} />
                          Upload
                        </>
                      )}
                    </button>

                    {navbarData.general.logo.logoPreview && (
                      <button
                        onClick={removeLogoImage}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600"
                      >
                        <FiTrash2 size={12} />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Recommended: 200x100px • Max 2MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          onClick={() => window.history.back()}
          className={`px-4 py-2 rounded-lg text-sm ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={saving || !navbarData.general.logo.logoPreview}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <FiClock className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FiSave />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Stats */}
      <div className={`mt-4 p-4 rounded-lg border ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <span className="text-sm">
          Status: <strong className={navbarData.active ? 'text-green-500' : 'text-red-500'}>
            {navbarData.active ? 'Active' : 'Inactive'}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default NavbarCMS;