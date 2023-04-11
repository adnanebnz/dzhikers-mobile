import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { makeRequest } from "../../makeRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await makeRequest.post(
        "/users/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      await AsyncStorage.setItem("currentUser", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    navigation.navigate("Root");
  };

  return (
    <SafeAreaView>
      <View
        style={{
          ...tw`mt-38`,
        }}
      >
        <View style={tw`flex flex-row items-center justify-center gap-1`}>
          <Text style={tw`text-black text-xl font-bold`}>DZHIKERS</Text>
          <Image
            source={require("./../../assets/noback.png")}
            style={{
              width: 60,
              height: 60,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={tw`flex flex-col items-center justify-center gap-2`}>
          <TextInput
            style={{
              ...tw`border-2 border-gray-300 rounded-lg px-2 py-2`,
              width: "80%",
            }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{
              ...tw`border-2 border-gray-300 rounded-lg px-2 py-2`,
              width: "80%",
            }}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={{
              ...tw`bg-blue-500 rounded-lg px-2 py-2 mt-2`,
              width: "80%",
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                ...tw`text-white text-center font-bold text-lg`,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <View
          style={{
            ...tw`flex flex-row items-center justify-center mt-5`,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}
