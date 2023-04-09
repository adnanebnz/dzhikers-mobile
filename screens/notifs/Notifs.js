import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";

export default function Notifs() {
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
          Notifs
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
