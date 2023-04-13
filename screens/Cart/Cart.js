import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { ScrollView } from "react-native";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
  clearCart,
} from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  return (
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
                <View
                  key={item._id}
                  style={{
                    display: "flex",
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <Image
                    source={{ uri: item.img3 }}
                    style={{
                      width: 75,
                      height: 75,
                      resizeMode: "contain",
                      borderRadius: 4,
                    }}
                  />
                  <Text>{item.title}</Text>
                  <Text>({item.count})</Text>
                  <Text>{item.price} DZD</Text>
                  <TouchableOpacity>
                    <Ionicons
                      name="trash-outline"
                      size={24}
                      color="red"
                      onPress={() => {
                        dispatch(removeFromCart({ _id: item._id }));
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
