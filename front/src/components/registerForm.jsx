//import { useState } from "react";
import { NavLink, Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import "../style/Registro.css";

function RegisterForm() {
  const {
    nome,
    setNome,
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    CriarUsuario,
  } = useContext(UserContext);
  //const { user } = useContext(UserContext);
  //const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  function validaEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function validaSenha() {
    return password === password2;
  }

  const checkRegister = async (e) => {
    if (
      nome.trim() == "" ||
      email.trim() == "" ||
      password.trim() == "" ||
      password2.trim() == ""
    ) {
      //alert("Há campos vazios!", e);
      toast.warn("Há campos vazios!");
      return false;
    } else if (!validaEmail()) {
      //alert("O Email inserido é invalido!", e);
      toast.warn("O Email inserido é invalido!");
      return false;
    } else if (!validaSenha()) {
      //alert("As senhas são diferentes!", e);
      toast.warn("As senhas são diferentes!");
      return false;
    }

    try {
      await CriarUsuario();

    } catch (err) {
      toast.error(`Erro ao cadastrar: ${err.message}`);
    }

    //alert("Você foi cadastrado!");
    navigate("/login");
  };

  return (
    <>
    <div className="formulario-container">
      <div className="imagem-perfil-bloco">
        <button className="botao-upload-img">
          +
        </button>
      </div>

      <div className="inputs-bloco">
        <div className="grupo-input">
          <p className="input-label">Nome</p>
          <input
            className="campo-input"
            type="text"
            value={nome}
            placeholder="Seu Nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="grupo-input">
          <p className="input-label">Email</p>
          <input
            className="campo-input"
            type="email"
            value={email}
            placeholder="Seu@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grupo-input">
          <p className="input-label">Senha</p>
          <input
            className="campo-input"
            type="password"
            value={password}
            placeholder="Sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grupo-input">
          <p className="input-label">Confirme a senha</p>
          <input
            className="campo-input"
            type="password"
            value={password2}
            placeholder="Sua senha novamente"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

      </div>

      <button
        className="botao-cadastro"
        onClick={() => checkRegister()}
      >
        Cadastre-se
      </button>

      <div className="grupo-link-login">
        <p>Já tem uma conta?</p>
        <NavLink to="/login" className="link-login">
          Faça login!
        </NavLink>
      </div>
    </div>
    </>
  );
}
export default RegisterForm;
