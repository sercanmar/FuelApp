import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View, Image } from 'react-native';
import { getEstacion } from '../../core/actions/fuel.action';

const imagenGenerica = require('../../assets/images/react-logo.png');

export default function PantallaEstacion() {
  const { id } = useLocalSearchParams();
  const idEstacion = Array.isArray(id) ? id[0] : id;

  const { data: datosApi, isLoading, isError } = useQuery({
    queryKey: ['estacion', idEstacion], 
    queryFn: () => getEstacion(idEstacion as string),
    enabled: !!idEstacion,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>cargando estacion...</Text>
      </View>
    );
  }

  if (isError || !datosApi) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">error al cargar estacion</Text>
      </View>
    );
  }
  const estacion = Array.isArray(datosApi) ? datosApi[0] : datosApi;
  if (!estacion) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">No se encontraron datos de esta estación</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Stack.Screen options={{ title: estacion.nombreEstacion || 'Estación' }} />

      <View className="items-center mb-6 border-b border-gray-200 pb-4">
        <Image 
          source={imagenGenerica} 
          className="w-24 h-24 mb-2 rounded-full bg-gray-100" 
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-blue-800 text-center">
            {estacion.nombreEstacion}
        </Text>
        <Text className="text-gray-500 text-center">{estacion.direccion}</Text>
        <Text className="text-gray-400 text-center">{estacion.codPostal} - {estacion.localidad}</Text>
        <Text className="text-gray-400 text-center">{estacion.provincia}</Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold mb-2">Información:</Text>
        
        <Text className="text-base mb-1">
            <Text className="font-bold">Horario: </Text>{estacion.horario}
        </Text>
        
        <Text className="text-base mb-1">
            <Text className="font-bold">Margen: </Text>{estacion.margen}
        </Text>

        <Text className="text-base mb-1">
            <Text className="font-bold">Tipo Venta: </Text>{estacion.tipoVenta}
        </Text>
      </View>

      <Text className="text-lg font-bold mb-3">Precios Actuales:</Text>

      <View className="flex-row flex-wrap gap-3 pb-10">
        
        {estacion.Gasolina95 && (
            <View className="bg-green-100 px-4 py-2 rounded w-full">
                <Text className="text-green-800 font-bold text-lg">
                    Gasolina 95: {estacion.Gasolina95} €
                </Text>
            </View>
        )}

        {estacion.Diesel && (
            <View className="bg-slate-100 px-4 py-2 rounded w-full">
                <Text className="text-slate-800 font-bold text-lg">
                    Diesel: {estacion.Diesel} €
                </Text>
            </View>
        )}

        {estacion.Gasolina98 && (
            <View className="bg-green-50 px-4 py-2 rounded w-full border border-green-100">
                <Text className="text-green-700 text-lg">
                    Gasolina 98: {estacion.Gasolina98} €
                </Text>
            </View>
        )}

        {estacion.DieselPremium && (
            <View className="bg-slate-200 px-4 py-2 rounded w-full">
                <Text className="text-slate-900 text-lg">
                    Diesel +: {estacion.DieselPremium} €
                </Text>

            </View>
        )}

        {estacion.GLP_media && (
            <View className="bg-orange-100 px-4 py-2 rounded w-full">
                <Text className="text-orange-800 font-bold text-lg">
                    GLP: {estacion.GLP_media} €
                </Text>
            </View>
        )}

              <Text className="text-lg font-bold mb-3">Precios Historicos:</Text>


      </View>

    </ScrollView>
  );
}