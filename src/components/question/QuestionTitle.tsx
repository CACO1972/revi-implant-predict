
import React from "react";
import { motion } from "framer-motion";

interface QuestionTitleProps {
  questionNumber: number;
  totalQuestions: number;
  title: string;
  explanation: string;
}

export default function QuestionTitle({ questionNumber, totalQuestions, title, explanation }: QuestionTitleProps) {
  return (
    <div className="text-center space-y-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-primary text-sm font-medium"
      >
        Pregunta {questionNumber} de {totalQuestions}
      </motion.div>

      {/* Título de la pregunta */}
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-xl font-bold text-white"
      >
        {title}
      </motion.h2>

      {/* Explicación */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-white/70 text-sm max-w-sm mx-auto"
      >
        {explanation}
      </motion.p>
    </div>
  );
}
