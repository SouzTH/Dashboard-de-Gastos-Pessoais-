const transactionService = require("../services/transactionService.js");

async function getAllTransactions(req, res) {
  try {
    const id = req.params.id
    const idAuth = req.users.id
    
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
    const newTransaction = await transactionService.createTransaction(transactionData);

    res.status(200).json({message: newTransaction});
  }catch (err){
    res.status(500).json({ message: err.message });
  }
}

async function deleteTransaction(req, res) {
  try{
    const transactionAndUserId = {
      id: req.params.id, 
      idUser: req.id
    }
    await transactionService.deleteTransaction(transactionAndUserId)
  } catch(err){
    res.satus(500).json({message: err.message});
  }
}

async function updateTransaction(req, res) {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedTransaction = await transactionService.updateTransaction(id, updatedData);

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