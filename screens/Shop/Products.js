import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import tw from "twrnc";
import React, { useState, useEffect } from "react";
import { makeRequest } from "../../makeRequest";
const Products = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await makeRequest.get(
          `/items?category=${category}&page=${page}&min=${min}&max=${max}`
        );
        setProducts(res.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category, page, min, max]);
  return (
    <ScrollView
      style={{
        maxHeight: "80%",
      }}
    >
      <View
        style={{
          ...tw`flex-row justify-between items-center px-3 mt-3`,
        }}
      >
        <Text style={{ ...tw`text-2xl font-semibold` }}>
          Filtrer les Produits
        </Text>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ ...tw`flex-row gap-1 px-3 mt-3` }}
        >
          <TouchableOpacity
            style={{
              ...tw`flex-row  items-center px-3 py-2 bg-blue-500 rounded-md`,
            }}
            onPress={() => setCategory("all")}
          >
            <Text style={{ ...tw`text-white font-semibold` }}>Tous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tw`flex-row  items-center px-3 py-2 bg-blue-500 rounded-md`,
            }}
            onPress={() => setCategory("tantes")}
          >
            <Text style={{ ...tw`text-white font-semibold` }}>Tantes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tw`flex-row  items-center px-3 py-2 bg-blue-500 rounded-md`,
            }}
            onPress={() => setCategory("chaises")}
          >
            <Text style={{ ...tw`text-white font-semibold` }}>Chaises</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tw`flex-row  items-center px-3 py-2 bg-blue-500 rounded-md`,
            }}
            onPress={() => setCategory("gourdes")}
          >
            <Text style={{ ...tw`text-white font-semibold` }}>Gourdes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tw`flex-row  items-center px-3 py-2 bg-blue-500 rounded-md`,
            }}
            onPress={() => setCategory("vetements")}
          >
            <Text style={{ ...tw`text-white font-semibold` }}>Vétements</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{ ...tw`px-3 mt-1 flex flex-row gap-[4px]` }}>
        {products.map((product) => (
          <View
            style={{
              ...tw`flex-col items-center justify-center mt-4 bg-gray-200 p-3 rounded-md w-3/6 flex-wrap`,
            }}
            key={product._id}
          >
            <Image
              source={{
                uri:
                  "http://192.168.1.41:8800/Images/" +
                  product.img3.split("/")[4],
              }}
              style={{
                ...tw`w-36 h-36 rounded-md`,
              }}
            />
            <View style={{ ...tw`pt-2` }}>
              <Text style={{ ...tw`text-[14px] font-medium` }}>
                {product.title}
              </Text>
              <View
                style={{
                  ...tw`flex-row items-center justify-between w-full gap-3 mt-1`,
                }}
              >
                <Text style={{ ...tw`text-blue-500 text-[14px] font-medium` }}>
                  {product.price} DZD
                </Text>
                {product.quantity === 0 ? (
                  <Text
                    style={{
                      ...tw`text-[12px] font-bold text-red-500`,
                    }}
                  >
                    En rupture de stock
                  </Text>
                ) : (
                  <Text
                    style={{
                      ...tw`text-[12px] font-bold text-green-500`,
                    }}
                  >
                    En Stock : {product.quantity}
                  </Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Products;
