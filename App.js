import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home/Home";
import Settings from "./screens/Settings/Settings";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Notifs from "./screens/notifs/Notifs";
import Contact from "./screens/Contact/Contact";
import MapViewer from "./screens/map/MapViewer";
import Details from "./screens/Randos/Details";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import Profile from "./screens/Auth/Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Root({ navigation }) {
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
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#2563eb",
          tabBarStyle: {
            backgroundColor: "#e2e8f0",
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 1,
            borderRadius: 15,
            height: 90,
          },
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
                  top: 10,
                }}
              >
                <Image
                  source={require("./assets/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#2563eb" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#2563eb" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Accueil
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Contact}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("./assets/bag.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#2563eb" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#2563eb" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Panier
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
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("./assets/settings.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#2563eb" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#2563eb" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Settings
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifs}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("./assets/notif.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#2563eb" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#2563eb" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Alerts
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Acceuil"
          component={Root}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
