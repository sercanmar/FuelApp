import {fuelApi} from '../api/fuel-api'

import { Provincia, Municipio,Estacion } from '../interfaces/fuel-model';


export const getProvincias = async (): Promise<Provincia[]> => {
  const { data } = await fuelApi.get<Provincia[]>('/provincias');
  return data;
};

export const getMunicipios = async (idProvincia: string) => {
  const { data } = await fuelApi.get<Municipio[]>(`/municipios/provincia/${idProvincia}`);
  return data;
};
export const getEstaciones = async (idMunicipio: string) => {
  const { data } = await fuelApi.get<Estacion[]>(`/estaciones/municipio/${idMunicipio}`);
  return data;
};

export const getEstacion = async (idEstacion: string) => {
  const { data } = await fuelApi.get<Estacion[]>(`/estaciones/detalles/${idEstacion}`);
  return data;
};

export const getHistorico = async (idEstacion: string) => {
  const { data } = await fuelApi.get<Estacion[]>(`/estaciones/historico/${idEstacion}`);
  return data;
};