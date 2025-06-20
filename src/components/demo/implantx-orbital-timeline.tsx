
"use client";

import { Scan, Bot, Brain, ClipboardCheck, Trophy } from "lucide-react";
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
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Proceso de Evaluación con IA
        </h2>
        <p className="text-lg text-[#5BCBFF]/80 max-w-2xl mx-auto">
          Descubre si eres candidato ideal para implantes dentales con nuestra tecnología predictiva
        </p>
      </div>
      
      <RadialOrbitalTimeline timelineData={implantXTimelineData} />
      
      <div className="text-center mt-8 px-4">
        <p className="text-sm text-white/60">
          🚀 Toca cada nodo para explorar el proceso • ⚡ Precisión basada en evidencia científica
        </p>
      </div>
    </div>
  );
}
