import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import React, { useState, useEffect } from "react";
import { makeRequest } from "../../makeRequest";
const Products = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const res = await makeRequest.get(
          "/items?category=all&page=1&min=0&max=1000000"
        );
        setProducts(res.data.items);
      } catch (err) {
        console.log(err);
      }
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView>
      <ScrollView>
        {products.map((product) => (
          <TouchableOpacity
            key={product._id}
            onPress={() => navigation.navigate("Product", { id: product._id })}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{ uri: product.img3 }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {product.title}
                </Text>
                <Text
                  style={{
                    color: "#777",
                    fontSize: 16,
                  }}
                >
                  {product.desc}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {product.price} DZD
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;
