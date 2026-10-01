/**
 * API Configuration
 * Centralized API endpoints and configuration
 */

// SECURITY: No fallback to localhost in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

// SECURITY: Validate API URL is configured
if (!API_BASE_URL) {
  if (import.meta.env.PROD) {
    throw new Error(
      "CRITICAL: VITE_API_BASE_URL is not configured. Please set the API endpoint in production environment variables."
    );
  } else {
    console.warn(
      "WARNING: VITE_API_BASE_URL is not set. API calls will fail. Please configure .env file."
    );
  }
}

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
};

export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    signup: `${API_BASE_URL}/auth/signup`,
    logout: `${API_BASE_URL}/auth/logout`,
    refresh: `${API_BASE_URL}/auth/refresh`,
  },

  // Stores
  stores: {
    list: `${API_BASE_URL}/stores`,
    detail: (id: string) => `${API_BASE_URL}/stores/${id}`,
    search: `${API_BASE_URL}/stores/search`,
  },

  // Events
  events: {
    list: `${API_BASE_URL}/events`,
    detail: (id: string) => `${API_BASE_URL}/events/${id}`,
    active: `${API_BASE_URL}/events/active`,
  },

  // Contact
  contact: {
    submit: `${API_BASE_URL}/contact`,
  },

  // Rental Inquiries
  rental: {
    submit: `${API_BASE_URL}/rental/inquiry`,
  },

  // Investment Inquiries
  investment: {
    submit: `${API_BASE_URL}/investment/inquiry`,
  },

  // Careers
  careers: {
    jobs: `${API_BASE_URL}/careers/jobs`,
    apply: `${API_BASE_URL}/careers/apply`,
  },

  // FAQ
  faq: {
    list: `${API_BASE_URL}/faq`,
  },

  // Gallery
  gallery: {
    images: `${API_BASE_URL}/gallery`,
  },
};

export { API_BASE_URL };
