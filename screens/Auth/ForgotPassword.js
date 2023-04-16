import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { makeRequest } from "../../makeRequest";

const ForgotPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const result = await makeRequest.get("token");
        setToken(result.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const handlePasswordReset = async () => {
    try {
      const res = await makeRequest.post(
        "/users/forgot-password",
        { password },
        { withCredentials: true }
      );
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <View>
      <Text>ForgotPassword</Text>
    </View>
  );
};

export default ForgotPassword;
