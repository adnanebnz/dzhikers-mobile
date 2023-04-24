import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home/Home";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import Products from "./screens/Shop/Products";
import MapViewer from "./screens/map/MapViewer";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
const Tab = createBottomTabNavigator();

export default function Root({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const user = await AsyncStorage.getItem("currentUser");
        setUser(JSON.parse(user));
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
  const CustomTabButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -45,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#2563eb",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {loading && (
        <View
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      {!loading && (
        <>
          <Tab.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: "#2563eb",
              tabBarStyle: {
                backgroundColor: "#e2e8f0",
                elevation: 6,
                borderRadius: 15,
                height: 80,
              },
              tabBarHideOnKeyboard: true,
            }}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              initialParams={{ user: user }}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="home-outline"
                      size={28}
                      color={focused ? "#2563eb" : "#748c94"}
                    />

                    <Text
                      style={{
                        color: focused ? "#2563eb" : "#748c94",
                        fontSize: 14,
                      }}
                    >
                      Accueil
                    </Text>
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="Map"
              component={MapViewer}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View>
                    <Image
                      source={require("./assets/map-icon.png")}
                      resizeMode="contain"
                      style={{
                        width: 35,
                        height: 35,
                        tintColor: "#fff",
                      }}
                    />
                  </View>
                ),
                tabBarButton: (props) => <CustomTabButton {...props} />,
              }}
            />
            <Tab.Screen
              name="Boutique"
              component={Products}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="cart-outline"
                      size={28}
                      color={focused ? "#2563eb" : "#748c94"}
                    />

                    <Text
                      style={{
                        color: focused ? "#2563eb" : "#748c94",
                        fontSize: 14,
                      }}
                    >
                      Boutique
                    </Text>
                  </View>
                ),
                headerShown: true,
                headerTitle: "Boutique",
              }}
            />
          </Tab.Navigator>
          <StatusBar animated={true} backgroundColor="#60a5fa" />
        </>
      )}
    </>
  );
}
