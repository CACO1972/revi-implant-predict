
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="space-y-6 max-w-xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {/* Banner compacto */}
      <motion.div 
        className="bg-gradient-to-r from-[#FF8C42]/90 to-[#5BCBFF]/90 backdrop-blur-sm rounded-2xl p-4 relative overflow-hidden border border-[#FF8C42]/30"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#FF8C42]/20 to-transparent"
          animate={{ x: [-100, 400] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-[#040D18]" />
            <h2 className="text-lg font-bold text-[#040D18] font-montserrat">Completamente Gratis</h2>
          </div>
          <p className="text-[#040D18]/80 text-sm font-medium">
            Sin registro • Confidencial • Plan incluido
          </p>
        </div>
      </motion.div>

      {/* CTA principal mejorado */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => navigate('/evaluacion')}
          size="lg"
          className="w-full transition-all duration-500 text-xl font-bold px-12 py-8 rounded-2xl bg-gradient-to-r from-[#5BCBFF] to-[#FF8C42] hover:from-[#FF8C42] hover:to-[#5BCBFF] text-white shadow-lg hover:shadow-[0_0_40px_rgba(91,203,255,0.6)] border-2 border-[#5BCBFF]/30 relative overflow-hidden group"
        >
          <div className="flex items-center justify-center gap-4 relative z-10">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1] 
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Play className="w-6 h-6" />
            </motion.div>
            
            <span className="font-montserrat font-bold">Evaluar Mi Sonrisa</span>
            
            <motion.div
              animate={{ 
                y: [0, -4, 0],
                rotate: [0, 15, -15, 0] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </div>
          
          {/* Efectos múltiples */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Pulso de energía */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/20"
            animate={{ scale: [1, 1.05, 1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>
      </motion.div>

      {/* Indicadores de confianza compactos */}
      <motion.div
        className="flex items-center justify-center gap-6 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div className="flex items-center gap-1">
          <motion.div
            className="w-2 h-2 bg-[#5BCBFF] rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[#5BCBFF]/80">1,247+ evaluaciones</span>
        </div>
        
        <div className="flex items-center gap-1">
          <motion.div
            className="w-2 h-2 bg-[#FF8C42] rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <span className="text-[#FF8C42]/80">Resultados en 2min</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
