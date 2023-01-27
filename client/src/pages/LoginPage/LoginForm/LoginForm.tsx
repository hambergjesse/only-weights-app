// import react dependencies
import React from "react";

// import react dependencies
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

// import api
import api from "../../../services/api";

// import context for userId storage
import { UserIdContext } from "../../../components/UserContextProvider";

// import context for session/router auth
import { UserAuthContext } from "../../../components/UserContextProvider";

const LoginForm = () => {
  // user index/id context
  const { userId, setUserId }: any = useContext(UserIdContext);

  const { setIsAuth }: any = useContext(UserAuthContext);

  // form input states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      // send token to localstorage
      localStorage.setItem("token", response.data.token);

      // store userId in context to be used "globally"
      // setUserId(response.data.userId);

      // if no token => login page || if token => home page
      if (!localStorage.getItem("token")) {
        return setIsAuth(false) && navigate("/");
      }

      return setIsAuth(true) && navigate("/home");

      // redirect the user to the dashboard or some other protected route
    } catch (err: any) {
      setError(err.response.data.message);
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
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
