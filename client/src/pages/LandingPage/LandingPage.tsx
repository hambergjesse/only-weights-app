import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  });

  return (
    <div className="landingPage__wrapper">
      <div className="landingPage__container">
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
