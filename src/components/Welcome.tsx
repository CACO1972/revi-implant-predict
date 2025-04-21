
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PatientInfo } from "@/types/implant";

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
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-dental-blue mb-3">¡Hola! Soy Revi</h1>
          <h2 className="text-2xl font-semibold text-dental-blue-light mb-2">tu asistente IA</h2>
          <p className="text-gray-600 mb-6">
            Te ayudaré a estimar tus probabilidades de éxito si estás pensando en 
            rehabilitar tu sonrisa con implantes dentales.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">
              Nombre
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full ${nameError ? 'border-red-500' : ''}`}
              placeholder="Tu nombre"
            />
            {nameError && <p className="text-red-500 text-xs text-left">Por favor, introduce tu nombre</p>}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="age" className="block text-left text-sm font-medium text-gray-700">
              Edad
            </label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`w-full ${ageError ? 'border-red-500' : ''}`}
              placeholder="Tu edad"
              min="18"
              max="120"
            />
            {ageError && (
              <p className="text-red-500 text-xs text-left">
                Por favor, introduce una edad válida (entre 18 y 120)
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-dental-blue hover:bg-dental-blue-dark"
          >
            Comenzar evaluación
          </Button>
        </form>
      </div>
    </div>
  );
}
