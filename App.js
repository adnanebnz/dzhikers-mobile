import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Root from "./Root";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import Details from "./screens/Randos/Details";
import Profile from "./screens/Auth/Profile";
import BookingListing from "./screens/overview/BookingListing";
import PurchasedProducts from "./screens/overview/PurchasedProducts";
import Product from "./screens/Shop/Product";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state";
import Cart from "./screens/Cart/Cart";
import Payment from "./screens/Shop/Payment";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: "@skillz1337/dzhikers",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const Stack = createNativeStackNavigator();
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default function App({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem("currentUser");
        setUser(JSON.parse(user));
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);
  return (
    <Provider store={store}>
      {loading ? (
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
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            {user !== null ? (
              <>
                <Stack.Screen
                  name="Root"
                  component={Root}
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
              </>
            ) : (
              <>
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
                  name="Root"
                  component={Root}
                  options={{
                    headerShown: false,
                  }}
                />
              </>
            )}

            <Stack.Screen
              name="Details"
              component={Details}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="PurchasedProducts"
              component={PurchasedProducts}
              options={{
                headerShown: true,
                headerTitle: "Produits achetés",
              }}
            />
            <Stack.Screen
              name="BookingListing"
              component={BookingListing}
              options={{
                headerShown: true,
                headerTitle: "Réservations",
              }}
            />
            <Stack.Screen
              name="Product"
              component={Product}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Panier"
              component={Cart}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{
                headerShown: true,
              }}
            />
            {/* <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: true,
              headerTitle: "Modifier mon profil",
            }}
          /> */}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </Provider>
  );
}
