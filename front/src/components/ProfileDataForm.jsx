import React, { useState, useEffect } from "react";
import "../style/ConfiguracoesPerfil.css";
import { toast } from "react-toastify";

//user pra preencher e handle pra salvar eles
export default function ProfileDataForm({ user, handleUpdate }) {
  const [userSalvo, setUserSalvo] = useState(user);
  const [formData, setFormData] = useState({
    nome: user.nome || "",
    email: user.email || "",
    senha: "",
  });

  useEffect(() => {
    setFormData({
      nome: user.nome || "",
      email: user.email || "",
      senha: "",
    });
  }, [user]);

  const handleChange = (e) => {
    //pelo o que entendi, atualiza quando digita, e quando pega name do input, e value do input
    setFormData({
      ...formData, //mantem os outros dados
      [e.target.name]: e.target.value, //atualiza o que foi digitado
    });
  };

  //quando clica em salvar
  const handleSubmit = async (e) => {
    e.preventDefault();

    //objeto para armazenar as mudanças, e no final enviar quando
    //o usuario clicar no botão enviar
    const atualizacaoCampos = {};

    if (formData.nome !== userSalvo.nome) {
      if (formData.nome == "") {
        return toast.warn("O Nome não pode ser vazio.");
      }
      atualizacaoCampos.nome = formData.nome;
    }

    if (formData.email !== userSalvo.email) {
      if (formData.email == "") {
        return toast.warn("O E-mail não pode ser vazio.");
      }
      atualizacaoCampos.email = formData.email;
    }

    if (formData.senha) {
      if (formData.senha.trim() == "") {
        return toast.warn("A senha não pode ser vazia.");
      }
      atualizacaoCampos.senha = formData.senha;
    }
    /*
    if (!formData.nome || !formData.email) {
      return alert("Nome e email são obrigatórios.");
    }*/

    //verifica se o objeto atualizacaoCampos é vazio
    if (Object.keys(atualizacaoCampos).length === 0) {
      return toast.warn("Nenhuma alteração detectada!");
    }

    try {
      await handleUpdate(atualizacaoCampos);

      setFormData((prev) => ({ ...prev, senha: "" }));

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      
      toast.error(`Falha ao atualizar perfil! ${error.message}`);
    }
  };

  return (
    <div className="cp-form-container-geral">
      <h3 className="cp-form-titulo">Editar Perfil</h3>

      <form onSubmit={handleSubmit} className="cp-perfil-form">
        {/* campo nome */}
        <div className="cp-grupo-campo">
          <label className="cp-rotulo" htmlFor="nome">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="cp-campo-input"
            required
          />
        </div>

        {/* campo email */}
        <div className="cp-grupo-campo">
          <label className="cp-rotulo" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="cp-campo-input"
            required
          />
        </div>
        {/* campo senha */}
        <div className="cp-grupo-campo">
          <label className="cp-rotulo" htmlFor="senha">
            Senha:
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="cp-campo-input"
            placeholder=""
          />
        </div>
        {/* botao salvar */}
        <div>
          <button type="submit" className="cp-botao-salvar">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
