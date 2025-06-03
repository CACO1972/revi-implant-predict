import { useState, useEffect } from "react";
import { Question, Answer } from "@/types/implant";
import { getScoreFromOptions } from "@/utils/assessmentUtils";
import { motion, AnimatePresence } from "framer-motion";
import QuestionOptions from "./question/QuestionOptions";
import RecommendationBox from "./question/RecommendationBox";
import NavigationButtons from "./question/NavigationButtons";
import RioQuestionPresenter from "./RioQuestionPresenter";
import { AlertCircle } from "lucide-react";

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
  const [showOptions, setShowOptions] = useState(false);

  // Calcular número de pregunta basado en el ID
  const questionNumber = question.id;
  const totalQuestions = 9; // Total de preguntas en el cuestionario

  useEffect(() => {
    console.log('QuestionCard - question.id:', question.id);
    console.log('QuestionCard - question:', question);
    
    // Reset selected values when question changes
    setSelectedValues(currentAnswer?.selectedValues || []);
    setError(false);
    setShowOptions(false);
    
    // Mostrar opciones después de que Río presente la pregunta
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 2500);
    
    return () => clearTimeout(timer);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto glass-panel p-8 shadow-lg backdrop-blur-lg"
    >
      {/* Río presentando la pregunta */}
      <RioQuestionPresenter 
        question={question}
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
      />

      {/* Opciones de respuesta */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 space-y-6"
          >
            <QuestionOptions 
              question={question}
              selectedValues={selectedValues}
              onSelectionChange={handleSelectionChange}
            />
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3"
              >
                <AlertCircle size={16} />
                <span>Río necesita que selecciones una opción para continuar</span>
              </motion.div>
            )}
            
            <RecommendationBox questionId={question.id} />

            <NavigationButtons 
              onNext={handleNext}
              onPrevious={onPrevious}
              isFirst={isFirst}
              isLast={isLast}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
