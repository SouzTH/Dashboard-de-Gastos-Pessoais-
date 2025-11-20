import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import DashboardSettings from "../pages/DashboardSettings";
import DashboardTeam from "../pages/DashboardTeam";
import DashboardTransaction from "../pages/DashboardTransaction";
import Index from "../pages/Index.jsx"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="team" element={<DashboardTeam />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="transaction" element={<DashboardTransaction />} />
      </Route>
    </Routes>
  );
}
