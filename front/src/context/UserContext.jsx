import { createContext, useState } from "react";
import { cadastrarUsuario } from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //criar usuario
  const CriarUsuario = async () => {
    try {
      const response = await cadastrarUsuario(nome, email, password);

      console.log("usuario cadastrado com sucesso! Usar o Toastfy!!", response);
    } catch (err) {
      console.log("Erro ao cadastrar", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        setEmail,
        setPassword,
        setNome,
        CriarUsuario,
        password2,
        setPassword2,
        nome,
        email,
        password,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
