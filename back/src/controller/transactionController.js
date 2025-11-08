const transactionService = require("../services/transactionService.js");

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

async function createTransaction(req, res) {
  try{
    const transactionData = req.body

    //const newTransaction = await transactionService.createTransaction(transactionData);

    const idAuth = req.id

    transactionData.userId = idAuth

    const newTransaction = await transactionService.createTransaction(transactionData);

    //res.status(200).json({message: newTransaction});

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
    const transactionId = req.params.id;

    const transactionAndUserId = {
      id: transactionId,
      idUser: idAuth
    };

    const result = await transactionService.deleteTransaction(transactionAndUserId);

    return res.status(200).json({ message: result });

  } catch(err){
      res.status(500).json({message: err.message});
    }
}

async function updateTransaction(req, res) {
  try {
    const id = Number(req.params.id);
    const idAuth = Number(req.id);
    const updatedData = req.body;
    
    const transaction = await transactionService.getTransaction(id);
    if (!transaction || Number(transaction.id_do_usuario) !== Number(idAuth)) {
      return res.status(403).json({ message: "Não autenticado ou a transação não existe."});
    }

    updatedData.userId = idAuth;
    const updatedTransaction = await transactionService.updateTransaction(id, updatedData, idAuth);

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
  createTransaction,
  deleteTransaction,
  updateTransaction,
}