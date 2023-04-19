import { useEffect, useState } from "react";
import Mapbox, { Callout } from "@rnmapbox/maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeRequest } from "../../makeRequest";
import { Text, View, Button, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons/build/Icons";
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
  Mapbox.setAccessToken(
    "pk.eyJ1Ijoic2tpbGx6ZGV2IiwiYSI6ImNsZThrbmV0NjA3NjEzeW8zZTNoN3NremEifQ.J2OUiRda51tADGWwnH-cuw"
  );
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
          <Mapbox.MapView
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <Mapbox.Camera
              zoomLevel={4.5}
              centerCoordinate={[3.3, 34.666667]}
            />
            {pins.map((pin) => (
              //show pin with description
              <Mapbox.PointAnnotation
                title={pin.title}
                key={pin._id}
                id={pin._id}
                coordinate={[pin.long, pin.lat]}
                onSelected={() => {
                  navigation.navigate("Details", {
                    id: pin._id,
                  });
                }}
              />
            ))}
          </Mapbox.MapView>
        </>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
