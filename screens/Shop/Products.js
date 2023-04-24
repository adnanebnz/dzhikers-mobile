import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from "react-native";
import tw from "twrnc";
import React, { useState, useEffect } from "react";
import { makeRequest } from "../../makeRequest";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
const Products = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000);
  const [itemCount, setItemCount] = useState(0);
  const scrollViewRef = useRef();
  const { width } = Dimensions.get("window");
  const SPACING = 10;
  const ITEM_WIDTH = width / 2 - SPACING * 3;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await makeRequest.get(
          `/items?category=${category}&page=${page}&min=${min}&max=${max}`
        );
        setItemCount(res.data.count);
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
        maxHeight: "100%",
      }}
      ref={scrollViewRef}
    >
      <View
        style={{
          ...tw`flex-row justify-between items-center px-3 mt-3`,
        }}
      >
        <Text style={{ ...tw`text-lg font-semibold` }}>
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

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginVertical: SPACING * 2,
        }}
      >
        {products.map((product) => (
          <TouchableOpacity
            style={{
              width: ITEM_WIDTH * 1.2,
              marginBottom: SPACING * 2,
              paddingLeft: 5,
              paddingRight: 5,
            }}
            key={product._id}
            onPress={() => {
              navigation.navigate("Product", {
                id: product._id,
              });
            }}
          >
            <Image
              style={{
                width: "100%",
                height: ITEM_WIDTH + SPACING * 4,
                borderRadius: SPACING * 2,
              }}
              source={{
                uri:
                  "http://192.168.1.41:8800/Images/" +
                  product.img3.split("/")[4],
              }}
            />
            <Text
              style={{
                fontSize: SPACING * 1.4,
                fontWeight: "700",
                marginTop: SPACING,
              }}
            >
              {product.title}
            </Text>

            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "700",
                ...tw`text-blue-500`,
              }}
            >
              {product.price} DZD
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 30,
          marginBottom: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (page > 1) {
              setPage(page - 1);
              scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
            }
          }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text>Page {page}</Text>
        <TouchableOpacity
          onPress={() => {
            if (Math.ceil(itemCount / 12) > page) setPage(page + 1);
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
          }}
        >
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Products;
