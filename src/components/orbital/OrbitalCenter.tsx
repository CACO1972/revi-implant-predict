
"use client";
import { motion } from "framer-motion";

export default function OrbitalCenter() {
  return (
    <motion.div 
      className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#5BCBFF] via-[#178582] to-[#FF8C42] flex items-center justify-center z-10 overflow-hidden"
      animate={{ 
        boxShadow: [
          "0 0 20px rgba(91, 203, 255, 0.3)",
          "0 0 40px rgba(91, 203, 255, 0.6)",
          "0 0 20px rgba(91, 203, 255, 0.3)"
        ]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* Anillos de energía */}
      <motion.div 
        className="absolute w-24 h-24 rounded-full border border-[#5BCBFF]/20"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-28 h-28 rounded-full border border-[#178582]/10"
        animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Logo IMPLANTX */}
      <div className="w-16 h-16 rounded-full bg-[#040D18]/80 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="IMPLANTX Logo"
          className="w-12 h-12 object-contain"
        />
        
        {/* Efecto holográfico sobre el logo */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5BCBFF]/20 to-transparent"
          animate={{ x: [-50, 50] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Pulsos de energía */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#5BCBFF]/10"
        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
}
