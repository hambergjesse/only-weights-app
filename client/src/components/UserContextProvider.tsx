import React, { useState } from "react";

// import api
import api from "../services/api";

export const UserDataContext = React.createContext({});
export const UserAuthContext = React.createContext(false);
export const UserIdContext = React.createContext("");

const UserProvider = ({ children }: any) => {
  const [userData, setUserData] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");

  async function fetchUserData(id: object) {
    const response = await api.get(`/api/users/${id}`);
    setUserData(response.data);
  }

  return (
    <UserDataContext.Provider
      value={{ userData, fetchUserData, setIsAuth, isAuth, userId, setUserId }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserProvider;
