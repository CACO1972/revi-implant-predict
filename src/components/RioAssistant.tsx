
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface RioAssistantProps {
  message?: string;
  isVisible: boolean;
}

export default function RioAssistant({ message, isVisible }: RioAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-4 right-4 z-10"
    >
      {/* Avatar de Río - Clickeable */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
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
          <div className="absolute -top-1 right-0 w-5 h-5 bg-[#BFA181] rounded-full flex items-center justify-center text-[10px] text-[#0A1828] font-bold">
            !
          </div>
        )}
      </motion.div>

      {/* Burbuja de mensaje - Solo visible cuando está expandido */}
      <AnimatePresence>
        {isExpanded && message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-72 bg-[#178582]/90 backdrop-blur-sm p-4 pr-8 rounded-xl rounded-br-none text-white text-sm shadow-lg"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1 right-1 h-6 w-6 text-white/70 hover:text-white hover:bg-transparent"
              onClick={() => setIsExpanded(false)}
            >
              <X size={14} />
            </Button>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
