import { useEffect, useState } from "react";
import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeRequest } from "../../makeRequest";
import { Text, View, Button, ActivityIndicator } from "react-native";
import tw from "twrnc";
export default function MapViewer({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const result = await makeRequest.get("/pins/pure");
        setPins(result.data.pins);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);
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
