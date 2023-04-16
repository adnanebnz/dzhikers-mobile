import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { useState } from "react";
import { makeRequest } from "../../makeRequest";
import {
  Icon,
  NativeBaseProvider,
  TextField,
  Button,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Box,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
const EditProfile = ({ navigation, route }) => {
  const { id } = route.params;
  const [alert, setAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleProfileChange = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.put(
        "/users/" + id,
        {
          firstName: firstName,
          lastName: lastName,
          age: age,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setAlert(true);
      }
      console.log(res);
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };
  return (
    <NativeBaseProvider>
      {loading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          style={{
            padding: 20,
          }}
        >
          <View>
            <TextField
              borderColor={error ? "red.500" : "blue.500"}
              autoFocus={true}
              autoComplete="name-family"
              InputLeftElement={
                <Icon
                  as={<AntDesign name="user" />}
                  size="sm"
                  ml="2"
                  mr="2"
                  color="muted.400"
                />
              }
              onChangeText={(text) => setLastName(text)}
              placeholder="Nom"
            />
            <TextField
              autoComplete="name-given"
              InputLeftElement={
                <Icon
                  as={<AntDesign name="user" />}
                  size="sm"
                  ml="2"
                  color="muted.400"
                />
              }
              onChangeText={(text) => setFirstName(text)}
              placeholder="Prénom"
            />
            <TextField
              keyboardType="number-pad"
              InputLeftElement={
                <Icon
                  as={<AntDesign name="user" />}
                  size="sm"
                  ml="2"
                  color="muted.400"
                />
              }
              onChangeText={(text) => setAge(text)}
              placeholder="Age"
            />
            <TextField
              autoComplete="email"
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
              autoComplete="off"
              autoCorrect={false}
              secureTextEntry={showPassword}
              InputRightElement={
                <IconButton
                  icon={
                    showPassword ? (
                      <Icon
                        as={<AntDesign name="eye" />}
                        size="md"
                        color="muted.400"
                      />
                    ) : (
                      <Icon
                        as={<AntDesign name="eyeo" size={21} />}
                        size="md"
                        color="muted.400"
                      />
                    )
                  }
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              InputLeftElement={
                <Icon
                  as={<AntDesign name="lock" />}
                  size="sm"
                  ml="2"
                  color="muted.400"
                />
              }
              onChangeText={(text) => setPassword(text)}
              placeholder="Mot de passe"
            />

            <Button
              onPress={handleProfileChange}
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
              MODIFIER MON PROFILE
            </Button>
          </View>
        </ScrollView>
      )}
      {alert && (
        <Alert w="100%" mt="4" status="success">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: "coolGray.800",
                  }}
                >
                  Votre commande a été enregistrée!
                </Text>
              </HStack>
              <TouchableOpacity>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: "coolGray.600",
                  }}
                  onPress={() => setAlert(false)}
                />
              </TouchableOpacity>
            </HStack>
            <Box
              pl="6"
              _dark={{
                _text: {
                  color: "coolGray.600",
                },
              }}
            >
              Votre commande est en cours de traitement. Vous pouvez voir son
              status dans votre compte.
            </Box>
          </VStack>
        </Alert>
      )}
      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
    </NativeBaseProvider>
  );
};

export default EditProfile;
