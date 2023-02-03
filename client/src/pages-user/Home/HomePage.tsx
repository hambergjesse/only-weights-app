// import context
import { useUserDataContext } from "../../components/ContextProvider";

// import components
import Navigation from "../../components/Navigation/Navigation";
import { TextLogo } from "../../components/TextLogo/TextLogo";
import { Copyright } from "../../components/Copyright/Copyright";
import { UserStats } from "./UserStats";

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
        <Copyright />
      </div>
      <Navigation />
    </main>
  );
};

export default HomePage;
