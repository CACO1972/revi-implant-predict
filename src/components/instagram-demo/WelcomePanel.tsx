
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface WelcomePanelProps {
  name: string;
  setName: (name: string) => void;
  handleStart: () => void;
}

export default function WelcomePanel({ 
  name, 
  setName, 
  handleStart 
}: WelcomePanelProps) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel p-6 text-center"
    >
      <h1 className="text-2xl font-bold gold-gradient-text mb-6">
        Evaluación de implantes dentales
      </h1>
      
      <p className="text-white/80 mb-6">
        Este test evalúa si eres buen candidato para implantes dentales en solo 60 segundos.
      </p>
      
      <div className="mb-6">
        <label className="block text-white/80 text-sm mb-2" htmlFor="name">
          Tu nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Ingresa tu nombre"
          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-primary focus:border-primary"
        />
      </div>
      
      <Button
        onClick={handleStart}
        disabled={!name.trim()}
        className="group w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white py-3 rounded-xl shadow-glow transition-all duration-300"
      >
        <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
        Comenzar evaluación
      </Button>
    </motion.div>
  );
}
