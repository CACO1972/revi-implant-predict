
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Bird } from "lucide-react";

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
        Este test evaluará en 60 segundos si eres un buen candidato para implantes dentales, 
        considerando factores como tu salud, hábitos y condición bucal actual.
      </p>
      
      <div className="flex items-center justify-center mb-8 bg-[#1EAEDB]/10 p-3 rounded-lg">
        <div className="bg-[#1EAEDB]/20 rounded-full p-1">
          <Bird className="w-6 h-6 text-[#33C3F0]" />
        </div>
        <p className="text-white/70 text-sm ml-2">
          Blu, tu asistente virtual, te guiará durante todo el proceso
        </p>
      </div>
      
      <div className="mb-8">
        <label className="block text-white/90 text-sm mb-2 font-medium" htmlFor="name">
          ¿Cuál es tu nombre?
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Ingresa tu nombre"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-primary focus:border-primary text-center"
          autoComplete="off"
        />
        <p className="text-white/60 text-xs mt-2">Esta información solo será usada para personalizar tu experiencia</p>
      </div>
      
      <Button
        onClick={handleStart}
        disabled={!name.trim()}
        className="group w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white py-5 rounded-xl shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
        Comenzar evaluación gratuita
      </Button>
      
      <p className="text-white/50 text-xs mt-4">
        Este análisis no sustituye una evaluación clínica profesional.
      </p>
    </motion.div>
  );
}
