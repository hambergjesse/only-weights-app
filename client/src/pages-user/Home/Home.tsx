import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

// import components
import Navigation from "../../components/Navigation/Navigation";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // check if jwt token present in local storage and send user to login screen if not
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    // get jwt token from local storage
    const token = localStorage.getItem("token");

    // fetch user-data with jwt token
    axios.get("http://localhost:8000/api/user-data", {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  return (
    <main className="homePage__wrapper">
      <div className="homePage__container"></div>
      <Navigation />
    </main>
  );
};

export default Home;