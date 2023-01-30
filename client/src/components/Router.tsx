// import react depencies
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// import page components
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Home from "../pages-user/Home/Home";

import api from "../services/api";

// import auth context
import { useUserAuthContext } from "./ContextProvider";
import { useUserDataContext } from "./ContextProvider";

const PageRouter: React.FC = () => {
  // user data context
  const { setUserData } = useUserDataContext();

  const { isAuth, setIsAuth } = useUserAuthContext();

  // get jwt token from local storage
  const token = localStorage.getItem("token");

  // fetch and set user-data with jwt token
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/user-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData({
          _id: res.data._id,
          email: res.data.email,
          password: res.data.password,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setUserData, token]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    }
    console.log("isAuth updated" + isAuth);
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
    </Routes>
  );
};

export default PageRouter;
