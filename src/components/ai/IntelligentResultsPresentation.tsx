
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, Shield, AlertTriangle, Lightbulb, Star } from "lucide-react";
import { AIAnalysis } from "./AIProcessingScreen";

interface IntelligentResultsPresentationProps {
  analysis: AIAnalysis;
  patientName: string;
  totalScore: number;
  level: number;
}

export default function IntelligentResultsPresentation({ 
  analysis, 
  patientName, 
  totalScore, 
  level 
}: IntelligentResultsPresentationProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [showingDetails, setShowingDetails] = useState(false);

  const sections = [
    { title: "Análisis Principal", component: "mainInsight" },
    { title: "Factores Identificados", component: "factors" },
    { title: "Comparativa Clínica", component: "comparative" },
    { title: "Recomendaciones", component: "recommendations" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowingDetails(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const firstName = patientName.split(' ')[0];

  const getLevelColor = () => {
    switch (level) {
      case 1: return "text-emerald-400";
      case 2: return "text-[#178582]";
      case 3: return "text-[#BFA181]";
      case 4: return "text-orange-400";
      default: return "text-red-400";
    }
  };

  const getLevelBg = () => {
    switch (level) {
      case 1: return "bg-emerald-400/10";
      case 2: return "bg-[#178582]/10";
      case 3: return "bg-[#BFA181]/10";
      case 4: return "bg-orange-400/10";
      default: return "bg-red-400/10";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header con animación de confianza */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#178582] to-[#BFA181] flex items-center justify-center mr-4"
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-white">{firstName}, aquí está mi análisis</h2>
            <p className="text-white/70">Basado en inteligencia artificial avanzada</p>
          </div>
        </div>

        {/* Medidor de confianza */}
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-white/80 mb-2">Nivel de confianza del análisis</p>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-48 bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#178582] to-[#BFA181]"
                initial={{ width: "0%" }}
                animate={{ width: `${analysis.confidenceLevel}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
            <span className="text-[#BFA181] font-bold">{analysis.confidenceLevel}%</span>
          </div>
        </div>
      </motion.div>

      {/* Insight principal con animación */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className={`${getLevelBg()} rounded-2xl p-6 border border-white/10`}
      >
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-full ${getLevelBg()} flex items-center justify-center`}>
            <TrendingUp className={`w-6 h-6 ${getLevelColor()}`} />
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-semibold ${getLevelColor()} mb-2`}>
              Diagnóstico IA
            </h3>
            <motion.p 
              className="text-white/90 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {analysis.mainInsight}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Análisis detallado */}
      <AnimatePresence>
        {showingDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Factores */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Factores positivos */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-green-500/10 rounded-xl p-6 border border-green-500/20"
              >
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-green-400 mr-3" />
                  <h4 className="text-lg font-semibold text-green-400">Factores Positivos</h4>
                </div>
                <div className="space-y-2">
                  {analysis.positiveFactors.map((factor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center text-white/80 text-sm"
                    >
                      <Star className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {factor}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Factores de atención */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-orange-500/10 rounded-xl p-6 border border-orange-500/20"
              >
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-400 mr-3" />
                  <h4 className="text-lg font-semibold text-orange-400">Factores de Atención</h4>
                </div>
                <div className="space-y-2">
                  {analysis.riskFactors.map((factor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center text-white/80 text-sm"
                    >
                      <AlertTriangle className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />
                      {factor}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Explicación personalizada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-[#178582] mr-3" />
                <h4 className="text-lg font-semibold text-[#178582]">Mi Razonamiento</h4>
              </div>
              <p className="text-white/85 leading-relaxed">
                {analysis.personalizedExplanation}
              </p>
            </motion.div>

            {/* Comparativa clínica */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-[#BFA181]/10 rounded-xl p-6 border border-[#BFA181]/20"
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#BFA181] mr-3" />
                <h4 className="text-lg font-semibold text-[#BFA181]">Análisis Comparativo</h4>
              </div>
              <p className="text-white/85 leading-relaxed">
                {analysis.comparativeCases}
              </p>
            </motion.div>

            {/* Recomendaciones inteligentes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-[#178582]/10 rounded-xl p-6 border border-[#178582]/20"
            >
              <div className="flex items-center mb-4">
                <Lightbulb className="w-6 h-6 text-[#178582] mr-3" />
                <h4 className="text-lg font-semibold text-[#178582]">Recomendaciones Específicas</h4>
              </div>
              <div className="space-y-3">
                {analysis.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#178582]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-[#178582] text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-white/85 text-sm leading-relaxed">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
