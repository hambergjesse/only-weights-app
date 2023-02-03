// import context
import { useUserDataContext } from "../../components/ContextProvider";

// import components
import Navigation from "../../components/Navigation/Navigation";
import { TextLogo } from "../../components/TextLogo/TextLogo";
import { Copyright } from "../../components/Copyright/Copyright";
import { UserStats } from "./UserStats";
import { YourWorkouts } from "./YourWorkouts";
import { TrendingWorkouts } from "./TrendingWorkouts";

// import necessary hooks/functions
import useFetchUserData from "../../services/fetchUserData";

const HomePage = (): JSX.Element => {
  const { userData } = useUserDataContext();

  // fetch user-data
  useFetchUserData();

  return (
    <main className="homePage__wrapper">
      <div className="homePage__container">
        <TextLogo />
        <UserStats name={userData.name} />
        <YourWorkouts />
        <TrendingWorkouts />
        <Copyright />
      </div>
      <Navigation />
    </main>
  );
};

export default HomePage;
