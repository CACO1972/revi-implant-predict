
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Cigarette, Heart, Smile, Clock, Teeth, MapPin, AlertTriangle, Brush, Target, HelpCircle } from "lucide-react";
import RioInteractiveAssistant from "./RioInteractiveAssistant";

const miniQuestions = [
  {
    id: 1,
    icon: <Cigarette className="w-6 h-6" />,
    title: "¿Fumas actualmente?",
    options: [
      { value: "never", label: "Nunca he fumado", score: 0 },
      { value: "quit_old", label: "Dejé hace +5 años", score: 1 },
      { value: "quit_recent", label: "Dejé hace -5 años", score: 2 },
      { value: "occasional", label: "Ocasionalmente", score: 3 },
      { value: "regular", label: "Regularmente", score: 4 }
    ]
  },
  {
    id: 2,
    icon: <Heart className="w-6 h-6" />,
    title: "¿Tienes diabetes?",
    options: [
      { value: "no", label: "No tengo diabetes", score: 0 },
      { value: "controlled", label: "Sí, bien controlada", score: 1 },
      { value: "uncontrolled", label: "Sí, mal controlada", score: 3 }
    ]
  },
  {
    id: 3,
    icon: <Clock className="w-6 h-6" />,
    title: "¿Cuánto tiempo llevas sin dientes?",
    options: [
      { value: "recent", label: "Menos de 6 meses", score: 0 },
      { value: "medium", label: "6 meses - 2 años", score: 1 },
      { value: "long", label: "2-5 años", score: 2 },
      { value: "very_long", label: "Más de 5 años", score: 3 }
    ]
  },
  {
    id: 4,
    icon: <Teeth className="w-6 h-6" />,
    title: "¿Cuántos dientes necesitas reemplazar?",
    options: [
      { value: "one", label: "1 diente", score: 0 },
      { value: "few", label: "2-3 dientes", score: 1 },
      { value: "several", label: "4-8 dientes", score: 2 },
      { value: "many", label: "Más de 8", score: 3 }
    ]
  },
  {
    id: 5,
    icon: <Brush className="w-6 h-6" />,
    title: "¿Cómo describes tu higiene oral?",
    options: [
      { value: "excellent", label: "Excelente", score: 0 },
      { value: "good", label: "Buena", score: 1 },
      { value: "fair", label: "Regular", score: 2 },
      { value: "poor", label: "Deficiente", score: 3 }
    ]
  }
];

export default function DynamicQuestionnaireDemo() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < miniQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / miniQuestions.length) * 100;
  const currentQ = miniQuestions[currentQuestion];
  const hasAnswer = answers[currentQ?.id];

  if (isCompleted) {
    const totalScore = Object.keys(answers).reduce((sum, qId) => {
      const question = miniQuestions.find(q => q.id === parseInt(qId));
      const answer = answers[parseInt(qId)];
      const option = question?.options.find(opt => opt.value === answer);
      return sum + (option?.score || 0);
    }, 0);

    const getResult = () => {
      if (totalScore <= 3) return { level: "Alto", color: "text-green-400", message: "¡Excelente candidato!" };
      if (totalScore <= 6) return { level: "Moderado", color: "text-yellow-400", message: "Buen candidato con consideraciones" };
      return { level: "Requiere evaluación", color: "text-orange-400", message: "Necesitas valoración especializada" };
    };

    const result = getResult();

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#178582] to-[#BFA181] rounded-full flex items-center justify-center">
          <Smile className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">¡Evaluación Completada!</h3>
          <p className="text-white/70">Nivel de candidatura:</p>
          <p className={`text-xl font-bold ${result.color}`}>{result.level}</p>
          <p className="text-white/80 text-sm mt-2">{result.message}</p>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-xs text-white/60 mb-2">Puntuación total: {totalScore}/15</p>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#178582] to-[#BFA181] h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((15 - totalScore) / 15) * 100}%` }}
            />
          </div>
        </div>

        <RioInteractiveAssistant 
          questionId={999}
          selectedAnswer=""
          compact={true}
        />
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl text-[#178582] mb-2">Evaluación Rápida</h3>
        <p className="text-white/80 text-sm">5 preguntas clave para determinar tu candidatura</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-white/60">
          <span>Pregunta {currentQuestion + 1} de {miniQuestions.length}</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="h-2 bg-white/10" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#178582] text-white w-10 h-10 rounded-full flex items-center justify-center">
              {currentQ.icon}
            </div>
            <h4 className="text-lg text-white font-medium">{currentQ.title}</h4>
          </div>

          <RadioGroup
            value={answers[currentQ.id] || ""}
            onValueChange={(value) => handleAnswer(currentQ.id, value)}
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-white/5 transition-colors"
              >
                <RadioGroupItem 
                  value={option.value} 
                  id={`option-${option.value}`}
                  className="border-[#178582]/30 text-[#178582]"
                />
                <Label 
                  htmlFor={`option-${option.value}`}
                  className="text-white/90 cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between gap-4">
        <Button 
          variant="outline" 
          className="flex-1 border-white/10 text-white hover:bg-white/5"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Anterior
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-[#178582] to-[#BFA181] hover:from-[#178582]/90 hover:to-[#BFA181]/90 text-white"
          onClick={handleNext}
          disabled={!hasAnswer}
        >
          {currentQuestion === miniQuestions.length - 1 ? "Ver Resultado" : "Siguiente"}
        </Button>
      </div>

      <RioInteractiveAssistant 
        questionId={currentQ.id}
        selectedAnswer={answers[currentQ.id] || ""}
        compact={false}
      />
    </div>
  );
}
