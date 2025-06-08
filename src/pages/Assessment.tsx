
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";
import AIProcessingScreen from "@/components/ai/AIProcessingScreen";
import IntelligentResultsPresentation from "@/components/ai/IntelligentResultsPresentation";
import { PatientInfo, Question, Answer } from "@/types/implant";
import { questions } from "@/data/questions";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import { calculateScore, evaluateResult, getPersonalizedRecommendations } from "@/utils/assessmentUtils";

export default function Assessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: "", age: null });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  // 0 = patient info, 1-9 = questions, 10 = completed
  const totalSteps = questions.length + 1; // +1 for patient info
  const currentQuestion = currentStep > 0 ? questions[currentStep - 1] : null;

  const handlePatientInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientInfo.name.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu nombre",
        variant: "destructive"
      });
      return;
    }
    if (!patientInfo.age || patientInfo.age < 18 || patientInfo.age > 99) {
      toast({
        title: "Error", 
        description: "Por favor ingresa una edad válida (18-99 años)",
        variant: "destructive"
      });
      return;
    }
    
    sessionStorage.setItem('patientInfo', JSON.stringify(patientInfo));
    setCurrentStep(1);
  };

  const handleAnswerSubmit = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    sessionStorage.setItem('answers', JSON.stringify(newAnswers));
    
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Evaluación completada - generar recomendaciones personalizadas
      const totalScore = calculateScore(newAnswers);
      const result = evaluateResult(totalScore);
      
      // Generar recomendaciones personalizadas basadas en las respuestas específicas
      const personalizedRecommendations = getPersonalizedRecommendations(patientInfo, newAnswers, result);
      
      const finalResult = {
        ...result,
        recommendations: personalizedRecommendations
      };
      
      setAssessmentResult(finalResult);
      setIsCompleted(true);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    sessionStorage.removeItem('patientInfo');
    sessionStorage.removeItem('answers');
    setCurrentStep(0);
    setAnswers([]);
    setPatientInfo({ name: "", age: null });
    setIsCompleted(false);
    setAssessmentResult(null);
  };

  const getColorByLevel = () => {
    if (!assessmentResult) return "text-[#178582]";
    switch (assessmentResult.level) {
      case 1: return "text-emerald-400";
      case 2: return "text-[#178582]";
      case 3: return "text-[#BFA181]";
      case 4: return "text-red-400";
      default: return "text-[#178582]";
    }
  };

  const getBgColorByLevel = () => {
    if (!assessmentResult) return "bg-[#178582]/10";
    switch (assessmentResult.level) {
      case 1: return "bg-emerald-400/10";
      case 2: return "bg-[#178582]/10";
      case 3: return "bg-[#BFA181]/10";
      case 4: return "bg-red-400/10";
      default: return "bg-[#178582]/10";
    }
  };

  if (isCompleted && assessmentResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <AnimatedStarryBackground />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className="glass-panel p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#BFA181] mb-3">
                {patientInfo.name}, aquí están tus resultados
              </h2>
              <p className="text-white/80 text-lg font-light">
                Tu evaluación personalizada de ImplantDX
              </p>
            </div>
            
            <div className={`${getBgColorByLevel()} rounded-xl p-8 mb-8 border border-white/10 text-center`}>
              <div className="mb-4">
                <div className={`text-5xl font-bold ${getColorByLevel()} mb-2`}>
                  {assessmentResult.totalScore}/16
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Nivel {assessmentResult.level}: {assessmentResult.prediction}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-md mx-auto">
                  {assessmentResult.level === 1 && "Tus condiciones son ideales para un tratamiento de implantes con excelente pronóstico."}
                  {assessmentResult.level === 2 && "Presentas buenas condiciones generales con algunos factores menores a considerar."}
                  {assessmentResult.level === 3 && "Existen factores que requieren optimización antes del tratamiento para mejores resultados."}
                  {assessmentResult.level === 4 && "Se han identificado varios factores importantes que necesitan abordarse con un especialista."}
                </p>
              </div>
            </div>

            {/* Recomendaciones personalizadas y empáticas */}
            <div className="space-y-4 mb-8">
              <h4 className="text-[#BFA181] font-semibold text-lg mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Recomendaciones específicas para ti:
              </h4>
              {assessmentResult.recommendations.map((rec: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-[#178582] mt-3 flex-shrink-0"></div>
                  <p className="text-white/85 text-sm leading-relaxed font-light">{rec}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/contacto')}
                className="w-full bg-[#178582] hover:bg-[#178582]/90 text-white shadow-glow border border-[#BFA181]/30 py-4 text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Obtener evaluación profesional personalizada
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRestart}
                className="w-full border-white/20 text-white hover:bg-white/5"
              >
                Realizar nueva evaluación
              </Button>
            </div>
          </div>
        </motion.div>
        
        <RioAssistant 
          isVisible={true} 
          message={`¡${patientInfo.name}, tu evaluación está completa! Estos resultados te darán una excelente base para tu consulta profesional. Recuerda que cada factor identificado es una oportunidad de mejora.`}
        />
        
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      {/* Logo pequeño */}
      <div className="mb-6">
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantX Logo"
          className="h-16 w-auto"
        />
      </div>
      
      <ProgressBar progress={(currentStep / totalSteps) * 100} />
      
      <AnimatePresence mode="wait">
        {currentStep === 0 ? (
          <motion.div
            key="patient-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-panel p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#178582] mb-2">Información Personal</h2>
              <p className="text-white/80">
                Para comenzar, necesitamos algunos datos básicos
              </p>
            </div>
            
            <form onSubmit={handlePatientInfoSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white/90">Nombre completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  placeholder="Escribe tu nombre completo"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="age" className="text-white/90">Edad</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="99"
                  value={patientInfo.age || ""}
                  onChange={(e) => setPatientInfo({ ...patientInfo, age: parseInt(e.target.value) || null })}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  placeholder="Tu edad"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#178582] hover:bg-[#178582]/90 text-white shadow-glow transition-all duration-300 border border-[#BFA181]/30"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Comenzar Evaluación
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>
        ) : currentQuestion ? (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswerSubmit}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentStep === 1}
            isLast={currentStep === questions.length}
            currentAnswer={answers.find(a => a.questionId === currentQuestion.id)}
          />
        ) : null}
      </AnimatePresence>
      
      <RioAssistant 
        isVisible={true} 
        message={
          currentStep === 0 
            ? "¡Hola! Soy Río, tu asistente virtual. Vamos a hacer una evaluación personalizada para saber si eres candidato a implantes dentales." 
            : currentQuestion
            ? `Pregunta ${currentStep} de ${questions.length}. Tómate tu tiempo para responder con sinceridad.`
            : "¡Genial! Hemos terminado la evaluación."
        }
      />
      
      <Toaster />
    </div>
  );
}
