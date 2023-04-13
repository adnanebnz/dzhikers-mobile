import {
  Text,
  ActivityIndicator,
  View,
  Image,
  Button,
  ScrollView,
  Dimensions,
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
import { IconButton, Icon, NativeBaseProvider } from "native-base";

const Product = ({ navigation, route }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const res = await makeRequest.get(`/items/${id}`);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);
  const width = Dimensions.get("window").width;
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        {loading && (
          <ActivityIndicator
            size="large"
            style={{
              marginTop: 20,
            }}
          />
        )}
        {data && (
          <ScrollView
            ContentContainerstyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View>
              <Image
                source={{ uri: data.img3 }}
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
                    bg: "coolGray.800:alpha.40",
                  }}
                  onPress={() => navigation.goBack()}
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
                  de <Text style={tw`text-blue-500`}>{data.brand}</Text>
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
                <Button
                  title="Réserver"
                  onPress={() => {
                    alert("hey");
                  }}
                />
              </View>
              {error && (
                <View style={tw`px-1 py-3 mt-2 rounded-lg bg-gray-200`}>
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "500",
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Product;
