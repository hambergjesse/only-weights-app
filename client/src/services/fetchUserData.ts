import { useUserDataContext } from "../components/ContextProvider";
import { useEffect } from "react";
import api from "./api";

interface UserData {
	email: string;
	name: string;
}

const useFetchUserData = () => {
	// context that stores userdata
	const { setUserData } = useUserDataContext();

	// get token
	const token = localStorage.getItem("token");

	useEffect(() => {
		// fetch userdata based on existing token
		const fetchData = async () => {
			try {
				const res = await api.get<UserData>("/api/user-data", {
					headers: { Authorization: `Bearer ${token}` },
				});
				// set received data into the UserDataContext to be used "globally"
				setUserData({
					email: res.data.email,
					name: res.data.name,
				});
			} catch (err) {
				console.error(err);
			}
		};

		// run the function
		fetchData();
	}, [setUserData, token]);
};

export default useFetchUserData;
