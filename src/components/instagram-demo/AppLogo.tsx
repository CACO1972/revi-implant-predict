
import React from "react";
import { motion } from "framer-motion";

interface AppLogoProps {
  size?: "small" | "medium" | "large";
}

export default function AppLogo({ size = "large" }: AppLogoProps) {
  // Dynamic height classes based on size prop
  const sizeClasses = {
    small: "h-20", // Aumentado de h-16 a h-20
    medium: "h-32", // Aumentado de h-24 a h-32
    large: "h-[40vh]" // Aumentado de 33vh a 40vh (40% de la altura de la ventana)
  };

  const marginClasses = {
    small: "mb-4",
    medium: "mb-8",
    large: "mb-12"
  };

  return (
    <motion.div 
      className={`${marginClasses[size]}`}
      animate={{ 
        y: [0, -10, 0],
        filter: ["drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))", 
                 "drop-shadow(0 0 25px rgba(23, 133, 130, 0.5))", 
                 "drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))"]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <img 
        src="/lovable-uploads/d0629260-8b0f-417c-8230-2e2edac5950d.png"
        alt="ImplantDX Logo"
        className={`${sizeClasses[size]} w-auto mx-auto`}
      />
    </motion.div>
  );
}
