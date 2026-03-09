import React, { useState, useRef, useEffect } from "react";
import { 
  FiImage, FiEye, FiEyeOff, FiUpload, FiSave,
  FiRefreshCw, FiCheck, FiX, FiDollarSign,
  FiCreditCard, FiHash, FiFileText, FiHelpCircle
} from "react-icons/fi";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

const PaymentSectionCMS = ({ isDarkMode, isVisible }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Payment Section Data
  const [paymentData, setPaymentData] = useState({
    id: null,
    shipping_charges: "2",
    bank_name: "",
    account_title: "",
    account_number: "",
    iban: "",
    qrcode_image: "",
    qrcode_preview: null,
    other: "",
    active: true,
    originalData: null
  });

  // Fetch payment data from API
  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/payment-section`);
      
      if (response.data.success && response.data.payment) {
        const payment = response.data.payment;

        setPaymentData({
          id: payment.id,
          shipping_charges: payment.shipping_charges || "2",
          bank_name: payment.bank_name || "",
          account_title: payment.account_title || "",
          account_number: payment.account_number || "",
          iban: payment.iban || "",
          qrcode_image: payment.qrcode_image ? `http://127.0.0.1:8000/storage/${payment.qrcode_image}` : "",
          qrcode_preview: null,
          other: payment.other || "",
          active: true,
          originalData: payment
        });
      }
    } catch (err) {
      console.error('Error fetching payment data:', err);
      setError('Failed to load payment data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Load payment data on mount
  useEffect(() => {
    fetchPaymentData();
  }, []);

  const updateField = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActive = () => {
    setPaymentData(prev => ({ ...prev, active: !prev.active }));
  };

  // Save changes to API
  const saveChanges = async () => {
    if (!paymentData.id) {
      setError('No payment section found to update');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      const formData = new FormData();
      
      formData.append('shipping_charges', paymentData.shipping_charges);
      formData.append('bank_name', paymentData.bank_name);
      formData.append('account_title', paymentData.account_title);
      formData.append('account_number', paymentData.account_number);
      formData.append('iban', paymentData.iban);
      formData.append('other', paymentData.other || '');
      
      // Handle QR code image if changed
      if (paymentData.qrcode_preview && paymentData.qrcode_preview.startsWith('data:image')) {
        const response = await fetch(paymentData.qrcode_preview);
        const blob = await response.blob();
        formData.append('qrcode_image', blob, `qrcode-${Date.now()}.png`);
      }

      // Send update request
      await axios.post(`${API_URL}/payment-section/${paymentData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setSuccessMessage('Payment section saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh data
      await fetchPaymentData();
    } catch (err) {
      console.error('Error saving payment data:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    setUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentData(prev => ({
        ...prev,
        qrcode_preview: reader.result
      }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hidden file input for QR code */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
          }
        }}
      />

      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Payment Section Manager
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ID: {paymentData.id || 'N/A'} • Manage payment and shipping settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          {successMessage && (
            <span className="px-3 py-1.5 bg-green-500/20 text-green-600 rounded-lg text-sm flex items-center gap-1">
              <FiCheck /> {successMessage}
            </span>
          )}
          {error && (
            <span className="px-3 py-1.5 bg-red-500/20 text-red-600 rounded-lg text-sm flex items-center gap-1">
              <FiX /> {error}
            </span>
          )}
          {!isVisible && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
              Section Hidden
            </span>
          )}
          <button
            onClick={fetchPaymentData}
            className="p-2 bg-gray-500/20 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
            title="Refresh"
            disabled={saving}
          >
            <FiRefreshCw className={`text-lg ${saving ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={saveChanges}
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-green-600/30 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave /> Save Changes
              </>
            )}
          </button>
          <button 
            onClick={toggleActive}
            className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
              paymentData.active 
                ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'
                : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {paymentData.active ? <FiEye /> : <FiEyeOff />}
            <span className="text-sm">{paymentData.active ? 'Active' : 'Inactive'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Bank Details */}
        <div className="space-y-4">
          <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Bank Details
          </h3>

          {/* Bank Name */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Bank Name
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center w-8">
                <FiCreditCard className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="text"
                value={paymentData.bank_name}
                onChange={(e) => updateField('bank_name', e.target.value)}
                disabled={saving}
                placeholder="e.g., HBL Bank"
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
          </div>

          {/* Account Title */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Account Title
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center w-8">
                <FiFileText className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="text"
                value={paymentData.account_title}
                onChange={(e) => updateField('account_title', e.target.value)}
                disabled={saving}
                placeholder="e.g., Unique Outlet"
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Account Number
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center w-8">
                <FiHash className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="text"
                value={paymentData.account_number}
                onChange={(e) => updateField('account_number', e.target.value)}
                disabled={saving}
                placeholder="e.g., 12345678934692"
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
          </div>

          {/* IBAN */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              IBAN
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center w-8">
                <FiFileText className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="text"
                value={paymentData.iban}
                onChange={(e) => updateField('iban', e.target.value)}
                disabled={saving}
                placeholder="e.g., PK36SCBL0000001123456702"
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
          </div>

          {/* Other (Additional Info) */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Additional Information (Optional)
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center w-8">
                <FiHelpCircle className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <textarea
                value={paymentData.other}
                onChange={(e) => updateField('other', e.target.value)}
                disabled={saving}
                rows="3"
                placeholder="Any additional payment instructions..."
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 resize-none ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Shipping & QR Code */}
        <div className="space-y-4">
          <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Shipping & QR Code
          </h3>

          {/* Shipping Charges */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Shipping Charges ($)
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center w-8">
                <FiDollarSign className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                value={paymentData.shipping_charges}
                onChange={(e) => updateField('shipping_charges', e.target.value)}
                disabled={saving}
                placeholder="2.00"
                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:opacity-50'
                }`}
              />
            </div>
          </div>

          {/* QR Code Image */}
          <div>
            <label className={`block text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              QR Code Image
            </label>
            <div className={`relative rounded-xl border-2 border-dashed overflow-hidden ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <div className="aspect-square relative group">
                {paymentData.qrcode_preview || paymentData.qrcode_image ? (
                  <img 
                    src={paymentData.qrcode_preview || paymentData.qrcode_image} 
                    alt="QR Code"
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <FiImage className={`text-4xl mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      No QR code uploaded
                    </p>
                  </div>
                )}

                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={triggerFileInput}
                    disabled={uploading || saving}
                    className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FiUpload />
                        Upload QR Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p className={`text-xs mt-1 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              QR Code for payments • 300x300px • Max 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className={`mt-6 p-5 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Payment Details Preview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Details Preview */}
          <div className="space-y-2">
            <h4 className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Bank Transfer Details
            </h4>
            <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="space-y-2 text-sm">
                <div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bank Name:</span>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {paymentData.bank_name || "Not set"}
                  </p>
                </div>
                <div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Title:</span>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {paymentData.account_title || "Not set"}
                  </p>
                </div>
                <div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Number:</span>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {paymentData.account_number || "Not set"}
                  </p>
                </div>
                <div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>IBAN:</span>
                  <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {paymentData.iban || "Not set"}
                  </p>
                </div>
                {paymentData.other && (
                  <div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Additional Info:</span>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {paymentData.other}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shipping & QR Preview */}
          <div className="space-y-2">
            <h4 className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Shipping & QR Code
            </h4>
            <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="space-y-3">
                <div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Shipping Charges:</span>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    ${parseFloat(paymentData.shipping_charges || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>QR Code:</span>
                  <div className="mt-2">
                    {paymentData.qrcode_preview || paymentData.qrcode_image ? (
                      <img 
                        src={paymentData.qrcode_preview || paymentData.qrcode_image} 
                        alt="QR Code Preview"
                        className="w-24 h-24 object-contain border rounded-lg"
                      />
                    ) : (
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        No QR code uploaded
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className={`mt-4 p-4 rounded-lg border flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Record ID: <strong>{paymentData.id || 'N/A'}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Shipping: <strong>${parseFloat(paymentData.shipping_charges || 0).toFixed(2)}</strong>
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Status: <strong className={paymentData.active ? 'text-green-500' : 'text-red-500'}>
              {paymentData.active ? 'Active' : 'Inactive'}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSectionCMS;