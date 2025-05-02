
import React from "react";
import { motion } from "framer-motion";

export default function AppLogo() {
  return (
    <motion.div 
      className="mb-12"
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
        src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
        alt="ImplantX Logo"
        className="h-40 w-auto mx-auto" // Aumentado de h-24 a h-40
      />
    </motion.div>
  );
}
