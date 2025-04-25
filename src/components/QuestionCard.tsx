
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Question, Answer } from "@/types/implant";
import { getScoreFromOptions } from "@/utils/assessmentUtils";
import { motion } from "framer-motion";
import { Sparkles, Activity } from "lucide-react";

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
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Reset selected values when question changes
    setSelectedValues(currentAnswer?.selectedValues || []);
    setError(false);
  }, [question.id, currentAnswer]);

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
  }, []);

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
    <motion.div 
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto glass-panel p-8 shadow-lg backdrop-blur-lg"
    >
      <div className="relative mb-8">
        {/* Decoración fondo */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-2xl -z-0"></div>
        
        <div className="flex items-start mb-6 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-gold/20 flex-shrink-0 flex items-center justify-center mr-4 p-0.5">
            <div className="w-full h-full bg-starry rounded-full flex items-center justify-center">
              <Activity className="text-gold" size={20} />
            </div>
          </div>
          <div>
            <span className="text-sm gold-gradient-text font-medium tracking-wide">
              Pregunta {question.id} de 11
            </span>
            <h2 className="text-2xl font-bold text-gold mt-1 mb-2 tracking-tight">{question.title}</h2>
            <p className="text-white/80 text-sm mb-4 font-light">{question.explanation}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 pl-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {question.multiSelect ? (
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
                    className="border-gold/30 data-[state=checked]:bg-gold data-[state=checked]:border-gold mt-1"
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
          ) : (
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
                    className="border-gold/30 text-gold" 
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
          )}
        </motion.div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-xs mt-2"
          >
            Por favor, selecciona al menos una opción
          </motion.p>
        )}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 mb-6 p-4 bg-gradient-to-r from-primary/5 to-gold/5 rounded-xl border border-white/5"
      >
        <div className="flex">
          <div className="mr-3 mt-1">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          </div>
          <p className="text-sm text-white/80 font-light">
            <span className="font-medium text-gold">Recomendación: </span>
            {question.recommendation}
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="flex justify-between gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="flex-1 border-white/10 text-white hover:bg-white/5 disabled:opacity-30"
        >
          Anterior
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white shadow-glow transition-all duration-300"
        >
          {isLast ? "Ver resultados" : "Siguiente"}
        </Button>
      </motion.div>
    </motion.div>
  );
}
