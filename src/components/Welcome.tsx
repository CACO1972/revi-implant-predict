
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PatientInfo } from "@/types/implant";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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

  const inputVariants = {
    focused: { 
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(191, 161, 129, 0.3)"
    },
    error: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 backdrop-blur-lg relative overflow-hidden">
          {/* Efecto de brillo en la esquina */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-2xl -z-0"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl -z-0"></div>
          
          <div className="mb-8 relative z-10">
            <motion.div 
              className="flex justify-center mb-4"
              whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-gold p-0.5">
                <div className="w-full h-full rounded-full bg-starry flex items-center justify-center">
                  <Sparkles className="text-gold w-8 h-8" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold gold-gradient-text mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ¡Hola!
            </motion.h1>
            
            <motion.h2 
              className="text-xl font-light text-primary mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Soy Revi, tu asistente IA
            </motion.h2>
            
            <motion.p 
              className="text-white/80 mb-6 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Te ayudaré a estimar tus probabilidades de éxito si estás pensando en 
              rehabilitar tu sonrisa con implantes dentales.
            </motion.p>
          </div>
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div 
              className="space-y-2"
              variants={inputVariants}
              animate={nameError ? "error" : ""}
            >
              <label htmlFor="name" className="block text-left text-sm font-medium text-white/90">
                Nombre
              </label>
              <motion.div whileHover="focused" variants={inputVariants}>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-white/5 border-white/10 text-white placeholder-white/40 ${nameError ? 'border-red-500' : ''}`}
                  placeholder="Tu nombre"
                />
              </motion.div>
              {nameError && <p className="text-red-400 text-xs text-left">Por favor, introduce tu nombre</p>}
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              variants={inputVariants}
              animate={ageError ? "error" : ""}
            >
              <label htmlFor="age" className="block text-left text-sm font-medium text-white/90">
                Edad
              </label>
              <motion.div whileHover="focused" variants={inputVariants}>
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
              </motion.div>
              {ageError && (
                <p className="text-red-400 text-xs text-left">
                  Por favor, introduce una edad válida (entre 18 y 120)
                </p>
              )}
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white font-medium shadow-glow transition-all duration-300 border border-gold/20"
              >
                Comenzar evaluación
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
