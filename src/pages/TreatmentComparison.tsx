
import React, { useState } from "react";
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
  AlertTriangle,
  Calendar,
  Users,
  Zap,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";
import TreatmentChart from "@/components/treatments/TreatmentChart";

export default function TreatmentComparison() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("unitario");
  
  const treatmentTypes = {
    unitario: {
      title: "Implante Unitario",
      description: "Reemplazo de un solo diente",
      icon: "🦷",
      conventional: {
        duration: "3-4 meses",
        success: "96%",
        cost: "$$",
        steps: ["Cirugía de implante", "Cicatrización (3-4 meses)", "Corona definitiva"],
        benefits: ["Máxima predictibilidad", "Mejor integración ósea"],
        drawbacks: ["Tiempo más largo", "Sin diente temporal estético"]
      },
      immediate: {
        duration: "1 día + 3 meses",
        success: "92%",
        cost: "$$$",
        steps: ["Cirugía + corona temporal", "Cicatrización (3 meses)", "Corona definitiva"],
        benefits: ["Estética inmediata", "Una sola cirugía"],
        drawbacks: ["Mayor costo", "Requiere condiciones ideales"]
      }
    },
    multiple: {
      title: "Implantes Múltiples",
      description: "Reemplazo de 2-6 dientes",
      icon: "🦷🦷🦷",
      conventional: {
        duration: "4-6 meses",
        success: "95%",
        cost: "$$$",
        steps: ["Cirugía de implantes", "Cicatrización (4-6 meses)", "Puente o coronas"],
        benefits: ["Alta predictibilidad", "Mejor distribución de fuerzas"],
        drawbacks: ["Tiempo prolongado", "Múltiples citas"]
      },
      immediate: {
        duration: "1-2 días + 4 meses",
        success: "90%",
        cost: "$$$$",
        steps: ["Cirugía + puente temporal", "Cicatrización (4 meses)", "Restauración definitiva"],
        benefits: ["Función inmediata", "Menos molestias"],
        drawbacks: ["Mayor complejidad", "Criterios estrictos"]
      }
    },
    total: {
      title: "All-on-4 / Rehabilitación Total",
      description: "Arcada completa con 4-6 implantes",
      icon: "😁",
      conventional: {
        duration: "6-8 meses",
        success: "94%",
        cost: "$$$$",
        steps: ["Cirugía de implantes", "Cicatrización (6-8 meses)", "Prótesis definitiva"],
        benefits: ["Máxima estabilidad", "Resultado duradero"],
        drawbacks: ["Tiempo muy largo", "Sin prótesis funcional"]
      },
      immediate: {
        duration: "1 día + 6 meses",
        success: "89%",
        cost: "$$$$$",
        steps: ["Cirugía + prótesis temporal", "Cicatrización (6 meses)", "Prótesis definitiva"],
        benefits: ["Dientes el mismo día", "Calidad de vida inmediata"],
        drawbacks: ["Más costoso", "Dieta especial inicial"]
      }
    }
  };

  const reconstructionTreatments = [
    {
      name: "Injerto Óseo",
      description: "Regeneración de hueso perdido",
      duration: "4-6 meses",
      indication: "Falta de volumen óseo",
      success: "92%"
    },
    {
      name: "Elevación de Seno",
      description: "Aumento de hueso en zona posterior superior",
      duration: "6-8 meses",
      indication: "Poco hueso en premolares/molares superiores",
      success: "94%"
    },
    {
      name: "Regeneración Guiada",
      description: "Técnica con membranas para regenerar tejidos",
      duration: "6-9 meses",
      indication: "Defectos óseos localizados",
      success: "88%"
    },
    {
      name: "Injerto de Tejido Blando",
      description: "Mejora de encías alrededor del implante",
      duration: "2-3 meses",
      indication: "Falta de encía adherida",
      success: "96%"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      {/* Logo */}
      <div className="mb-6">
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantX Logo"
          className="h-16 w-auto"
        />
      </div>
      
      <motion.div
        className="glass-panel p-6 max-w-6xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#BFA181] mb-4">
            Comparador de Tratamientos
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Compara las opciones de carga convencional vs. carga inmediata para cada tipo de tratamiento
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="unitario" className="text-sm">
              🦷 Unitario
            </TabsTrigger>
            <TabsTrigger value="multiple" className="text-sm">
              🦷🦷🦷 Múltiples
            </TabsTrigger>
            <TabsTrigger value="total" className="text-sm">
              😁 All-on-4
            </TabsTrigger>
          </TabsList>

          {Object.entries(treatmentTypes).map(([key, treatment]) => (
            <TabsContent key={key} value={key}>
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#178582] mb-2">
                    {treatment.icon} {treatment.title}
                  </h3>
                  <p className="text-white/70">{treatment.description}</p>
                </div>

                {/* Gráfico comparativo */}
                <TreatmentChart 
                  conventional={treatment.conventional}
                  immediate={treatment.immediate}
                />

                {/* Comparación lado a lado */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Carga Convencional */}
                  <Card className="glass-panel p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-6 h-6 text-[#BFA181] mr-2" />
                      <h4 className="text-xl font-bold text-[#BFA181]">Carga Convencional</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Duración:</span>
                        <span className="font-semibold text-white">{treatment.conventional.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Éxito:</span>
                        <span className="font-semibold text-green-400">{treatment.conventional.success}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Costo:</span>
                        <span className="font-semibold text-white">{treatment.conventional.cost}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h5 className="font-semibold text-[#178582] mb-3">Proceso:</h5>
                      <ol className="space-y-2">
                        {treatment.conventional.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="bg-[#178582] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-white/80 text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4">
                      <div>
                        <h5 className="flex items-center text-green-400 font-medium mb-2">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Ventajas
                        </h5>
                        <ul className="text-white/80 text-sm space-y-1">
                          {treatment.conventional.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-400 mr-2">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="flex items-center text-amber-500 font-medium mb-2">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Consideraciones
                        </h5>
                        <ul className="text-white/80 text-sm space-y-1">
                          {treatment.conventional.drawbacks.map((drawback, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              {drawback}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* Carga Inmediata */}
                  <Card className="glass-panel p-6 border-[#178582]/30">
                    <div className="flex items-center mb-4">
                      <Zap className="w-6 h-6 text-[#178582] mr-2" />
                      <h4 className="text-xl font-bold text-[#178582]">Carga Inmediata</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Duración:</span>
                        <span className="font-semibold text-white">{treatment.immediate.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Éxito:</span>
                        <span className="font-semibold text-green-400">{treatment.immediate.success}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Costo:</span>
                        <span className="font-semibold text-white">{treatment.immediate.cost}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h5 className="font-semibold text-[#178582] mb-3">Proceso:</h5>
                      <ol className="space-y-2">
                        {treatment.immediate.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="bg-[#178582] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-white/80 text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4">
                      <div>
                        <h5 className="flex items-center text-green-400 font-medium mb-2">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Ventajas
                        </h5>
                        <ul className="text-white/80 text-sm space-y-1">
                          {treatment.immediate.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-400 mr-2">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="flex items-center text-amber-500 font-medium mb-2">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Consideraciones
                        </h5>
                        <ul className="text-white/80 text-sm space-y-1">
                          {treatment.immediate.drawbacks.map((drawback, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              {drawback}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Apéndice de Tratamientos de Reconstrucción */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#BFA181] mb-2 flex items-center justify-center">
              <Wrench className="w-6 h-6 mr-2" />
              Tratamientos Previos de Reconstrucción
            </h3>
            <p className="text-white/70">
              Procedimientos necesarios antes de los implantes en casos con pérdida ósea o de tejidos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reconstructionTreatments.map((treatment, index) => (
              <motion.div
                key={treatment.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-panel p-4 h-full">
                  <h4 className="font-bold text-[#178582] mb-2">{treatment.name}</h4>
                  <p className="text-white/80 text-sm mb-3">{treatment.description}</p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/60">Duración:</span>
                      <span className="text-white">{treatment.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Éxito:</span>
                      <span className="text-green-400">{treatment.success}</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-white/60 text-xs">Indicación:</span>
                      <p className="text-white/80 text-xs mt-1">{treatment.indication}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <div className="flex justify-between mt-8">
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
        message="Ahora puedes comparar fácilmente las opciones de carga convencional vs. inmediata para cada tipo de tratamiento. ¿Tienes alguna pregunta sobre las diferencias?"
      />
    </div>
  );
}
