import React from "react";

//

// import sub component
import { TextLogo } from "../../components/TextLogo/TextLogo";
import { Copyright } from "../../components/Copyright/Copyright";
import { LoginForm } from "./LoginForm/LoginForm";

const LoginPage = (): JSX.Element => {
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
