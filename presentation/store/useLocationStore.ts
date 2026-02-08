import { create } from 'zustand';
import { getCurrentLocation, watchCurrentPosition, LatLng } from '@/core/actions/location';
import { LocationSubscription } from 'expo-location';

interface LocationState {
    lastKnownLocation: LatLng | null;
    userLocationList: LatLng[];
    watchId: LocationSubscription | null; 

    getLocation: () => Promise<LatLng | null>;
    watchLocation: () => Promise<void>;
    clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
    lastKnownLocation: null,
    userLocationList: [],
    watchId: null,

    getLocation: async () => {
        const location = await getCurrentLocation();
        set({ lastKnownLocation: location });
        return location;
    },

    watchLocation: async () => {
        const oldWatchId = get().watchId;
        if (oldWatchId) {
            oldWatchId.remove();
        }

        const watchId = await watchCurrentPosition((location) => {
            set((state) => ({
                lastKnownLocation: location,
                userLocationList: [...state.userLocationList, location]
            }));
        });

        set({ watchId });
    },

    clearWatchLocation: () => {
        const watchId = get().watchId;
        if (watchId) {
            watchId.remove();
        }
        set({ watchId: null, userLocationList: [] });
    }
}));