import React, { type ReactNode } from "react";
import { useAuth } from "../auth/AuthContext.js";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  role: "admin" | "user";
}

function PrivateRoute({ children, role }: PrivateRouteProps): ReactNode {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
