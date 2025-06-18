
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Play, Brain, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import RioAvatar from "@/components/question/RioAvatar";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative bg-[#040D18] overflow-hidden">
      {/* Fondo animado con luces doradas */}
      <AnimatedStarryBackground />

      {/* HERO PRINCIPAL */}
      <section className="w-full max-w-4xl mx-auto flex flex-col items-center py-16 md:py-24 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-12"
        >
          {/* Logo ImplantX más grande */}
          <motion.div 
            className="mb-8"
            animate={{ 
              y: [0, -15, 0],
              filter: ["drop-shadow(0 0 25px rgba(91, 203, 255, 0.4))", 
                       "drop-shadow(0 0 40px rgba(91, 203, 255, 0.6))", 
                       "drop-shadow(0 0 25px rgba(91, 203, 255, 0.4))"]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
              alt="ImplantX Logo"
              className="h-60 md:h-80 w-auto mx-auto"
            />
          </motion.div>

          {/* Slogan principal - todo en una frase potente */}
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat">
              <span className="text-[#5BCBFF]">IA</span> que evalúa tu sonrisa,
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat">
              predice el <span className="text-[#5BCBFF]">éxito</span> de tus implantes
            </h2>
            <p className="text-xl md:text-2xl text-[#5BCBFF] font-light mt-4">
              y crea tu plan personalizado en <span className="text-white font-semibold">2 minutos</span>
            </p>
          </motion.div>

          {/* Cards de beneficios - más compactos y futuristas */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="glass-panel p-6 text-center group hover:scale-105 transition-all duration-300 border border-[#5BCBFF]/20">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-10 h-10 text-[#5BCBFF] mx-auto mb-3" />
              </motion.div>
              <h3 className="text-white font-bold text-lg mb-1">IA Predictiva</h3>
              <p className="text-[#5BCBFF]/80 text-sm">Análisis instantáneo</p>
            </div>
            
            <div className="glass-panel p-6 text-center group hover:scale-105 transition-all duration-300 border border-[#5BCBFF]/20">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Target className="w-10 h-10 text-[#5BCBFF] mx-auto mb-3" />
              </motion.div>
              <h3 className="text-white font-bold text-lg mb-1">100% Personal</h3>
              <p className="text-[#5BCBFF]/80 text-sm">Tu caso único</p>
            </div>
            
            <div className="glass-panel p-6 text-center group hover:scale-105 transition-all duration-300 border border-[#5BCBFF]/20">
              <motion.div
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Clock className="w-10 h-10 text-[#5BCBFF] mx-auto mb-3" />
              </motion.div>
              <h3 className="text-white font-bold text-lg mb-1">Sin Esperas</h3>
              <p className="text-[#5BCBFF]/80 text-sm">Resultados ya</p>
            </div>
          </motion.div>

          {/* Banner dorado más elegante */}
          <motion.div 
            className="bg-gradient-to-r from-[#FFD700]/90 to-[#FFA500]/90 backdrop-blur-sm rounded-2xl p-6 max-w-xl mx-auto my-8 relative overflow-hidden border border-[#FFD700]/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-transparent"
              animate={{ x: [-100, 400] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-[#040D18] mb-2 font-montserrat">Completamente Gratis</h2>
              <p className="text-[#040D18]/80 text-lg font-medium">
                Sin registro • Confidencial • Plan incluido
              </p>
            </div>
          </motion.div>

          {/* CTA principal - más futurista */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Button
              onClick={() => navigate('/evaluacion')}
              size="lg"
              className="transition-all duration-500 text-xl font-bold px-12 py-8 rounded-2xl bg-gradient-to-r from-[#5BCBFF] to-[#0080FF] hover:from-[#0080FF] hover:to-[#5BCBFF] text-white shadow-lg hover:shadow-[0_0_30px_rgba(91,203,255,0.5)] border-2 border-[#5BCBFF]/30 relative overflow-hidden group transform hover:scale-105"
            >
              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-6 h-6" />
                </motion.div>
                <span className="font-montserrat font-bold">Evaluar Mi Sonrisa</span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              </div>
              
              {/* Efecto de ondas en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </motion.div>

          {/* Indicador de confianza */}
          <motion.p 
            className="text-[#5BCBFF]/60 text-sm mt-8 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            ✨ Más de 1,000 evaluaciones realizadas
          </motion.p>
        </motion.div>
      </section>

      {/* Río en esquina inferior derecha, más pequeño */}
      <motion.div 
        className="fixed bottom-6 right-6 z-20"
        initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div className="scale-75">
          <RioAvatar />
        </div>
      </motion.div>

      {/* Footer minimalista */}
      <footer className="absolute bottom-0 left-0 w-full py-4 flex flex-col items-center space-y-1 z-20">
        <div className="flex justify-center gap-4">
          <a
            href="https://instagram.com/reviveai.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5BCBFF]/70 hover:text-[#5BCBFF] transition underline underline-offset-2 text-sm"
          >
            @reviveai.cl
          </a>
          <span className="text-white/20">|</span>
          <a
            href="https://instagram.com/thehumanupgrade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5BCBFF]/70 hover:text-[#5BCBFF] transition underline underline-offset-2 text-sm"
          >
            @thehumanupgrade
          </a>
        </div>
        <p className="text-white/30 text-xs font-montserrat">
          © 2025 ImplantDX — El futuro de la sonrisa perfecta
        </p>
      </footer>
    </div>
  );
}
