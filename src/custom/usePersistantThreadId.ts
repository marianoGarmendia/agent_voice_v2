 
 
 import { s } from "framer-motion/client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; 
 
const THREAD_STORAGE_KEY = "thread_id";
const RUN_ID_CONFIG_STORAGE_KEY = "run_id_config";
const RUN_ID_STORAGE_KEY = "run_id";

// Crear el thread_id
export const usePersistentThreadId = () => {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [runIdConfig, setRunIdConfig] = useState<string | null>(null);
  const [runId, setRunId] = useState<string | null>(null);

  useEffect(() => {
    let existingId = localStorage.getItem(THREAD_STORAGE_KEY);
    let existingRunIdConfig = localStorage.getItem(RUN_ID_CONFIG_STORAGE_KEY);
    let existingRunId = localStorage.getItem(RUN_ID_STORAGE_KEY);

    if (!existingId) {
      existingId = uuidv4(); // generar nuevo si no existe
      localStorage.setItem(THREAD_STORAGE_KEY, existingId);
    }

    if (!existingRunIdConfig) {
      existingRunIdConfig = uuidv4(); // generar nuevo si no existe
      localStorage.setItem(RUN_ID_CONFIG_STORAGE_KEY, existingRunIdConfig);
    }

    if (!existingRunId) {
      existingRunId = uuidv4(); // generar nuevo si no existe
      localStorage.setItem(RUN_ID_STORAGE_KEY, existingRunId);

    }
    setThreadId(existingId);
    setRunIdConfig(existingRunIdConfig);
    setRunId(existingRunId);
  }, []);

  return {threadId, runId, runIdConfig, };
};
   