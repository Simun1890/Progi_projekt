import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TokenProvider } from "./context/TokenProvider";
import { UserDataProvider } from "./context/UserDataProvider";
import { GlobalErrorProvider } from "./context/GlobalErrorProvider.js";
import { App } from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GlobalErrorProvider>
      <TokenProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </TokenProvider>
    </GlobalErrorProvider>
  </React.StrictMode>
);
