import { hydrateRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import App from "./App";
import { RootToaster } from "./providers/RootToaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

dayjs.locale("ko");

const queryClient = new QueryClient();

hydrateRoot(
  document.getElementById("root")!,
  <QueryClientProvider client={queryClient}>
    <RootToaster />
    <ReactQueryDevtools initialIsOpen={true} />
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
