
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Award, Zap, Smile, Brain, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InteractiveBreakProps {
  onContinue: () => void;
  patientName: string;
}

const dentalFacts = [
  {
    icon: Sparkles,
    title: "¿Sabías que...?",
    fact: "El esmalte dental es la sustancia más dura del cuerpo humano, ¡más duro que el acero!",
    color: "from-blue-400 to-cyan-400"
  },
  {
    icon: Heart,
    title: "Dato curioso",
    fact: "Tus dientes comienzan a formarse antes de nacer. ¡Los dientes de leche empiezan a desarrollarse en la sexta semana de embarazo!",
    color: "from-pink-400 to-rose-400"
  },
  {
    icon: Brain,
    title: "Increíble pero cierto",
    fact: "Cada diente tiene una 'huella dactilar' única. Los forenses pueden identificar personas por sus dientes.",
    color: "from-purple-400 to-indigo-400"
  },
  {
    icon: Award,
    title: "Récord mundial",
    fact: "El récord de más dientes en una boca humana es de 37 dientes. ¡El promedio es solo 32!",
    color: "from-yellow-400 to-orange-400"
  }
];

const miniGames = [
  {
    name: "Adivina el Diente",
    description: "¿Cuál es el diente más fuerte?",
    options: ["Incisivo", "Canino", "Molar"],
    correct: 2,
    explanation: "¡Los molares son los más fuertes! Pueden ejercer una fuerza de hasta 90 kg."
  },
  {
    name: "Dato Dental",
    description: "¿Cuántas veces al día deberías cepillarte los dientes?",
    options: ["1 vez", "2 veces", "3 veces"],
    correct: 1,
    explanation: "¡Correcto! Dos veces al día es lo recomendado por los dentistas."
  },
  {
    name: "Curiosidad",
    description: "¿Qué animal tiene dientes que crecen toda la vida?",
    options: ["Tiburón", "Elefante", "Ambos"],
    correct: 2,
    explanation: "¡Ambos! Los tiburones regeneran dientes y los colmillos de elefante crecen continuamente."
  }
];

export default function InteractiveBreak({ onContinue, patientName }: InteractiveBreakProps) {
  const [currentStage, setCurrentStage] = useState(0); // 0: intro, 1: fact, 2: game, 3: completion
  const [currentFact, setCurrentFact] = useState(0);
  const [currentGame, setCurrentGame] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showParticles, setShowParticles] = useState(false);

  const firstName = patientName.split(' ')[0];

  useEffect(() => {
    if (currentStage === 0) {
      const timer = setTimeout(() => setCurrentStage(1), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  const handleFactNext = () => {
    setShowParticles(true);
    setTimeout(() => {
      setShowParticles(false);
      setCurrentStage(2);
    }, 1000);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setTimeout(() => {
      setShowResult(true);
      if (index === miniGames[currentGame].correct) {
        setScore(score + 1);
        setShowParticles(true);
      }
    }, 500);
  };

  const handleGameNext = () => {
    if (currentGame < miniGames.length - 1) {
      setCurrentGame(currentGame + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowParticles(false);
    } else {
      setCurrentStage(3);
    }
  };

  const currentFactData = dentalFacts[currentFact];
  const currentGameData = miniGames[currentGame];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1828] via-[#178582] to-[#BFA181] opacity-20" />
      
      {/* Partículas de celebración */}
      <AnimatePresence>
        {showParticles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 10,
                  scale: 0
                }}
                animate={{
                  y: -10,
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 max-w-lg w-full text-center space-y-6"
      >
        <AnimatePresence mode="wait">
          {/* Etapa 0: Introducción */}
          {currentStage === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-16 h-16 text-[#BFA181]" />
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-white">
                ¡Momento de descanso, {firstName}! 🦷
              </h2>
              <p className="text-white/80">
                Mientras procesamos tus respuestas, diviértete con algunos datos curiosos sobre los dientes
              </p>
            </motion.div>
          )}

          {/* Etapa 1: Dato curioso */}
          {currentStage === 1 && (
            <motion.div
              key="fact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <motion.div
                className={`p-6 rounded-xl bg-gradient-to-r ${currentFactData.color} text-white`}
                whileHover={{ scale: 1.05 }}
              >
                <currentFactData.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{currentFactData.title}</h3>
                <p className="text-lg">{currentFactData.fact}</p>
              </motion.div>
              
              <Button
                onClick={handleFactNext}
                className="bg-[#178582] hover:bg-[#178582]/80 text-white px-8 py-3 text-lg"
              >
                ¡Genial! Continuar 🎮
              </Button>
            </motion.div>
          )}

          {/* Etapa 2: Mini-juego */}
          {currentStage === 2 && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-8 h-8 text-[#BFA181]" />
                <h3 className="text-xl font-bold text-white">Mini-Desafío Dental</h3>
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 space-y-4">
                <h4 className="text-lg font-semibold text-white">
                  {currentGameData.description}
                </h4>
                
                <div className="grid gap-3">
                  {currentGameData.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedAnswer === null
                          ? "border-white/30 hover:border-[#178582] hover:bg-[#178582]/20 text-white"
                          : selectedAnswer === index
                          ? index === currentGameData.correct
                            ? "border-green-400 bg-green-400/20 text-green-300"
                            : "border-red-400 bg-red-400/20 text-red-300"
                          : index === currentGameData.correct
                          ? "border-green-400 bg-green-400/20 text-green-300"
                          : "border-white/10 text-white/50"
                      }`}
                      whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className={`p-4 rounded-lg ${
                        selectedAnswer === currentGameData.correct
                          ? "bg-green-400/20 border border-green-400/40"
                          : "bg-blue-400/20 border border-blue-400/40"
                      }`}>
                        <p className="text-white text-sm">
                          {currentGameData.explanation}
                        </p>
                      </div>
                      
                      <Button
                        onClick={handleGameNext}
                        className="bg-[#BFA181] hover:bg-[#BFA181]/80 text-white"
                      >
                        {currentGame < miniGames.length - 1 ? "Siguiente 🎯" : "¡Terminemos! 🎉"}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Etapa 3: Completado */}
          {currentStage === 3 && (
            <motion.div
              key="completion"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <Award className="w-20 h-20 mx-auto text-[#BFA181] mb-4" />
              </motion.div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  ¡Excelente, {firstName}! 🎉
                </h3>
                <p className="text-white/80">
                  Respondiste correctamente {score} de {miniGames.length} preguntas
                </p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(miniGames.length)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < score ? "text-yellow-400 fill-yellow-400" : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <Button
                onClick={onContinue}
                className="bg-gradient-to-r from-[#178582] to-[#BFA181] hover:opacity-90 text-white px-8 py-3 text-lg"
              >
                Continuar con la evaluación 🚀
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
