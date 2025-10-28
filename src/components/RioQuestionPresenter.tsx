
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
  1: Cigarette,
  2: Heart,
  3: Moon,
  4: Clock,
  5: Smile,
  6: MapPin,
  7: Shield,
  8: AlertTriangle,
  9: Sparkles
};

const getRioMessages = (patientName: string = "paciente") => {
  // Extraer solo el primer nombre
  const firstName = patientName.split(' ')[0];
  
  return {
    1: `${firstName}, ¿fumas o has fumado?`,
    1.5: `${firstName}, ¿estarías dispuesto/a a dejar de fumar?`,
    2: `${firstName}, ¿tienes diabetes?`,
    3: `${firstName}, ¿rechinas los dientes por la noche?`,
    4: `${firstName}, ¿cuánto tiempo llevas sin estos dientes?`,
    5: `${firstName}, ¿cuántos dientes necesitas reemplazar?`,
    6: `${firstName}, selecciona exactamente qué dientes te faltan`,
    7: `${firstName}, ¿tienes alguna condición bucal actual?`,
    8: `${firstName}, ¿cómo perdiste estos dientes?`,
    9: `${firstName}, ¿cómo calificas tu higiene dental?`
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
