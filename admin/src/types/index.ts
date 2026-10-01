// User and Authentication Types
export type UserRole =
  | "super_admin" // Full access to everything
  | "content_manager" // Manage content (stores, events, gallery, home page)
  | "inquiry_manager" // View and respond to inquiries only
  | "editor"; // Limited content editing

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export type Permission =
  | "home_page.edit"
  | "stores.view"
  | "stores.create"
  | "stores.edit"
  | "stores.delete"
  | "events.view"
  | "events.create"
  | "events.edit"
  | "events.delete"
  | "events.feature"
  | "gallery.view"
  | "gallery.upload"
  | "gallery.delete"
  | "gallery.set_home"
  | "inquiries.view"
  | "inquiries.respond"
  | "inquiries.delete"
  | "rental_spaces.view"
  | "rental_spaces.create"
  | "rental_spaces.edit"
  | "rental_spaces.delete"
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "settings.view"
  | "settings.edit"
  | "mall_map.view"
  | "mall_map.edit";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Home Page Content Types
export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  primaryCTA?: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
  isActive: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface BannerSection {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  buttonText?: string;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

export interface HomePageSettings {
  hero: HeroSection;
  banners: BannerSection[];
  featuredEventsMode: "newest" | "selected"; // Auto newest or manually selected
  galleryPhotosLimit: number; // How many photos to show
}

// Store Types (includes Dining, Entertainment, Hypermarket)
export type StoreType =
  | "store"
  | "restaurant"
  | "entertainment"
  | "hypermarket";

export interface Store {
  id: string;
  type: StoreType;
  name: string;
  category: string;
  floor: string;
  image: string;
  logo?: string;
  description?: string;
  openingHours?: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  startDate: string;
  endDate: string;
  location: string;
  images: string[];
  bannerImage?: string;
  category: string;
  isFeatured: boolean; // Checkbox: Add to Featured
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

// Gallery Types
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category:
    | "events"
    | "mall"
    | "stores"
    | "dining"
    | "entertainment"
    | "parking"
    | "hypermarket"
    | "fountain"
    | "shops"
    | "smarvy"
    | "restaurants";
  displayOnHomePage: boolean; // Checkbox: Display on Home Page
  uploadedAt: string;
  uploadedBy: string;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
}

// Inquiry Types
export type InquiryType =
  | "contact"
  | "rental"
  | "investment"
  | "job_application";
export type InquiryStatus = "new" | "read" | "responded" | "archived";

export interface BaseInquiry {
  id: string;
  type: InquiryType;
  status: InquiryStatus;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  respondedAt?: string;
  respondedBy?: string;
  response?: string;
  notes?: string;
}

export interface ContactInquiry extends BaseInquiry {
  type: "contact";
  subject: string;
}

export interface RentalInquiry extends BaseInquiry {
  type: "rental";
  businessType: string;
  spaceRequirements: string;
  preferredFloor?: string;
  proposedStartDate?: string;
}

export interface InvestmentInquiry extends BaseInquiry {
  type: "investment";
  investmentType: string;
  budget?: string;
  timeline?: string;
}

export interface JobApplication extends BaseInquiry {
  type: "job_application";
  position: string;
  experience: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export type Inquiry =
  | ContactInquiry
  | RentalInquiry
  | InvestmentInquiry
  | JobApplication;

// Mall Map Types
export interface FloorMap {
  id: string;
  floorNumber: string;
  floorName: string;
  mapImage: string;
  isActive: boolean;
  order: number;
  stores: {
    id: string;
    storeId: string;
    storeName: string;
    coordinates: { x: number; y: number }; // Position on map (percentage-based)
    width?: number;
    height?: number;
  }[];
  facilities: {
    id: string;
    type:
      | "restroom"
      | "elevator"
      | "escalator"
      | "stairs"
      | "parking"
      | "info"
      | "atm"
      | "emergency";
    label: string;
    coordinates: { x: number; y: number };
    icon?: string;
  }[];
  updatedAt: string;
  updatedBy: string;
}

// Settings Types
export interface MallSettings {
  id: string;
  mallName: string;
  tagline: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  operatingHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  footerText: string;
  emergencyMessage?: {
    isActive: boolean;
    message: string;
    type: "info" | "warning" | "critical";
  };
  updatedAt: string;
  updatedBy: string;
}

// Dashboard Stats
export interface DashboardStats {
  stores: {
    total: number;
    active: number;
    byType: Record<StoreType, number>;
  };
  events: {
    total: number;
    active: number;
    featured: number;
    upcoming: number;
  };
  gallery: {
    total: number;
    onHomePage: number;
    totalSize: string;
  };
  inquiries: {
    total: number;
    new: number;
    byType: Record<InquiryType, number>;
  };
  rentalSpaces: {
    total: number;
    occupied: number;
    vacant: number;
    maintenance: number;
    occupancyRate: number;
  };
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  user: string;
  timestamp: string;
  details?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface StoreFormData
  extends Omit<Store, "id" | "createdAt" | "updatedAt" | "updatedBy"> {
  imageFile?: File;
  logoFile?: File;
}

export interface EventFormData
  extends Omit<
    Event,
    "id" | "createdAt" | "updatedAt" | "updatedBy" | "images"
  > {
  imageFiles?: File[];
  existingImages?: string[];
}

export interface UserFormData
  extends Omit<User, "id" | "createdAt" | "lastLogin"> {
  password?: string;
}

// Rental Space Types
export type RentalSpaceStatus =
  | "occupied"
  | "vacant"
  | "maintenance"
  | "reserved";

export interface RentalSpace {
  id: string;
  spaceNumber: string; // e.g., "GF-101", "OUTDOOR-01"
  floor: string;
  area: number; // in square meters
  type:
    | "Retail"
    | "Food & Beverage"
    | "Entertainment"
    | "Storage"
    | "Kiosk"
    | "Office";
  status: RentalSpaceStatus;
  monthlyRent: number; // in SAR
  description?: string;
  features?: string[]; // e.g., ["High foot traffic", "Corner unit"]
  tenant?: {
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    leaseStartDate: string;
    leaseEndDate: string;
    contractDocument?: string;
  };
  isOnMap: boolean; // false for custom spaces added by admin
  mapCoordinates?: {
    x: number;
    y: number;
  };
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface RentalSpaceFormData
  extends Omit<RentalSpace, "id" | "createdAt" | "updatedAt" | "updatedBy"> {
  contractFile?: File;
}
