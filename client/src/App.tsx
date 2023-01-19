import React /*, { useState, useEffect }*/ from "react";
// import axios from "axios";

// import page routing
import Router from "./components/Router";

// interface Data {
//   id: string;
//   name: string;
// }

const App = () => {
  // const [data, setData] = useState<Data[]>([]);

  // useEffect(() => {
  //   axios
  //     .get<Data[]>("http://localhost:8000/api")
  //     .then((res) => setData(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="app__wrapper">
      <Router />
    </div>
  );
};

export default App;
