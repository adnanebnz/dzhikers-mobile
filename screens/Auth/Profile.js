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
import { makeRequest } from "../../makeRequest";
export default function Profile({ navigation }) {
  const { user, userLoading, error } = useFetchUser();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (userLoading === false) {
        setLoading(false);
      }
    }, 1000);
  }, [userLoading]);
  useEffect(() => {
    const fetchReservations = () => {
      try {
        setTimeout(async () => {
          const res = await makeRequest.get(
            `/reservations/${user.details._id}`,
            {
              withCredentials: true,
            }
          );
          setReservations(res.data);
        }, 100);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReservations();
  }, []);
  console.log(reservations);
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
            <View
              style={tw`flex flex-row flex-wrap justify-center items-center`}
            >
              {reservations.map((reservation) => (
                <View style={tw`m-2  rounded-xl`} key={reservation._id}>
                  <View style={tw`flex flex-row justify-between items-center`}>
                    <Text style={tw`font-bold text-lg ml-2`}>
                      {reservation.title}
                    </Text>
                    <View style={tw`rounded-full bg-gray-200 p-2 mr-2`}>
                      <Ionicons name="pencil-outline" size={24} color="gray" />
                    </View>
                  </View>

                  <View style={tw`flex flex-row justify-between items-center`}>
                    <Text style={tw`font-bold text-lg ml-2`}>
                      {reservation.date}
                    </Text>
                    <Text style={tw`font-bold text-lg mr-2`}>
                      {reservation.price} DZD
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
