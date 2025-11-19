import { useState, useEffect, useContext } from "react";
import { getTodasTransacoes } from "../services/api";
import { UserContext } from "../context/UserContext";
import ChartCard from "../components/ChartCard";

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const processarDadosMensais = (transacoesBrutas) => {
  if (!Array.isArray(transacoesBrutas)) return { categories: [], entradas: [], saidas: [] };

  const agregadorMensal = {};

  transacoesBrutas.forEach(transacao => {
    if (!transacao.data_transacao) return;
    
    const valor = parseFloat(transacao.valor) || 0;
    const tipo = transacao.tipo_de_transacao;

    const mesAno = transacao.data_transacao.substring(0, 7); //pega o ano e o mes do banco de dados (YYYY-MM)
    
    //cria o objeto do mês se não existir
    if (!agregadorMensal[mesAno]) {
      agregadorMensal[mesAno] = { entradas: 0, saidas: 0 };
    }
    //soma todas as entradas e saídas do mês
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
  // monta os arrays organizados para o highcharts  
  mesesOrdenados.forEach(mesAno => {
    const mesIndex = parseInt(mesAno.split('-')[1], 10) - 1; 
    if (MESES[mesIndex]) {
      //se o mês for válido, adiciona os dados no array
        categories.push(MESES[mesIndex]); 
        entradas.push(agregadorMensal[mesAno].entradas);
        saidas.push(agregadorMensal[mesAno].saidas);
    }
  });

  return { categories, entradas, saidas };
};

const processarDadosPizza = (transacoesBrutas) => {
  if (!Array.isArray(transacoesBrutas)) return [];
  
  const gastosPorCategoria = {};

  transacoesBrutas.forEach(transacao => {
    if (transacao.tipo_de_transacao !== 'Receita') {
      const categoria = transacao.categoria || "Outros";
      const valor = parseFloat(transacao.valor) || 0;

      if (gastosPorCategoria[categoria]) {
        gastosPorCategoria[categoria] += valor;
      } else {
        gastosPorCategoria[categoria] = valor;
      }
    }
  });

  return Object.entries(gastosPorCategoria).map(([nome, valor]) => ({
    name: nome,
    y: valor
  }));
};
const processarDadosSemanais = (transacoesBrutas) => {
  if (!Array.isArray(transacoesBrutas)) return { categories: [], entradas: [], saidas: [] };
  const agregadorSemanal = {};
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - 70); //pega os 70 dias anteriores (10 semanas)

  transacoesBrutas.forEach(transacao => {
    if (!transacao.data_transacao) return;
    const dataLimpa = transacao.data_transacao.substring(0, 10);
    const [ano, mes, dia] = dataLimpa.split('-').map(Number);
    
    const dataTransacao = new Date(ano, mes - 1, dia);

    if (dataTransacao < dataLimite) return;

    const valor = parseFloat(transacao.valor) || 0;
    const tipo = transacao.tipo_de_transacao;

    const diaDaSemana = dataTransacao.getDay(); 
    const inicioDaSemana = new Date(dataTransacao);
    inicioDaSemana.setDate(dataTransacao.getDate() - diaDaSemana);

    const chaveSemana = inicioDaSemana.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

    if (!agregadorSemanal[chaveSemana]) {
      agregadorSemanal[chaveSemana] = { 
          entradas: 0, 
          saidas: 0, 
          timestamp: inicioDaSemana.getTime() 
      };
    }

    if (tipo === 'Receita') {
      agregadorSemanal[chaveSemana].entradas += valor;
    } else {
      agregadorSemanal[chaveSemana].saidas += valor;
    }
  });

  const semanasOrdenadas = Object.keys(agregadorSemanal).sort((a, b) => {
      return agregadorSemanal[a].timestamp - agregadorSemanal[b].timestamp;
  });

  const resultado = {
    categories: semanasOrdenadas, 
    entradas: semanasOrdenadas.map(k => agregadorSemanal[k].entradas),
    saidas: semanasOrdenadas.map(k => agregadorSemanal[k].saidas)
  };
  
  return resultado;
};

function DashboardHome() {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    pizza: [],
    barras: { categories: [], entradas: [], saidas: [] },
    historico: [],
  });
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) { 
          return; 
      }
      
      setLoading(true); 

      try {
        const response = await getTodasTransacoes(userId);
        const transacoesBrutas = response?.data?.message || [];
        const dadosMensaisFormatados = processarDadosMensais(transacoesBrutas);
        const dadosPizzaFormatados = processarDadosPizza(transacoesBrutas);
        const dadosSemanaisFormatados = processarDadosSemanais(transacoesBrutas);
        const dadosHistorico = transacoesBrutas.slice(transacoesBrutas.length - 5).reverse(); //pega as 5 últimas transações

        setDashboardData({
          pizza: dadosPizzaFormatados,
          barras: dadosMensaisFormatados,
          semanal: dadosSemanaisFormatados,
          historico: dadosHistorico,
        });

      } catch (error) {
        console.error("ERRO no Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return (
        <div className="w-full h-screen flex items-center justify-center text-gray-600 gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
            {" "}Carregando dados...
        </div>
    )
  }

  return (
    <div className="w-full h-screen p-6 font-sans flex justify-center">
      <div className="w-[95%] grid grid-cols-12 grid-rows-4 gap-6 overflow-auto pb-10">

        <div className="col-span-4 row-span-2 bg-[#E6E6E6] rounded-2xl p-4 flex flex-col text-gray-700 shadow-sm">
          <div className="flex-1 bg-white/60 rounded-xl p-2 h-full border border-white/50">
            <ChartCard 
              title="Saídas por Categoria" 
              defaultType="pie"
              defaultData="categoria"
              dashboardData={dashboardData} 
            />
          </div>
        </div>

        <div className="col-span-5 row-span-2 bg-[#E6E6E6] rounded-2xl p-4 flex flex-col text-gray-700 shadow-sm">
          <div className="flex-1 bg-white/60 rounded-xl p-2 h-full border border-white/50"> 
            <ChartCard 
              title="Balanço Mensal" 
              defaultType="bar"
              defaultData="mensal"
              dashboardData={dashboardData}
            />
          </div>
        </div>
        <div className="col-span-3 row-span-2 bg-linear-to-br from-purple-600 to-purple-800 rounded-2xl p-6 flex flex-col items-center justify-center text-white shadow-md">
          <div className="w-16 h-16 bg-white/20 rounded-full mb-3 flex items-center justify-center text-4xl backdrop-blur-sm">
            💳
          </div>
          <h3 className="font-semibold text-base text-center">Métodos de Pagamento</h3>
          <p className="text-xs text-purple-200 mt-2 text-center">Cartão de Crédito Principal</p>
        </div>

        <div className="col-span-7 row-span-2 bg-[#E6E6E6] rounded-2xl p-4 flex flex-col text-gray-700 shadow-sm">
          <div className="flex-1 bg-white/60 rounded-xl p-2 h-full border border-white/50">
            <ChartCard 
              title="Evolução (Linha)" 
              defaultType="line"
              defaultData="semanal"
              dashboardData={dashboardData}
            />
          </div>
        </div>

        <div className="col-span-5 row-span-2 bg-white rounded-2xl p-6 flex flex-col text-gray-700 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Histórico</h2>
          <p className="text-xs text-gray-500 mb-4">Últimas 5 movimentações</p>
          
          <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
            {dashboardData.historico.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                <p>Nenhuma transação encontrada.</p>
              </div>
            ) : (
              dashboardData.historico.map((transacao, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-sm">{transacao.categoria || "Geral"}</span> 
                    <span className="text-xs text-gray-400">{transacao.descricao || "Sem descrição"}</span>
                  </div>
                  <span className={`text-sm font-bold ${transacao.tipo_de_transacao?.toLowerCase() === 'receita' ? "text-emerald-600" : "text-rose-500"}`}>
                    {transacao.tipo_de_transacao?.toLowerCase() === 'receita' ? '+' : '-'} 
                    R$ {parseFloat(transacao.valor).toFixed(2)}
                  </span>
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