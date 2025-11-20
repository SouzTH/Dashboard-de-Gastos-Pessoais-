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

async function getAggregatedDashboardData(userId) {
    // 1. DADOS DO GRÁFICO DE PIZZA (Saídas por Categoria)
    // Agrupa por 'categoria' e soma o 'valor' apenas para transações de 'despesa'
    const pizzaData = await knex("transacao")
        .select("categoria")
        .sum("valor as total")
        .where({
            id_do_usuario: userId,
            tipo_de_transacao: "despesa"
        })
        .groupBy("categoria")
        .orderBy("total", "desc");

    // Mapeia para o formato que o Highcharts espera: [{name: 'Cat', y: total}]
    const formattedPizzaData = pizzaData.map(item => ({
        name: item.categoria,
        y: parseFloat(item.total) // Converte para número de ponto flutuante
    }));

    // 2. DADOS DO GRÁFICO DE BARRAS/LINHAS (Entradas e Saídas por Mês)
    // Usando knex.raw para extrair o mês do campo data_transacao (idealmente no formato 'YYYY-MM-DD')
    const monthlyData = await knex("transacao")
        .select(
            knex.raw('DATE_FORMAT(data_transacao, "%Y-%m") as mes_ano'), 
            knex.raw('SUM(CASE WHEN tipo_de_transacao = "receita" THEN valor ELSE 0 END) as entradas'),
            knex.raw('SUM(CASE WHEN tipo_de_transacao = "despesa" THEN valor ELSE 0 END) as saidas')
        )
        .where({ id_do_usuario: userId })
        .groupBy("mes_ano")
        .orderBy("mes_ano", "asc");

    // 3. DADOS DO HISTÓRICO (Últimas 5 Transações)
    const historyData = await knex("transacao")
        .select("valor", "tipo_de_transacao", "descricao", "data_transacao", "categoria")
        .where({ id_do_usuario: userId })
        .orderBy("data_transacao", "desc")
        .limit(5);

    return {
        pizza: formattedPizzaData,
        mensal: monthlyData,
        historico: historyData,
    };
}

module.exports = {
  getAllTransactions,
  getTransaction,
  getAggregatedDashboardData,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};