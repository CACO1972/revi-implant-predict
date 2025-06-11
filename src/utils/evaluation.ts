
import { AssessmentResult } from "@/types/implant";

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

export const evaluateResult = (totalScore: number): AssessmentResult => {
  let level = 1;
  let prediction = "";
  
  if (totalScore <= 3) {
    level = 1;
    prediction = "Excelente candidato para implantes";
  } else if (totalScore <= 6) {
    level = 2;
    prediction = "Buen candidato con consideraciones menores";
  } else if (totalScore <= 9) {
    level = 3;
    prediction = "Candidato con factores a optimizar";
  } else {
    level = 4;
    prediction = "Requiere evaluación y tratamiento previo";
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
