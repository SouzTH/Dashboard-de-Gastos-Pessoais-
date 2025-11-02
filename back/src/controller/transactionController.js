const transactionService = require("../services/transactionService.js");

async function getAllTransactions(req, res) {
  try {
    const id = req.params.id
    const idAuth = req.users.id
    
    if(Number(id) === Number(idAuth)){
      const transactions = await transactionService.getAllTransactions(id);
      res.json({ message: transactions }).status(200);
    }    
    res.json({message: "O ID inserido não corresponde ao usuário logado."}).status(403);
  } catch (err) {
    res.json({ message: err.message }).status(500);
  }
}

async function createTransaction(req, res) {
  try{
    const transactionData = req.body
    const newTransaction = await transactionService.createTransaction(transactionData);

    res.json({message: newTransaction}).status(200);
  }catch (err){
    res.json({ message: err.message }).status(500);
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
    res.json({message: err.message}).satus(500);
  }
}

module.exports = {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
}