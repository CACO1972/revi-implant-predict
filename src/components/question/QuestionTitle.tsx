
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
      {/* Número de pregunta con indicador de demo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-[#BFA181] text-sm font-medium space-y-1"
      >
        <div>Pregunta {questionNumber} de {totalQuestions}</div>
        <div className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
          📱 Demo versión Beta
        </div>
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
