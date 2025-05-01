
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Question } from "@/types/implant";
import { demoQuestions } from "@/data/demoQuestions";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";

export default function InstagramDemo() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [name, setName] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  
  const handleNext = () => {
    if (currentStep < demoQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const handleSelectAnswer = (questionId: number, value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: value
    });
  };
  
  const handleStart = () => {
    setCurrentStep(1);
  };
  
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const currentQuestion = demoQuestions[currentStep - 1];
  const hasSelectedAnswer = currentQuestion ? Boolean(selectedAnswers[currentQuestion.id]) : true;
  
  const renderLogo = () => (
    <motion.div 
      className="mb-8"
      animate={{ 
        y: [0, -10, 0],
        filter: ["drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))", 
                 "drop-shadow(0 0 25px rgba(23, 133, 130, 0.5))", 
                 "drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))"]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <img 
        src="/lovable-uploads/846506fe-9bf3-421d-913e-bfd48b9feb05.png"
        alt="ImplantX Logo"
        className="h-16 w-auto mx-auto"
      />
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      <div className="max-w-md w-full mx-auto z-10 relative">
        {renderLogo()}
        
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-6 text-center"
            >
              <h1 className="text-2xl font-bold gold-gradient-text mb-6">
                Evaluación de implantes dentales
              </h1>
              
              <p className="text-white/80 mb-6">
                Este test evalúa si eres buen candidato para implantes dentales en solo 60 segundos.
              </p>
              
              <div className="mb-6">
                <label className="block text-white/80 text-sm mb-2" htmlFor="name">
                  Tu nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Ingresa tu nombre"
                  className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-primary focus:border-primary"
                />
              </div>
              
              <Button
                onClick={handleStart}
                disabled={!name.trim()}
                className="group w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white py-3 rounded-xl shadow-glow transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Comenzar evaluación
              </Button>
            </motion.div>
          )}
          
          {currentStep > 0 && currentStep <= demoQuestions.length && (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-6"
            >
              <div className="mb-4">
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-gold h-2 rounded-full"
                    style={{ width: `${(currentStep / demoQuestions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-white/60 text-xs mt-1 text-right">
                  {currentStep} de {demoQuestions.length}
                </p>
              </div>
              
              <h2 className="text-lg font-bold text-gold mb-4">
                {currentQuestion.title}
              </h2>
              
              <p className="text-white/70 text-sm mb-6">
                {currentQuestion.explanation}
              </p>
              
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.value.toString()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectAnswer(currentQuestion.id, option.value.toString())}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedAnswers[currentQuestion.id] === option.value.toString()
                        ? "bg-gold/20 border border-gold/50"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-white/90">{option.label}</span>
                  </motion.button>
                ))}
              </div>
              
              <Button
                onClick={handleNext}
                disabled={!hasSelectedAnswer}
                className="w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white py-3 rounded-xl shadow-glow transition-all duration-300"
              >
                Siguiente
              </Button>
            </motion.div>
          )}
          
          {completed && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-6 text-center"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  filter: ["drop-shadow(0 0 15px rgba(191, 161, 129, 0.4))", 
                          "drop-shadow(0 0 25px rgba(191, 161, 129, 0.6))", 
                          "drop-shadow(0 0 15px rgba(191, 161, 129, 0.4))"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/30 to-primary/20 flex items-center justify-center"
              >
                <Sparkles size={40} className="text-gold animate-pulse" />
              </motion.div>
              
              <h2 className="text-2xl font-bold gold-gradient-text mb-4">
                ¡Gracias, {name}!
              </h2>
              
              <p className="text-white/80 mb-6">
                Visita nuestra web para obtener tu evaluación completa y descubrir si eres candidato para implantes dentales.
              </p>
              
              <div className="space-y-4">
                <a
                  href="https://implantdx.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gold hover:bg-gold/90 text-starry py-3 px-4 rounded-xl shadow-gold-glow transition-all duration-300 border border-gold/30"
                >
                  Obtener evaluación completa
                </a>
                <a
                  href="https://instagram.com/reviveai.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white/70 hover:text-white/90 transition-colors"
                >
                  <span className="mr-1">Síguenos en</span>
                  <span className="font-bold">@reviveai.cl</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
