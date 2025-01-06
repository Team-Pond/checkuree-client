import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <section className="max-w-[390px] w-full h-screen flex flex-col items-center scrollbar-hide custom-scrollbar-hide">
      {children}
    </section>
  );
}
