import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Loading } from "./components/Loading";
import { Home } from "./pages/Home";
import { Login } from "./pages/login/Login";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SignUp } from "./pages/signup/SignUp";
import { ProtectedRouteAfterLogin } from "./components/ProtectedRouteAfterLogin";
import { WatchLater } from "./pages/WatchLater";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [location]);
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <Loading />
          ) : (
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/watchlater" element={<WatchLater />} />
              </Route>
              <Route element={<ProtectedRouteAfterLogin />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
