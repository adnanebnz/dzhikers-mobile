import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Menu,
  Badge,
  Divider,
  NativeBaseProvider,
  Pressable,
} from "native-base";
import { makeRequest } from "../../makeRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { Foundation } from "@expo/vector-icons";
export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const closeMenu = () => setVisible(false);
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const res = await AsyncStorage.getItem("currentUser");
        setUser(JSON.parse(res));
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleDisconnect = async () => {
    try {
      await makeRequest.post("/users/logout", "", {
        withCredentials: true,
      });
      await AsyncStorage.removeItem("currentUser");
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("Login");
  };
  return (
    <NativeBaseProvider>
      {loading ? (
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <SafeAreaView style={tw`pt-1`}>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View style={tw`flex flex-row items-center gap-1 px-4`}>
                <Text style={tw` text-xl text-black font-black`}>DZHIKERS</Text>

                <Image
                  source={require("./../../assets/noback.png")}
                  style={{ width: 60, height: 60, resizeMode: "contain" }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {!user && (
                  <TouchableOpacity
                    style={tw`px-2`}
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <Image
                      source={require("../../assets/noavatar.png")}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                )}
                {user && (
                  <View
                    style={{
                      paddingRight: 5,
                    }}
                  >
                    <Menu
                      marginRight={2}
                      w="150"
                      trigger={(triggerProps) => {
                        return (
                          <Pressable {...triggerProps}>
                            <Image
                              source={{ uri: user.details.img }}
                              style={styles.avatar}
                            />
                          </Pressable>
                        );
                      }}
                    >
                      <Menu.Item
                        onPress={() => {
                          navigation.navigate("Profile");
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Ionicons
                            name="person-outline"
                            size={24}
                            color="#374151"
                          />
                          <Text style={tw`font-semibold text-black`}>
                            Profile
                          </Text>
                        </View>
                      </Menu.Item>
                      <Divider />
                      <Menu.Item
                        onPress={() => {
                          handleDisconnect();
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Ionicons
                            name="log-out-outline"
                            size={24}
                            color="#374151"
                          />
                          <Text style={tw`font-semibold text-black`}>
                            Déconnexion
                          </Text>
                        </View>
                      </Menu.Item>
                    </Menu>
                  </View>
                )}
                <TouchableOpacity
                  style={tw`px-2 mr-3`}
                  onPress={() => {
                    navigation.navigate("Panier");
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: -15,
                      right: -7,
                    }}
                  >
                    {cart.length > 0 && (
                      <Badge
                        bg="red.500"
                        borderRadius={50}
                        color={"white"}
                        _text={{
                          color: "white",
                        }}
                        w={6}
                        h={6}
                      >
                        {cart.length}
                      </Badge>
                    )}
                  </View>
                  <MaterialCommunityIcons
                    name="shopping-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`mt-4 px-3`}>
              <View>
                <Text style={tw`text-2xl`}>
                  Explorez <Text style={tw`font-bold`}>l'Algérie</Text> avec
                  nous!
                </Text>
              </View>
            </View>

            <View style={tw`mt-8 mb-3`}>
              <Text style={tw`font-semibold text-xl px-4`}>
                Nous disposons de
              </Text>
              <View
                style={tw`flex flex-row gap-2 pt-3 px-2 items-center justify-center`}
              >
                <View
                  style={tw`rounded-full bg-blue-500 px-3 py-2 flex flex-row gap-2 items-center justify-center`}
                >
                  <Foundation name="mountains" size={17} color="white" />
                  <Text style={tw`text-lg text-white`}>Randonées</Text>
                </View>
                <View
                  style={tw`rounded-full bg-blue-500 px-3 py-2 flex flex-row gap-2 items-center justify-center`}
                >
                  <FontAwesome5 name="store" size={17} color="white" />
                  <Text style={tw`text-lg text-white`}>Articles d'achat</Text>
                </View>
              </View>
            </View>

            <View style={tw`flex flex-row items-center justify-center mt-5`}>
              <Text style={tw`text-[16px] text-gray-600`}>
                Parcourrez et choisissez ce qui vous convient!
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={tw`pt-4 mx-[4px] `}
              contentContainerStyle={tw`flex flex-row items-center justify-center gap-2`}
            >
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Map");
                  }}
                >
                  <Image
                    source={require("./../../assets/hikers.jpg")}
                    style={styles.image}
                  />

                  <Text
                    style={tw`absolute bottom-2 left-2 text-white text-lg font-semibold`}
                  >
                    Randonées
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Products");
                  }}
                >
                  <Image
                    source={require("./../../assets/chair.jpg")}
                    style={styles.image}
                  />
                  <Text
                    style={tw`absolute bottom-2 left-2 text-white text-lg font-semibold`}
                  >
                    Chaises
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Products");
                  }}
                >
                  <Image
                    source={require("./../../assets/tante.jpg")}
                    style={styles.image}
                  />
                  <Text
                    style={tw`absolute bottom-2 left-2 text-white text-lg font-semibold`}
                  >
                    Tantes
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Products");
                  }}
                >
                  <Image
                    source={require("./../../assets/photo.png")}
                    style={styles.image}
                  />
                  <Text
                    style={tw`absolute bottom-2 left-2 text-white text-lg font-semibold`}
                  >
                    Vetements
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      )}
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
    opacity: 0.8,
  },

  input: {
    flex: 1,
    marginLeft: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
