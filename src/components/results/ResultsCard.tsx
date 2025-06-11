import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sparkles, FileText } from "lucide-react";

import DentalIcon from "@/components/DentalIcon";
import ResultSummaryBlock from "./ResultSummaryBlock";
import RecommendationList from "./RecommendationList";
import ContactForm from "./ContactForm";
import FeedbackForm from "./FeedbackForm";
import FeedbackSubmittedScreen from "./FeedbackSubmittedScreen";
import RequestSubmittedScreen from "./RequestSubmittedScreen";
import EducationalSection from "./EducationalSection";
import CompletionMessage from "./CompletionMessage";
import TreatmentSummaryScreen from "./TreatmentSummaryScreen";

import { PatientInfo, AssessmentResult } from "@/types/implant";

interface ResultsCardProps {
  patientInfo: PatientInfo;
  result: AssessmentResult;
  onRestart: () => void;
}

export default function ResultsCard({ 
  patientInfo, 
  result,
  onRestart 
}: ResultsCardProps) {
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false);
  const [showTreatmentSummary, setShowTreatmentSummary] = React.useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);
  const [requestSubmitted, setRequestSubmitted] = React.useState(false);
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const handleFeedbackClick = () => {
    setShowFeedbackForm(true);
  };

  const handleTreatmentSummaryClick = () => {
    setShowTreatmentSummary(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
    setRequestSubmitted(true);
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
    setFeedbackSubmitted(true);
  };

  // If showing treatment summary, render that screen
  if (showTreatmentSummary) {
    return (
      <TreatmentSummaryScreen
        patientInfo={patientInfo}
        result={result}
        onBack={() => setShowTreatmentSummary(false)}
      />
    );
  }

  // Functions for ResultSummaryBlock
  const getColorByLevel = () => {
    switch (result.level) {
      case 1: return "text-emerald-400";
      case 2: return "text-[#1EAEDB]";
      case 3: return "text-gold";
      case 4: return "text-red-400";
      default: return "text-[#1EAEDB]";
    }
  };
  
  const getBgColorByLevel = () => {
    switch (result.level) {
      case 1: return "bg-emerald-400/10";
      case 2: return "bg-[#1EAEDB]/10";
      case 3: return "bg-gold/10";
      case 4: return "bg-red-400/10";
      default: return "bg-[#1EAEDB]/10";
    }
  };
  
  // Helper functions for FeedbackForm
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

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando feedback:", { rating: feedback });
    setFeedbackSubmitted(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl space-y-8 relative z-10"
      >
        <motion.div 
          className="space-y-6" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative mx-auto w-64 h-64 mb-6">
            <DentalIcon totalScore={result.totalScore} />
          </div>
          
          <h2 className="text-3xl md:text-4xl gold-gradient-text font-light tracking-wider">
            {patientInfo.name}, este es tu resultado
          </h2>
          
          <p className="text-[17px] text-white/85 max-w-lg mx-auto font-light leading-relaxed">
            Basado en tus respuestas, esta es la probabilidad de éxito de un implante dental.
          </p>
        </motion.div>

        <ResultSummaryBlock 
          result={result} 
          getColorByLevel={getColorByLevel} 
          getBgColorByLevel={getBgColorByLevel} 
        />
        
        <RecommendationList recommendations={result.recommendations} />
        
        <EducationalSection patientLevel={result.level} />
        
        <CompletionMessage />

        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
          {requestSubmitted ? (
            <RequestSubmittedScreen 
              patientName={patientInfo.name}
              onRestart={onRestart}
              onShowFeedback={() => setShowFeedbackForm(true)}
            />
          ) : showContactForm ? (
            <ContactForm 
              patientName={patientInfo.name}
              email=""
              phone=""
              message=""
              setEmail={() => {}}
              setPhone={() => {}}
              setMessage={() => {}}
              onSubmit={(e) => {
                e.preventDefault();
                closeContactForm();
              }}
              onCancel={closeContactForm}
            />
          ) : feedbackSubmitted ? (
            <FeedbackSubmittedScreen onRestart={onRestart} />
          ) : showFeedbackForm ? (
            <FeedbackForm
              feedback={feedback}
              setFeedback={setFeedback}
              onSubmit={handleFeedbackSubmit}
              onCancel={closeFeedbackForm}
              renderFeedbackEmoji={renderFeedbackEmoji}
              renderFeedbackLabel={renderFeedbackLabel}
            />
          ) : (
            <>
              {/* New Treatment Summary Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={handleTreatmentSummaryClick} 
                  className="w-full group text-starry px-8 py-5 rounded-xl text-lg font-medium shadow-gold-glow transition-all duration-300 border border-gold/30 bg-gradient-to-r from-[#178582] to-[#BFA181] hover:from-[#178582]/90 hover:to-[#BFA181]/90 mb-4"
                >
                  <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Ver análisis completo y alternativas de tratamiento
                </Button>
              </motion.div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={handleContactClick} className="group text-starry px-8 py-5 rounded-xl text-lg font-medium shadow-gold-glow transition-all duration-300 border border-gold/30 bg-amber-500 hover:bg-amber-400">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-sparkle" />
                    Solicitar consulta
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={handleFeedbackClick} className="group text-starry px-8 py-5 rounded-xl text-lg font-medium shadow-gold-glow transition-all duration-300 border border-gold/30 bg-amber-500 hover:bg-amber-400">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-sparkle" />
                    Enviar feedback
                  </Button>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button variant="secondary" onClick={onRestart} className="w-full">
                  Realizar nueva evaluación
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
