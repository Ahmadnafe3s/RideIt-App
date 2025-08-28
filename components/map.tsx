import { icons } from "@/constants"
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from "@/lib/map"
import { DriverService } from "@/services/driver"
import { useDriverStore } from "@/store/useDriverStore"
import { useLocationStore } from "@/store/useLocationStore"
import { MarkerData } from "@/types/type"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"


export default function Map() {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore()

  const { setDrivers } = useDriverStore()

  const { selectedDriver } = useDriverStore()

  const [markers, setMarkers] = useState<MarkerData[]>([])

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  })


  const { data: drivers, isLoading, error, isError } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => DriverService.getDrivers(),
  })


  useEffect(() => {
    if (!Array.isArray(drivers)) return;
    if (!userLatitude || !userLongitude) return;

    const newMarkers = generateMarkersFromData({
      data: drivers as any,
      userLatitude,
      userLongitude,
    });

    setMarkers(newMarkers);
  }, [drivers, userLatitude, userLongitude]);


  useEffect(() => {
    if (markers.length > 0 && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[])
      });
    }
  }, [drivers, destinationLatitude, destinationLongitude])



  if (!region || isLoading) {
    return (
      <View className="flex-1 bg-white/50 justify-center items-center rounded-2xl">
        <ActivityIndicator size={40} color="black" />
      </View>
    )
  }


  if (isError) {
    return (
      <View className="flex-1 bg-white/50 justify-center items-center rounded-2xl">
        <Text>Error: {error?.message}</Text>
      </View>
    )
  }


  return (
    <View className="flex-1 rounded-2xl overflow-hidden">
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        mapType="terrain"
        tintColor="black"
        showsPointsOfInterest={false}
        showsUserLocation
        userInterfaceStyle="light"
        region={region}
        zoomEnabled
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            image={selectedDriver === marker._id ? icons.selectedMarker : icons.marker}
          />
        ))}
      </MapView>
    </View>
  )
}
