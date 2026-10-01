import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enCommon from "../locales/en/common.json";
import enPages from "../locales/en/pages.json";
import enForms from "../locales/en/forms.json";
import enLegal from "../locales/en/legal.json";

import arCommon from "../locales/ar/common.json";
import arPages from "../locales/ar/pages.json";
import arForms from "../locales/ar/forms.json";
import arLegal from "../locales/ar/legal.json";

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

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  defaultNS: "common",
  ns: ["common", "pages", "forms", "legal"],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Update document direction when language changes
i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
  localStorage.setItem("language", lng);
});

// Set initial direction
document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
document.documentElement.lang = i18n.language;

export default i18n;
