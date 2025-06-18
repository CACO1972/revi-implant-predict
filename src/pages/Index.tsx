
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import RioAvatar from "@/components/question/RioAvatar";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";

// Cambia entre "#5BCBFF" (azul neón) y "#fff" (blanco puro) para comparar
const COLOR_MODE: "neon" | "white" = "neon"; // Cambia a "white" para ver la otra opción
const accentColorClass = COLOR_MODE === "neon" ? "text-neonblue" : "text-white";
const accentShadow = COLOR_MODE === "neon"
  ? "shadow-[0_0_16px_2px_#5BCBFF66]"
  : "shadow-[0_0_16px_2px_#FFFFFF55]";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative bg-[#0A1828] overflow-hidden">
      {/* Fondo animado con efectos de IA */}
      <AnimatedStarryBackground />

      {/* HERO/BANNER PRINCIPAL */}
      <section className="w-full max-w-xl mx-auto flex flex-col items-center py-24 md:py-36 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center space-y-7"
        >
          {/* Logo de ImplantX */}
          <motion.div 
            className="mb-6"
            animate={{ 
              y: [0, -10, 0],
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
              className="h-32 md:h-40 w-auto mx-auto"
            />
          </motion.div>

          {/* Avatar de Río */}
          <div className="mb-4">
            <RioAvatar />
          </div>

          <h1 className={`text-3xl md:text-5xl font-bold ${accentColorClass} drop-shadow-lg leading-tight font-montserrat`}>
            ¿Necesitas implantes dentales?
          </h1>
          <div className={`mt-3 mb-6 text-white/85 text-lg md:text-xl font-light max-w-md mx-auto leading-relaxed`}>
            ¿Pero no sabes si puedes o por dónde empezar?<br />
            <span className={`${accentColorClass} font-semibold`}>ImplantX</span> te provee de un <span className={`${accentColorClass} font-semibold`}>análisis clínico predictivo gratis</span><br />
            basado en evidencia científica y <span className={`${accentColorClass} font-semibold`}>potenciado por IA</span>.
          </div>
          <Button
            onClick={() => navigate('/evaluacion')}
            size="lg"
            className={`transition-all duration-300 text-lg md:text-xl font-bold px-10 py-6 rounded-2xl bg-neonblue hover:bg-neonblue/90 ${accentShadow} border-2 border-white/10 relative overflow-hidden shadow-glow`}
          >
            <div className="flex items-center gap-3 relative z-10 font-montserrat font-bold">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Play className={COLOR_MODE === "white" ? "text-white" : "text-neonblue"} />
              </motion.div>
              <span className={COLOR_MODE === "neon" ? "text-white" : "text-[#0A1828]"}>Comenzar evaluación gratis</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className={COLOR_MODE === "white" ? "text-white" : "text-neonblue"} />
              </motion.div>
            </div>
          </Button>
          <div className="mt-4 text-xs text-white/50">
            Análisis clínico predictivo. Gratis y sin registro.
          </div>
        </motion.div>
      </section>

      {/* FOOTER minimalista */}
      <footer className="absolute bottom-0 left-0 w-full py-5 flex flex-col items-center space-y-1 z-20">
        <div className="flex justify-center gap-4">
          <a
            href="https://instagram.com/reviveai.cl"
            target="_blank"
            rel="noopener noreferrer"
            className={`${accentColorClass} opacity-70 hover:opacity-100 transition underline underline-offset-2 font-semibold`}
          >
            @reviveai.cl
          </a>
          <span className="text-white/20">|</span>
          <a
            href="https://instagram.com/thehumanupgrade"
            target="_blank"
            rel="noopener noreferrer"
            className={`${accentColorClass} opacity-70 hover:opacity-100 transition underline underline-offset-2 font-semibold`}
          >
            @thehumanupgrade
          </a>
        </div>
        <p className="text-white/30 text-xs font-montserrat mt-2">
          © 2025 ImplantDX — Democratizando el acceso a la evaluación clínica
        </p>
      </footer>
    </div>
  );
}
