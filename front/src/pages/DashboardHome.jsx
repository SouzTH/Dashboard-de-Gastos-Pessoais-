import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// 🎯 Importar seu hook de contexto
import { useAuth } from "../context/AuthContext";

// Variáveis auxiliares para processamento de mês
const MESES = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

// ---------------- FUNÇÃO DE PROCESSAMENTO DE DADOS ----------------

const processarDadosMensais = (dadosMensaisBrutos) => {
  const categories = [];
  const entradas = [];
  const saidas = [];
  
  dadosMensaisBrutos.forEach(item => {
    const mesIndex = parseInt(item.mes_ano.split('-')[1], 10) - 1; 
    
    categories.push(MESES[mesIndex]); 
    
    entradas.push(parseFloat(item.entradas) || 0);
    saidas.push(parseFloat(item.saidas) || 0);
  });

  return { categories, entradas, saidas };
};

// ---------------- COMPONENTE PRINCIPAL ----------------

function DashboardHome() {
  
  // 🎯 Acessa o objeto do usuário logado e o token
  const { user, token } = useAuth();
  // Se o usuário existir (logado), pega o ID, caso contrário, é null.
  const userId = user ? user.id : null; 

  // ---------------- Estado local ----------------
  const [loading, setLoading] = useState(true);
  
  const [dashboardData, setDashboardData] = useState({
    pizza: [],
    barras: { categories: [], entradas: [], saidas: [] },
    historico: [],
  });
  
  // ---------------- LÓGICA DE BUSCA DE DADOS (API) ----------------
  useEffect(() => {
    const fetchDashboardData = async () => {
      
      // 🛡️ Proteção: não executa a requisição se não houver ID ou Token
      if (!userId || !token) { 
          setLoading(false);
          return;
      }
      
      try {
        setLoading(true);
        
        // Requisição segura
        const response = await fetch(`/api/read/dashboard-data/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();

        // Processamento e formatação
        const dadosMensaisFormatados = processarDadosMensais(data.mensal);

        setDashboardData({
          pizza: data.pizza,
          barras: dadosMensaisFormatados,
          historico: data.historico,
        });

      } catch (error) {
        console.error("Erro ao carregar o dashboard:", error.message);
        setDashboardData({ pizza: [], barras: { categories: [], entradas: [], saidas: [] }, historico: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId, token]); 

  // ---------------- CONFIGURAÇÕES HIGHCHARTS ----------------
  
  const highchartsColors = ["#6A5ACD", "#90EE90", "#48BB78", "#64C963"]; 

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
      { name: "Entradas", data: dashboardData.barras.entradas, color: "#6B46C1" },
      { name: "Saídas", data: dashboardData.barras.saidas, color: "#48BB78" },
    ],
  };

  const lineOptions = {
    chart: { type: "line", backgroundColor: "transparent", height: 250 },
    title: { text: "" },
    xAxis: { categories: dashboardData.barras.categories },
    series: [
      { name: "Entradas", data: dashboardData.barras.entradas, color: "#6B46C1" },
      { name: "Saídas", data: dashboardData.barras.saidas, color: "#48BB78" },
    ],
  };

  // ---------------- LAYOUT JSX COMPLETO ----------------

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">Carregando Dashboard...</div>
  }

  return (
    <div className="w-full h-screen p-6 bg-gray-100 font-sans flex justify-center">
      <div className="w-[95%] grid grid-cols-12 grid-rows-4 gap-6 overflow-auto">

        {/* ---------- CARD 1: Saídas por categoria (PIZZA) ---------- */}
        <div className="col-span-4 row-span-2 bg-[#E6E6E6] rounded-2xl p-6 flex flex-col text-gray-700">
          <h2 className="text-lg font-semibold text-center mb-4">Saídas por categoria</h2>
          <div className="flex-1 bg-white/40 rounded-xl flex items-center justify-center h-full">
            <HighchartsReact highcharts={Highcharts} options={pizzaOptions} />
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Porcentagem dos gastos por categoria
          </p>
        </div>

        {/* ---------- CARD 2: Entradas e saídas mensais (BARRAS) ---------- */}
        <div className="col-span-5 row-span-2 bg-[#E6E6E6] rounded-2xl p-6 flex flex-col text-gray-700">
          <h2 className="text-lg font-semibold text-center mb-4">Entradas e saídas mensais</h2>
          <div className="flex-1 bg-white/40 rounded-xl h-full"> 
            <HighchartsReact highcharts={Highcharts} options={barOptions} />
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Média de valores por mês
          </p>
        </div>

        {/* ---------- CARD 3: Métodos de pagamento (SIMPLES) ---------- */}
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

        {/* ---------- CARD 4: Entradas e saídas semanais (LINHAS) ---------- */}
        <div className="col-span-7 row-span-2 bg-[#E6E6E6] rounded-2xl p-6 flex flex-col text-gray-700">
          <h2 className="text-lg font-semibold text-center mb-4">Entradas e saídas semanais</h2>
          <div className="flex-1 bg-white/40 rounded-xl h-full">
            <HighchartsReact highcharts={Highcharts} options={lineOptions} />
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Média de valores por semana
          </p>
        </div>

        {/* ---------- CARD 5: Histórico de transações (LISTA) ---------- */}
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
                              <span className={transacao.tipo_de_transacao === 'receita' ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                  {transacao.tipo_de_transacao === 'receita' ? '+' : '–'} R${parseFloat(transacao.valor).toFixed(2)}
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