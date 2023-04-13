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
const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const { user, userLoading, error } = useFetchUser();
  return (
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
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PurchasedProducts"
          component={PurchasedProducts}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BookingListing"
          component={BookingListing}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
