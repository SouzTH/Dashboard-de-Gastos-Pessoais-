import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import { UserContext } from "../context/UserContext";
import InputField from "../components/inputField";
import Button from "../components/button";
import Checkbox from "../components/checkBox";
import "../style/login.css";
import { NavLink } from "react-router-dom";
//import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  // ✅ pega tudo de uma vez só do contexto
  const { email, setEmail, senha, setSenha, lembrar, setLembrar, loginUser } =
    useContext(UserContext);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) setEmail(savedEmail);
  }, [setEmail]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const resposta = await loginUser();

      console.log("Usuário logado com sucesso!", resposta);

      if (lembrar) localStorage.setItem("email", email);
      else localStorage.removeItem("email");

      navigate("/teste");
    } catch (err) {
      console.error("Erro ao logar:", err);
      alert("Falha ao logar!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Acesse sua conta</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
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
            <a href="/forgot" className="link-small">
              Esqueceu sua senha?
            </a>
          </div>

          <Button type="submit" className="login-button">
            Entrar
          </Button>

          <div className="signup-row">
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
