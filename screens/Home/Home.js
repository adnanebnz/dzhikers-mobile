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
import { useCallback, useEffect, useState } from "react";
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
import { RefreshControl } from "react-native-gesture-handler";

export default function Home({ navigation, route }) {
  const { user } = route.params;
  const [loading, setLoading] = useState(true);
  const [notifs, setNotifs] = useState([]);
  const [error, setError] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifs = async () => {
    try {
      const res = await makeRequest.get(`announces/notifs/${user.details._id}`);
      setNotifs(res.data.announces);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifs();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  useEffect(() => {
    fetchNotifs();
  }, []);
  const handleDisconnect = async () => {
    try {
      await makeRequest.post(
        "/users/logout",
        {
          id: user.details._id,
        },
        {
          withCredentials: true,
        }
      );
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
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={25}
                progressBackgroundColor={"#374151"}
                colors={["#fff"]}
              />
            }
            style={{
              flex: 1,
              height: "100%",
              paddingTop: 10,
            }}
          >
            <View style={tw`flex flex-row items-center justify-between pt-1`}>
              <View style={tw`flex flex-row items-center gap-1 px-4`}>
                <Text style={tw` text-[19px] text-black font-black`}>
                  DZHIKERS
                </Text>

                <Image
                  source={require("./../../assets/noback.png")}
                  style={{ width: 45, height: 45, resizeMode: "contain" }}
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
                            source={{
                              uri:
                                "http://192.168.1.42:8800/Images/" +
                                user.details.img.split("/")[4],
                            }}
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
                <TouchableOpacity
                  style={tw`px-2 mr-1`}
                  onPress={() => {
                    navigation.navigate("Notifications", {
                      id: user.details._id,
                    });
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: -15,
                      right: -7,
                    }}
                  >
                    {notifs.length > 0 && notifs.length <= 9 && (
                      <Badge
                        bg="red.500"
                        borderRadius={50}
                        _text={{
                          color: "white",
                          fontSize: 10,
                        }}
                        height={6}
                        width={6}
                      >
                        {notifs.length}
                      </Badge>
                    )}
                    {notifs.length > 9 && (
                      <Badge
                        bg="red.500"
                        borderRadius={50}
                        color={"white"}
                        _text={{
                          color: "white",
                        }}
                        w={8}
                        h={6}
                      >
                        9+
                      </Badge>
                    )}
                  </View>
                  <MaterialCommunityIcons
                    name="bell-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`mr-1`}
                  onPress={() => {
                    navigation.navigate("Panier");
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: -15,
                      right: -17,
                    }}
                  >
                    {cart.length > 0 && cart.length <= 9 && (
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
                    {cart.length > 9 && (
                      <Badge
                        bg="red.500"
                        borderRadius={50}
                        color={"white"}
                        _text={{
                          color: "white",
                        }}
                        w={8}
                        h={6}
                      >
                        9+
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
              <View
                style={{
                  backgroundColor: "black",
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                  position: "absolute",
                  marginLeft: 12,
                }}
              />
              <Image
                source={require("./../../assets/trail1.jpg")}
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "cover",
                  borderRadius: 10,
                  opacity: 0.65,
                }}
              />
              <View
                style={{
                  ...tw`flex flex-col justify-between`,
                }}
              >
                <Text style={tw`absolute -top-48 left-2 text-xl text-white`}>
                  Explorez <Text style={tw`font-bold`}>l'Algérie</Text> avec
                  nous!
                </Text>
                <Text
                  style={tw`absolute -top-18 left-2 text-xl text-white font-semibold`}
                >
                  Bonjour,
                </Text>
                <Text style={tw`absolute -top-11 left-2 text-lg text-white`}>
                  {user.details.lastName} {user.details.firstName}
                </Text>
              </View>
            </View>

            <View style={tw`mt-4 mb-3`}>
              <Text style={tw`font-semibold text-xl px-4`}>
                Nous disposons de
              </Text>
              <View
                style={tw`mt-2 flex flex-row items-center justify-center gap-2 px-4`}
              >
                <View
                  style={tw`rounded-full bg-blue-500 px-3 py-2 flex flex-row gap-1 items-center justify-center`}
                >
                  <FontAwesome5 name="store" size={17} color="white" />
                  <Text style={tw`text-lg text-white`}>Articles d'achat</Text>
                </View>
                <View
                  style={tw`rounded-full bg-blue-500 px-3 py-2 flex flex-row gap-1 items-center justify-center`}
                >
                  <Foundation name="mountains" size={17} color="white" />
                  <Text style={tw`text-lg text-white`}>des randonées</Text>
                </View>
              </View>
            </View>

            <View style={tw`flex flex-row items-center justify-center `}>
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
          </ScrollView>
        </>
      )}
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 190,
    height: 190,
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
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
});
