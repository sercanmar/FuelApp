import { useEffect } from 'react';
import { AppState } from 'react-native';
import { router, usePathname } from 'expo-router';
import { PermissionStatus } from '@/infrastructure/interfaces/location';
import { usePermissionStore } from '@/presentation/store/usePermissionStore';

export const PermissionsCheckerProvider = ({ children }: { children: React.ReactNode }) => {
  const { locationStatus, checkLocationPermission } = usePermissionStore();
  const pathname = usePathname();

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {

      router.replace('/' as any);
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace('/permissions' as any);
    }
  }, [locationStatus]);

  return <>{children}</>;
};