import React, { useState, useEffect, useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getTodasTransacoes } from "../services/api";
import { UserContext } from "../context/UserContext";

// Variáveis auxiliares para processamento de mês
const MESES = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

// ---------------- NOVA FUNÇÃO DE PROCESSAMENTO ----------------

const processarDadosMensais = (transacoesBrutas) => {
  const agregadorMensal = {};

  // 2. Loop para somar cada transação
  transacoesBrutas.forEach(transacao => {
    const valor = parseFloat(transacao.valor);
    const tipo = transacao.tipo_de_transacao;

    const mesAno = transacao.data_transacao.substring(0, 7); 
    if (!agregadorMensal[mesAno]) {
      agregadorMensal[mesAno] = { entradas: 0, saidas: 0 };
    }
    if (tipo === 'Receita') {
      agregadorMensal[mesAno].entradas += valor;
    } else {
      agregadorMensal[mesAno].saidas += valor;
    }
  });
  const mesesOrdenados = Object.keys(agregadorMensal).sort();
  const categories = [];
  const entradas = [];
  const saidas = [];
  
  mesesOrdenados.forEach(mesAno => {
    const mesIndex = parseInt(mesAno.split('-')[1], 10) - 1; 
    categories.push(MESES[mesIndex]); 

    const dadosDoMes = agregadorMensal[mesAno];
    entradas.push(dadosDoMes.entradas);
    saidas.push(dadosDoMes.saidas);
  });

  return { categories, entradas, saidas };
};
const processarDadosPizza = (transacoesBrutas) => {
  const gastosPorCategoria = {};

  transacoesBrutas.forEach(transacao => {
    if (transacao.tipo_de_transacao !== 'Receita') {
      
      const categoria = transacao.categoria || "Sem Categoria";
      const valor = parseFloat(transacao.valor);

      if (gastosPorCategoria[categoria]) {
        gastosPorCategoria[categoria] += valor;
      } else {
        gastosPorCategoria[categoria] = valor;
      }
    }
  });

  /* Converte para o formato que o Highcharts espera:
  [ { 
      name: "Lazer", 
      y: 150.75 
    }, 
    {
      name: "Escritório", 
      y: 800 
     } 
  ] */
  return Object.entries(gastosPorCategoria).map(([nome, valor]) => ({
    name: nome,
    y: valor
  }));
};
function DashboardHome() {
  
  const { user, token } = useContext(UserContext);
  const userId = user ? user.id : null;

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    pizza: [],
    barras: { categories: [], entradas: [], saidas: [] },
    historico: [],
  });
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      
      console.log("DASHBOARD useEffect: Tentando rodar com userId:", userId);

      if (!userId) { 
          console.log("DASHBOARD useEffect: userId é NULO, aguardando UserContext carregar.");
          setLoading(false); 
          return; 
      }
      
      console.log("DASHBOARD useEffect: userId é VÁLIDO. Chamando a API...");
      setLoading(true); 

      try {
        const response = await getTodasTransacoes(userId);

        const transacoesBrutas = response.data.message;
        console.log("DASHBOARD: Transações brutas recebidas:", transacoesBrutas);

        const dadosMensaisFormatados = processarDadosMensais(transacoesBrutas);
        const dadosPizzaFormatados = processarDadosPizza(transacoesBrutas);
        const dadosHistorico = transacoesBrutas.slice(0, 5);
        setDashboardData({
          pizza: dadosPizzaFormatados,
          barras: dadosMensaisFormatados,
          historico: dadosHistorico,
        });

      } catch (error) {
        console.error("ERRO no Dashboard useEffect:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  
  const highchartsColors = ["#E26653", "#7BF660", "#470F5C", "#7818DB"]; 

  const pizzaOptions = {
    colors: highchartsColors,
    chart: { type: "pie", backgroundColor: "transparent", height: 250 },
    title: { text: "" },
    plotOptions: {
        pie: {
            dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f} %' }
        }
    },
    series: [
      {
        name: "Gastos",
        data: dashboardData.pizza.length > 0 ? dashboardData.pizza : [{ name: "Sem Dados", y: 100, color: '#DDD' }], 
      },
    ],
  };

  const barOptions = {
    chart: { type: "column", backgroundColor: "transparent", height: 250 },
    title: { text: "" },
    xAxis: { categories: dashboardData.barras.categories }, 
    series: [
      { name: "Entradas", 
        data: dashboardData.barras.entradas, 
        color: "#7818DB" },
      { name: "Saídas",
         data: dashboardData.barras.saidas, 
         color: "#E26653" },
    ],
  };
  const lineOptions = {
    chart: { type: "line", backgroundColor: "transparent", height: 250 },
    title: { text: "" },
    xAxis: { categories: dashboardData.barras.categories },
    series: [
      { name: "Entradas", 
        data: dashboardData.barras.entradas, 
        color: "#60A03B" },
      { name: "Saídas", 
        data: dashboardData.barras.saidas, 
        color: "#E26653" },
    ],
  };

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">Carregando Dashboard...</div>
  }

  return (
    <div className="w-full h-screen p-6 bg-gray-100 font-sans flex justify-center">
      <div className="w-[95%] grid grid-cols-12 grid-rows-4 gap-6 overflow-auto">

        {/* ---------- Saídas por categoria ---------- */}
        <div className="col-span-4 row-span-2 bg-[#E6E6E6] rounded-2xl p-6 flex flex-col text-gray-700">
          <h2 className="text-lg font-semibold text-center mb-4">Saídas por categoria</h2>
          <div className="flex-1 bg-white/40 rounded-xl flex items-center justify-center h-full">
            <HighchartsReact highcharts={Highcharts} options={pizzaOptions} />
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Porcentagem dos gastos por categoria
          </p>
        </div>

        {/* ---------- Entradas e saídas mensais ---------- */}
        <div className="col-span-5 row-span-2 bg-[#E6E6E6] rounded-2xl p-6 flex flex-col text-gray-700">
          <h2 className="text-lg font-semibold text-center mb-4">Entradas e saídas mensais</h2>
          <div className="flex-1 bg-white/40 rounded-xl h-full"> 
            <HighchartsReact highcharts={Highcharts} options={barOptions} />
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Média de valores por mês
          </p>
        </div>

        {/* ---------- Métodos de pagamento ---------- */}
        <div className="col-span-3 row-span-2 bg-[#E6E6E6] rounded-2xl p-6 flex flex-col items-center justify-center text-gray-700">
          <div className="w-16 h-16 bg-transparent rounded-full mb-3 flex items-center justify-center text-4xl">
            💳
          </div>
          <h3 className="font-semibold text-base text-center">
            Métodos de pagamento
          </h3>
          <p className="text-sm text-center mt-2">
            Seu principal método de pagamento
          </p>
        </div>

        {/* ---------- Entradas e saídas semanais ---------- */}
        <div className="col-span-7 row-span-2 bg-[#E6E6E6] rounded-2xl p-6 flex flex-col text-gray-700">
          <h2 className="text-lg font-semibold text-center mb-4">Entradas e saídas semanais</h2>
          <div className="flex-1 bg-white/40 rounded-xl h-full">
            <HighchartsReact highcharts={Highcharts} options={lineOptions} />
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Média de valores por semana
          </p>
        </div>

        {/* ---------- Histórico de transações ---------- */}
        <div className="col-span-5 row-span-2 bg-[#E6E6E6] rounded-2xl p-6 flex flex-col text-gray-700">
          <h2 className="text-lg font-semibold text-center mb-2">Histórico de transações</h2>
          <p className="text-sm text-center mb-4 text-gray-600">Últimas entradas e saídas</p>
          
          <div className="flex-1 space-y-4 text-gray-700 overflow-y-auto">
            {dashboardData.historico.length === 0 ? (
              <p className="text-center text-gray-500">Nenhuma transação recente.</p>
            ) : (
              dashboardData.historico.map((transacao, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <span className="font-medium">{transacao.categoria}</span> 
                    <span className={transacao.tipo_de_transacao.toLowerCase() === 'receita' ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {transacao.tipo_de_transacao.toLowerCase() === 'receita' ? '+' : '–'} R${parseFloat(transacao.valor).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {transacao.descricao || new Date(transacao.data_transacao).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardHome;