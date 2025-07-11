
import React, { useState } from "react";
import { Question } from "@/types/implant";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import RioResponseReaction from "../RioResponseReaction";
import DentalQuestionSelector from "./DentalQuestionSelector";

interface QuestionOptionsProps {
  question: Question;
  selectedValues: (string | number)[];
  onSelectionChange: (values: (string | number)[]) => void;
}

export default function QuestionOptions({ question, selectedValues, onSelectionChange }: QuestionOptionsProps) {
  const [showReaction, setShowReaction] = useState(false);
  const [lastSelectedAnswer, setLastSelectedAnswer] = useState<string>("");

  const handleSingleSelect = (value: string) => {
    onSelectionChange([value]);
    setLastSelectedAnswer(value);
    setShowReaction(true);
    
    // Ocultar reacción después de un tiempo
    setTimeout(() => setShowReaction(false), 4000);
  };

  const handleMultiSelect = (value: string, checked: boolean) => {
    let newValues: (string | number)[];
    if (checked) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter(v => v !== value);
    }
    onSelectionChange(newValues);
  };

  // Pregunta 4 - Selector dental interactivo (nueva ubicación)
  if (question.id === 4) {
    return (
      <div className="space-y-4">
        <DentalQuestionSelector 
          selectedValues={selectedValues}
          onSelectionChange={onSelectionChange}
        />
        
        {/* Reacción de Río cuando se selecciona */}
        {showReaction && (
          <RioResponseReaction 
            questionId={question.id}
            selectedAnswer={lastSelectedAnswer}
            isVisible={showReaction}
          />
        )}
      </div>
    );
  }

  // Para preguntas multi-select (excepto la 4)
  if (question.multiSelect) {
    return (
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <Checkbox
              id={`option-${option.value}`}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) => handleMultiSelect(option.value.toString(), checked as boolean)}
              className="border-[#178582] data-[state=checked]:bg-[#178582]"
            />
            <Label
              htmlFor={`option-${option.value}`}
              className="text-white/90 cursor-pointer flex-1"
            >
              {option.label}
            </Label>
          </motion.div>
        ))}
      </div>
    );
  }

  // Para preguntas de selección única
  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedValues[0]?.toString() || ""}
        onValueChange={handleSingleSelect}
        className="space-y-3"
      >
        {question.options.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-[#178582]/30">
              <RadioGroupItem
                value={option.value.toString()}
                id={`option-${option.value}`}
                className="border-[#178582] text-[#178582]"
              />
              <Label
                htmlFor={`option-${option.value}`}
                className="text-white/90 cursor-pointer flex-1 font-medium"
              >
                {option.label}
              </Label>
            </div>
          </motion.div>
        ))}
      </RadioGroup>
      
      {/* Reacción de Río cuando se selecciona una opción */}
      {showReaction && (
        <RioResponseReaction 
          questionId={question.id}
          selectedAnswer={lastSelectedAnswer}
          isVisible={showReaction}
        />
      )}
    </div>
  );
}
