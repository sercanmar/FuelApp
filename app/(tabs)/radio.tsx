import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import { useQuery } from '@tanstack/react-query';
import { getEstacionesPorRadio } from '@/core/actions/fuel.action';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const imagenGenerica = require('../../assets/images/react-logo.png');

export default function RadioScreen() {
  const [radioKm, setRadioKm] = useState(5);
  const { lastKnownLocation } = useLocationStore();

  const { data: estaciones, isLoading } = useQuery({
    queryKey: ['estaciones-radio', lastKnownLocation?.latitude, lastKnownLocation?.longitude, radioKm],
    queryFn: () => getEstacionesPorRadio(
        lastKnownLocation!.latitude, 
        lastKnownLocation!.longitude, 
        radioKm 
    ),
    enabled: !!lastKnownLocation, 
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Buscando gasolineras...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
        
        <View className="mb-4">
            <Text className="text-xl font-bold text-center mb-2">Radio de búsqueda: {radioKm} km</Text>
            <View className="flex-row justify-center gap-4">
                {[1, 5, 10, 20].map((km) => (
                    <TouchableOpacity
                        key={km}
                        onPress={() => setRadioKm(km)}
                        className={`px-4 py-2 rounded-full border ${radioKm === km ? 'bg-blue-800 border-blue-800' : 'bg-white border-gray-300'}`}
                    >
                        <Text className={`${radioKm === km ? 'text-white' : 'text-gray-700'} font-bold`}>
                            {km} km
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        <FlatList
            data={estaciones}
            keyExtractor={(item) => item.idEstacion.toString()}
            ListEmptyComponent={
                <Text className="text-center text-gray-500 mt-10">No hay gasolineras en este radio.</Text>
            }
            renderItem={({ item }) => (
            <Link href={`/estacion/mapa/${item.idEstacion}` as any} asChild>
                <TouchableOpacity className="flex-row p-4 border-b border-gray-200 active:bg-gray-100 items-center">
                
                <Image 
                    source={imagenGenerica} 
                    className="w-16 h-16 mr-4 rounded-full bg-gray-100"
                    resizeMode="contain"
                />
                
                <View className="flex-1">
                    <Text className="text-lg font-bold text-blue-800">{item.nombreEstacion}</Text>
                    <Text className="text-gray-500">{item.direccion}</Text>
    
                    <Text className="text-gray-400 text-xs mb-2">A {item.distancia.toFixed(1)} km de ti</Text>

                    <View className="flex-row flex-wrap gap-2">
                        {item.Gasolina95 && (
                        <View className="bg-green-100 px-2 py-1 rounded">
                            <Text className="text-green-800 text-xs font-bold">
                            G95: {item.Gasolina95}€
                            </Text>
                        </View>
                        )}

                        {item.Diesel && (
                        <View className="bg-slate-100 px-2 py-1 rounded">
                            <Text className="text-slate-800 text-xs font-bold">
                            Diesel: {item.Diesel}€
                            </Text>
                        </View>
                        )}
                    
                    </View>
                </View>

                </TouchableOpacity>
            </Link>
            )}
        />
    </SafeAreaView>
  );
}