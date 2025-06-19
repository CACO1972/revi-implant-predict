
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="space-y-5 max-w-xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {/* Banner de beneficios chilenos */}
      <motion.div 
        className="bg-gradient-to-r from-[#BFA181]/90 to-[#178582]/90 backdrop-blur-sm rounded-2xl p-4 relative overflow-hidden border border-[#BFA181]/30"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#BFA181]/20 to-transparent"
          animate={{ x: [-100, 400] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
        />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-[#0A1828]" />
            <h2 className="text-base font-bold text-[#0A1828] font-montserrat">Evita Gastos Innecesarios</h2>
          </div>
          <p className="text-[#0A1828]/80 text-sm font-medium">
            No pagues consulta • No gastes en exámenes • Sabes desde casa
          </p>
        </div>
      </motion.div>

      {/* CTA principal chileno */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => navigate('/evaluacion')}
          size="lg"
          className="w-full transition-all duration-500 text-lg font-bold px-10 py-6 rounded-2xl bg-gradient-to-r from-[#178582] to-[#BFA181] hover:from-[#BFA181] hover:to-[#178582] text-white shadow-lg hover:shadow-[0_0_30px_rgba(23,133,130,0.6)] border-2 border-[#178582]/30 relative overflow-hidden group"
        >
          <div className="flex items-center justify-center gap-3 relative z-10">
            <motion.div
              animate={{ 
                rotate: [0, 360] 
              }}
              transition={{ 
                rotate: { duration: 6, repeat: Infinity, ease: "linear" }
              }}
            >
              <Play className="w-5 h-5" />
            </motion.div>
            
            <span className="font-montserrat font-bold">Revisar Si Me Sirven</span>
            
            <motion.div
              animate={{ 
                y: [0, -3, 0] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>
          
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
        </Button>
      </motion.div>

      {/* Beneficios específicos chilenos */}
      <motion.div
        className="flex items-center justify-center gap-6 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div className="flex items-center gap-1">
          <motion.div
            className="w-2 h-2 bg-[#178582] rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[#178582]/80">Especial para regiones</span>
        </div>
        
        <div className="flex items-center gap-1">
          <motion.div
            className="w-2 h-2 bg-[#BFA181] rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <span className="text-[#BFA181]/80">Ahorra tiempo y plata</span>
        </div>
      </motion.div>

      {/* Mensaje final motivacional */}
      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <p className="text-white/60 text-xs italic">
          "No gastes hasta saber si te van a resultar"
        </p>
      </motion.div>
    </motion.div>
  );
}
