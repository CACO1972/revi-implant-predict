
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Zap, Activity, Target, Network, Database, TrendingUp } from "lucide-react";

interface AdvancedAIProcessorProps {
  patientName: string;
  onComplete: () => void;
  answers: any[];
}

const aiProcessingSteps = [
  {
    icon: Network,
    title: "Inicializando redes neuronales",
    description: "Activando algoritmos de deep learning médico...",
    details: ["Cargando modelo entrenado", "Configurando parámetros", "Validando arquitectura neuronal"],
    duration: 2500
  },
  {
    icon: Database,
    title: "Analizando patrones biomédicos",
    description: "Correlacionando con 50,000+ casos clínicos...",
    details: ["Identificando patrones similares", "Calculando correlaciones", "Evaluando variables múltiples"],
    duration: 3000
  },
  {
    icon: Brain,
    title: "Ejecutando algoritmos predictivos",
    description: "Procesando matriz de factores de riesgo...",
    details: ["Análisis multivariable activo", "Ponderación de factores", "Calibración de modelo"],
    duration: 2800
  },
  {
    icon: Target,
    title: "Generando predicción personalizada",
    description: "Optimizando resultados para tu perfil específico...",
    details: ["Ajustando por edad y condición", "Personalizando recomendaciones", "Validando precisión"],
    duration: 2200
  },
  {
    icon: TrendingUp,
    title: "Finalizando insights clínicos",
    description: "Compilando análisis integral completo...",
    details: ["Generando reporte final", "Validando confiabilidad", "Preparando visualización"],
    duration: 1500
  }
];

export default function AdvancedAIProcessor({ patientName, onComplete, answers }: AdvancedAIProcessorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [neuralActivity, setNeuralActivity] = useState<Array<{id: number, x: number, y: number, intensity: number}>>([]);
  const [dataFlowParticles, setDataFlowParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const [processingMetrics, setProcessingMetrics] = useState({
    patternsAnalyzed: 0,
    correlationsFound: 0,
    accuracy: 0
  });

  useEffect(() => {
    // Initialize neural network visualization
    const nodes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      intensity: Math.random()
    }));
    setNeuralActivity(nodes);

    // Initialize data flow particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }));
    setDataFlowParticles(particles);
  }, []);

  useEffect(() => {
    const stepDuration = aiProcessingSteps[currentStep]?.duration || 2000;
    
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const stepProgress = ((currentStep + 1) / aiProcessingSteps.length) * 100;
        return Math.min(prev + 0.5, stepProgress);
      });
    }, 50);

    // Animate processing metrics
    const metricsInterval = setInterval(() => {
      setProcessingMetrics(prev => ({
        patternsAnalyzed: Math.min(prev.patternsAnalyzed + Math.floor(Math.random() * 100), 2847),
        correlationsFound: Math.min(prev.correlationsFound + Math.floor(Math.random() * 10), 156),
        accuracy: Math.min(prev.accuracy + Math.random() * 2, 94.7)
      }));
      
      setConfidenceLevel(prev => Math.min(prev + Math.random() * 3, 96.8));
    }, 200);

    // Step progression
    const stepTimer = setTimeout(() => {
      if (currentStep < aiProcessingSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setTimeout(() => {
          clearInterval(progressInterval);
          clearInterval(metricsInterval);
          onComplete();
        }, 1000);
      }
    }, stepDuration);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressInterval);
      clearInterval(metricsInterval);
    };
  }, [currentStep, onComplete]);

  const currentStepData = aiProcessingSteps[currentStep];
  const CurrentIcon = currentStepData?.icon || Brain;
  const firstName = patientName.split(' ')[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Advanced neural network background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Neural network nodes */}
        {neuralActivity.map(node => (
          <motion.div
            key={node.id}
            className="absolute w-3 h-3 rounded-full"
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              background: `radial-gradient(circle, #178582, transparent)`
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + node.intensity,
              repeat: Infinity,
              delay: node.id * 0.1,
            }}
          />
        ))}

        {/* Data flow particles */}
        {dataFlowParticles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#BFA181] rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              x: [0, particle.vx * 50, particle.vx * 100],
              y: [0, particle.vy * 50, particle.vy * 100],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.id * 0.1,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        {/* AI Processing Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="relative mx-auto w-32 h-32 mb-6">
            <motion.div
              className="w-full h-full rounded-full bg-gradient-to-r from-[#178582]/20 to-[#BFA181]/20 flex items-center justify-center border-2 border-[#178582]/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CurrentIcon className="w-16 h-16 text-[#178582]" />
              </motion.div>
            </motion.div>
            
            {/* AI processing rings */}
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-[#178582]/20"
                style={{ 
                  margin: `${i * 8}px`,
                  borderStyle: i % 2 === 0 ? 'solid' : 'dashed'
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ 
                  duration: 6 + i * 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            ))}
          </div>

          <h2 className="text-3xl font-bold text-[#BFA181] mb-2">
            IA Médica Analizando, {firstName}
          </h2>
          <p className="text-white/80 text-lg">
            Procesamiento de inteligencia artificial avanzada en curso
          </p>
        </motion.div>

        {/* Advanced metrics dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white/5 rounded-xl p-4 border border-[#178582]/20">
            <div className="text-[#178582] text-2xl font-bold">
              {processingMetrics.patternsAnalyzed.toLocaleString()}
            </div>
            <div className="text-white/70 text-sm">Patrones analizados</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-[#BFA181]/20">
            <div className="text-[#BFA181] text-2xl font-bold">
              {processingMetrics.correlationsFound}
            </div>
            <div className="text-white/70 text-sm">Correlaciones encontradas</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-green-500/20">
            <div className="text-green-400 text-2xl font-bold">
              {processingMetrics.accuracy.toFixed(1)}%
            </div>
            <div className="text-white/70 text-sm">Precisión del modelo</div>
          </div>
        </motion.div>

        {/* Current processing step */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#178582]/20 flex items-center justify-center">
              <CurrentIcon className="w-6 h-6 text-[#178582]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {currentStepData?.title}
              </h3>
              <p className="text-white/70">
                {currentStepData?.description}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            {currentStepData?.details.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.5 }}
                className="flex items-center gap-2 text-sm text-[#178582]"
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
          </div>
        </motion.div>

        {/* Advanced progress indicators */}
        <div className="space-y-4">
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#178582] via-[#BFA181] to-[#178582]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-white/60">
              Progreso del análisis: {Math.round(progress)}%
            </span>
            <span className="text-[#BFA181]">
              Confianza del modelo: {confidenceLevel.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center space-x-4 mt-8">
          {aiProcessingSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <motion.div
                key={index}
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                  isActive
                    ? 'border-[#178582] bg-[#178582]/20 shadow-lg shadow-[#178582]/30' 
                    : isCompleted
                    ? 'border-[#BFA181] bg-[#BFA181]/20'
                    : 'border-white/20 bg-white/5'
                }`}
                animate={isActive ? { 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(23, 133, 130, 0.4)",
                    "0 0 0 10px rgba(23, 133, 130, 0)",
                    "0 0 0 0 rgba(23, 133, 130, 0.4)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              >
                <StepIcon 
                  className={`w-7 h-7 ${
                    isActive ? 'text-[#178582]' 
                    : isCompleted ? 'text-[#BFA181]' 
                    : 'text-white/40'
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
