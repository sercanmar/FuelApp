import React, { useEffect, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import { useLocationStore } from '@/presentation/store/useLocationStore';

interface Props extends SafeAreaViewProps {
    showUserLocation?: boolean;
    initialLocation?: LatLng;
    children?: React.ReactNode;
}

const CustomMap = ({ 
    showUserLocation = true, 
    initialLocation, 
    children, 
    style,
    ...rest 
}: Props) => {

    const mapRef = useRef<MapView>(null);
    const { watchLocation, clearWatchLocation, lastKnownLocation } = useLocationStore();
    useEffect(() => {
        watchLocation();
        return () => {
            clearWatchLocation();
        }
    }, []);



    if (initialLocation === undefined) {
        initialLocation = {
            latitude: 39.46975,
            longitude: -0.37739
        }
    }

    return (
        <SafeAreaView style={[styles.container, style as ViewStyle]} {...rest}>
            <MapView
                ref={mapRef} 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={showUserLocation}
                showsMyLocationButton={true}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {children}
            </MapView>
        </SafeAreaView>
    );
};

export default CustomMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    }
});