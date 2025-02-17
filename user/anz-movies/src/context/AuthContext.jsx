import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const USER_URL = import.meta.env.VITE_USER_URL;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check authentication status when app loads
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${USER_URL}/me`, {
        withCredentials: true, // Ensure cookies are included
      });

      setAuth(response.data);
    } catch (error) {
      console.error(
        "Authentication check failed:",
        error.response?.data?.message
      );
      setAuth(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const signup = async (username, password) => {
    const response = await axios(`${USER_URL}/signup`, {
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    });

    return response.data;
  };

  const login = async (username, password) => {
    try {
      await axios.post(
        `${USER_URL}/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      await checkAuthStatus(); // Ensure state updates AFTER login
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        handleChange,
        signup,
        login,
        setAuth,
        logout,
        auth,
        setIsSubmitting,
        isSubmitting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
