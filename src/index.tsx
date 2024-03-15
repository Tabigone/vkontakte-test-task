import React from "react";
import ReactDOM from "react-dom/client";
import "@vkontakte/vkui/dist/vkui.css";
import App from "./app/App";
import bridge from "@vkontakte/vk-bridge";

bridge.send("VKWebAppInit");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
