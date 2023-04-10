import React from "react";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
export default function MapViewer() {
  return (
    <SafeAreaView>
      <MapView style={{ width: "100%", height: "100%" }} />
    </SafeAreaView>
  );
}
