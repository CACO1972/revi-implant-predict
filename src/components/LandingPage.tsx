
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="w-full max-w-2xl space-y-12 relative z-10"
      >
        <motion.div 
          className="space-y-8" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative mx-auto w-32 h-32 mb-12">
            <motion.div 
              className="w-full h-full"
              animate={{
                y: [0, -5, 0],
                filter: ["drop-shadow(0 0 10px rgba(0, 157, 255, 0.3))", "drop-shadow(0 0 15px rgba(0, 157, 255, 0.4))", "drop-shadow(0 0 10px rgba(0, 157, 255, 0.3))"]
              }} 
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img 
                src="/lovable-uploads/88c650cf-ccc6-47f7-96d6-bf9fea223ecf.png" 
                alt="ImplantX" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          <h2 className="text-3xl md:text-4xl gold-gradient-text font-light tracking-wider">
            Una herramienta clínica predictiva <br /> basada en IA
          </h2>

          <p className="text-[17px] text-white/85 max-w-lg mx-auto font-light leading-relaxed">
            Te ayudaremos a saber si eres un buen candidato para implantes dentales
          </p>
        </motion.div>

        <motion.div 
          className="space-y-6" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={onStart} 
              className="group text-starry px-10 py-7 rounded-xl text-lg font-medium shadow-gold-glow transition-all duration-300 border border-[#BFA181]/30 bg-orange-500 hover:bg-orange-400"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-sparkle" />
              Comenzar evaluación
            </Button>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.9, duration: 0.8 }} 
            className="text-[12px] text-white/50 mt-8 max-w-md mx-auto font-light"
          >
            *Versión beta. Esta herramienta no reemplaza una evaluación profesional.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
