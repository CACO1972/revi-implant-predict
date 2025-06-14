
import { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type Question = {
  id: string;
  text: string;
  options: Option[];
  explanation: string;
  advice: string;
};

const QUESTIONS: Question[] = [
  {
    id: "edad",
    text: "¿Cuántos años tiene?",
    options: [
      { value: "<50", label: "Menos de 50" },
      { value: "50-60", label: "50-60" },
      { value: ">60", label: "Más de 60" },
    ],
    explanation:
      "La densidad ósea disminuye con la edad y puede influir en la cicatrización del implante.",
    advice:
      "Si tiene más de 60 años, hable con su dentista sobre protocolos de carga diferida y suplementación de vitamina D.",
  },
  {
    id: "genero",
    text: "¿Con cuál género se identifica?",
    options: [
      { value: "masculino", label: "Masculino" },
      { value: "femenino", label: "Femenino" },
    ],
    explanation:
      "Las mujeres postmenopáusicas presentan mayor riesgo de baja densidad ósea.",
    advice:
      "Si es mujer y mayor de 50 años, considere una evaluación de osteoporosis con su médico.",
  },
  {
    id: "menopausia",
    text: "¿Ha dejado de tener menstruaciones por más de un año?",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
    ],
    explanation:
      "La menopausia acelera la pérdida de densidad ósea, afectando la estabilidad del implante.",
    advice:
      "Solicite un estudio de densidad ósea y refuerce calcio y vitamina D si corresponde.",
  },
  {
    id: "zona",
    text: "¿Dónde se ubicará el implante?",
    options: [
      { value: "mand_ant", label: "Mandíbula anterior" },
      { value: "mand_post", label: "Mandíbula posterior" },
      { value: "max_ant", label: "Maxilar superior anterior" },
      { value: "max_post", label: "Maxilar superior posterior" },
    ],
    explanation:
      "La densidad varía por región; el maxilar posterior suele ser menos denso.",
    advice:
      "En maxilar posterior podrían requerirse técnicas de aumento o implantes de mayor diámetro.",
  },
  {
    id: "osteoporosis",
    text: "¿Le han diagnosticado osteoporosis?",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
    ],
    explanation:
      "La osteoporosis reduce la calidad ósea y eleva el riesgo de complicaciones.",
    advice:
      "Informe a su dentista; puede ser necesario modificar el plan quirúrgico o solicitar CBCT.",
  },
  {
    id: "tabaquismo",
    text: "¿Fuma actualmente?",
    options: [
      { value: "no", label: "No" },
      { value: "<10", label: "Sí, <10 cig/día" },
      { value: "10-20", label: "Sí, 10-20 cig/día" },
      { value: ">20", label: "Sí, >20 cig/día" },
    ],
    explanation:
      "Fumar dificulta la cicatrización ósea y aumenta el riesgo de fracaso del implante.",
    advice:
      "Deje de fumar al menos 6 semanas antes y después de la cirugía para mejorar el pronóstico.",
  },
  {
    id: "diabetes",
    text: "¿Tiene diagnóstico de diabetes?",
    options: [
      { value: "no", label: "No" },
      { value: "controlada", label: "Sí, bien controlada" },
      { value: "n_controlada", label: "Sí, no controlada" },
    ],
    explanation:
      "La diabetes mal controlada enlentece la cicatrización y eleva el riesgo de infección.",
    advice:
      "Mantenga su HbA1c en rango controlado antes y después del procedimiento.",
  },
  {
    id: "bruxismo",
    text: "¿Aprieta o rechina los dientes?",
    options: [
      { value: "no", label: "No" },
      { value: "ocasional", label: "Sí, ocasionalmente" },
      { value: "frecuente", label: "Sí, frecuentemente" },
    ],
    explanation:
      "El bruxismo genera fuerzas excesivas que pueden comprometer el implante.",
    advice:
      "Comente el bruxismo con su dentista; puede recomendarle una férula de descarga.",
  },
  {
    id: "higiene",
    text: "¿Con qué frecuencia se cepilla los dientes?",
    options: [
      { value: ">2", label: "Más de dos veces al día" },
      { value: "2", label: "Dos veces al día" },
      { value: "<2", label: "Una vez al día o menos" },
    ],
    explanation:
      "Una higiene deficiente incrementa el riesgo de periimplantitis e infección.",
    advice:
      "Refuerce higiene y programe limpiezas profesionales cada 6 meses.",
  },
  {
    id: "periodontitis",
    text:
      "¿Le han dicho que tiene enfermedad de las encías o nota sangrado frecuente?",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
    ],
    explanation:
      "La periodontitis previa incrementa el riesgo de pérdida ósea alrededor del implante.",
    advice:
      "Trate la enfermedad de encías antes del implante para reducir complicaciones.",
  },
  {
    id: "radioterapia",
    text: "¿Ha recibido radioterapia en cabeza o cuello?",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
    ],
    explanation:
      "La radioterapia puede reducir la vascularización y complicar la cicatrización ósea.",
    advice:
      "Su dentista evaluará la necesidad de protocolos avanzados y medicación preventiva.",
  },
  {
    id: "tiempo_perdida",
    text: "¿Cuánto tiempo ha pasado desde que perdió el diente?",
    options: [
      { value: "<6m", label: "Menos de 6 meses" },
      { value: "6m-2a", label: "Entre 6 meses y 2 años" },
      { value: ">2a", label: "Más de 2 años" },
    ],
    explanation:
      "El hueso se reabsorbe progresivamente tras la extracción; esto puede reducir su volumen y densidad.",
    advice:
      "Si han pasado más de 2 años, podría requerirse regeneración ósea antes del implante.",
  },
];

export default function PredictiveQuestionnaire() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) =>
    setAnswers({ ...answers, [id]: value });

  return (
    <form className="space-y-8 max-w-xl mx-auto p-6 text-gray-800 bg-white/90 rounded-2xl mt-10 shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-neonblue font-montserrat tracking-tight text-center">
        Cuestionario Predictivo ImplantX™
      </h1>

      {QUESTIONS.map((q) => (
        <div key={q.id} className="border-b pb-6">
          <p className="font-medium text-background">{q.text}</p>

          <div className="mt-2 space-y-1">
            {q.options.map((opt) => (
              <label key={opt.value} className="block cursor-pointer">
                <input
                  type="radio"
                  name={q.id}
                  value={opt.value}
                  className="mr-2 accent-neonblue"
                  onChange={() => handleChange(q.id, opt.value)}
                  checked={answers[q.id] === opt.value}
                />
                <span className="text-background">{opt.label}</span>
              </label>
            ))}
          </div>

          <p className="mt-3 text-sm text-neonblue">
            <strong>¿Por qué importa?</strong> {q.explanation}
          </p>
          <p className="mt-1 text-sm text-gold-500">
            <strong>Sugerencia clínica:</strong> {q.advice}
          </p>
        </div>
      ))}

      <p className="text-xs text-gray-600 mt-8 text-center">
        Esta evaluación es preliminar y no reemplaza la revisión clínica ni la
        imagenología. Comparta los resultados con su dentista para un plan de
        tratamiento definitivo.
      </p>
    </form>
  );
}
