import axios from 'axios';

export const fuelApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_PRECIOIL_API_URL
});

