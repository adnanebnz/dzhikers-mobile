import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
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
        <View style={tw`bg-white p-6`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Image
                source={{
                  uri: currentUser.details.img,
                }}
                style={tw`w-12 h-12 rounded-full mr-4`}
              />
              <View>
                <Text style={tw`text-lg font-medium`}>
                  {currentUser.details.lastName} {currentUser.details.firstName}
                </Text>
                <Text style={tw`text-gray-500`}>
                  {currentUser.details.email}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={tw`rounded-full bg-gray-200 p-2`}>
              <Ionicons name="pencil-outline" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={tw`mt-6`}>
            <Text style={tw`text-lg font-medium mb-2`}>Informations</Text>
            <Text style={tw`text-gray-500`}>
              <Text style={tw`font-bold`}>Age : </Text>
              {currentUser.details.age}
            </Text>
          </View>
          <View style={tw`mt-5 h-full`}>
            <Text style={tw`text-lg font-semibold text-center`}>
              Mes achats et réservations
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
