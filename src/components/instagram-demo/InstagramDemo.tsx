
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Question, AssessmentResult, Answer } from "@/types/implant";
import WelcomePanel from "./WelcomePanel";
import QuestionPanel from "./QuestionPanel";
import CompletedPanel from "./CompletedPanel";
import AppLogo from "./AppLogo";
import AnimatedStarryBackground from "../AnimatedStarryBackground";
import { demoQuestions } from "@/data/demoQuestions";
import BluAssistant from "./BluAssistant";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";

export default function InstagramDemo() {
  const [name, setName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showBluAssistant, setShowBluAssistant] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Steps: 0 = welcome, 1-N = questions, N+1 = completed
  const totalQuestions = demoQuestions.length;
  const isWelcomeStep = currentStep === 0;
  const isCompleted = currentStep === totalQuestions + 1;
  
  // Determine logo size based on current step
  const logoSize = isWelcomeStep || isCompleted ? "large" : "small";
  
  const handleStart = () => {
    setCurrentStep(1);
    setShowBluAssistant(true);
  };

  const handleSelectAnswer = (questionId: number, value: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === totalQuestions) {
      // Calculamos los resultados antes de mostrar la pantalla final
      const answers: Answer[] = Object.entries(selectedAnswers).map(([questionId, value]) => {
        return {
          questionId: parseInt(questionId),
          selectedValues: [value],
          score: parseInt(value) || 0 // Simplificación, normalmente usaríamos getScoreFromOptions
        };
      });
      
      const totalScore = calculateScore(answers);
      const result = evaluateResult(totalScore);
      setAssessmentResult(result);
      
      setCurrentStep(currentStep + 1);
      setShowBluAssistant(false);
    }
  };

  // Get the current question based on the current step
  const currentQuestion: Question = demoQuestions[currentStep - 1];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      <AppLogo size={logoSize} />

      <div className="w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {isWelcomeStep && (
            <WelcomePanel 
              name={name} 
              setName={setName} 
              handleStart={handleStart} 
            />
          )}

          {!isWelcomeStep && !isCompleted && currentQuestion && (
            <QuestionPanel 
              currentQuestion={currentQuestion}
              currentStep={currentStep}
              totalQuestions={totalQuestions}
              selectedAnswers={selectedAnswers}
              handleSelectAnswer={handleSelectAnswer}
              handleNext={handleNext}
            />
          )}

          {isCompleted && (
            <CompletedPanel 
              name={name} 
              result={assessmentResult} 
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Blu Assistant en pantalla de bienvenida pero oculto hasta comenzar */}
      {isWelcomeStep && (
        <BluAssistant 
          isVisible={false} 
          message="¡Hola! Soy Blu, tu asistente virtual. Estoy aquí para guiarte en tu evaluación de implantes dentales."
        />
      )}
    </div>
  );
}
