
import React from "react";
import { motion } from "framer-motion";
import { Bird } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviAssistantProps {
  message?: string;
  isVisible: boolean;
}

export default function ReviAssistant({ message, isVisible }: ReviAssistantProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      className="fixed bottom-20 right-4 flex items-end z-10 pointer-events-none" // Cambiado de bottom-4 a bottom-20 para elevarlo
    >
      {message && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="mr-3 mb-2 max-w-[250px] bg-primary/80 backdrop-blur-sm p-4 rounded-xl rounded-br-none text-white text-sm shadow-lg pointer-events-none"
        >
          {message}
        </motion.div>
      )}

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative pointer-events-none"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-starry z-10"></div>
        <Avatar className="w-16 h-16 bg-gradient-to-br from-[#1EAEDB] to-[#33C3F0] p-1 shadow-glow">
          {/* Reemplazamos el logo antiguo con un avatar inspirado en el personaje Blu de la película Rio */}
          <div className="w-full h-full rounded-full bg-[#1EAEDB] flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Forma de la cabeza del ave */}
              <circle cx="50" cy="50" r="45" fill="#1E90FF" />
              {/* Plumas más oscuras */}
              <path d="M 30 30 Q 50 10 70 30" stroke="#0066CC" strokeWidth="8" fill="none" />
              {/* Ojos */}
              <circle cx="35" cy="45" r="6" fill="white" />
              <circle cx="65" cy="45" r="6" fill="white" />
              <circle cx="35" cy="45" r="3" fill="black" />
              <circle cx="65" cy="45" r="3" fill="black" />
              {/* Pico */}
              <path d="M 43 60 Q 50 70 57 60" fill="#FFD700" />
            </svg>
          </div>
          <AvatarFallback className="bg-[#1EAEDB] text-white">
            <Bird className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
      </motion.div>
    </motion.div>
  );
}
