/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useContext } from "react";

// data context
interface Exercise {
	exName: string;
	reps: number;
	sets: number;
	notes: string;
}

interface Workout {
	title: string;
	exercises: Exercise[];
}

export interface UserData {
	email: string;
	name: string;
	workouts: Workout[];
}

export interface DataContext {
	userData: UserData;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const dataDefault: DataContext = {
	userData: {
		email: "",
		name: "",
		workouts: [],
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

interface Children {
	children: React.ReactNode;
}

const UserProvider = ({ children }: Children): JSX.Element => {
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
