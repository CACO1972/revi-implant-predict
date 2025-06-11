
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface RioMessageBubbleProps {
  message: string;
}

export default function RioMessageBubble({ message }: RioMessageBubbleProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="relative bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-xl p-4 border border-blue-500/30 mx-auto max-w-sm"
    >
      {/* Flecha que apunta hacia Río */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-blue-500/30"></div>
      
      <div className="flex items-start gap-2">
        <MessageCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs text-blue-400 font-medium mb-1">Río dice:</p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white/90 leading-relaxed"
          >
            {message}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
