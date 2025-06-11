
import { PatientInfo, Answer, AssessmentResult } from "@/types/implant";

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
