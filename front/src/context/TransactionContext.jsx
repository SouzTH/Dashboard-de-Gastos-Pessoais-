// src/context/TransactionContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { UserContext } from "./UserContext";
import api from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { user, token } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTransactions = useCallback(async () => {
    if (!user || !user.id || !token) {
      setTransactions([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/read/all-transactions/${user.id}`);
      setTransactions(response.data.message); // message contém as transações, é um array de objetos
    } catch (err) {
      console.error("Erro ao carregar transações:", err);
      setError("Falha ao carregar transações.");
      setTransactions([]);
    } finally { // independentemente de sucesso ou erro
      setIsLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]); // Sempre que o setTransactions mudar, o render é disparado, o useEffect ocorre, e o useCallback previne que haja um loop infinito de chamadas de loadTransactions.

  // --- Funções CRUD ---

  const addTransaction = async (data) => {
    try {
      await api.post(`/create/transaction/${user.id}`, data);
      await loadTransactions();
    } catch (err) {
      setError("Erro ao adicionar transação.");
      throw new Error(err); 
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await api.delete(
        `/delete/transaction/${transactionId}/${user.id}`
      );
      await loadTransactions();
    } catch (err) {
      setError("Erro ao deletar transação.");
      throw new Error(err); 
    }
  };

  const updateTransaction = async (transactionId, data) => {
    try {
      await api.patch(
        `/update/transaction/${transactionId}/${user.id}`,
        data
      );
      await loadTransactions(); // Recarrega a lista
    } catch (err) {
      setError("Erro ao atualizar transação.");
      throw new Error(err); 
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isLoading,
        error,
        loadTransactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};