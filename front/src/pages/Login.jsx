import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import InputField from "../components/inputField";
import Button from "../components/button";
import Checkbox from "../components/checkBox";
import "../style/login.css";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        senha,
      });

      const { token, user } = response.data;
      login(user, token);

      if (lembrar) localStorage.setItem("email", email);
      else localStorage.removeItem("email");

      navigate("/dashboard");
    } catch (err) {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card" role="main" aria-labelledby="login-title">
        <h1 id="login-title" className="login-title">
          Acesse sua conta
        </h1>

        <form className="login-form" onSubmit={handleLogin}>
          <InputField
            id="email"
            label="Email"
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />

          <InputField
            id="password"
            label="Senha"
            type="password"
            name="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="login-input"
          />

          <div className="login-row">
            <Checkbox
              id="remember"
              checked={lembrar}
              onChange={() => setLembrar(!lembrar)}
              label="Lembre-se de mim"
              className="login-checkbox"
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
