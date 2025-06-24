
"use client";

import { motion } from "framer-motion";

export default function ImplantXOrbitalTimeline() {
  return (
    <div className="w-full">
      {/* Hero Section Simplificado y Limpio */}
      <div className="text-center mb-8 md:mb-12 px-4 space-y-8 md:space-y-12">
        
        {/* Logo Grande y Prominente */}
        <motion.div 
          className="mb-8 md:mb-12 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
            alt="ImplantX Logo"
            className="h-40 md:h-56 lg:h-72 w-auto mx-auto"
          />
        </motion.div>

        {/* Mensaje Principal Directo y Claro */}
        <motion.div 
          className="space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
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

        {/* CTA Principal Destacado */}
        <motion.div
          className="pt-6 md:pt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="space-y-4">
            <button className="bg-gradient-to-r from-[#5BCBFF] to-[#178582] hover:from-[#5BCBFF]/90 hover:to-[#178582]/90 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-glow transition-all duration-300 transform hover:scale-105">
              🚀 COMENZAR EVALUACIÓN GRATUITA
            </button>
            
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#5BCBFF]/10 to-[#FF8C42]/10 border border-[#5BCBFF]/30 rounded-full text-[#5BCBFF] text-sm font-semibold backdrop-blur-sm">
              🆓 GRATIS • ⚡ SIN REGISTRO • 🏠 DESDE CASA
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
