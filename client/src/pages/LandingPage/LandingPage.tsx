// import react dependencies
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import components
import { Button } from "../../components/Button/Button";
import { Copyright } from "../../components/Copyright/Copyright";
import { TextLogo } from "../../components/TextLogo/TextLogo";

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
        <TextLogo />
        <section className="landingPage__container--text">
          <h1>
            ONLYWEIGHTS IS THE <span>ONLY FITNESS APP</span> YOU WILL EVER NEED.
          </h1>
          <Button text="CONTINUE" onClick={() => navigate("/login")} />
        </section>
        <Copyright />
      </div>
    </main>
  );
};

export default LandingPage;
