import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <>
      <h1>Barra lateral, disponível em todas as abas da aplicação</h1>
      <Outlet />
    </>
  );
}

export default DashboardLayout;
