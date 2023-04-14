import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { makeRequest } from "../../makeRequest";
import tw from "twrnc";
import { Divider, NativeBaseProvider } from "native-base";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import moment from "moment";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
const PurchasedProducts = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = route.params;
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const res = await makeRequest.get(`/orders/${id}`);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);
  const handleDelete = async (order) => {
    setLoading(true);
    try {
      await makeRequest.delete(`/orders/${order}`);
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <NativeBaseProvider>
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
          <ActivityIndicator size="large" />
        </View>
      )}
      {!loading && (
        <ScrollView style={tw`mt-4`}>
          <Text style={tw`text-2xl font-semibold px-4`}>Mes commandes</Text>
          {data.map((item) => (
            <View
              style={tw`rounded-lg p-2 m-2 border border-solid border-gray-300`}
            >
              <View
                style={{
                  ...tw`flex flex-row justify-between items-center`,
                }}
              >
                <View
                  style={{
                    ...tw`flex flex-row gap-2 items-center`,
                  }}
                >
                  <Feather name="package" size={32} color="black" />
                  <View
                    style={{
                      ...tw`flex flex-col`,
                    }}
                  >
                    <Text style={tw`font-semibold text-[11px]`}>
                      id: {item._id}
                    </Text>
                    <Text style={tw`font-semibold text-[11px]`}>
                      placée le:{" "}
                      {moment(item.createdAt).format("DD-MM-YYYY HH:mm ")}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(item._id);
                    }}
                  >
                    <Ionicons name="trash-outline" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text
                style={{
                  ...tw`font-semibold text-[14px] mt-2`,
                }}
              >
                Produits :{" "}
              </Text>
              {item.products.map((product) => (
                <>
                  <Text style={tw`font-semibold text-gray-700`}>
                    {product.title}
                  </Text>
                  <Text style={tw`font-semibold`}>
                    Quantité: {product.count}
                  </Text>
                  <Text style={tw`font-semibold`}>Prix: {product.price}</Text>
                  {item.products.length > 1 && <Divider />}
                </>
              ))}
              <View>
                <View>
                  <Text
                    style={{
                      ...tw`font-semibold text-[15px] mt-2`,
                    }}
                  >
                    Adresse de livraison :{" "}
                  </Text>
                  <Text style={tw`font-semibold text-gray-700`}>
                    {item.billingAddress.street1}
                  </Text>
                  {item.billingAddress.street2 && (
                    <Text style={tw`font-semibold text-gray-700`}>
                      {item.billingAddress.street2}
                    </Text>
                  )}
                  <Text style={tw`font-semibold text-gray-700`}>
                    {item.billingAddress.city} {item.billingAddress.zipCode}
                  </Text>
                </View>
                <View
                  style={{
                    ...tw`flex flex-row gap-4 mt-3`,
                  }}
                >
                  {item.delivery_status === "pending" && (
                    <View
                      style={{
                        ...tw`bg-orange-500 rounded-lg p-2`,
                      }}
                    >
                      <Text
                        style={{
                          ...tw`font-semibold text-[13px] text-white`,
                        }}
                      >
                        En cours de traitement
                      </Text>
                    </View>
                  )}
                  {item.delivery_status === "shipping" && (
                    <View
                      style={{
                        ...tw`bg-orange-200 rounded-lg p-2`,
                      }}
                    >
                      <Text
                        style={{
                          ...tw`font-semibold text-[13px] text-white`,
                        }}
                      >
                        En cours d'expedition
                      </Text>
                    </View>
                  )}
                  {item.delivery_status === "done" && (
                    <View
                      style={{
                        ...tw`bg-green-500 rounded-lg p-2`,
                      }}
                    >
                      <Text
                        style={{
                          ...tw`font-semibold text-[13px] text-white`,
                        }}
                      >
                        Livrée
                      </Text>
                    </View>
                  )}
                  {item.payment_status === "payed" && (
                    <View
                      style={{
                        ...tw`bg-green-500 rounded-lg p-2`,
                      }}
                    >
                      <Text
                        style={{
                          ...tw`font-semibold text-[13px] text-white`,
                        }}
                      >
                        Payée
                      </Text>
                    </View>
                  )}
                  {item.payment_status === "not_payed" && (
                    <View
                      style={{
                        ...tw`bg-red-500 rounded-lg p-2`,
                      }}
                    >
                      <Text
                        style={{
                          ...tw`font-semibold text-[13px] text-white`,
                        }}
                      >
                        Non Payée
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  style={{
                    textAlign: "right",
                    ...tw`font-semibold text-[14px] mt-3`,
                  }}
                >
                  Total: {item.total} DZD
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default PurchasedProducts;
