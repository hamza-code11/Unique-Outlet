import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import ShopBanner from "../../components/banner/Banner";

const Contact = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="text-xl" />,
      title: "Address",
      details: ["123 Wall Street, New York / NY"],
    },
    {
      icon: <FiPhone className="text-xl" />,
      title: "Phone Number",
      details: ["(800) 123-4567"],
    },
    {
      icon: <FiMail className="text-xl" />,
      title: "E-mail Address",
      details: ["porto@portothereme.com"],
    },
    {
      icon: <FiClock className="text-xl" />,
      title: "Working Days/Hours",
      details: ["Mon - Sun / 9:00AM - 8:00PM"],
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />

      <ShopBanner 
        title="Contact Us"
        breadcrumbItems={[
          { name: "WAPO", link: "/" },
          { name: "CONTACT" }
        ]}
        showStats={false}
        showButton={false}
      />

      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        
        {/* Contact Info Cards - 4 in a row exactly like image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`text-center ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              <div className="flex justify-center mb-3">
                <div className={`p-3 rounded-full ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <div className="text-blue-600 dark:text-blue-400">
                    {info.icon}
                  </div>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-2 uppercase tracking-wider ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-sm">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Contact Form */}
          <div>
            <h2 className={`text-xl md:text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className={`block text-sm mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                             isDarkMode
                               ? 'bg-gray-800 border-gray-700 text-white'
                               : 'bg-white border-gray-300 text-gray-900'
                           }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Your E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                             isDarkMode
                               ? 'bg-gray-800 border-gray-700 text-white'
                               : 'bg-white border-gray-300 text-gray-900'
                           }`}
                />
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  required
                  className={`w-full px-4 py-3 rounded-lg border text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                             isDarkMode
                               ? 'bg-gray-800 border-gray-700 text-white'
                               : 'bg-white border-gray-300 text-gray-900'
                           }`}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                         text-white font-medium rounded-lg hover:from-blue-700 
                         hover:to-cyan-700 transition-all duration-300 
                         flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <FiSend className="text-sm" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Right Column - Map */}
          <div>
            <h2 className={`text-xl md:text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Location
            </h2>
            
            <div className={`rounded-lg overflow-hidden border h-[350px] ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.215512334998!2d-74.0113!3d40.7059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a2b5e8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sWall%20Street%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Location Map"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Address below map */}
            <div className={`mt-4 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="flex items-start gap-3">
                <FiMapPin className={`mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <p className={`text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Our Headquarters
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    123 Wall Street, New York, NY 10005, United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className={`mt-12 pt-8 border-t text-center ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Need immediate assistance? Call our 24/7 support line:{' '}
            <a href="tel:+18001234567" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              (800) 123-4567
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;