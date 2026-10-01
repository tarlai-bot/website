// Careers Page Type Definitions

/**
 * Represents a job posting
 */
export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time";
  deadline: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

/**
 * Filter state for job listings
 */
export interface Filters {
  department: string;
  type: string;
  search: string;
}

/**
 * Application form data
 */
export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  linkedin?: string;
  coverLetter?: string;
  resume: FileList;
}

/**
 * Form validation errors
 */
export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  position?: string;
  linkedin?: string;
  coverLetter?: string;
  resume?: string;
}

/**
 * Filter type for handleFilterChange function
 */
export type FilterType = keyof Filters;

/**
 * Submission status type
 */
export type SubmitStatus = "success" | "error" | null;

/**
 * API Response for job listings (for future use)
 */
export interface JobsApiResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
}

/**
 * API Response for application submission (for future use)
 */
export interface ApplicationSubmitResponse {
  success: boolean;
  message: string;
  applicationId?: string;
}
