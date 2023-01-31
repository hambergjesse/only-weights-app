import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "../../components/Button/Button";

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
        <h1>ONLYWEIGHTS IS THE ONLY FITNESS APP YOU WILL EVER NEED.</h1>
        <Button text="CONTINUE" onClick={() => navigate("/login")} />
      </div>
    </main>
  );
};

export default LandingPage;
