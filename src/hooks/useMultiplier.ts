import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("ws://localhost:5000");

const useMultiplier = (): number => {
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    socket.on("multiplier", (newMultiplier) => {
      setMultiplier(newMultiplier);
    });

    return () => {
      socket.off("multiplier");
    };
  }, []);

  return multiplier;
};

export default useMultiplier;
