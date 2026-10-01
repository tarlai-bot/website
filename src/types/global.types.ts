/**
 * Type Definitions for Custom Events and Global Types
 */

// Custom Event Types
export interface NavColorChangeDetail {
  isDark: boolean;
}

export type NavColorChangeEvent = CustomEvent<NavColorChangeDetail>;

// Route Error Type
export interface RouteError {
  statusText?: string;
  message?: string;
  status?: number;
}

// Form Error Types
export interface FormFieldError {
  message: string;
  type?: string;
}

export interface FormErrors {
  [key: string]: FormFieldError | undefined;
}

// Pagination Types
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: PaginationMeta;
}

// Image Source Types
export interface ImageSource {
  srcSet: string;
  type?: string;
  media?: string;
}

// Color Scheme Type
export type ColorScheme = "light" | "dark" | "auto";

// Language Type
export type Language = "en" | "ar";

// Generic Callback Types
export type VoidCallback = () => void;
export type AsyncVoidCallback = () => Promise<void>;
export type ErrorCallback = (error: Error) => void;

export default {};
