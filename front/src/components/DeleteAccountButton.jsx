import React from "react";
import "../style/ConfiguracoesPerfil.css";
export default function DeleteAccountButton({ deletarConta  }) {
    return (
        <div className="cp-delete-container">
            <button
                onClick={deletarConta}
                className="cp-botao-delete-conta"
            >
                Deletar Conta
            </button>
            <p className="cp-aviso-delete-conta">
                Esta ação é irreversível. Ao deletar sua conta, todos os seus dados serão permanentemente removidos.
            </p>
        </div>
    );
}