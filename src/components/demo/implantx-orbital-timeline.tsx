
"use client";

import { motion } from "framer-motion";

export default function ImplantXOrbitalTimeline() {
  return (
    <div className="w-full">
      {/* Hero Section Simplificado y Limpio */}
      <div className="text-center mb-8 md:mb-12 px-4 space-y-8 md:space-y-12">
        
        {/* Logo Grande y Prominente con Animaciones Mejoradas */}
        <motion.div 
          className="mb-8 md:mb-12 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Anillos orbitales animados alrededor del logo */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#5BCBFF]/20"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ 
              width: '130%', 
              height: '130%', 
              left: '-15%', 
              top: '-15%' 
            }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-full border border-[#FF8C42]/30"
            animate={{ 
              rotate: -360,
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ 
              width: '120%', 
              height: '120%', 
              left: '-10%', 
              top: '-10%' 
            }}
          />

          {/* Pulsos de energía más intensos */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5BCBFF]/20 to-[#FF8C42]/20"
            animate={{ 
              scale: [1, 1.8, 1], 
              opacity: [0, 0.6, 0] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{ 
              width: '100%', 
              height: '100%',
            }}
          />

          {/* Logo principal más grande con efectos mejorados */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotateY: [0, 10, 0],
              filter: [
                "drop-shadow(0 0 30px rgba(91, 203, 255, 0.4))", 
                "drop-shadow(0 0 60px rgba(91, 203, 255, 0.8))", 
                "drop-shadow(0 0 30px rgba(91, 203, 255, 0.4))"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <img 
              src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
              alt="ImplantX Logo"
              className="h-60 md:h-80 lg:h-96 xl:h-[28rem] w-auto mx-auto"
            />
          </motion.div>

          {/* Partículas flotantes alrededor del logo */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#5BCBFF] rounded-full opacity-60"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${15 + (i * 8)}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + (i * 0.5),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Mensaje Principal Directo y Claro */}
        <motion.div 
          className="space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-montserrat leading-tight">
            ¿NECESITAS{" "}
            <span className="text-[#5BCBFF]">IMPLANTES</span>?
          </h1>

          <h2 className="text-2xl md:text-4xl lg:text-5xl text-[#FF8C42] font-medium leading-tight">
            Descubre si puedes hacértelos
            <br className="hidden md:block" />
            <span className="text-white"> en 2 minutos</span>
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            La primera herramienta de evaluación dental con IA diseñada para 
            democratizar el acceso a orientación clínica profesional
          </p>
        </motion.div>

        {/* Badge de Demo más prominente */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-4"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#5BCBFF]/20 to-[#FF8C42]/20 border-2 border-[#5BCBFF]/40 rounded-2xl text-[#5BCBFF] text-lg font-bold backdrop-blur-sm shadow-glow">
            <motion.div 
              className="w-3 h-3 bg-[#5BCBFF] rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            🆓 VERSIÓN DEMO GRATUITA
            <motion.div 
              className="w-3 h-3 bg-[#FF8C42] rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
