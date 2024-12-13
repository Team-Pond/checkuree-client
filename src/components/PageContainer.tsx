import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <section className="max-w-[390px] w-full h-screen flex justify-center flex-col items-center">
      {children}
    </section>
  );
}
