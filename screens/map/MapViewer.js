import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeRequest } from "../../makeRequest";
import { Text } from "react-native";
export default function MapViewer() {
  const [loading, setLoading] = React.useState(true);
  const [pins, setPins] = React.useState([]);
  React.useEffect(() => {
    const fetchPins = async () => {
      try {
        const result = await makeRequest.get("/pins/pure");
        setPins(result.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPins();
  }, []);
  return (
    <SafeAreaView>
      {loading && <Text>Loading...</Text>}
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
          />
          {pins.map((pin) => (
            <Marker
              key={pin._id}
              coordinate={{
                latitude: pin.lat,
                longitude: pin.long,
              }}
              title={pin.title}
              description={pin.desc}
            />
          ))}
        </>
      )}
    </SafeAreaView>
  );
}
