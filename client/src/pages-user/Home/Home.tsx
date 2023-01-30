import { useUserDataContext } from "../../components/ContextProvider";

// import components
import Navigation from "../../components/Navigation/Navigation";

const Home = () => {
  const { userData } = useUserDataContext();

  return (
    <main className="homePage__wrapper">
      <div className="homePage__container">{<h1>{userData.email}</h1>}</div>
      <Navigation />
    </main>
  );
};

export default Home;
