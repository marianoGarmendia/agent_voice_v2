// interfaces.ts
export interface Propietario {
  nombre: string;
  apellido: string;
  telefono_movil?: string;
}

export interface Geo {
  latitude: string;
  longitude: string;
}

export interface PropsUI {
  id_product: number;
  nombre: string;
  precio: number;
  zona: string;
  ciudad: string;
  estado: string;
  dormitorios: number;
  banios: number;
  piscina: boolean;
  img_url: string;
  propietario: Propietario;
  geolocalizacion: Geo;
}
