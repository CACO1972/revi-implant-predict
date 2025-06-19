
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
      {/* Avatar de Blu - Menos animación */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#178582] rounded-full border-2 border-[#0A1828] z-10"></div>
        <Avatar className="w-10 h-10 bg-gradient-to-br from-[#178582] to-[#BFA181] p-1 shadow-lg">
          <div className="w-full h-full rounded-full bg-[#178582] flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <AvatarFallback className="bg-[#178582] text-white text-xs">
            R
          </AvatarFallback>
        </Avatar>
        
        {/* Indicador de mensaje más sutil */}
        {message && !isExpanded && (
          <div className="absolute -top-1 right-0 w-4 h-4 bg-[#BFA181] rounded-full flex items-center justify-center text-[9px] text-white font-bold animate-pulse">
            !
          </div>
        )}
      </motion.div>

      {/* Burbuja de mensaje más compacta */}
      <AnimatePresence>
        {isExpanded && message && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="absolute bottom-12 left-0 w-56 bg-[#178582]/95 backdrop-blur-sm p-3 pr-7 rounded-lg rounded-bl-none text-white text-xs shadow-lg border border-[#BFA181]/20"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-0.5 right-0.5 h-5 w-5 text-white/70 hover:text-white hover:bg-transparent"
              onClick={() => setIsExpanded(false)}
            >
              <X size={12} />
            </Button>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
