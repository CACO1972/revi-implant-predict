
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div 
      className="flex flex-col items-center space-y-4 relative"
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Efectos de partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Partículas flotantes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#5BCBFF] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Líneas de escaneo digital */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#5BCBFF] to-transparent opacity-30"
          animate={{ y: [0, 600, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FF8C42] to-transparent opacity-20"
          animate={{ y: [600, 0, 600] }}
          transition={{ duration: 8, repeat: Infinity, repeatDelay: 4 }}
        />
      </div>

      {/* Contenedor principal con efecto holográfico */}
      <motion.div 
        className="relative z-10 text-center space-y-6 p-8 rounded-3xl bg-gradient-to-b from-[#5BCBFF]/5 to-transparent border border-[#5BCBFF]/20 backdrop-blur-sm hologram-effect"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Logo con efectos mejorados */}
        <motion.div 
          className="mb-4 relative"
          animate={{ 
            y: [0, -8, 0],
            filter: ["drop-shadow(0 0 20px rgba(91, 203, 255, 0.3))", 
                     "drop-shadow(0 0 40px rgba(91, 203, 255, 0.6))", 
                     "drop-shadow(0 0 20px rgba(91, 203, 255, 0.3))"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Anillo de energía alrededor del logo */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#5BCBFF]/30"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ 
              width: '120%', 
              height: '120%', 
              left: '-10%', 
              top: '-10%' 
            }}
          />
          
          <img 
            src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
            alt="ImplantX Logo"
            className="h-56 md:h-72 lg:h-80 w-auto mx-auto relative z-10"
          />
          
          {/* Pulsos de energía */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#5BCBFF]/10"
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ 
              width: '100%', 
              height: '100%',
            }}
          />
        </motion.div>

        {/* Títulos integrados con efectos */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Indicador de IA activa */}
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-[#5BCBFF] rounded-full animate-pulse"></div>
            <span className="text-[#5BCBFF] text-sm font-medium tracking-wider">IA DENTAL ACTIVA</span>
            <div className="w-2 h-2 bg-[#5BCBFF] rounded-full animate-pulse"></div>
          </motion.div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat">
            <motion.span 
              className="text-[#5BCBFF] inline-block"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(91, 203, 255, 0.5)",
                  "0 0 20px rgba(91, 203, 255, 0.8)",
                  "0 0 10px rgba(91, 203, 255, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              IA
            </motion.span>{" "}
            que evalúa tu sonrisa,
          </h1>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat">
            predice el{" "}
            <motion.span 
              className="text-[#5BCBFF] inline-block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              éxito
            </motion.span>{" "}
            de tus implantes
          </h2>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-[#5BCBFF] font-light"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            y crea tu plan personalizado en{" "}
            <motion.span 
              className="text-white font-semibold bg-gradient-to-r from-[#FF8C42] to-[#5BCBFF] bg-clip-text text-transparent"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              2 minutos
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Contador de confianza animado */}
        <motion.div 
          className="flex items-center justify-center gap-4 mt-6 p-4 bg-gradient-to-r from-[#5BCBFF]/10 to-[#FF8C42]/10 rounded-xl border border-[#5BCBFF]/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3 border-2 border-[#5BCBFF] border-t-transparent rounded-full"
          />
          <span className="text-white/90 text-sm font-medium">
            Análisis en tiempo real
          </span>
          <motion.span 
            className="text-[#5BCBFF] font-bold text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            1,247+ evaluaciones
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
