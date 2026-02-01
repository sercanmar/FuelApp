
export interface Provincia {
  idProvincia: number;
  nombreProvincia: string;
}

export interface Municipio {
  idMunicipio: number;
  nombreMunicipio: string;
  idProvincia: number;
}
export interface Estacion {
  idEstacion: number;
  nombre: string;
  direccion: string;
  idMunicipio: number;
  latitud: number;
  longitud: number;
}