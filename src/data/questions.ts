
import { Question } from "@/types/implant";

export const questions: Question[] = [
  {
    id: 1,
    title: "¿Cuántos años tiene?",
    explanation: "La edad influye en la densidad ósea y capacidad de cicatrización.",
    options: [
      { value: "young", label: "18-40 años", score: 0 },
      { value: "middle", label: "41-60 años", score: 0.5 },
      { value: "senior", label: "Más de 60 años", score: 1 }
    ],
    recommendation: "La edad es solo un factor. Pacientes mayores pueden tener excelentes resultados con el cuidado adecuado."
  },
  {
    id: 2,
    title: "¿Con cuál género se identifica?",
    explanation: "Las mujeres postmenopáusicas pueden presentar cambios en la densidad ósea.",
    options: [
      { value: "masculino", label: "Masculino", score: 0 },
      { value: "femenino", label: "Femenino", score: 0.5 }
    ],
    recommendation: "El género es relevante principalmente por factores hormonales en mujeres postmenopáusicas."
  },
  {
    id: 3,
    title: "¿Ha dejado de tener menstruaciones por más de un año?",
    explanation: "La menopausia puede acelerar la pérdida de densidad ósea.",
    options: [
      { value: "si", label: "Sí", score: 1 },
      { value: "no", label: "No", score: 0 }
    ],
    recommendation: "Si está en menopausia, considere suplementos de calcio y vitamina D según indicación médica.",
    isConditional: true,
    showWhenQuestionHasValues: { questionId: 2, values: ["femenino"] }
  },
  {
    id: 4,
    title: "¿Fuma actualmente?",
    explanation: "El tabaco reduce significativamente el éxito de los implantes dentales.",
    options: [
      { value: "no", label: "No fumo", score: 0 },
      { value: "light", label: "Ocasionalmente (1-5 cig/día)", score: 1 },
      { value: "moderate", label: "Moderadamente (6-15 cig/día)", score: 2 },
      { value: "heavy", label: "Frecuentemente (más de 15 cig/día)", score: 3 }
    ],
    recommendation: "Dejar de fumar al menos 6-8 semanas antes y después de la cirugía mejora dramáticamente el pronóstico."
  },
  {
    id: 5,
    title: "¿Tiene diagnóstico de diabetes?",
    explanation: "La diabetes afecta la cicatrización y debe estar bien controlada.",
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "controlled", label: "Sí, bien controlada (HbA1c <7%)", score: 1 },
      { value: "uncontrolled", label: "Sí, no controlada o desconozco", score: 2 }
    ],
    recommendation: "Con diabetes controlada, los implantes tienen excelentes resultados. Es crucial mantener niveles estables de glucosa."
  },
  {
    id: 6,
    title: "¿Rechina o aprieta los dientes?",
    explanation: "El bruxismo genera fuerzas excesivas que pueden comprometer los implantes.",
    options: [
      { value: "no", label: "No", score: 0 },
      { value: "mild", label: "Ocasionalmente", score: 1 },
      { value: "severe", label: "Frecuentemente o uso placa nocturna", score: 1.5 }
    ],
    recommendation: "El bruxismo se puede manejar con férulas de descarga. No es una contraindicación para implantes."
  },
  {
    id: 7,
    title: "¿Cuánto tiempo ha pasado desde que perdió el/los diente(s)?",
    explanation: "El hueso se reabsorbe progresivamente tras la pérdida dental.",
    options: [
      { value: "recent", label: "Menos de 3 meses", score: 0 },
      { value: "medium", label: "3 meses a 2 años", score: 0.5 },
      { value: "old", label: "Más de 2 años", score: 1.5 }
    ],
    recommendation: "Aunque haya pasado tiempo, existen técnicas de regeneración ósea muy exitosas para restaurar el volumen perdido."
  },
  {
    id: 8,
    title: "¿Cuántos dientes necesita reemplazar?",
    explanation: "La cantidad determina el tipo de tratamiento más adecuado.",
    options: [
      { value: "one", label: "Un solo diente", score: 0 },
      { value: "few", label: "2-4 dientes", score: 0.5 },
      { value: "several", label: "5-8 dientes", score: 1 },
      { value: "many", label: "Más de 8 dientes", score: 1.5 }
    ],
    recommendation: "Para múltiples dientes, existen soluciones como All-on-4 o All-on-6 que son muy eficientes y predecibles."
  },
  {
    id: 9,
    title: "¿Con qué frecuencia se cepilla los dientes?",
    explanation: "La higiene oral es crucial para el éxito a largo plazo de los implantes.",
    options: [
      { value: "excellent", label: "2+ veces al día + uso de hilo dental", score: 0 },
      { value: "good", label: "2 veces al día", score: 0.5 },
      { value: "fair", label: "1 vez al día", score: 1 },
      { value: "poor", label: "Irregular o menos de 1 vez al día", score: 2 }
    ],
    recommendation: "Una excelente higiene es el factor más importante para que los implantes duren décadas. Le enseñaremos las técnicas específicas."
  }
];
