
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import RioAvatar from "@/components/question/RioAvatar";

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
      {/* HERO/BANNER PRINCIPAL */}
      <section className="w-full max-w-xl mx-auto flex flex-col items-center py-24 md:py-36 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center space-y-7"
        >
          <div className="mb-4">
            <RioAvatar />
          </div>
          <h1 className={`text-3xl md:text-5xl font-bold ${accentColorClass} drop-shadow-lg leading-tight font-montserrat`}>
            ¿Puedes hacerte Implantes Dentales?
          </h1>
          <div className={`mt-3 mb-6 text-white/85 text-lg md:text-xl font-light max-w-md mx-auto`}>
            Descúbrelo <span className={`${accentColorClass} font-semibold`}>gratis</span> en 2 minutos.<br />
            Evaluación predictiva potenciada por IA.<br />
            Sin salir de casa.
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
              <span className={COLOR_MODE === "neon" ? "text-white" : "text-[#0A1828]"}>Probar demo gratis</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className={COLOR_MODE === "white" ? "text-white" : "text-neonblue"} />
              </motion.div>
            </div>
          </Button>
          <div className="mt-4 text-xs text-white/50">
            Demo clínica predictiva. Gratis y sin registro.
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
