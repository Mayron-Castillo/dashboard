import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;

  return children;
}

export default PrivateRoute;
