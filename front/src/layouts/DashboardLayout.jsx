import { useContext } from "react";
import { Outlet } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { backendURL } from "../services/api";

import '../style/SideBar.css';

import { MdDashboard, MdPeople, MdCompareArrows, MdSettings, MdLogout } from 'react-icons/md';

const ImagemPadrao = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

import LogoImage from '../assets/logo.png';

function DashboardLayout() {
  const { user } = useContext(UserContext);
  
  const profileImgUrl = user && user.foto 
    ? `${backendURL}${user.foto}` 
    : ImagemPadrao;

  const { logout } = useContext(UserContext);

  return (
    <>
      <div className="layout-container">
        <div className="sidebar">

          <div className="sidebar-logo">
            <Link to="/" className="sb-logo-link">
              <img 
                src={LogoImage} 
                alt="Logo MyBudget"
                className="sb-logo-icon"
              />
              <span className="sb-menu-link-texto">MyBudget</span>
            </Link>
          </div>
          
          <div className="sb-menu-conta">
            <img
              className="sb-perfil-imagem"
              src={profileImgUrl || ImagemPadrao}/>

            <NavLink to="settings" className="sb-botao">
              <MdSettings size={24} className="sb-menu-icone" />
              <span className="sb-menu-link-texto">Minha Conta</span>
            </NavLink>
          </div>
          <div className="sb-menu-navegacao">
            <NavLink to="/dashboard" className="sb-botao">
              <MdDashboard size={24} className="sb-menu-icone" />
              <span className="sb-menu-link-texto">Dashboard</span>
            </NavLink>
            
            {/*desabilitado temporariamente
            <NavLink to="team" className="botao">
              <MdPeople size={24} className="menu-icone" />
              <span className="menu-link-texto">Equipe</span>
            </NavLink> */}

            <NavLink to="transaction" className="sb-botao">
              <MdCompareArrows size={24} className="sb-menu-icone" />
              <span className="sb-menu-link-texto">Transações</span>
            </NavLink>
            <button onClick={() => logout()} className="sb-botao cursor-pointer">
              <MdLogout size={24} className="sb-menu-icone" />
              <span className="sb-menu-link-texto">Sair</span>
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default DashboardLayout;
