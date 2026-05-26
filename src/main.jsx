import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { WatchlistProvider } from "./context/WatchlistContext";
import { AuthProvider } from "./context/AuthContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <WatchlistProvider>
      <RouterProvider router={router} />
    </WatchlistProvider>
    </AuthProvider>
  </React.StrictMode>,
);
