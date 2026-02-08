import { StyleSheet } from 'react-native'
import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import { useEffect, useRef } from 'react';

interface Props {
  showUserLocation?: boolean;
  initialLocation?: LatLng;
  children?: React.ReactNode; 
}
const CustomMap = ({ showUserLocation = true, initialLocation, children }: Props) => {
  if (initialLocation === undefined) {
    initialLocation = {
      latitude: 39.459520762987665,
      longitude: -0.47044131140655987
    }
  }
  const mapRef = useRef<MapView>(null);
  const { watchLocation, clearWatchLocation } = useLocationStore();
 useEffect(() => {
    watchLocation();
    return () => {
      clearWatchLocation();
    }
  }, []);



  const moveCameraToLocation = (latLng: LatLng) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({
      center: latLng
    })
  }

  return (
    <SafeAreaView>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        showsUserLocation={showUserLocation}

        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0
        }}
      >
        {children}
        </MapView>
    </SafeAreaView>
  )
}
export default CustomMap; const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'red'
  }
});
