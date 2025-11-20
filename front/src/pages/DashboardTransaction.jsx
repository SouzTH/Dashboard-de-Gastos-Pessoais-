import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
  
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
        console.error(`Falha ao editar: ${err.message}`);
      }
  };
  if (!user) {
    return <p>Por favor, faça login para ver as transações.</p>;
  }

  return (
    <>
      <ToastContainer />
      <div className="w-3/4 p-6 h-screen">
        <div className="flex flex-row min-w-full h-full justify-between space-x-8">
          {/* Metade Esquerda: Formulário */}
            <div className="w-1/2 p-4 border border-gray-800 rounded-lg shadow-lg bg-gray-50 overflow-auto h-full">
              <h2 className="text-xl font-semibold self-baseline-center">
                {editId ? "Editar Transação" : "Adicionar Nova Transação"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <label className=" text-sm font-medium text-gray-700">
                    Tipo:
                  </label>
                  <select
                    name="tipo_de_transacao"
                    value={newTransaction.tipo_de_transacao}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-400 rounded-md p-2"
                  >
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
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
                    className="mt-1 w-full border border-gray-400 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Data:
                  </label>
                  <input
                    type="date"
                    name="data_transacao"
                    value={newTransaction.data_transacao}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border border-gray-400 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Descrição:
                  </label>
                  <input
                    type="text"
                    name="descricao"
                    value={newTransaction.descricao}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border border-gray-400 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Categoria:
                  </label>
                  <input
                    type="text"
                    name="categoria"
                    value={newTransaction.categoria}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border border-gray-400 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Conta:
                  </label>
                  <input
                    type="text"
                    name="conta"
                    value={newTransaction.conta}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border border-gray-400 rounded-md p-2"
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
            <div className="flex flex-col w-1/2 h-full space-y-4 p-4 border border-gray-800 rounded-lg shadow-lg bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Minhas Transações</h2>
                <button
                  onClick={loadTransactions}
                  className="bg-emerald-500 text-white font-semibold cursor-pointer p-2 rounded text-sm hover:bg-emerald-600 transition duration-150"
                >
                  Recarregar Lista
                </button>
              </div>

              {isLoading && <p>Carregando transações...</p>}
              {error && <p className="text-red-500">Erro: {error}</p>}

              {transactions && transactions.length === 0 && !isLoading && !error ? (
                <p>Nenhuma transação encontrada para este usuário.</p>
              ) : (
                <ul className="space-y-3 flex flex-col overflow-auto h-full">
                  {transactions.map((t) => (
                      <li key={t.id}
                        className="p-4 border border-gray-600 rounded shadow-md flex justify-between items-center"
                      >
                        <div className="w-1/2">
                          
                            <span className="font-semibold">{t.descricao}</span>
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
                        <div className="space-x-4 w-1/2 flex justify-end">
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