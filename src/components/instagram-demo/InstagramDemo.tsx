
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { demoQuestions } from "@/data/demoQuestions";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import AppLogo from "./AppLogo";
import WelcomePanel from "./WelcomePanel";
import QuestionPanel from "./QuestionPanel";
import CompletedPanel from "./CompletedPanel";

export default function InstagramDemo() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [name, setName] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  
  const handleNext = () => {
    if (currentStep < demoQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const handleSelectAnswer = (questionId: number, value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: value
    });
  };
  
  const handleStart = () => {
    setCurrentStep(1);
  };

  const currentQuestion = demoQuestions[currentStep - 1];
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      <div className="max-w-md w-full mx-auto z-10 relative">
        <AppLogo />
        
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <WelcomePanel 
              name={name} 
              setName={setName} 
              handleStart={handleStart} 
            />
          )}
          
          {currentStep > 0 && currentStep <= demoQuestions.length && (
            <QuestionPanel 
              currentQuestion={currentQuestion}
              currentStep={currentStep}
              totalQuestions={demoQuestions.length}
              selectedAnswers={selectedAnswers}
              handleSelectAnswer={handleSelectAnswer}
              handleNext={handleNext}
            />
          )}
          
          {completed && (
            <CompletedPanel name={name} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
