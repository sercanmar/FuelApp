import * as Location from 'expo-location';

export interface LatLng {
    latitude: number;
    longitude: number;
}

export const getCurrentLocation = async (): Promise<LatLng> => {
    try {
        const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest, 
        });

        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
        };
    } catch (error) {
        throw new Error('Error al obtener la ubicación');
    }
};
export const watchCurrentPosition = async (
    callback: (location: LatLng) => void
): Promise<Location.LocationSubscription> => {
    return await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000, 
            distanceInterval: 10, 
        },
        (location) => {
            callback({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        }
    );
};