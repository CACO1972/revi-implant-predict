
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
  handleSelectAnswer
}: AnswerOptionsProps) {
  // Estado para multiselección si es necesario
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    selectedAnswer ? [selectedAnswer] : []
  );

  const handleOptionClick = (value: string) => {
    handleSelectAnswer(currentQuestion.id, value);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (!currentQuestion.multiSelect) {
      handleSelectAnswer(currentQuestion.id, value);
      return;
    }
    
    let newSelected: string[];
    
    if (checked) {
      // Si se selecciona "none", deseleccionar todas las demás opciones
      if (value === "none") {
        newSelected = ["none"];
      } else {
        // Si se selecciona cualquier otra opción, quitar "none" si está presente
        newSelected = [...selectedOptions.filter(opt => opt !== "none"), value];
      }
    } else {
      newSelected = selectedOptions.filter(opt => opt !== value);
    }
    
    setSelectedOptions(newSelected);
    // Para multi-selección, unimos las opciones con comas
    handleSelectAnswer(currentQuestion.id, newSelected.join(","));
  };

  return (
    <div className="mb-6">
      {currentQuestion.multiSelect ? (
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <motion.div 
              key={option.value.toString()}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center p-3 rounded-md transition-all
                hover:bg-white/5 cursor-pointer
              `}
              onClick={() => {
                const isChecked = !selectedOptions.includes(option.value.toString());
                handleCheckboxChange(option.value.toString(), isChecked);
              }}
            >
              <Checkbox
                id={`option-${option.value}`}
                checked={selectedOptions.includes(option.value.toString())}
                onCheckedChange={(checked) => {
                  handleCheckboxChange(option.value.toString(), !!checked);
                }}
                className="border-[#1EAEDB]/30 data-[state=checked]:bg-[#1EAEDB] data-[state=checked]:border-[#1EAEDB]"
              />
              <label
                htmlFor={`option-${option.value}`}
                className="ml-3 text-sm text-white/90 cursor-pointer"
              >
                {option.label}
              </label>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <motion.div
              key={option.value.toString()}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center p-4 rounded-md transition-all
                border border-transparent
                ${
                  selectedAnswer === option.value.toString()
                    ? "bg-[#1EAEDB]/10 border-[#1EAEDB]/30"
                    : "hover:bg-white/5"
                }
                cursor-pointer
              `}
              onClick={() => handleOptionClick(option.value.toString())}
            >
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex-shrink-0
                  ${
                    selectedAnswer === option.value.toString()
                      ? "border-[#1EAEDB] bg-[#1EAEDB]/20"
                      : "border-white/30"
                  }
                `}
              >
                {selectedAnswer === option.value.toString() && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2.5 h-2.5 bg-[#1EAEDB] rounded-full m-auto"
                  />
                )}
              </div>
              <label className="ml-3 text-sm text-white/90 cursor-pointer">
                {option.label}
              </label>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
