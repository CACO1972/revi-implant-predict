
import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-md h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-[#178582] to-[#BFA181]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          duration: 0.5, 
          ease: "easeInOut" 
        }}
      />
    </div>
  );
}
