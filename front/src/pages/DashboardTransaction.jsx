import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from 'react-toastify';

import '../style/Transacao.css';
  
function DashboardTransaction() {
  
  const {
    transactions,
    isLoading,
    error,
    deleteTransaction,
    addTransaction,
    updateTransaction,
    loadTransactions,
  } = useContext(TransactionContext);
  const { user, logoutUser } = useContext(UserContext);
  const [editId, setEditId] = useState(null);
  const template = {
        valor: "0.00",
        tipo_de_transacao: "Receita",
        data_transacao: new Date().toISOString().split("T")[0],
        descricao: "",
        categoria: "",
        conta: "",
      };


  const [newTransaction, setNewTransaction] = useState(template);

  // Manipula a mudança de estado do formulário
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newTransaction.valor ||
      !newTransaction.conta ||
      !newTransaction.categoria
    ) {
      toast.warn(
        "Preencha os campos obrigatórios: Valor, Categoria e Conta."
      );
      return;
    }
    const transactionData = {
      ...newTransaction,
      valor: parseFloat(newTransaction.valor)
    };
    if (editId) {

      try {
        await updateTransaction(editId, transactionData);
        toast.success("Transação atualizada com sucesso!");
        setEditId(null);
        setNewTransaction(template);
      } catch (err) {
        toast.error(`Erro ao atualizar: ${err.message}`);
      }
    } else {
      try {
        await addTransaction(transactionData);
        toast.success("Transação adicionada com sucesso!");
        setNewTransaction(template);
      } catch (err) {
        toast.error(`Erro ao adicionar: ${err.message}`);
      }
    };
  };
  const handleDelete = async (transactionId) => {
    if (window.confirm("Tem certeza que deseja deletar esta transação?")) {
      try {
        await deleteTransaction(transactionId);
        toast.success("Transação deletada com sucesso!");
      } catch (err) {
        toast.error(`Erro ao deletar: ${err.message}`);
      }
    }
  };

  const handleEdit = async (transactionId, transaction) => {
      try {
        if(editId === transactionId){
          // Se já estiver editando, cancela a edição
          setEditId(null);
        } else {
          const editTransaction = {
            ...transaction,
            data_transacao: transaction.data_transacao.split("T")[0]
          }
          setEditId(transactionId);
          setNewTransaction(editTransaction);
        }
      } catch (err) {
        console.error("Falha ao editar:", err.message);
      }
  };
  if (!user) {
    return <p>Por favor, faça login para ver as transações.</p>;
  }

  return (
    <>
      <ToastContainer />
      <div className="transacao-container">
        <div className="transacao-layout">
          {/* Metade Esquerda: Formulário */}
            <div className="transacao-form-card">
              <h2 className="transacao-form-titulo">
                {editId ? "Editar Transação" : "Adicionar Nova Transação"}
              </h2>

              <form onSubmit={handleSubmit} className="transacao-form-content">
                {/* Tipo de Transação */}
                <div className="transacao-form-campo">
                  <label className="transacao-form-label"> 
                    Tipo:
                  </label>
                  <select
                    name="tipo_de_transacao"
                    value={newTransaction.tipo_de_transacao}
                    onChange={handleChange}
                    className="transacao-form-select"
                  >
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                </div>
                {/* Valor */}
                <div className="transacao-form-campo">
                  <label className="transacao-form-label">
                    Valor:
                  </label>
                  <input
                    type="number"
                    name="valor"
                    value={newTransaction.valor}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01" 
                    className="transacao-form-input"
                  />
                </div>
                {/* Data e descrição */}
                <div className="transacao-form-grid">
                  <div className="transacao-form-campo">
                    <label className="transacao-form-label">
                      Data:
                    </label>
                    <input
                      type="date"
                      name="data_transacao"
                      value={newTransaction.data_transacao}
                      onChange={handleChange}
                      required
                      className="transacao-form-input"
                    />
                  </div>

                  <div className="transacao-form-campo">
                    <label className="transacao-form-label">
                      Descrição:
                    </label>
                    <input
                      type="text"
                      name="descricao"
                      value={newTransaction.descricao}
                      onChange={handleChange}
                      placeholder="Ex: Salário, Aluguel"
                      required
                      className="transacao-form-input"
                    />
                  </div>
                </div>
                {/* Categoria */}
                <div className="transacao-form-campo">
                  <label className="transacao-form-label">
                    Categoria:
                  </label>
                  <input
                    type="text"
                    name="categoria"
                    value={newTransaction.categoria}
                    onChange={handleChange}
                    placeholder="Ex: Alimentação, Lazer"
                    required
                    className="transacao-form-input"
                  />
                </div>
                {/* Conta */}
                <div className="transacao-form-campo">
                  <label className="transacao-form-label">
                    Conta:
                  </label>
                  <input
                    type="text"
                    name="conta"
                    value={newTransaction.conta}
                    onChange={handleChange}
                    placeholder="Ex: Santander, Nubank, VISA, PIX"
                    required
                    className="transacao-form-input"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full text-white font-semibold cursor-pointer p-2 rounded-md transition duration-150 ${
                    editId
                      ? "bg-emerald-600 hover:bg-emerald-700" /* Cor de Edição */
                      : "bg-violet-600 hover:bg-violet-700" /* Cor de Adição */
                  }`}
                >
                {editId ? "Salvar Alterações" : "Adicionar Transação"}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null); 
                      setNewTransaction(template);
                    }}
                    className="w-full font-semibold cursor-pointer bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-150 mt-2">
                    Cancelar Edição
                  </button>
                )}
              </form>
            </div>
            {/* Metade Direita: Lista de Transações */}
            <div className="transacao-lista-card">
              <div className="transacao-lista-header">
                <h2 className="transacao-lista-titulo">Minhas Transações</h2>
                <button
                  onClick={loadTransactions}
                  className="w-1/3 font-semibold cursor-pointer bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600 transition duration-150 mt-2"
                >
                  Recarregar Lista
                </button>
              </div>
              {/* Mensagens de Status */}
              {isLoading && <p className="text-center text-violet-600 py-4" >Carregando transações...</p>}
              {error && <p className="text-center text-red-500 py-4">Erro: {error}</p>}

              {/* Lista de Transações (Scrollable) */}
              {transactions && transactions.length === 0 && !isLoading && !error ? (
                <p className="text-center text-gray-500 py-10">Nenhuma transação encontrada para este usuário.</p>
              ) : (
                <ul className="transacao-lista-transacoes">
                  {transactions.map((t) => (
                      <li key={t.id}
                        className="transacao-item-transacao"
                      >
                        <div className="transacao-item-detalhes">
                          
                            <span className="transacao-item-descricao">{t.descricao}</span>
                            <span className={`flex flex-row ${
                              t.tipo_de_transacao.toLowerCase() === "receita" ? 
                                "text-emerald-600" :
                                "text-red-600"}`
                              }
                            >
                              <p className="inline">
                                {t.tipo_de_transacao.toLowerCase() === "despesa" ? "- " : "+ "}
                                R$ {parseFloat(t.valor).toFixed(2)}
                              </p>
                            </span>
                         
                          <p className="text-sm text-gray-500">
                            {t.categoria} em{" "}
                            {new Date(t.data_transacao).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="space-x-2 flex justify-end">
                          <button onClick={() => (handleEdit(t.id, t))} className="text-emerald-600 hover:text-white font-semibold p-2 cursor-pointer bg-white border rounded border-emerald-600 hover:bg-emerald-600 transition duration-150">
                            Editar
                          </button>
                          <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-white font-semibold p-2 cursor-pointer bg-white border rounded border-red-600 hover:bg-red-700 transition duration-150">
                            Deletar
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

      </div>     
      {/* Layout de Duas Colunas */}

  </>
  );
}

export default DashboardTransaction;