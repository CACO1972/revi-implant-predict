
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
      1: "El tabaco reduce el flujo sanguíneo y afecta la cicatrización. Los fumadores tienen 2-3 veces más riesgo de fracaso en implantes.",
      2: "La diabetes bien controlada (HbA1c <7%) no es impedimento para un implante, pero requiere monitoreo especial.",
      3: "El bruxismo puede sobrecargar los implantes con fuerzas hasta 6 veces mayores que la masticación normal.",
      4: "Idealmente, un implante debería colocarse 3-6 meses después de perder el diente para minimizar la pérdida ósea.",
      5: "El número de dientes a reemplazar determina la cantidad de implantes y el tipo de prótesis más adecuado para tu caso.",
      6: "La mandíbula anterior tiene el hueso más denso, mientras que el maxilar posterior suele tener la menor densidad ósea.",
      7: "Es crucial tratar estas condiciones antes de colocar implantes para crear un ambiente oral favorable.",
      8: "Si perdiste dientes por enfermedad periodontal, necesitarás un protocolo de mantenimiento más estricto tras los implantes.",
      9: "La principal causa de fracaso a largo plazo de los implantes es la periimplantitis, relacionada directamente con la higiene.",
      10: "Tu motivación nos ayuda a personalizar el tratamiento hacia tus necesidades específicas, ya sean funcionales o estéticas.",
      11: "Todas tus preocupaciones pueden abordarse con las técnicas modernas disponibles hoy en día."
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
