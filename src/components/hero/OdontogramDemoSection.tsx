
import { motion } from "framer-motion";
import { Box, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OdontogramDemoSectionProps {
  onOpenDemo: () => void;
}

export default function OdontogramDemoSection({ onOpenDemo }: OdontogramDemoSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-panel p-8 border border-[#5BCBFF]/30 bg-gradient-to-b from-[#5BCBFF]/10 to-[#178582]/5 relative overflow-hidden">
        
        {/* Efecto de partículas flotantes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#5BCBFF]/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              rotateX: [0, 15, -15, 0]
            }}
            transition={{ 
              rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 4, repeat: Infinity }
            }}
          >
            <Box className="w-10 h-10 text-[#5BCBFF]" />
          </motion.div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#5BCBFF] font-montserrat">
              Odontograma 3D Interactivo
            </h3>
            <p className="text-[#178582] text-sm font-medium">
              La tecnología más avanzada para tu caso
            </p>
          </div>
          
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <MousePointer className="w-8 h-8 text-[#FF8C42]" />
          </motion.div>
        </div>
        
        <div className="text-center mb-6 relative z-10">
          <p className="text-white/90 text-lg mb-2">
            Marca tus dientes faltantes en 3D realista
          </p>
          <p className="text-[#5BCBFF]/80 text-sm">
            ✨ Rota, haz zoom y toca • 🎯 Evaluación instantánea • 📱 Funciona perfecto en móvil
          </p>
        </div>
        
        <div className="text-center relative z-10">
          <Button
            onClick={onOpenDemo}
            size="lg"
            className="bg-gradient-to-r from-[#5BCBFF] to-[#178582] hover:from-[#178582] hover:to-[#5BCBFF] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(91,203,255,0.4)] border-2 border-[#5BCBFF]/30 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="flex items-center gap-3 relative z-10">
              <Box className="w-5 h-5" />
              <span className="font-montserrat">Probar Odontograma 3D</span>
              <MousePointer className="w-5 h-5" />
            </div>
            
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
          
          <motion.p 
            className="text-[#5BCBFF]/70 text-xs mt-3"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀 Experiencia única en Chile • Pruébalo ahora
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
