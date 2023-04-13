import { View, Text } from "react-native";
import React from "react";
import useFetch from "../../hooks/useFetch";

const Products = () => {
  const [page, setPage] = React.useState(1);
  const [category, setCategory] = React.useState("all");
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(1000);
  const { data, loading, error } = useFetch(
    `/items?category=${category}&page=${page}&min=${min}&max=${max}`
  );
  return (
    <View>
      <Text>Products</Text>
    </View>
  );
};

export default Products;
