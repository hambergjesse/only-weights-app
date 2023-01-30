import { useUserDataContext } from "../../components/ContextProvider";

// import components
import Navigation from "../../components/Navigation/Navigation";

// import necessary hooks/functions
import useFetchUserData from "../../services/fetchUserData";

const Home = () => {
  const { userData } = useUserDataContext();

  // fetch user-data
  useFetchUserData();

  return (
    <main className="homePage__wrapper">
      <div className="homePage__container">{<h1>{userData.email}</h1>}</div>
      <Navigation />
    </main>
  );
};

export default Home;
