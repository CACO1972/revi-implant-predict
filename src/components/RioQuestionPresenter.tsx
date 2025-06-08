
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/types/implant";
import { 
  Cigarette, 
  Heart, 
  Moon, 
  Clock, 
  Smile,
  Sparkles,
  MessageCircle
} from "lucide-react";

interface RioQuestionPresenterProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

const questionIcons = {
  1: Cigarette,
  2: Heart,
  3: Moon,
  4: Clock,
  5: Smile
};

export default function RioQuestionPresenter({ question, questionNumber, totalQuestions }: RioQuestionPresenterProps) {
  const [showQuestion, setShowQuestion] = useState(false);
  const IconComponent = questionIcons[question.id as keyof typeof questionIcons];

  useEffect(() => {
    // Mostrar la pregunta inmediatamente
    const timer = setTimeout(() => setShowQuestion(true), 300);
    return () => clearTimeout(timer);
  }, [question.id]);

  return (
    <div className="space-y-6">
      {/* Pregunta principal - Sin Río grande */}
      <AnimatePresence>
        {showQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            {/* Icono de la pregunta */}
            {IconComponent && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: 0.2 
                }}
                className="mx-auto w-16 h-16 bg-gradient-to-br from-[#BFA181]/20 to-[#178582]/20 rounded-full flex items-center justify-center border border-[#BFA181]/30"
              >
                <IconComponent className="w-8 h-8 text-[#BFA181]" />
              </motion.div>
            )}

            {/* Número de pregunta */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#BFA181] text-sm font-medium space-y-1"
            >
              <div>Pregunta {questionNumber} de {totalQuestions}</div>
              <div className="text-xs text-[#178582] bg-[#178582]/10 px-2 py-1 rounded-full border border-[#178582]/20">
                📱 Demo versión Beta
              </div>
            </motion.div>

            {/* Título de la pregunta */}
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl font-bold text-white"
            >
              {question.title}
            </motion.h2>

            {/* Explicación */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/70 text-sm max-w-sm mx-auto leading-relaxed"
            >
              {question.explanation}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
