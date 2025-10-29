import { useState } from "react";

function registerForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    return (
      <>
        <p className="w-24 aspect-square rounded-full bg-white text-center"></p>
        <input className="bg-white rounded p-2" type="text" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
        <input className="bg-white rounded p-2" type="text" value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
        <input className="bg-white rounded p-2" type="text" value={password2} placeholder="Senha novamente" onChange={(e) => setPassword2(e.target.value)}/>
        <button className="rounded bg-violet-900 p-2 text-white">Cadastre-se</button>
        <div className="flex space-x-2">
            <p>Já tem uma conta?</p>
            <p className="text-violet-600">Faça login!</p>
        </div>
      </>
    )
}
export default registerForm