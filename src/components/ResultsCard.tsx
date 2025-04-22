
import { Button } from "@/components/ui/button";
import { PatientInfo, AssessmentResult } from "@/types/implant";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import DentalIcon from "@/components/DentalIcon";
import { motion } from "framer-motion";

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
        className="w-full max-w-md mx-auto glass-panel p-8 text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <DentalIcon className="text-primary" size={32} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gold mb-3">¡Gracias por tu opinión!</h2>
        <p className="text-white/80 mb-6">
          Gracias por usar ImplantDX. Tu salud es lo primero.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button 
            onClick={onRestart}
            className="bg-primary hover:bg-primary-dark text-white shadow-glow border border-gold/30"
          >
            Volver al inicio
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.open("https://instagram.com", "_blank")}
            className="border-white/20 text-white hover:bg-white/5"
          >
            Seguir en Instagram
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'ImplantDX',
                  text: 'Evalúa tus probabilidades de éxito con implantes dentales',
                  url: window.location.href,
                })
              }
            }}
            className="border-white/20 text-white hover:bg-white/5"
          >
            Compartir
          </Button>
        </div>
      </motion.div>
    );
  }
  
  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto glass-panel p-8 text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gold mb-3">¡Solicitud enviada!</h2>
        <p className="text-white/80 mb-6 font-light">
          Gracias {patientInfo.name}, hemos recibido tu solicitud. Un especialista se pondrá en contacto contigo pronto.
        </p>
        
        {!showFeedbackForm ? (
          <div className="space-y-4">
            <p className="text-white/90 mb-4">
              ¿Te gustaría darnos tu opinión sobre nuestra herramienta?
            </p>
            <Button 
              onClick={() => setShowFeedbackForm(true)}
              className="w-full bg-primary hover:bg-primary-dark text-white shadow-glow border border-gold/30"
            >
              Dar mi opinión
            </Button>
            <Button 
              variant="outline" 
              onClick={onRestart}
              className="w-full border-white/20 text-white hover:bg-white/5"
            >
              Volver al inicio
            </Button>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="space-y-6">
            <h3 className="text-xl font-semibold text-gold">¿Qué tan útil te pareció esta herramienta?</h3>
            
            <RadioGroup
              value={feedback || ""}
              onValueChange={setFeedback}
              className="flex flex-col items-center space-y-3"
            >
              {["5", "4", "3", "2", "1"].map((value) => (
                <div key={value} className="flex items-center space-x-3 w-full max-w-[300px] p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <RadioGroupItem 
                    value={value} 
                    id={`feedback-${value}`}
                    className="border-white/20 text-primary" 
                  />
                  <Label
                    htmlFor={`feedback-${value}`}
                    className="flex items-center space-x-3 text-white/90 font-light cursor-pointer"
                  >
                    <span className="text-2xl">{renderFeedbackEmoji(value)}</span>
                    <span>{renderFeedbackLabel(value)}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="flex gap-4">
              <Button 
                type="submit"
                disabled={!feedback}
                className="flex-1 bg-primary hover:bg-primary-dark text-white shadow-glow border border-gold/30 disabled:opacity-50"
              >
                Enviar opinión
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => setShowFeedbackForm(false)}
                className="flex-1 border-white/20 text-white hover:bg-white/5"
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    );
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
        
        <div className={`p-6 rounded-2xl mb-6 ${getBgColorByLevel()} border border-white/10`}>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold mb-3">
              <span className={getColorByLevel()}>{result.totalScore}/16</span>
            </div>
            <h3 className={`text-xl font-semibold mb-1 ${getColorByLevel()}`}>
              Nivel {result.level}: {result.prediction}
            </h3>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gold mb-3">Recomendaciones personalizadas:</h4>
          <ul className="list-disc pl-5 space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="text-white/80 font-light">{rec}</li>
            ))}
          </ul>
        </div>
        
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gold">Solicitar evaluación profesional</h3>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                required
                className="bg-white/5 border-white/10 text-white placeholder-white/40"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1234567890"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-white/40"
                />
              </div>
              
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 px-3 border-white/20 text-white hover:bg-white/5"
                  onClick={() => window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank')}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
                Mensaje (opcional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Quiero más información sobre..."
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                rows={3}
              />
            </div>
            
            <div className="flex gap-4">
              <Button 
                type="submit"
                className="flex-1 bg-primary hover:bg-primary-dark text-white shadow-glow border border-gold/30"
              >
                Enviar solicitud
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => setShowContactForm(false)}
                className="flex-1 border-white/20 text-white hover:bg-white/5"
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
