
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl space-y-12"
      >
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
              filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative"
          >
            <img
              src="/lovable-uploads/846506fe-9bf3-421d-913e-bfd48b9feb05.png"
              alt="ImplantDX Logo"
              className="w-64 h-auto mx-auto mb-8 drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 rounded-xl"></div>
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl text-gold font-light max-w-xl mx-auto gold-glow">
            Una herramienta clínica predictiva basada en IA
          </h2>
          
          <p className="text-[16px] text-white/85 max-w-lg mx-auto font-light leading-relaxed">
            Te ayudaremos a saber si eres un buen candidato para implantes dentales
          </p>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button
            onClick={onStart}
            className="bg-gold hover:bg-gold/90 text-background px-10 py-7 rounded-xl text-lg font-medium shadow-lg transition-all duration-300 border border-gold/30 hover:scale-105"
          >
            Comenzar evaluación
          </Button>

          <p className="text-[12px] text-white/50 mt-8 max-w-md mx-auto font-light">
            *Versión beta. Esta herramienta no reemplaza una evaluación profesional.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
