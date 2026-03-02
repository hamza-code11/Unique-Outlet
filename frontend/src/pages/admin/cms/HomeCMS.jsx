import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import {
    FiSave, FiClock, FiEye, FiEyeOff, FiList
} from "react-icons/fi";
import HeroSliderCMS from "../../../components/admin/cms/HeroSliderCMS";
import ContactCMS from "../../../components/admin/cms/ContactCMS";
import AboutCMS from "../../../components/admin/cms/AboutCMS";
import PromoCMS from "../../../components/admin/cms/PromoCMS";
import InteractivePromoCMS from "../../../components/admin/cms/InteractivePromoCMS";
import FaqCMS from "../../../components/admin/cms/FaqCMS";
import PromoProductCMS from "../../../components/admin/cms/PromoProductCMS";
import PromoFeaturesCMS from "../../../components/admin/cms/PromoFeaturesCMS";

const HomeCMS = () => {
    const { isDarkMode } = useOutletContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("hero");
    const [saving, setSaving] = useState(false);

    // Section Visibility
    const [sectionVisibility, setSectionVisibility] = useState({
        hero: true,
        about: true,
        promo: true,
        interactive: true,
        faq: true,
        promoProduct: true,
        promoFeatures: true,
        contact: true
    });

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert("Home page content saved successfully!");
        }, 1000);
    };

    const toggleSection = (section) => {
        setSectionVisibility(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Tab configuration
    const tabs = [
        { id: "hero", label: "Hero Slider" },
        { id: "about", label: "About" },
        { id: "promo", label: "Promo" },
        { id: "interactive", label: "Interactive" },
        { id: "faq", label: "FAQ" },
        { id: "promoProduct", label: "Promo Product" },
        { id: "promoFeatures", label: "Promo Features" },
        { id: "contact", label: "Contact" }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Home Page Manager
                    </h1>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Manage all homepage sections
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
                        ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <FiList />
                    Back to Dashboard
                </button>
            </div>

            {/* Section Tabs - Fixed Dark Mode */}
            <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex flex-wrap gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 
                                ${activeTab === tab.id
                                    ? `border-blue-600 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`
                                    : `border-transparent ${isDarkMode
                                        ? 'text-gray-400 hover:text-gray-200'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Section Visibility Toggle */}
            <div className={`p-4 rounded-lg border flex flex-wrap gap-3 ${isDarkMode
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'
                    }`}>
                    Section Visibility:
                </span>
                {Object.entries(sectionVisibility).map(([key, value]) => {
                    const tabLabel = tabs.find(t => t.id === key)?.label || key;
                    return (
                        <button
                            key={key}
                            onClick={() => toggleSection(key)}
                            className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 transition-colors
                                ${value
                                    ? 'bg-green-500/20 text-green-600 border border-green-500/30'
                                    : isDarkMode
                                        ? 'bg-gray-700 text-gray-400 border border-gray-600'
                                        : 'bg-gray-200 text-gray-600 border border-gray-300'
                                }`}
                        >
                            {value ? <FiEye className="text-xs" /> : <FiEyeOff className="text-xs" />}
                            {tabLabel}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className={`p-5 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                {activeTab === "hero" && (
                    <HeroSliderCMS
                        isDarkMode={isDarkMode}
                        isVisible={sectionVisibility.hero}
                    />
                )}

                {activeTab === "about" && (
                    <AboutCMS
                        isDarkMode={isDarkMode}
                        isVisible={sectionVisibility.about}
                    />
                )}

                {activeTab === "promo" && (
                    <PromoCMS
                        isDarkMode={isDarkMode}
                        isVisible={sectionVisibility.promo}
                    />
                )}

                {activeTab === "interactive" && (
                    <InteractivePromoCMS
                        isDarkMode={isDarkMode}
                        isVisible={sectionVisibility.interactive}
                    />
                )}

                {activeTab === "faq" && (
                    <FaqCMS
                        isDarkMode={isDarkMode}
                        isVisible={sectionVisibility.faq}
                    />
                )}

                {activeTab === "promoProduct" && (
                    <PromoProductCMS
                        isDarkMode={isDarkMode}
                        isVisible={sectionVisibility.promoProduct}
                    />
                )}

                {activeTab === "promoFeatures" && (
                    <PromoFeaturesCMS
                        isDarkMode={isDarkMode}
                        isVisible={sectionVisibility.promoFeatures}
                    />
                )}

                {activeTab === "contact" && (
                    <ContactCMS
                        isDarkMode={isDarkMode}
                        isVisible={sectionVisibility.contact}
                    />
                )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
                <button
                    onClick={() => navigate('/admin')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                >
                    {saving ? <FiClock className="animate-spin" /> : <FiSave />}
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>
        </div>
    );
};

export default HomeCMS;