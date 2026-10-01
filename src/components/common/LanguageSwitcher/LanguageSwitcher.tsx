import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logger from "../../../utils/logger";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [isDarkText, setIsDarkText] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const toggleLanguage = async () => {
    // Prevent multiple simultaneous clicks
    if (isChanging) {
      logger.warn("Language change already in progress");
      return;
    }

    // Check if i18n is initialized
    if (!i18n.isInitialized) {
      logger.warn("i18n not yet initialized, waiting...");
      return;
    }

    setIsChanging(true);
    const newLang = i18n.language === "en" ? "ar" : "en";
    logger.info("=== LANGUAGE SWITCH ===");
    logger.info("Current language:", i18n.language);
    logger.info("Switching to:", newLang);

    try {
      await i18n.changeLanguage(newLang);
      logger.info("Language changed to:", i18n.language);

      // Update HTML dir and lang attributes for RTL support
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLang;
    } catch (error) {
      logger.error("Error changing language:", error);
    } finally {
      setIsChanging(false);
      logger.info("======================");
    }
  };

  // Listen for custom event from Home page and Gallery page to change text color (matches burger menu)
  useEffect(() => {
    const handleNavColorChange = (event: CustomEvent) => {
      setIsDarkText(event.detail.isDark);
    };

    window.addEventListener("navColorChange" as any, handleNavColorChange);

    // Reset on page change
    if (location.pathname === "/") {
      // Home page starts with light text
      setIsDarkText(false);
    } else if (location.pathname === "/gallery") {
      // Gallery page starts with dark text
      setIsDarkText(true);
    } else {
      // All other pages have dark text
      setIsDarkText(true);
    }

    return () => {
      window.removeEventListener("navColorChange" as any, handleNavColorChange);
    };
  }, [location.pathname]);

  // Determine if text should be light or dark (matches mobileButtonColor from Header)
  const textColor = location.pathname === "/" && !isDarkText ? "text-gray-200" : "text-gray-700";

  // Determine icon position based on language (opposite of burger menu)
  const isArabic = i18n.language === "ar";
  const iconPosition = isArabic ? "order-first" : "order-last";

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 ease-in-out text-base font-normal focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${textColor}`}
      aria-label="Toggle language"
    >
      <Globe className={`w-7 h-7 ${iconPosition}`} />
      {/* Show abbreviated text on mobile, full text on desktop */}
      <span className="lg:hidden">{i18n.language === "en" ? "AR" : "EN"}</span>
      <span className="hidden lg:inline">{i18n.language === "en" ? "العربية" : "English"}</span>
    </button>
  );
}
