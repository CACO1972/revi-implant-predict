import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

import DentalIcon from "@/components/DentalIcon";
import ResultSummaryBlock from "./ResultSummaryBlock";
import RecommendationList from "./RecommendationList";
import ContactForm from "./ContactForm";
import FeedbackForm from "./FeedbackForm";
import FeedbackSubmittedScreen from "./FeedbackSubmittedScreen";
import RequestSubmittedScreen from "./RequestSubmittedScreen";

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
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);
  const [requestSubmitted, setRequestSubmitted] = React.useState(false);

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const handleFeedbackClick = () => {
    setShowFeedbackForm(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
    setRequestSubmitted(true);
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
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
            <DentalIcon score={result.score} />
          </div>
          
          <h2 className="text-3xl md:text-4xl gold-gradient-text font-light tracking-wider">
            {patientInfo.name}, este es tu resultado
          </h2>
          
          <p className="text-[17px] text-white/85 max-w-lg mx-auto font-light leading-relaxed">
            Basado en tus respuestas, esta es la probabilidad de éxito de un implante dental.
          </p>
        </motion.div>

        <ResultSummaryBlock result={result} />
        <RecommendationList recommendations={result.recommendations} />

        <motion.div className="space-y-6" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.6,
        duration: 0.8
      }}>
        {requestSubmitted ? (
            <FeedbackSubmittedScreen />
          ) : showContactForm ? (
            <ContactForm onClose={closeContactForm} />
          ) : feedbackSubmitted ? (
            <RequestSubmittedScreen />
          ) : showFeedbackForm ? (
            <FeedbackForm onClose={closeFeedbackForm} />
          ) : (
            <>
              <div className="flex justify-center space-x-4">
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
