import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useFetchUser from "../../hooks/useFetchUser";
import { useState } from "react";
import { useEffect } from "react";
export default function Profile({ navigation }) {
  const { user, userLoading, error } = useFetchUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (userLoading === false) {
        setLoading(false);
      }
    }, 1000);
  }, [userLoading]);
  return (
    <SafeAreaView>
      {loading ? (
        <View style={tw`flex items-center justify-center h-full`}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View style={tw`flex-row items-center p-4`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
          </View>

          <View style={tw`bg-white p-3`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center`}>
                <Image
                  source={{
                    uri: user.details.img,
                  }}
                  style={tw`w-12 h-12 rounded-full mr-4`}
                />
                <View>
                  <Text style={tw`text-lg font-medium`}>
                    {user.details.lastName} {user.details.firstName}
                  </Text>
                  <Text style={tw`text-gray-500 text-[12px]`}>
                    {user.details.email}
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
                {user.details.age}
              </Text>
            </View>
            <View style={tw`mt-5 h-full`}>
              <Text style={tw`text-lg font-semibold text-center`}>
                Mes achats et réservations
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
