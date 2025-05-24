
import { useState, useEffect } from "react";
import { Question, Answer } from "@/types/implant";
import { getScoreFromOptions } from "@/utils/assessmentUtils";
import { motion } from "framer-motion";
import QuestionHeader from "./question/QuestionHeader";
import QuestionOptions from "./question/QuestionOptions";
import RecommendationBox from "./question/RecommendationBox";
import NavigationButtons from "./question/NavigationButtons";
import { HelpCircle, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // Reset selected values when question changes
    setSelectedValues(currentAnswer?.selectedValues || []);
    setError(false);
    setShowHelp(false);
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

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  // Brinda información adicional basada en la pregunta actual
  const getAdditionalInfo = () => {
    const infoMap: Record<number, string> = {
      1: "Los estudios muestran que los fumadores tienen hasta 2.5 veces más riesgo de fracaso en implantes comparado con no fumadores.",
      2: "La diabetes controlada (HbA1c < 7%) no contraindica los implantes, pero es importante mantener un buen control metabólico.",
      3: "El bruxismo no tratado puede aumentar el riesgo de aflojamiento de tornillos protésicos y fractura de componentes en un 30%.",
      4: "Después de 1 año sin dientes, se puede perder hasta 25% del volumen óseo, y después de 3 años, hasta 40-60%.",
      5: "Existen soluciones como implantes All-on-4 que pueden reemplazar todos los dientes con solo 4-6 implantes por arcada.",
      6: "La mandíbula anterior tiene la mayor densidad ósea (tipo 1-2), mientras que el maxilar posterior suele tener la menor (tipo 3-4).",
      7: "Tratar la periodontitis activa antes de colocar implantes reduce el riesgo de periimplantitis hasta en un 70%.",
      8: "La periodontitis como causa de pérdida dental requiere un seguimiento más estricto, ya que aumenta el riesgo de periimplantitis.",
      9: "Los estudios muestran que la mala higiene oral aumenta 5 veces el riesgo de complicaciones en implantes.",
      10: "La motivación del paciente es un factor clave en el cumplimiento del tratamiento y mantenimiento a largo plazo.",
      11: "El dolor postoperatorio suele ser menor al esperado: el 85% de los pacientes lo califican como leve o moderado.",
      12: "Un implante previo fallido no contraindica un nuevo intento, pero es crucial analizar las causas del fracaso anterior.",
      13: "Enfermedades como artritis reumatoide o lupus pueden requerir protocolos especiales y mayor tiempo de cicatrización.",
      14: "Los bifosfonatos orales por menos de 3 años generalmente no contraindican implantes, pero los intravenosos requieren evaluación especial."
    };

    return infoMap[question.id] || "Esta pregunta forma parte de los criterios clínicos validados para determinar tu compatibilidad con implantes dentales.";
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
      <div className="flex justify-between items-start mb-4">
        <QuestionHeader question={question} />
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-[#BFA181] hover:text-[#BFA181]/80 hover:bg-[#BFA181]/10"
          onClick={toggleHelp}
        >
          <HelpCircle size={20} />
        </Button>
      </div>

      {/* Panel de ayuda */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 bg-[#178582]/10 border border-[#178582]/20 rounded-lg p-4"
          >
            <div className="flex items-start gap-2">
              <Info size={18} className="text-[#178582] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-white/90 mb-2">Información adicional:</p>
                <p className="text-xs text-white/70">{getAdditionalInfo()}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-red-400 text-xs mt-2"
          >
            <AlertCircle size={14} />
            <span>Por favor, selecciona al menos una opción</span>
          </motion.div>
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
