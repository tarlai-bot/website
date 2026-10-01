import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import logger from "../utils/logger";

// User type for mall website visitors
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone: string) => Promise<void>;
  logout: () => void;
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
      const token = localStorage.getItem("user_token");
      const userStr = localStorage.getItem("user_data");

      if (token && userStr) {
        try {
          const user: User = JSON.parse(userStr);
          // TODO: Validate token with API when backend is ready
          setAuthState({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          localStorage.removeItem("user_token");
          localStorage.removeItem("user_data");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, _password: string) => {
    try {
      // MOCK LOGIN - Replace with actual API call when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Replace with real API call
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Invalid credentials");
      // }
      //
      // const data = await response.json();

      // Mock successful login - password not validated in mock
      logger.info("Mock login with:", { email, password: "***" });

      // Mock successful login
      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        name: "Test User",
        phone: "+966 50 123 4567",
        createdAt: new Date().toISOString(),
      };

      const token = "mock-jwt-token-" + Date.now();

      localStorage.setItem("user_token", token);
      localStorage.setItem("user_data", JSON.stringify(mockUser));

      setAuthState({
        user: mockUser,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      logger.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (
    email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _password: string,
    name: string,
    phone: string
  ) => {
    try {
      // MOCK SIGNUP - Replace with actual API call when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Replace with real API call
      // const response = await fetch("/api/auth/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password, name, phone }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Signup failed");
      // }
      //
      // const data = await response.json();

      // Mock successful signup - password not validated in mock
      logger.info("Mock signup with:", { email, password: "***", name, phone });

      // Mock successful signup
      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        name,
        phone,
        createdAt: new Date().toISOString(),
      };

      const token = "mock-jwt-token-" + Date.now();

      localStorage.setItem("user_token", token);
      localStorage.setItem("user_data", JSON.stringify(mockUser));

      setAuthState({
        user: mockUser,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      logger.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
