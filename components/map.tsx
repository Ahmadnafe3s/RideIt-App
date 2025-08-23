import React from 'react';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

export default function Map() {
    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onMapReady={() => console.log('Map is ready')}
            onRegionChangeComplete={region => console.log('Region changed:', region)}
        />
    );
}