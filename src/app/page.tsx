"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CarlaWidget from "@/components/CarlaWidget";
import { useVoiceChat } from "@/context/VoiceChatContexts";
import ChatMessages from "@/components/ChatContainer";
import {useWebSocket} from "@/custom/useWebSocket";
import {usePersistentThreadId} from "@/custom/usePersistantThreadId";


export default function Home() {
  const { isAgentSpeaking , setPropsUi} = useVoiceChat();
  const [showIntro, setShowIntro] = useState(true);
  const {threadId , runId, runIdConfig} = usePersistentThreadId();
  const { props} = useWebSocket({url:"ws://uiconversationalrealstate-production.up.railway.app", thread_id: threadId ,runId    ,runIdConfig  });

  
  useEffect(() => {
    if (props.length > 0) {
      // console.log("Props desde WebSocket:", props);
      setPropsUi(props);
    }
  }, [props, setPropsUi]);

  


  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 10000); // 10 segundos

    return () => clearTimeout(timeout);
  }, []);

   return (
    <main className="flex flex-col h-screen ">
    <AnimatePresence mode="wait">
      {showIntro ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="top-0 flex flex-col items-center gap-4 bg-white min-h-screen justify-center"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              <Image
                src={"/assets/carla_real_state.png"}
                alt="Descripción de la imagen"
                width={170}
                height={170}
              />
            </div>
            <div className="flex items-center gap-2 py-2 text-center">
              <h1 className="text-2xl font-bold text-gray-800">Carla W.S</h1>
              <p className="text-xl text-gray-700">Agente IA</p>
            </div>

            <div className="mx-4 mb-6 rounded-lg bg-[#fef7ef] p-6 text-center">
              <p className="text-md mb-2 font-bold">
                Especialista Rent a Car
              </p>
              {/* <p>para inmobiliaria MYM</p> */}
            </div>

            <p className="text-center">
              En un momento tu Agente Carla atenderá tu solicitud
            </p>

            <div>
              <LoaderCircle className="h-4 w-4 animate-spin" />
            </div>
          </div>

          <p className="text-center text-sm text-gray-400">
            Powered by WinWinSaaS
          </p>
        </motion.div>
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden"
        >
          {/* <div className="absolute -z-10 w-[500px] h-full rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-[100px] animate-pulse" /> */}
          <div className="h-screen   flex flex-col items-center justify-center  md:w-3/4 w-full">
          <CarlaWidget isSpeaking={isAgentSpeaking} />
          <div className="text-lg font-semibold text-gray-800 flex-1 md:w-3/4 w-full p-6 md:p-0">
            <ChatMessages />
          </div>
          </div>
            
        </motion.main>
      )}
    </AnimatePresence>
    </main>
  );

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden  ">
  //     <div className="absolute -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-[100px] animate-pulse" />
  //     <CarlaWidget isSpeaking={isAgentSpeaking} />
  //   </main>
  // );
}
