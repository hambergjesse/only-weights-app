import { Routes, Route, useLocation } from "react-router-dom";

// import page components
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";

const PageRouter: React.FC = () => {
  let location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
};

export default PageRouter;
