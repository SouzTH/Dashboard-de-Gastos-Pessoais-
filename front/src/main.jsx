import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { TransactionProvider } from "./context/TransactionContext";

import App from "./App";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TransactionProvider>
            <App />
          </TransactionProvider>
        </UserProvider>
      </BrowserRouter>
  </React.StrictMode>
);