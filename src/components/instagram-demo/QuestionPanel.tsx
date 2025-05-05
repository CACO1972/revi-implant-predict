
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Question } from "@/types/implant";
import ReviAssistant from "./ReviAssistant";

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
      <div className="mb-4">
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-gold h-2 rounded-full"
            style={{ width: `${(currentStep / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <p className="text-white/60 text-xs mt-1 text-right">
          {currentStep} de {totalQuestions}
        </p>
      </div>
      
      <h2 className="text-lg font-bold text-gold mb-4">
        {currentQuestion.title}
      </h2>
      
      <p className="text-white/70 text-sm mb-6">
        {currentQuestion.explanation}
      </p>
      
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option) => (
          <motion.button
            key={option.value.toString()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectAnswer(currentQuestion.id, option.value.toString())}
            className={`w-full p-3 rounded-lg text-left transition-colors ${
              selectedAnswers[currentQuestion.id] === option.value.toString()
                ? "bg-gold/20 border border-gold/50"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            <span className="text-white/90">{option.label}</span>
          </motion.button>
        ))}
      </div>
      
      <div className="pb-16">
        <Button
          onClick={handleNext}
          disabled={!hasSelectedAnswer}
          className="w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white py-3 rounded-xl shadow-glow transition-all duration-300"
        >
          Siguiente
        </Button>
      </div>
      
      {/* Blu Assistant - Con espacio adicional para evitar superposiciones */}
      <ReviAssistant isVisible={true} message={reviMessage} />
    </motion.div>
  );
}
