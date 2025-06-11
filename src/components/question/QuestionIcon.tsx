
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuestionIconProps {
  IconComponent: LucideIcon;
}

export default function QuestionIcon({ IconComponent }: QuestionIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.2 
      }}
      className="mx-auto w-16 h-16 bg-gradient-to-br from-[#BFA181]/20 to-blue-500/20 rounded-full flex items-center justify-center border border-[#BFA181]/30"
    >
      <IconComponent className="w-8 h-8 text-[#BFA181]" />
    </motion.div>
  );
}
