import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { TransactionProvider } from "./context/TransactionContext";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <TransactionProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TransactionProvider>
    </UserProvider>
  </React.StrictMode>
);
