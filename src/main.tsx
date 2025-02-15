import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "dayjs/locale/ko"; // 한국어 locale 설정
import dayjs from "dayjs";
import App from "./App";
import { RootToaster } from "./providers/RootToaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
dayjs.locale("ko");

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RootToaster />
      <ReactQueryDevtools initialIsOpen={true} />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
