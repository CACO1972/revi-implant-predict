
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/types/implant";
import { 
  Cigarette, 
  Heart, 
  Moon, 
  Clock, 
  Smile,
  MapPin,
  Shield,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import RioAvatar from "./question/RioAvatar";
import RioMessageBubble from "./question/RioMessageBubble";
import QuestionIcon from "./question/QuestionIcon";
import QuestionTitle from "./question/QuestionTitle";
import SpecialMessage from "./question/SpecialMessage";

interface RioQuestionPresenterProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  patientName?: string;
}

const questionIcons = {
  1: Clock, // Edad
  2: Heart, // Género
  3: Moon, // Menopausia
  4: MapPin, // Dientes faltantes
  5: Shield, // Osteoporosis
  6: Cigarette, // Fumar
  7: Heart, // Diabetes
  8: AlertTriangle, // Bruxismo
  9: Sparkles // Higiene
};

const getRioMessages = (patientName: string = "paciente") => {
  // Extraer solo el primer nombre
  const firstName = patientName.split(' ')[0];
  
  return {
    1: `${firstName}, ¿cuántos años tienes?`,
    2: `${firstName}, ¿con qué género te identificas?`,
    3: `${firstName}, ¿has dejado de menstruar hace más de un año?`,
    4: `${firstName}, selecciona qué dientes te faltan`,
    5: `${firstName}, ¿te han diagnosticado osteoporosis?`,
    6: `${firstName}, ¿fumas actualmente?`,
    7: `${firstName}, ¿tienes diagnóstico de diabetes?`,
    8: `${firstName}, ¿aprietas o rechinas los dientes?`,
    9: `${firstName}, ¿con qué frecuencia te cepillas?`
  };
};

export default function RioQuestionPresenter({ question, questionNumber, totalQuestions, patientName }: RioQuestionPresenterProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const IconComponent = questionIcons[question.id as keyof typeof questionIcons];
  const rioMessages = getRioMessages(patientName || "");
  const message = rioMessages[question.id as keyof typeof rioMessages];

  useEffect(() => {
    // Reset states when question changes
    setShowMessage(false);
    setShowQuestion(false);
    
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
            <RioAvatar />
            <RioMessageBubble message={message} />
            <SpecialMessage questionNumber={questionNumber} />
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
            {IconComponent && <QuestionIcon IconComponent={IconComponent} />}
            <QuestionTitle 
              questionNumber={questionNumber}
              totalQuestions={totalQuestions}
              title={question.title}
              explanation={question.explanation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
