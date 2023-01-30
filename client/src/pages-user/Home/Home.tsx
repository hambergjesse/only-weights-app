import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserDataContext } from "../../components/ContextProvider";
import axios from "axios";

// import components
import Navigation from "../../components/Navigation/Navigation";

const Home = () => {
  const { userData, fetchUserData }: any = useContext(UserDataContext);

  useEffect(() => {
    fetchUserData(1);
  }, []);

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
      <div className="homePage__container">
        <h1>{userData.email}</h1>
      </div>
      <Navigation />
    </main>
  );
};

export default Home;
