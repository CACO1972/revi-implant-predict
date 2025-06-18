
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
          className="flex flex-col items-center space-y-8"
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
              className="h-48 md:h-64 w-auto mx-auto"
            />
          </motion.div>

          {/* Título principal */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl leading-tight font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Evaluación de <span className="text-[#5BCBFF]">Implantes Dentales</span>
          </motion.h1>

          {/* Subtítulo explicativo */}
          <motion.p 
            className="text-xl md:text-2xl text-[#5BCBFF] max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Análisis predictivo con IA para determinar tu candidatura a implantes dentales
          </motion.p>

          {/* Cómo funciona */}
          <motion.div 
            className="bg-gradient-to-r from-[#BFA181] to-[#D4BC9A] rounded-2xl p-6 max-w-2xl mx-auto my-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-[#061524] mb-3 font-montserrat">¿Cómo funciona?</h2>
            <p className="text-[#061524] text-lg leading-relaxed">
              Responde 9 preguntas clínicas • Nuestro algoritmo analiza tu caso • 
              Recibes tu nivel de éxito estimado y plan personalizado
            </p>
          </motion.div>

          {/* Beneficios clave con iconos */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="glass-panel p-6 text-center">
              <Brain className="w-8 h-8 text-[#BFA181] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">IA Especializada</h3>
              <p className="text-[#5BCBFF] text-sm">Algoritmos entrenados específicamente para implantología</p>
            </div>
            
            <div className="glass-panel p-6 text-center">
              <Target className="w-8 h-8 text-[#BFA181] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Plan Personalizado</h3>
              <p className="text-[#5BCBFF] text-sm">Opciones de tratamiento adaptadas a tu caso específico</p>
            </div>
            
            <div className="glass-panel p-6 text-center">
              <Clock className="w-8 h-8 text-[#BFA181] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Resultados Inmediatos</h3>
              <p className="text-[#5BCBFF] text-sm">Evaluación completa en menos de 2 minutos</p>
            </div>
          </motion.div>

          {/* Beneficios para pacientes */}
          <motion.div 
            className="bg-gradient-to-r from-[#BFA181]/20 to-[#D4BC9A]/20 backdrop-blur-sm border border-[#BFA181]/30 rounded-xl p-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 font-montserrat">Beneficios para ti:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#BFA181] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#5BCBFF] text-sm">Ahorra tiempo en consultas preliminares</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#BFA181] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#5BCBFF] text-sm">Conoce tu nivel de éxito antes del tratamiento</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#BFA181] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#5BCBFF] text-sm">Estimación de costos personalizada</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#BFA181] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#5BCBFF] text-sm">Plan de tratamiento adaptado a tu presupuesto</p>
              </div>
            </div>
          </motion.div>

          {/* CTA principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <Button
              onClick={() => navigate('/evaluacion')}
              size="lg"
              className="transition-all duration-300 text-xl font-bold px-12 py-8 rounded-2xl bg-gradient-to-r from-[#BFA181] to-[#D4BC9A] hover:from-[#D4BC9A] hover:to-[#BFA181] text-[#061524] shadow-gold-glow border-2 border-[#BFA181]/30 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Play className="w-6 h-6" />
                </motion.div>
                <span className="font-montserrat font-bold">Comenzar Evaluación</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              </div>
            </Button>
          </motion.div>

          <div className="mt-6 text-sm text-[#5BCBFF]/70">
            Sin registro • 100% confidencial • Resultados inmediatos
          </div>
        </motion.div>
      </section>

      {/* Río en esquina inferior derecha, más pequeño */}
      <motion.div 
        className="fixed bottom-6 right-6 z-20"
        initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
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
          © 2025 ImplantDX — Democratizando el acceso a la evaluación de implantes dentales
        </p>
      </footer>
    </div>
  );
}
