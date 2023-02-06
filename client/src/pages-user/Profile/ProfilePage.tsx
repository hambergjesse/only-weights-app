import { Button } from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import { useNavigate } from "react-router-dom";

// import auth + user data context
import { useUserAuthContext } from "../../components/ContextProvider";

export const ProfilePage = (): JSX.Element => {
  const { setIsAuth } = useUserAuthContext();

  const navigate = useNavigate();

  // clear token in localstorage and navigate to landing page
  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate("/");
  };

  return (
    <main className="profilePage__wrapper">
      <div className="profilePage__container">
        <Button text="Sign Out" onClick={() => handleLogout()} />
      </div>
      <Navigation />
    </main>
  );
};
