import React, { useLayoutEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getEstacion, getEstacionesPorRadio } from '@/core/actions/fuel.action';
import CustomMap from '@/presentation/components/shared/CustomMap';
import { Marker } from 'react-native-maps';

export default function EstacionMapScreen() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const idEstacion = Array.isArray(id) ? id[0] : id;
    const { data: estacion, isLoading } = useQuery({
        queryKey: ['estacion', idEstacion],
        queryFn: () => getEstacion(idEstacion as string),
        enabled: !!idEstacion,
    });
    const currentEstacion = Array.isArray(estacion) ? estacion[0] : estacion;
    const { data: cercanas } = useQuery({
        queryKey: ['cercanas-mapa', currentEstacion?.latitud, currentEstacion?.longitud],
        queryFn: () => {
            if (!currentEstacion) return [];

            const lat = typeof currentEstacion.latitud === 'string' ? parseFloat(currentEstacion.latitud.replace(',', '.')) : currentEstacion.latitud;
            const lon = typeof currentEstacion.longitud === 'string' ? parseFloat(currentEstacion.longitud.replace(',', '.')) : currentEstacion.longitud;
            return getEstacionesPorRadio(lat, lon, 5); 
        },
        enabled: !!currentEstacion,
    });



    if (isLoading || !currentEstacion) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    const lat = typeof currentEstacion.latitud === 'string' ? parseFloat(currentEstacion.latitud.replace(',', '.')) : currentEstacion.latitud;
    const long = typeof currentEstacion.longitud === 'string' ? parseFloat(currentEstacion.longitud.replace(',', '.')) : currentEstacion.longitud;

    return (
        <View style={{ flex: 1 }}>
            <CustomMap
                initialLocation={{ latitude: lat, longitude: long }}
                showUserLocation={true}
            >

                <Marker 
                    coordinate={{ latitude: lat, longitude: long }}
                    title={currentEstacion.nombreEstacion}
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