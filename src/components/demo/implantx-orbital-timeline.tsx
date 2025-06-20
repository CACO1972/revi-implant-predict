
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
      {/* Hero Section con Nueva Estructura */}
      <div className="text-center mb-8 px-4 space-y-6">
        {/* Título Principal */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-montserrat leading-tight"
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
        </h1>

        {/* Subtitle Hook con Efecto Typing */}
        <motion.div 
          className="text-xl md:text-2xl lg:text-3xl text-[#FF8C42] font-medium leading-tight max-w-4xl mx-auto"
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
            ...PERO NO SABES SI PUEDES HACERLO NI POR DÓNDE EMPEZAR?
          </motion.span>
        </motion.div>

        {/* Badges Informativos */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="px-4 py-2 bg-gradient-to-r from-[#5BCBFF]/20 to-[#178582]/20 border border-[#5BCBFF]/40 rounded-full text-[#5BCBFF] text-sm font-semibold backdrop-blur-sm">
            🆓 DEMO GRATUITA
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-[#FF8C42]/20 to-[#BFA181]/20 border border-[#FF8C42]/40 rounded-full text-[#FF8C42] text-sm font-semibold backdrop-blur-sm">
            ⚡ 2 MINUTOS
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-[#178582]/20 to-[#5BCBFF]/20 border border-[#178582]/40 rounded-full text-[#178582] text-sm font-semibold backdrop-blur-sm">
            🏠 SIN SALIR DE CASA
          </div>
        </motion.div>

        {/* Texto Explicativo */}
        <motion.div 
          className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-[#5BCBFF] font-bold">IMPLANTX</span> es inteligencia artificial aplicada 
          para ayudarte en el primer paso para recuperar tu sonrisa.{" "}
          <motion.span 
            className="text-[#FF8C42] font-semibold"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            GRATIS, SIN SALIR DE CASA, SIN EXÁMENES
          </motion.span>
          , antes de sentarte en el sillón del dentista.
          <br />
          <br />
          Conoce cómo, en{" "}
          <span className="text-[#5BCBFF] font-bold">2 minutos</span>, además te entrega{" "}
          <span className="text-[#BFA181] font-semibold">odontograma 3D, personalización de tratamiento, calculadora de valores</span>.
        </motion.div>
      </div>
      
      {/* Timeline Orbital */}
      <RadialOrbitalTimeline timelineData={implantXTimelineData} />
      
      <div className="text-center mt-8 px-4">
        <motion.p 
          className="text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          🚀 Toca cada nodo para explorar el proceso • ⚡ Precisión basada en evidencia científica
        </motion.p>
      </div>
    </div>
  );
}
