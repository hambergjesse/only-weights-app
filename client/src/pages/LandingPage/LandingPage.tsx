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
    <main className="landingPage__wrapper">
      <div className="landingPage__container">
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          CONTINUE
        </button>
      </div>
    </main>
  );
};

export default LandingPage;
