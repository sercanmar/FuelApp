import { Tabs } from 'expo-router';
import React from 'react';
import "../../global.css";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
       
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
         tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
     <Tabs.Screen
        name="mapa" 
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="map" color={color} />,
        }}
      />
    </Tabs>
  );
}
