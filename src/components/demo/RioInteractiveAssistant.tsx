
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Lightbulb, ThumbsUp, AlertTriangle, Sparkles } from "lucide-react";

interface RioInteractiveAssistantProps {
  questionId: number;
  selectedAnswer: string;
  compact?: boolean;
}

const rioMessages = {
  1: {
    default: "💨 El tabaco afecta la cicatrización de implantes",
    answers: {
      never: "🎉 ¡Perfecto! Sin tabaco = mejor cicatrización",
      quit_old: "👍 ¡Genial! Tu cuerpo ya se recuperó",
      quit_recent: "⚡ Buen momento para implantes",
      occasional: "⚠️ Considera reducir más antes del implante",
      regular: "🚨 Importante: dejar de fumar mejora el éxito 2x"
    }
  },
  2: {
    default: "🩺 La diabetes controlada permite buenos resultados",
    answers: {
      no: "✅ Sin diabetes = proceso más simple",
      controlled: "👨‍⚕️ Con control médico, excelentes resultados",
      uncontrolled: "⚠️ Controlar glucemia antes del implante es clave"
    }
  },
  3: {
    default: "⏰ El tiempo sin dientes afecta el hueso disponible",
    answers: {
      recent: "🏃‍♂️ ¡Perfecto timing! Hueso aún en buenas condiciones",
      medium: "⚡ Buen momento, hueso todavía favorable",
      long: "🔧 Podríamos necesitar regeneración ósea",
      very_long: "🏗️ Evaluaremos opciones de reconstrucción"
    }
  },
  4: {
    default: "🦷 La cantidad determina la estrategia de tratamiento",
    answers: {
      one: "🎯 Caso ideal: 1 implante, 1 corona",
      few: "🔧 Implantes individuales o puente sobre implantes",
      several: "🏗️ Prótesis parcial sobre implantes",
      many: "🚀 All-on-4 o All-on-6 podrían ser ideales"
    }
  },
  5: {
    default: "🪥 La higiene es clave para el éxito a largo plazo",
    answers: {
      excellent: "⭐ ¡Perfecto! Tus implantes durarán décadas",
      good: "👍 Con ligeras mejoras, resultados excelentes",
      fair: "📚 Te enseñaremos técnicas específicas",
      poor: "🎯 Mejorar higiene = factor crítico de éxito"
    }
  },
  999: {
    default: "🎉 ¡Evaluación completa! Tu plan personalizado está listo",
    answers: {}
  }
};

export default function RioInteractiveAssistant({ questionId, selectedAnswer, compact = false }: RioInteractiveAssistantProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState("");
  const [mood, setMood] = useState<"happy" | "thinking" | "concerned" | "excited">("thinking");

  useEffect(() => {
    const questionData = rioMessages[questionId as keyof typeof rioMessages];
    if (!questionData) return;

    if (selectedAnswer && questionData.answers[selectedAnswer as keyof typeof questionData.answers]) {
      setCurrentMessage(questionData.answers[selectedAnswer as keyof typeof questionData.answers]);
      // Set mood based on answer
      if (selectedAnswer.includes("never") || selectedAnswer.includes("excellent") || selectedAnswer.includes("no")) {
        setMood("excited");
      } else if (selectedAnswer.includes("poor") || selectedAnswer.includes("uncontrolled") || selectedAnswer.includes("regular")) {
        setMood("concerned");
      } else {
        setMood("happy");
      }
    } else {
      setCurrentMessage(questionData.default);
      setMood("thinking");
    }
  }, [questionId, selectedAnswer]);

  const getMoodIcon = () => {
    switch (mood) {
      case "excited": return "🤩";
      case "happy": return "😊";
      case "concerned": return "🤔";
      case "thinking": return "💭";
      default: return "😊";
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case "excited": return "from-green-500/20 to-[#178582]/20";
      case "happy": return "from-[#178582]/20 to-[#BFA181]/20";
      case "concerned": return "from-orange-500/20 to-red-500/20";
      case "thinking": return "from-blue-500/20 to-[#178582]/20";
      default: return "from-[#178582]/20 to-[#BFA181]/20";
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className={`relative ${compact ? 'mt-4' : 'mt-6'}`}
      >
        {/* Rio Avatar */}
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: mood === "excited" ? [0, 5, -5, 0] : [0, 2, -2, 0]
          }}
          transition={{ 
            duration: mood === "excited" ? 1.5 : 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute -left-2 -top-2 z-10"
        >
          <div className={`w-${compact ? '10' : '12'} h-${compact ? '10' : '12'} rounded-full bg-gradient-to-br from-[#178582] to-[#178582]/70 p-1 shadow-lg`}>
            <div className="w-full h-full rounded-full bg-[#178582] flex items-center justify-center text-lg">
              {getMoodIcon()}
            </div>
          </div>
          
          {/* Mood indicator */}
          {mood === "excited" && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-[#BFA181]" />
            </motion.div>
          )}
        </motion.div>

        {/* Message Bubble */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`ml-8 p-${compact ? '3' : '4'} bg-gradient-to-r ${getMoodColor()} rounded-xl rounded-tl-none border border-[#178582]/30 relative`}
        >
          {/* Bubble arrow */}
          <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-[#178582]/30"></div>
          
          <div className="flex items-start gap-2">
            <MessageCircle className={`w-${compact ? '3' : '4'} h-${compact ? '3' : '4'} text-[#178582] mt-0.5 flex-shrink-0`} />
            <div>
              <p className={`text-${compact ? 'xs' : 'sm'} text-[#178582] font-medium mb-1`}>Río:</p>
              <motion.p 
                key={currentMessage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-${compact ? 'xs' : 'sm'} text-white/90 leading-relaxed`}
              >
                {currentMessage}
              </motion.p>
            </div>
          </div>

          {/* Floating elements for excited mood */}
          {mood === "excited" && !compact && (
            <>
              <motion.div
                animate={{ 
                  y: [0, -10, 0], 
                  opacity: [0.6, 1, 0.6],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-2 right-2"
              >
                <Sparkles className="w-3 h-3 text-[#BFA181]" />
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -8, 0], 
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, -180, -360]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-2 right-4"
              >
                <Sparkles className="w-2 h-2 text-[#178582]" />
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
