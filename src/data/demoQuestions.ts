
import { Question } from "@/types/implant";

// Las 5 primeras preguntas para la demostración de Instagram (versión beta demo)
export const demoQuestions: Question[] = [
  {
    id: 1,
    title: "¿Fumas actualmente?",
    explanation: "El consumo de tabaco puede afectar significativamente la cicatrización y el éxito a largo plazo de los implantes.",
    options: [
      { value: "0", label: "No fumo", score: 0 },
      { value: "1", label: "Fumo ocasionalmente", score: 1 },
      { value: "2", label: "Fumo diariamente", score: 2 }
    ],
    recommendation: "Si eres fumador, considera reducir o idealmente dejar de fumar antes del tratamiento."
  },
  {
    id: 2,
    title: "¿Tienes diabetes?",
    explanation: "La diabetes puede afectar la cicatrización de heridas y la integración del implante con el hueso.",
    options: [
      { value: "0", label: "No tengo diabetes", score: 0 },
      { value: "1", label: "Sí, bien controlada", score: 1 },
      { value: "2", label: "Sí, con control irregular", score: 2 }
    ],
    recommendation: "Un buen control de la glucemia es esencial para el éxito del implante."
  },
  {
    id: 3,
    title: "¿Presentas bruxismo (rechinar de dientes)?",
    explanation: "El bruxismo ejerce fuerzas excesivas sobre los dientes e implantes que pueden causar complicaciones.",
    options: [
      { value: "0", label: "No", score: 0 },
      { value: "1", label: "Sí, uso placa de protección", score: 1 },
      { value: "2", label: "Sí, no uso protección", score: 2 }
    ],
    recommendation: "Una placa de protección nocturna es fundamental si tienes bruxismo."
  },
  {
    id: 4,
    title: "¿Cuánto tiempo ha pasado desde que perdiste el diente?",
    explanation: "El tiempo transcurrido desde la pérdida dental afecta la cantidad y calidad del hueso disponible.",
    options: [
      { value: "0", label: "Menos de 1 año", score: 0 },
      { value: "1", label: "Entre 1-3 años", score: 1 },
      { value: "2", label: "Más de 3 años", score: 2 }
    ],
    recommendation: "Es recomendable evaluar el implante lo antes posible tras perder un diente."
  },
  {
    id: 5,
    title: "¿Cuántos dientes necesitas reemplazar?",
    explanation: "La cantidad de dientes a reemplazar determinará el tipo de tratamiento recomendado.",
    options: [
      { value: "0", label: "1 diente", score: 0 },
      { value: "1", label: "2-3 dientes", score: 1 },
      { value: "2", label: "4 o más dientes", score: 2 }
    ],
    recommendation: "Existen diferentes soluciones según la cantidad de dientes a reemplazar."
  }
];
