import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { makeRequest } from "../../makeRequest";
import tw from "twrnc";
import { TextInput } from "react-native";
import { Image } from "react-native";
import {
  Alert,
  Box,
  Button,
  CloseIcon,
  HStack,
  IconButton,
  NativeBaseProvider,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
const ForgotPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);
  const handlePasswordReset = async () => {
    setIsLoading(true);
    try {
      const res = await makeRequest.post("/reset/forgot-password", {
        email: email,
      });
      if (res.status === 200) {
        setAlert(true);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <NativeBaseProvider>
      <View
        style={{
          ...tw`flex items-center justify-center mt-42 px-2`,
        }}
      >
        <View style={tw`flex flex-row items-center justify-center gap-1 mb-3`}>
          <Text style={tw`text-black text-2xl font-bold`}>DZHIKERS</Text>
          <Image
            source={require("./../../assets/noback.png")}
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
            }}
          />
        </View>
        <TextInput
          style={{
            ...tw`border-2 border-gray-300 rounded-lg px-2 py-3 text-lg`,
            width: "85%",
          }}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Button
          mt={5}
          w="5/6"
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
          onPress={handlePasswordReset}
        >
          Envoyer le lien de verification
        </Button>
        {isLoading && (
          <View
            style={{
              ...tw`flex items-center justify-center mt-5`,
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
      <View
        style={{
          ...tw`flex items-center justify-center`,
        }}
      >
        {error && (
          <Alert
            w="85%"
            mt="4"
            status="error"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
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
                    Une erreure est survenue!
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
                    onPress={() => setError(null)}
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
                {error}
              </Box>
            </VStack>
          </Alert>
        )}
      </View>
      <View
        style={{
          ...tw`flex items-center justify-center`,
        }}
      >
        {error && (
          <Alert
            w="85%"
            mt="4"
            status="success"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
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
                    Un email de verification a ete envoye a votre adresse!
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
                    onPress={() => setAlert(null)}
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
                Veuillez verifier votre boite de reception et cliquez sur le
                lien de verification pour reinitialiser votre mot de passe.
              </Box>
            </VStack>
          </Alert>
        )}
      </View>
    </NativeBaseProvider>
  );
};

export default ForgotPassword;
