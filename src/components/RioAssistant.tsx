
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ThumbsUp, ThumbsDown, Bot, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface RioAssistantProps {
  message?: string;
  isVisible: boolean;
  onMessageChange?: (newMessage: string) => void;
}

export default function RioAssistant({ message, isVisible, onMessageChange }: RioAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message || "");
  const [isTyping, setIsTyping] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "¿Qué es un implante dental?",
    "¿El procedimiento duele?",
    "¿Cuánto tiempo dura la recuperación?"
  ]);
  
  useEffect(() => {
    setCurrentMessage(message || "");
  }, [message]);

  if (!isVisible) return null;

  // Simular que Río está escribiendo un mensaje
  const handleTypingResponse = (suggestion: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses: Record<string, string> = {
        "¿Qué es un implante dental?": "Un implante dental es una raíz artificial de titanio que se coloca en el hueso maxilar para reemplazar un diente perdido. Sobre esta raíz, se coloca una corona o prótesis que se ve y funciona como un diente natural.",
        "¿El procedimiento duele?": "El procedimiento se realiza con anestesia local, por lo que no sentirás dolor durante la colocación. Después, es normal tener algunas molestias que se pueden controlar con medicamentos. La mayoría de los pacientes reportan menos dolor del esperado.",
        "¿Cuánto tiempo dura la recuperación?": "La recuperación inicial toma unos 7-10 días para que desaparezcan las molestias. Sin embargo, el proceso de osteointegración (cuando el implante se une al hueso) toma entre 3-6 meses, dependiendo de tu caso específico y la calidad ósea."
      };
      
      const newMessage = responses[suggestion] || "Esa es una excelente pregunta. Te puedo ayudar con eso durante tu evaluación personalizada.";
      setCurrentMessage(newMessage);
      if (onMessageChange) onMessageChange(newMessage);
      
      // Generar nuevas sugerencias basadas en la pregunta actual
      if (suggestion === "¿Qué es un implante dental?") {
        setSuggestions([
          "¿Cuánto cuesta un implante?",
          "¿Soy buen candidato?",
          "¿Cuánto duran los implantes?"
        ]);
      } else if (suggestion === "¿El procedimiento duele?") {
        setSuggestions([
          "¿Se usa anestesia general?",
          "¿Cuánto dura la cirugía?",
          "¿Puedo trabajar al día siguiente?"
        ]);
      } else {
        setSuggestions([
          "¿Cómo cuidar mis implantes?",
          "¿Qué debo evitar después?",
          "¿Cuáles son los riesgos?"
        ]);
      }
    }, 1500);
  };

  const handleFeedback = (isPositive: boolean) => {
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      if (isPositive) {
        setCurrentMessage("¡Me alegra haberte ayudado! Si tienes más preguntas, no dudes en consultarme.");
      } else {
        setCurrentMessage("Lamento no haber respondido adecuadamente. Estoy aquí para intentarlo de nuevo con tus preguntas.");
      }
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-4 right-4 z-50"
    >
      {/* Avatar de Río - Clickeable */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <AnimatePresence>
          {!isExpanded && message && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-10 -right-2 bg-[#178582] px-3 py-1 rounded-full text-white text-xs whitespace-nowrap"
            >
              ¡Haz clic para conversar!
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A1828] z-10"></div>
        <Avatar className="w-14 h-14 bg-gradient-to-br from-[#178582] to-[#178582]/70 p-1 shadow-glow">
          <div className="w-full h-full rounded-full bg-[#178582] flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#178582" />
              <path d="M 30 30 Q 50 10 70 30" stroke="#BFA181" strokeWidth="8" fill="none" />
              <circle cx="35" cy="45" r="6" fill="white" />
              <circle cx="65" cy="45" r="6" fill="white" />
              <circle cx="35" cy="45" r="3" fill="#0A1828" />
              <circle cx="65" cy="45" r="3" fill="#0A1828" />
              <path d="M 43 60 Q 50 70 57 60" stroke="#BFA181" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <AvatarFallback className="bg-[#178582] text-white">
            RÍO
          </AvatarFallback>
        </Avatar>
        
        {/* Indicador de mensaje */}
        {message && !isExpanded && (
          <div className="absolute -top-1 right-0 w-5 h-5 bg-[#BFA181] rounded-full flex items-center justify-center text-[10px] text-[#0A1828] font-bold animate-pulse">
            !
          </div>
        )}
      </motion.div>

      {/* Burbuja de mensaje - Solo visible cuando está expandido */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-[#0A1828]/90 backdrop-blur-sm rounded-xl rounded-br-none text-white shadow-lg border border-[#178582]/30 overflow-hidden"
          >
            {/* Header del chat */}
            <div className="bg-[#178582] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={18} />
                <span className="font-medium">Río - Asistente IA</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white/70 hover:text-white hover:bg-transparent"
                onClick={() => setIsExpanded(false)}
              >
                <X size={14} />
              </Button>
            </div>
            
            {/* Cuerpo del chat */}
            <div className="p-4 max-h-60 overflow-y-auto">
              {showThankYou ? (
                <div className="flex justify-center items-center h-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <Sparkles className="text-[#BFA181] mx-auto mb-2" />
                    <p>¡Gracias por tu feedback!</p>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="flex items-start mb-4">
                    <div className="w-6 h-6 rounded-full bg-[#178582] flex-shrink-0 mr-2 flex items-center justify-center text-xs">R</div>
                    <div className="bg-[#178582]/20 rounded-lg p-3 rounded-tl-none">
                      {isTyping ? (
                        <div className="flex gap-1">
                          <motion.div 
                            className="w-2 h-2 bg-white/80 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-white/80 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.15 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-white/80 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.3 }}
                          />
                        </div>
                      ) : (
                        <p className="text-sm">{currentMessage}</p>
                      )}
                    </div>
                  </div>
                  
                  {!isTyping && (
                    <>
                      {/* Botones de feedback */}
                      <div className="flex justify-center gap-2 my-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleFeedback(true)}
                          className="border-[#178582]/30 hover:bg-[#178582]/10 text-xs"
                        >
                          <ThumbsUp size={14} className="mr-1" /> Útil
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleFeedback(false)}
                          className="border-[#178582]/30 hover:bg-[#178582]/10 text-xs"
                        >
                          <ThumbsDown size={14} className="mr-1" /> Mejorar
                        </Button>
                      </div>
                      
                      {/* Sugerencias de preguntas */}
                      <div className="mt-4">
                        <p className="text-xs text-white/60 mb-2">Preguntas sugeridas:</p>
                        <div className="space-y-2">
                          {suggestions.map((suggestion, i) => (
                            <motion.button
                              key={i}
                              className="text-xs bg-[#178582]/10 hover:bg-[#178582]/20 transition-colors rounded-full px-3 py-1 text-white/90 w-full text-left"
                              onClick={() => handleTypingResponse(suggestion)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {suggestion}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            
            {/* Footer del chat */}
            <div className="p-3 border-t border-[#178582]/20 text-xs text-center text-white/60">
              Río está entrenado para brindarte información clínica sobre implantes dentales
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
