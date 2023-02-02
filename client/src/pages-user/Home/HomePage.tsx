import { useUserDataContext } from "../../components/ContextProvider";

// import components
import Navigation from "../../components/Navigation/Navigation";
import { TextLogo } from "../../components/TextLogo/TextLogo";
import { Copyright } from "../../components/Copyright/Copyright";

// import necessary hooks/functions
import useFetchUserData from "../../services/fetchUserData";

const Home = () => {
  const { userData } = useUserDataContext();

  // fetch user-data
  useFetchUserData();

  return (
    <main className="homePage__wrapper">
      <div className="homePage__container">
        <TextLogo />
        <section className="homePage__userStats">
          <div className="homePage__userStats--text">
            {<h1>Hey, {userData.name}</h1>}
            <p>Check out your progress.</p>
          </div>
          <div className="homePage__userStats--displays">
            <div className="homePage__userStats--display-left">
              <h2>00</h2>
              <p>
                Completed <br />
                Workouts
              </p>
            </div>
            <div className="homePage__userStats--display-right">
              <div className="homePage__userStats--display-right-child"></div>
              <div className="homePage__userStats--display-right-child"></div>
            </div>
          </div>
        </section>
        <Copyright />
      </div>
      <Navigation />
    </main>
  );
};

export default Home;
