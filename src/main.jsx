import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./roots/Router.jsx";
import Provider from "./authentication/Provider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={Routes} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
