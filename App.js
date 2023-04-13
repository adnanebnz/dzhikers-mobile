import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Root from "./Root";
import useFetchUser from "./hooks/useFetchUser";
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
const Stack = createNativeStackNavigator();
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default function App({ navigation }) {
  const { user, userLoading, error } = useFetchUser();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
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
                name="Root"
                component={Root}
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
