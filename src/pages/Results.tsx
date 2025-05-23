
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer, Phone, Share2, DownloadCloud } from "lucide-react";
import ResultsCard from "@/components/results/ResultsCard";
import { PatientInfo, AssessmentResult, Answer } from "@/types/implant";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";

export default function Results() {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: "", age: null });
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedPatientInfo = sessionStorage.getItem('patientInfo');
    const storedAnswers = sessionStorage.getItem('answers');
    
    if (!storedPatientInfo || !storedAnswers) {
      toast({
        title: "Error",
        description: "No se encontraron datos de evaluación. Por favor, completa el cuestionario primero.",
        variant: "destructive"
      });
      navigate('/evaluacion');
      return;
    }
    
    try {
      const patientData = JSON.parse(storedPatientInfo) as PatientInfo;
      const answers = JSON.parse(storedAnswers) as Answer[];
      
      setPatientInfo(patientData);
      
      // Calculate assessment result
      const totalScore = calculateScore(answers);
      const assessmentResult = evaluateResult(totalScore);
      
      setResult(assessmentResult);
    } catch (error) {
      console.error("Error parsing stored data:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar los datos. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
      navigate('/evaluacion');
    }
  }, [navigate]);
  
  const handleRestart = () => {
    // Clear stored data and navigate to assessment
    sessionStorage.removeItem('patientInfo');
    sessionStorage.removeItem('answers');
    navigate('/evaluacion');
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mi evaluación de implantes dentales',
        text: `${patientInfo.name} ha completado una evaluación de implantes con ImplantX.`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Compartir",
        description: "Esta función no está disponible en tu dispositivo.",
      });
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/80">Cargando resultados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 relative">
      <AnimatedStarryBackground />
      
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => navigate('/odontograma')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 hover:bg-white/5"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Compartir
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 hover:bg-white/5"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4 mr-1" />
              Imprimir
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 hover:bg-white/5"
              onClick={() => {
                toast({
                  title: "Descarga iniciada",
                  description: "El informe PDF se está descargando a tu dispositivo."
                });
              }}
            >
              <DownloadCloud className="h-4 w-4 mr-1" />
              PDF
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto">
        <ResultsCard 
          patientInfo={patientInfo}
          result={result}
          onRestart={handleRestart}
        />
      </main>
      
      <Toaster />
    </div>
  );
}
