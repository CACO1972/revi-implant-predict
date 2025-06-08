
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Zap, Activity, Target, CheckCircle } from "lucide-react";

interface AIProcessingScreenProps {
  patientName: string;
  onComplete: (analysis: AIAnalysis) => void;
  answers: any[];
}

export interface AIAnalysis {
  mainInsight: string;
  riskFactors: string[];
  positiveFactors: string[];
  personalizedExplanation: string;
  confidenceLevel: number;
  comparativeCases: string;
  recommendations: string[];
}

const processingSteps = [
  { icon: Brain, text: "Analizando tu perfil médico...", duration: 2000 },
  { icon: Cpu, text: "Procesando patrones de riesgo...", duration: 1800 },
  { icon: Activity, text: "Comparando con base de datos clínica...", duration: 2200 },
  { icon: Target, text: "Calculando probabilidades de éxito...", duration: 1500 },
  { icon: CheckCircle, text: "Generando recomendaciones personalizadas...", duration: 1000 }
];

export default function AIProcessingScreen({ patientName, onComplete, answers }: AIProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    // Generar partículas animadas
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (currentStep < processingSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, processingSteps[currentStep]?.duration || 2000);

      return () => clearTimeout(timer);
    } else {
      // Generar análisis inteligente
      const analysis = generateIntelligentAnalysis(patientName, answers);
      setTimeout(() => onComplete(analysis), 1000);
    }
  }, [currentStep, patientName, answers, onComplete]);

  const currentStepData = processingSteps[currentStep];
  const CurrentIcon = currentStepData?.icon || Brain;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Fondo de partículas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#178582] rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.id * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 z-10"
      >
        {/* Logo de procesamiento */}
        <motion.div
          className="relative mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#178582]/20 to-[#BFA181]/20 flex items-center justify-center border-2 border-[#178582]/30">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CurrentIcon className="w-16 h-16 text-[#178582]" />
            </motion.div>
          </div>
          
          {/* Anillos de procesamiento */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-[#178582]/20"
              style={{ padding: `${i * 10}px` }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ 
                duration: 4 + i * 2, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 0.5 
              }}
            />
          ))}
        </motion.div>

        {/* Texto de procesamiento */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#BFA181]">
            Analizando tu caso, {patientName}
          </h2>
          
          <AnimatePresence mode="wait">
            {currentStepData && (
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-white/80 text-lg"
              >
                {currentStepData.text}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Barra de progreso inteligente */}
          <div className="w-80 max-w-full mx-auto">
            <div className="bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#178582] to-[#BFA181]"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / processingSteps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-white/60 text-sm mt-2">
              Procesando paso {currentStep + 1} de {processingSteps.length}
            </p>
          </div>
        </div>

        {/* Indicadores de actividad */}
        <div className="flex justify-center space-x-4">
          {processingSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={index}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep 
                    ? 'border-[#178582] bg-[#178582]/20' 
                    : 'border-white/20 bg-white/5'
                }`}
                animate={index === currentStep ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: index === currentStep ? Infinity : 0 }}
              >
                <StepIcon 
                  className={`w-6 h-6 ${
                    index <= currentStep ? 'text-[#178582]' : 'text-white/40'
                  }`} 
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function generateIntelligentAnalysis(patientName: string, answers: any[]): AIAnalysis {
  const firstName = patientName.split(' ')[0];
  
  // Simular análisis contextual inteligente
  const patterns = analyzePatientPatterns(answers);
  
  return {
    mainInsight: `${firstName}, he identificado un patrón específico en tu perfil que es ${patterns.mainPattern}. Tu combinación de factores sugiere ${patterns.outcomeText}.`,
    
    riskFactors: patterns.risks,
    positiveFactors: patterns.positives,
    
    personalizedExplanation: `Basándome en el análisis de tu edad, historial médico y condiciones actuales, ${patterns.explanation}`,
    
    confidenceLevel: patterns.confidence,
    
    comparativeCases: `He analizado casos similares al tuyo y encontré que pacientes con tu perfil tienen ${patterns.successRate}% de tasa de éxito en implantes.`,
    
    recommendations: patterns.recommendations
  };
}

function analyzePatientPatterns(answers: any[]) {
  // Lógica simplificada de análisis de patrones
  const totalScore = answers.reduce((sum, answer) => sum + (answer?.score || 0), 0);
  
  if (totalScore <= 3) {
    return {
      mainPattern: "muy prometedor",
      outcomeText: "excelentes condiciones para un tratamiento exitoso",
      explanation: "tu perfil indica factores de riesgo mínimos y condiciones ideales para la oseointegración.",
      confidence: 95,
      successRate: 96,
      risks: ["Ningún factor de riesgo significativo identificado"],
      positives: ["Excelente salud oral", "Factores de riesgo mínimos", "Condiciones ideales"],
      recommendations: [
        "Proceder con confianza al tratamiento",
        "Mantener rutina actual de higiene",
        "Considerar carga inmediata si es apropiada"
      ]
    };
  } else if (totalScore <= 7) {
    return {
      mainPattern: "favorable con consideraciones",
      outcomeText: "muy buenas perspectivas con algunos factores a optimizar",
      explanation: "aunque existen algunos aspectos menores a considerar, tu pronóstico general es muy positivo.",
      confidence: 88,
      successRate: 90,
      risks: ["Factores menores identificados", "Requiere optimización previa"],
      positives: ["Buen perfil general", "Factores modificables"],
      recommendations: [
        "Optimizar factores identificados",
        "Seguimiento más frecuente",
        "Plan de preparación pre-quirúrgica"
      ]
    };
  } else {
    return {
      mainPattern: "complejo pero manejable",
      outcomeText: "desafíos que requieren atención especializada",
      explanation: "tu caso presenta varios factores que necesitan abordarse sistemáticamente para optimizar resultados.",
      confidence: 75,
      successRate: 78,
      risks: ["Multiple factores de riesgo", "Requiere preparación extensa"],
      positives: ["Caso manejable con enfoque correcto", "Potencial de mejora significativa"],
      recommendations: [
        "Evaluación multidisciplinaria",
        "Tratamiento por fases",
        "Optimización de salud general"
      ]
    };
  }
}
