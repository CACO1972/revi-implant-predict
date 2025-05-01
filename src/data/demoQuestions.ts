
import { Question } from "@/types/implant";

export const demoQuestions: Question[] = [
  {
    id: 1,
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
    id: 2,
    title: "¿En qué zona(s) están los dientes a reemplazar?",
    explanation: "Cada zona tiene distinta calidad ósea.",
    options: [
      { value: "maxilla_anterior", label: "Maxilar anterior (zona frontal superior)", score: 0 },
      { value: "maxilla_posterior", label: "Maxilar posterior (zona trasera superior)", score: 1 },
      { value: "mandible_anterior", label: "Mandíbula anterior (zona frontal inferior)", score: 1 },
      { value: "mandible_posterior", label: "Mandíbula posterior (zona trasera inferior)", score: 2 }
    ],
    recommendation: "Cada zona tiene distinta calidad ósea, lo que afecta el enfoque quirúrgico."
  },
  {
    id: 3,
    title: "¿Tienes alguna de estas condiciones actuales?",
    explanation: "Estas condiciones pueden afectar el éxito del implante.",
    options: [
      { value: "none", label: "Ninguna condición", score: 0 },
      { value: "diabetes", label: "Diabetes", score: 2 },
      { value: "smoking", label: "Fumo regularmente", score: 2 },
      { value: "bruxism", label: "Bruxismo (rechino los dientes)", score: 1 }
    ],
    recommendation: "Tratar estas condiciones antes de colocar implantes."
  },
  {
    id: 4,
    title: "¿Cuáles son tus hábitos diarios de higiene oral?",
    explanation: "La higiene es crucial para el mantenimiento de implantes.",
    options: [
      { value: "once", label: "Me cepillo 1 vez al día", score: 2 },
      { value: "multiple", label: "Me cepillo más de 1 vez al día", score: 1 },
      { value: "complete", label: "Uso cepillo, hilo dental y enjuague", score: 0 }
    ],
    recommendation: "Mejorar la higiene bucal refuerza la estabilidad de los implantes."
  }
];
