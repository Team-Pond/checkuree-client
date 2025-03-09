import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "dayjs/locale/ko"; // 한국어 locale 설정
import dayjs from "dayjs";
import App from "./App";
import { RootToaster } from "./providers/RootToaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

dayjs.locale("ko");

const queryClient = new QueryClient();

const container = document.getElementById("root")!;
const root = createRoot(container);

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RootToaster />
        <ReactQueryDevtools initialIsOpen={true} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
} else {
  root.render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RootToaster />
        <ReactQueryDevtools initialIsOpen={true} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
