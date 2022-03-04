import { useEffect, useState } from "react";

export default function useIsWidth(number) {
  if (number === undefined) {
    number = 800;
  }

  const getWindowWidth = () => window.innerWidth <= number;
  const [isWidth, setIsWidth] = useState(getWindowWidth());

  useEffect(() => {
    const onResize = () => {
      setIsWidth(getWindowWidth());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
    //eslint-disable-next-line
  }, []);

  return isWidth;
}
