import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";

const query = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 300_000, // 5 minutes
      refetchInterval: 300_000, // 5 minutes
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
