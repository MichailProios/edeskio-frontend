import { useEffect, useState } from "react";

export default function useDetectHeight() {
  const getWindowWidth = () => window.innerHeight;
  const [height, setHeight] = useState(getWindowWidth());

  useEffect(() => {
    const onResize = () => {
      setHeight(getWindowWidth());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
    //eslint-disable-next-line
  }, []);

  return height;
}
