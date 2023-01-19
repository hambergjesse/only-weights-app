import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";

const PageRouter: React.FC = () => {
  let location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
};

export default PageRouter;
