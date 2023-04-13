import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";

export default function Cart() {
  return (
    <SafeAreaView style={tw`pt-3`}>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
