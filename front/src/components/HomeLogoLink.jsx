import React from 'react';

/**
 * Componente reutilizável para exibir o logo/ícone de retorno
 * no canto superior esquerdo da tela, direcionando para a rota inicial.
 */

function HomeLinkLogo({ logoSrc}) {
  const componentStyles = `
    .home-logo-link-injected {
        position: fixed;
        top: 2rem;
        left: 2rem;
        z-index: 100;
        cursor: pointer;
        display: block;
        text-decoration: none;
    }

    .home-logo-injected {
        width: 50px;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
    }

    .home-logo-injected:hover {
        transform: scale(1.05);
    }
  `;

  return (
    <>
      {/* Injeta o CSS no DOM para que as classes e o :hover funcionem */}
      <style dangerouslySetInnerHTML={{ __html: componentStyles }} />

      <a href="/" className="home-logo-link-injected">
        <img 
          src={logoSrc} 
          alt="Voltar para a Página Inicial" 
          className="home-logo-injected" 
        />
      </a>
    </>
  );
}

export default HomeLinkLogo;