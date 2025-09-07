import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  // 🔑 Check if user is logged in (context + localStorage backup)
  const storedUser = localStorage.getItem("user");
  const authUser = user || (storedUser ? JSON.parse(storedUser) : null);

  if (!authUser) {
    // User not logged in → redirect to login
    return <Navigate to="/auth" replace />;
  }

  if (authUser.role !== allowedRole) {
    // User logged in but role mismatch → send back to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
