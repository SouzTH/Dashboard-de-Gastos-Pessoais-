import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Index.css'; 
import { MdOutlineAttachMoney, MdDashboard, MdOutlineSettings } from "react-icons/md";

import LogoImage from '../assets/logo.png';

function Index() {
    const featureData = [
        { icon: <MdOutlineAttachMoney size={30} className="icone"/>, title: "Movimentações Financeiras", description: "Controle detalhado das movimentações e facilidade na análise do comportamento financeiro." },
        { icon: <MdDashboard size={30} className="icone"/>, title: "Dashboard", description: "Auxilia diretamente na tomada de decisões ao identificar rapidamente desvios orçamentários, tendências de consumo e a saúde financeira geral." },
        { icon: <MdOutlineSettings size={30} className="icone"/> , title: "Configurações e Personalização", description: "Experiência prática e acessível, adaptando a ferramenta às particularidades da sua vida financeira e oferecendo mecanismos para o controle proativo." },
    ];
    
    const teamData = [
        { name: "Letícia Mendonça", role: "Desenvolvedora", imgUrl: "https://placehold.co/100x100/507094/FFFFFF?text=LM" },
        { name: "Rafael Barrionuevo", role: "Desenvolvedor", imgUrl: "https://placehold.co/100x100/A0B9E3/000000?text=RB" },
        { name: "Gustavo Andrade", role: "Desenvolvedor", imgUrl: "https://placehold.co/100x100/98C7A0/000000?text=GA" },
        { name: "Thiago Souza", role: "Desenvolvedor", imgUrl: "https://placehold.co/100x100/D0A3C9/000000?text=TS" },
        { name: "Luiza Botelho", role: "Desenvolvedora", imgUrl: "https://placehold.co/100x100/7818DB/FFFFFF?text=LB" },
    ];

    return (
        <>
            <div className="min-h-screen text-gray-800">
                <header className="header-fixa">
                    <nav className="navbar">
                        <NavLink to="/" className="logo-link">
                            <span className="logo-icon">
                                <img 
                                    src={LogoImage} 
                                    alt="Logo MyBudget"
                                />
                            </span>
                        </NavLink>
                        <h1>MyBudget</h1>
                        <NavLink to="/register" className="button-cta2"> 
                            Cadastre-se
                        </NavLink> 
                    </nav>
                </header>
                <main className="container">
                    <section className="apresentacao">
                        <div className="container"> 
                            <h1 className="main-title">Bem-vindo ao MyBudget!</h1>
                            <p className="main-description">
                                Gerencie suas finanças pessoais de forma fácil e eficiente.
                            </p>
                            
                            <NavLink to="/login" className="button-cta"> 
                                Comece Agora
                            </NavLink> 
                        </div>
                        
                    </section>
                            
                    <section className="features">
                        <div className="container">
                            <h2>
                                Transforme Sua Vida Financeira
                            </h2>
                        
                            <div className="features-grid">
                                {featureData.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <div className="feature-icon">{feature.icon}</div> 
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                            
                    <section className="about-us">
                        <div className="container">
                            <h2>
                                Nossa Equipe
                            </h2>
                            <p>Conheça os desenvolvedores por trás do MyBudget!</p>
                            
                            <div className="team-grid">
                                {teamData.map((member, index) => (
                                    <div key={index} className="member-card">
                                        <img 
                                            src={member.imgUrl} 
                                            alt={`Membro ${index + 1}: ${member.name}`}
                                            className="member-foto"
                                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/CCCCCC/000000?text=Foto"; }}
                                        />
                                        <h4>{member.name}</h4>
                                        <p>{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
                    
                <footer>
                    <p> © 2025 MyBudget. Projeto Ramo Estudantil IEEE - Dashboard de Controle de Finanças Pessoais.</p>
                </footer>
            </div>
        </>
    );
}

export default Index;