import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home/Home";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import Products from "./screens/Shop/Products";
import MapViewer from "./screens/map/MapViewer";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function Root({ navigation }) {
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
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#2563eb",
          tabBarStyle: {
            backgroundColor: "#e2e8f0",
            position: "absolute",
            bottom: 25,
            left: 40,
            right: 40,
            elevation: 1,
            borderRadius: 15,
            height: 80,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
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
  );
}
