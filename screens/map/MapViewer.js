import React from "react";
import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeRequest } from "../../makeRequest";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
export default function MapViewer({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [pins, setPins] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await makeRequest.get("/pins/pure");
        setPins(result.data.pins);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView>
      {loading && (
        <View
          style={{
            display: "flex",
            marginTop: 300,
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
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: 30.583316,
              longitude: 2.88367,
              latitudeDelta: 10,
              longitudeDelta: 10,
            }}
          >
            {pins.map((pin) => (
              <Marker
                key={pin._id}
                coordinate={{
                  latitude: pin.lat,
                  longitude: pin.long,
                }}
              >
                <Callout
                  onPress={() => {
                    navigation.navigate("Details", { id: pin._id });
                  }}
                >
                  <Text style={tw`text-lg text-gray-800 font-semibold`}>
                    {pin.title}
                  </Text>
                  <View style={tw`mt-2`}>
                    <Button title="PLUS DE DETAILS" />
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },

  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 150,
    width: 150,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
