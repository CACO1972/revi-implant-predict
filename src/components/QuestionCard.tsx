
import { useState, useEffect } from "react";
import { Question, Answer } from "@/types/implant";
import { getScoreFromOptions } from "@/utils/assessmentUtils";
import { motion } from "framer-motion";
import QuestionHeader from "./question/QuestionHeader";
import QuestionOptions from "./question/QuestionOptions";
import RecommendationBox from "./question/RecommendationBox";
import NavigationButtons from "./question/NavigationButtons";

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
      animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto glass-panel p-8 shadow-lg backdrop-blur-lg"
    >
      <QuestionHeader question={question} />

      <div className="mb-6 pl-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          <QuestionOptions 
            question={question}
            selectedValues={selectedValues}
            onSelectionChange={handleSelectionChange}
          />
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
      
      <RecommendationBox recommendation={question.recommendation} />

      <NavigationButtons 
        onNext={handleNext}
        onPrevious={onPrevious}
        isFirst={isFirst}
        isLast={isLast}
      />
    </motion.div>
  );
}
