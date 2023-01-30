// import react dependencies
import { useState } from "react";

// import react dependencies
import { useNavigate } from "react-router-dom";

// import api
import api from "../../../services/api";

// import context for session/router auth + data
import { useUserAuthContext } from "../../../components/ContextProvider";

const LoginForm = () => {
  // user auth context
  const { setIsAuth } = useUserAuthContext();

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

      // if no token => login page || if token => home page
      if (!localStorage.getItem("token")) {
        setIsAuth(false);
        navigate("/");
      }

      try {
        // enable auth for protected routes
        setIsAuth(true);

        // send user to home page
        navigate("/home");
      } catch (error) {
        console.log("user-data fetch and set func no worky");
      }
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
