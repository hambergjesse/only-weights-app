import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const verifyAuth = () => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  };

  return (
    <div className="loginPage__wrapper">
      <div className="loginPage__container">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
