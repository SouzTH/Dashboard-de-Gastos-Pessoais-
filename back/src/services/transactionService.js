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

async function getTransaction(idTransacao){
  const transaction = await knex("transacao").select("*").where({id: idTransacao}).first()
  
  if (!transaction){
    throw new Error("A transação não foi encontrada.");
  }

  return transaction
}

async function createTransaction(paramId, transactionData, idAuth) {
/*
é passado um json no formato:
{
  "valor": 150.75,
  "tipo_de_transacao": "despesa",
  "data_transacao": "2025-10-25",
  "descricao": "Compra de material de escritório",
  "categoria": "Escritório",
  "conta": "Cartão Corporativo",
  "id_do_grupo": 12,
  "id_do_usuario": 42
}
*/

  const {
    valor,
    tipo_de_transacao,
    data_transacao,
    descricao,
    categoria,
    conta,
    id_do_grupo,
  } = transactionData || {};

  const id_do_usuario = idAuth;

  if (!tipo_de_transacao || !categoria || !conta) {
    throw new Error("Campos obrigatórios: 'tipo', 'categoria' e 'conta'.");
  }

  if (typeof valor !== "number" || valor < 0) {
    throw new Error("O campo 'valor' deve ser um número positivo.");
  }
  if (Number.isInteger(idAuth) !== Number.isInteger(paramId) || idAuth !== paramId) {
    throw new Error("ID do usuário não corresponde ao ID autenticado.");
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

async function deleteTransaction(idTransacao, idAuth) {
  const linhasDeletadas = await knex("transacao")
    .delete()
    .where({
      id: idTransacao,
      id_do_usuario: idAuth,
    });

  if (linhasDeletadas === 0) {
    throw new Error("Transação não encontrada ou não pertence ao usuário.");
  }

  return "Transação deletada com sucesso.";
}

async function updateTransaction(idTransacao, updatedData, idAuth) {
  
  const busca = await knex("transacao").where({ id: idTransacao }).first();

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

  await knex("transacao").update(newTransaction).where({ id: idTransacao });

  return newTransaction;
}

module.exports = {
  getAllTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};