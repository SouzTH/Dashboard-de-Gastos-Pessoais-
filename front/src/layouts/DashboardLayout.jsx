import { Outlet } from "react-router";
import { NavLink, Link } from "react-router";
import imgExemplo from "../../src/assets/react.svg";
function DashboardLayout() {
  //OBS PARA OS BOTÕES: irão virar uma função map() com as rotas corretas pra cada site!
  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/4 bg-gray-600 text-white flex flex-col h-screen justify-around p-6 rounded-r-2xl">
          <div className="flex flex-col justify-center items-center h-1/4 space-y-2">
            <img
              className="w-24 h-24 bg-white p-2 rounded-full"
              src={imgExemplo}
            />
            <NavLink
              to="settings"
              className="rounded-3xl bg-gray-500 border-gray-500 p-2 text-center"
            >
              Minha Conta
            </NavLink>
          </div>
          <div className="flex flex-col justify-center gap-y-10 space-y-2">
            <NavLink
              to=""
              className="rounded-3xl bg-gray-500 border-gray-500 p-2 text-center"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="team"
              className="rounded-3xl bg-gray-500 border-gray-500 p-2 text-center"
            >
              Equipe
            </NavLink>
            <NavLink
              to="transaction"
              className="rounded-3xl bg-gray-500 border-gray-500 p-2 text-center"
            >
              Transação
            </NavLink>
            
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default DashboardLayout;
