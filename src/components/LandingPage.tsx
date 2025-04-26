import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({
  onStart
}: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative">
      {/* Background stars animation - keeping minimal stars, removing any that might be causing overlaps */}
      {[...Array(3)].map((_, i) => (
        <motion.div 
          key={i} 
          className="absolute" 
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5]
          }} 
          transition={{
            duration: 2 + i,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.7
          }} 
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
            width: "3px",
            height: "3px",
            background: "#BFA181",
            borderRadius: "50%",
            filter: "blur(1px)",
            boxShadow: "0 0 8px 1px rgba(191, 161, 129, 0.4)"
          }} 
        />
      ))}

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
          <div className="relative mx-auto w-64 h-64 mb-6">
            {/* Logo background glow - simplified to avoid overlapping */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#178582]/20 to-[#BFA181]/20 rounded-full blur-xl opacity-60" 
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.4, 0.6, 0.4]
              }} 
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }} 
            />

            {/* Logo container - simplified, single logo only */}
            <motion.div 
              animate={{
                y: [0, -5, 0],
                filter: ["drop-shadow(0 0 10px rgba(23, 133, 130, 0.3))", "drop-shadow(0 0 15px rgba(23, 133, 130, 0.4))", "drop-shadow(0 0 10px rgba(23, 133, 130, 0.3))"]
              }} 
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }} 
              className="relative w-full h-full flex items-center justify-center"
            >
              <img 
                src="/lovable-uploads/3d3b8ce7-1789-4fd0-ba94-16d161132e7e.png" 
                alt="ImplantDX Logo" 
                className="w-64 h-auto object-contain" 
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
