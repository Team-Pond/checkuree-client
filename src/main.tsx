import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootToaster } from "./providers/RootToaster.tsx";
import "dayjs/locale/ko"; // 한국어 locale 설정
import dayjs from "dayjs";
dayjs.locale("ko");

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RootToaster />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
