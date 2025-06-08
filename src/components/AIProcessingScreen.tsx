
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PatientInfo, Answer } from "@/types/implant";
import { Brain, Zap, Search, Target, CheckCircle, TrendingUp } from "lucide-react";

interface AIProcessingScreenProps {
  patientInfo: PatientInfo;
  answers: Answer[];
  onComplete: () => void;
}

const processingSteps = [
  {
    icon: Search,
    title: "Analizando respuestas",
    description: "Procesando tus 9 respuestas clínicas...",
    details: ["Evaluando factores de riesgo", "Calculando probabilidades", "Identificando fortalezas"]
  },
  {
    icon: Brain,
    title: "Inteligencia Artificial trabajando",
    description: "Comparando con 10,000+ casos similares...",
    details: ["Patrones de éxito identificados", "Correlaciones encontradas", "Algoritmo de predicción activo"]
  },
  {
    icon: Target,
    title: "Personalizando recomendaciones",
    description: "Creando plan específico para ti...",
    details: ["Recomendaciones adaptadas", "Plan de acción definido", "Próximos pasos claros"]
  },
  {
    icon: CheckCircle,
    title: "Análisis completado",
    description: "Tu evaluación personalizada está lista",
    details: ["Resultado calculado", "Recomendaciones listas", "Plan de tratamiento generado"]
  }
];

export default function AIProcessingScreen({ patientInfo, answers, onComplete }: AIProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const stepDuration = 2000; // 2 seconds per step
    const totalSteps = processingSteps.length;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalSteps * 20)); // Smooth progress
        return Math.min(newProgress, 100);
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        if (nextStep < totalSteps) {
          setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
          return nextStep;
        } else {
          setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
          setTimeout(() => {
            clearInterval(interval);
            clearInterval(stepInterval);
            onComplete();
          }, 1000);
          return prev;
        }
      });
    }, stepDuration);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [onComplete]);

  const firstName = patientInfo.name.split(' ')[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-b from-[#0A1828] to-[#0A1828]/90">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#178582]/10 to-[#BFA181]/10 animate-pulse"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#178582]/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl mx-auto text-center"
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#178582] to-[#BFA181] p-1">
            <div className="w-full h-full rounded-full bg-[#0A1828] flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-12 h-12 text-[#178582]" />
              </motion.div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Analizando tu caso, {firstName}
          </h1>
          <p className="text-white/70">
            Nuestra IA está procesando tu información para crear un plan personalizado
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full bg-white/10 rounded-full h-3 mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-[#178582] to-[#BFA181] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-[#BFA181] text-sm font-medium">
            {Math.round(progress)}% completado
          </p>
        </div>

        {/* Processing steps */}
        <div className="space-y-4 mb-8">
          {processingSteps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = completedSteps.includes(index);
            const IconComponent = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: isActive || isCompleted ? 1 : 0.3,
                  x: 0,
                  scale: isActive ? 1.05 : 1
                }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all duration-500 ${
                  isActive
                    ? "bg-[#178582]/20 border-[#178582]/50 shadow-lg shadow-[#178582]/20"
                    : isCompleted
                    ? "bg-[#BFA181]/10 border-[#BFA181]/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full transition-colors ${
                    isActive
                      ? "bg-[#178582] text-white"
                      : isCompleted
                      ? "bg-[#BFA181] text-white"
                      : "bg-white/10 text-white/50"
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold mb-1 ${
                      isActive || isCompleted ? "text-white" : "text-white/50"
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm mb-2 ${
                      isActive || isCompleted ? "text-white/80" : "text-white/40"
                    }`}>
                      {step.description}
                    </p>
                    
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-1"
                      >
                        {step.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detailIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: detailIndex * 0.3 }}
                            className="flex items-center gap-2 text-xs text-[#178582]"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <Zap className="w-3 h-3" />
                            </motion.div>
                            {detail}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[#BFA181]"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Patient data preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white/5 rounded-lg p-4 border border-white/10"
        >
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#178582]" />
            Datos procesados
          </h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#178582]">{answers.length}</div>
              <div className="text-white/60">Respuestas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#BFA181]">{patientInfo.age}</div>
              <div className="text-white/60">Años</div>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-2xl font-bold text-white"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.div>
              <div className="text-white/60">Analizado</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
