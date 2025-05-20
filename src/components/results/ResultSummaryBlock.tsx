
import { AssessmentResult } from "@/types/implant";
import { motion } from "framer-motion";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ResultSummaryBlockProps {
  result: AssessmentResult;
  getColorByLevel: () => string;
  getBgColorByLevel: () => string;
}

export default function ResultSummaryBlock({
  result,
  getColorByLevel,
  getBgColorByLevel,
}: ResultSummaryBlockProps) {
  const getScoreDescription = () => {
    switch (result.level) {
      case 1:
        return "Tu puntuación indica condiciones muy favorables para implantes dentales, con excelente pronóstico.";
      case 2:
        return "Tu puntuación indica buenas condiciones para implantes, con algunas consideraciones menores.";
      case 3:
        return "Tu puntuación sugiere que existen algunos factores que requieren atención antes del tratamiento.";
      case 4:
        return "Tu puntuación indica que hay varios factores importantes que deben abordarse antes de considerar implantes.";
      default:
        return "Consulta con un profesional para una evaluación personalizada.";
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`p-6 rounded-2xl mb-6 ${getBgColorByLevel()} border border-white/10`}
    >
      <div className="flex flex-col items-center">
        <div className="text-5xl font-bold mb-3">
          <span className={getColorByLevel()}>{result.totalScore}/16</span>
        </div>
        <h3 className={`text-xl font-semibold mb-1 ${getColorByLevel()}`}>
          Nivel {result.level}: {result.prediction}
        </h3>
        <div className="flex items-center mt-2 text-center">
          <p className="text-white/70 text-sm">
            {getScoreDescription()}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 ml-1 text-white/50 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p className="text-xs text-center">
                  Esta evaluación preliminar se basa en la información proporcionada. Una consulta presencial permitirá una evaluación más precisa y personalizada.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
}
