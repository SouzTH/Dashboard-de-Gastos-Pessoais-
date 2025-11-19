import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
//import axios from "axios";
import { UserContext } from "../context/UserContext";
import InputField from "../components/inputField";
import Button from "../components/button";
import Checkbox from "../components/checkBox";

import LogoImage from '../assets/logo.png';
import HomeLinkLogo from '../components/HomeLogoLink';
import "../style/login.css";

import { toast } from "react-toastify";

//import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { email, setEmail, senha, setSenha, lembrar, setLembrar, loginUser } =
    useContext(UserContext);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) setEmail(savedEmail);
  }, [setEmail]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      //alert("Preencha todos os campos!");
      toast.warn("Preencha todos os campos!");
      return;
    }

    try {
      const resposta = await loginUser();

      console.log("Usuário logado com sucesso!", resposta);
      toast.success("Login realizado com sucesso!");

      if (lembrar) localStorage.setItem("email", email);
      else localStorage.removeItem("email");
      console.log("passou no login");
      navigate("/dashboard/settings");
    } catch (err) {
      console.error("Erro ao logar:", err);
      toast.error("Erro ao logar!");
      //alert("Falha ao logar!");
    }
  };

  return (
    <div className="login-page">
      <HomeLinkLogo logoSrc={LogoImage} />
      <div className="login-card">
        <h1 className="login-title">Acesse sua conta!</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            id="password"
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <div className="login-row">
            <Checkbox
              id="remember"
              checked={lembrar}
              onChange={() => setLembrar(!lembrar)}
              label="Lembre-se de mim"
            />
            {/* <NavLink to="/forgot" className="login-link-small">
              Esqueceu sua senha?
            </NavLink> */}
          </div>

          <Button type="submit" className="login-button">
            Entrar
          </Button>

          <div className="login-signup-row">
            <span>Não tem conta?</span>
            <NavLink to="/register" className="text-violet-600">
              Cadastre-se
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
