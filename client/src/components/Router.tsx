// import react depencies
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// import page components
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Home from "../pages-user/Home/Home";

// import auth context
import { useUserAuthContext } from "./ContextProvider";

const PageRouter: React.FC = () => {
  const { isAuth } = useUserAuthContext();

  useEffect(() => {
    console.log("isAuth updated" + isAuth);
  }, [isAuth]);

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
    </Routes>
  );
};

export default PageRouter;
