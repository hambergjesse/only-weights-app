import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import sub component
import LoginForm from "./LoginForm/LoginForm";

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
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
