import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteAfterLogin = () => {
  const { auth } = useAuth();

  if (auth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
