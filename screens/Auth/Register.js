import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { makeRequest } from "../../makeRequest";
import { ActivityIndicator } from "react-native";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    setLoading(true);
    try {
      await makeRequest.post("/users/register", {
        email: email,
        password: password,
        username: userName,
        firstName: firstName,
        lastName: lastName,
        age: age,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    navigation.navigate("Login");
  };
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          {loading ? (
            <View
              style={{
                ...tw`flex h-full items-center justify-center`,
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <>
              <View
                style={{
                  ...tw`mt-5`,
                }}
              >
                <View
                  style={tw`flex flex-row items-center justify-center gap-1 mb-3`}
                >
                  <Text style={tw`text-black text-2xl font-bold`}>
                    DZHIKERS
                  </Text>
                  <Image
                    source={require("./../../assets/noback.png")}
                    style={{
                      width: 70,
                      height: 70,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View
                  style={tw`flex flex-col items-center justify-center gap-2`}
                >
                  <TextInput
                    style={{
                      ...tw`border-2 border-gray-300 rounded-lg px-2 py-3 text-lg`,
                      width: "85%",
                    }}
                    placeholder="Nom *"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                  />
                  <TextInput
                    style={{
                      ...tw`border-2 border-gray-300 rounded-lg px-2 py-3 text-lg`,
                      width: "85%",
                    }}
                    placeholder="Prénom *"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                  />
                  <TextInput
                    style={{
                      ...tw`border-2 border-gray-300 rounded-lg px-2 py-3 text-lg`,
                      width: "85%",
                    }}
                    placeholder="Nom d'utilisateur *"
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                  />
                  <TextInput
                    style={{
                      ...tw`border-2 border-gray-300 rounded-lg px-2 py-3 text-lg`,
                      width: "85%",
                    }}
                    placeholder="Age *"
                    value={age}
                    keyboardType="numeric"
                    onChangeText={(text) => setAge(text)}
                  />
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
                    onPress={handleRegister}
                  >
                    <Text
                      style={{
                        ...tw`text-white text-center font-bold text-lg`,
                      }}
                    >
                      Créer un compte
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    ...tw`mt-1`,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      ...tw`mt-3`,
                    }}
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <Text
                      style={{
                        ...tw`text-center text-blue-500 font-bold`,
                      }}
                    >
                      Vous avez déja un compte? Connectez-vous
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
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
