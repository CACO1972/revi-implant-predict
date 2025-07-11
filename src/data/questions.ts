
import { Question } from "@/types/implant";

export const questions: Question[] = [
  {
    id: 1,
    title: "¿Cuántos años tiene?",
    explanation: "La densidad ósea disminuye con la edad y puede influir en la cicatrización del implante.",
    options: [
      { value: "<50", label: "Menos de 50", score: 0 },
      { value: "50-60", label: "50-60", score: 1 },
      { value: ">60", label: "Más de 60", score: 2 }
    ],
    recommendation: "Si tiene más de 60 años, hable con su dentista sobre protocolos de carga diferida y suplementación de vitamina D.",
  },
  {
    id: 2,
    title: "¿Con cuál género se identifica?",
    explanation: "Las mujeres postmenopáusicas presentan mayor riesgo de baja densidad ósea.",
    options: [
      { value: "masculino", label: "Masculino", score: 0 },
      { value: "femenino", label: "Femenino", score: 1 }
    ],
    recommendation: "Si es mujer y mayor de 50 años, considere una evaluación de osteoporosis con su médico.",
  },
  {
    id: 3,
    title: "¿Ha dejado de tener menstruaciones por más de un año?",
    explanation: "La menopausia acelera la pérdida de densidad ósea, afectando la estabilidad del implante.",
    options: [
      { value: "si", label: "Sí", score: 1 },
      { value: "no", label: "No", score: 0 }
    ],
    recommendation: "Solicite un estudio de densidad ósea y refuerce calcio y vitamina D si corresponde.",
    isConditional: true,
    showWhenQuestionHasValues: {
      questionId: 2,
      values: ["femenino"]
    }
  },
  {
    id: 4,
    title: "¿Qué dientes te faltan?",
    explanation: "La ubicación de los dientes faltantes determina el tipo de implante y técnica quirúrgica más adecuada.",
    options: [], // Este será manejado por el componente especial
    recommendation: "Cada zona de la boca tiene características óseas diferentes que influyen en el éxito del tratamiento.",
    multiSelect: true
  },
  {
    id: 5,
    title: "¿Le han diagnosticado osteoporosis?",
    explanation: "La osteoporosis reduce la calidad ósea y eleva el riesgo de complicaciones.",
    options: [
      { value: "si", label: "Sí", score: 2 },
      { value: "no", label: "No", score: 0 }
    ],
    recommendation: "Informe a su dentista; puede ser necesario modificar el plan quirúrgico o solicitar CBCT.",
  },
  {
    id: 6,
    title: "¿Fuma actualmente?",
    explanation: "Fumar dificulta la cicatrización ósea y aumenta el riesgo de fracaso del implante.",
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "<10", label: "Sí, <10 cig/día", score: 1 },
      { value: "10-20", label: "Sí, 10-20 cig/día", score: 2 },
      { value: ">20", label: "Sí, >20 cig/día", score: 3 }
    ],
    recommendation: "Deje de fumar al menos 6 semanas antes y después de la cirugía para mejorar el pronóstico.",
  },
  {
    id: 7,
    title: "¿Tiene diagnóstico de diabetes?",
    explanation: "La diabetes mal controlada enlentece la cicatrización y eleva el riesgo de infección.",
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "controlada", label: "Sí, bien controlada", score: 1 },
      { value: "n_controlada", label: "Sí, no controlada", score: 2 }
    ],
    recommendation: "Mantenga su HbA1c en rango controlado antes y después del procedimiento.",
  },
  {
    id: 8,
    title: "¿Aprieta o rechina los dientes?",
    explanation: "El bruxismo genera fuerzas excesivas que pueden comprometer el implante.",
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "ocasional", label: "Sí, ocasionalmente", score: 1 },
      { value: "frecuente", label: "Sí, frecuentemente", score: 2 }
    ],
    recommendation: "Comente el bruxismo con su dentista; puede recomendarle una férula de descarga.",
  },
  {
    id: 9,
    title: "¿Con qué frecuencia se cepilla los dientes?",
    explanation: "Una higiene deficiente incrementa el riesgo de periimplantitis e infección.",
    options: [
      { value: ">2", label: "Más de dos veces al día", score: 0 },
      { value: "2", label: "Dos veces al día", score: 1 },
      { value: "<2", label: "Una vez al día o menos", score: 2 }
    ],
    recommendation: "Refuerce higiene y programe limpiezas profesionales cada 6 meses.",
  }
];
