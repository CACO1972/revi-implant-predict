
import { Question } from "@/types/implant";

export const questions: Question[] = [
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
    title: "¿Cuáles son exactamente los dientes que te faltan?",
    explanation: "Selecciona en la imagen los dientes específicos que has perdido. Esto nos permitirá crear un plan de tratamiento completamente personalizado.",
    options: [], // Se maneja con el selector dental interactivo
    multiSelect: true,
    recommendation: "La selección precisa de dientes nos permite calcular el pronóstico específico para cada zona y planificar la oclusión ideal."
  },
  {
    id: 7,
    title: "¿Tienes alguna de estas condiciones actuales?",
    explanation: "Estas condiciones pueden afectar el éxito del implante.",
    options: [
      { value: "caries", label: "Caries", score: 0.5 },
      { value: "loose_teeth", label: "Dientes sueltos", score: 0.5 },
      { value: "bleeding_gums", label: "Sangrado de encías", score: 0.5 },
      { value: "pain", label: "Dolor", score: 0.5 },
      { value: "none", label: "Ninguna", score: 0 }
    ],
    multiSelect: true,
    recommendation: "Tratar estas condiciones antes de colocar implantes."
  },
  {
    id: 8,
    title: "¿Cuál fue la causa de la pérdida dental?",
    explanation: "La causa original puede afectar el tratamiento.",
    options: [
      { value: "trauma", label: "Trauma", score: 0 },
      { value: "cavities", label: "Caries", score: 1 },
      { value: "periodontitis", label: "Periodontitis (por dientes sueltos)", score: 2 },
      { value: "other", label: "Otra", score: 2 }
    ],
    recommendation: "Conocer la causa ayuda a prevenir futuras pérdidas."
  },
  {
    id: 9,
    title: "¿Cuáles son tus hábitos diarios de higiene oral?",
    explanation: "La higiene es crucial para el mantenimiento de implantes.",
    options: [
      { value: "once", label: "Me cepillo 1 vez/día", score: 2 },
      { value: "multiple", label: "Me cepillo más de 1 vez/día sin hilo ni enjuague", score: 1 },
      { value: "complete", label: "Me cepillo 2–3 veces/día y uso hilo y/o enjuague", score: 0 }
    ],
    recommendation: "Mejorar la higiene bucal refuerza la estabilidad de los implantes."
  }
];
