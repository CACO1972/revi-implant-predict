
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Info } from "lucide-react";

export default function OdontogramDemo() {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([16, 14, 25, 46, 36, 37]);
  
  const handleToothClick = (toothId: number) => {
    if (selectedTeeth.includes(toothId)) {
      setSelectedTeeth(selectedTeeth.filter(id => id !== toothId));
    } else {
      setSelectedTeeth([...selectedTeeth, toothId]);
    }
  };
  
  const renderTooth = (number: number) => {
    const isMissing = selectedTeeth.includes(number);
    return (
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleToothClick(number)}
        className={`w-10 h-14 flex flex-col items-center cursor-pointer relative`}
      >
        <div className={`w-8 h-9 relative ${isMissing ? 'opacity-100' : 'opacity-90'}`}>
          {/* Corona del diente */}
          <div className={`w-full h-6 ${isMissing ? 'bg-red-500/40' : 'bg-white/70'} 
              border ${isMissing ? 'border-red-500' : 'border-white/90'} 
              rounded-t-md flex items-center justify-center relative`}>
            {isMissing && (
              <motion.span 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center text-red-500 font-bold text-xl"
              >
                X
              </motion.span>
            )}
          </div>
          
          {/* Raíz del diente */}
          <div className={`w-full h-4 ${isMissing ? 'bg-red-500/20' : 'bg-white/50'} 
              border-l ${isMissing ? 'border-l-red-500/70' : 'border-l-white/90'}
              border-r ${isMissing ? 'border-r-red-500/70' : 'border-r-white/90'}
              border-b ${isMissing ? 'border-b-red-500/70' : 'border-b-white/90'}`}>
          </div>
        </div>
        <span className={`text-xs mt-1 ${isMissing ? 'text-red-400' : 'text-white/80'}`}>{number}</span>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#178582] mb-2">Odontograma Interactivo</h3>
        <p className="text-white/80 text-sm">Seleccione los dientes que le faltan para un análisis personalizado</p>
      </div>
      
      <div className="bg-gradient-to-b from-[#0A1828]/90 to-[#0A1828] border border-[#178582]/30 rounded-lg p-6 shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="bg-[#0A1828] border border-[#178582]/20 p-4 rounded-lg shadow-inner">
            <div className="flex justify-center mb-2">
              <p className="text-[#BFA181] text-sm font-medium px-3 py-1 bg-[#0A1828]/80 rounded-full border border-[#BFA181]/30">
                Maxilar Superior
              </p>
            </div>
            
            <div className="flex justify-center gap-0.5 flex-wrap px-2">
              {[18, 17, 16, 15, 14, 13, 12, 11].map(num => renderTooth(num))}
              {[21, 22, 23, 24, 25, 26, 27, 28].map(num => renderTooth(num))}
            </div>
            
            <div className="border-t border-dashed border-[#178582]/30 my-4"></div>
            
            <div className="flex justify-center gap-0.5 flex-wrap px-2">
              {[48, 47, 46, 45, 44, 43, 42, 41].map(num => renderTooth(num))}
              {[31, 32, 33, 34, 35, 36, 37, 38].map(num => renderTooth(num))}
            </div>
            
            <div className="flex justify-center mt-2">
              <p className="text-[#BFA181] text-sm font-medium px-3 py-1 bg-[#0A1828]/80 rounded-full border border-[#BFA181]/30">
                Maxilar Inferior
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="flex items-start gap-3 bg-gradient-to-r from-[#178582]/15 to-transparent p-4 rounded-lg max-w-md">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#178582]/20 border border-[#178582]/50 flex items-center justify-center">
              <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="Río Asistente" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/90">
                <span className="text-[#178582] font-medium">Río:</span> El odontograma muestra tu boca como en un espejo. Toca los dientes que te faltan para un análisis más preciso.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Info className="h-4 w-4 text-[#BFA181]" />
                <p className="text-xs text-[#BFA181]">Esta es una versión demostrativa. La versión completa incluye más funciones.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Button className="bg-gradient-to-r from-[#178582] to-[#BFA181] hover:from-[#178582]/90 hover:to-[#BFA181]/90 text-white shadow-glow">
          Continuar con evaluación
        </Button>
        <p className="text-xs text-white/60 max-w-sm text-center">
          Accede gratis a la versión beta y recibe tu E-book "Lo que debes saber antes de tu tratamiento con implantes"
        </p>
      </div>
    </div>
  );
}
