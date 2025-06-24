
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, RotateCcw } from "lucide-react";

interface ToothData {
  number: number;
  name: string;
  zone: string;
}

interface SimpleDentalSelectorProps {
  selectedTeeth: number[];
  onSelectionChange: (selectedTeeth: number[]) => void;
}

// Mapeo simplificado de dientes con sus nombres y zonas
const teethData: ToothData[] = [
  // Superior derecho
  { number: 18, name: "Muela del juicio superior derecha", zone: "posterior_superior" },
  { number: 17, name: "Segundo molar superior derecho", zone: "posterior_superior" },
  { number: 16, name: "Primer molar superior derecho", zone: "posterior_superior" },
  { number: 15, name: "Segundo premolar superior derecho", zone: "posterior_superior" },
  { number: 14, name: "Primer premolar superior derecho", zone: "posterior_superior" },
  { number: 13, name: "Canino superior derecho", zone: "anterior_superior" },
  { number: 12, name: "Incisivo lateral superior derecho", zone: "anterior_superior" },
  { number: 11, name: "Incisivo central superior derecho", zone: "anterior_superior" },
  
  // Superior izquierdo
  { number: 21, name: "Incisivo central superior izquierdo", zone: "anterior_superior" },
  { number: 22, name: "Incisivo lateral superior izquierdo", zone: "anterior_superior" },
  { number: 23, name: "Canino superior izquierdo", zone: "anterior_superior" },
  { number: 24, name: "Primer premolar superior izquierdo", zone: "posterior_superior" },
  { number: 25, name: "Segundo premolar superior izquierdo", zone: "posterior_superior" },
  { number: 26, name: "Primer molar superior izquierdo", zone: "posterior_superior" },
  { number: 27, name: "Segundo molar superior izquierdo", zone: "posterior_superior" },
  { number: 28, name: "Muela del juicio superior izquierda", zone: "posterior_superior" },
  
  // Inferior izquierdo
  { number: 38, name: "Muela del juicio inferior izquierda", zone: "posterior_inferior" },
  { number: 37, name: "Segundo molar inferior izquierdo", zone: "posterior_inferior" },
  { number: 36, name: "Primer molar inferior izquierdo", zone: "posterior_inferior" },
  { number: 35, name: "Segundo premolar inferior izquierdo", zone: "posterior_inferior" },
  { number: 34, name: "Primer premolar inferior izquierdo", zone: "posterior_inferior" },
  { number: 33, name: "Canino inferior izquierdo", zone: "anterior_inferior" },
  { number: 32, name: "Incisivo lateral inferior izquierdo", zone: "anterior_inferior" },
  { number: 31, name: "Incisivo central inferior izquierdo", zone: "anterior_inferior" },
  
  // Inferior derecho
  { number: 41, name: "Incisivo central inferior derecho", zone: "anterior_inferior" },
  { number: 42, name: "Incisivo lateral inferior derecho", zone: "anterior_inferior" },
  { number: 43, name: "Canino inferior derecho", zone: "anterior_inferior" },
  { number: 44, name: "Primer premolar inferior derecho", zone: "posterior_inferior" },
  { number: 45, name: "Segundo premolar inferior derecho", zone: "posterior_inferior" },
  { number: 46, name: "Primer molar inferior derecho", zone: "posterior_inferior" },
  { number: 47, name: "Segundo molar inferior derecho", zone: "posterior_inferior" },
  { number: 48, name: "Muela del juicio inferior derecha", zone: "posterior_inferior" },
];

export default function SimpleDentalSelector({ selectedTeeth, onSelectionChange }: SimpleDentalSelectorProps) {
  const [hoveredTooth, setHoveredTooth] = useState<number | null>(null);

  const toggleTooth = (toothNumber: number) => {
    if (selectedTeeth.includes(toothNumber)) {
      onSelectionChange(selectedTeeth.filter(t => t !== toothNumber));
    } else {
      onSelectionChange([...selectedTeeth, toothNumber]);
    }
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const getToothStyle = (toothNumber: number) => {
    const isSelected = selectedTeeth.includes(toothNumber);
    const isHovered = hoveredTooth === toothNumber;
    
    return {
      backgroundColor: isSelected ? '#ef4444' : isHovered ? '#178582' : '#ffffff',
      borderColor: isSelected ? '#dc2626' : '#178582',
      color: isSelected || isHovered ? '#ffffff' : '#0A1828',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    };
  };

  const selectedToothData = selectedTeeth.map(num => teethData.find(t => t.number === num)!).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Selecciona los dientes que te faltan
        </h3>
        <p className="text-white/70 text-sm mb-4">
          Haz clic en los números de los dientes que no tienes
        </p>
      </div>

      {/* Diagrama dental simplificado */}
      <div className="bg-gradient-to-b from-[#178582]/10 to-[#BFA181]/10 rounded-xl p-6 border border-[#178582]/20">
        {/* Superior */}
        <div className="mb-8">
          <h4 className="text-center text-white/60 text-sm mb-3">SUPERIOR</h4>
          
          {/* Fila superior derecha a izquierda */}
          <div className="flex justify-center gap-1 mb-2">
            {[18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28].map((toothNum) => (
              <motion.button
                key={toothNum}
                onClick={() => toggleTooth(toothNum)}
                onHoverStart={() => setHoveredTooth(toothNum)}
                onHoverEnd={() => setHoveredTooth(null)}
                className="w-8 h-8 text-xs font-bold border-2 rounded transition-all duration-200 cursor-pointer"
                style={getToothStyle(toothNum)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {toothNum}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/20 my-4"></div>

        {/* Inferior */}
        <div>
          <h4 className="text-center text-white/60 text-sm mb-3">INFERIOR</h4>
          
          {/* Fila inferior izquierda a derecha */}
          <div className="flex justify-center gap-1">
            {[48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38].map((toothNum) => (
              <motion.button
                key={toothNum}
                onClick={() => toggleTooth(toothNum)}
                onHoverStart={() => setHoveredTooth(toothNum)}
                onHoverEnd={() => setHoveredTooth(null)}
                className="w-8 h-8 text-xs font-bold border-2 rounded transition-all duration-200 cursor-pointer"
                style={getToothStyle(toothNum)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {toothNum}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-6 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-white border border-[#178582]"></div>
              <span>Diente presente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500 border border-red-600"></div>
              <span>Diente faltante</span>
            </div>
          </div>
        </div>
      </div>

      {/* Información del diente al hacer hover */}
      <AnimatePresence>
        {hoveredTooth && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#178582]/20 border border-[#178582]/40 rounded-lg p-3 text-center"
          >
            <p className="text-white text-sm">
              <span className="font-bold">#{hoveredTooth}</span> - {teethData.find(t => t.number === hoveredTooth)?.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resumen de selección */}
      {selectedTeeth.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#BFA181]/10 border border-[#BFA181]/30 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[#BFA181] font-medium flex items-center gap-2">
              <Check className="w-4 h-4" />
              Dientes seleccionados ({selectedTeeth.length})
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-white/60 hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Limpiar
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            {selectedToothData.map((tooth) => (
              <div key={tooth.number} className="text-white/80">
                <span className="font-mono">#{tooth.number}</span> - {tooth.name}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedTeeth.length === 0 && (
        <div className="text-center">
          <p className="text-white/50 text-sm">
            👆 Selecciona los números de los dientes que te faltan
          </p>
        </div>
      )}
    </div>
  );
}
