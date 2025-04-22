
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PatientInfo } from "@/types/implant";
import DentalIcon from "@/components/DentalIcon";
import { motion } from "framer-motion";

interface WelcomeProps {
  onStart: (patientInfo: PatientInfo) => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<string>("");
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    let hasError = false;
    
    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }
    
    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 18 || parsedAge > 120) {
      setAgeError(true);
      hasError = true;
    } else {
      setAgeError(false);
    }
    
    if (!hasError) {
      onStart({ name: name.trim(), age: parsedAge });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel p-8"
      >
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <DentalIcon className="text-primary" size={28} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gold mb-3">¡Hola!</h1>
          <h2 className="text-xl font-light text-primary mb-4">Soy tu asistente IA</h2>
          <p className="text-white/80 mb-6 font-light">
            Te ayudaré a estimar tus probabilidades de éxito si estás pensando en 
            rehabilitar tu sonrisa con implantes dentales.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-left text-sm font-medium text-white/90">
              Nombre
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-white/5 border-white/10 text-white placeholder-white/40 ${nameError ? 'border-red-500' : ''}`}
              placeholder="Tu nombre"
            />
            {nameError && <p className="text-red-400 text-xs text-left">Por favor, introduce tu nombre</p>}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="age" className="block text-left text-sm font-medium text-white/90">
              Edad
            </label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`w-full bg-white/5 border-white/10 text-white placeholder-white/40 ${ageError ? 'border-red-500' : ''}`}
              placeholder="Tu edad"
              min="18"
              max="120"
            />
            {ageError && (
              <p className="text-red-400 text-xs text-left">
                Por favor, introduce una edad válida (entre 18 y 120)
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium shadow-glow transition-all duration-300 border border-gold/30"
          >
            Comenzar evaluación
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
