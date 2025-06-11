
import { Answer, QuestionOption } from "@/types/implant";
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
