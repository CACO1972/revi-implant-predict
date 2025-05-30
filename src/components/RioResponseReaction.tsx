
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ThumbsUp, AlertTriangle, Heart, Sparkles } from "lucide-react";

interface RioResponseReactionProps {
  questionId: number;
  selectedAnswer: string;
  isVisible: boolean;
}

interface ReactionData {
  emoji: string;
  message: string;
  mood: string;
}

interface QuestionReactions {
  [key: string]: ReactionData;
}

interface RioReactionsData {
  [key: number]: QuestionReactions;
}

const rioReactions: RioReactionsData = {
  1: {
    "0": { emoji: "🎉", message: "¡Excelente! Sin tabaco tendrás una cicatrización perfecta", mood: "excited" },
    "1": { emoji: "⚠️", message: "Considera reducir más. Cada cigarrillo menos ayuda", mood: "concerned" },
    "2": { emoji: "🚨", message: "Es importante dejar antes del implante para mejorar las chances", mood: "serious" }
  },
  2: {
    "0": { emoji: "✅", message: "Perfecto! Sin diabetes el proceso será más simple", mood: "happy" },
    "1": { emoji: "👍", message: "Con buen control médico, tendremos excelentes resultados", mood: "positive" },
    "2": { emoji: "⚠️", message: "Primero controlemos la glucemia, luego el implante", mood: "concerned" }
  },
  3: {
    "0": { emoji: "😌", message: "Genial! Sin bruxismo reduces el riesgo de complicaciones", mood: "happy" },
    "1": { emoji: "👌", message: "¡Perfecto! El plano protegerá tu implante", mood: "positive" },
    "2": { emoji: "😬", message: "Necesitaremos un plano de relajación para proteger el implante", mood: "concerned" }
  },
  4: {
    "0": { emoji: "⚡", message: "¡Timing perfecto! El hueso está en excelentes condiciones", mood: "excited" },
    "1": { emoji: "👍", message: "Buen momento, aún tenemos hueso favorable para trabajar", mood: "positive" },
    "2": { emoji: "🔧", message: "Puede que necesitemos regeneración ósea, pero es totalmente factible", mood: "thoughtful" }
  },
  5: {
    "0": { emoji: "🎯", message: "Caso ideal: un implante, una corona. Simple y efectivo", mood: "excited" },
    "1": { emoji: "🔧", message: "Podemos hacer implantes individuales o un puente", mood: "positive" },
    "2": { emoji: "🚀", message: "All-on-4 o All-on-6 pueden ser la solución perfecta", mood: "excited" }
  }
};

export default function RioResponseReaction({ questionId, selectedAnswer, isVisible }: RioResponseReactionProps) {
  const [showReaction, setShowReaction] = useState(false);
  
  // Obtener la reacción de forma segura
  const questionReactions = rioReactions[questionId];
  const reaction: ReactionData | undefined = questionReactions?.[selectedAnswer];

  useEffect(() => {
    if (isVisible && reaction) {
      const timer = setTimeout(() => {
        setShowReaction(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowReaction(false);
    }
  }, [isVisible, reaction]);

  if (!reaction || !showReaction) return null;

  const getMoodColor = () => {
    switch (reaction.mood) {
      case "excited": return "from-green-500/20 to-blue-500/20";
      case "positive": return "from-blue-500/20 to-blue-400/20";
      case "happy": return "from-blue-400/20 to-blue-500/20";
      case "concerned": return "from-orange-500/20 to-red-500/20";
      case "serious": return "from-red-500/20 to-red-600/20";
      case "thoughtful": return "from-purple-500/20 to-blue-500/20";
      default: return "from-blue-500/20 to-blue-400/20";
    }
  };

  const getMoodIcon = () => {
    switch (reaction.mood) {
      case "excited": return <Sparkles className="w-4 h-4 text-green-400" />;
      case "positive": return <ThumbsUp className="w-4 h-4 text-blue-400" />;
      case "happy": return <Heart className="w-4 h-4 text-blue-400" />;
      case "concerned": return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      case "serious": return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <MessageCircle className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="mt-4"
      >
        {/* Mini Río Avatar - Color azul como Blu */}
        <motion.div
          animate={{ 
            y: [0, -3, 0],
            rotate: reaction.mood === "excited" ? [0, 5, -5, 0] : [0, 1, -1, 0]
          }}
          transition={{ 
            duration: reaction.mood === "excited" ? 1 : 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute -left-2 -top-2 z-10"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-0.5 shadow-sm">
            <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-sm">
              {reaction.emoji}
            </div>
          </div>
        </motion.div>

        {/* Burbuja de reacción */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`ml-6 p-3 bg-gradient-to-r ${getMoodColor()} rounded-lg rounded-tl-none border border-blue-500/20 relative`}
        >
          {/* Flecha de la burbuja */}
          <div className="absolute -left-2 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-blue-500/20"></div>
          
          <div className="flex items-start gap-2">
            {getMoodIcon()}
            <div>
              <p className="text-xs text-blue-400 font-medium mb-1">Río reacciona:</p>
              <motion.p 
                key={reaction.message}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-white/90 leading-relaxed"
              >
                {reaction.message}
              </motion.p>
            </div>
          </div>

          {/* Efectos especiales para mood excited */}
          {reaction.mood === "excited" && (
            <>
              <motion.div
                animate={{ 
                  y: [0, -6, 0], 
                  opacity: [0.6, 1, 0.6],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                className="absolute top-1 right-1"
              >
                <Sparkles className="w-2 h-2 text-yellow-400" />
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
