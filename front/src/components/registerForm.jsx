import { useState } from "react";

function registerForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    return (
      <>
        <p className="w-24 aspect-square rounded-full bg-white text-center"></p>
        <div className="flex flex-col">
            <p className="text-sm">Email</p>
            <input className="bg-white rounded p-2" type="text" value={email} placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className="flex flex-col">
            <p className="text-sm">Senha</p>
            <input className="bg-white rounded p-2" type="text" value={password} placeholder="Sua senha" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        
        
        <div className="flex flex-col">
            <p className="text-sm">Senha</p>
            <input className="bg-white rounded p-2" type="text" value={password2} placeholder="Sua Senha novamente" onChange={(e) => setPassword2(e.target.value)}/>
        </div>

        <button className="rounded bg-violet-900 p-2 text-white">Cadastre-se</button>
        <div className="flex space-x-2">
            <p>Já tem uma conta?</p>
            <p className="text-violet-600">Faça login!</p>
        </div>
      </>
    )
}
export default registerForm