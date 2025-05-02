
import React from "react";
import { motion } from "framer-motion";

interface CompletedPanelProps {
  name: string;
}

export default function CompletedPanel({ name }: CompletedPanelProps) {
  return (
    <motion.div
      key="completed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel p-6 text-center"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          filter: ["drop-shadow(0 0 15px rgba(30, 174, 219, 0.4))", 
                  "drop-shadow(0 0 25px rgba(30, 174, 219, 0.6))", 
                  "drop-shadow(0 0 15px rgba(30, 174, 219, 0.4))"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1EAEDB]/30 to-primary/20 flex items-center justify-center"
      >
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantX Logo"
          className="h-16 w-auto"
        />
      </motion.div>
      
      <h2 className="text-2xl font-bold gold-gradient-text mb-4">
        ¡Gracias, {name}!
      </h2>
      
      <p className="text-white/80 mb-6">
        Visita nuestra web para obtener tu evaluación completa y descubrir si eres candidato para implantes dentales.
      </p>
      
      <div className="space-y-4">
        <a
          href="https://implantdx.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-starry py-3 px-4 rounded-xl shadow-glow transition-all duration-300 border border-[#1EAEDB]/30"
        >
          Obtener evaluación completa
        </a>
        <a
          href="https://instagram.com/reviveai.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-white/70 hover:text-white/90 transition-colors"
        >
          <span className="mr-1">Síguenos en</span>
          <span className="font-bold">@reviveai.cl</span>
        </a>
      </div>
    </motion.div>
  );
}
