
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function RioAvatar() {
  return (
    <motion.div
      animate={{ 
        y: [0, -8, 0],
        rotate: [0, 3, -3, 0]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="mx-auto w-20 h-20 mb-4"
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-2 shadow-glow relative">
        <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#3B82F6" />
            <path d="M 30 30 Q 50 10 70 30" stroke="#60A5FA" strokeWidth="8" fill="none" />
            <circle cx="35" cy="45" r="6" fill="white" />
            <circle cx="65" cy="45" r="6" fill="white" />
            <circle cx="35" cy="45" r="3" fill="#1E3A8A" />
            <circle cx="65" cy="45" r="3" fill="#1E3A8A" />
            <path d="M 43 60 Q 50 70 57 60" stroke="#F59E0B" strokeWidth="3" fill="none" />
          </svg>
        </div>
        
        {/* Efectos de brillo */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}
