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
    <main className="loginPage__wrapper">
      <div className="loginPage__container">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
