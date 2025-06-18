
import { motion } from "framer-motion";
import { Brain, Target, Clock, Zap } from "lucide-react";

export default function FeatureCards() {
  const cards = [
    {
      icon: Brain,
      title: "IA Predictiva",
      subtitle: "Análisis instantáneo",
      color: "#5BCBFF",
      delay: 0.1
    },
    {
      icon: Target,
      title: "100% Personal",
      subtitle: "Tu caso único",
      color: "#FF8C42",
      delay: 0.2
    },
    {
      icon: Clock,
      title: "Sin Esperas",
      subtitle: "Resultados ya",
      color: "#5BCBFF",
      delay: 0.3
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="relative group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + card.delay, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="glass-panel p-4 text-center border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-xl relative overflow-hidden">
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Partícula de energía */}
            <motion.div
              className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-60"
              style={{ backgroundColor: card.color }}
              animate={{ 
                opacity: [0.3, 0.9, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 2 + index * 0.5, 
                repeat: Infinity 
              }}
            />

            <motion.div
              className="relative z-10"
              animate={{ 
                rotate: index === 0 ? [0, 360] : [0, 15, -15, 0],
                y: [0, -2, 0]
              }}
              transition={{
                rotate: { duration: index === 0 ? 8 : 4, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <card.icon 
                className="w-8 h-8 mx-auto mb-2" 
                style={{ color: card.color }}
              />
            </motion.div>
            
            <h3 className="text-white font-bold text-base mb-1 relative z-10">
              {card.title}
            </h3>
            <p className="text-xs relative z-10" style={{ color: `${card.color}CC` }}>
              {card.subtitle}
            </p>

            {/* Indicador de actividad */}
            <motion.div
              className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 rounded-full"
              style={{ backgroundColor: card.color }}
              animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
