import { View, Text, ActivityIndicator, Image } from "react-native";
import tw from "twrnc";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await AsyncStorage.getItem("currentUser");
      setCurrentUser(JSON.parse(user));
    };
    setLoading(false);
    getCurrentUser();
  }, []);
  return (
    <SafeAreaView>
      {loading && (
        <View style={tw`flex items-center justify-center h-full`}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!loading && (
        <View>
          {currentUser && (
            <View style={tw`flex items-center flex-col gap-2`}>
              <Image
                source={{ uri: currentUser.details.img }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  resizeMode: "cover",
                }}
              />
              <Text
                style={{
                  ...tw`text-md font-bold text-gray-700`,
                }}
              >
                @{currentUser.details.username}
              </Text>
              <Text
                style={{
                  ...tw`text-md text-gray-700`,
                }}
              >
                {currentUser.details.lastName} {currentUser.details.firstName}
              </Text>
              <Text>{currentUser.details.email}</Text>
              <Text>{currentUser.details.age}</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
