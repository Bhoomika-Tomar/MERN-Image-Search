import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  // While loading user, show nothing (avoid flash)
  if (user === undefined) return null;

  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
