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
        <View style={tw`flex items-center justify-center`}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View style={tw`p-3`}>
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
                  <Text style={tw`text-gray-500 text-[12px]`}>
                    {user.details.age} ans
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={tw`rounded-full bg-gray-200 p-2`}>
                <Ionicons name="pencil-outline" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <View style={tw`mt-10 h-full flex flex-col gap-5`}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BookingListing", {
                    id: user.details._id,
                  })
                }
              >
                <View>
                  <Image
                    source={require("../../assets/hikers.jpg")}
                    style={{
                      width: "100%",
                      height: 180,
                      opacity: 0.8,
                      shadowColor: "#000",
                      resizeMode: "cover",
                      zIndex: 0,
                      borderRadius: 15,
                    }}
                  />
                  <Text
                    style={tw`text-white text-2xl font-bold
                  absolute bottom-0 p-3
                  `}
                  >
                    Mes réservations
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PurchasedProducts", {
                    id: user.details._id,
                  })
                }
              >
                <View>
                  <Image
                    source={require("../../assets/camping.jpg")}
                    style={{
                      width: "100%",
                      height: 180,
                      opacity: 0.8,
                      shadowColor: "#000",
                      resizeMode: "cover",
                      zIndex: 0,
                      borderRadius: 15,
                    }}
                  />
                  <Text
                    style={tw`text-white text-2xl font-bold
                  absolute bottom-0 p-3
                  `}
                  >
                    Mes achats
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
