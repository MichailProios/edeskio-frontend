import { useState, useEffect } from "react";

export default function useDelayTransition(ms) {
  const [flag, setFlag] = useState(false);

  let milliseconds = ms;

  if (typeof ms === "number") {
    milliseconds = ms.toString();
  } else if (typeof ms === "string") {
    milliseconds = ms.toString().replace(/\D/g, "");
  } else {
    milliseconds = ms;
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(true);
    }, milliseconds);

    return () => clearTimeout(timer);
  }, []);

  return flag;
}
