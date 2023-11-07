import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { state } = useContext(AuthContext);

  if (state.isAuthenticated) {
    if (!role || role === state.role) return <>{children}</>;
    else return <Navigate to="/error" replace />;
  } else return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
