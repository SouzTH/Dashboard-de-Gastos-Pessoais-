import { useState } from "react";

function DashboardRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  return (
    <>
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="h-9/12 w-4/12 bg-slate-500 p-12">
        <div className="flex flex-col justify-around space-y-4">
          <h1 className="font-bold text-2xl text-center">Tela de Cadastro</h1>
          <input className="bg-white rounded p-2" type="text" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
          <input className="bg-white rounded p-2" type="text" value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
          <input className="bg-white rounded p-2" type="text" value={password2} placeholder="Senha novamente" onChange={(e) => setPassword2(e.target.value)}/>
          <button className="bg-white rounded">Fazer cadastro</button>
        </div>
      </div>
    </div>
      
    </>
  );
}

export default DashboardRegister;
