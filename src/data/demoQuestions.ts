
import { Question } from "@/types/implant";

// Las preguntas para la demostración de Instagram, versión simplificada y con orden específico
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
  },
  {
    id: 6,
    title: "¿En qué parte de la boca necesitas el implante?",
    explanation: "Cada zona de la boca tiene características específicas que influyen en el tratamiento.",
    options: [
      { value: "0", label: "Zona delantera", score: 0 },
      { value: "1", label: "Zona posterior superior", score: 1 },
      { value: "2", label: "Zona posterior inferior", score: 2 }
    ],
    recommendation: "La ubicación determina el enfoque quirúrgico y el tipo de implante."
  },
  {
    id: 7,
    title: "¿Presentas alguna de estas condiciones actuales?",
    explanation: "Estas condiciones pueden afectar el éxito del tratamiento con implantes.",
    options: [
      { value: "caries", label: "Caries activas", score: 1 },
      { value: "gum", label: "Sangrado de encías", score: 1 },
      { value: "mobility", label: "Movilidad dental", score: 1 },
      { value: "pain", label: "Dolor o inflamación", score: 1 },
      { value: "none", label: "Ninguna de estas", score: 0 }
    ],
    multiSelect: true,
    recommendation: "Es importante tratar estas condiciones antes de proceder con implantes."
  },
  {
    id: 8,
    title: "¿Por qué perdiste el diente o dientes?",
    explanation: "La causa de la pérdida puede influir en el tratamiento y prevención futura.",
    options: [
      { value: "0", label: "Accidente o trauma", score: 0 },
      { value: "1", label: "Caries", score: 1 },
      { value: "2", label: "Enfermedad periodontal", score: 2 }
    ],
    recommendation: "Conocer la causa ayuda a prevenir problemas futuros."
  },
  {
    id: 9,
    title: "¿Cuáles son tus hábitos de higiene bucal?",
    explanation: "La higiene es clave para mantener la salud de los implantes a largo plazo.",
    options: [
      { value: "0", label: "Cepillado 3 veces/día + hilo + enjuague", score: 0 },
      { value: "1", label: "Cepillado 2 veces/día", score: 1 },
      { value: "2", label: "Cepillado 1 vez/día o menos", score: 2 }
    ],
    recommendation: "Una buena higiene oral es fundamental para el éxito del implante."
  },
  {
    id: 10,
    title: "¿Qué te motiva a buscar un implante dental?",
    explanation: "Comprender tu motivación nos ayuda a brindarte un mejor servicio.",
    options: [
      { value: "aesthetic", label: "Mejorar mi estética", score: 0 },
      { value: "function", label: "Recuperar la función masticatoria", score: 0 },
      { value: "confidence", label: "Aumentar mi confianza", score: 0 },
      { value: "health", label: "Mejorar mi salud bucal", score: 0 }
    ],
    multiSelect: true,
    recommendation: "Tu motivación es importante para personalizar el tratamiento."
  }
];
