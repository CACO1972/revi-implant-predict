
import { Button } from "@/components/ui/button";
import { PatientInfo, AssessmentResult } from "@/types/implant";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ResultsCardProps {
  patientInfo: PatientInfo;
  result: AssessmentResult;
  onRestart: () => void;
}

export default function ResultsCard({ patientInfo, result, onRestart }: ResultsCardProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const getColorByLevel = () => {
    switch (result.level) {
      case 1: return "text-green-600";
      case 2: return "text-blue-600";
      case 3: return "text-yellow-600";
      case 4: return "text-red-600";
      default: return "text-blue-600";
    }
  };
  
  const getBgColorByLevel = () => {
    switch (result.level) {
      case 1: return "bg-green-50";
      case 2: return "bg-blue-50";
      case 3: return "bg-yellow-50";
      case 4: return "bg-red-50";
      default: return "bg-blue-50";
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En una implementación real, aquí se enviaría la información a un backend
    console.log("Enviando datos de contacto:", { name: patientInfo.name, email, phone, message });
    setSubmitted(true);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {!submitted ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-dental-blue">Resultados de tu evaluación</h2>
            <p className="text-gray-600 mt-2">
              Hola {patientInfo.name}, basado en tus respuestas hemos generado tu predicción de éxito clínico.
            </p>
          </div>
          
          <div className={`p-4 rounded-lg mb-6 ${getBgColorByLevel()}`}>
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
            <h4 className="font-semibold text-dental-blue mb-2">Recomendaciones personalizadas:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-600">{rec}</li>
              ))}
            </ul>
          </div>
          
          {!showContactForm ? (
            <div className="space-y-4">
              <Button 
                onClick={() => setShowContactForm(true)}
                className="w-full bg-dental-green hover:bg-dental-green-dark"
              >
                Recibir evaluación profesional
              </Button>
              <Button 
                variant="outline" 
                onClick={onRestart}
                className="w-full border-dental-blue text-dental-blue hover:bg-dental-blue-light hover:text-white"
              >
                Volver a empezar
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-dental-blue">Solicitar evaluación profesional</h3>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1234567890"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje (opcional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Quiero más información sobre..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dental-blue"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="submit"
                  className="flex-1 bg-dental-green hover:bg-dental-green-dark"
                >
                  Enviar solicitud
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 border-dental-blue text-dental-blue hover:bg-dental-blue-light hover:text-white"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-dental-green-light flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dental-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-dental-blue mb-3">¡Solicitud enviada!</h2>
          <p className="text-gray-600 mb-6">
            Gracias {patientInfo.name}, hemos recibido tu solicitud. Un especialista se pondrá en contacto contigo pronto.
          </p>
          
          <Button 
            onClick={onRestart}
            className="w-full bg-dental-blue hover:bg-dental-blue-dark"
          >
            Volver al inicio
          </Button>
        </div>
      )}
    </div>
  );
}
