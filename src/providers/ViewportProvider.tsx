import { createContext, useContext, useEffect, useState } from "react";
const ViewportContext = createContext<number>(window.innerHeight);
export const ViewportProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vh, setVh] = useState(window.innerHeight);
  useEffect(() => {
    const updateHeight = () => {
      setVh(window.innerHeight);
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    updateHeight(); // 초기값 설정
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <ViewportContext.Provider value={vh}>{children}</ViewportContext.Provider>
  );
};
export const useViewportHeight = () => useContext(ViewportContext);
