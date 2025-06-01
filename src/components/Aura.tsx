import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceAvatar({ isSpeaking }: { isSpeaking: boolean }) {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center z-10">
      {/* Aura animada */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            className="absolute w-full h-full rounded-full bg-blue-500/40"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.3, 0.6] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Imagen del avatar */}
      <img
        src="/avatar.png" // Reemplazá con la ruta a tu imagen sin fondo
        alt="Agente Carla"
        className="relative z-10 w-32 h-32 object-contain"
      />
    </div>
  );
}
