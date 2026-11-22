import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LeadProvider } from "./context/LeadContext";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LeadProvider>
        <App />
        <Toaster position="top-right" richColors closeButton />
      </LeadProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
