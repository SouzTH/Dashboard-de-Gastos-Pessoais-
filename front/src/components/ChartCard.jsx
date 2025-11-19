import { useState, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import GraphFilter from './GraphFilter';
import DataFilter from './DataFilter';

const COLORS = {
  primary: "#7818DB",
  secondary: "#E26653",
  tertiary: "#7BF660",
  quaternary: "#470F5C", 
  neutral: "#DDD"
};

const PIE_COLORS = [
    COLORS.secondary,   // Jan
    COLORS.primary,     // Fev
    COLORS.tertiary,    // Mar
    COLORS.quaternary,  // Abr
    "#F59E0B",          // Mai (Amarelo)
    "#3B82F6",          // Jun (Azul)
    "#8B5CF6",          // Jul (Roxo Claro)
    "#EC4899",          // Ago (Rosa)
    "#10B981",          // Set (Esmeralda)
    "#6366F1",          // Out (Indigo)
    "#F43F5E",          // Nov (Vermelho Rosa)
    "#84CC16"           // Dez (Lima)
];

export default function ChartCard({ 
    title, 
    defaultType = 'bar', 
    dashboardData = {}, 
    defaultData = 'mensal'
  }) {
  const [graphType, setGraphType] = useState(defaultType);
  const [dataFilter, setDataFilter] = useState(defaultData);
  const options = useMemo(() => {
    let rawData;
    if (dataFilter === 'mensal') {
        rawData = dashboardData?.barras;
    } else if (dataFilter === 'semanal') {
        rawData = dashboardData?.semanal;
    } else if (dataFilter === 'categoria') {
        rawData = dashboardData?.pizza; // [{ name, y }]
    }
    const isPieVisual = graphType === 'pie';
    const isTimeData = dataFilter === 'mensal' || dataFilter === 'semanal';
    const isCategoryData = dataFilter === 'categoria';
    const commonOptions = {
      chart: {
        type: graphType === 'bar' ? 'column' : graphType, 
        backgroundColor: "transparent",
        height: 220,
        style: { fontFamily: 'inherit' }
      },
      title: { text: "" },
      credits: { enabled: false },
      legend: { itemStyle: { color: '#374151' } },
    };

    if (isCategoryData) {
      if (isPieVisual) {
        return {
          ...commonOptions,
          colors: PIE_COLORS,
          tooltip: { pointFormat: '<b>R$ {point.y:.2f}</b>' },
          plotOptions: {
            pie: { allowPointSelect: true, 
              cursor: 'pointer', 
              dataLabels: { enabled: false }, 
              showInLegend: true, 
              innerSize: '50%' }
          },
          series: [{
            name: "Gastos",
            colorByPoint: true,
            data: rawData || [{ name: "Sem Dados", y: 100, color: COLORS.neutral }]
          }]
        };
      } else {
        return {
          ...commonOptions,
          xAxis: { 
            categories: rawData?.map(d => d.name) || [], 
            crosshair: true, 
            labels: { style: { color: '#6B7280'} } 
          },
          yAxis: { 
            title: { text: '' }, 
            labels: { style: { color: '#6B7280'} } 
          },
          tooltip: { valuePrefix: 'R$ ' },
          series: [{
            name: 'Valor',
            data: rawData?.map(d => d.y) || [],
            color: COLORS.primary
          }]
        };
      }
    }
    if (isTimeData) {
      if (isPieVisual) {
        const pieData = rawData?.categories?.map((cat, index) => ({
            name: cat, // Ex: "Jan" ou "Semana 01"
            y: rawData?.saidas?.[index] || 0
        })) || [];

        return {
          ...commonOptions,
          colors: PIE_COLORS,
          tooltip: { pointFormat: '<b>{point.name}: R$ {point.y:.2f}</b>' },
          title: { 
            text: 'Saídas', // Texto no meio do Donut
            align: 'center', verticalAlign: 'middle', y: 10, 
            style: { fontSize: '12px', color: '#6B7280'} 
          },
          plotOptions: { 
            pie: { 
              innerSize: '50%',
              showInLegend: false,
              dataLabels: { 
                enabled: true, 
                connectorWidth: 0,
                color: '#6B7280',
                format: '<b>{point.name}</b>',
                distance: 15
              } 
            } 
          },
          series: [{
            name: "Saídas",
            colorByPoint: true,
            data: pieData.length > 0 ? pieData : [{ name: "Sem Dados", y: 1, color: COLORS.neutral }]
          }]
        };
      }
      else {
        return {
          ...commonOptions,
          xAxis: {
            categories: rawData?.categories || [],
            crosshair: true,
            labels: { style: { color: '#6B7280'} }
          },
          yAxis: { min: 0, title: { text: '' }, labels: { style: { color: '#6B7280'} }, gridLineColor: '#E5E7EB' },
          tooltip: { shared: true, valuePrefix: 'R$ ' },
          plotOptions: { column: { borderRadius: 4 }, line: { marker: { radius: 4 } } },
          series: [
            { name: 'Total de Entradas', data: rawData?.entradas || [], color: COLORS.tertiary },
            { name: 'Total de Saídas', data: rawData?.saidas || [], color: COLORS.secondary }
          ]
        };
      }
    }

    return commonOptions;
  }, [graphType, dataFilter, dashboardData]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-start mb-2 px-2">
        <h3 className="font-semibold text-gray-700 text-sm mt-1">{title}</h3>
        <div className="flex items-center gap-1 relative z-20">
            <GraphFilter setGraphType={setGraphType} />            
            <DataFilter 
                setDataScope={setDataFilter} 
                currentScope={dataFilter} 
            />
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          key={`${graphType}-${dataFilter}`} 
          containerProps={{ style: { height: '100%', width: '100%' } }}
        />
      </div>
    </div>
  );
}