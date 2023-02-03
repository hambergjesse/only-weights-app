// import react depencies
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// import page components
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages-user/Home/HomePage";

// import auth + user data context
import { useUserAuthContext } from "./ContextProvider";
import { NotesPage } from "../pages-user/Notes/NotesPage";
import { StorePage } from "../pages-user/Store/StorePage";
import { ProfilePage } from "../pages-user/Profile/ProfilePage";
import { HelpPage } from "../pages-user/Help/HelpPage";

const PageRouter = (): JSX.Element => {
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
        <>
          <Route path="/home" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpPage />} />
        </>
      ) : (
        <Route path="/" element={<LandingPage />} />
      )}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default PageRouter;
