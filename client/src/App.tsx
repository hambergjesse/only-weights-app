// import page routing
import Router from "./components/Router";

// import user data context
import UserProvider from "./components/ContextProvider";

// import backgroundIMG
import { Background } from "./components/Background/Background";

const App = () => {
  return (
    <div className="app__wrapper">
      <UserProvider>
        <Router />
        <Background />
      </UserProvider>
    </div>
  );
};

export default App;
