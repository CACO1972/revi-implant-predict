
import { useState, useEffect } from "react";
import { PatientInfo, Question, Answer } from "@/types/implant";
import { questions } from "@/data/questions";
import { calculateScore, evaluateResult, getPersonalizedRecommendations } from "@/utils/assessmentUtils";

export const useAssessmentFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: "", age: null });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAIResults, setShowAIResults] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [showRio, setShowRio] = useState(true);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [showBreak, setShowBreak] = useState(false);

  // Función para determinar qué preguntas mostrar basado en las respuestas
  const updateAvailableQuestions = (currentAnswers: Answer[]) => {
    let questionsToShow = questions.filter(q => !q.isConditional);
    
    // Revisar si se deben mostrar preguntas condicionales
    questions.filter(q => q.isConditional).forEach(conditionalQ => {
      if (conditionalQ.showWhenQuestionHasValues) {
        const { questionId, values } = conditionalQ.showWhenQuestionHasValues;
        const relevantAnswer = currentAnswers.find(a => a.questionId === questionId);
        
        if (relevantAnswer && relevantAnswer.selectedValues.some(val => values.includes(val))) {
          questionsToShow.push(conditionalQ);
        }
      }
    });
    
    // Ordenar por ID
    questionsToShow.sort((a, b) => a.id - b.id);
    setAvailableQuestions(questionsToShow);
  };

  useEffect(() => {
    updateAvailableQuestions(answers);
  }, [answers]);

  const handleProcessingComplete = () => {
    const totalScore = calculateScore(answers);
    const result = evaluateResult(totalScore);
    
    const personalizedRecommendations = getPersonalizedRecommendations(patientInfo, answers, result);
    
    const finalResult = {
      ...result,
      recommendations: personalizedRecommendations
    };
    
    setAssessmentResult(finalResult);
    setIsProcessing(false);
    setShowAIResults(true);
  };

  const handleRestart = () => {
    sessionStorage.removeItem('patientInfo');
    sessionStorage.removeItem('answers');
    setCurrentStep(0);
    setAnswers([]);
    setPatientInfo({ name: "", age: null });
    setIsProcessing(false);
    setIsCompleted(false);
    setAssessmentResult(null);
    setShowRio(true);
    setAvailableQuestions([]);
    setShowBreak(false);
  };

  return {
    currentStep,
    setCurrentStep,
    patientInfo,
    setPatientInfo,
    answers,
    setAnswers,
    isProcessing,
    setIsProcessing,
    showAIResults,
    setShowAIResults,
    isCompleted,
    setIsCompleted,
    assessmentResult,
    setAssessmentResult,
    showRio,
    setShowRio,
    availableQuestions,
    setAvailableQuestions,
    showBreak,
    setShowBreak,
    updateAvailableQuestions,
    handleProcessingComplete,
    handleRestart
  };
};
