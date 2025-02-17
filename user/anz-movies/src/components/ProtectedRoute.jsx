import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
