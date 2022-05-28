import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Avatar from "./components/Avatar";
import { DataLayer } from "./DataLayer";
import reducer, { initialState } from "./reducer";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataLayer>
  </React.StrictMode>
);
