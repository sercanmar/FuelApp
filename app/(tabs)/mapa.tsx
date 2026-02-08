import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import { useQuery } from '@tanstack/react-query';

import { getEstacionesPorRadio } from '@/core/actions/fuel.action';

export default function MapScreen() {
  const { lastKnownLocation, watchLocation, clearWatchLocation } = useLocationStore();
  const mapRef = useRef<MapView>(null);
  const { data: estaciones } = useQuery({
    queryKey: ['estaciones-radio', lastKnownLocation?.latitude, lastKnownLocation?.longitude],
    
    queryFn: () => getEstacionesPorRadio(
        lastKnownLocation!.latitude, 
        lastKnownLocation!.longitude, 
        10 
    ),
    enabled: !!lastKnownLocation, 
  });

  useEffect(() => {
    watchLocation();
    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: lastKnownLocation.latitude,
          longitude: lastKnownLocation.longitude,
        },
        zoom: 14,
      });
    }
  }, [lastKnownLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
            latitude: 39.46975,
            longitude: -0.37739,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
      >
        {estaciones?.map((estacion) => (
            <Marker
              key={estacion.idEstacion} 
              coordinate={{
                latitude: estacion.latitud,   
                longitude: estacion.longitud, 
              }}
              title={estacion.nombreEstacion}
              description={`G95: ${estacion.Gasolina95}€ | Diesel: ${estacion.Diesel}€`}
            />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});