import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await axios.post("http://localhost:8000/register", {
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        console.log("data sent to back");
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
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegisterForm;
