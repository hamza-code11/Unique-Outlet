import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { 
  FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin,
  FiPackage, FiDollarSign, FiTruck, FiClock,
  FiPrinter, FiCheckCircle, FiXCircle,
  FiRefreshCw, FiCreditCard, FiCalendar
} from "react-icons/fi";

// Status badge color mapping (memoized)
const STATUS_STYLES = {
  paid: 'text-green-500 bg-green-500/10',
  pending: 'text-yellow-500 bg-yellow-500/10',
  overdue: 'text-red-500 bg-red-500/10',
  cancelled: 'text-gray-500 bg-gray-500/10',
};

// Payment badge color mapping
const PAYMENT_STYLES = {
  paid: 'text-green-500 bg-green-500/10',
  unpaid: 'text-yellow-500 bg-yellow-500/10',
  refunded: 'text-gray-500 bg-gray-500/10',
};

const InvoiceDetails = () => {
  const { isDarkMode } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Memoized format date function
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const formatShortDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  // Fetch invoice data with AbortController for cleanup
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchInvoice = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock invoice data
        const mockInvoice = {
          id: id || "INV-2024-001",
          orderId: "ORD-001",
          status: "paid",
          date: "2024-02-15T10:30:00",
          dueDate: "2024-03-15",
          paidDate: "2024-02-15T14:20:00",
          
          customer: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            company: "Doe Enterprises",
            address: {
              street: "123 Main Street",
              city: "New York",
              state: "NY",
              zip: "10001",
              country: "United States"
            }
          },
          
          billing: {
            method: "Credit Card",
            status: "paid",
            transactionId: "TXN-123456789",
            cardLast4: "4242",
            cardBrand: "Visa"
          },
          
          shipping: {
            method: "Standard Shipping",
            cost: 5.99,
            trackingNumber: "TRK-987654321",
            estimatedDelivery: "2024-03-18"
          },
          
          items: [
            {
              id: 1,
              name: "Mr. Vapo E-liquid 30ml",
              sku: "MV-EL-30",
              price: 4.50,
              quantity: 2,
              total: 9.00
            },
            {
              id: 2,
              name: "Starter Kit Pro",
              sku: "SK-PRO-01",
              price: 54.00,
              quantity: 1,
              total: 54.00
            },
            {
              id: 3,
              name: "Pod System V2",
              sku: "PS-V2-01",
              price: 267.00,
              quantity: 1,
              total: 267.00
            }
          ],
          
          subtotal: 330.00,
          discount: 0,
          tax: 33.00,
          shippingCost: 5.99,
          total: 363.00,
          
          notes: "Customer requested gift wrapping. Please include a note with the order.",
          paymentTerms: "Net 30",
          dueAmount: 0
        };

        setInvoice(mockInvoice);
      } catch (err) {
        setError('Failed to load invoice details');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();

    // Cleanup function
    return () => abortController.abort();
  }, [id]);

  // Memoized status update handler
  const handleStatusUpdate = useCallback(async (newStatus) => {
    setUpdating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setInvoice(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  }, []);

  // Memoized calculations
  const invoiceSummary = useMemo(() => {
    if (!invoice) return null;
    return {
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      shipping: invoice.shippingCost,
      total: invoice.total
    };
  }, [invoice]);

  // Print functionality
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Loading invoice details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="text-center py-12">
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {error || 'Invoice not found'}
        </p>
        <button
          onClick={() => navigate('/admin/invoices')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Invoices
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/invoices')}
            className={`p-2 rounded-lg transition-colors
              ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
            aria-label="Back to invoices"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Invoice #{invoice.id}
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Order #{invoice.orderId} • Created on {formatShortDate(invoice.date)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handlePrint}
            className={`p-2 rounded-lg transition-colors
              ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
            title="Print Invoice"
          >
            <FiPrinter className="text-lg" />
          </button>
        </div>
      </div>

      {/* Invoice Status Bar */}
      <div className={`p-4 rounded-lg border flex flex-wrap items-center justify-between gap-4
        ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${STATUS_STYLES[invoice.status] || 'text-gray-500 bg-gray-500/10'}`}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Due: {formatShortDate(invoice.dueDate)}
          </div>
        </div>

        {/* Status Update */}
        <div className="flex items-center gap-2">
          <select
            onChange={(e) => handleStatusUpdate(e.target.value)}
            value={invoice.status}
            disabled={updating}
            className={`px-3 py-1.5 rounded-lg border text-sm min-w-[130px]
              focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
              }`}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {updating && (
            <FiRefreshCw className={`animate-spin ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          )}
        </div>
      </div>

      {/* Customer Information */}
      <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-base font-medium mb-4 pb-2 border-b flex items-center gap-2
          ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
          <FiUser className="text-lg" />
          Customer Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FiUser className={`mt-1 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {invoice.customer.name}
                </p>
                {invoice.customer.company && (
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {invoice.customer.company}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiMail className={`mt-1 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {invoice.customer.email}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Email
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiPhone className={`mt-1 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {invoice.customer.phone}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Phone
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FiMapPin className={`mt-1 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {invoice.customer.address.street}<br />
                  {invoice.customer.address.city}, {invoice.customer.address.state} {invoice.customer.address.zip}<br />
                  {invoice.customer.address.country}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Billing Address
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-base font-medium mb-4 pb-2 border-b flex items-center gap-2
          ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
          <FiPackage className="text-lg" />
          Invoice Items
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product</th>
                <th className={`py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>SKU</th>
                <th className={`py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</th>
                <th className={`py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Qty</th>
                <th className={`py-2 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className={`py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.name}
                  </td>
                  <td className={`py-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.sku}
                  </td>
                  <td className={`py-3 text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    ${item.price.toFixed(2)}
                  </td>
                  <td className={`py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.quantity}
                  </td>
                  <td className={`py-3 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    ${item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary */}
        {invoiceSummary && (
          <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col items-end space-y-1">
              <div className="flex gap-8 text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Subtotal:</span>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ${invoiceSummary.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-8 text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Shipping:</span>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ${invoiceSummary.shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-8 text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Tax:</span>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ${invoiceSummary.tax.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-8 text-base font-bold pt-2 border-t w-full justify-end">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Total:</span>
                <span className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  ${invoiceSummary.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shipping & Payment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Information */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b flex items-center gap-2
            ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
            <FiTruck className="text-lg" />
            Shipping Information
          </h2>

          <div className="space-y-3">
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Method</p>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {invoice.shipping.method}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tracking Number</p>
              <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {invoice.shipping.trackingNumber}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Est. Delivery</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {formatDate(invoice.shipping.estimatedDelivery)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b flex items-center gap-2
            ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
            <FiDollarSign className="text-lg" />
            Payment Information
          </h2>

          <div className="space-y-3">
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Method</p>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {invoice.billing.method}
              </p>
              {invoice.billing.cardLast4 && (
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {invoice.billing.cardBrand} •••• {invoice.billing.cardLast4}
                </p>
              )}
            </div>
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Transaction ID</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {invoice.billing.transactionId}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Payment Status</p>
              <div className="flex items-center gap-2">
                {invoice.billing.status === 'paid' ? (
                  <FiCheckCircle className="text-green-500" />
                ) : (
                  <FiXCircle className="text-red-500" />
                )}
                <span className={`text-sm font-medium ${invoice.billing.status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                  {invoice.billing.status.charAt(0).toUpperCase() + invoice.billing.status.slice(1)}
                </span>
              </div>
            </div>
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Paid At</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {formatDate(invoice.paidDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Notes */}
      {invoice.notes && (
        <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-base font-medium mb-4 pb-2 border-b flex items-center gap-2
            ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
            <FiClock className="text-lg" />
            Invoice Notes
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {invoice.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetails;