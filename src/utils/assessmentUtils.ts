
import { Answer, AssessmentResult, QuestionOption, PatientInfo } from "@/types/implant";
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

// Obtener recomendaciones personalizadas basadas en el nivel y factores de riesgo
export const getPersonalizedRecommendations = (
  patient: PatientInfo,
  answers: Answer[],
  result: AssessmentResult
): string[] => {
  let recommendations = getRecommendationsByLevel(result.level);
  let personalFactors: string[] = [];

  // Analizar factores específicos del paciente
  answers.forEach(answer => {
    // Verificar tabaquismo (Pregunta 1)
    if (answer.questionId === 1) {
      if (answer.selectedValues[0] === "1") {
        personalFactors.push("fumador ocasional");
        recommendations.push("Reducir o idealmente eliminar el consumo de tabaco al menos 2 semanas antes y 8 semanas después de la cirugía.");
      }
      else if (answer.selectedValues[0] === "2") {
        personalFactors.push("fumador habitual");
        recommendations.push("Se recomienda enfáticamente dejar de fumar al menos 1 mes antes del procedimiento para mejorar significativamente el pronóstico.");
      }
    }
    
    // Verificar diabetes (Pregunta 2)
    if (answer.questionId === 2) {
      if (answer.selectedValues[0] === "1") {
        personalFactors.push("diabetes controlada");
        recommendations.push("Mantener un control estricto de los niveles de glucemia antes, durante y después del procedimiento.");
      }
      else if (answer.selectedValues[0] === "2") {
        personalFactors.push("diabetes no controlada");
        recommendations.push("Es fundamental estabilizar los niveles de glucemia (HbA1c < 7%) antes de iniciar el tratamiento de implantes.");
      }
    }
    
    // Verificar bruxismo (Pregunta 3)
    if (answer.questionId === 3) {
      if (answer.selectedValues[0] === "1") {
        personalFactors.push("bruxismo controlado");
        recommendations.push("Continuar con el uso de férula nocturna durante todo el proceso y después de finalizado el tratamiento.");
      }
      else if (answer.selectedValues[0] === "2") {
        personalFactors.push("bruxismo no tratado");
        recommendations.push("Será necesario el uso de una férula de descarga nocturna para proteger los implantes y sus componentes protésicos.");
      }
    }
    
    // Verificar tiempo de pérdida dental (Pregunta 4)
    if (answer.questionId === 4 && answer.selectedValues[0] === "2") {
      personalFactors.push("pérdida dental antigua");
      recommendations.push("Es probable que necesites procedimientos de regeneración ósea previos a la colocación de implantes.");
    }
    
    // Verificar higiene (Pregunta 9)
    if (answer.questionId === 9) {
      if (answer.selectedValues[0] === "1") {
        recommendations.push("Mejorar la rutina de higiene incorporando el uso de hilo dental y enjuague bucal diariamente.");
      }
      else if (answer.selectedValues[0] === "2") {
        personalFactors.push("higiene deficiente");
        recommendations.push("Es esencial mejorar los hábitos de higiene oral antes del tratamiento. Se recomienda cepillado tres veces al día, uso de hilo dental y enjuague.");
      }
    }
  });
  
  // Añadir recomendación personalizada basada en edad si está disponible
  if (patient.age) {
    if (patient.age > 65) {
      recommendations.push("Considerando tu edad, podría ser necesario un seguimiento más frecuente para garantizar el éxito a largo plazo.");
    } else if (patient.age < 25) {
      recommendations.push("Debido a tu edad, es importante verificar que el crecimiento óseo esté completamente finalizado antes de proceder.");
    }
  }
  
  // Eliminar duplicados y limitar a máximo 5 recomendaciones
  const uniqueRecommendations = [...new Set(recommendations)];
  return uniqueRecommendations.slice(0, 6);
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
