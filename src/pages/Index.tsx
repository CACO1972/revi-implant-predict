
import { useState } from "react";
import Welcome from "@/components/Welcome";
import QuestionCard from "@/components/QuestionCard";
import ResultsCard from "@/components/ResultsCard";
import DentalIcon from "@/components/DentalIcon";
import { PatientInfo, Answer, AssessmentResult } from "@/types/implant";
import { questions } from "@/data/questions";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";

enum AppState {
  WELCOME,
  QUESTIONS,
  RESULTS
}

export default function Index() {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: "", age: null });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  
  const handleStart = (info: PatientInfo) => {
    setPatientInfo(info);
    setAppState(AppState.QUESTIONS);
  };
  
  const handleAnswer = (answer: Answer) => {
    // Update or add new answer
    const existingIndex = answers.findIndex(a => a.questionId === answer.questionId);
    
    if (existingIndex >= 0) {
      // Update existing answer
      const newAnswers = [...answers];
      newAnswers[existingIndex] = answer;
      setAnswers(newAnswers);
    } else {
      // Add new answer
      setAnswers([...answers, answer]);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final result
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-dental-gray-light to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DentalIcon className="text-dental-blue" size={36} />
            <h1 className="text-3xl font-bold text-dental-blue">ImplantDX</h1>
          </div>
          <p className="text-dental-blue-dark">Predictor de éxito en implantes dentales</p>
        </header>
        
        <main>
          {appState === AppState.WELCOME && (
            <Welcome onStart={handleStart} />
          )}
          
          {appState === AppState.QUESTIONS && (
            <div className="flex flex-col items-center">
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
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-dental-blue h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          {appState === AppState.RESULTS && result && (
            <ResultsCard
              patientInfo={patientInfo}
              result={result}
              onRestart={handleRestart}
            />
          )}
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 ImplantDX - Evaluación clínica basada en IA</p>
          <p className="mt-1">Este es un sistema de predicción y no reemplaza la evaluación profesional</p>
        </footer>
      </div>
    </div>
  );
}
