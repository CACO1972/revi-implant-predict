
import { motion } from "framer-motion";
import { Brain, Target, Clock } from "lucide-react";

export default function FeatureCards() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="glass-panel p-6 text-center group hover:scale-105 transition-all duration-300 border border-[#5BCBFF]/20">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-10 h-10 text-[#5BCBFF] mx-auto mb-3" />
        </motion.div>
        <h3 className="text-white font-bold text-lg mb-1">IA Predictiva</h3>
        <p className="text-[#5BCBFF]/80 text-sm">Análisis instantáneo</p>
      </div>
      
      <div className="glass-panel p-6 text-center group hover:scale-105 transition-all duration-300 border border-[#5BCBFF]/20">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Target className="w-10 h-10 text-[#5BCBFF] mx-auto mb-3" />
        </motion.div>
        <h3 className="text-white font-bold text-lg mb-1">100% Personal</h3>
        <p className="text-[#5BCBFF]/80 text-sm">Tu caso único</p>
      </div>
      
      <div className="glass-panel p-6 text-center group hover:scale-105 transition-all duration-300 border border-[#5BCBFF]/20">
        <motion.div
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Clock className="w-10 h-10 text-[#5BCBFF] mx-auto mb-3" />
        </motion.div>
        <h3 className="text-white font-bold text-lg mb-1">Sin Esperas</h3>
        <p className="text-[#5BCBFF]/80 text-sm">Resultados ya</p>
      </div>
    </motion.div>
  );
}
