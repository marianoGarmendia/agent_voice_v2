// AutoCard.tsx
import React from "react";
import { PropsUI } from "./interface";

interface AutoCardProps {
  prop: PropsUI;
}

const PropCard: React.FC<AutoCardProps> = ({ prop }) => {
  const {
    nombre,
    precio,
    zona,
    ciudad,
    estado,
    dormitorios,
    banios,
    piscina,
    img_url,
  } = prop;

  const disponible = estado.toLowerCase() === "disponible";

  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <img
        src={img_url}
        alt={nombre}
        className="w-full h-48 md:h-auto md:w-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">{nombre}</h2>
          <p className="text-gray-600 text-sm mb-2">{zona}, {ciudad}</p>
          <p className="text-lg font-bold mb-2">€{precio.toLocaleString()}</p>
          <div className="flex items-center text-gray-700 text-sm mb-2 space-x-4">
            <span>{dormitorios} hab.</span>
            <span>{banios} baños</span>
            {piscina && (
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                Piscina
              </span>
            )}
          </div>
        </div>
        <div className="mt-4">
          {disponible ? (
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
              Disponible
            </span>
          ) : (
            <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold">
              {estado}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropCard;
