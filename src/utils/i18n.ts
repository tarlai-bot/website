/// <reference types="vite/client" />

// src/utils/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enCommon from "../locales/en/common.json";
import enPages from "../locales/en/pages.json";
import enForms from "../locales/en/forms.json";
import enLegal from "../locales/en/legal.json";

import arCommon from "../locales/ar/common.json";
import arPages from "../locales/ar/pages.json";
import arForms from "../locales/ar/forms.json";
import arLegal from "../locales/ar/legal.json";

// Translation resources
const resources = {
  en: {
    common: enCommon,
    pages: enPages,
    forms: enForms,
    legal: enLegal,
  },
  ar: {
    common: arCommon,
    pages: arPages,
    forms: arForms,
    legal: arLegal,
  },
};

// Translations loaded successfully

// Initialize i18n and wait for it to be ready
const initPromise = i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common", "pages", "forms", "legal"],

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    react: {
      useSuspense: false,
    },

    // Debug mode (set to false in production)
    debug: import.meta.env.DEV,
  });

// Wait for initialization to complete
initPromise.then(() => {
  // Set initial direction after initialization
  const currentLang = i18n.language;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = currentLang;
});

// Update document direction when language changes
i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
  localStorage.setItem("language", lng);
});

export default i18n;
