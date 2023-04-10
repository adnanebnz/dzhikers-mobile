import {
  Text,
  ActivityIndicator,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { makeRequest } from "../../makeRequest";
import tw from "twrnc";
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
  //handle the navigation to go back to the previous screen
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
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
              marginTop: 20,
            }}
          >
            <View>
              <Image
                source={{ uri: data.img }}
                style={{
                  width: 400,
                  height: 400,
                  resizeMode: "cover",
                  zIndex: 0,
                  borderRadius: 15,
                }}
              />
              <View
                style={tw`absolute bottom-88 left-2 text-white text-lg font-semibold h-10 w-10 bg-gray-800 rounded-full flex justify-center items-center opacity-80`}
              >
                <AntDesign name="arrowleft" size={24} color="white" />
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
              <Text style={tw`text-2xl font-bold text-gray-900 mb-3`}>
                {data.title}
              </Text>
              <Text style={tw`text-gray-700`}>{data.desc}</Text>
              <View style={tw`pt-6`}>
                <Button title="Réserver" onPress={goBack} />
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}
