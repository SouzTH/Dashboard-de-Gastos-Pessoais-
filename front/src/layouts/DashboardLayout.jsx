import { useContext } from "react";
import { Outlet } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { backendURL } from "../services/api";

import '../style/SideBar.css';

import { MdDashboard, MdPeople, MdCompareArrows, MdSettings } from 'react-icons/md';

const ImagemPadrao = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

import LogoImage from '../assets/logo.png';

function DashboardLayout() {
  const { user } = useContext(UserContext);
  
  const profileImgUrl = user && user.foto 
    ? `${backendURL}${user.foto}` 
    : ImagemPadrao;

  //OBS PARA OS BOTÕES: irão virar uma função map() com as rotas corretas pra cada site!

  return (
    <>
      <div className="layout-container">
        <div className="sidebar">

          <div className="sidebar-logo">
            <Link to="/" className="logo-link">
              <img 
                src={LogoImage} 
                alt="Logo MyBudget"
                className="logo-icon"
              />
              <span className="menu-link-texto">MyBudget</span>
            </Link>
          </div>
          
          <div className="menu-conta">
            <img
              className="perfil-imagem"
              src={profileImgUrl || ImagemPadrao}/>

            <NavLink to="settings" className="botao">
              <MdSettings size={24} className="menu-icone" />
              <span className="menu-link-texto">Minha Conta</span>
            </NavLink>
          </div>
          <div className="space">
            
          </div>
          <div className="menu-navegacao">

            <NavLink to="dashboard" className="botao">
              <MdDashboard size={24} className="menu-icone" />
              <span className="menu-link-texto">Dashboard</span>
            </NavLink>

            <NavLink to="team" className="botao">
              <MdPeople size={24} className="menu-icone" />
              <span className="menu-link-texto">Equipe</span>
            </NavLink>

            <NavLink to="transaction" className="botao">
              <MdCompareArrows size={24} className="menu-icone" />
              <span className="menu-link-texto">Transações</span>
            </NavLink>
            
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default DashboardLayout;
