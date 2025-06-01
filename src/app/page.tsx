"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CarlaWidget from "@/components/CarlaWidget";
import { useVoiceChat } from "@/context/VoiceChatContexts";
import ChatMessages from "@/components/ChatContainer";
import { div } from "framer-motion/client";

export default function Home() {
  const { isAgentSpeaking } = useVoiceChat();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 10000); // 10 segundos

    return () => clearTimeout(timeout);
  }, []);

   return (
    <main className="flex h-dvh flex-col">
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
                Especialista de Real State
              </p>
              <p>para inmobiliaria MYM</p>
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
          <div className="h-full mt-4   flex flex-col items-center justify-center  md:w-3/4 w-full">
          <CarlaWidget isSpeaking={isAgentSpeaking} />
          <div className="text-center mt-4 text-lg font-semibold text-gray-800 flex-1 md:w-3/4 w-full p-6 md:p-0">
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
