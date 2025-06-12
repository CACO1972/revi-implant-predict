
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

  console.log("DEBUG - Generando recomendaciones para respuestas:", answers);

  // Analizar cada respuesta para generar recomendaciones específicas
  answers.forEach(answer => {
    const questionId = answer.questionId;
    const selectedValue = answer.selectedValues[0]?.toString() || "";
    
    console.log(`DEBUG - Procesando pregunta ${questionId} con valor:`, selectedValue);

    switch (questionId) {
      case 1: // Tabaquismo - usando valores correctos
        if (selectedValue === "light") {
          personalFactors.push("fumador ocasional");
          recommendations.push("💪 Como fumador ocasional, tienes una gran ventaja. Te recomendamos reducir aún más o idealmente eliminar el tabaco 2 semanas antes de la cirugía para optimizar tu cicatrización.");
        } else if (selectedValue === "heavy") {
          personalFactors.push("fumador habitual");
          recommendations.push("🚭 Sabemos que dejar de fumar es un desafío, pero es el factor más importante para el éxito de tu implante. Considera buscar apoyo profesional para dejarlo al menos 1 mes antes del procedimiento.");
        } else if (selectedValue === "no") {
          recommendations.push("🎉 ¡Excelente! Al no fumar, tienes las mejores condiciones para una cicatrización perfecta y un éxito duradero del implante.");
        }
        break;

      case 1.5: // Pregunta condicional sobre dejar de fumar
        if (selectedValue === "yes_already") {
          recommendations.push("🎯 ¡Fantástico! Ya estar en proceso de dejar de fumar mejorará significativamente tus resultados.");
        } else if (selectedValue === "yes_willing") {
          recommendations.push("💪 Tu disposición a dejar de fumar es muy positiva. Te ayudaremos con recursos para lograrlo.");
        } else if (selectedValue === "no") {
          recommendations.push("🤝 Entendemos que es difícil. Aún podemos trabajar contigo para minimizar los riesgos.");
        }
        break;

      case 2: // Diabetes - usando valores correctos y cambiando a glicemia
        if (selectedValue === "controlled") {
          personalFactors.push("diabetes controlada");
          recommendations.push("👨‍⚕️ Tu diabetes controlada es una gran fortaleza. Mantén niveles de glicemia estables (menor a 180 mg/dL) y coordina con tu médico durante todo el proceso.");
        } else if (selectedValue === "uncontrolled") {
          personalFactors.push("diabetes no controlada");
          recommendations.push("⚠️ Es fundamental estabilizar tu diabetes antes del implante. Trabaja con tu médico para optimizar el control de glicemia - esto será clave para tu éxito.");
        } else if (selectedValue === "no") {
          recommendations.push("✅ Sin diabetes, tu proceso de cicatrización será más predecible y exitoso.");
        }
        break;

      case 3: // Bruxismo - usando valores correctos
        if (selectedValue === "treated") {
          personalFactors.push("bruxismo controlado");
          recommendations.push("😴 ¡Perfecto! Ya usas placa de protección. Continúa con este hábito durante y después del tratamiento para proteger tu inversión.");
        } else if (selectedValue === "untreated") {
          personalFactors.push("bruxismo no tratado");
          recommendations.push("🦷 El bruxismo puede afectar la longevidad de tu implante. Te recomendamos una férula de descarga nocturna - es una inversión pequeña que protegerá tu implante por décadas.");
        } else if (selectedValue === "no") {
          recommendations.push("😌 Sin bruxismo, tu implante tendrá una vida útil óptima sin fuerzas destructivas.");
        }
        break;

      case 4: // Tiempo de pérdida dental - CORREGIDO para ser más preciso
        if (selectedValue === "recent") {
          recommendations.push("⚡ ¡Timing perfecto! Al haber perdido el diente recientemente, tu hueso está en excelentes condiciones para recibir el implante.");
        } else if (selectedValue === "medium") {
          recommendations.push("👍 Buen momento para actuar. Tu hueso aún mantiene buena calidad y cantidad para un tratamiento exitoso.");
        } else if (selectedValue === "old") {
          personalFactors.push("pérdida dental antigua");
          recommendations.push("🔍 Aunque ha pasado tiempo, cada caso es único. Un solo diente perdido hace años puede conservar suficiente hueso para colocar el implante sin injerto. La evaluación radiográfica determinará si necesitas regeneración ósea o si tu hueso actual es suficiente.");
        }
        break;

      case 5: // Cantidad de dientes - usando valores correctos
        if (selectedValue === "one") {
          recommendations.push("🎯 Un implante individual es el tratamiento más predecible y conservador. Excelente opción para mantener tus dientes naturales intactos.");
        } else if (selectedValue === "several") {
          recommendations.push("🔧 Para 2-3 dientes, podemos considerar implantes individuales o un puente sobre implantes, según tu anatomía específica.");
        } else if (selectedValue === "all") {
          recommendations.push("🚀 Para múltiples dientes, técnicas como All-on-4 o All-on-6 pueden ofrecerte una solución completa y eficiente en menor tiempo.");
        }
        break;

      case 6: // Dientes específicos
        try {
          if (answer.selectedValues && answer.selectedValues.length > 0) {
            const teethCount = answer.selectedValues.length;
            recommendations.push(`🦷 Has seleccionado ${teethCount} diente${teethCount !== 1 ? 's' : ''} específico${teethCount !== 1 ? 's' : ''}. Esto nos permite crear un plan de tratamiento preciso considerando la oclusión y el pronóstico individual de cada zona.`);
          }
        } catch (error) {
          console.warn('Error processing teeth data:', error);
        }
        break;

      case 7: // Condiciones actuales
        if (selectedValue === "none") {
          recommendations.push("✅ Excelente salud bucal actual. Esto favorece mucho el pronóstico de tus implantes.");
        } else {
          recommendations.push("⚠️ Es importante tratar las condiciones bucales actuales antes del implante para crear un ambiente favorable.");
        }
        break;

      case 8: // Causa de pérdida dental - usando valores correctos
        if (selectedValue === "trauma") {
          recommendations.push("💥 La pérdida por trauma tiene buen pronóstico ya que el hueso circundante suele estar sano.");
        } else if (selectedValue === "cavities") {
          recommendations.push("🦷 La pérdida por caries requiere verificar que no haya infección residual antes del implante.");
        } else if (selectedValue === "periodontitis") {
          recommendations.push("🔍 La pérdida por periodontitis requiere un protocolo especial de mantenimiento para prevenir problemas futuros.");
        }
        break;

      case 9: // Higiene oral - usando valores correctos
        if (selectedValue === "complete") {
          recommendations.push("🪥 ¡Excelente higiene! Esto es el factor más importante para el éxito a largo plazo de los implantes.");
        } else if (selectedValue === "multiple") {
          recommendations.push("👍 Buena base de higiene. Te ayudaremos a optimizarla con técnicas específicas para implantes.");
        } else if (selectedValue === "once") {
          recommendations.push("📈 Mejorar tu rutina de higiene será fundamental para el éxito del implante. Es más fácil de lo que piensas.");
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

  // Disclaimer médico al final
  recommendations.push("⚠️ Recuerda: Esta evaluación es orientativa y no sustituye el diagnóstico profesional. Siempre consulta con un dentista especialista para una evaluación completa.");

  // Eliminar duplicados y limitar recomendaciones
  const uniqueRecommendations = [...new Set(recommendations)];
  console.log("DEBUG - Recomendaciones finales:", uniqueRecommendations);
  
  return uniqueRecommendations.slice(0, 8);
};
