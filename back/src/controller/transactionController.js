const transactionService = require("../services/transactionService.js");

async function getAllTransactions(req, res) {
  try {
    const id = req.params.id
    const transactions = await transactionService.getAllTransactions(id);
    

    res.json({ users: transactions }).status(200);
  } catch (err) {
    res.json({ error: err.message }).status(500);
  }
}

async function createTransaction(req, res) {
  try{
    const transactionData = req.body
    const newTransaction = await transactionService.createTransaction(transactionData);

    res.json({message: newTransaction}).status(200);
  }catch (err){
    res.json({ error: err.message }).status(500);
  }
}

module.exports = {
  getAllTransactions,
  createTransaction,
}