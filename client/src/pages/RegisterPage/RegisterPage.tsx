import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TextLogo } from "../../components/TextLogo/TextLogo";
import { Copyright } from "../../components/Copyright/Copyright";
import { RegisterForm } from "./RegisterForm/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  });

  return (
    <div className="registerPage__wrapper">
      <div className="registerPage__container">
        <TextLogo />
        <RegisterForm />
        <Copyright />
      </div>
    </div>
  );
};

export default RegisterPage;
