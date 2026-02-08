import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Marker } from 'react-native-maps';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import { useQuery } from '@tanstack/react-query';
import { getEstacionesPorRadio } from '@/core/actions/fuel.action';
import CustomMap from '@/presentation/components/shared/CustomMap';

export default function MapScreen() {
  const [radioKm, setRadioKm] = useState(5);
  const { lastKnownLocation } = useLocationStore();

  const { data: estaciones } = useQuery({
    queryKey: ['estaciones-radio', lastKnownLocation?.latitude, lastKnownLocation?.longitude, radioKm],
    queryFn: () => getEstacionesPorRadio(
        lastKnownLocation!.latitude, 
        lastKnownLocation!.longitude, 
        radioKm 
    ),
    enabled: !!lastKnownLocation, 
  });

  return (

    <View style={styles.container}>

        <CustomMap 
            initialLocation={{
                latitude: 39.46975,
                longitude: -0.37739,
            }}
        >
            {estaciones?.map((estacion) => (
                <Marker
                  key={`${estacion.idEstacion}-${radioKm}`} 
                  coordinate={{
                    latitude: estacion.latitud,   
                    longitude: estacion.longitud, 
                  }}
                  title={estacion.nombreEstacion}
                  description={`G95: ${estacion.Gasolina95}€ | Diesel: ${estacion.Diesel}€`}
                  tracksViewChanges={false}
                />
            ))}
        </CustomMap>
        <View style={styles.filterContainer}>
            <Text style={styles.filterTitle}>Radio de búsqueda:</Text>
            <View style={styles.buttonRow}>
                <Pressable 
                    style={[styles.radioBtn, radioKm === 1 && styles.radioBtnActive]}
                    onPress={() => setRadioKm(1)}
                >
                    <Text style={[styles.radioText, radioKm === 1 && styles.radioTextActive]}>1 km</Text>
                </Pressable>

                <Pressable 
                    style={[styles.radioBtn, radioKm === 5 && styles.radioBtnActive]}
                    onPress={() => setRadioKm(5)}
                >
                    <Text style={[styles.radioText, radioKm === 5 && styles.radioTextActive]}>5 km</Text>
                </Pressable>

                <Pressable 
                    style={[styles.radioBtn, radioKm === 10 && styles.radioBtnActive]}
                    onPress={() => setRadioKm(10)}
                >
                    <Text style={[styles.radioText, radioKm === 10 && styles.radioTextActive]}>10 km</Text>
                </Pressable>
            </View>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    filterContainer: {
        position: 'absolute', 
        top: 60, 
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterTitle: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    radioBtn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    radioBtnActive: {
        backgroundColor: 'black',
        borderColor: 'black'
    },
    radioText: {
        color: 'black',
        fontWeight: '600'
    },
    radioTextActive: {
        color: 'white' 
    }
});