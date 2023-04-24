import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { makeRequest } from "../../makeRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "react-native";
import { useEffect } from "react";
export default function Login({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    setTimeout(async () => {
      await AsyncStorage.getItem("expoPushToken").then((token) => {
        setToken(token);
      });
    }, 1000);
  }, []);
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await makeRequest.post(
        "/users/login",
        {
          email: email,
          password: password,
          hardwareToken: token,
        },
        {
          withCredentials: true,
        }
      );
      await AsyncStorage.setItem("currentUser", JSON.stringify(res.data));

      setError("");
      navigation.navigate("Root");
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          ...tw`mt-50`,
        }}
      >
        <View style={tw`flex flex-row items-center justify-center gap-1 mb-3`}>
          <Text style={tw`text-black text-2xl font-bold`}>DZHIKERS</Text>
          <Image
            source={require("./../../assets/noback.png")}
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={tw`flex flex-col items-center justify-center gap-2`}>
          <TextInput
            style={{
              ...tw`border-2 border-gray-300 rounded-lg px-2 py-3 text-lg`,
              width: "85%",
            }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{
              ...tw`border-2 border-gray-300 rounded-lg px-2 py-3 text-lg`,
              width: "85%",
            }}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={{
              ...tw`bg-blue-500 rounded-lg px-2 py-2 mt-3`,
              width: "85%",
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                ...tw`text-white text-center font-bold text-lg`,
              }}
            >
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...tw`flex flex-row items-center gap-4 justify-center mt-1`,
          }}
        >
          <TouchableOpacity
            style={{
              ...tw`mt-3`,
            }}
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            <Text
              style={{
                ...tw`text-center text-blue-500 font-bold`,
              }}
            >
              Mot de passe oublié?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tw`mt-3`,
            }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text
              style={{
                ...tw`text-center text-blue-500 font-bold`,
              }}
            >
              Vous n'avez pas de compte?
            </Text>
          </TouchableOpacity>
        </View>
        {error && (
          <View
            style={{
              ...tw`flex flex-row items-center justify-center mt-5`,
            }}
          >
            <Text
              style={{
                ...tw`text-red-500 font-bold`,
              }}
            >
              {error}
            </Text>
          </View>
        )}
      </ScrollView>
      {loading && (
        <View
          style={{
            ...tw`flex flex-row items-center justify-center mt-5`,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      <StatusBar animated={true} backgroundColor="#60a5fa" />
    </SafeAreaView>
  );
}
