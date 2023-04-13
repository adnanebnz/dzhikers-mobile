import { View, Text } from "react-native";
import React from "react";
import { makeRequest } from "../../makeRequest";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { Icon, NativeBaseProvider, TextField, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

import { clearCart } from "../../state";
const Payment = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const user = await AsyncStorage.getItem("currentUser");
        const parsedUser = JSON.parse(user);
        setUser(parsedUser);
      } catch (err) {
        setError(err.response.data.message);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);
  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.post("/orders/create-order", {
        products: cart,
        userId: user.details._id,
        total: totalPrice,
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        phoneNumber: phone,
        billingAddress: {
          firstName: firstName,
          lastName: lastName,
          emailAddress: email,
          phoneNumber: phone,
          street1: address,
          city: city,
          zip: zip,
        },
      });
      if (res.status === 200) {
        setAlert(true);
      }
      dispatch(clearCart());
    } catch (err) {
      setError(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <NativeBaseProvider>
      <ScrollView
        style={{
          padding: 20,
        }}
      >
        <View>
          <TextField
            InputLeftElement={
              <Icon
                as={<AntDesign name="user" />}
                size="sm"
                ml="2"
                color="muted.400"
              />
            }
            onChangeText={(text) => setFirstName(text)}
            placeholder="Nom"
          />
          <TextField
            InputLeftElement={
              <Icon
                as={<AntDesign name="user" />}
                size="sm"
                ml="2"
                color="muted.400"
              />
            }
            onChangeText={(text) => setLastName(text)}
            placeholder="Prénom"
          />
          <TextField
            InputLeftElement={
              <Icon
                as={<AntDesign name="mail" />}
                size="sm"
                ml="2"
                color="muted.400"
              />
            }
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
          />
          <TextField
            InputLeftElement={
              <Icon
                as={<AntDesign name="phone" />}
                size="sm"
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Téléphone"
            onChangeText={(text) => setPhone(text)}
          />
          <TextField
            InputLeftElement={
              <Icon
                as={<AntDesign name="home" />}
                size="sm"
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Adresse"
            onChangeText={(text) => setAddress(text)}
          />
          <TextField
            InputLeftElement={
              <Icon
                as={<AntDesign name="home" />}
                size="sm"
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Ville"
            onChangeText={(text) => setCity(text)}
          />
          <TextField
            InputLeftElement={
              <Icon
                as={<AntDesign name="home" />}
                size="sm"
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Code postal"
            onChangeText={(text) => setZip(text)}
          />
          <Button
            onPress={handlePayment}
            _spinner={{
              color: "white",
              size: "sm",
              thickness: 2,
            }}
            bg={"#3b82f6"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
            _pressed={{
              bg: "blue.600",
            }}
          >
            PAYER
          </Button>
        </View>
        {loading && <ActivityIndicator size="large" />}
        {error && (
          <Text
            style={{
              color: "red",
            }}
          >
            {error}
          </Text>
        )}
        {alert && (
          <Text style={{ color: "green" }}>
            Votre commande a été enregistrée avec succès
          </Text>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Payment;
