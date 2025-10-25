
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
      case 1: return "text-primary";
      case 2: return "text-primary";
      case 3: return "text-accent";
      case 4: return "text-destructive";
      default: return "text-primary";
    }
  };

  const getBgColorByLevel = () => {
    switch (assessmentResult.level) {
      case 1: return "bg-primary/10";
      case 2: return "bg-primary/10";
      case 3: return "bg-accent/10";
      case 4: return "bg-destructive/10";
      default: return "bg-primary/10";
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
        <div className="bg-card/40 backdrop-blur-xl rounded-2xl border border-border/50 p-8 shadow-glass">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-accent mb-3">
              {patientInfo.name}, aquí están tus resultados
            </h2>
            <p className="text-foreground/80 text-lg font-light">
              Tu evaluación personalizada de ImplantDX
            </p>
          </div>
          
          <div className={`${getBgColorByLevel()} rounded-xl p-8 mb-8 border border-border/30 text-center`}>
            <div className="mb-4">
              <div className={`text-5xl font-bold ${getColorByLevel()} mb-2`}>
                {assessmentResult.totalScore}/16
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Nivel {assessmentResult.level}: {assessmentResult.prediction}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
                {assessmentResult.level === 1 && "Tus condiciones son ideales para un tratamiento de implantes con excelente pronóstico."}
                {assessmentResult.level === 2 && "Presentas buenas condiciones generales con algunos factores menores a considerar."}
                {assessmentResult.level === 3 && "Existen factores que requieren optimización antes del tratamiento para mejores resultados."}
                {assessmentResult.level === 4 && "Se han identificado varios factores importantes que necesitan abordarse con un especialista."}
              </p>
            </div>
          </div>

          {/* Recomendaciones personalizadas y empáticas */}
          <div className="space-y-4 mb-8">
            <h4 className="text-accent font-semibold text-lg mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Recomendaciones específicas para ti:
            </h4>
            {assessmentResult.recommendations.map((rec: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-4 bg-card/30 rounded-lg border border-border/20"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <p className="text-foreground/85 text-sm leading-relaxed font-light">{rec}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/contacto')}
              variant="gold"
              size="lg"
              className="w-full"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Obtener evaluación profesional personalizada
            </Button>
            <Button 
              variant="outline" 
              onClick={onRestart}
              size="lg"
              className="w-full"
            >
              Realizar nueva evaluación
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
