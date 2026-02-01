import { useQuery } from '@tanstack/react-query';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { getMunicipios } from '../../core/api/fuel-api';

export default function PantallaMunicipios() {
  const { id } = useLocalSearchParams();
  const idProvincia = Array.isArray(id) ? id[0] : id;

  const { data: municipios, isLoading, isError } = useQuery({
    queryKey: ['municipios', idProvincia], 
    queryFn: () => getMunicipios(idProvincia as string),
    enabled: !!idProvincia,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>cargando municipios...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">error al cargar municipios</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Stack.Screen options={{ title: 'Municipios' }} />
      
      <Text className="text-xl font-bold mb-4 text-center">
        Selecciona un Municipio
      </Text>

      <FlatList
        data={municipios}
        keyExtractor={(item) => item.idMunicipio.toString()} 
        renderItem={({ item }) => (
          <Link href={`/estaciones/${item.idMunicipio}` as any} asChild>
             <Text className="p-4 text-lg border-b border-gray-200 active:bg-gray-100">
               {item.nombreMunicipio}
             </Text>
          </Link>
        )}
      />
    </View>
  );
}