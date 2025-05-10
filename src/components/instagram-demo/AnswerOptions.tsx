
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Question } from "@/types/implant";
import { Checkbox } from "@/components/ui/checkbox";

interface AnswerOptionsProps {
  currentQuestion: Question;
  selectedAnswer: string | undefined;
  handleSelectAnswer: (questionId: number, value: string) => void;
}

export default function AnswerOptions({
  currentQuestion,
  selectedAnswer,
  handleSelectAnswer,
}: AnswerOptionsProps) {
  // Estado local para manejar multiselección
  const [multiSelectedValues, setMultiSelectedValues] = useState<string[]>(
    selectedAnswer ? selectedAnswer.split(',') : []
  );

  const handleMultiSelect = (value: string, checked: boolean) => {
    let newValues: string[];
    
    // Caso especial para "none" en la pregunta de condiciones (id 7)
    if (currentQuestion.id === 7) {
      if (value === "none" && checked) {
        // Si selecciona "none", eliminar otras selecciones
        newValues = ["none"];
      } else if (checked) {
        // Si selecciona cualquier otra opción, eliminar "none"
        newValues = [...multiSelectedValues.filter(v => v !== "none"), value];
      } else {
        // Si deselecciona una opción
        newValues = multiSelectedValues.filter(v => v !== value);
      }
    } else {
      // Comportamiento normal para otras preguntas multiselección
      if (checked) {
        newValues = [...multiSelectedValues, value];
      } else {
        newValues = multiSelectedValues.filter(v => v !== value);
      }
    }
    
    setMultiSelectedValues(newValues);
    // Pasamos los valores como string separados por coma
    handleSelectAnswer(currentQuestion.id, newValues.join(','));
  };

  return (
    <div className="space-y-3 mb-6">
      {currentQuestion.multiSelect ? (
        // Opciones con checkbox para multiselección
        currentQuestion.options.map((option) => (
          <motion.div
            key={option.value.toString()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
              multiSelectedValues.includes(option.value.toString())
                ? "bg-gold/20 border border-gold/50"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            <Checkbox
              id={`option-${option.value}`}
              checked={multiSelectedValues.includes(option.value.toString())}
              onCheckedChange={(checked) => {
                handleMultiSelect(option.value.toString(), checked === true);
              }}
              className="border-gold/30 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
            />
            <label
              htmlFor={`option-${option.value}`}
              className="flex-1 text-white/90 cursor-pointer"
            >
              {option.label}
            </label>
          </motion.div>
        ))
      ) : (
        // Botones para selección única
        currentQuestion.options.map((option) => (
          <motion.button
            key={option.value.toString()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectAnswer(currentQuestion.id, option.value.toString())}
            className={`w-full p-3 rounded-lg text-left transition-colors ${
              selectedAnswer === option.value.toString()
                ? "bg-gold/20 border border-gold/50"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            <span className="text-white/90">{option.label}</span>
          </motion.button>
        ))
      )}
    </div>
  );
}
