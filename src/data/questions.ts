
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
    title: "¿En qué zona(s) están los dientes a reemplazar?",
    explanation: "Cada zona tiene distinta calidad ósea.",
    options: [
      { value: "maxilla_anterior", label: "Maxilar anterior", score: 0 },
      { value: "maxilla_posterior", label: "Maxilar posterior", score: 1 },
      { value: "mandible_anterior", label: "Mandíbula anterior", score: 1 },
      { value: "mandible_posterior", label: "Mandíbula posterior", score: 2 }
    ],
    recommendation: "Cada zona tiene distinta calidad ósea, lo que afecta el enfoque quirúrgico."
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
      { value: "periodontitis", label: "Periodontitis", score: 2 },
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
  },
  {
    id: 10,
    title: "¿Qué te motiva a hacer este tratamiento?",
    explanation: "Tu motivación es importante para el proceso.",
    options: [
      { value: "smile", label: "Volver a sonreír", score: 0 },
      { value: "self_esteem", label: "Mejorar autoestima", score: 0 },
      { value: "relationship", label: "Conseguir pareja", score: 0 },
      { value: "job", label: "Encontrar trabajo", score: 0 },
      { value: "health", label: "Mejorar salud", score: 0 },
      { value: "other", label: "Otro", score: 0 }
    ],
    multiSelect: true,
    recommendation: "Tu motivación personal también es parte del éxito del tratamiento."
  },
  {
    id: 11,
    title: "¿Cuál es tu principal preocupación?",
    explanation: "Entender tus preocupaciones nos ayuda a brindarte mejor atención.",
    options: [
      { value: "pain", label: "Dolor", score: 0 },
      { value: "failure", label: "Que no resulte", score: 0 },
      { value: "cost", label: "Costo", score: 0 },
      { value: "fear", label: "Miedo", score: 0 },
      { value: "no_dentist", label: "No conozco dentistas", score: 0 },
      { value: "other", label: "Otra", score: 0 }
    ],
    recommendation: "Existen soluciones predecibles, seguras y mínimamente invasivas."
  },
  // Nuevas preguntas
  {
    id: 12,
    title: "¿Has tenido alguna experiencia previa con implantes dentales?",
    explanation: "La experiencia previa puede influir en tus expectativas y en el plan de tratamiento.",
    options: [
      { value: "none", label: "No, nunca", score: 0 },
      { value: "failed", label: "Sí, y tuve problemas", score: 1.5 },
      { value: "success", label: "Sí, con buenos resultados", score: 0.5 }
    ],
    recommendation: "Cada caso es único, incluso si has tenido experiencias previas con implantes."
  },
  {
    id: 13,
    title: "¿Tienes alguna enfermedad autoinmune diagnosticada?",
    explanation: "Algunas condiciones autoinmunes pueden afectar la integración del implante.",
    options: [
      { value: "none", label: "No", score: 0 },
      { value: "controlled", label: "Sí, pero está controlada", score: 1 },
      { value: "uncontrolled", label: "Sí, y no está bien controlada", score: 2 }
    ],
    recommendation: "Un buen control de enfermedades autoinmunes mejora el pronóstico de los implantes."
  },
  {
    id: 14,
    title: "¿Has recibido algún tratamiento con bifosfonatos?",
    explanation: "Los bifosfonatos son medicamentos utilizados para osteoporosis y ciertos cánceres que pueden afectar la cicatrización ósea.",
    options: [
      { value: "none", label: "No, nunca", score: 0 },
      { value: "past", label: "Sí, en el pasado", score: 1 },
      { value: "current", label: "Sí, actualmente", score: 2 }
    ],
    recommendation: "Es importante informar a tu dentista sobre cualquier medicamento que estés tomando o hayas tomado."
  }
];
