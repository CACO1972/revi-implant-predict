
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen text-center px-4">
      {/* Background with animation */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0 animate-background-move"
        style={{ 
          backgroundImage: "url('/lovable-uploads/d0a74c34-c7ab-4c0a-8c33-eed6e57baaaa.png')" 
        }}
      ></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl space-y-8 z-10 relative mt-32"
      >
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-lg md:text-xl text-white/85 font-light max-w-xl mx-auto">
            Una herramienta clínica predictiva basada en IA
          </h2>
          
          <p className="text-[15px] text-white/70 max-w-lg mx-auto font-light">
            Te ayudaremos a saber si eres un buen candidato para implantes dentales
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
            className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-xl text-lg shadow-glow transition-all duration-300 border border-gold/30"
          >
            Comenzar evaluación
          </Button>

          <p className="text-[11px] text-white/50 mt-6 max-w-md mx-auto">
            *Versión beta. Esta herramienta no reemplaza una evaluación profesional.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
