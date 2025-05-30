
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ThumbsUp, AlertTriangle, Heart, Sparkles } from "lucide-react";

interface RioResponseReactionProps {
  questionId: number;
  selectedAnswer: string;
  isVisible: boolean;
}

const rioReactions = {
  1: {
    no: { emoji: "🎉", message: "¡Excelente! Sin tabaco tendrás una cicatrización perfecta", mood: "excited" },
    light: { emoji: "⚠️", message: "Considera reducir más. Cada cigarrillo menos ayuda", mood: "concerned" },
    heavy: { emoji: "🚨", message: "Es importante dejar antes del implante para mejorar las chances", mood: "serious" }
  },
  2: {
    no: { emoji: "✅", message: "Perfecto! Sin diabetes el proceso será más simple", mood: "happy" },
    controlled: { emoji: "👍", message: "Con buen control médico, tendremos excelentes resultados", mood: "positive" },
    uncontrolled: { emoji: "⚠️", message: "Primero controlemos la glucemia, luego el implante", mood: "concerned" }
  },
  3: {
    no: { emoji: "😌", message: "Genial! Sin bruxismo reduces el riesgo de complicaciones", mood: "happy" },
    treated: { emoji: "👌", message: "¡Perfecto! El plano protegerá tu implante", mood: "positive" },
    untreated: { emoji: "😬", message: "Necesitaremos un plano de relajación para proteger el implante", mood: "concerned" }
  },
  4: {
    recent: { emoji: "⚡", message: "¡Timing perfecto! El hueso está en excelentes condiciones", mood: "excited" },
    medium: { emoji: "👍", message: "Buen momento, aún tenemos hueso favorable para trabajar", mood: "positive" },
    old: { emoji: "🔧", message: "Puede que necesitemos regeneración ósea, pero es totalmente factible", mood: "thoughtful" }
  },
  5: {
    one: { emoji: "🎯", message: "Caso ideal: un implante, una corona. Simple y efectivo", mood: "excited" },
    several: { emoji: "🔧", message: "Podemos hacer implantes individuales o un puente", mood: "positive" },
    all: { emoji: "🚀", message: "All-on-4 o All-on-6 pueden ser la solución perfecta", mood: "excited" }
  }
};

export default function RioResponseReaction({ questionId, selectedAnswer, isVisible }: RioResponseReactionProps) {
  const [showReaction, setShowReaction] = useState(false);
  
  const reaction = rioReactions[questionId as keyof typeof rioReactions]?.[selectedAnswer as keyof typeof rioReactions[keyof typeof rioReactions]];

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
      case "excited": return "from-green-500/20 to-[#178582]/20";
      case "positive": return "from-[#178582]/20 to-[#BFA181]/20";
      case "happy": return "from-blue-500/20 to-[#178582]/20";
      case "concerned": return "from-orange-500/20 to-red-500/20";
      case "serious": return "from-red-500/20 to-red-600/20";
      case "thoughtful": return "from-purple-500/20 to-[#178582]/20";
      default: return "from-[#178582]/20 to-[#BFA181]/20";
    }
  };

  const getMoodIcon = () => {
    switch (reaction.mood) {
      case "excited": return <Sparkles className="w-4 h-4 text-green-400" />;
      case "positive": return <ThumbsUp className="w-4 h-4 text-[#178582]" />;
      case "happy": return <Heart className="w-4 h-4 text-blue-400" />;
      case "concerned": return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      case "serious": return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <MessageCircle className="w-4 h-4 text-[#178582]" />;
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
        {/* Mini Río Avatar */}
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#178582] to-[#178582]/70 p-0.5 shadow-sm">
            <div className="w-full h-full rounded-full bg-[#178582] flex items-center justify-center text-sm">
              {reaction.emoji}
            </div>
          </div>
        </motion.div>

        {/* Burbuja de reacción */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`ml-6 p-3 bg-gradient-to-r ${getMoodColor()} rounded-lg rounded-tl-none border border-[#178582]/20 relative`}
        >
          {/* Flecha de la burbuja */}
          <div className="absolute -left-2 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[#178582]/20"></div>
          
          <div className="flex items-start gap-2">
            {getMoodIcon()}
            <div>
              <p className="text-xs text-[#178582] font-medium mb-1">Río reacciona:</p>
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
                <Sparkles className="w-2 h-2 text-[#BFA181]" />
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
