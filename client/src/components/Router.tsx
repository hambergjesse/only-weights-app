// import react depencies
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// import page components
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Home from "../pages-user/Home/HomePage";

// import auth + user data context
import { useUserAuthContext } from "./ContextProvider";

const PageRouter: React.FC = () => {
  const { isAuth, setIsAuth } = useUserAuthContext();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      return setIsAuth(true);
    }
    return setIsAuth(false);
  }, [isAuth, setIsAuth]);

  return (
    <Routes key={useLocation().pathname} location={useLocation()}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {isAuth === true ? (
        <Route path="/home" element={<Home />} />
      ) : (
        <Route path="/" element={<LandingPage />} />
      )}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default PageRouter;
