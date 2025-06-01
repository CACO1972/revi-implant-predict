
import { Sparkles, MessageCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RecommendationBoxProps {
  recommendation: string;
}

export default function RecommendationBox({ recommendation }: RecommendationBoxProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    console.log("=== RECOMMENDATION BOX DEBUG ===");
    console.log("Recommendation prop received:", recommendation);
    console.log("Type:", typeof recommendation);
    console.log("Is undefined?", recommendation === undefined);
    console.log("Is null?", recommendation === null);
    console.log("String representation:", String(recommendation));
    console.log("=== END RECOMMENDATION DEBUG ===");

    setIsTyping(true);
    setDisplayedText("");
    
    // Mensaje fijo sin usar la prop recommendation en absoluto
    const fixedMessage = "💡 Cada respuesta nos ayuda a personalizar mejor tu evaluación y crear un plan de tratamiento más preciso.";
    
    console.log("Fixed message to display:", fixedMessage);
    
    // Simular efecto de escritura
    const words = fixedMessage.split(" ");
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedText(prev => {
          const newText = prev + (prev ? " " : "") + words[currentIndex];
          console.log("Adding word:", words[currentIndex], "Current text:", newText);
          return newText;
        });
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        console.log("Typing completed. Final text:", displayedText);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [recommendation]);

  // Efecto de cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  console.log("About to render. DisplayedText:", displayedText);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-2 mb-6 relative"
    >
      {/* Avatar de Río */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="absolute -left-2 -top-2 z-10"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#178582] to-[#178582]/70 p-1 shadow-lg">
          <div className="w-full h-full rounded-full bg-[#178582] flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="#178582" />
              <path d="M 30 35 Q 50 20 70 35" stroke="#BFA181" strokeWidth="6" fill="none" />
              <circle cx="38" cy="45" r="4" fill="white" />
              <circle cx="62" cy="45" r="4" fill="white" />
              <circle cx="38" cy="45" r="2" fill="#0A1828" />
              <circle cx="62" cy="45" r="2" fill="#0A1828" />
              <path d="M 43 60 Q 50 67 57 60" stroke="#BFA181" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
        {isTyping && (
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Burbuja del mensaje */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="ml-6 p-4 bg-gradient-to-r from-[#178582]/20 to-[#BFA181]/10 rounded-xl rounded-tl-none border border-[#178582]/30 relative"
      >
        <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-[#178582]/30"></div>
        
        <div className="flex items-start gap-3">
          <motion.div
            animate={isTyping ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
          >
            <MessageCircle className="w-4 h-4 text-[#178582] mt-0.5 flex-shrink-0" />
          </motion.div>
          <div className="flex-1">
            <p className="text-xs text-[#178582] font-medium mb-1">Río te explica:</p>
            <p className="text-sm text-white/90 font-light leading-relaxed">
              {displayedText || "Cargando mensaje..."}
              {isTyping && showCursor && (
                <motion.span 
                  className="inline-block w-0.5 h-4 bg-[#BFA181] ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </p>
            
            {!isTyping && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-3 flex items-center gap-2 text-xs text-[#BFA181]/60 hover:text-[#BFA181]/40 transition-colors cursor-not-allowed"
                disabled
              >
                <Info className="w-3 h-3" />
                <span>Saber más</span>
                <span className="text-[10px] text-white/40">(Próximamente)</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Efectos de partículas cuando termina de escribir */}
        {!isTyping && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-2 right-2"
            >
              <Sparkles className="w-3 h-3 text-[#BFA181] animate-pulse" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-2 right-4"
            >
              <Sparkles className="w-2 h-2 text-[#178582] animate-pulse" />
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
