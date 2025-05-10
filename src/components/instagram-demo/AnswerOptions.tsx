
import React from "react";
import { motion } from "framer-motion";
import { Question } from "@/types/implant";

interface AnswerOptionsProps {
  currentQuestion: Question;
  selectedAnswer: string | undefined;
  handleSelectAnswer: (questionId: number, value: string) => void;
}

export default function AnswerOptions({
  currentQuestion,
  selectedAnswer,
  handleSelectAnswer,
}: AnswerOptionsProps) {
  return (
    <div className="space-y-3 mb-6">
      {currentQuestion.options.map((option) => (
        <motion.button
          key={option.value.toString()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelectAnswer(currentQuestion.id, option.value.toString())}
          className={`w-full p-3 rounded-lg text-left transition-colors ${
            selectedAnswer === option.value.toString()
              ? "bg-gold/20 border border-gold/50"
              : "bg-white/5 border border-white/10 hover:bg-white/10"
          }`}
        >
          <span className="text-white/90">{option.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
