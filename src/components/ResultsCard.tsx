import { Button } from "@/components/ui/button";
import { PatientInfo, AssessmentResult } from "@/types/implant";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import DentalIcon from "@/components/DentalIcon";
import { motion } from "framer-motion";
import ResultSummaryBlock from "./results/ResultSummaryBlock";
import RecommendationList from "./results/RecommendationList";
import ContactForm from "./results/ContactForm";
import FeedbackForm from "./results/FeedbackForm";
import FeedbackSubmittedScreen from "./results/FeedbackSubmittedScreen";
import RequestSubmittedScreen from "./results/RequestSubmittedScreen";

interface ResultsCardProps {
  patientInfo: PatientInfo;
  result: AssessmentResult;
  onRestart: () => void;
}

export default function ResultsCard({ patientInfo, result, onRestart }: ResultsCardProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const getColorByLevel = () => {
    switch (result.level) {
      case 1: return "text-emerald-400";
      case 2: return "text-primary";
      case 3: return "text-gold";
      case 4: return "text-red-400";
      default: return "text-primary";
    }
  };
  
  const getBgColorByLevel = () => {
    switch (result.level) {
      case 1: return "bg-emerald-400/10";
      case 2: return "bg-primary/10";
      case 3: return "bg-gold/10";
      case 4: return "bg-red-400/10";
      default: return "bg-primary/10";
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando datos de contacto:", { name: patientInfo.name, email, phone, message });
    setSubmitted(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando feedback:", { rating: feedback });
    setFeedbackSubmitted(true);
  };

  const renderFeedbackEmoji = (value: string) => {
    switch (value) {
      case "5": return "😁";
      case "4": return "🙂";
      case "3": return "😐";
      case "2": return "😕";
      case "1": return "😖";
      default: return "";
    }
  };

  const renderFeedbackLabel = (value: string) => {
    switch (value) {
      case "5": return "Muy útil";
      case "4": return "Útil";
      case "3": return "Neutral";
      case "2": return "Poco útil";
      case "1": return "Para nada útil";
      default: return "";
    }
  };
  
  if (feedbackSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <FeedbackSubmittedScreen onRestart={onRestart} />
      </motion.div>
    );
  }
  
  if (submitted) {
    if (!showFeedbackForm) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <RequestSubmittedScreen
            patientName={patientInfo.name}
            onRestart={onRestart}
            onShowFeedback={() => setShowFeedbackForm(true)}
          />
        </motion.div>
      );
    } else {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="glass-panel p-8 text-center">
            <FeedbackForm
              feedback={feedback}
              setFeedback={setFeedback}
              onSubmit={handleFeedbackSubmit}
              onCancel={() => setShowFeedbackForm(false)}
              renderFeedbackEmoji={renderFeedbackEmoji}
              renderFeedbackLabel={renderFeedbackLabel}
            />
          </div>
        </motion.div>
      )
    }
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-panel p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gold">Resultados de tu evaluación</h2>
          <p className="text-white/80 mt-2 font-light">
            Hola {patientInfo.name}, basado en tus respuestas hemos generado tu predicción de éxito clínico.
          </p>
        </div>
        
        <ResultSummaryBlock 
          result={result} 
          getColorByLevel={getColorByLevel} 
          getBgColorByLevel={getBgColorByLevel}
        />

        <RecommendationList recommendations={result.recommendations} />

        {!showContactForm ? (
          <div className="space-y-4">
            <Button 
              onClick={() => setShowContactForm(true)}
              className="w-full bg-primary hover:bg-primary-dark text-white shadow-glow border border-gold/30"
            >
              Recibir evaluación profesional
            </Button>
            <Button 
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/5"
            >
              Descargar eBook
            </Button>
            <Button 
              variant="outline" 
              onClick={onRestart}
              className="w-full border-white/20 text-white hover:bg-white/5"
            >
              Volver a empezar
            </Button>
          </div>
        ) : (
          <ContactForm
            patientName={patientInfo.name}
            email={email}
            phone={phone}
            message={message}
            setEmail={setEmail}
            setPhone={setPhone}
            setMessage={setMessage}
            onSubmit={handleSubmit}
            onCancel={() => setShowContactForm(false)}
          />
        )}
      </div>
    </motion.div>
  );
}
