// import page routing
import Router from "./components/Router";
import { useLocation } from "react-router-dom";

// import user data context
import UserProvider from "./components/ContextProvider";

// import backgroundIMG
import { Background } from "./components/Background/Background";

const App = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="app__wrapper">
      <UserProvider>
        <Router />
        {path === "/" || path === "/home" ? <Background /> : <></>}
      </UserProvider>
    </div>
  );
};

export default App;
