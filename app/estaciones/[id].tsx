import { useQuery } from '@tanstack/react-query';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { getEstaciones } from '../../core/actions/fuel.action';

const imagenGenerica = require('../../assets/images/react-logo.png');

export default function PantallaEstaciones() {
  const { id } = useLocalSearchParams();
  const idMunicipio = Array.isArray(id) ? id[0] : id;

  const { data: estaciones, isLoading, isError } = useQuery({
    queryKey: ['estaciones', idMunicipio], 
    queryFn: () => getEstaciones(idMunicipio as string),
    enabled: !!idMunicipio,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>cargando estaciones...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">error al cargar estaciones</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Stack.Screen options={{ title: 'Estaciones' }} />
      
      <Text className="text-xl font-bold mb-4 text-center">
        Selecciona una estación
      </Text>

      <FlatList
        data={estaciones}
        keyExtractor={(item) => item.idEstacion.toString()} 
        renderItem={({ item }) => (
          <Link href={`/estacion/${item.idEstacion}` as any} asChild>
             <TouchableOpacity className="flex-row p-4 border-b border-gray-200 active:bg-gray-100 items-center">
               
               <Image 
                source={imagenGenerica} 
                className="w-16 h-16 mr-4 rounded-full bg-gray-100"
                resizeMode="contain"
              />
               
               <View className="flex-1">
                  <Text className="text-lg font-bold text-blue-800">{item.nombreEstacion}</Text>
                  <Text className="text-gray-500">{item.direccion}</Text>
                  <Text className="text-gray-500 mb-2">{item.codPostal}</Text>

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

                    {item.Gasolina98 && (
                      <View className="bg-green-50 px-2 py-1 rounded border border-green-100">
                        <Text className="text-green-700 text-xs">
                          G98: {item.Gasolina98}€
                        </Text>
                      </View>
                    )}
    
                    {item.GLP_media && (
                      <View className="bg-orange-100 px-2 py-1 rounded">
                        <Text className="text-orange-800 text-xs font-bold">
                          GLP: {item.GLP_media}€
                        </Text>
                      </View>
                    )}
                  </View>
               </View>

             </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}