// import page routing
import Router from "./components/Router";
import { useLocation } from "react-router-dom";

// import user data context
import UserProvider from "./components/ContextProvider";

// import backgroundIMG
import { Background } from "./components/Background/Background";

const App = () => {
  // location variable
  const location = useLocation();

  // shorten for cleanness
  const path = location.pathname;

  return (
    <div className="app__wrapper">
      <UserProvider>
        <Router />
        {/* Enable and disable background image for specific paths */}
        {path === "/" || path === "/home" ? <Background /> : <></>}
      </UserProvider>
    </div>
  );
};

export default App;
