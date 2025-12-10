import { useState } from "react";
import { Question } from "@/types/implant";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import DentalQuestionSelector from "./DentalQuestionSelector";

interface QuestionOptionsProps {
  question: Question;
  selectedValues: (string | number)[];
  onSelectionChange: (values: (string | number)[]) => void;
}

export default function QuestionOptions({ question, selectedValues, onSelectionChange }: QuestionOptionsProps) {
  // Pregunta 4 - Selector dental interactivo
  if (question.id === 4) {
    return (
      <DentalQuestionSelector 
        selectedValues={selectedValues}
        onSelectionChange={onSelectionChange}
      />
    );
  }

  const handleOptionClick = (value: string | number) => {
    if (question.multiSelect) {
      if (selectedValues.includes(value)) {
        onSelectionChange(selectedValues.filter(v => v !== value));
      } else {
        onSelectionChange([...selectedValues, value]);
      }
    } else {
      onSelectionChange([value]);
    }
  };

  return (
    <div className="space-y-3">
      {question.options.map((option, index) => {
        const isSelected = selectedValues.includes(option.value);
        
        return (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleOptionClick(option.value)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              isSelected 
                ? 'border-primary bg-primary/5 shadow-sm' 
                : 'border-border hover:border-primary/40 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isSelected 
                  ? 'border-primary bg-primary' 
                  : 'border-muted-foreground/40'
              }`}>
                {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
              
              <span className={`font-medium transition-colors ${
                isSelected ? 'text-foreground' : 'text-foreground/80'
              }`}>
                {option.label}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
