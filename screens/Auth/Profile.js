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
import { Button } from "react-native";
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
            <View style={tw`mt-20 h-full flex flex-col gap-5`}>
              <Button
                title="Voir mes reservations"
                onPress={() =>
                  navigation.navigate("BookingListing", {
                    id: user.details._id,
                  })
                }
              />
              <Button
                title="Voir mes achats"
                onPress={() =>
                  navigation.navigate("PurchasedProducts", {
                    id: user.details._id,
                  })
                }
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
