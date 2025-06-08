
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

interface RioInteractiveAssistantProps {
  questionId: number;
  selectedAnswer: string;
  compact?: boolean;
}

const rioMessages = {
  1: {
    default: "💨 El tabaco afecta la cicatrización",
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
      uncontrolled: "⚠️ Controlar glucemia antes del implante"
    }
  },
  3: {
    default: "⏰ El tiempo sin dientes afecta el hueso",
    answers: {
      recent: "🏃‍♂️ ¡Perfecto timing! Hueso en buenas condiciones",
      medium: "⚡ Buen momento, hueso favorable",
      long: "🔧 Podríamos necesitar regeneración ósea",
      very_long: "🏗️ Evaluaremos opciones de reconstrucción"
    }
  },
  4: {
    default: "🦷 La cantidad determina la estrategia",
    answers: {
      one: "🎯 Caso ideal: 1 implante, 1 corona",
      few: "🔧 Implantes individuales o puente",
      several: "🏗️ Prótesis parcial sobre implantes",
      many: "🚀 All-on-4 o All-on-6 ideales"
    }
  },
  5: {
    default: "🪥 La higiene es clave para el éxito",
    answers: {
      excellent: "⭐ ¡Perfecto! Tus implantes durarán décadas",
      good: "👍 Con ligeras mejoras, resultados excelentes",
      fair: "📚 Te enseñaremos técnicas específicas",
      poor: "🎯 Mejorar higiene = factor crítico"
    }
  }
};

export default function RioInteractiveAssistant({ questionId, selectedAnswer, compact = true }: RioInteractiveAssistantProps) {
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
        className="fixed bottom-4 right-4 z-10 max-w-xs"
      >
        {/* Rio Avatar pequeño flotante */}
        <motion.div
          animate={{ 
            y: [0, -3, 0],
            rotate: mood === "excited" ? [0, 3, -3, 0] : [0, 1, -1, 0]
          }}
          transition={{ 
            duration: mood === "excited" ? 1.5 : 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute -left-2 -top-2 z-10"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#178582] to-[#178582]/70 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-[#178582] flex items-center justify-center text-sm">
              {getMoodIcon()}
            </div>
          </div>
          
          {/* Sparkle effect for excited mood */}
          {mood === "excited" && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-3 h-3 text-[#BFA181]" />
            </motion.div>
          )}
        </motion.div>

        {/* Message Bubble compacto */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`ml-6 p-3 bg-gradient-to-r ${getMoodColor()} rounded-xl rounded-tl-none border border-[#178582]/30 relative shadow-lg backdrop-blur-sm`}
        >
          {/* Bubble arrow */}
          <div className="absolute -left-2 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[#178582]/30"></div>
          
          <div className="flex items-start gap-2">
            <MessageCircle className="w-3 h-3 text-[#178582] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-[#178582] font-medium mb-1">Río:</p>
              <motion.p 
                key={currentMessage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-white/90 leading-relaxed"
              >
                {currentMessage}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
