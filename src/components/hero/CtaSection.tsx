
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <>
      {/* Banner naranja más elegante */}
      <motion.div 
        className="bg-gradient-to-r from-[#FF8C42]/90 to-[#FFB033]/90 backdrop-blur-sm rounded-2xl p-6 max-w-xl mx-auto my-8 relative overflow-hidden border border-[#FF8C42]/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#FF8C42]/20 to-transparent"
          animate={{ x: [-100, 400] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-[#040D18] mb-2 font-montserrat">Completamente Gratis</h2>
          <p className="text-[#040D18]/80 text-lg font-medium">
            Sin registro • Confidencial • Plan incluido
          </p>
        </div>
      </motion.div>

      {/* CTA principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Button
          onClick={() => navigate('/evaluacion')}
          size="lg"
          className="transition-all duration-500 text-xl font-bold px-12 py-8 rounded-2xl bg-gradient-to-r from-[#5BCBFF] to-[#309ABB] hover:from-[#309ABB] hover:to-[#5BCBFF] text-white shadow-lg hover:shadow-[0_0_30px_rgba(91,203,255,0.5)] border-2 border-[#5BCBFF]/30 relative overflow-hidden group transform hover:scale-105"
        >
          <div className="flex items-center gap-4 relative z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Play className="w-6 h-6" />
            </motion.div>
            <span className="font-montserrat font-bold">Evaluar Mi Sonrisa</span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </div>
          
          {/* Efecto de ondas en hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </Button>
      </motion.div>

      {/* Indicador de confianza */}
      <motion.p 
        className="text-[#5BCBFF]/60 text-sm mt-8 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        ✨ Más de 1,000 evaluaciones realizadas
      </motion.p>
    </>
  );
}
