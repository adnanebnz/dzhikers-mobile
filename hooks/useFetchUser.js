import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const user = await AsyncStorage.getItem("currentUser");
        setUser(JSON.parse(user));
      } catch (err) {
        setError(true);
      }
      setTimeout(() => {
        setUserLoading(false);
      }, 2000);
    };
    fetchUser();
  }, []);

  return { user, userLoading, error };
};

export default useFetchUser;
