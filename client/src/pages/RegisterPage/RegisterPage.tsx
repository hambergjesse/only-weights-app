import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  });

  return (
    <div className="loginPage__wrapper">
      <div className="loginPage__container">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
