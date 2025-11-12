//import React, { useState, useEffect } from "react";  //teste sem usuario

import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { backendURL } from "../services/api";

import UserProfileDisplay from "../components/UserProfileDisplay.jsx";
import ProfileDataForm from "../components/ProfileDataForm.jsx";
import DeleteAccountButton from "../components/DeleteAccountButton.jsx";

import "../style/ConfiguracoesPerfil.css";

// const beeUser = {  //teste sem usuario
//      nome: "Bee Teste",
//      email: "bee@teste.com",
//  };

export default function DashboardSettings() {
  const { user, handleUpdate, handleDelete } = useContext(UserContext);

  const imageURL = user && user.foto ? `${backendURL}${user.foto}` : null;
  const fileInputRef = useRef(null);


  // const userToRender = user || beeUser; //teste sem usuario


  // const atualizarNome = async () => {
  //   if (!user) return alert("Usuário ainda não carregado.");
  //   const novoNome = prompt("Digite o novo nome:", user.nome);
  //   if (!novoNome) return;
  //   const novoEmail = prompt("Digite o novo email:", user.email);
  //   if (!novoEmail) return;
  //   const novaSenha = prompt("Digite a sua nova senha ", user.senha);

  //   await handleUpdate({ nome: novoNome, email: novoEmail, senha: novaSenha });
  //   alert("Usuário atualizado!");
  // };

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
        {/* Teste de Integração com Backend */}
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
        <p className="carregando">Carregando usuário...</p>
      )}
    </div>
  );
}