import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { backendURL } from "../services/api";
export default function DashboardSettings() {
  const { user, handleUpdate, handleDelete } = useContext(UserContext);

  const imageURL = user && user.foto ? `${backendURL}${user.foto}` : null;
  const fileInputRef = useRef(null);

  const atualizarNome = async () => {
    if (!user) return alert("Usuário ainda não carregado.");
    const novoNome = prompt("Digite o novo nome:", user.nome);
    if (!novoNome) return;
    const novoEmail = prompt("Digite o novo email:", user.email);
    if (!novoEmail) return;
    const novaSenha = prompt("Digite a sua nova senha ", user.senha);

    await handleUpdate({ nome: novoNome, email: novoEmail, senha: novaSenha });
    alert("Usuário atualizado!");
  };

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
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl mb-4">
        Teste de Integração com Backend
      </h1>

      {user ? (
        <>
          <div className="text-center mb-4">
            <h2 className="font-semibold mb-2">Usuário Atual</h2>
            <p>
              <strong>Nome:</strong> {user.nome}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <div className="relative w-24 aspect-square rounded-full overflow-hidden mx-auto mt-3">
              <img
                src={imageURL}
                alt="Foto do usuário"
                className="w-full h-full object-cover"
              />

              <button
                onClick={handleClickUpload}
                className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs rounded-full p-1"
              ></button>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={atualizarImagem}
              className="hidden"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={atualizarNome}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Atualizar dados
            </button>

            <button
              onClick={deletarConta}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Deletar conta
            </button>
          </div>
        </>
      ) : (
        <p>Carregando usuário...</p>
      )}
    </div>
  );
}
