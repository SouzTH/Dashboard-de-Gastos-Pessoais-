import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { backendURL } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import UserProfileDisplay from "../components/UserProfileDisplay.jsx";
import ProfileDataForm from "../components/ProfileDataForm.jsx";
import DeleteAccountButton from "../components/DeleteAccountButton.jsx";

import "../style/ConfiguracoesPerfil.css";
import { Route } from "react-router";


export default function DashboardSettings() {
  const { user, handleUpdate, handleDelete } = useContext(UserContext);
  const navigate = useNavigate();

  const imageURL = user && user.foto ? `${backendURL}${user.foto}` : null;
  const fileInputRef = useRef(null);

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
      toast.success("Imagem atualizada com sucesso!");
      e.target.value = null;
    } catch (err) {
      toast.error(`Erro ao atualizar imagem! ${err.message}`);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  // Deletar conta
  const deletarConta = async () => {
    const confirma = confirm("Tem certeza que deseja excluir?");

    if (confirma) {
      try {
        await handleDelete();
        navigate("/login");
        toast.success("Conta excluída com sucesso!");
      } catch (error) {
        toast.error(`Erro excluir a conta. Tente novamente: ${error.message}`);
      }
    }
  };

  return (
    <div className="cp-perfil-container">
      <h1 className="cp-titulo-configuracoes">
        Configurações de Perfil
      </h1>

      {user ? (
        <>
          <UserProfileDisplay
            user={user}
            imageURL={imageURL}
            fileInputRef={fileInputRef}
            handleClickUpload={handleClickUpload}
            atualizarImagem={atualizarImagem}
          />

          <hr className="cp-divisor-secao" />

          <ProfileDataForm
            user={user}
            handleUpdate={handleUpdate}
          />

          <hr className="cp-divisor-secao" />

          <DeleteAccountButton deletarConta={deletarConta} />
        </>
      ) : (
        // linkar para pagina inicial ou de cadastro
        <p>Carregando usuário...</p>
      )}
    </div>
  );
}
