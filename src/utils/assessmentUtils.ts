
import { Answer, AssessmentResult, QuestionOption } from "@/types/implant";
import { questions } from "@/data/questions";

export const calculateScore = (answers: Answer[]): number => {
  return answers.reduce((total, answer) => total + answer.score, 0);
};

export const getScoreFromOptions = (
  questionId: number, 
  selectedValues: (string | number)[]
): number => {
  const question = questions.find(q => q.id === questionId);
  if (!question) return 0;
  
  if (question.multiSelect) {
    // Para pregunta 7 (condiciones actuales)
    if (questionId === 7) {
      // Si seleccionó "Ninguna", score es 0
      if (selectedValues.includes("none")) return 0;
      
      // Calcula puntuación basada en número de síntomas
      const symptomsCount = selectedValues.length;
      if (symptomsCount <= 2) return 1;
      return 2;
    }
    
    // Para otras preguntas multiselección (como motivación)
    return question.options
      .filter(option => selectedValues.includes(option.value))
      .reduce((total, option) => total + option.score, 0);
  } else {
    // Para preguntas de selección única
    const selectedOption = question.options.find(
      option => selectedValues.includes(option.value)
    );
    return selectedOption ? selectedOption.score : 0;
  }
};

export const evaluateResult = (totalScore: number): AssessmentResult => {
  let level = 1;
  let prediction = "";
  
  if (totalScore <= 3) {
    level = 1;
    prediction = "Muy alto éxito clínico esperado";
  } else if (totalScore <= 6) {
    level = 2;
    prediction = "Alto éxito clínico";
  } else if (totalScore <= 9) {
    level = 3;
    prediction = "Riesgo moderado";
  } else {
    level = 4;
    prediction = "Riesgo elevado, se recomienda evaluación profesional";
  }
  
  // Recomendaciones personalizadas basadas en el nivel
  const recommendations = getRecommendationsByLevel(level);
  
  return {
    totalScore,
    level,
    prediction,
    recommendations
  };
};

const getRecommendationsByLevel = (level: number): string[] => {
  switch (level) {
    case 1:
      return [
        "Excelente candidato para implantes dentales",
        "Programa una consulta para iniciar el proceso",
        "Mantén tus buenos hábitos de higiene oral"
      ];
    case 2:
      return [
        "Buen candidato para implantes dentales",
        "Considera mejorar algunos hábitos antes del tratamiento",
        "Programa una evaluación profesional para un plan personalizado"
      ];
    case 3:
      return [
        "Factores de riesgo moderados identificados",
        "Se recomienda tratamiento previo de condiciones existentes",
        "Una evaluación profesional determinará el mejor enfoque"
      ];
    case 4:
      return [
        "Varios factores de riesgo identificados",
        "Es necesario abordar estas condiciones antes del tratamiento",
        "Consulta con un especialista para evaluar opciones alternativas"
      ];
    default:
      return ["Programa una consulta para una evaluación personalizada"];
  }
};
