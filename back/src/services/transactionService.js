const knex = require("../database/export");

async function getAllTransactions(id) {
  const transactions = await knex("transacao")
    .select("*")
    .where({ id_do_usuario: id });

  if (transactions.length === 0) {
    throw new Error("Nenhuma transação encontrada para este usuário.");
  }

  return transactions;
}

async function getTransaction(id){
  const transaction = await knex("transacao").select("*").where({id: id}).first()
  
  if (transaction.length === 0){
    throw new Error("Nenhuma transação encontrada")
  }

  return transaction
}

async function createTransaction(transactionData) {
  const {
    valor,
    tipo_de_transacao,
    data_transacao,
    descricao,
    categoria,
    conta,
    id_do_grupo,
    id_do_usuario, 
  } = transactionData || {};

  if (!tipo_de_transacao || !categoria || !conta) {
    throw new Error("Campos obrigatórios: 'tipo', 'categoria' e 'conta'.");
  }

  if (typeof valor !== "number" || valor < 0) {
    throw new Error("O campo 'valor' deve ser um número positivo.");
  }

  if (!Number.isInteger(id_do_usuario) || id_do_usuario <= 0) {
    throw new Error("ID do usuário inválido.");
  }

  const inserted = await knex("transacao").insert({
    valor,
    tipo_de_transacao,
    data_transacao,
    descricao,
    categoria,
    conta,
    id_do_grupo,
    id_do_usuario,
  });

  if (!inserted) {
    throw new Error("Falha ao criar transação.");
  }

  return transactionData;
}

async function deleteTransaction(transactionIdData) {
  const linhasDeletadas = await knex("transacao")
    .delete()
    .where({
      id: transactionIdData.id,
      id_do_usuario: transactionIdData.idUser,
    });

  if (linhasDeletadas === 0) {
    throw new Error("Transação não encontrada ou não pertence ao usuário.");
  }

  return "Transação deletada com sucesso.";
}

async function updateTransaction(id, updatedData, idAuth) {
  
  const busca = await knex("transacao").where({ id }).first();

  if (!busca) {
    throw new Error("Transação não encontrada.");
  }

  
  if (busca.id_do_usuario !== idAuth) {
    throw new Error("Você não tem permissão para editar esta transação.");
  }

  const {
    valor,
    tipo_de_transacao,
    data_transacao,
    descricao,
    categoria,
    conta,
    id_do_grupo,
  } = updatedData || {};

  if (!valor || !tipo_de_transacao || !categoria || !conta) {
    throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
  }

  if (typeof valor !== "number" || valor < 0) {
    throw new Error("O campo 'valor' deve ser um número positivo.");
  }

  const newTransaction = {
    valor,
    tipo_de_transacao,
    data_transacao,
    descricao,
    categoria,
    conta,
    id_do_grupo,
  };

  await knex("transacao").update(newTransaction).where({ id });

  return newTransaction;
}

module.exports = {
  getAllTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};
