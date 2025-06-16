"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { Message } from "@/context/VoiceChatContexts"; // ajustá según tu ruta
import { useVoiceChat } from "@/context/VoiceChatContexts";
import HumanMessage from "@/components/HumanMessage";
import AIMessage from "@/components/AIMessage";
import PropertiesCarousel from "@/components/ui/PropertyCarousel";

export default function ChatMessages() {
  const { messagesConversation, propsUi } = useVoiceChat();
  const endRef = useRef<HTMLDivElement>(null);

  // Auto scroll al final
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesConversation]);

  return (
    <div className="relative h-full w-full overflow-hidden">
  {propsUi.length > 0 && (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-20 bg-white shadow-xl px-4 py-4"
    >
      <div className="max-w-5xl mx-auto">
        <PropertiesCarousel items={propsUi} />
      </div>
    </motion.div>
  )}

  <div className={`absolute inset-0 overflow-y-auto pt-[250px] px-4 pb-6 scrollbar-hide transition-all duration-300 ${
    propsUi.length > 0 ? "scale-95 opacity-70" : "scale-100 opacity-100"
  }`}>
    <div className="mx-auto flex max-w-3xl flex-col gap-4 w-full">
      <AnimatePresence initial={false}>
        {messagesConversation.map((message, index) => {
          const key = message.id || `${message.source}-${index}`;
          const isUser = message.source === "user";
          const isAgent = message.source === "ai";

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {isUser ? (
                <HumanMessage  message={{
                        id: message.id ?? key,
                        content: message.text,
                        type: "human",
                        additional_kwargs: {},
                        response_metadata: {},
                      }}
                      isLoading={false}/>
              ) : isAgent ? (
                <AIMessage message={{
                        id: message.id ?? key,
                        content: message.text,
                        type: "ai",
                        additional_kwargs: {},
                        response_metadata: {},
                      }}
                      isLoading={false}
                      handleRegenerate={() => {}} />
              ) : null}
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div ref={endRef} />
    </div>
  </div>
</div>

  );
}
