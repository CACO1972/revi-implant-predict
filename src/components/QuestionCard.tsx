
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Question, Answer } from "@/types/implant";
import { getScoreFromOptions } from "@/utils/assessmentUtils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentAnswer?: Answer;
}

export default function QuestionCard({
  question,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  currentAnswer
}: QuestionCardProps) {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    currentAnswer?.selectedValues || []
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset selected values when question changes
    setSelectedValues(currentAnswer?.selectedValues || []);
    setError(false);
  }, [question.id, currentAnswer]);

  const handleSingleSelect = (value: string | number) => {
    setSelectedValues([value]);
    setError(false);
  };

  const handleMultiSelect = (value: string | number, checked: boolean) => {
    setError(false);
    
    // Special case for "none" option in conditions question
    if (question.id === 7) {
      if (value === "none" && checked) {
        // If "none" is selected, clear all other selections
        setSelectedValues(["none"]);
      } else if (checked) {
        // If any other option is selected, remove "none" if it's present
        setSelectedValues(prev => 
          prev.includes("none") 
            ? [value] 
            : [...prev.filter(v => v !== value), value]
        );
      } else {
        // If unchecking an option
        setSelectedValues(prev => prev.filter(v => v !== value));
      }
      return;
    }
    
    if (checked) {
      setSelectedValues(prev => [...prev, value]);
    } else {
      setSelectedValues(prev => prev.filter(v => v !== value));
    }
  };

  const handleNext = () => {
    if (selectedValues.length === 0) {
      setError(true);
      return;
    }

    const score = getScoreFromOptions(question.id, selectedValues);
    
    onAnswer({
      questionId: question.id,
      selectedValues,
      score
    });
    
    onNext();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-button-dark/30 backdrop-blur-sm p-8 rounded-3xl shadow-soft border border-white/10 transition-all duration-300">
      <div className="mb-4">
        <span className="text-sm text-gold font-medium">
          Pregunta {question.id} de 11
        </span>
        <h2 className="text-2xl font-bold text-primary mt-2 mb-3">{question.title}</h2>
        <p className="text-white/80 text-sm mb-4">{question.explanation}</p>
      </div>

      <div className="mb-6">
        {question.multiSelect ? (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option.value.toString()} className="flex items-start space-x-2">
                <Checkbox
                  id={`option-${option.value}`}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    handleMultiSelect(option.value, checked === true);
                  }}
                  className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={`option-${option.value}`}
                  className="text-sm font-medium text-white/90 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        ) : (
          <RadioGroup
            value={selectedValues[0]?.toString()}
            onValueChange={handleSingleSelect}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div key={option.value.toString()} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value.toString()} 
                  id={`option-${option.value}`}
                  className="border-white/20 text-primary" 
                />
                <Label
                  htmlFor={`option-${option.value}`}
                  className="text-sm font-medium text-white/90 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {error && (
          <p className="text-red-400 text-xs mt-2">
            Por favor, selecciona al menos una opción
          </p>
        )}
      </div>
      
      <div className="mt-2 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
        <p className="text-sm text-white/80">
          <span className="font-semibold text-gold">Recomendación: </span>
          {question.recommendation}
        </p>
      </div>

      <div className="flex justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="flex-1 border-white/20 text-white hover:bg-white/5 disabled:opacity-30"
        >
          Anterior
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="flex-1 bg-primary hover:bg-primary-dark text-white shadow-glow"
        >
          {isLast ? "Ver resultados" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
