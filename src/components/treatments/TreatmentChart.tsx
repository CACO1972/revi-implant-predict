
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface TreatmentData {
  duration: string;
  success: string;
  cost: string;
}

interface TreatmentChartProps {
  conventional: TreatmentData;
  immediate: TreatmentData;
}

export default function TreatmentChart({ conventional, immediate }: TreatmentChartProps) {
  // Convertir duración a números para el gráfico
  const getDurationInMonths = (duration: string) => {
    if (duration.includes('día')) return 0.1;
    const months = duration.match(/(\d+)-?(\d+)?/);
    if (months) {
      return months[2] ? (parseInt(months[1]) + parseInt(months[2])) / 2 : parseInt(months[1]);
    }
    return 0;
  };

  const getSuccessRate = (success: string) => {
    return parseInt(success.replace('%', ''));
  };

  const getCostLevel = (cost: string) => {
    return cost.length; // $$ = 2, $$$ = 3, etc.
  };

  const comparisonData = [
    {
      name: 'Convencional',
      duracion: getDurationInMonths(conventional.duration),
      exito: getSuccessRate(conventional.success),
      costo: getCostLevel(conventional.cost),
    },
    {
      name: 'Inmediata',
      duracion: getDurationInMonths(immediate.duration),
      exito: getSuccessRate(immediate.success),
      costo: getCostLevel(immediate.cost),
    }
  ];

  const pieData = [
    { name: 'Carga Convencional', value: getSuccessRate(conventional.success), color: '#BFA181' },
    { name: 'Carga Inmediata', value: getSuccessRate(immediate.success), color: '#178582' }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Gráfico de barras - Comparación general */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-[#BFA181] font-semibold mb-4 text-center">
          Comparación de Características
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#ffffff80', fontSize: 12 }}
              axisLine={{ stroke: '#ffffff40' }}
            />
            <YAxis 
              tick={{ fill: '#ffffff80', fontSize: 12 }}
              axisLine={{ stroke: '#ffffff40' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0A1828', 
                border: '1px solid #178582',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value, name) => {
                if (name === 'duracion') return [`${value} meses`, 'Duración'];
                if (name === 'exito') return [`${value}%`, 'Tasa de Éxito'];
                if (name === 'costo') return [`${value}/5`, 'Nivel de Costo'];
                return [value, name];
              }}
            />
            <Bar dataKey="duracion" fill="#BFA181" name="duracion" />
            <Bar dataKey="costo" fill="#178582" name="costo" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico circular - Tasas de éxito */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-[#BFA181] font-semibold mb-4 text-center">
          Tasas de Éxito
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0A1828', 
                border: '1px solid #178582',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value) => [`${value}%`, 'Tasa de Éxito']}
            />
            <Legend 
              wrapperStyle={{ color: '#ffffff80', fontSize: '12px' }}
              formatter={(value) => <span style={{ color: '#ffffff80' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
