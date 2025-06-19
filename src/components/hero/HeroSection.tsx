
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div 
      className="flex flex-col items-center space-y-4 relative"
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Efectos de partículas de fondo - reducidos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Partículas flotantes - menos cantidad */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#178582] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Contenedor principal compacto */}
      <motion.div 
        className="relative z-10 text-center space-y-4 p-4 rounded-2xl bg-gradient-to-b from-[#178582]/5 to-transparent border border-[#178582]/20 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Logo más compacto */}
        <motion.div 
          className="mb-3 relative"
          animate={{ 
            y: [0, -4, 0],
            filter: ["drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))", 
                     "drop-shadow(0 0 25px rgba(23, 133, 130, 0.5))", 
                     "drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
            alt="ImplantX Logo"
            className="h-32 md:h-40 lg:h-48 w-auto mx-auto relative z-10"
          />
        </motion.div>

        {/* Títulos adaptados al chileno */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Indicador de IA activa */}
          <motion.div 
            className="flex items-center justify-center gap-2 mb-3"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-[#178582] rounded-full animate-pulse"></div>
            <span className="text-[#178582] text-sm font-medium tracking-wider">IA DENTAL ACTIVA</span>
            <div className="w-2 h-2 bg-[#178582] rounded-full animate-pulse"></div>
          </motion.div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat">
            <motion.span 
              className="text-[#178582] inline-block"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(23, 133, 130, 0.5)",
                  "0 0 20px rgba(23, 133, 130, 0.8)",
                  "0 0 10px rgba(23, 133, 130, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ¿Te sirven
            </motion.span>{" "}
            los implantes?
          </h1>
          
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat">
            Averígualo{" "}
            <motion.span 
              className="text-[#BFA181] inline-block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              gratis
            </motion.span>{" "}
            en 2 minutos
          </h2>
          
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-[#178582] font-light"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Sin gastar en consultas ni exámenes{" "}
            <motion.span 
              className="text-white font-semibold bg-gradient-to-r from-[#BFA181] to-[#178582] bg-clip-text text-transparent"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              hasta saber si eres candidato
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Caso ejemplo chileno */}
        <motion.div 
          className="flex items-center justify-center gap-3 mt-4 p-3 bg-gradient-to-r from-[#178582]/10 to-[#BFA181]/10 rounded-xl border border-[#178582]/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-2 h-2 border border-[#178582] border-t-transparent rounded-full"
          />
          <span className="text-white/90 text-xs font-medium">
            <span className="text-[#BFA181] font-semibold">Carlos de Temuco:</span> "Me ahorré el viaje a Santiago y $120.000 en exámenes"
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
