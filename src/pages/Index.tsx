
import { useState } from "react";
import Welcome from "@/components/Welcome";
import LandingPage from "@/components/LandingPage";
import QuestionCard from "@/components/QuestionCard";
import ResultsCard from "@/components/ResultsCard";
import DentalIcon from "@/components/DentalIcon";
import { PatientInfo, Answer, AssessmentResult } from "@/types/implant";
import { questions } from "@/data/questions";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";
import { motion, AnimatePresence } from "framer-motion";

enum AppState {
  LANDING,
  WELCOME,
  QUESTIONS,
  RESULTS
}

export default function Index() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: "", age: null });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  
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
    setPatientInfo({ name: "", age: null });
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
    <div className="min-h-screen bg-background py-8 px-4 animated-bg">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DentalIcon className="text-gold animate-star-glow" size={36} />
            <h1 className="text-3xl font-playfair font-bold text-primary">ImplantDX</h1>
          </div>
          <p className="text-white/85 font-light">Predictor de éxito en implantes dentales</p>
        </header>
        
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
                      className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
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
          <p className="mt-1 font-light">Este es un sistema de predicción y no reemplaza la evaluación profesional</p>
        </footer>
      </div>
    </div>
  );
}
