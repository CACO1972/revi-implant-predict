
import { Answer, QuestionOption } from "@/types/implant";
import { questions } from "@/data/questions";

export const calculateScore = (answers: Answer[]): number => {
  console.log("DEBUG - Calculando puntuación total para respuestas:", answers);
  
  const totalScore = answers.reduce((total, answer) => {
    console.log(`DEBUG - Pregunta ${answer.questionId}: score ${answer.score}, acumulado: ${total + answer.score}`);
    return total + answer.score;
  }, 0);
  
  console.log("DEBUG - Puntuación total final:", totalScore);
  return totalScore;
};

export const getScoreFromOptions = (
  questionId: number, 
  selectedValues: (string | number)[]
): number => {
  console.log(`DEBUG - Calculando score para pregunta ${questionId} con valores:`, selectedValues);
  
  const question = questions.find(q => q.id === questionId);
  if (!question) {
    console.warn(`DEBUG - Pregunta ${questionId} no encontrada`);
    return 0;
  }
  
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
      
      console.log("DEBUG - Dientes procesados para scoring:", teeth);
      
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
      
      const finalScore = Math.min(score, 2); // Cap máximo de 2 puntos
      console.log("DEBUG - Score final para pregunta 6:", finalScore);
      return finalScore;
    } catch (error) {
      console.error('Error calculating dental score:', error);
      const fallbackScore = selectedValues.length > 3 ? 2 : selectedValues.length > 1 ? 1 : 0.5;
      console.log("DEBUG - Score fallback para pregunta 6:", fallbackScore);
      return fallbackScore;
    }
  }
  
  if (question.multiSelect) {
    // Para pregunta 7 (condiciones actuales)
    if (questionId === 7) {
      // Si seleccionó "Ninguna", score es 0
      if (selectedValues.includes("none")) {
        console.log("DEBUG - Pregunta 7: seleccionó 'none', score = 0");
        return 0;
      }
      
      // Calcula puntuación basada en número de síntomas
      const symptomsCount = selectedValues.length;
      const score = symptomsCount <= 2 ? 1 : 2;
      console.log(`DEBUG - Pregunta 7: ${symptomsCount} síntomas, score = ${score}`);
      return score;
    }
    
    // Para otras preguntas multiselección
    const score = question.options
      .filter(option => selectedValues.includes(option.value))
      .reduce((total, option) => total + option.score, 0);
    console.log(`DEBUG - Pregunta ${questionId} (multiselect): score = ${score}`);
    return score;
  } else {
    // Para preguntas de selección única
    const selectedOption = question.options.find(
      option => selectedValues.includes(option.value)
    );
    const score = selectedOption ? selectedOption.score : 0;
    console.log(`DEBUG - Pregunta ${questionId} (single): opción '${selectedValues[0]}', score = ${score}`);
    return score;
  }
};
