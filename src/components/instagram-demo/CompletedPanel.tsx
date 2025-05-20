
import React from "react";
import { motion } from "framer-motion";
import { AssessmentResult } from "@/types/implant";
import RecommendationList from "../results/RecommendationList";

interface CompletedPanelProps {
  name: string;
  result: AssessmentResult | null;
}

export default function CompletedPanel({ name, result }: CompletedPanelProps) {
  const getColorByLevel = () => {
    if (!result) return "text-[#1EAEDB]";
    
    switch (result.level) {
      case 1: return "text-emerald-400";
      case 2: return "text-[#1EAEDB]";
      case 3: return "text-gold";
      case 4: return "text-red-400";
      default: return "text-[#1EAEDB]";
    }
  };

  return (
    <motion.div
      key="completed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel p-6 text-center"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          filter: ["drop-shadow(0 0 15px rgba(30, 174, 219, 0.4))", 
                  "drop-shadow(0 0 25px rgba(30, 174, 219, 0.6))", 
                  "drop-shadow(0 0 15px rgba(30, 174, 219, 0.4))"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1EAEDB]/30 to-[#1EAEDB]/20 flex items-center justify-center"
      >
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantX Logo"
          className="h-16 w-auto"
        />
      </motion.div>
      
      <h2 className="text-2xl font-bold gold-gradient-text mb-4">
        ¡Gracias, {name}!
      </h2>

      {result && (
        <div className="mb-6">
          <div className="p-4 rounded-lg bg-white/5 mb-4">
            <h3 className={`text-xl font-semibold mb-2 ${getColorByLevel()}`}>
              Nivel {result.level}: {result.prediction}
            </h3>
            <p className="text-white/80 text-sm">
              Tu puntuación: <span className={`font-bold ${getColorByLevel()}`}>{result.totalScore}/16</span>
            </p>
          </div>
          
          <RecommendationList recommendations={result.recommendations} />
        </div>
      )}
      
      <p className="text-white/80 mb-2">
        Tu evaluación personalizada te ayudará a tomar decisiones informadas sobre tu salud bucal.
      </p>
      <p className="text-white/70 text-sm mb-6 italic">
        ImplantDX busca democratizar el acceso a información de calidad sobre implantes dentales,
        especialmente para personas con recursos limitados o en zonas geográficamente aisladas.
      </p>
      
      <div className="space-y-4">
        <a
          href="https://implantdx.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-starry py-3 px-4 rounded-xl shadow-glow transition-all duration-300 border border-[#1EAEDB]/30"
        >
          Obtener evaluación profesional
        </a>
        <a
          href="https://instagram.com/reviveai.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-white/70 hover:text-white/90 transition-colors"
        >
          <span className="mr-1">Síguenos en</span>
          <span className="font-bold">@reviveai.cl</span>
        </a>
      </div>
    </motion.div>
  );
}
