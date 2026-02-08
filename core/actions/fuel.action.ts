import {fuelApi} from '../api/fuel-api'
import { EstacionRadio } from '@/core/interfaces/fuel-model';

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
export const getEstacionesPorRadio = async (lat: number, lon: number, radio: number = 10) => {
  
  const { data } = await fuelApi.get<EstacionRadio[]>('/estaciones/radio', {
    params: {
      latitud: lat,
      longitud: lon,
      radio: radio,
      pagina: 1,
      limite: 20
    }
  });
  
  return data;
};
