
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Info, PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";
import DemoModal from "@/components/demo/DemoModal";
import QuestionnaireDemo from "@/components/demo/QuestionnaireDemo";
import OdontogramDemo from "@/components/demo/OdontogramDemo";
import ClinicalFlowDemo from "@/components/demo/ClinicalFlowDemo";
import TreatmentComparisonDemo from "@/components/demo/TreatmentComparisonDemo";
import PriceCalculatorDemo from "@/components/demo/PriceCalculatorDemo";
import PdfReportDemo from "@/components/demo/PdfReportDemo";

export default function Index() {
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  
  const openModal = (modalId: string) => {
    setCurrentModal(modalId);
  };
  
  const closeModal = () => {
    setCurrentModal(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      <AnimatedStarryBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl space-y-8 z-10 relative"
      >
        {/* Logo animado */}
        <motion.div 
          className="mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
            alt="ImplantX Logo"
            className="w-72 h-auto mx-auto"
          />
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            ¿Eres candidato a implantes dentales?
          </h1>
          
          <p className="text-lg md:text-xl text-white/85 max-w-xl mx-auto">
            Descúbrelo en 2 minutos con ayuda de la IA y recibe tu plan clínico personalizado
          </p>
          
          <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <p className="text-white/80 text-sm">
              <span className="text-[#178582] font-medium">ImplantDX</span> utiliza inteligencia artificial basada en criterios científicos 
              para evaluar tu candidatura a implantes dentales y brindarte información personalizada.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Button 
              onClick={() => openModal("questionnaire")}
              className="bg-[#178582] hover:bg-[#178582]/90 text-white px-6 py-5 rounded-xl text-lg shadow-glow transition-all duration-300 border border-[#BFA181]/30 w-full md:w-auto"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Ver Cuestionario
            </Button>
            
            <Button 
              onClick={() => navigate('/quienes-somos')}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/5 px-6 py-5 rounded-xl text-lg transition-all duration-300 w-full md:w-auto"
            >
              <Info className="w-5 h-5 mr-2" />
              Quiénes Somos
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-[#178582]/30 transition-all duration-300"
              onClick={() => openModal("odontogram")}
            >
              <div className="text-white text-xs font-medium">Odontograma Interactivo</div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-[#178582]/30 transition-all duration-300"
              onClick={() => openModal("clinical-flow")}
            >
              <div className="text-white text-xs font-medium">Tú estás aquí</div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-[#178582]/30 transition-all duration-300"
              onClick={() => openModal("treatment-comparison")}
            >
              <div className="text-white text-xs font-medium">Alternativas de Tratamiento</div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-[#178582]/30 transition-all duration-300"
              onClick={() => openModal("price-calculator")}
            >
              <div className="text-white text-xs font-medium">Calculadora de Costos</div>
            </motion.button>
          </div>

          <p className="text-[13px] text-white/50 mt-6 max-w-md mx-auto">
            *Esta herramienta clínica predictiva está basada en evidencia científica,
            pero no reemplaza una evaluación profesional.
          </p>
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <p className="text-sm text-white/60">© 2025 ImplantDX - Democratizando el acceso a evaluación clínica</p>
          <p className="text-xs text-white/40 mt-1">
            Para personas con recursos limitados o en zonas geográficamente aisladas
          </p>
        </motion.div>
      </motion.div>
      
      <RioAssistant 
        isVisible={true} 
        message="¡Hola! Soy Río, tu asistente virtual. Estoy aquí para guiarte durante todo el proceso de evaluación. ¡Haz clic para comenzar!"
      />
      
      {/* Modals para demo */}
      <DemoModal isOpen={currentModal === "questionnaire"} onClose={closeModal} title="Cuestionario Clínico Predictivo">
        <QuestionnaireDemo />
      </DemoModal>
      
      <DemoModal isOpen={currentModal === "odontogram"} onClose={closeModal} title="Odontograma Interactivo">
        <OdontogramDemo />
      </DemoModal>
      
      <DemoModal isOpen={currentModal === "clinical-flow"} onClose={closeModal} title="Flujo Clínico">
        <ClinicalFlowDemo />
      </DemoModal>
      
      <DemoModal isOpen={currentModal === "treatment-comparison"} onClose={closeModal} title="Comparador de Tratamientos">
        <TreatmentComparisonDemo />
      </DemoModal>
      
      <DemoModal isOpen={currentModal === "price-calculator"} onClose={closeModal} title="Calculadora de Costos">
        <PriceCalculatorDemo />
      </DemoModal>
      
      <DemoModal isOpen={currentModal === "pdf-report"} onClose={closeModal} title="Informe PDF">
        <PdfReportDemo />
      </DemoModal>
    </div>
  );
}
