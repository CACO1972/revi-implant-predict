
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bird, MessageCircle, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface BluAssistantProps {
  message?: string;
  isVisible: boolean;
}

export default function BluAssistant({ message, isVisible }: BluAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-4 left-4 z-10"
    >
      {/* Avatar de Blu - Clickeable */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-starry z-10"></div>
        <Avatar className="w-12 h-12 bg-gradient-to-br from-[#1EAEDB] to-[#33C3F0] p-1 shadow-glow">
          <div className="w-full h-full rounded-full bg-[#1EAEDB] flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#1E90FF" />
              <path d="M 30 30 Q 50 10 70 30" stroke="#0066CC" strokeWidth="8" fill="none" />
              <circle cx="35" cy="45" r="6" fill="white" />
              <circle cx="65" cy="45" r="6" fill="white" />
              <circle cx="35" cy="45" r="3" fill="black" />
              <circle cx="65" cy="45" r="3" fill="black" />
              <path d="M 43 60 Q 50 70 57 60" fill="#FFD700" />
            </svg>
          </div>
          <AvatarFallback className="bg-[#1EAEDB] text-white">
            <Bird className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
        
        {/* Indicador de mensaje */}
        {message && !isExpanded && (
          <div className="absolute -top-1 right-0 w-5 h-5 bg-gold rounded-full flex items-center justify-center text-[10px] text-white font-bold">
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
            className="absolute bottom-14 left-0 w-64 bg-primary/90 backdrop-blur-sm p-4 pr-8 rounded-xl rounded-bl-none text-white text-sm shadow-lg"
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
