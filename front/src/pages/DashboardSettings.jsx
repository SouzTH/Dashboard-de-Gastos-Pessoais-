//import React, { useState, useEffect } from "react";  //teste sem usuario

import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { backendURL } from "../services/api";

import UserProfileDisplay from "../components/UserProfileDisplay.jsx";
import ProfileDataForm from "../components/ProfileDataForm.jsx";
import DeleteAccountButton from "../components/DeleteAccountButton.jsx";

import "../style/ConfiguracoesPerfil.css";
import { Route } from "react-router";

// const beeUser = {  //teste sem usuario
//      nome: "Bee Teste",
//      email: "bee@teste.com",
//  };

export default function DashboardSettings() {
  const { user, handleUpdate, handleDelete } = useContext(UserContext);

  const imageURL = user && user.foto ? `${backendURL}${user.foto}` : null;
  const fileInputRef = useRef(null);

  //const userToRender = user || beeUser; //teste sem usuario

  const atualizarImagem = async (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const formData = new FormData();

    formData.append("foto", arquivo);
    formData.append("nome", user.nome);
    formData.append("email", user.email);

    try {
      await handleUpdate(formData);
      alert("Imagem atualizada com sucesso!");
      e.target.value = null;
    } catch (err) {
      console.error("Erro ao atualizar imagem:", err);
      alert("Erro ao atualizar imagem!");
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  // Deletar conta
  const deletarConta = async () => {
    const confirma = confirm("Tem certeza que deseja excluir?");
    if (confirma) {
      await handleDelete();
      alert("Conta excluída com sucesso!");
    }
  };

  return (
    <div className="perfil-container">
      <h1 className="titulo-configuracoes">
        Configurações de Perfil
      </h1>

      {user ? (     //true para teste sem usuario
        <>

          <UserProfileDisplay
            user={user} 
            //user={userToRender} //teste sem usuario
            imageURL={imageURL}
            fileInputRef={fileInputRef}
            handleClickUpload={handleClickUpload}
            atualizarImagem={atualizarImagem}
          />

          <hr className="divisor-secao"/>

          <ProfileDataForm 
            user={user} 
            //user={userToRender} //teste sem usuario
            handleUpdate={handleUpdate}
          />

          <hr className="divisor-secao"/>

          <DeleteAccountButton
            deletarConta={deletarConta}
          />
          
        </>
      ) : (
        // linkar para pagina inicial ou de cadastro
        <p className="carregando">Carregando usuário...</p>
      )}
    </div>
  );
}