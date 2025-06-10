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
  
  // Pregunta 6 - Selector dental específico
  if (questionId === 6) {
    if (selectedValues.length === 0) return 0;
    
    try {
      const teeth = selectedValues.map(val => {
        if (typeof val === 'string' && val.startsWith('{')) {
          return JSON.parse(val);
        }
        return null;
      }).filter(Boolean);
      
      // Calcular puntuación basada en:
      // - Número de dientes (más dientes = mayor complejidad)
      // - Zonas afectadas (zonas posteriores = mayor dificultad)
      // - Tiempo de pérdida
      let score = 0;
      
      teeth.forEach((tooth: any) => {
        const toothNumber = tooth.number;
        
        // Puntuación por zona
        if (toothNumber >= 16 && toothNumber <= 18 || toothNumber >= 26 && toothNumber <= 28) {
          score += 1; // Molares superiores (más difíciles)
        } else if (toothNumber >= 46 && toothNumber <= 48 || toothNumber >= 36 && toothNumber <= 38) {
          score += 0.5; // Molares inferiores
        } else {
          score += 0.3; // Dientes anteriores y premolares
        }
        
        // Puntuación por tiempo de pérdida
        if (tooth.dateLost) {
          const lossDate = new Date(tooth.dateLost);
          const now = new Date();
          const monthsDiff = (now.getTime() - lossDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
          
          if (monthsDiff > 36) score += 0.5; // Más de 3 años
          else if (monthsDiff > 12) score += 0.3; // 1-3 años
        }
        
        // Puntuación por causa
        if (tooth.cause === 'periodontitis') score += 0.5;
        else if (tooth.cause === 'caries') score += 0.3;
      });
      
      return Math.min(score, 2); // Cap máximo de 2 puntos
    } catch (error) {
      console.error('Error calculating dental score:', error);
      return selectedValues.length > 3 ? 2 : selectedValues.length > 1 ? 1 : 0.5;
    }
  }
  
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
    
    // Para otras preguntas multiselección
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

// Obtener recomendaciones personalizadas y empáticas basadas en las respuestas específicas
export const getPersonalizedRecommendations = (
  patient: PatientInfo,
  answers: Answer[],
  result: AssessmentResult
): string[] => {
  let recommendations: string[] = [];
  let personalFactors: string[] = [];

  // Analizar cada respuesta para generar recomendaciones específicas
  answers.forEach(answer => {
    const questionId = answer.questionId;
    const selectedValue = answer.selectedValues[0]?.toString() || "";

    switch (questionId) {
      case 1: // Tabaquismo
        if (selectedValue === "1") {
          personalFactors.push("fumador ocasional");
          recommendations.push("💪 Como fumador ocasional, tienes una gran ventaja. Te recomendamos reducir aún más o idealmente eliminar el tabaco 2 semanas antes de la cirugía para optimizar tu cicatrización.");
        } else if (selectedValue === "2") {
          personalFactors.push("fumador habitual");
          recommendations.push("🚭 Sabemos que dejar de fumar es un desafío, pero es el factor más importante para el éxito de tu implante. Considera buscar apoyo profesional para dejarlo al menos 1 mes antes del procedimiento.");
        } else {
          recommendations.push("🎉 ¡Excelente! Al no fumar, tienes las mejores condiciones para una cicatrización perfecta y un éxito duradero del implante.");
        }
        break;

      case 2: // Diabetes
        if (selectedValue === "1") {
          personalFactors.push("diabetes controlada");
          recommendations.push("👨‍⚕️ Tu diabetes controlada es una gran fortaleza. Mantén ese excelente control de glucemia (HbA1c < 7%) y coordina con tu médico durante todo el proceso.");
        } else if (selectedValue === "2") {
          personalFactors.push("diabetes no controlada");
          recommendations.push("⚠️ Es fundamental estabilizar tu diabetes antes del implante. Trabaja con tu médico para optimizar el control glucémico - esto será clave para tu éxito.");
        } else {
          recommendations.push("✅ Sin diabetes, tu proceso de cicatrización será más predecible y exitoso.");
        }
        break;

      case 3: // Bruxismo
        if (selectedValue === "1") {
          personalFactors.push("bruxismo controlado");
          recommendations.push("😴 ¡Perfecto! Ya usas placa de protección. Continúa con este hábito durante y después del tratamiento para proteger tu inversión.");
        } else if (selectedValue === "2") {
          personalFactors.push("bruxismo no tratado");
          recommendations.push("🦷 El bruxismo puede afectar la longevidad de tu implante. Te recomendamos una férula de descarga nocturna - es una inversión pequeña que protegerá tu implante por décadas.");
        } else {
          recommendations.push("😌 Sin bruxismo, tu implante tendrá una vida útil óptima sin fuerzas destructivas.");
        }
        break;

      case 4: // Tiempo de pérdida dental
        if (selectedValue === "0") {
          recommendations.push("⚡ ¡Timing perfecto! Al haber perdido el diente recientemente, tu hueso está en excelentes condiciones para recibir el implante.");
        } else if (selectedValue === "1") {
          recommendations.push("👍 Buen momento para actuar. Tu hueso aún mantiene buena calidad y cantidad para un tratamiento exitoso.");
        } else if (selectedValue === "2") {
          personalFactors.push("pérdida dental antigua");
          recommendations.push("🔧 Aunque ha pasado tiempo, existen técnicas avanzadas de regeneración ósea que pueden restaurar las condiciones ideales para tu implante.");
        }
        break;

      case 5: // Cantidad de dientes
        if (selectedValue === "0") {
          recommendations.push("🎯 Un implante individual es el tratamiento más predecible y conservador. Excelente opción para mantener tus dientes naturales intactos.");
        } else if (selectedValue === "1") {
          recommendations.push("🔧 Para 2-3 dientes, podemos considerar implantes individuales o un puente sobre implantes, según tu anatomía específica.");
        } else if (selectedValue === "2") {
          recommendations.push("🚀 Para múltiples dientes, técnicas como All-on-4 o All-on-6 pueden ofrecerte una solución completa y eficiente en menor tiempo.");
        }
        break;

      case 6: // Dientes específicos
        try {
          const teeth = answer.selectedValues.map(val => {
            if (typeof val === 'string' && val.startsWith('{')) {
              return JSON.parse(val);
            }
            return null;
          }).filter(Boolean);
          
          if (teeth.length > 0) {
            recommendations.push(`🦷 Has seleccionado ${teeth.length} diente${teeth.length !== 1 ? 's' : ''} específico${teeth.length !== 1 ? 's' : ''}. Esto nos permite crear un plan de tratamiento preciso considerando la oclusión y el pronóstico individual de cada zona.`);
          }
        } catch (error) {
          console.warn('Error parsing teeth data:', error);
        }
        break;
    }
  });

  // Añadir recomendaciones específicas por edad si está disponible
  if (patient.age) {
    if (patient.age > 65) {
      recommendations.push("👥 Considerando tu experiencia de vida, podríamos planificar un seguimiento más personalizado para garantizar el éxito a largo plazo.");
    } else if (patient.age < 25) {
      recommendations.push("🌱 A tu edad, es importante verificar que el crecimiento óseo esté completamente finalizado. Una evaluación radiográfica lo confirmará.");
    }
  }

  // Añadir recomendaciones generales empáticas según el nivel
  const levelRecommendations = getEmpathicRecommendationsByLevel(result.level, patient.name);
  recommendations = [...recommendations, ...levelRecommendations];

  // Eliminar duplicados y limitar recomendaciones
  const uniqueRecommendations = [...new Set(recommendations)];
  return uniqueRecommendations.slice(0, 6);
};

const getEmpathicRecommendationsByLevel = (level: number, patientName: string): string[] => {
  const firstName = patientName.split(' ')[0];
  
  switch (level) {
    case 1:
      return [
        `🌟 ${firstName}, eres un candidato excepcional. Tu compromiso con la salud bucal se nota en tus respuestas.`,
        "📅 Programa tu consulta con confianza - todo indica que tendrás un tratamiento exitoso y predecible.",
        "🏆 Mantén esos excelentes hábitos que te han traído hasta aquí. Tu futuro implante te lo agradecerá."
      ];
    case 2:
      return [
        `💪 ${firstName}, estás en muy buen camino. Con algunos ajustes menores, tendrás resultados excelentes.`,
        "🎯 Una evaluación profesional te dará el plan personalizado para optimizar tu tratamiento.",
        "⭐ Tu proactividad al hacer esta evaluación muestra que estás comprometido con tu salud bucal."
      ];
    case 3:
      return [
        `🤝 ${firstName}, aunque hay factores a considerar, muchos pacientes en tu situación logran excelentes resultados.`,
        "📋 Un especialista te ayudará a crear un plan paso a paso para optimizar las condiciones antes del implante.",
        "💡 Recuerda: cada factor de riesgo identificado es una oportunidad de mejora con el enfoque correcto."
      ];
    case 4:
      return [
        `🌈 ${firstName}, aunque hay varios aspectos a abordar, no te desanimes. Existen soluciones para cada situación.`,
        "👨‍⚕️ Un equipo especializado evaluará opciones alternativas que podrían ser perfectas para tu caso específico.",
        "🚀 Cada paso que des hacia mejorar tu salud bucal te acercará a la sonrisa que mereces."
      ];
    default:
      return [`📞 ${firstName}, programa una consulta para recibir orientación personalizada.`];
  }
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
