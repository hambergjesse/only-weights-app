import React, { useState, useContext } from "react";

// import api
import api from "../services/api";

export const UserDataContext = React.createContext({});

// auth context
interface AuthContext {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: AuthContext = {
  isAuth: false,
  setIsAuth: () => {},
};

export const UserAuthContext = React.createContext(defaultState);

export const UserIdContext = React.createContext("");

const UserProvider = ({ children }: any) => {
  const [userData, setUserData] = useState({});
  const [isAuth, setIsAuth] = useState(defaultState.isAuth);
  const [userId, setUserId] = useState("");

  async function fetchUserData(id: object) {
    const response = await api.get(`/api/users/${id}`);
    setUserData(response.data);
  }

  return (
    <UserAuthContext.Provider value={{ isAuth, setIsAuth }}>
      <UserDataContext.Provider
        value={{
          userData,
          fetchUserData,
          setIsAuth,
          isAuth,
          userId,
          setUserId,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </UserAuthContext.Provider>
  );
};

export default UserProvider;

export const useUserDataContext = () => useContext(UserDataContext);
export const useUserAuthContext = () => useContext(UserAuthContext);
export const useUserIdContext = () => useContext(UserIdContext);
