import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProvincias } from '@/core/api/fuel-api';

export default function HomeScreen() {
  const { data: provincias, isLoading, isError } = useQuery({
    queryKey: ['provincias'],
    queryFn: getProvincias,
  });
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>cargando provincias</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-center">Provincias</Text>
      <FlatList
        data={provincias}
        keyExtractor={(item) => item.idProvincia.toString()}
        renderItem={({ item }) => (
          <Link href={`/municipios/${item.idProvincia}` as any} asChild>
            <Text className="p-4 text-lg border-b border-gray-200 active:bg-gray-100">
              {item.nombreProvincia}
            </Text>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}