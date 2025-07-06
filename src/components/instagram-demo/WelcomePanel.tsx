
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BluAssistant from "./BluAssistant";

interface WelcomePanelProps {
  name: string;
  setName: (name: string) => void;
  handleStart: () => void;
}

export default function WelcomePanel({ name, setName, handleStart }: WelcomePanelProps) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="glass-panel p-8 text-center relative"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          filter: ["drop-shadow(0 0 15px rgba(30, 174, 219, 0.3))", 
                  "drop-shadow(0 0 25px rgba(30, 174, 219, 0.5))", 
                  "drop-shadow(0 0 15px rgba(30, 174, 219, 0.3))"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-20 h-20 mx-auto mb-6"
      >
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantDX Logo"
          className="w-full h-full"
        />
      </motion.div>
      
      <h1 className="text-3xl font-bold gold-gradient-text mb-2">
        ImplantDX
      </h1>
      
      <p className="text-white/80 mb-8">
        Evalúa tu candidatura para implantes dentales con tecnología de inteligencia artificial. 
        Completa este breve cuestionario para recibir una evaluación personalizada.
      </p>
      
      <div className="mb-6">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa tu nombre"
          className="bg-white/10 border-[#1EAEDB]/30 text-white placeholder:text-white/50"
        />
      </div>
      
      <motion.div 
        className="mb-6" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3 }}
      >
        <Button 
          onClick={handleStart} 
          disabled={!name.trim()} 
          className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white shadow-glow transition-all duration-300 disabled:bg-neutral-600 disabled:text-white/50"
        >
          Comenzar evaluación
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
        className="p-4 rounded-lg bg-gradient-to-r from-[#1EAEDB]/10 to-transparent border border-[#1EAEDB]/20"
      >
        <p className="text-white/70 text-sm">
          <span className="text-[#1EAEDB] font-medium block mb-1">Democratizando el acceso a tratamientos dentales</span>
          Esta herramienta está diseñada para ayudar a personas con acceso limitado a servicios 
          odontológicos especializados, ya sea por ubicación geográfica o recursos económicos, 
          empoderándolas a través del conocimiento personalizado.
        </p>
      </motion.div>
      
      <BluAssistant 
        isVisible={true} 
        message="¡Hola! Soy Blu, tu asistente virtual. Te guiaré durante esta evaluación para determinar tu candidatura para implantes dentales. ¡Comencemos!"
      />
    </motion.div>
  );
}
