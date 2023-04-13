import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { ScrollView } from "react-native";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  clearCart,
} from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Icon, IconButton, NativeBaseProvider } from "native-base";
import { Button } from "react-native";

export default function Cart({ navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  return (
    <NativeBaseProvider>
      <SafeAreaView style={tw`p-2`}>
        <ScrollView>
          {cart.length > 0 ? (
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={tw`text-xl font-bold`}>
                  Votre panier ({cart.length})
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(clearCart());
                  }}
                >
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  ...tw`mt-6`,
                }}
              >
                {cart.map((item) => (
                  <View>
                    <View
                      key={item._id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        ...tw`mb-4 bg-gray-200 p-2 rounded-md`,
                      }}
                    >
                      <Image
                        source={{ uri: item.img3 }}
                        style={{
                          width: 75,
                          height: 90,
                          resizeMode: "contain",
                          borderRadius: 4,
                        }}
                      />
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 20,
                          }}
                        >
                          <Text
                            style={{
                              ...tw`text-[14px] font-bold`,
                            }}
                          >
                            {item.title} ({item.count})
                          </Text>
                          <Text
                            style={{
                              ...tw`text-[14px] font-semibold text-gray-800`,
                            }}
                          >
                            {item.price} DZD
                          </Text>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                            ...tw`mt-5`,
                          }}
                        >
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
                                dispatch(decreaseCount({ _id: item._id }));
                              }}
                            />
                            <Text
                              style={{
                                ...tw`text-gray-700 text-lg`,
                              }}
                            >
                              {item.count}
                            </Text>
                            <IconButton
                              icon={<Icon as={AntDesign} name="plus" />}
                              _icon={{
                                color: "blue.400",
                              }}
                              onPress={() => {
                                dispatch(increaseCount({ _id: item._id }));
                              }}
                            />
                          </View>
                          <TouchableOpacity
                            style={{
                              alignSelf: "center",
                            }}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={28}
                              color="red"
                              onPress={() => {
                                dispatch(removeFromCart({ _id: item._id }));
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <View>
                <Text
                  style={{
                    ...tw`text-xl font-bold mt-5 mb-3`,
                  }}
                >
                  Total: {totalPrice} DZD
                </Text>
              </View>
              <Button
                title="PAYER"
                onPress={() => {
                  navigation.navigate("Payment");
                }}
              />
            </View>
          ) : (
            <>
              <Text
                style={{
                  ...tw`text-center text-xl font-bold mt-10`,
                }}
              >
                Votre panier est vide
              </Text>
            </>
          )}
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
