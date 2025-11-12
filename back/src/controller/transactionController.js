const transactionService = require("../services/transactionService.js");
const autenticar = require("../middleware/auth.js");

async function getAllTransactions(req, res) {
  try {
    const id = req.params.id
    const idAuth = req.id
    
    if(Number(id) === Number(idAuth)){
      const transactions = await transactionService.getAllTransactions(id);
      res.status(200).json({ message: transactions });
    }    
    res.json({message: "O ID inserido não corresponde ao usuário logado."}).status(403);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getTransaction(req, res) {
  try {
    const transactionId = req.params.idTransacao;
    const idAuth = req.id;
    const idParam = Number(req.params.id);

    if (idAuth !== idParam) {
      return res.status(403).json({ message: "ID do usuário não corresponde ao ID autenticado." });
    }
    const transaction = await transactionService.getTransaction(transactionId);

    if (transaction.id_do_usuario !== idAuth) {
      return res.status(403).json({ message: "Você não tem permissão para acessar esta transação." });
    }

    return res.status(200).json({ transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createTransaction(req, res) {
  try{
    const transactionData = req.body

    //const newTransaction = await transactionService.createTransaction(transactionData);
    const idAuth = req.id
    const idParam = Number(req.params.id)
    const newTransaction = await transactionService.createTransaction(idParam, transactionData, idAuth);

    return res.status(201).json({
      message: "Transação criada com sucesso!",
      transaction: newTransaction
    });

  }catch (err){
    res.status(500).json({ message: err.message });
  }
}

async function deleteTransaction(req, res) {
  try{
    const idAuth = req.id
    const transactionId = req.params.idTransacao;
    const idParam = Number(req.params.id)

    if (idAuth !== idParam) {
      return res.status(403).json({ message: "ID do usuário não corresponde ao ID autenticado." });
    }
    const result = await transactionService.deleteTransaction(transactionId, idAuth);

    return res.status(200).json({ message: result });

  } catch(err){
      res.status(500).json({message: err.message});
    }
}

async function updateTransaction(req, res) {
  try {
    const IDs = {
      idTransacao: Number(req.params.idTransacao),
      id: Number(req.params.id),
      idAuth: Number(req.id),
    } 
    const updatedData = req.body;
    
    if(IDs.id !== IDs.idAuth){
      return res.status(403).json({ message: "ID do usuário não corresponde ao ID autenticado."});
    }

    const transaction = await transactionService.getTransaction(IDs.idTransacao);
    if (!transaction || transaction.id_do_usuario !== IDs.idAuth) {
      return res.status(403).json({ message: "Não autenticado ou sem transação."});
    }

    updatedData.userId = IDs.idAuth;
    const updatedTransaction = await transactionService.updateTransaction(IDs.idTransacao,updatedData, IDs.idAuth);
    return res.status(200).json({
      message: "Transação atualizada com sucesso!",
      transacao: updatedTransaction
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
}