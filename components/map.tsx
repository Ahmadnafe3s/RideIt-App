import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

export default function Map() {
  return (
    <MapView
      className="flex-1 bg-green-500"
      provider={PROVIDER_DEFAULT}
      mapType="terrain"
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}
