
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Coffee, Heart, Zap, ArrowRight, Timer } from "lucide-react";

interface MidAssessmentBreakProps {
  patientName: string;
  onContinue: () => void;
}

const funFacts = [
  "🦷 Los implantes dentales tienen una tasa de éxito del 95-98%",
  "🏆 El primer implante dental se colocó en 1965 ¡y duró 40 años!",
  "🔬 El titanio se fusiona con el hueso en un proceso llamado osteointegración",
  "😊 Los implantes pueden mejorar la digestión al restaurar la masticación",
  "🎯 Un implante puede durar toda la vida con el cuidado adecuado"
];

const motivationalMessages = [
  "¡Vas súper bien! Ya estamos a mitad de camino.",
  "¡Excelente! Tus respuestas son muy útiles para el análisis.",
  "¡Perfecto! Solo quedan unas pocas preguntas más.",
  "¡Fantástico! Estás muy cerca de conocer tu resultado."
];

export default function MidAssessmentBreak({ patientName, onContinue }: MidAssessmentBreakProps) {
  const [currentFact, setCurrentFact] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Rotar datos curiosos cada 2 segundos
    const factInterval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % funFacts.length);
    }, 2000);

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Permitir saltar después de 3 segundos
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 3000);

    return () => {
      clearInterval(factInterval);
      clearInterval(timer);
      clearTimeout(skipTimer);
    };
  }, []);

  const firstName = patientName.split(' ')[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-lg mx-auto"
    >
      <Card className="glass-panel border-[#178582]/30 overflow-hidden">
        <CardContent className="p-8 text-center">
          {/* Icono animado */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#178582] to-[#BFA181] rounded-full flex items-center justify-center"
          >
            <Coffee className="w-8 h-8 text-white" />
          </motion.div>

          {/* Título */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white mb-4"
          >
            ¡Momento de pausa, {firstName}! ☕
          </motion.h2>

          {/* Mensaje motivacional */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 mb-6"
          >
            {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
          </motion.p>

          {/* Datos curiosos rotativos */}
          <div className="bg-gradient-to-r from-[#178582]/20 to-[#BFA181]/20 rounded-lg p-4 mb-6 min-h-[80px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#BFA181]" />
                  <span className="text-[#BFA181] font-medium text-sm">¿Sabías que...?</span>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  {funFacts[currentFact]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-[#178582] rounded-full"></div>
              <div className="w-3 h-3 bg-[#178582] rounded-full"></div>
              <div className="w-3 h-3 bg-[#178582] rounded-full"></div>
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
            <p className="text-white/60 text-xs">Progreso: 60% completado</p>
          </div>

          {/* Timer y botón */}
          <div className="space-y-4">
            {timeLeft > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 text-white/60 text-sm"
              >
                <Timer className="w-4 h-4" />
                <span>Continuando automáticamente en {timeLeft}s</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: canSkip ? 1 : 0.5, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={onContinue}
                disabled={!canSkip}
                className="bg-gradient-to-r from-[#178582] to-[#BFA181] hover:from-[#178582]/90 hover:to-[#BFA181]/90 text-white px-8 py-3 rounded-xl font-medium shadow-glow transition-all duration-300"
              >
                <span>Continuar evaluación</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>

          {/* Mensaje de ánimo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-green-400" />
              <p className="text-green-100 text-sm">
                ¡Estás haciendo un gran trabajo cuidando tu salud dental!
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
