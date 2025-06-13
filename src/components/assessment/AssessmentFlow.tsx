
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { PatientInfo, Question, Answer } from "@/types/implant";
import { questions } from "@/data/questions";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import { calculateScore, evaluateResult, getPersonalizedRecommendations } from "@/utils/assessmentUtils";
import AdvancedAIProcessor from "@/components/ai/AdvancedAIProcessor";
import IntelligentResultsDisplay from "@/components/ai/IntelligentResultsDisplay";
import PatientInfoForm from "./PatientInfoForm";
import AssessmentResults from "./AssessmentResults";
import InteractiveBreak from "./InteractiveBreak";
import RioAssistant from "@/components/RioAssistant";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";

export default function AssessmentFlow() {
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

  // 0 = patient info, 1-N = questions, break = descanso, processing, completed
  const totalSteps = availableQuestions.length + 1; // +1 for patient info
  const currentQuestion = currentStep > 0 && currentStep <= availableQuestions.length ? availableQuestions[currentStep - 1] : null;

  const handlePatientInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientInfo.name.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu nombre",
        variant: "destructive"
      });
      return;
    }
    if (!patientInfo.age || patientInfo.age < 18 || patientInfo.age > 99) {
      toast({
        title: "Error", 
        description: "Por favor ingresa una edad válida (18-99 años)",
        variant: "destructive"
      });
      return;
    }
    
    sessionStorage.setItem('patientInfo', JSON.stringify(patientInfo));
    setCurrentStep(1);
  };

  const handleAnswerSubmit = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    sessionStorage.setItem('answers', JSON.stringify(newAnswers));
    
    // Actualizar preguntas disponibles con las nuevas respuestas
    updateAvailableQuestions(newAnswers);
    
    // Mostrar descanso entretenido en la mitad del cuestionario
    const midPoint = Math.ceil(availableQuestions.length / 2);
    if (currentStep === midPoint && !showBreak) {
      setShowBreak(true);
      setShowRio(false);
      return;
    }
    
    if (currentStep < availableQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Verificar si hay nuevas preguntas condicionales que mostrar
      setTimeout(() => {
        if (currentStep < availableQuestions.length) {
          setCurrentStep(currentStep + 1);
        } else {
          // Iniciar procesamiento con IA
          setIsProcessing(true);
          setShowRio(false);
        }
      }, 100);
    }
  };

  const handleBreakContinue = () => {
    setShowBreak(false);
    setShowRio(true);
    setCurrentStep(currentStep + 1);
  };

  const handleProcessingComplete = () => {
    // Generate results after AI processing
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

  const handleAIResultsComplete = () => {
    setShowAIResults(false);
    setIsCompleted(true);
  };

  const handleNext = () => {
    if (currentStep < availableQuestions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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

  // Show interactive break
  if (showBreak) {
    return (
      <InteractiveBreak
        patientName={patientInfo.name}
        onContinue={handleBreakContinue}
      />
    );
  }

  // Show advanced AI processing screen
  if (isProcessing) {
    return (
      <AdvancedAIProcessor
        patientName={patientInfo.name}
        answers={answers}
        onComplete={handleProcessingComplete}
      />
    );
  }

  // Show intelligent AI results display
  if (showAIResults && assessmentResult) {
    return (
      <IntelligentResultsDisplay
        result={assessmentResult}
        patientName={patientInfo.name}
        onContinue={handleAIResultsComplete}
      />
    );
  }

  // Mostrar resultados finales
  if (isCompleted && assessmentResult) {
    return (
      <AssessmentResults
        patientInfo={patientInfo}
        assessmentResult={assessmentResult}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      {/* Logo pequeño */}
      <div className="mb-6">
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantX Logo"
          className="h-16 w-auto"
        />
      </div>
      
      <ProgressBar progress={(currentStep / totalSteps) * 100} />
      
      <AnimatePresence mode="wait">
        {currentStep === 0 ? (
          <PatientInfoForm
            patientInfo={patientInfo}
            setPatientInfo={setPatientInfo}
            onSubmit={handlePatientInfoSubmit}
          />
        ) : currentQuestion ? (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswerSubmit}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentStep === 1}
            isLast={currentStep === availableQuestions.length}
            currentAnswer={answers.find(a => a.questionId === currentQuestion.id)}
            patientName={patientInfo.name}
          />
        ) : null}
      </AnimatePresence>
      
      {showRio && (
        <RioAssistant 
          isVisible={true} 
          message={
            currentStep === 0 
              ? `¡Hola! Soy Río, tu asistente virtual. Vamos a hacer una evaluación personalizada para saber si eres candidato a implantes dentales.`
              : currentQuestion
              ? currentStep === 1 
                ? `${patientInfo.name}, comenzamos con la evaluación. Recuerda responder con total sinceridad para obtener el mejor resultado.`
                : `Pregunta ${currentStep} de ${availableQuestions.length}. Tómate tu tiempo para responder con sinceridad.`
              : "¡Genial! Hemos terminado la evaluación."
          }
          onDismiss={() => setShowRio(false)}
        />
      )}
      
      <Toaster />
    </div>
  );
}
