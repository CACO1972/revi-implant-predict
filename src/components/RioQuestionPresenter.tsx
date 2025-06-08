
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

const rioMessages = {
  1: "Necesito preguntarte sobre el tabaco. Es muy importante para tu tratamiento...",
  2: "¿Tienes diabetes? No te preocupes, podemos trabajar con eso...",
  3: "¿Rechinas los dientes por la noche? Es más común de lo que piensas...",
  4: "El tiempo sin dientes es crucial. Cuéntame cuándo los perdiste...",
  5: "¿Cuántos dientes necesitamos reemplazar? Esto define tu plan..."
};

export default function RioQuestionPresenter({ question, questionNumber, totalQuestions }: RioQuestionPresenterProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const IconComponent = questionIcons[question.id as keyof typeof questionIcons];
  const message = rioMessages[question.id as keyof typeof rioMessages];

  useEffect(() => {
    // Secuencia de animaciones
    const timer1 = setTimeout(() => setShowMessage(true), 500);
    const timer2 = setTimeout(() => setShowQuestion(true), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [question.id]);

  return (
    <div className="space-y-6">
      {/* Río presentando la pregunta */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="relative"
          >
            {/* Avatar de Río más grande - Color azul como Blu */}
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 3, -3, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="mx-auto w-20 h-20 mb-4"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-2 shadow-glow relative">
                <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="#3B82F6" />
                    <path d="M 30 30 Q 50 10 70 30" stroke="#60A5FA" strokeWidth="8" fill="none" />
                    <circle cx="35" cy="45" r="6" fill="white" />
                    <circle cx="65" cy="45" r="6" fill="white" />
                    <circle cx="35" cy="45" r="3" fill="#1E3A8A" />
                    <circle cx="65" cy="45" r="3" fill="#1E3A8A" />
                    <path d="M 43 60 Q 50 70 57 60" stroke="#F59E0B" strokeWidth="3" fill="none" />
                  </svg>
                </div>
                
                {/* Efectos de brillo */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Burbuja de mensaje de Río */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-xl p-4 border border-blue-500/30 mx-auto max-w-sm"
            >
              {/* Flecha que apunta hacia Río */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-blue-500/30"></div>
              
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-blue-400 font-medium mb-1">Río dice:</p>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-white/90 leading-relaxed"
                  >
                    {message}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icono y pregunta */}
      <AnimatePresence>
        {showQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-4"
          >
            {/* Icono grande de la pregunta */}
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
                className="mx-auto w-16 h-16 bg-gradient-to-br from-[#BFA181]/20 to-blue-500/20 rounded-full flex items-center justify-center border border-[#BFA181]/30"
              >
                <IconComponent className="w-8 h-8 text-[#BFA181]" />
              </motion.div>
            )}

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
              {question.title}
            </motion.h2>

            {/* Explicación */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-white/70 text-sm max-w-sm mx-auto"
            >
              {question.explanation}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
