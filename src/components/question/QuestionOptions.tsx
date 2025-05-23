
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/implant";
import { motion } from "framer-motion";

interface QuestionOptionsProps {
  question: Question;
  selectedValues: (string | number)[];
  onSelectionChange: (values: (string | number)[]) => void;
}

export default function QuestionOptions({ 
  question, 
  selectedValues, 
  onSelectionChange 
}: QuestionOptionsProps) {
  
  const handleSingleSelect = (value: string | number) => {
    onSelectionChange([value]);
  };

  const handleMultiSelect = (value: string | number, checked: boolean) => {
    // Special case for "none" option in conditions question
    if (question.id === 7) {
      if (value === "none" && checked) {
        // If "none" is selected, clear all other selections
        onSelectionChange(["none"]);
      } else if (checked) {
        // If any other option is selected, remove "none" if it's present
        onSelectionChange(
          selectedValues.includes("none") 
            ? [value] 
            : [...selectedValues.filter(v => v !== value), value]
        );
      } else {
        // If unchecking an option
        onSelectionChange(selectedValues.filter(v => v !== value));
      }
      return;
    }
    
    if (checked) {
      onSelectionChange([...selectedValues, value]);
    } else {
      onSelectionChange(selectedValues.filter(v => v !== value));
    }
  };

  if (question.multiSelect) {
    return (
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.div 
            key={option.value.toString()} 
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Checkbox
              id={`option-${option.value}`}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) => {
                handleMultiSelect(option.value, checked === true);
              }}
              className="border-gold/30 data-[state=checked]:bg-[#1EAEDB] data-[state=checked]:border-[#1EAEDB] mt-1"
            />
            <Label
              htmlFor={`option-${option.value}`}
              className="text-sm font-light text-white/90 leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {option.label}
            </Label>
          </motion.div>
        ))}
      </div>
    );
  } 
  
  return (
    <RadioGroup
      value={selectedValues[0]?.toString()}
      onValueChange={handleSingleSelect}
      className="space-y-4"
    >
      {question.options.map((option, index) => (
        <motion.div 
          key={option.value.toString()} 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <RadioGroupItem 
            value={option.value.toString()} 
            id={`option-${option.value}`}
            className="border-gold/30 text-[#1EAEDB]" 
          />
          <Label
            htmlFor={`option-${option.value}`}
            className="text-sm font-light text-white/90 leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {option.label}
          </Label>
        </motion.div>
      ))}
    </RadioGroup>
  );
}
