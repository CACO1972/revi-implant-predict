
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PatientInfo, AssessmentResult } from "@/types/implant";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";

interface AssessmentResultsProps {
  patientInfo: PatientInfo;
  assessmentResult: AssessmentResult;
  onRestart: () => void;
}

export default function AssessmentResults({ patientInfo, assessmentResult, onRestart }: AssessmentResultsProps) {
  const navigate = useNavigate();

  const getColorByLevel = () => {
    switch (assessmentResult.level) {
      case 1: return "text-emerald-400";
      case 2: return "text-[#178582]";
      case 3: return "text-[#BFA181]";
      case 4: return "text-red-400";
      default: return "text-[#178582]";
    }
  };

  const getBgColorByLevel = () => {
    switch (assessmentResult.level) {
      case 1: return "bg-emerald-400/10";
      case 2: return "bg-[#178582]/10";
      case 3: return "bg-[#BFA181]/10";
      case 4: return "bg-red-400/10";
      default: return "bg-[#178582]/10";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="glass-panel p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#BFA181] mb-3">
              {patientInfo.name}, aquí están tus resultados
            </h2>
            <p className="text-white/80 text-lg font-light">
              Tu evaluación personalizada de ImplantDX
            </p>
          </div>
          
          <div className={`${getBgColorByLevel()} rounded-xl p-8 mb-8 border border-white/10 text-center`}>
            <div className="mb-4">
              <div className={`text-5xl font-bold ${getColorByLevel()} mb-2`}>
                {assessmentResult.totalScore}/16
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Nivel {assessmentResult.level}: {assessmentResult.prediction}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-md mx-auto">
                {assessmentResult.level === 1 && "Tus condiciones son ideales para un tratamiento de implantes con excelente pronóstico."}
                {assessmentResult.level === 2 && "Presentas buenas condiciones generales con algunos factores menores a considerar."}
                {assessmentResult.level === 3 && "Existen factores que requieren optimización antes del tratamiento para mejores resultados."}
                {assessmentResult.level === 4 && "Se han identificado varios factores importantes que necesitan abordarse con un especialista."}
              </p>
            </div>
          </div>

          {/* Recomendaciones personalizadas y empáticas */}
          <div className="space-y-4 mb-8">
            <h4 className="text-[#BFA181] font-semibold text-lg mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Recomendaciones específicas para ti:
            </h4>
            {assessmentResult.recommendations.map((rec: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-[#178582] mt-3 flex-shrink-0"></div>
                <p className="text-white/85 text-sm leading-relaxed font-light">{rec}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/contacto')}
              className="w-full bg-[#178582] hover:bg-[#178582]/90 text-white shadow-glow border border-[#BFA181]/30 py-4 text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Obtener evaluación profesional personalizada
            </Button>
            <Button 
              variant="outline" 
              onClick={onRestart}
              className="w-full border-white/20 text-white hover:bg-white/5"
            >
              Realizar nueva evaluación
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
