
"use client";

import React, { useRef ,createContext, useContext, useState } from "react";
import {Auto} from "@/custom/useWebSocket"; // Ajusta la ruta según tu estructura de carpetas

export type Message = {
  id?: string;
  text: string;
  source?: "user" | "agent" | "ai" |string;
  timestamp?: number;
};

type VoiceChatContextType = {
  messagesVoicesUser: Message[];
  addMessageUser: (message: Message) => void;
    messagesVoicesAi: Message[];
    addMessageAi: (message: Message) => void;
   hasPermissionContext: boolean;
    setHasPermissionContext: React.Dispatch<React.SetStateAction<boolean>>;
    stopRecording: () => void;
    statusConversation: string;
    setStatusConversation: React.Dispatch<React.SetStateAction<string>>;
    isAgentSpeaking: boolean;
    setIsAgentSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
    recording: boolean;
    transcription: string | null;
    setMessagesConversation:React.Dispatch<React.SetStateAction<Message[]>>;
    messagesConversation: Message[]
    propsUi: Auto[];
  setPropsUi: React.Dispatch<React.SetStateAction<Auto[]>>;
};



const VoiceChatContext = createContext<VoiceChatContextType | undefined>(undefined);

export const VoiceChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messagesVoicesUser, setMessagesVoicesUser] = useState<Message[]>([]);
  const [messagesVoicesAi, setMessagesVoicesAi] = useState<Message[]>([]);
  const [propsUi , setPropsUi] = useState<Auto[]>([]); 

  const [statusConversation, setStatusConversation] = useState<string>("");
  const [isAgentSpeaking, setIsAgentSpeaking] = useState<boolean>(false);
  const [hasPermissionContext, setHasPermissionContext] = useState<boolean>(false);

   const [recording, setRecording] = useState(false);
    const [transcription, setTranscription] = useState<string | null>(null);
    const [messagesConversation, setMessagesConversation] = useState<Message[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

  const addMessageUser = (message: Message) => {
    setMessagesVoicesUser((prev) => [...prev, message]);
  };

  const addMessageAi = (message: Message) => {
    setMessagesVoicesAi((prev) => [...prev, message]);  }

    


 
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <VoiceChatContext.Provider value={{ messagesVoicesUser, addMessageUser, messagesVoicesAi, addMessageAi, stopRecording, recording, transcription , setMessagesConversation, messagesConversation, isAgentSpeaking, setIsAgentSpeaking, statusConversation, setStatusConversation, hasPermissionContext, setHasPermissionContext, setPropsUi, propsUi }}>
      {children}
    </VoiceChatContext.Provider>
  );
};

export const useVoiceChat = () : VoiceChatContextType=> {
  const context = useContext(VoiceChatContext);
  if (!context) {
    throw new Error("useVoiceChat must be used within a VoiceChatProvider");
  }
  return context;
}

