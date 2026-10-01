import { UserRole, Permission } from "../types";

// Define permissions for each role
export const rolePermissions: Record<UserRole, Permission[]> = {
  super_admin: [
    // Full access to everything
    "home_page.edit",
    "stores.view",
    "stores.create",
    "stores.edit",
    "stores.delete",
    "events.view",
    "events.create",
    "events.edit",
    "events.delete",
    "events.feature",
    "gallery.view",
    "gallery.upload",
    "gallery.delete",
    "gallery.set_home",
    "inquiries.view",
    "inquiries.respond",
    "inquiries.delete",
    "rental_spaces.view",
    "rental_spaces.create",
    "rental_spaces.edit",
    "rental_spaces.delete",
    "users.view",
    "users.create",
    "users.edit",
    "users.delete",
    "settings.view",
    "settings.edit",
    "mall_map.view",
    "mall_map.edit",
  ],

  content_manager: [
    // Can manage all content but not users/settings
    "home_page.edit",
    "stores.view",
    "stores.create",
    "stores.edit",
    "stores.delete",
    "events.view",
    "events.create",
    "events.edit",
    "events.delete",
    "events.feature",
    "gallery.view",
    "gallery.upload",
    "gallery.delete",
    "gallery.set_home",
    "rental_spaces.view",
    "rental_spaces.create",
    "rental_spaces.edit",
    "rental_spaces.delete",
    "settings.view", // Can view but not edit
    "mall_map.view",
    "mall_map.edit",
  ],

  inquiry_manager: [
    // Can only view and respond to inquiries
    "inquiries.view",
    "inquiries.respond",
  ],

  editor: [
    // Can edit content but not delete or create
    "home_page.edit",
    "stores.view",
    "stores.edit",
    "events.view",
    "events.edit",
    "gallery.view",
    "gallery.upload",
  ],
};

// Helper function to check if user has specific permission
export const hasPermission = (
  userRole: UserRole,
  permission: Permission
): boolean => {
  return rolePermissions[userRole]?.includes(permission) ?? false;
};

// Helper function to check if user has any of the permissions
export const hasAnyPermission = (
  userRole: UserRole,
  permissions: Permission[]
): boolean => {
  return permissions.some((permission) => hasPermission(userRole, permission));
};

// Helper function to check if user has all permissions
export const hasAllPermissions = (
  userRole: UserRole,
  permissions: Permission[]
): boolean => {
  return permissions.every((permission) => hasPermission(userRole, permission));
};

// Navigation items with required permissions
export interface NavItem {
  path: string;
  label: string;
  icon: string;
  requiredPermissions: Permission[];
  children?: NavItem[];
}

export const navigationItems: NavItem[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: "Dashboard",
    requiredPermissions: [], // Everyone can see dashboard
  },
  {
    path: "/home-page",
    label: "Home Page",
    icon: "Home",
    requiredPermissions: ["home_page.edit"],
  },
  {
    path: "/stores",
    label: "Stores & Venues",
    icon: "Store",
    requiredPermissions: ["stores.view"],
    children: [
      {
        path: "/stores/retail",
        label: "Retail Stores",
        icon: "ShoppingBag",
        requiredPermissions: ["stores.view"],
      },
      {
        path: "/stores/dining",
        label: "Dining",
        icon: "Restaurant",
        requiredPermissions: ["stores.view"],
      },
      {
        path: "/stores/entertainment",
        label: "Entertainment",
        icon: "TheaterComedy",
        requiredPermissions: ["stores.view"],
      },
      {
        path: "/stores/hypermarket",
        label: "Hypermarket",
        icon: "ShoppingCart",
        requiredPermissions: ["stores.view"],
      },
    ],
  },
  {
    path: "/events",
    label: "Events",
    icon: "Event",
    requiredPermissions: ["events.view"],
  },
  {
    path: "/gallery",
    label: "Gallery",
    icon: "Photo",
    requiredPermissions: ["gallery.view"],
  },
  {
    path: "/mall-map",
    label: "Mall Map",
    icon: "Map",
    requiredPermissions: ["mall_map.view"],
  },
  {
    path: "/rental-spaces",
    label: "Rental Spaces",
    icon: "Business",
    requiredPermissions: ["rental_spaces.view"],
  },
  {
    path: "/inquiries",
    label: "Inquiries",
    icon: "Email",
    requiredPermissions: ["inquiries.view"],
    children: [
      {
        path: "/inquiries/contact",
        label: "Contact Forms",
        icon: "ContactMail",
        requiredPermissions: ["inquiries.view"],
      },
      {
        path: "/inquiries/rental",
        label: "Rental Requests",
        icon: "Business",
        requiredPermissions: ["inquiries.view"],
      },
      {
        path: "/inquiries/investment",
        label: "Investment Inquiries",
        icon: "AttachMoney",
        requiredPermissions: ["inquiries.view"],
      },
      {
        path: "/inquiries/jobs",
        label: "Job Applications",
        icon: "Work",
        requiredPermissions: ["inquiries.view"],
      },
    ],
  },
  {
    path: "/users",
    label: "Users",
    icon: "People",
    requiredPermissions: ["users.view"],
  },
  {
    path: "/settings",
    label: "Settings",
    icon: "Settings",
    requiredPermissions: ["settings.view"],
  },
];

// Filter navigation items based on user role
export const getAccessibleNavItems = (userRole: UserRole): NavItem[] => {
  return navigationItems
    .filter(
      (item) =>
        hasAnyPermission(userRole, item.requiredPermissions) ||
        item.requiredPermissions.length === 0
    )
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: item.children.filter((child) =>
            hasAnyPermission(userRole, child.requiredPermissions)
          ),
        };
      }
      return item;
    });
};

// Role display names
export const roleNames: Record<UserRole, string> = {
  super_admin: "Super Administrator",
  content_manager: "Content Manager",
  inquiry_manager: "Inquiry Manager",
  editor: "Editor",
};

// Role descriptions
export const roleDescriptions: Record<UserRole, string> = {
  super_admin:
    "Full system access including user management and system settings",
  content_manager:
    "Manage all website content including stores, events, and gallery",
  inquiry_manager: "View and respond to customer inquiries and applications",
  editor: "Edit existing content with limited permissions",
};
