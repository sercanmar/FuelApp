import { View, Text } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { usePermissionStore } from '@/presentation/store/usePermissionStore';
import { PermissionStatus } from '@/infrastructure/interfaces/location';
import ThemedPressable from '@/presentation/components/shared/ThemedPressable';

const PermissionsScreen = () => {
    const { locationStatus, requestLocationPermission } = usePermissionStore();

    const handleRequest = async () => {
        const status = await requestLocationPermission();
        if (status === PermissionStatus.GRANTED) {
            router.replace('/(tabs)');
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>

            <Text style={{ marginBottom: 20, fontSize: 18 }}>
                Habilitar ubicación para mostrar mapa
            </Text>

            <ThemedPressable onPress={handleRequest}>
                Solicitar Permisos
            </ThemedPressable>

            <Text style={{ marginTop: 20, color: 'gray' }}>
                Estado actual: {locationStatus}
            </Text>
        </SafeAreaView>
    );
};

export default PermissionsScreen;