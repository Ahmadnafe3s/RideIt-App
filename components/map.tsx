import { calculateRegion } from "@/lib/map";
import { useLocationStore } from "@/store/useLocationStore";
import React from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

export default function Map() {

  const { userLatitude, userLongitude, destinationLatitude, destinationLongitude } = useLocationStore()

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude
  })

  if (!region) {
    return <Text>Loading map...</Text>
  }

  return (
    <View style={{ flex: 1, borderRadius: 16, overflow: "hidden" }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        mapType="terrain"
        tintColor="black"
        showsPointsOfInterest={false}
        showsUserLocation={true}
        userInterfaceStyle="light"
        initialRegion={region}
      />

      <View>

      </View>
    </View>
  );
}
