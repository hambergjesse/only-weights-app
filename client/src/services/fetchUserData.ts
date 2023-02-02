import { useEffect } from "react";
import { useUserDataContext } from "../components/ContextProvider";
import api from "./api";

const useFetchUserData = () => {
  const { setUserData } = useUserDataContext();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/user-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData({
          _id: res.data._id,
          email: res.data.email,
          name: res.data.name,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [setUserData, token]);
};

export default useFetchUserData;
