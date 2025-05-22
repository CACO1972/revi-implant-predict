
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  FileText, 
  Sparkles, 
  BarChart, 
  Calculator,
  ShareIcon,
  Whatsapp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";
import { PatientInfo, Answer, AssessmentResult } from "@/types/implant";
import DentalIcon from "@/components/DentalIcon";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";

export default function Results() {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: "", age: null });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [missingTeeth, setMissingTeeth] = useState<number[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  
  useEffect(() => {
    // Load data from sessionStorage
    const storedPatientInfo = sessionStorage.getItem('patientInfo');
    const storedAnswers = sessionStorage.getItem('answers');
    const storedMissingTeeth = sessionStorage.getItem('missingTeeth');
    
    if (storedPatientInfo) {
      setPatientInfo(JSON.parse(storedPatientInfo));
    }
    
    if (storedAnswers) {
      const parsedAnswers = JSON.parse(storedAnswers);
      setAnswers(parsedAnswers);
      
      // Calculate result
      const totalScore = calculateScore(parsedAnswers);
      const assessmentResult = evaluateResult(totalScore);
      setResult(assessmentResult);
    }
    
    if (storedMissingTeeth) {
      setMissingTeeth(JSON.parse(storedMissingTeeth));
    }
  }, []);
  
  const getColorByLevel = () => {
    if (!result) return "text-[#178582]";
    
    switch (result.level) {
      case 1: return "text-emerald-400";
      case 2: return "text-[#178582]";
      case 3: return "text-[#BFA181]";
      case 4: return "text-amber-500";
      case 5: return "text-red-500";
      default: return "text-[#178582]";
    }
  };
  
  const getBgColorByLevel = () => {
    if (!result) return "bg-[#178582]/10";
    
    switch (result.level) {
      case 1: return "bg-emerald-400/10";
      case 2: return "bg-[#178582]/10";
      case 3: return "bg-[#BFA181]/10";
      case 4: return "bg-amber-500/10";
      case 5: return "bg-red-500/10";
      default: return "bg-[#178582]/10";
    }
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
      
      <motion.div
        className="glass-panel p-6 max-w-3xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#BFA181] mb-4">
            {patientInfo.name}, este es tu resultado
          </h2>
          
          <p className="text-white/80">
            Basado en tus respuestas y la evaluación de factores clínicos, hemos calculado tu predicción
            de éxito para implantes dentales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Columna izquierda: Resultado clínico */}
          <div>
            <div className="relative mx-auto w-56 h-56 mb-6">
              <DentalIcon totalScore={result?.totalScore || 0} />
            </div>
            
            {result && (
              <div className={`${getBgColorByLevel()} rounded-xl p-4 border border-[#178582]/20`}>
                <h3 className={`text-2xl font-bold ${getColorByLevel()} mb-2 text-center`}>
                  Nivel {result.level}: {result.prediction}
                </h3>
                <p className="text-white/80 text-center mb-4">
                  Puntuación predictiva: <span className={`font-bold ${getColorByLevel()}`}>{result.totalScore}/16</span>
                </p>
                
                <h4 className="text-[#BFA181] font-semibold mb-2">Factores a considerar:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/80">
                  {result.recommendations.slice(0, 3).map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Columna derecha: Acciones disponibles */}
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-[#BFA181] font-semibold mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#178582]" />
                Opciones disponibles
              </h3>
              
              <div className="space-y-3">
                <Button
                  className="w-full bg-[#178582] hover:bg-[#178582]/90 text-white justify-start"
                  onClick={() => navigate('/comparador')}
                >
                  <BarChart className="w-4 h-4 mr-2" />
                  Ver comparador de tratamientos
                </Button>
                
                <Button
                  className="w-full bg-[#178582] hover:bg-[#178582]/90 text-white justify-start"
                  onClick={() => navigate('/calculadora')}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular precios estimados
                </Button>
                
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white justify-start"
                  onClick={() => window.open(`https://wa.me/?text=He completado mi evaluación de ImplantX. Mi nivel predictivo es: ${result?.level} - ${result?.prediction}`)}
                >
                  <Whatsapp className="w-4 h-4 mr-2" />
                  Compartir por WhatsApp
                </Button>
                
                <Button
                  className="w-full bg-[#BFA181] hover:bg-[#BFA181]/90 text-[#0A1828] justify-start"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Descargar informe PDF
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/5 justify-start"
                  onClick={() => navigate('/contacto')}
                >
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Solicitar evaluación profesional
                </Button>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-[#BFA181] font-semibold mb-2">¿Qué significa este resultado?</h3>
              <p className="text-white/80 text-sm">
                Esta evaluación predictiva analiza factores clínicos clave que influyen en el éxito de los
                implantes dentales. Un nivel más bajo indica mejor pronóstico.
              </p>
              <p className="text-xs text-white/60 mt-2">
                *Esta herramienta está diseñada para orientación inicial y no reemplaza una evaluación profesional.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/5"
            onClick={() => navigate('/odontograma')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <Button
            className="bg-[#BFA181] hover:bg-[#BFA181]/90 text-[#0A1828] shadow-glow transition-all duration-300"
            onClick={() => navigate('/comparador')}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Ver opciones de tratamiento
          </Button>
        </div>
      </motion.div>
      
      <RioAssistant 
        isVisible={true} 
        message={`¡${patientInfo.name}, hemos completado tu evaluación! Tu nivel predictivo es ${result?.level}: ${result?.prediction}. Puedes explorar las opciones de tratamiento, calcular costos aproximados o descargar un informe detallado.`}
      />
    </div>
  );
}
