import { th } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import { set } from "zod";

type PropsMessage = {
  type: "props";
  data: any[];
};

type PingMessage = {
  type: "ping";
};

type UIMessage = {
  type: "ui";
  data: any;
};

type ParamsWebSocket = {
    thread_id: string  | null;
    url: string;
    runId: string | null;
    runIdConfig: string     | null;
}

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
  fechas_ocupado: string[]; // si fueran Date: Date[]
  img_url: string;
  activo: boolean;
}

export interface PropCardItem  {
  id: string;
  image_url?: string;
  direccion: string;
  caracteristicas: string[];
  moneda: string;
  precio: string;
  url?: string;
};



type ServerMessage = PropsMessage | PingMessage | UIMessage;


export function transformarInmueblesParaCards(data: any[]): PropCardItem[] {
  return data.map((item) => {
    const props = item.PROPS;
    return {
      id: props.id,
      image_url: item.R_IMG?.[0]?.LOCATION ?? undefined,
      direccion: props.direccion || "Dirección no disponible",
      caracteristicas: props.caracteristicas || [],
      moneda: props.moneda || "",
      precio: props.precio || "",
      url: `/inmueble/${props.id}`, // podés ajustar esta URL según tu routing
    };
  });
}

export function useWebSocket({url, thread_id, runId, runIdConfig}:ParamsWebSocket) {
  const [props, setProps] = useState<PropCardItem[]>([]); 
  const [propsToParsed , setPropsToParsed] = useState<any[]>([]); // Para almacenar los props para parsear
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url || !thread_id || !runId || !runIdConfig) {
      console.log("Faltan parametros para inicializar el websocket");
      
      return;
    }

    console.log("Conectando al WebSocket en:", url);
    console.log("Thread ID:", thread_id);
    console.log("Run ID Config:", runIdConfig);
    console.log("Run ID:", runId);
    

    const socket = new WebSocket(url);
    socketRef.current = socket;

    

    socket.onopen = () => {
      console.log("WebSocket conectado");

      socket.send(
      JSON.stringify({
        type: "register",
        thread_id, // este ID lo deberías generar/gestionar desde el frontend
        runIdConfig, // este ID lo deberías generar/gestionar desde el frontend
        runId, // este ID lo deberías generar/gestionar desde el frontend
      })
    );
    };

    socket.onmessage = (event) => {
      try {
        const msg: ServerMessage = JSON.parse(event.data);

        console.log("Mensaje recibido del servidor:", msg);
        
        if (msg.type === "props") {
          console.log("Props recibidos:", msg.data);
          setPropsToParsed(msg.data);
        }else if(msg.type === "ui"){
            console.log("UI message received:", msg.data);
            setProps(msg.data.props);
            // Aquí puedes manejar el mensaje de UI según sea necesario
        } else if(msg.type === "ping") {
          // opcional: console.log("Ping del servidor");
        }
      } catch (error) {
        console.error("Error al parsear mensaje:", error);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.warn("WebSocket desconectado");
    };

    return () => {
      socket.close();
    };
  }, [url , thread_id, runId, runIdConfig]);



  // Si hay props parsearlas para que puedan ser bien rendereadas en el componente
  useEffect(() => {
    if(propsToParsed.length > 0) {
      const transformedProps = transformarInmueblesParaCards(propsToParsed);
      setProps(transformedProps);}

  },[propsToParsed]);


  return { props };
}
