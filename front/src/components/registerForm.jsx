//import { useState } from "react";
import { NavLink, Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

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
    console.log("passou na validação da senha");
    try {
      await CriarUsuario();
      console.log("passou na validação do CriarUsuario");
    } catch (err) {
      console.log("Erro ao cadastrar", err);
    }

    //alert("Você foi cadastrado!");
    navigate("/login");
  };

  return (
    <>
      <div className="relative w-24 aspect-square rounded-full bg-white text-center">
        <button className="w-8 font-bold aspect-square rounded-full border-2 border-green-700 text-green-700 absolute right-0 bottom-0 cursor-pointer">
          +
        </button>
      </div>

      <div className="w-9/12 space-y-2">
        <div className="flex flex-col">
          <p className="text-sm">Nome</p>
          <input
            className="bg-white rounded p-2"
            type="text"
            value={nome}
            placeholder="Seu Nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm">Email</p>
          <input
            className="bg-white rounded p-2"
            type="email"
            value={email}
            placeholder="seu@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm">Senha</p>
          <input
            className="bg-white rounded p-2"
            type="password"
            value={password}
            placeholder="Sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm">Confirme a senha</p>
          <input
            className="bg-white rounded p-2"
            type="password"
            value={password2}
            placeholder="Sua senha novamente"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
      </div>
      <button
        className="rounded bg-violet-900 p-2 text-white w-9/12 cursor-pointer"
        onClick={() => checkRegister()}
      >
        Cadastre-se
      </button>
      <div className="flex space-x-2">
        <p>Já tem uma conta?</p>
        <NavLink to="/login" className="text-violet-600">
          Faça login!
        </NavLink>
      </div>
    </>
  );
}
export default RegisterForm;
