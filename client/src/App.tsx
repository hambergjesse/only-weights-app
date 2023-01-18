import React, { useState, useEffect } from "react";
import axios from "axios";

interface Data {
  id: string;
  name: string;
}

const App = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    axios
      .get<Data[]>("http://localhost:8000/api")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app__wrapper">
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default App;
