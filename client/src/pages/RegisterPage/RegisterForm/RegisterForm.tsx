import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import api
import api from "../../../services/api";

// import subcomponents
import { Button } from "../../../components/Button/Button";

export const RegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // check if passwords match and then continue
    if (password === confirmPassword) {
      try {
        const response = await api.post("/register", {
          email,
          password,
        });

        // put token in local storage
        localStorage.setItem("token", response.data.token);

        // check if local storage has the token and redirect to login
        if (localStorage.getItem("token")) {
          navigate("/login");
        }

        // redirect the user to the dashboard or some other protected route
      } catch (err: any) {
        setError(err.response.data.message);
        console.log("data error");
      }
    } else {
      setError("Passwords do not match, please try again.");
    }
  };

  return (
    <section className="registerForm__container">
      <h1>REGISTER</h1>
      <p>Create your OnlyWeights account</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button text="Register" type="submit" />
        {error && <p className="error-text">{error}</p>}
      </form>
      <p>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </section>
  );
};
