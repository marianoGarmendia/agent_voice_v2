import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const THREAD_STORAGE_KEY = "threadId";
const RUN_ID_CONFIG_STORAGE_KEY = "runIdConfig";
const RUN_ID_STORAGE_KEY = "runId";

export const usePersistentThreadId = () => {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [runIdConfig, setRunIdConfig] = useState<string | null>(null);
  const [runId, setRunId] = useState<string | null>(null);

  useEffect(() => {
    let existingId = localStorage.getItem(THREAD_STORAGE_KEY);
    let existingRunIdConfig = localStorage.getItem(RUN_ID_CONFIG_STORAGE_KEY);
    let existingRunId = localStorage.getItem(RUN_ID_STORAGE_KEY);

    if (!existingId) {
      existingId = uuidv4();
      localStorage.setItem(THREAD_STORAGE_KEY, existingId);
    }

    if (!existingRunIdConfig) {
      existingRunIdConfig = uuidv4();
      localStorage.setItem(RUN_ID_CONFIG_STORAGE_KEY, existingRunIdConfig);
    }

    if (!existingRunId) {
      existingRunId = uuidv4();
      localStorage.setItem(RUN_ID_STORAGE_KEY, existingRunId);
    }

    setThreadId(existingId);
    setRunIdConfig(existingRunIdConfig);
    setRunId(existingRunId);

    const handleUnload = () => {
      localStorage.removeItem(THREAD_STORAGE_KEY);
      localStorage.removeItem(RUN_ID_CONFIG_STORAGE_KEY);
      localStorage.removeItem(RUN_ID_STORAGE_KEY);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      handleUnload(); // Limpieza al desmontar componente (SPA)
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return { threadId, runId, runIdConfig };
};
