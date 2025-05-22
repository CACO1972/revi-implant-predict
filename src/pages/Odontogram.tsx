
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";
import { PatientInfo } from "@/types/implant";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProgressBar from "@/components/ProgressBar";

interface ToothData {
  id: number;
  missing: boolean;
  position: { x: number; y: number };
  quadrant: 1 | 2 | 3 | 4;
}

export default function Odontogram() {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: "", age: null });
  const [answers, setAnswers] = useState<any[]>([]);
  const [missingTeeth, setMissingTeeth] = useState<number[]>([]);
  
  useEffect(() => {
    // Load patient info and answers from sessionStorage
    const storedPatientInfo = sessionStorage.getItem('patientInfo');
    const storedAnswers = sessionStorage.getItem('answers');
    
    if (storedPatientInfo) {
      setPatientInfo(JSON.parse(storedPatientInfo));
    }
    
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);
  
  const handleToothClick = (toothId: number) => {
    if (missingTeeth.includes(toothId)) {
      setMissingTeeth(missingTeeth.filter(id => id !== toothId));
    } else {
      setMissingTeeth([...missingTeeth, toothId]);
    }
  };
  
  const handleSubmit = () => {
    // Save missing teeth to sessionStorage
    sessionStorage.setItem('missingTeeth', JSON.stringify(missingTeeth));
    navigate('/resultados');
  };
  
  const createTeeth = (): ToothData[] => {
    const teeth: ToothData[] = [];
    
    // Define teeth positions
    // Quadrant 1 (top right)
    for (let i = 18; i >= 11; i--) {
      const offset = 18 - i;
      teeth.push({
        id: i,
        missing: missingTeeth.includes(i),
        position: { x: 55 + offset * 30, y: 50 },
        quadrant: 1
      });
    }
    
    // Quadrant 2 (top left)
    for (let i = 21; i <= 28; i++) {
      const offset = i - 21;
      teeth.push({
        id: i,
        missing: missingTeeth.includes(i),
        position: { x: 325 + offset * 30, y: 50 },
        quadrant: 2
      });
    }
    
    // Quadrant 3 (bottom left)
    for (let i = 31; i <= 38; i++) {
      const offset = i - 31;
      teeth.push({
        id: i,
        missing: missingTeeth.includes(i),
        position: { x: 325 + offset * 30, y: 150 },
        quadrant: 3
      });
    }
    
    // Quadrant 4 (bottom right)
    for (let i = 48; i >= 41; i--) {
      const offset = 48 - i;
      teeth.push({
        id: i,
        missing: missingTeeth.includes(i),
        position: { x: 55 + offset * 30, y: 150 },
        quadrant: 4
      });
    }
    
    return teeth;
  };
  
  const teeth = createTeeth();
  
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
      
      <ProgressBar progress={90} />
      
      <motion.div
        className="glass-panel p-6 max-w-3xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#178582] mb-2">Odontograma Interactivo</h2>
          <p className="text-white/80">
            {patientInfo.name}, por favor marca los dientes que te faltan haciendo clic en ellos.
          </p>
          
          <div className="flex items-center justify-center mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/5">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  ¿No sabes qué dientes te faltan?
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0A1828] border-[#178582]/50">
                <DialogHeader>
                  <DialogTitle className="text-[#178582]">Ayuda con el Odontograma</DialogTitle>
                  <DialogDescription className="text-white/80">
                    Estás viendo tu boca como en un espejo: el lado izquierdo de la pantalla corresponde 
                    a tu lado derecho y viceversa.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-white/80 text-sm">
                  <p>
                    La boca está dividida en 4 cuadrantes numerados del 1 al 4:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Cuadrante 1: Superior derecho (tus muelas del juicio superior derecha es el 18)</li>
                    <li>Cuadrante 2: Superior izquierdo (tus muelas del juicio superior izquierda es el 28)</li>
                    <li>Cuadrante 3: Inferior izquierdo (tus muelas del juicio inferior izquierda es el 38)</li>
                    <li>Cuadrante 4: Inferior derecho (tus muelas del juicio inferior derecha es el 48)</li>
                  </ul>
                  <p>
                    Los incisivos centrales (dientes frontales) son los números 11, 21, 31 y 41.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 mb-8">
          <div className="relative w-full h-[250px]">
            {/* Dibujar línea central */}
            <div className="absolute left-1/2 h-full w-[2px] bg-white/20 transform -translate-x-1/2"></div>
            
            {/* Dibujar línea horizontal */}
            <div className="absolute top-1/2 w-full h-[2px] bg-white/20 transform -translate-y-1/2"></div>
            
            {/* Etiquetas de cuadrantes */}
            <div className="absolute top-4 left-4 text-white/40 text-xs">Cuadrante 1</div>
            <div className="absolute top-4 right-4 text-white/40 text-xs">Cuadrante 2</div>
            <div className="absolute bottom-4 right-4 text-white/40 text-xs">Cuadrante 3</div>
            <div className="absolute bottom-4 left-4 text-white/40 text-xs">Cuadrante 4</div>
            
            {/* Dientes */}
            {teeth.map((tooth) => (
              <div
                key={tooth.id}
                className={`absolute cursor-pointer transition-all duration-300 flex flex-col items-center`}
                style={{
                  left: `${tooth.position.x}px`,
                  top: `${tooth.position.y}px`,
                }}
                onClick={() => handleToothClick(tooth.id)}
              >
                <div 
                  className={`w-6 h-8 ${
                    tooth.missing 
                      ? 'bg-[#178582]/70 border-[#178582]'
                      : 'bg-white/80 border-white/50'
                  } border rounded-md flex items-center justify-center`}
                >
                  {tooth.missing && <X size={14} className="text-white" />}
                </div>
                <span className="text-[10px] text-white/70 mt-1">{tooth.id}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/5"
            onClick={() => navigate('/evaluacion')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <Button
            className="bg-[#178582] hover:bg-[#178582]/90 text-white shadow-glow transition-all duration-300 border border-[#BFA181]/30"
            onClick={handleSubmit}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Ver Resultados
          </Button>
        </div>
      </motion.div>
      
      <RioAssistant 
        isVisible={true} 
        message="Estás viendo tu boca como en un espejo. El lado izquierdo de la pantalla es tu lado derecho. Marca todos los dientes que te falten actualmente."
      />
    </div>
  );
}

// Simple X icon component
function X({ size = 24, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
