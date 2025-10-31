const knex = require("knex")()

async function getAllTransactions(id){
    const transactions = await knex("transacao")
    .select('*')
    .where({id_do_usuario: id});

    if(transactions.length == 0){
        throw new Error("Impossível selecionar transação.")
    }

    return transactions
}


async function createTransaction(transactionData) { 
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
        categoria, 
        conta, 
        id_do_usuario,
    } = transactionData || {}; 

    if (!tipo_de_transacao || !categoria || !conta) {
        throw new Error("Impossível criar a transação. Os campos 'tipo', 'categoria' e 'conta' são obrigatórios.");
    }

    if (!Number.isInteger(id_do_usuario) 
        || id_do_usuario <= 0) {
        throw new Error("O campo 'id_do_usuario' é obrigatório, deve ser um número inteiro positivo.");
    }

    if (typeof valor !== 'number') {
        throw new Error("Impossível criar a transação. O campo 'valor' é obrigatório e deve ser um número.");
    }
    if (valor < 0) {
        throw new Error("Impossível criar a transação. O valor não pode ser negativo.");
    }

    await knex("transacao").insert(transactionData)

    return newTransaction
}


module.exports = {
    getAllTransactions,
    createTransaction,
}