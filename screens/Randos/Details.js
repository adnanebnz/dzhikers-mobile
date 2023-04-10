import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function Details({ navigation }) {
  //handle the navigation to go back to the previous screen
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}
