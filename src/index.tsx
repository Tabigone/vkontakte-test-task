import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css'
import "@vkontakte/vkui/dist/vkui.css";
import App from "./app/App";
import bridge from "@vkontakte/vk-bridge";

const queryClient = new QueryClient();
bridge.send("VKWebAppInit");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
