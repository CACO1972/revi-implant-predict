
"use client";

import { Scan, Bot, Brain, ClipboardCheck, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const implantXTimelineData = [
  {
    id: 1,
    title: "Evaluación Inicial",
    date: "Paso 1",
    content: "Cuestionario clínico inteligente que analiza tu historial médico y dental con IA predictiva.",
    category: "Evaluación",
    icon: ClipboardCheck,
    relatedIds: [2],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Análisis 3D",
    date: "Paso 2", 
    content: "Odontograma interactivo 3D para mapear dientes faltantes con precisión milimétrica.",
    category: "Análisis",
    icon: Scan,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 88,
  },
  {
    id: 3,
    title: "Predicción IA",
    date: "Paso 3",
    content: "Algoritmos de machine learning analizan más de 50 variables clínicas para predecir éxito.",
    category: "IA",
    icon: Brain,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 92,
  },
  {
    id: 4,
    title: "Plan Personalizado",
    date: "Paso 4",
    content: "Recomendaciones específicas basadas en tu perfil único de riesgo y factores predictivos.",
    category: "Planificación",
    icon: Bot,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 78,
  },
  {
    id: 5,
    title: "Tu Sonrisa Ideal",
    date: "Resultado",
    content: "Visualización de resultados esperados y plan de tratamiento optimizado para tu caso.",
    category: "Resultado",
    icon: Trophy,
    relatedIds: [4],
    status: "pending" as const,
    energy: 85,
  },
];

export default function ImplantXOrbitalTimeline() {
  return (
    <div className="w-full">
      {/* Hero Section Optimizado para Móvil */}
      <div className="text-center mb-6 md:mb-8 px-3 md:px-4 space-y-4 md:space-y-6">
        {/* Título Principal - Más pequeño en móvil */}
        <motion.h1 
          className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white font-montserrat leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ¿NECESITAS{" "}
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
            IMPLANTES
          </motion.span>
          ?
        </motion.h1>

        {/* Subtitle Hook - Más compacto */}
        <motion.div 
          className="text-base md:text-xl lg:text-2xl xl:text-3xl text-[#FF8C42] font-medium leading-tight max-w-sm md:max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ delay: 1, duration: 2, ease: "easeOut" }}
            className="overflow-hidden inline-block whitespace-nowrap"
          >
            <span className="hidden md:inline">...PERO NO SABES SI PUEDES HACERLO NI POR DÓNDE EMPEZAR?</span>
            <span className="md:hidden">...PERO NO SABES POR DÓNDE EMPEZAR?</span>
          </motion.span>
        </motion.div>

        {/* Badges Simplificados para Móvil */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#5BCBFF]/20 to-[#178582]/20 border border-[#5BCBFF]/40 rounded-full text-[#5BCBFF] text-xs md:text-sm font-semibold backdrop-blur-sm">
            🆓 DEMO GRATUITA
          </div>
          <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#FF8C42]/20 to-[#BFA181]/20 border border-[#FF8C42]/40 rounded-full text-[#FF8C42] text-xs md:text-sm font-semibold backdrop-blur-sm">
            ⚡ 2 MINUTOS
          </div>
          <div className="hidden md:flex px-4 py-2 bg-gradient-to-r from-[#178582]/20 to-[#5BCBFF]/20 border border-[#178582]/40 rounded-full text-[#178582] text-sm font-semibold backdrop-blur-sm">
            🏠 SIN SALIR DE CASA
          </div>
        </motion.div>

        {/* CTA Simplificado para Móvil */}
        <motion.div 
          className="text-sm md:text-lg lg:text-xl text-white/90 max-w-xs md:max-w-5xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-[#5BCBFF] font-bold">IMPLANTX</span> usa IA para evaluar si puedes hacerte implantes{" "}
          <motion.span 
            className="text-[#FF8C42] font-semibold"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            GRATIS y SIN EXÁMENES
          </motion.span>
          <span className="hidden md:inline">, antes de ir al dentista.</span>
        </motion.div>
      </div>
      
      {/* Timeline Orbital */}
      <RadialOrbitalTimeline timelineData={implantXTimelineData} />
      
      <div className="text-center mt-6 md:mt-8 px-4">
        <motion.p 
          className="text-xs md:text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          🚀 Toca cada nodo para explorar • ⚡ Precisión científica
        </motion.p>
      </div>
    </div>
  );
}
