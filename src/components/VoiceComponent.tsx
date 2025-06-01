"use client";

import React, { useEffect, useState } from "react";
import {  useVoiceChat } from "@/context/VoiceChatContexts";


// ElevenLabs
import { useConversation } from "@11labs/react";

// UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { div } from "framer-motion/client";

const VoiceChat = () => {
  const [hasPermission, setHasPermission] = useState(false);
  
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {  setIsAgentSpeaking, setHasPermissionContext , setMessagesConversation} = useVoiceChat();


  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
    },
    onMessage: (message) => {
      console.log("Received message:", message);
      setMessagesConversation((prev) => [
        ...prev,
        {
          
          text: message.message,
          source: message.source,
          timestamp: Date.now(),
        },
      ]);
    },
    onError: (error: string | Error) => {
      setErrorMessage(typeof error === "string" ? error : error.message);
      console.error("Error:", error);
    },
  });

  const { status, isSpeaking } = conversation;

  useEffect(() => {
    // Request microphone permission on component mount
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage("Microphone access denied");
        console.error("Error accessing microphone:", error);
      }
    };

    requestMicPermission();
  }, []);

  // const handleStartConversation = async () => {
  //   try {
  //     // Replace with your actual agent ID or URL
  //     const conversationId = await conversation.startSession({
  //       agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
  //     });
  //     console.log("Started conversation:", conversationId);
  //   } catch (error) {
  //     setErrorMessage("Failed to start conversation");
  //     console.error("Error starting conversation:", error);
  //   }
  // };

  useEffect(() => {
  if (hasPermission && status === "disconnected") {
    (async () => {
      try {
        const conversationId = await conversation.startSession({
          agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
        });
        console.log("Started conversation:", conversationId);
      } catch (error) {
        setErrorMessage("Failed to auto-start conversation");
        console.error("Error auto-starting conversation:", error);
      }
    })();
  }
}, [hasPermission, status]);

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
  };

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      setErrorMessage("Failed to change volume");
      console.error("Error changing volume:", error);
    }
  };

  useEffect(() => {
    setIsAgentSpeaking(isSpeaking);
  },[ isSpeaking]);

  useEffect(() => {
    setHasPermissionContext(hasPermission);
  }, [hasPermission, setHasPermissionContext]);

  return (
    <div className="flex flex-col items-center justify-center text-center rounded-lg shadow-lg p-4 font-bold mx-auto">
       <p>Carla Agente IA </p>
      <span className="text-xs text-gray-400">Inmobiliaria M & M</span>
    </div>
  
  );
};

export default VoiceChat;
