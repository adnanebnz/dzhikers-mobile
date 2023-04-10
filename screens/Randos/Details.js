import { View, Text } from "react-native";
import React from "react";

export default function Details({ route, navigation }) {
  const { id } = route.params;
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
