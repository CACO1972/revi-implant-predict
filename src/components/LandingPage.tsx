
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative">
      {/* Estrellas brillantes animadas */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ 
            duration: 2 + i, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5
          }}
          style={{ 
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
            width: "4px",
            height: "4px",
            background: "white",
            borderRadius: "50%",
            filter: "blur(1px)",
            boxShadow: "0 0 10px 2px rgba(255,255,255,0.7)"
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
          <div className="relative mx-auto w-72 h-72 mb-6">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/30 to-gold/30 rounded-full blur-2xl opacity-70"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gold rounded-full"
                  animate={{ 
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  style={{
                    left: '50%',
                    top: i % 3 === 0 ? '0%' : '5%',
                    transform: `rotate(${i * 30}deg) translateY(-120px) translateX(-50%)`
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -10, 0],
                filter: ["drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))", "drop-shadow(0 0 25px rgba(23, 133, 130, 0.5))", "drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src="/lovable-uploads/846506fe-9bf3-421d-913e-bfd48b9feb05.png"
                alt="ImplantDX Logo"
                className="w-full h-auto drop-shadow-2xl z-10"
              />
              
              {/* Efecto de brillo detrás del logo */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-xl -z-10"></div>
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onStart}
              className="group bg-gold hover:bg-gold/90 text-starry px-10 py-7 rounded-xl text-lg font-medium shadow-gold-glow transition-all duration-300 border border-gold/30"
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
