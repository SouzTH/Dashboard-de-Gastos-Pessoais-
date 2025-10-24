import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import App from "./App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardHome from "./pages/DashboardHome.jsx";
import DashboardSettings from "./pages/DashboardSettings.jsx";
import DashboardTransaction from "./pages/DashboardTransaction.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="transaction" element={<DashboardTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
