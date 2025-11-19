import React from "react";
import "../style/ConfiguracoesPerfil.css";

export default function UserProfileDisplay({ 
    user,
    imageURL, 
    handleClickUpload,
    atualizarImagem,
    fileInputRef
}){

    const defaultImageUrl = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"; 
    
    return (
        <div className="cp-perfil-info-container">
            {/* Foto do usuario */}
            <div className="cp-perfil-foto-container">
                <img
                    src={imageURL || defaultImageUrl}
                    alt={`Foto de perfil de ${user.nome}`}
                    className="cp-perfil-foto"
                />
                <button
                    onClick = {handleClickUpload}
                    className="cp-perfil-foto-botao"
                    title="Clique para alterar a imagem"
                >
                    Alterar Foto
                </button>
            </div>

            {/* Informações do usuario */}
            <div className="cp-perfil-detalhes">
                <h2 className="cp-info-nome">{user.nome}</h2>
                <p className="cp-info-email">{user.email}</p>
            </div>
            
            {/* Input de arquivo (hidden) */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}  
                onChange={atualizarImagem}
                className="cp-input-escondido"
            />
        </div>
    );
}