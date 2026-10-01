import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Permission } from "../types";
import { Box, CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
  requiredPermissions?: Permission[];
  requireAll?: boolean; // If true, user must have ALL permissions, otherwise ANY
}

export default function ProtectedRoute({
  requiredPermissions = [],
  requireAll = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading, hasPermission } = useAuth();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check permissions if required
  if (requiredPermissions.length > 0 && user) {
    const checkPermission = requireAll
      ? requiredPermissions.every((p) => hasPermission(p))
      : requiredPermissions.some((p) => hasPermission(p));

    if (!checkPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
}
