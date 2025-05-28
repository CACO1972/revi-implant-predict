
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  ArrowRight,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";
import TreatmentContent from "@/components/treatments/TreatmentContent";
import ReconstructionTreatments from "@/components/treatments/ReconstructionTreatments";

export default function TreatmentComparison() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("unitario");

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

          <TreatmentContent />
        </Tabs>

        <ReconstructionTreatments />

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
