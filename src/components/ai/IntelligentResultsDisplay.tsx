
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, Shield, AlertTriangle, Lightbulb, Star, Activity, Target, Zap } from "lucide-react";
import { AssessmentResult } from "@/types/implant";

interface IntelligentResultsDisplayProps {
  result: AssessmentResult;
  patientName: string;
  onContinue: () => void;
}

export default function IntelligentResultsDisplay({ 
  result, 
  patientName, 
  onContinue 
}: IntelligentResultsDisplayProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [aiConfidence, setAiConfidence] = useState(0);
  const [analysisMetrics, setAnalysisMetrics] = useState({
    casesAnalyzed: 0,
    correlationStrength: 0,
    predictionAccuracy: 0
  });

  const firstName = patientName.split(' ')[0];
  
  const analysisPhases = [
    {
      title: "Análisis IA Completado",
      description: "Procesamiento de algoritmos finalizado exitosamente",
      icon: Brain,
      color: "text-primary"
    },
    {
      title: "Patrón Identificado",
      description: "Tu perfil ha sido correlacionado con casos similares",
      icon: Target,
      color: "text-accent"
    },
    {
      title: "Predicción Generada",
      description: "Modelo personalizado calibrado para tu caso específico",
      icon: TrendingUp,
      color: "text-primary"
    }
  ];

  useEffect(() => {
    // Animate AI confidence level
    const confidenceInterval = setInterval(() => {
      setAiConfidence(prev => {
        const target = result.level === 1 ? 96.8 : result.level === 2 ? 92.4 : result.level === 3 ? 87.6 : 82.1;
        return prev < target ? prev + 0.8 : target;
      });
    }, 50);

    // Animate analysis metrics
    const metricsInterval = setInterval(() => {
      setAnalysisMetrics(prev => ({
        casesAnalyzed: prev.casesAnalyzed < 14847 ? prev.casesAnalyzed + 127 : 14847,
        correlationStrength: prev.correlationStrength < 0.94 ? prev.correlationStrength + 0.008 : 0.94,
        predictionAccuracy: prev.predictionAccuracy < 94.7 ? prev.predictionAccuracy + 0.7 : 94.7
      }));
    }, 100);

    // Phase progression
    const phaseTimer = setInterval(() => {
      setCurrentPhase(prev => prev < analysisPhases.length - 1 ? prev + 1 : prev);
    }, 2000);

    // Auto continue after all phases
    const autoAdvance = setTimeout(() => {
      clearInterval(confidenceInterval);
      clearInterval(metricsInterval);
      clearInterval(phaseTimer);
      setTimeout(onContinue, 2000);
    }, 8000);

    return () => {
      clearInterval(confidenceInterval);
      clearInterval(metricsInterval);
      clearInterval(phaseTimer);
      clearTimeout(autoAdvance);
    };
  }, [result.level, onContinue]);

  const getLevelColor = () => {
    switch (result.level) {
      case 1: return "text-primary";
      case 2: return "text-primary";
      case 3: return "text-accent";
      case 4: return "text-destructive";
      default: return "text-destructive";
    }
  };

  const getLevelBg = () => {
    switch (result.level) {
      case 1: return "bg-primary/10";
      case 2: return "bg-primary/10";
      case 3: return "bg-accent/10";
      case 4: return "bg-destructive/10";
      default: return "bg-destructive/10";
    }
  };

  const getAIInsight = () => {
    switch (result.level) {
      case 1:
        return `${firstName}, mi análisis de redes neuronales indica un patrón optimal con correlación del 94.7% respecto a casos exitosos similares.`;
      case 2:
        return `${firstName}, los algoritmos identifican un perfil favorable con algunas variables menores que optimizar para maximizar probabilidades.`;
      case 3:
        return `${firstName}, el modelo predictivo señala factores específicos que requieren atención, pero con alto potencial de mejora.`;
      case 4:
        return `${firstName}, mi análisis multivariable detecta varios parámetros que necesitan optimización antes de proceder.`;
      default:
        return `${firstName}, se requiere una evaluación más detallada para precisar las recomendaciones.`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 6,
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
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        {/* AI Brain Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center mb-8"
        >
          <div className="relative mx-auto w-24 h-24 mb-6">
            <motion.div
              className="w-full h-full rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            
            {/* Pulsing rings */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                style={{ margin: `${i * 6}px` }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.3 
                }}
              />
            ))}
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Análisis IA Finalizado
          </h2>
          <p className="text-muted-foreground">
            Inteligencia artificial médica - Resultados personalizados
          </p>
        </motion.div>

        {/* AI Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-card/30 rounded-xl p-4 border border-primary/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Casos Analizados</span>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <motion.div 
              className="text-2xl font-bold text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {analysisMetrics.casesAnalyzed.toLocaleString()}
            </motion.div>
          </div>
          
          <div className="bg-card/30 rounded-xl p-4 border border-accent/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Correlación IA</span>
              <Target className="w-4 h-4 text-accent" />
            </div>
            <motion.div 
              className="text-2xl font-bold text-accent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {(analysisMetrics.correlationStrength * 100).toFixed(1)}%
            </motion.div>
          </div>
          
          <div className="bg-card/30 rounded-xl p-4 border border-primary/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Confianza IA</span>
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <motion.div 
              className="text-2xl font-bold text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              {aiConfidence.toFixed(1)}%
            </motion.div>
          </div>
        </motion.div>

        {/* Analysis Phases */}
        <div className="space-y-4 mb-8">
          {analysisPhases.map((phase, index) => {
            const PhaseIcon = phase.icon;
            const isActive = index <= currentPhase;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.3,
                  x: 0,
                  scale: index === currentPhase ? 1.02 : 1
                }}
                transition={{ delay: index * 0.5 }}
                className={`p-4 rounded-xl border transition-all ${
                  isActive 
                    ? "bg-card/40 border-primary/50" 
                    : "bg-card/20 border-border/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    isActive ? "bg-primary/20" : "bg-muted/20"
                  }`}>
                    <PhaseIcon className={`w-6 h-6 ${
                      isActive ? phase.color : "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {phase.title}
                    </h3>
                    <p className={`text-sm ${
                      isActive ? "text-muted-foreground" : "text-muted-foreground/50"
                    }`}>
                      {phase.description}
                    </p>
                  </div>
                  
                  {index === currentPhase && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-auto"
                    >
                      <Zap className="w-5 h-5 text-primary" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className={`${getLevelBg()} rounded-2xl p-6 border border-border/30 text-center`}
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className={`w-8 h-8 ${getLevelColor()} mr-3`} />
            <h3 className={`text-xl font-semibold ${getLevelColor()}`}>
              Insight de IA Personalizado
            </h3>
          </div>
          
          <motion.p 
            className="text-foreground/90 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            {getAIInsight()}
          </motion.p>
          
          <motion.div 
            className="mt-4 pt-4 border-t border-border/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <div className={`text-3xl font-bold ${getLevelColor()} mb-2`}>
              Nivel {result.level}: {result.prediction}
            </div>
            <div className="text-muted-foreground">
              Puntuación del modelo: <span className={`font-bold ${getLevelColor()}`}>
                {result.totalScore}/16
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading for next phase */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="text-center mt-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Zap className="w-6 h-6 text-primary" />
          </motion.div>
          <p className="text-muted-foreground mt-2">
            Preparando recomendaciones personalizadas...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
