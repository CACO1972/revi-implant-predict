
import { motion } from "framer-motion";
import { CheckCircle, DollarSign, Home, MapPin } from "lucide-react";

export default function FeatureCards() {
  const cards = [
    {
      icon: CheckCircle,
      title: "¿Eres candidato?",
      subtitle: "Lo sabes en 2 min",
      color: "#178582",
      delay: 0.1
    },
    {
      icon: DollarSign,
      title: "Precio real",
      subtitle: "Sin sorpresas",
      color: "#BFA181",
      delay: 0.2
    },
    {
      icon: Home,
      title: "Desde tu casa",
      subtitle: "Sin viajar",
      color: "#178582",
      delay: 0.3
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 mb-4 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
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
          whileHover={{ scale: 1.03, y: -3 }}
        >
          <div className="glass-panel p-3 text-center border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-xl relative overflow-hidden">
            {/* Efecto de brillo sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <motion.div
              className="relative z-10"
              animate={{ 
                y: [0, -1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
            >
              <card.icon 
                className="w-6 h-6 mx-auto mb-2" 
                style={{ color: card.color }}
              />
            </motion.div>
            
            <h3 className="text-white font-bold text-sm mb-1 relative z-10">
              {card.title}
            </h3>
            <p className="text-xs relative z-10" style={{ color: `${card.color}CC` }}>
              {card.subtitle}
            </p>

            {/* Indicador sutil */}
            <motion.div
              className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-0.5 rounded-full"
              style={{ backgroundColor: card.color }}
              animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
