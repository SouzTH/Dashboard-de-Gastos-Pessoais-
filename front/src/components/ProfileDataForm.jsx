import React, { useState } from "react";
import "../style/ConfiguracoesPerfil.css"

//user pra preencher e handle pra salvar eles
export default function ProfileDataForm({ user, handleUpdate}){
    const [formData, setFormData] = useState({
        nome: user.nome || "",
        email: user.email || "",
        senha: ""
    });

    const handleChange = (e) => {//pelo o que entendi, atualiza quando digita, e quando pega name do input, e value do input
        setFormData({
            ...formData, //mantem os outros dados
            [e.target.name]: e.target.value //atualiza o que foi digitado
        });
    };

    //quando clica em salvar
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!formData.nome || !formData.email){
            return alert("Nome e email são obrigatórios.");
        }

        try{
            await handleUpdate(formData);
            alert("Perfil atualizado com sucesso!");
        }catch(error){
            console.error("Erro ao atualizar perfil:", error);
            alert("Erro ao salvar perfil.");
        }
    };

    return (
        <div className="form-container-geral">
            <h3 className="form-titulo">Editar Perfil</h3>

            <form onSubmit={handleSubmit} className="perfil-form">
                
                {/* campo nome */}
                <div className="grupo-campo">
                    <label className="rotulo" htmlFor="nome">Nome:</label>
                    <input
                        type='text'
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="campo-input"
                        required
                    />
                </div> 

                {/* campo email */}
                <div className="grupo-campo">
                    <label className="rotulo" htmlFor="email">Email:</label>
                    <input
                        type='email'
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="campo-input"
                        required
                    />
                </div>
                {/* campo senha */}
                <div  className="grupo-campo">
                    <label className="rotulo" htmlFor="senha">Senha:</label>
                    <input
                        type='password'
                        id="senha"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        className="campo-input"
                        placeholder=""
                    />
                </div>
                {/* botao salvar */}
                <div>
                    <button
                        type="submit"
                        className="botao-salvar">
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
}