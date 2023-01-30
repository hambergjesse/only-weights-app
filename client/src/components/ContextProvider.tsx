import React, { useState, useContext } from "react";

// data context

export interface UserData {
  _id: string;
  email: string;
  password: string;
}

export interface DataContext {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const dataDefault: DataContext = {
  userData: {
    _id: "",
    email: "",
    password: "",
  },
  setUserData: () => {},
};

export const UserDataContext = React.createContext(dataDefault);

// auth context
interface AuthContext {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const authDefault: AuthContext = {
  isAuth: false,
  setIsAuth: () => {},
};

export const UserAuthContext = React.createContext(authDefault);

const UserProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<UserData>(dataDefault.userData);
  const [isAuth, setIsAuth] = useState(authDefault.isAuth);

  return (
    <UserAuthContext.Provider value={{ isAuth, setIsAuth }}>
      <UserDataContext.Provider
        value={{
          userData,
          setUserData,
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
