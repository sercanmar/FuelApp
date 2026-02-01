import axios from 'axios';
import { Provincia, Municipio,Estacion } from '../interfaces/fuel-model';

const fuelApi = axios.create({
  baseURL: 'https://api.precioil.es'
});

export const getProvincias = async (): Promise<Provincia[]> => {
  const { data } = await fuelApi.get<Provincia[]>('/provincias');
  return data;
};

export const getMunicipios = async (idProvincia: string): Promise<Municipio[]> => {
  const { data } = await fuelApi.get<Municipio[]>(`/municipios/provincia/${idProvincia}`);
  return data;
};
export const getEstaciones = async (idMunicipio: string): Promise<Estacion[]> => {
  const { data } = await fuelApi.get<Estacion[]>(`/estaciones/municipio/${idMunicipio}`);
  return data;
};