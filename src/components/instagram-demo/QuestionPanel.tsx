
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Question } from "@/types/implant";

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

  return (
    <motion.div
      key={`question-${currentStep}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel p-6"
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
      
      <Button
        onClick={handleNext}
        disabled={!hasSelectedAnswer}
        className="w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white py-3 rounded-xl shadow-glow transition-all duration-300"
      >
        Siguiente
      </Button>
    </motion.div>
  );
}
