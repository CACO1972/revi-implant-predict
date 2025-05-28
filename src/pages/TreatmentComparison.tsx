
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  Award,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";

interface TreatmentOption {
  id: string;
  name: string;
  description: string;
  successRate: number;
  timeframe: string;
  priceRange: string;
  benefits: string[];
  considerations: string[];
  recommendation: string;
}

export default function TreatmentComparison() {
  const navigate = useNavigate();
  
  const treatments: TreatmentOption[] = [
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
    <div className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      {/* Logo pequeño */}
      <div className="mb-6">
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantX Logo"
          className="h-16 w-auto"
        />
      </div>
      
      <motion.div
        className="glass-panel p-6 max-w-5xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#BFA181] mb-4">
            Comparador de Planes de Tratamiento
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto">
            Existen diferentes enfoques para tu tratamiento con implantes dentales.
            Compara las opciones y sus características para entender cuál podría ser más adecuada para ti.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {treatments.map((treatment) => (
            <motion.div
              key={treatment.id}
              className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#178582]/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold text-[#178582] mb-2">
                {treatment.name}
              </h3>
              
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
                <h4 className="flex items-center text-[#178582] font-medium mb-2">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Beneficios
                </h4>
                <ul className="text-white/80 text-xs space-y-1 pl-6 list-disc mb-4">
                  {treatment.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
                
                <h4 className="flex items-center text-amber-500 font-medium mb-2">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Consideraciones
                </h4>
                <ul className="text-white/80 text-xs space-y-1 pl-6 list-disc mb-4">
                  {treatment.considerations.map((consideration, idx) => (
                    <li key={idx}>{consideration}</li>
                  ))}
                </ul>
                
                <div className="bg-[#178582]/10 rounded-lg p-3 mt-4">
                  <h4 className="flex items-center text-[#BFA181] text-sm font-medium mb-1">
                    <Award className="w-4 h-4 mr-1" />
                    Recomendación
                  </h4>
                  <p className="text-white/80 text-xs">
                    {treatment.recommendation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
          <h3 className="text-[#BFA181] font-semibold mb-2">¿Cuál es la mejor opción para ti?</h3>
          <p className="text-white/80 text-sm">
            La mejor ruta de tratamiento depende de varios factores: tu situación clínica específica, expectativas
            estéticas, disponibilidad de tiempo, presupuesto y preferencias personales. Un especialista puede
            ayudarte a determinar la opción más adecuada.
          </p>
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/5"
            onClick={() => navigate('/resultados')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a resultados
          </Button>
          
          <Button
            className="bg-[#178582] hover:bg-[#178582]/90 text-white shadow-glow transition-all duration-300"
            onClick={() => navigate('/calculadora')}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Calculadora de precios
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
      
      <RioAssistant 
        isVisible={true} 
        message="Estas son las tres principales rutas de tratamiento. Cada una tiene sus ventajas y consideraciones. La mejor opción para ti dependerá de tu caso específico, tiempo disponible y presupuesto."
      />
    </div>
  );
}
