import {
  Text,
  ActivityIndicator,
  View,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { makeRequest } from "../../makeRequest";
import tw from "twrnc";
import { IconButton, Icon, NativeBaseProvider, StatusBar } from "native-base";
import { SliderBox } from "react-native-image-slider-box/dist";
import { useDispatch } from "react-redux";
import { addToCart } from "./../../state";
const Product = ({ navigation, route }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const res = await makeRequest.get(`/items/${id}`);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);
  const width = Dimensions.get("window").width;
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        {loading && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <ActivityIndicator
              size="large"
              style={{
                marginTop: 20,
              }}
            />
          </View>
        )}
        {!loading && (
          <ScrollView
            ContentContainerstyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View>
              <SliderBox
                images={[data.img, data.img2, data.img3]}
                sliderBoxHeight={width}
                dotColor="#1d4ed8"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                resizeMethod={"resize"}
                resizeMode={"cover"}
                paginationBoxStyle={{
                  position: "absolute",
                  bottom: 0,
                  padding: 0,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: "rgba(128, 128, 128, 0.92)",
                }}
                ImageComponentStyle={{
                  borderRadius: 15,
                  width: "100%",
                  marginTop: 5,
                }}
                imageLoadingColor="#2196F3"
              />

              <View
                style={tw`absolute bottom-90 left-4 text-white text-lg font-semibold h-10 w-10 bg-gray-700 rounded-full flex justify-center items-center opacity-75`}
              >
                <IconButton
                  icon={<Icon as={AntDesign} name="arrowleft" />}
                  borderRadius="full"
                  _icon={{
                    color: "coolGray.50",
                    size: "md",
                  }}
                  _hover={{
                    bg: "coolGray.800:alpha.20",
                  }}
                  _pressed={{
                    bg: "coolGray.800:alpha.40",
                  }}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 10,
                marginTop: 10,
              }}
            >
              <View style={tw`mb-2`}>
                <Text style={tw`text-2xl font-bold text-gray-900`}>
                  {data.title}
                </Text>
                <Text>
                  de <Text style={tw`text-blue-500`}>{data.brand}</Text>
                </Text>
                <View
                  style={tw`mt-2 bg-gray-200 h-auto w-30 px-2 py-2 rounded-xl flex flex-row gap-1`}
                >
                  <Text style={tw`text-blue-500 text-3xl font-bold`}>
                    {data.price}
                  </Text>
                  <Text style={tw`text-blue-500 text-lg font-bold`}>DZD</Text>
                </View>
                {data.quantity > 0 ? (
                  <View style={tw`mt-1 flex flex-row items-center gap-[2px]`}>
                    <Text style={tw`text-green-500`}>
                      En Stock: {data.quantity}
                    </Text>
                  </View>
                ) : (
                  <View style={tw`mt-1 flex flex-row items-center gap-[2px]`}>
                    <Text style={tw`text-red-500`}>Rupture de Stock</Text>
                  </View>
                )}
              </View>

              <Text style={tw`text-gray-700`}>{data.desc}</Text>
              <View style={tw`mt-1`}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    ...tw`bg-gray-200 px-2 py-2 rounded-xl w-48 mx-auto`,
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text style={tw`text-gray-700 font-semibold`}>Quantité</Text>
                  <View
                    style={{
                      ...tw`flex flex-row items-center justify-center gap-2
                      border border-blue-300 rounded-md
                      `,
                    }}
                  >
                    <IconButton
                      icon={<Icon as={AntDesign} name="minus" />}
                      _icon={{
                        color: "blue.400",
                      }}
                      onPress={() => {
                        setCount(Math.max(count - 1, 1));
                      }}
                    />
                    <Text
                      style={{
                        ...tw`text-gray-700 text-lg`,
                      }}
                    >
                      {count}
                    </Text>
                    <IconButton
                      icon={<Icon as={AntDesign} name="plus" />}
                      _icon={{
                        color: "blue.400",
                      }}
                      onPress={() => {
                        if (count < data.quantity) setCount(count + 1);
                      }}
                    />
                  </View>
                </View>
                <Button
                  title="Ajouter au panier"
                  onPress={() => {
                    dispatch(addToCart({ item: { ...data, count } }));
                  }}
                />
              </View>
              {error && (
                <View style={tw`px-1 py-3 mt-2 rounded-lg bg-gray-200`}>
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "500",
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
};

export default Product;
