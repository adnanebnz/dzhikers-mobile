import {
  Text,
  ActivityIndicator,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { makeRequest } from "../../makeRequest";
import tw from "twrnc";
import moment from "moment/moment";
import { IconButton, Icon, Center, NativeBaseProvider } from "native-base";
export default function Details({ route, navigation }) {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPin = async () => {
      try {
        const result = await makeRequest.get(`/pins/${id}`);
        setData(result.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchPin();
  }, []);
  const handleBooking = async () => {
    try {
      const res = await makeRequest.post(
        `/reservations/${id}/register`,
        {
          hikeId: id,
          organizerUsername: data.organizer,
          places: data.places,
          lat: data.lat,
          long: data.long,
          price: data.price,
          hikeTitle: data.title,
          firstName: "Mohamed Adnane",
          lastName: "Benzerdjeb",
          email: "adnane0@yahoo.fr",
          age: "20",
          userId: "6431b3749330be2c90c57ec8",
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ marginTop: 10, paddingHorizontal: 4 }}>
        {loading && (
          <View
            style={{
              display: "flex",
              marginTop: 300,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        {!loading && (
          <>
            <ScrollView
              ContentContainerstyle={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  source={{ uri: data.img }}
                  style={{
                    width: "100%",
                    height: 300,
                    resizeMode: "cover",
                    zIndex: 0,
                    borderRadius: 15,
                  }}
                />
                <View
                  style={tw`absolute bottom-60 left-2 text-white text-lg font-semibold h-10 w-10 bg-gray-700 rounded-full flex justify-center items-center opacity-75`}
                >
                  <IconButton
                    icon={<Icon as={AntDesign} name="arrowleft" />}
                    borderRadius="full"
                    _icon={{
                      color: "coolGray.50",
                      size: "md",
                    }}
                    _hover={{
                      bg: "coolGray.800:alpha.20",
                    }}
                    _pressed={{
                      bg: "coolGray.800:alpha.20",
                      _icon: {
                        name: "emoji-flirt",
                      },
                      _ios: {
                        _icon: {
                          size: "2xl",
                        },
                      },
                    }}
                    _ios={{
                      _icon: {
                        size: "2xl",
                      },
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                  marginTop: 10,
                }}
              >
                <View style={tw`mb-3`}>
                  <Text style={tw`text-2xl font-bold text-gray-900`}>
                    {data.title}
                  </Text>
                  <Text>
                    de <Text style={tw`text-blue-500`}>{data.organizer}</Text>
                  </Text>
                  <View
                    style={tw`mt-2 bg-gray-200 h-auto w-30 px-2 py-2 rounded-xl flex flex-row gap-1`}
                  >
                    <Text style={tw`text-blue-500 text-3xl font-bold`}>
                      {data.price}
                    </Text>
                    <Text style={tw`text-blue-500 text-lg font-bold`}>DZD</Text>
                  </View>
                  <View style={tw`mt-1 flex flex-row items-center gap-[2px]`}>
                    <Ionicons name="ios-time-outline" size={20} color="grey" />
                    <Text style={tw`text-gray-500`}>
                      {moment(data.date).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                  <View style={tw`flex flex-row items-center gap[4px]`}>
                    <MaterialCommunityIcons
                      name="account-group"
                      size={20}
                      color="grey"
                    />
                    <Text style={tw`text-gray-500`}>{data.places}</Text>
                  </View>
                </View>

                <Text style={tw`text-gray-700`}>{data.desc}</Text>
                <View style={tw`pt-6`}>
                  <Button title="Réserver" onPress={handleBooking} />
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
