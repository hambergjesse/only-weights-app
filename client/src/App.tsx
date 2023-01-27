// import page routing
import Router from "./components/Router";

// import user data context
import UserProvider from "./components/UserContextProvider";

const App = () => {
  return (
    <div className="app__wrapper">
      <UserProvider>
        <Router />
      </UserProvider>
    </div>
  );
};

export default App;
