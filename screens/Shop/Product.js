import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "native-base";
import useFetch from "../../hooks/useFetch";

const Product = ({ navigation, route }) => {
  const { id } = route.params;

  const { data, loading, error } = useFetch(`/items/${id}`);
  return (
    <SafeAreaView>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {data &&
        data.map((item) => (
          <View key={item._id}>
            <Text>{item.name}</Text>
          </View>
        ))}
    </SafeAreaView>
  );
};

export default Product;
