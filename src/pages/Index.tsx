
import { useState, useEffect } from "react";
import Welcome from "@/components/Welcome";
import LandingPage from "@/components/LandingPage";
import QuestionCard from "@/components/QuestionCard";
import ResultsCard from "@/components/ResultsCard";
import { PatientInfo, Answer, AssessmentResult } from "@/types/implant";
import { questions } from "@/data/questions";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import ReviAssistant from "@/components/ReviAssistant";

enum AppState {
  LANDING,
  WELCOME,
  QUESTIONS,
  RESULTS,
}

export default function Index() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    age: null
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  
  // Mensajes del asistente virtual Revi según el estado actual
  const getReviMessages = () => {
    switch (appState) {
      case AppState.LANDING:
        return ["¡Hola! Soy Revi, tu asistente virtual dental. Estoy aquí para ayudarte con tu evaluación de implantes."];
      case AppState.WELCOME:
        return ["Para empezar, necesito algunos datos básicos. ¡No te preocupes, la información que compartas es confidencial!"];
      case AppState.QUESTIONS:
        const question = questions[currentQuestionIndex];
        return [
          `Pregunta ${currentQuestionIndex + 1} de ${questions.length}: ${question.title}`,
          question.explanation,
          question.recommendation
        ];
      case AppState.RESULTS:
        return [
          "¡Hemos completado tu evaluación!",
          "Revisa el resultado y mis recomendaciones personalizadas.",
          "Si tienes preguntas, puedes contactar a un especialista."
        ];
      default:
        return ["¡Estoy aquí para ayudarte con tu evaluación de implantes dentales!"];
    }
  };

  const handleStart = (info: PatientInfo) => {
    setPatientInfo(info);
    setAppState(AppState.QUESTIONS);
  };
  
  const handleAnswer = (answer: Answer) => {
    const existingIndex = answers.findIndex(a => a.questionId === answer.questionId);
    if (existingIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingIndex] = answer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, answer]);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const totalScore = calculateScore(answers);
      const assessmentResult = evaluateResult(totalScore);
      setResult(assessmentResult);
      setAppState(AppState.RESULTS);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleRestart = () => {
    setAppState(AppState.WELCOME);
    setPatientInfo({
      name: "",
      age: null
    });
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };
  
  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === questions[currentQuestionIndex].id);
  };
  
  const handleLandingComplete = () => {
    setAppState(AppState.WELCOME);
  };
  
  return (
    <div className="min-h-screen py-8 px-4 overflow-hidden relative">
      <AnimatedStarryBackground />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <main>
          <AnimatePresence mode="wait">
            {appState === AppState.LANDING && (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LandingPage onStart={handleLandingComplete} />
              </motion.div>
            )}
            
            {appState === AppState.WELCOME && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Welcome onStart={handleStart} />
              </motion.div>
            )}
            
            {appState === AppState.QUESTIONS && (
              <motion.div
                key="questions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <QuestionCard
                  question={questions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  isFirst={currentQuestionIndex === 0}
                  isLast={currentQuestionIndex === questions.length - 1}
                  currentAnswer={getCurrentAnswer()}
                />
                
                <div className="mt-6 w-full max-w-md">
                  <div className="w-full bg-white/10 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-primary to-gold h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-white/60 text-xs mt-2 text-center">
                    Pregunta {currentQuestionIndex + 1} de {questions.length}
                  </p>
                </div>
              </motion.div>
            )}
            
            {appState === AppState.RESULTS && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResultsCard
                  patientInfo={patientInfo}
                  result={result}
                  onRestart={handleRestart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <footer className="mt-12 text-center text-sm text-white/50">
          <p>© 2025 ImplantDX - Evaluación clínica basada en IA</p>
          <p className="mt-1 font-light text-xs">Este es un sistema de predicción y no reemplaza la evaluación profesional</p>
        </footer>
      </div>
      
      <ReviAssistant 
        messages={getReviMessages()} 
        currentStep={appState === AppState.QUESTIONS ? currentQuestionIndex + 1 : 0}
        totalSteps={appState === AppState.QUESTIONS ? questions.length : 0}
      />
    </div>
  );
}
