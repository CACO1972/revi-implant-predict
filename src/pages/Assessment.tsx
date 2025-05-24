
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { questions } from "@/data/questions";
import { Question, Answer, PatientInfo } from "@/types/implant";
import QuestionCard from "@/components/QuestionCard";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";
import ProgressBar from "@/components/ProgressBar";
import UserInfoForm from "@/components/UserInfoForm";

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1); // -1 para el formulario inicial
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    age: null
  });
  const [rioMessage, setRioMessage] = useState("¡Hola! Para comenzar, necesito que me indiques tu nombre y edad. Esta información es importante para personalizar tu evaluación.");
  
  const currentQuestion: Question | undefined = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  
  const handleStart = (info: PatientInfo) => {
    setPatientInfo(info);
    setCurrentQuestionIndex(0);
    setRioMessage(`¡Hola ${info.name}! Empecemos con la evaluación. Te haré una serie de preguntas para determinar tu compatibilidad con implantes dentales. Responde con sinceridad para obtener el mejor resultado.`);
  };
  
  const handleAnswer = (answer: Answer) => {
    const existingIndex = answers.findIndex(a => a.questionId === answer.questionId);
    
    if (existingIndex !== -1) {
      // Update existing answer
      setAnswers(prev => 
        prev.map(a => a.questionId === answer.questionId ? answer : a)
      );
    } else {
      // Add new answer
      setAnswers(prev => [...prev, answer]);
    }

    // Proporcionar feedback personalizado basado en la respuesta
    if (currentQuestion) {
      const selectedOption = currentQuestion.options.find(
        o => answer.selectedValues.includes(o.value)
      );
      
      if (selectedOption) {
        let feedback = "";
        
        switch(currentQuestion.id) {
          case 1: // Tabaquismo
            if (selectedOption.score > 0) {
              feedback = `El tabaquismo puede reducir la tasa de éxito de los implantes hasta en un 15%. Si puedes reducir o eliminar este hábito antes del tratamiento, mejorarás significativamente tus posibilidades de éxito.`;
            } else {
              feedback = `¡Excelente! No fumar es muy favorable para el éxito de los implantes dentales.`;
            }
            break;
          case 12: // Experiencia previa con implantes
            if (selectedOption.value === "failed") {
              feedback = `Entiendo que has tenido dificultades previas. Es importante analizar qué causó ese problema para evitarlo en el futuro. Cada caso es único y podemos aprender de experiencias pasadas.`;
            } else if (selectedOption.value === "success") {
              feedback = `¡Eso es genial! Tener una experiencia previa positiva sugiere que tu cuerpo responde bien a los implantes.`;
            } else {
              feedback = `No hay problema, esta será tu primera experiencia con implantes. Te guiaré en todo el proceso.`;
            }
            break;
          case 13: // Enfermedad autoinmune
            if (selectedOption.score > 0) {
              feedback = `Las enfermedades autoinmunes pueden afectar la cicatrización. Es fundamental que esté bien controlada antes del procedimiento y que trabajes con un equipo médico-dental coordinado.`;
            } else {
              feedback = `Perfecto, no tener condiciones autoinmunes simplifica el proceso de implantes.`;
            }
            break;
          case 14: // Bifosfonatos
            if (selectedOption.score > 0) {
              feedback = `Los bifosfonatos pueden afectar la cicatrización ósea. Es muy importante que informes esto a tu dentista, ya que requiere consideraciones especiales durante la planificación.`;
            } else {
              feedback = `Excelente, esto elimina un factor de riesgo importante para la cicatrización ósea.`;
            }
            break;
          default:
            feedback = getAssistantMessage();
        }
        
        setRioMessage(feedback);
      }
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setRioMessage(getAssistantMessage(currentQuestionIndex + 1));
    } else {
      // Save answers to sessionStorage before navigating
      sessionStorage.setItem('patientInfo', JSON.stringify(patientInfo));
      sessionStorage.setItem('answers', JSON.stringify(answers));
      navigate('/odontograma');
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setRioMessage(getAssistantMessage(currentQuestionIndex - 1));
    } else {
      setCurrentQuestionIndex(-1); // Go back to user info form
      setRioMessage("¡Hola! Para comenzar, necesito que me indiques tu nombre y edad. Esta información es importante para personalizar tu evaluación.");
    }
  };
  
  const getCurrentAnswer = (questionId: number) => {
    return answers.find(a => a.questionId === questionId);
  };
  
  const getAssistantMessage = (indexOverride?: number) => {
    const index = indexOverride !== undefined ? indexOverride : currentQuestionIndex;
    if (index === -1) {
      return "¡Hola! Para comenzar, necesito que me indiques tu nombre y edad. Esta información es importante para personalizar tu evaluación.";
    }
    
    const q = questions[index];
    if (!q) return "";
    
    const messages: Record<number, string> = {
      1: "El tabaquismo afecta significativamente el éxito de los implantes. Si fumas, reducir o idealmente dejar el hábito mejora mucho el pronóstico.",
      2: "La diabetes bien controlada permite buenos resultados con implantes. Un buen control de glucemia antes del procedimiento es clave.",
      3: "El bruxismo puede sobrecargar los implantes. Un plano de relajación ayuda a proteger tu inversión a largo plazo.",
      4: "A mayor tiempo sin dientes, mayor pérdida de hueso. Pero no te preocupes, existen técnicas para regenerar hueso cuando es necesario.",
      5: "La cantidad de dientes afecta el plan de tratamiento. A veces no se necesita un implante por cada diente perdido.",
      6: "Cada zona de la boca tiene diferente calidad ósea, lo que influye en la técnica quirúrgica y el tiempo de cicatrización.",
      7: "Es importante tratar cualquier condición dental existente antes de colocar implantes para optimizar resultados.",
      8: "La causa de la pérdida dental puede indicar factores de riesgo que debemos controlar para el éxito del implante.",
      9: "La higiene oral es crucial para la longevidad de los implantes. Una rutina adecuada previene complicaciones.",
      10: "Tu motivación es importante. Los implantes no solo mejoran la función masticatoria, sino también la autoestima y calidad de vida.",
      11: "Es normal tener preocupaciones. Los avances en implantología han hecho que los procedimientos sean mucho más predecibles y cómodos.",
      12: "La experiencia previa con implantes puede darnos información valiosa sobre cómo tu cuerpo responde a este tratamiento.",
      13: "Las enfermedades autoinmunes pueden afectar la cicatrización de los implantes, pero con un buen control médico, muchos pacientes logran excelentes resultados.",
      14: "Los tratamientos con bifosfonatos pueden afectar el metabolismo óseo. Es un factor importante que tu dentista debe considerar en la planificación."
    };
    
    return messages[q.id] || "Estoy aquí para ayudarte con cualquier duda sobre esta pregunta.";
  };
  
  const progress = currentQuestionIndex === -1 ? 0 : (currentQuestionIndex + 1) / (totalQuestions + 1) * 100;

  const handleRioMessageChange = (newMessage: string) => {
    setRioMessage(newMessage);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      {/* Logo pequeño */}
      <div className="mb-6">
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantX Logo"
          className="h-16 w-auto"
        />
      </div>
      
      <ProgressBar progress={progress} />
      
      <AnimatePresence mode="wait">
        {currentQuestionIndex === -1 ? (
          <motion.div
            key="user-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <UserInfoForm 
              initialData={patientInfo} 
              onSubmit={handleStart} 
            />
          </motion.div>
        ) : currentQuestion ? (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === totalQuestions - 1}
            currentAnswer={getCurrentAnswer(currentQuestion.id)}
          />
        ) : null}
      </AnimatePresence>
      
      <RioAssistant 
        isVisible={true} 
        message={rioMessage}
        onMessageChange={handleRioMessageChange}
      />
    </div>
  );
}
