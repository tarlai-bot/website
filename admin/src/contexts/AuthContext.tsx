import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthState } from "../types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      const userStr = localStorage.getItem("admin_user");

      if (token && userStr) {
        try {
          const user: User = JSON.parse(userStr);
          // TODO: Validate token with API
          setAuthState({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // MOCK LOGIN - Replace with actual API call when backend is ready
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock users for development
      const mockUsers: Record<
        string,
        { password: string; user: Omit<User, "password"> }
      > = {
        "admin@alamericmall.com": {
          password: "admin123",
          user: {
            id: "1",
            email: "admin@alamericmall.com",
            name: "Super Admin",
            role: "super_admin",
            permissions: [
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
            createdAt: new Date().toISOString(),
            isActive: true,
          },
        },
        "content@alamericmall.com": {
          password: "content123",
          user: {
            id: "2",
            email: "content@alamericmall.com",
            name: "Content Manager",
            role: "content_manager",
            permissions: [
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
              "settings.view",
              "mall_map.view",
              "mall_map.edit",
            ],
            createdAt: new Date().toISOString(),
            isActive: true,
          },
        },
        "inquiry@alamericmall.com": {
          password: "inquiry123",
          user: {
            id: "3",
            email: "inquiry@alamericmall.com",
            name: "Inquiry Manager",
            role: "inquiry_manager",
            permissions: ["inquiries.view", "inquiries.respond"],
            createdAt: new Date().toISOString(),
            isActive: true,
          },
        },
      };

      const userRecord = mockUsers[email];
      if (!userRecord || userRecord.password !== password) {
        throw new Error("Invalid email or password");
      }

      const token = "mock-jwt-token-" + Date.now();
      const user = userRecord.user;

      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_user", JSON.stringify(user));

      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });

      /* TODO: Replace mock login with real API call
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const { user, token } = data;

      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_user", JSON.stringify(user));

      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
      */
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const hasPermission = (permission: string): boolean => {
    if (!authState.user) return false;
    return authState.user.permissions.includes(permission as any);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        hasPermission,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
