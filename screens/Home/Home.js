import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Home({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <SafeAreaView style={tw`pt-4`}>
      <View style={tw`flex flex-row items-center justify-between`}>
        <View style={tw`flex flex-row items-center gap-1 px-4`}>
          <Text style={tw` text-xl text-black font-black`}>DZHIKERS</Text>

          <Image
            source={require("./../../assets/noback.png")}
            style={{ width: 60, height: 60, resizeMode: "contain" }}
          />
        </View>
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
      </View>
      <View style={tw`mt-1 px-3`}>
        <View>
          <Text style={tw`text-2xl`}>
            Explorez <Text style={tw`font-bold`}>l'Algérie</Text> avec nous!
          </Text>
        </View>
        <View style={styles.container}>
          <Ionicons name="search" size={24} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Rechercher"
          />
          {searchText !== "" && (
            <TouchableOpacity onPress={handleClear}>
              <Ionicons
                name="close"
                size={24}
                color="gray"
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={tw`mt-3`}>
        <Text style={tw`font-semibold text-xl px-4`}>Nous offrons</Text>
        <View style={tw`flex flex-row gap-3 pt-2 px-2`}>
          <View style={tw`rounded-full bg-blue-500 px-4 py-2`}>
            <Text style={tw`text-lg text-white`}>Des randonées</Text>
          </View>
          <View style={tw`rounded-full bg-blue-500 px-4 py-2`}>
            <Text style={tw`text-lg text-white`}>Differents produits</Text>
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
        style={tw`pt-6 mx-[9px] `}
        contentContainerStyle={tw`flex flex-row items-center justify-center gap-2`}
      >
        <View>
          <Image
            source={require("./../../assets/hikers.jpg")}
            style={styles.image}
          />

          <Text
            style={tw`absolute bottom-2 left-2 text-white text-lg font-semibold`}
          >
            Randonées
          </Text>
        </View>

        <View>
          <Image
            source={require("./../../assets/chair.jpg")}
            style={styles.image}
          />
          <Text
            style={tw`absolute bottom-2 left-2 text-white text-lg font-semibold`}
          >
            Chaises
          </Text>
        </View>
        <View>
          <Image
            source={require("./../../assets/tante.jpg")}
            style={styles.image}
          />
          <Text
            style={tw`absolute bottom-2 left-2 text-white text-lg font-semibold`}
          >
            Tantes
          </Text>
        </View>
        <View style={tw``}>
          <Image
            source={require("./../../assets/clothes.jpg")}
            style={styles.image}
          />
          <Text
            style={tw`absolute bottom-2 left-2 text-white text-lg font-semibold`}
          >
            Vetements
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 245,
    borderRadius: 10,
    opacity: 0.8,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    marginTop: 17,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    elevation: 5,
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
