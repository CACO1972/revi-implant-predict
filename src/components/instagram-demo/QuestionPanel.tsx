
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Question } from "@/types/implant";
import ReviAssistant from "./ReviAssistant";
import ProgressBar from "./ProgressBar";
import QuestionHeader from "./QuestionHeader";
import AnswerOptions from "./AnswerOptions";
import NextButton from "./NextButton";

interface QuestionPanelProps {
  currentQuestion: Question;
  currentStep: number;
  totalQuestions: number;
  selectedAnswers: Record<number, string>;
  handleSelectAnswer: (questionId: number, value: string) => void;
  handleNext: () => void;
}

export default function QuestionPanel({
  currentQuestion,
  currentStep,
  totalQuestions,
  selectedAnswers,
  handleSelectAnswer,
  handleNext
}: QuestionPanelProps) {
  const hasSelectedAnswer = Boolean(selectedAnswers[currentQuestion.id]);
  const [reviMessage, setReviMessage] = useState<string>("");
  
  useEffect(() => {
    // Mensajes personalizados de Blu para cada pregunta
    const messages = [
      "¡Hola! Soy Blu, tu asistente. Vamos a evaluar si eres candidato para implantes.",
      "El consumo de tabaco puede afectar la cicatrización. ¡Sé honesto!",
      "La diabetes bien controlada no es impedimento para un implante.",
      "El bruxismo puede sobreesforzar los implantes. ¿Lo padeces?",
      "Mientras menos tiempo haya pasado desde que perdiste el diente, mejor.",
      "La cantidad de dientes afecta el tipo de tratamiento a realizar.",
      "Cada zona de la boca tiene diferente calidad ósea y accesibilidad.",
      "Es importante tratar estas condiciones antes de colocar implantes.",
      "Conocer la causa de la pérdida dental nos ayuda a prevenir problemas.",
      "¡La higiene es crucial para el mantenimiento de tus implantes!",
      "Tu motivación es importante para el proceso."
    ];
    
    setReviMessage(messages[currentStep - 1] || "Vamos a continuar con la evaluación");
  }, [currentStep]);

  return (
    <motion.div
      key={`question-${currentStep}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel p-6 relative z-0"
    >
      <ProgressBar currentStep={currentStep} totalSteps={totalQuestions} />
      
      <QuestionHeader question={currentQuestion} />
      
      <AnswerOptions 
        currentQuestion={currentQuestion} 
        selectedAnswer={selectedAnswers[currentQuestion.id]}
        handleSelectAnswer={handleSelectAnswer}
      />
      
      <NextButton handleNext={handleNext} disabled={!hasSelectedAnswer} />
      
      {/* Blu Assistant - Con espacio adicional para evitar superposiciones */}
      <ReviAssistant isVisible={true} message={reviMessage} />
    </motion.div>
  );
}
