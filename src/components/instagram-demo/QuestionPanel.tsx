
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Question } from "@/types/implant";
import BluAssistant from "./BluAssistant";
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
  const [bluMessage, setBluMessage] = useState<string>("");
  
  // Efecto para sincronizar los mensajes de Blu con la pregunta actual
  useEffect(() => {
    // Mensajes personalizados de Blu para cada pregunta
    const messages = {
      1: "¡Hola! Soy Blu. Puedes hacer clic en mi avatar si necesitas ayuda durante la evaluación.",
      2: "El consumo de tabaco puede afectar la cicatrización. ¡Sé honesto!",
      3: "La diabetes bien controlada no es impedimento para un implante.",
      4: "El bruxismo puede sobreesforzar los implantes. ¿Lo padeces?",
      5: "Mientras menos tiempo haya pasado desde que perdiste el diente, mejor.",
      6: "La cantidad de dientes afecta el tipo de tratamiento a realizar.",
      7: "Cada zona de la boca tiene diferente calidad ósea y accesibilidad.",
      8: "Es importante tratar estas condiciones antes de colocar implantes.",
      9: "Conocer la causa de la pérdida dental nos ayuda a prevenir problemas.",
      10: "¡La higiene es crucial para el mantenimiento de tus implantes!",
      11: "Tu motivación es importante para el proceso."
    };
    
    // Acceder directamente al mensaje por ID para garantizar sincronización
    setBluMessage(messages[currentQuestion.id as keyof typeof messages] || "Haz clic en mi avatar si necesitas ayuda.");
  }, [currentQuestion.id]); 

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
      
      {/* Blu Assistant - Ahora más pequeño y en la esquina inferior izquierda */}
      <BluAssistant isVisible={true} message={bluMessage} />
    </motion.div>
  );
}
