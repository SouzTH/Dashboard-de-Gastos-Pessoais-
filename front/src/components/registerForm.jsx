import { useState } from "react";
import { NavLink, Link } from "react-router";

function RegisterForm(){
    const [nome,setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    function validaEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function checkRegister(){
        if (nome.trim() == "" || email.trim() == "" || password.trim() == "" || password2.trim() == ""){
            alert("Campo vazio!");
        }else
        if(!validaEmail(email)){
            alert("Email invalido!");
        }else
        if(password === password2){
            alert("Senhas Iguais")
        }
    }

    return (
      <>
        <div className="relative w-24 aspect-square rounded-full bg-white text-center">
            <button className="w-8 font-bold aspect-square rounded-full border-2 border-green-700 text-green-700 absolute right-0 bottom-0 cursor-pointer">+</button>
        </div>
        
        <div className="w-9/12 space-y-2">
            <div className="flex flex-col">
                <p className="text-sm">Nome</p>
                <input className="bg-white rounded p-2" type="text" value={nome} placeholder="Seu Nome" onChange={(e) => setNome(e.target.value)} />
            </div>
            
            <div className="flex flex-col">
                <p className="text-sm">Email</p>
                <input className="bg-white rounded p-2" type="email" value={email} placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className="flex flex-col">
                <p className="text-sm">Senha</p>
                <input className="bg-white rounded p-2" type="password" value={password} placeholder="Sua senha" onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            
            <div className="flex flex-col">
                <p className="text-sm">Confirme a senha</p>
                <input className="bg-white rounded p-2" type="password" value={password2} placeholder="Sua senha novamente" onChange={(e) => setPassword2(e.target.value)} />
            </div>
        </div>
        <button className="rounded bg-violet-900 p-2 text-white w-9/12 cursor-pointer" onClick={() => checkRegister()}>Cadastre-se</button>
        <div className="flex space-x-2">
            <p>Já tem uma conta?</p>
            <NavLink to="/login" className="text-violet-600">Faça login!</NavLink>
        </div>        
      </>
    )
}
export default RegisterForm