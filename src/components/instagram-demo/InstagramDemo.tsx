
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Question, AssessmentResult, Answer } from "@/types/implant";
import QuestionPanel from "./QuestionPanel";
import CompletedPanel from "./CompletedPanel";
import AppLogo from "./AppLogo";
import AnimatedStarryBackground from "../AnimatedStarryBackground";
import { demoQuestions } from "@/data/demoQuestions";
import BluAssistant from "./BluAssistant";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";

export default function InstagramDemo() {
  // Empezamos directamente en step 1 (primera pregunta) eliminando la bienvenida
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showBluAssistant, setShowBluAssistant] = useState(true);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const totalQuestions = demoQuestions.length;
  const isCompleted = currentStep === totalQuestions + 1;
  
  // Logo siempre pequeño ya que no hay pantalla de bienvenida
  const logoSize = "small";

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
          score: parseInt(value) || 0
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-[#0A1828]">
      <AnimatedStarryBackground />
      
      <AppLogo size={logoSize} />

      <div className="w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {!isCompleted && currentQuestion && (
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
              name="Usuario" 
              result={assessmentResult} 
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Blu Assistant menos intrusivo */}
      {showBluAssistant && currentQuestion && (
        <BluAssistant 
          isVisible={true} 
          message={`Pregunta ${currentStep} de ${totalQuestions}. Responde con sinceridad para obtener el mejor resultado.`}
        />
      )}
    </div>
  );
}
