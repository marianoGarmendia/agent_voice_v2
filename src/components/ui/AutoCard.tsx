import Image from "next/image";

export interface Auto {
  id: number;
  marca: string;
  modelo: string;
  tipo: string;
  precio_diario: number;
  cantidad_pasajeros: number;
  combustible: string;
  automatico: boolean;
  tiene_aire: boolean;
  tiene_gps: boolean;
  tiene_bebesilla: boolean;
  fechas_ocupado: string[];
  img_url: string;
  activo: boolean;
}

export interface AutoCardProps {
  auto: Auto;
}

export default function AutoCard({ auto }: AutoCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl" data-id={auto.id}>
      <Image
        src={
          auto.img_url ||
          "https://blog.wasi.co/wp-content/uploads/2019/07/claves-fotografia-inmobiliaria-exterior-casa-software-inmobiliario-wasi.jpg"
        }
        alt={`${auto.marca} ${auto.modelo}`}
        width={400}
        height={192}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
         <p className="mb-2 text-sm text-gray-600">
          {`${auto.marca}, Modelo: ${auto.modelo}`}
        </p>
        <p className="mb-2 text-sm text-gray-600">
          {`${auto.tipo}, ${auto.cantidad_pasajeros} pasajeros, ${auto.combustible}, ${auto.automatico ? "Automático" : "Manual"}`}
        </p>
        <p className="text-lg font-bold text-green-600">
          ${auto.precio_diario} / día
        </p>
        <div className="mt-2 text-sm text-gray-700 space-y-1">
          <p>{auto.tiene_aire ? "✔️ Aire Acondicionado" : "❌ Sin Aire"}</p>
          <p>{auto.tiene_gps ? "✔️ GPS" : "❌ Sin GPS"}</p>
          <p>{auto.tiene_bebesilla ? "✔️ Silla para bebé" : "❌ Sin silla"}</p>
        </div>
        <div className="mt-2">
          <span className="text-xs text-gray-500">
            {auto.activo ? "Disponible" : "No disponible"}
          </span>
        </div>
      </div>
    </div>
  );
}
