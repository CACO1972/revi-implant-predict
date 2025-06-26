
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";
import EbookSubscriptionForm from "@/components/resources/EbookSubscriptionForm";
import FAQSection from "@/components/resources/FAQSection";
import SubscriptionSuccessScreen from "@/components/resources/SubscriptionSuccessScreen";

export default function RecursosEducativos() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmitSuccess = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden">
        <AnimatedStarryBackground />
        <SubscriptionSuccessScreen />
      </div>
    );
  }

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
      
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#BFA181]">
            Recursos Educativos Gratuitos
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Descarga nuestra guía completa y resuelve todas tus dudas sobre implantes dentales
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de suscripción */}
          <EbookSubscriptionForm onSubmitSuccess={handleSubmitSuccess} />

          {/* FAQ */}
          <FAQSection />
        </div>

        {/* Botón de regreso */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </motion.div>
      </div>
      
      <RioAssistant 
        isVisible={true} 
        message="¡Aquí tienes toda la información que necesitas sobre implantes! Suscríbete para descargar la guía completa y revisa las preguntas frecuentes. Si tienes dudas específicas, ¡pregúntame!"
      />
    </div>
  );
}
