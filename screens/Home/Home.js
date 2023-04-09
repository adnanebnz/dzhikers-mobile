import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://dzhikers.up.railway.app/api/users"
        );
        setData(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={tw`pt-3`}>
      <View style={tw`flex flex-row items-center justify-center gap-2`}>
        <Text style={tw` text-xl text-black font-black`}>DZHIKERS</Text>
        <Image
          source={require("./../../assets/noback.png")}
          style={{ width: 60, height: 60, resizeMode: "contain" }}
        />
      </View>
      <View>
        <Text style={tw`text-2xl text-black font-black text-center mt-5`}>
          Home
        </Text>
      </View>
      <FlatList>
        {data.map((item) => {
          return (
            <View
              key={item._id}
              style={tw` rounded-xl bg-gray-50 flex flex-col px-5 py-3 shadow-md`}
            >
              <Text>{item.email}</Text>

              <Text>{item.username}</Text>
            </View>
          );
        })}
      </FlatList>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
