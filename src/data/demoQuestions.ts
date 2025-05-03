
import { Question } from "@/types/implant";

export const demoQuestions: Question[] = [
  {
    id: 1,
    title: "¿Fumas actualmente?",
    explanation: "El tabaco reduce el flujo sanguíneo y afecta la cicatrización.",
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "light", label: "Sí, menos de 10 cig/día", score: 1 },
      { value: "heavy", label: "Sí, más de 10 cig/día o hace más de 5 años", score: 2 }
    ],
    recommendation: "Dejar o reducir el consumo mejora significativamente el pronóstico."
  },
  {
    id: 2,
    title: "¿Eres diabético/a?",
    explanation: "La diabetes no controlada aumenta el riesgo de infecciones.",
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "controlled", label: "Sí, bien controlada", score: 1 },
      { value: "uncontrolled", label: "Sí, no controlada", score: 2 }
    ],
    recommendation: "Controla tu glicemia antes de iniciar el tratamiento."
  },
  {
    id: 3,
    title: "¿Tienes bruxismo?",
    explanation: "Puede sobrecargar los implantes.",
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "treated", label: "Sí, uso plano", score: 1 },
      { value: "untreated", label: "Sí, sin tratamiento", score: 2 }
    ],
    recommendation: "El uso de un plano de relajación mejora el pronóstico."
  },
  {
    id: 4,
    title: "¿Hace cuánto perdiste el diente o dientes?",
    explanation: "A mayor tiempo, mayor pérdida de hueso.",
    options: [
      { value: "recent", label: "Un año o menos", score: 0 },
      { value: "medium", label: "Entre 1 y 3 años", score: 1 },
      { value: "old", label: "Más de 3 años", score: 2 }
    ],
    recommendation: "Mientras antes reemplaces tus dientes, mejor."
  },
  {
    id: 5,
    title: "¿Cuántos dientes necesitas reemplazar?",
    explanation: "La cantidad de dientes afecta el tipo de tratamiento.",
    options: [
      { value: "one", label: "Uno", score: 0 },
      { value: "several", label: "Varios", score: 1 },
      { value: "all", label: "Todos", score: 2 }
    ],
    recommendation: "Esto define el tipo de rehabilitación a planificar."
  },
  {
    id: 6,
    title: "¿En qué zona(s) están los dientes a reemplazar?",
    explanation: "Cada zona tiene distinta calidad ósea.",
    options: [
      { value: "maxilla_anterior", label: "Maxilar anterior", score: 0 },
      { value: "maxilla_posterior", label: "Maxilar posterior", score: 1 },
      { value: "mandible_anterior", label: "Mandíbula anterior", score: 1 },
      { value: "mandible_posterior", label: "Mandíbula posterior", score: 2 }
    ],
    recommendation: "Cada zona tiene distinta calidad ósea, lo que afecta el enfoque quirúrgico."
  }
];
