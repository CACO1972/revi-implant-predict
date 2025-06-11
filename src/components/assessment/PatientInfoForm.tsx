
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PatientInfo } from "@/types/implant";

interface PatientInfoFormProps {
  patientInfo: PatientInfo;
  setPatientInfo: (info: PatientInfo) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PatientInfoForm({ patientInfo, setPatientInfo, onSubmit }: PatientInfoFormProps) {
  return (
    <motion.div
      key="patient-info"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="glass-panel p-8 max-w-md w-full"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#178582] mb-2">Información Personal</h2>
        <p className="text-white/80">
          Para comenzar, necesitamos algunos datos básicos
        </p>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-white/90">Nombre completo</Label>
          <Input
            id="name"
            type="text"
            value={patientInfo.name}
            onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder-white/50"
            placeholder="Escribe tu nombre completo"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="age" className="text-white/90">Edad</Label>
          <Input
            id="age"
            type="number"
            min="18"
            max="99"
            value={patientInfo.age || ""}
            onChange={(e) => setPatientInfo({ ...patientInfo, age: parseInt(e.target.value) || null })}
            className="bg-white/10 border-white/20 text-white placeholder-white/50"
            placeholder="Tu edad"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-[#178582] hover:bg-[#178582]/90 text-white shadow-glow transition-all duration-300 border border-[#BFA181]/30"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Comenzar Evaluación
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </motion.div>
  );
}
