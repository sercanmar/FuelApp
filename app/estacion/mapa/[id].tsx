import React, { useLayoutEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getEstacion, getEstacionesPorRadio } from '@/core/actions/fuel.action';
import CustomMap from '@/presentation/components/shared/CustomMap';
import { Marker } from 'react-native-maps';

export default function StationMapScreen() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const idEstacion = Array.isArray(id) ? id[0] : id;
    const { data: estacion, isLoading } = useQuery({
        queryKey: ['estacion', idEstacion],
        queryFn: () => getEstacion(idEstacion as string),
        enabled: !!idEstacion,
    });
    const currentStation = Array.isArray(estacion) ? estacion[0] : estacion;
    const { data: cercanas } = useQuery({
        queryKey: ['cercanas-mapa', currentStation?.latitud, currentStation?.longitud],
        queryFn: () => {
            if (!currentStation) return [];

            const lat = typeof currentStation.latitud === 'string' ? parseFloat(currentStation.latitud.replace(',', '.')) : currentStation.latitud;
            const lon = typeof currentStation.longitud === 'string' ? parseFloat(currentStation.longitud.replace(',', '.')) : currentStation.longitud;
            return getEstacionesPorRadio(lat, lon, 5); 
        },
        enabled: !!currentStation,
    });



    if (isLoading || !currentStation) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    const lat = typeof currentStation.latitud === 'string' ? parseFloat(currentStation.latitud.replace(',', '.')) : currentStation.latitud;
    const long = typeof currentStation.longitud === 'string' ? parseFloat(currentStation.longitud.replace(',', '.')) : currentStation.longitud;

    return (
        <View style={{ flex: 1 }}>
            <CustomMap
                initialLocation={{ latitude: lat, longitude: long }}
                showUserLocation={true}
            >

                <Marker 
                    coordinate={{ latitude: lat, longitude: long }}
                    title={currentStation.nombreEstacion}
                    pinColor="blue" 
                    style={{ zIndex: 999 }} 
                />

                {cercanas?.map((c) => {
                    if (c.idEstacion.toString() === idEstacion) return null;

                    return (
                        <Marker 
                            key={c.idEstacion}
                            coordinate={{ latitude: c.latitud, longitude: c.longitud }}
                            title={c.nombreEstacion}
                            description={`G95: ${c.Gasolina95}€ DIESEL:${c.Diesel}`}
        
                            onCalloutPress={() => router.push(`/estacion/${c.idEstacion}`)}
                        />
                    );
                })}
            </CustomMap>
        </View>
    );
}