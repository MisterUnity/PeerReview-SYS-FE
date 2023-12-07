import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStoreContext from "./global/GlobalStoreContext";
import "primereact/resources/themes/mira/theme.css";
import "primereact/resources/primereact.min.css";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <GlobalStoreContext>
    <App />
  </GlobalStoreContext>
  // </React.StrictMode>
);
