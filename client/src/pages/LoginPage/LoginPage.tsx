import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//

// import sub component
import { TextLogo } from "../../components/TextLogo/TextLogo";
import { Copyright } from "../../components/Copyright/Copyright";
import { LoginForm } from "./LoginForm/LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  });

  return (
    <main className="loginPage__wrapper">
      <div className="loginPage__container">
        <TextLogo />
        <LoginForm />
        <Copyright />
      </div>
    </main>
  );
};

export default LoginPage;
