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
import { useEffect, useState } from "react";
import { Menu, Divider, Provider, Badge } from "react-native-paper";
import { makeRequest } from "../../makeRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";

export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const closeMenu = () => setVisible(false);
  const [pins, setPins] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const res = await AsyncStorage.getItem("currentUser");
        setUser(JSON.parse(res));
        const resOne = await makeRequest.get("/pins/pure");
        setPins(resOne.data.pins);
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
    <Provider>
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
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={{
              x: 350,
              y: 80,
              width: 0,
              height: 0,
            }}
            anchorPosition="top right"
          >
            <Menu.Item
              onPress={() => {
                navigation.navigate("Profile");
              }}
              leadingIcon={() => (
                <Ionicons name="person" size={24} color="#6b7280" />
              )}
              title="Profile"
            />
            <Divider />
            <Menu.Item
              onPress={handleDisconnect}
              leadingIcon={() => (
                <Ionicons name="log-out" size={24} color="#6b7280" />
              )}
              title="Deconnecter"
            />
          </Menu>

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
                  <TouchableOpacity
                    style={tw`px-2`}
                    onPress={() => {
                      setVisible(true);
                    }}
                  >
                    <Image
                      source={{ uri: user.details.img }}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={tw`px-2`}
                  onPress={() => {
                    navigation.navigate("Panier");
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: -13,
                      right: -5,
                    }}
                  >
                    {cart.length > 0 && <Badge>{cart.length}</Badge>}
                  </View>
                  <MaterialCommunityIcons
                    name="shopping-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`mt-1 px-3`}>
              <View>
                <Text style={tw`text-2xl`}>
                  Explorez <Text style={tw`font-bold`}>l'Algérie</Text> avec
                  nous!
                </Text>
              </View>
            </View>

            <View style={tw`mt-3`}>
              <Text style={tw`font-semibold text-xl px-4`}>Nous offrons</Text>
              <View style={tw`flex flex-row gap-3 pt-2 px-2`}>
                <View style={tw`rounded-full bg-blue-500 px-4 py-2`}>
                  <Text style={tw`text-lg text-white`}>Des randonées</Text>
                </View>
                <View style={tw`rounded-full bg-blue-500 px-4 py-2`}>
                  <Text style={tw`text-lg text-white`}>
                    Differents produits
                  </Text>
                </View>
              </View>
            </View>

            <View style={tw`flex flex-row items-center justify-center mt-3`}>
              <Text style={tw`text-[16px] text-gray-600`}>
                Parcourrez et choisissez ce qui vous convient!
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={tw`pt-3 mx-[5px] `}
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
            <View>
              <Text style={tw`font-semibold text-xl px-4 mt-3`}>
                Derniers randonées
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={tw`pt-1 mx-[9px] `}
                contentContainerStyle={tw`flex flex-row items-center justify-center gap-2`}
              >
                {pins.slice(0, 5).map((pin, index) => (
                  <View key={pin._id}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Details", {
                          id: pin._id,
                        });
                      }}
                    >
                      <Image source={{ uri: pin.img }} style={styles.image} />
                      <Text
                        style={tw`absolute bottom-2 left-2 text-white text-[14px] font-semibold`}
                      >
                        {pin.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </>
      )}
    </Provider>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
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
