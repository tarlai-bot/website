import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import StoresList from "./pages/Stores/StoresList";
import StoreForm from "./pages/Stores/StoreForm";
import EventsList from "./pages/Events/EventsList";
import EventForm from "./pages/Events/EventForm";
import Gallery from "./pages/Gallery";
import MallMap from "./pages/MallMap";
import InquiriesList from "./pages/Inquiries/InquiriesList";
import RentalSpacesList from "./pages/RentalSpaces/RentalSpacesList";
import UsersList from "./pages/Users/UsersList";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";

// Layout
import DashboardLayout from "./components/Layout/DashboardLayout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#44273a", // Alamer Mall primary color
      dark: "#331d2b",
      light: "#6b4566",
    },
    secondary: {
      main: "#ef7622",
      dark: "#d66819",
      light: "#f28e45",
    },
    success: {
      main: "#10b981",
    },
    warning: {
      main: "#f59e0b",
    },
    error: {
      main: "#ef4444",
    },
    info: {
      main: "#3b82f6",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"ejeAlamer", system-ui, -apple-system, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Home Page Management */}
                <Route
                  path="/home-page"
                  element={
                    <ProtectedRoute requiredPermissions={["home_page.edit"]} />
                  }
                >
                  <Route index element={<HomePage />} />
                </Route>

                {/* Stores Management */}
                <Route
                  path="/stores"
                  element={
                    <ProtectedRoute requiredPermissions={["stores.view"]} />
                  }
                >
                  <Route
                    index
                    element={<Navigate to="/stores/retail" replace />}
                  />
                  <Route path="retail" element={<StoresList type="store" />} />
                  <Route
                    path="dining"
                    element={<StoresList type="restaurant" />}
                  />
                  <Route
                    path="entertainment"
                    element={<StoresList type="entertainment" />}
                  />
                  <Route
                    path="hypermarket"
                    element={<StoresList type="hypermarket" />}
                  />
                  <Route path=":type/new" element={<StoreForm />} />
                  <Route path=":type/:id/edit" element={<StoreForm />} />
                </Route>

                {/* Events Management */}
                <Route
                  path="/events"
                  element={
                    <ProtectedRoute requiredPermissions={["events.view"]} />
                  }
                >
                  <Route index element={<EventsList />} />
                  <Route path="new" element={<EventForm />} />
                  <Route path=":id/edit" element={<EventForm />} />
                </Route>

                {/* Gallery Management */}
                <Route
                  path="/gallery"
                  element={
                    <ProtectedRoute requiredPermissions={["gallery.view"]} />
                  }
                >
                  <Route index element={<Gallery />} />
                </Route>

                {/* Mall Map Management */}
                <Route
                  path="/mall-map"
                  element={
                    <ProtectedRoute requiredPermissions={["mall_map.view"]} />
                  }
                >
                  <Route index element={<MallMap />} />
                </Route>

                {/* Inquiries Management */}
                <Route
                  path="/inquiries"
                  element={
                    <ProtectedRoute requiredPermissions={["inquiries.view"]} />
                  }
                >
                  <Route
                    index
                    element={<Navigate to="/inquiries/contact" replace />}
                  />
                  <Route
                    path="contact"
                    element={<InquiriesList type="contact" />}
                  />
                  <Route
                    path="rental"
                    element={<InquiriesList type="rental" />}
                  />
                  <Route
                    path="investment"
                    element={<InquiriesList type="investment" />}
                  />
                  <Route
                    path="jobs"
                    element={<InquiriesList type="job_application" />}
                  />
                </Route>

                {/* Rental Spaces Management */}
                <Route
                  path="/rental-spaces"
                  element={
                    <ProtectedRoute
                      requiredPermissions={["rental_spaces.view"]}
                    />
                  }
                >
                  <Route index element={<RentalSpacesList />} />
                </Route>

                {/* Users Management */}
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute requiredPermissions={["users.view"]} />
                  }
                >
                  <Route index element={<UsersList />} />
                </Route>

                {/* Settings */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute requiredPermissions={["settings.view"]} />
                  }
                >
                  <Route index element={<Settings />} />
                </Route>
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
