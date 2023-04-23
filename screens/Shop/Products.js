import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ScrollViewBase,
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
    <ScrollView
      style={{
        maxHeight: "80%",
      }}
    >
      <View
        style={{
          ...tw`flex flex-col gap-3 px-3 mt-4`,
        }}
      >
        {products.map((product) => (
          <TouchableOpacity
            key={product._id}
            onPress={() => navigation.navigate("Product", { id: product._id })}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 10,
                ...tw`bg-gray-200 px-2 py-3 rounded-lg mb-3`,
              }}
            >
              <Image
                source={{
                  uri: product.img3,
                }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 10,
                  resizeMode: "cover",
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  ...tw`flex flex-col  gap-1`,
                }}
              >
                <Text
                  style={{
                    ...tw`text-[16px] font-bold`,
                  }}
                >
                  {product.title}
                </Text>
                {product.quantity === 0 ? (
                  <Text
                    style={{
                      ...tw`text-[14px] font-bold text-red-500`,
                    }}
                  >
                    En rupture de stock
                  </Text>
                ) : (
                  <>
                    <Text
                      style={{
                        ...tw`text-[14px] font-bold text-green-500`,
                      }}
                    >
                      En Stock : {product.quantity}
                    </Text>
                  </>
                )}

                <View
                  style={{
                    ...tw`bg-gray-300 rounded-lg px-2 py-1 w-3/5`,
                  }}
                >
                  <Text
                    style={{
                      ...tw`text-[14px] text-blue-500 font-bold`,
                    }}
                  >
                    {product.price} DZD
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Products;
