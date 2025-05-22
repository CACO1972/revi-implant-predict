
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[#0A1828] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl space-y-8 z-10 relative"
      >
        {/* Logo animado */}
        <motion.div 
          className="mb-12"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
            alt="ImplantDX Logo"
            className="w-72 h-auto mx-auto"
          />
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            ¿Eres candidato a implantes dentales?
          </h2>
          
          <p className="text-lg text-white/85 max-w-xl mx-auto">
            Descúbrelo en 2 minutos con ayuda de la IA y recibe tu plan clínico personalizado
          </p>
        </motion.div>

        <motion.div 
          className="space-y-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button 
            onClick={onStart}
            className="bg-[#178582] hover:bg-[#178582]/90 text-white px-8 py-6 rounded-xl text-lg shadow-glow transition-all duration-300 border border-[#BFA181]/30"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Evaluar mi caso
          </Button>

          <p className="text-[11px] text-white/50 mt-6 max-w-md mx-auto">
            *Esta herramienta clínica predictiva está basada en evidencia científica, pero no reemplaza una evaluación profesional.
          </p>
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <p className="text-sm text-white/60">© 2025 ImplantDX - Democratizando el acceso a evaluación clínica</p>
          <p className="text-xs text-white/40 mt-1">
            Para personas con recursos limitados o en zonas geográficamente aisladas
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
