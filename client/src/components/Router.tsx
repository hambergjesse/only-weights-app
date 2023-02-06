// import react depencies
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import api
import api from "../services/api";

// import page components
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages-user/Home/HomePage";

// import auth + user data context
import { useUserAuthContext } from "./ContextProvider";
import { NotesPage } from "../pages-user/Notes/NotesPage";
import { WorkoutPage } from "../pages-user/Workout/WorkoutPage";
import { ProfilePage } from "../pages-user/Profile/ProfilePage";
import { HelpPage } from "../pages-user/Help/HelpPage";

const PageRouter = (): JSX.Element => {
  const { isAuth, setIsAuth } = useUserAuthContext();

  // path change variable
  const navigate = useNavigate();

  // location variable
  const location = useLocation();

  // shorten for cleanness
  const path = location.pathname;

  // get token
  const token = localStorage.getItem("token");

  // check if token exists and enable auth accordingly
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get("/api/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.isValid) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    verifyToken();
  }, [token, path]);

  useEffect(() => {
    if (
      isAuth === true &&
      (path === "/" || path === "/login" || path === "/register")
    ) {
      navigate("/home");
    }
  }, [isAuth, path, navigate]);

  return (
    <Routes key={path} location={useLocation()}>
      {isAuth === false && (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </>
      )}
      {isAuth === true && (
        <>
          <Route path="/home" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
        </>
      )}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default PageRouter;
