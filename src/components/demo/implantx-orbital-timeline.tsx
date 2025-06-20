
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
      {/* Hero Section Simplificado */}
      <div className="text-center mb-8 md:mb-12 px-4 space-y-6 md:space-y-8">
        
        {/* Logo Grande y Prominente */}
        <motion.div 
          className="mb-6 md:mb-8 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
            alt="ImplantX Logo"
            className="h-32 md:h-48 lg:h-64 w-auto mx-auto"
          />
        </motion.div>

        {/* Mensaje Principal Directo */}
        <motion.div 
          className="space-y-4 md:space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-montserrat leading-tight">
            ¿NECESITAS{" "}
            <span className="text-[#5BCBFF]">IMPLANTES</span>?
          </h1>

          <h2 className="text-xl md:text-3xl lg:text-4xl text-[#FF8C42] font-medium leading-tight">
            Descubre si puedes hacértelos
            <br className="hidden md:block" />
            <span className="text-white"> en 2 minutos</span>
          </h2>
        </motion.div>

        {/* CTA Simple */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#5BCBFF]/20 to-[#FF8C42]/20 border border-[#5BCBFF]/40 rounded-full text-[#5BCBFF] text-sm font-semibold backdrop-blur-sm">
            🆓 GRATIS • ⚡ SIN REGISTRO • 🏠 DESDE CASA
          </div>
        </motion.div>
      </div>
      
      {/* Timeline Orbital */}
      <RadialOrbitalTimeline timelineData={implantXTimelineData} />
    </div>
  );
}
