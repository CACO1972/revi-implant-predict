
import { motion } from "framer-motion";
import { CheckCircle, Clock, DollarSign, Percent, Award, AlertTriangle } from "lucide-react";

export default function TreatmentComparisonDemo() {
  const treatments = [
    {
      id: "conservative",
      name: "Ruta A: Conservadora",
      description: "Enfoque tradicional de dos fases con tiempos de cicatrización completos",
      successRate: 95,
      timeframe: "4-6 meses",
      priceRange: "$$ - $$$",
      benefits: [
        "Mayor predictibilidad",
        "Menor riesgo de complicaciones",
        "Ideal para casos complejos",
        "Bien documentada científicamente"
      ],
      considerations: [
        "Mayor tiempo total de tratamiento",
        "Múltiples citas clínicas",
        "Requiere provisorio temporal"
      ],
      recommendation: "Ideal para pacientes que prefieren el máximo de seguridad y no tienen urgencia estética o funcional."
    },
    {
      id: "optimized",
      name: "Ruta B: Optimizada",
      description: "Equilibrio entre tiempos de cicatrización y resultados",
      successRate: 92,
      timeframe: "2-4 meses",
      priceRange: "$$ - $$$",
      benefits: [
        "Menor tiempo de tratamiento",
        "Buena predictibilidad",
        "Menos visitas clínicas",
        "Alta tasa de éxito"
      ],
      considerations: [
        "Requiere evaluación más detallada",
        "No ideal para todos los casos",
        "Mayor exigencia técnica"
      ],
      recommendation: "Perfecta para pacientes con buenas condiciones clínicas iniciales que buscan eficiencia sin comprometer resultados."
    },
    {
      id: "immediate",
      name: "Ruta C: Carga inmediata",
      description: "Implante y corona provisional el mismo día",
      successRate: 88,
      timeframe: "1 día + 2-3 meses",
      priceRange: "$$$ - $$$$",
      benefits: [
        "Solución estética inmediata",
        "Una sola cirugía principal",
        "Menor tiempo sin dientes",
        "Ventajas psicológicas"
      ],
      considerations: [
        "Mayor costo inicial",
        "Criterios de selección estrictos",
        "Requiere excelente calidad ósea",
        "Mayor riesgo de complicaciones"
      ],
      recommendation: "Óptima para casos seleccionados donde la estética inmediata es crucial y las condiciones clínicas son ideales."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h3 className="text-xl text-[#178582] mb-2">Comparador de Planes de Tratamiento</h3>
        <p className="text-white/80">Compare las diferentes opciones de tratamiento disponibles para su caso</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {treatments.map((treatment) => (
          <motion.div
            key={treatment.id}
            className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#178582]/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="text-lg font-bold text-[#178582] mb-2">
              {treatment.name}
            </h4>
            
            <p className="text-white/70 text-sm mb-4">
              {treatment.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center text-white">
                <Percent className="w-4 h-4 mr-2 text-[#BFA181]" />
                <span className="text-sm">Éxito: </span>
                <span className="ml-auto font-semibold">{treatment.successRate}%</span>
              </div>
              
              <div className="flex items-center text-white">
                <Clock className="w-4 h-4 mr-2 text-[#BFA181]" />
                <span className="text-sm">Tiempo: </span>
                <span className="ml-auto font-semibold">{treatment.timeframe}</span>
              </div>
              
              <div className="flex items-center text-white">
                <DollarSign className="w-4 h-4 mr-2 text-[#BFA181]" />
                <span className="text-sm">Costo: </span>
                <span className="ml-auto font-semibold">{treatment.priceRange}</span>
              </div>
            </div>
            
            <div className="mt-5">
              <h5 className="flex items-center text-[#178582] font-medium mb-2">
                <CheckCircle className="w-4 h-4 mr-1" />
                Beneficios
              </h5>
              <ul className="text-white/80 text-xs space-y-1 pl-6 list-disc mb-4">
                {treatment.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
              
              <h5 className="flex items-center text-amber-500 font-medium mb-2">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Consideraciones
              </h5>
              <ul className="text-white/80 text-xs space-y-1 pl-6 list-disc mb-4">
                {treatment.considerations.map((consideration, idx) => (
                  <li key={idx}>{consideration}</li>
                ))}
              </ul>
              
              <div className="bg-[#178582]/10 rounded-lg p-3 mt-4">
                <h5 className="flex items-center text-[#BFA181] text-sm font-medium mb-1">
                  <Award className="w-4 h-4 mr-1" />
                  Recomendación
                </h5>
                <p className="text-white/80 text-xs">
                  {treatment.recommendation}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <div className="flex items-start gap-3 bg-gradient-to-r from-[#178582]/15 to-transparent p-4 rounded-lg max-w-md">
          <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="Rio Assistant" className="w-8 h-8 mr-2" />
          <p className="text-sm text-white/90">
            <span className="text-[#178582] font-medium">Río:</span> Dependiendo de tu situación clínica particular, presupuesto y expectativas, puedes optar por diferentes rutas de tratamiento. Cada una tiene sus ventajas y consideraciones específicas.
          </p>
        </div>
      </div>
    </div>
  );
}
