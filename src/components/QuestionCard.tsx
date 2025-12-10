import { useState, useEffect } from "react";
import { Question, Answer } from "@/types/implant";
import { getScoreFromOptions } from "@/utils/assessmentUtils";
import { motion, AnimatePresence } from "framer-motion";
import QuestionOptions from "./question/QuestionOptions";
import NavigationButtons from "./question/NavigationButtons";
import { AlertCircle, HelpCircle } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentAnswer?: Answer;
  patientName?: string;
}

export default function QuestionCard({
  question,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  currentAnswer,
  patientName
}: QuestionCardProps) {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    currentAnswer?.selectedValues || []
  );
  const [error, setError] = useState(false);

  const questionNumber = question.id;
  const totalQuestions = 9;

  useEffect(() => {
    setSelectedValues(currentAnswer?.selectedValues || []);
    setError(false);
  }, [question.id, currentAnswer]);

  const handleSelectionChange = (values: (string | number)[]) => {
    setSelectedValues(values);
    setError(false);
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
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="clinical-card shadow-clinical-lg p-8 space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Pregunta {questionNumber} de {totalQuestions}
          </span>
          <span className="text-sm text-primary font-medium">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="progress-bar mb-6">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }} 
          />
        </div>

        {/* Question */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
            {question.title}
          </h2>
          
          {question.explanation && (
            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
              <HelpCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="pt-2">
          <QuestionOptions 
            question={question}
            selectedValues={selectedValues}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg p-3"
            >
              <AlertCircle size={16} />
              <span>Por favor selecciona una opción para continuar</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <NavigationButtons 
          onNext={handleNext}
          onPrevious={onPrevious}
          isFirst={isFirst}
          isLast={isLast}
        />
      </div>
    </motion.div>
  );
}
