import Image from "next/image";
import VoiceComponent from "@/components/VoiceComponent";
import {useVoiceChat} from '@/context/VoiceChatContexts';
import { motion, AnimatePresence } from "framer-motion";


export default function CarlaWidget({ isSpeaking }: { isSpeaking: boolean }) {
  console.log("Rendering CarlaWidget with isSpeaking:", isSpeaking);
  
  const {hasPermissionContext} = useVoiceChat();
  console.log("hasPermissionContext:", hasPermissionContext);


  return (
    <div className="relative flex flex-col py-4 items-center justify-center text-center w-[300px]  mx-auto top-7">
      {/* Aura animada */}
      <div className="relative w-48 h-48 flex items-center gap-2 justify-center">
        {isSpeaking && (
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              key="aura"
              className="absolute w-full h-full rounded-full bg-[#e2dad1] shadow-[0_0_40px_#e2dad1] -z-10"
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </AnimatePresence>

        )}

        {/* Avatar */}
        <Image
          src="/assets/carla_real_state.png"
          alt="Carla M&M"
          width={170}
          height={170}
          className="relative z-10  rounded-full object-cover"
        />
      </div>

      {/* Nombre y subtítulo abajo del avatar */}
      <VoiceComponent />

      {!hasPermissionContext && (
        <small className="text-xs text-gray-500 my-4">
          La app requiere acceso al micrófono
        </small>
      )}
    </div>
  );
}
