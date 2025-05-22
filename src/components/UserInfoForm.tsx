
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PatientInfo } from "@/types/implant";

interface UserInfoFormProps {
  initialData: PatientInfo;
  onSubmit: (data: PatientInfo) => void;
}

export default function UserInfoForm({ initialData, onSubmit }: UserInfoFormProps) {
  const [name, setName] = useState(initialData.name);
  const [age, setAge] = useState<number | null>(initialData.age);
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let valid = true;
    
    if (!name.trim()) {
      setNameError("Por favor ingresa tu nombre");
      valid = false;
    } else {
      setNameError("");
    }
    
    if (!age || age < 18 || age > 120) {
      setAgeError("Por favor ingresa una edad válida (entre 18 y 120)");
      valid = false;
    } else {
      setAgeError("");
    }
    
    if (valid) {
      onSubmit({ name, age });
    }
  };
  
  return (
    <motion.div
      className="glass-panel p-8 text-center max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#178582] to-[#178582]/30 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-[#BFA181] mb-4">¡Empecemos tu evaluación!</h2>
      
      <p className="text-white/80 mb-6">
        Para personalizar tu experiencia y resultados, necesitamos unos datos básicos.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 text-left">
          <Label htmlFor="name" className="text-white/80">Nombre</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Ingresa tu nombre"
          />
          {nameError && (
            <p className="text-red-400 text-xs mt-1">{nameError}</p>
          )}
        </div>
        
        <div className="space-y-2 text-left">
          <Label htmlFor="age" className="text-white/80">Edad</Label>
          <Input
            id="age"
            type="number"
            value={age === null ? "" : age}
            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : null)}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Ingresa tu edad"
            min={18}
            max={120}
          />
          {ageError && (
            <p className="text-red-400 text-xs mt-1">{ageError}</p>
          )}
        </div>
        
        <Button
          type="submit"
          className="w-full bg-[#178582] hover:bg-[#178582]/90 text-white shadow-glow transition-all duration-300 border border-[#BFA181]/30"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Comenzar Evaluación
        </Button>
      </form>
    </motion.div>
  );
}
