
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative bg-[#061524] overflow-hidden">
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
              y: [0, -12, 0],
              filter: ["drop-shadow(0 0 20px rgba(191, 161, 129, 0.4))", 
                       "drop-shadow(0 0 35px rgba(191, 161, 129, 0.6))", 
                       "drop-shadow(0 0 20px rgba(191, 161, 129, 0.4))"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
              alt="ImplantX Logo"
              className="h-56 md:h-72 w-auto mx-auto"
            />
          </motion.div>

          {/* Título principal - más impactante */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ¿Necesitas <span className="text-[#5BCBFF]">Implantes</span>?
          </motion.h1>

          {/* Subtítulo simple */}
          <motion.p 
            className="text-2xl md:text-3xl text-[#5BCBFF] max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Evaluación con IA • Resultados en 2 minutos
          </motion.p>

          {/* Cards de beneficios - más visual, menos texto */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="glass-panel p-8 text-center group hover:scale-105 transition-transform duration-300">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-12 h-12 text-[#BFA181] mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white font-bold text-xl mb-2">IA Especializada</h3>
              <p className="text-[#5BCBFF] text-sm">Análisis predictivo avanzado</p>
            </div>
            
            <div className="glass-panel p-8 text-center group hover:scale-105 transition-transform duration-300">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Target className="w-12 h-12 text-[#BFA181] mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white font-bold text-xl mb-2">Plan Personalizado</h3>
              <p className="text-[#5BCBFF] text-sm">Adaptado a tu caso específico</p>
            </div>
            
            <div className="glass-panel p-8 text-center group hover:scale-105 transition-transform duration-300">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Clock className="w-12 h-12 text-[#BFA181] mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white font-bold text-xl mb-2">Inmediato</h3>
              <p className="text-[#5BCBFF] text-sm">Sin esperas ni consultas</p>
            </div>
          </motion.div>

          {/* Banner dorado destacado */}
          <motion.div 
            className="bg-gradient-to-r from-[#BFA181] to-[#D4BC9A] rounded-2xl p-8 max-w-2xl mx-auto my-12 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#BFA181]/10 to-[#D4BC9A]/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-[#061524] mb-3 font-montserrat">100% Gratuito</h2>
              <p className="text-[#061524] text-lg">
                Sin registro • Confidencial • Plan personalizado incluido
              </p>
            </div>
          </motion.div>

          {/* CTA principal - más prominente */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Button
              onClick={() => navigate('/evaluacion')}
              size="lg"
              className="transition-all duration-300 text-2xl font-bold px-16 py-10 rounded-3xl bg-gradient-to-r from-[#BFA181] to-[#D4BC9A] hover:from-[#D4BC9A] hover:to-[#BFA181] text-[#061524] shadow-gold-glow border-2 border-[#BFA181]/30 relative overflow-hidden group"
            >
              <div className="flex items-center gap-6 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Play className="w-8 h-8" />
                </motion.div>
                <span className="font-montserrat font-bold">Comenzar Ahora</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>
              </div>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Río en esquina inferior derecha, más pequeño */}
      <motion.div 
        className="fixed bottom-6 right-6 z-20"
        initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
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
            className="text-[#BFA181] opacity-70 hover:opacity-100 transition underline underline-offset-2 text-sm"
          >
            @reviveai.cl
          </a>
          <span className="text-white/20">|</span>
          <a
            href="https://instagram.com/thehumanupgrade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#BFA181] opacity-70 hover:opacity-100 transition underline underline-offset-2 text-sm"
          >
            @thehumanupgrade
          </a>
        </div>
        <p className="text-white/30 text-xs font-montserrat">
          © 2025 ImplantDX — Democratizando el acceso a implantes dentales
        </p>
      </footer>
    </div>
  );
}
