
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
  idMunicipio: number;

  nombreEstacion: string;
  marca: string;
  direccion: string;
  codPostal: string;
  localidad: string;
  provincia: string;
  provinciaDistrito: string;

  latitud: string;
  longitud: string;
  margen: string; 

  horario: string;
  tipoVenta: string;
  lastUpdate: string;

  Gasolina95: string | null;
  Gasolina95_media: string | null;
  Gasolina98: string | null;
  Gasolina98_media: string | null;
  Diesel: string | null;
  Diesel_media: string | null;
  DieselPremium: string | null;
  DieselPremium_media: string | null;
  DieselB: string | null; 
  DieselB_media: string | null;
  GLP: string | null;
  GLP_media: string | null;

  Hidrogeno: string | null;
  GNC: string | null;
  GNL: string | null;
}