import { TextLogo } from "../../components/TextLogo/TextLogo";
import { Copyright } from "../../components/Copyright/Copyright";
import { RegisterForm } from "./RegisterForm/RegisterForm";

const RegisterPage = (): JSX.Element => {
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
