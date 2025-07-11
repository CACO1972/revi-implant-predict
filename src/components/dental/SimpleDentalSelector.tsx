
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface SimpleDentalSelectorProps {
  selectedTeeth: number[];
  onSelectionChange: (teeth: number[]) => void;
}

// Configuración de dientes por cuadrante
const TEETH_CONFIG = {
  // Cuadrante superior derecho (dientes 11-18)
  upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
  // Cuadrante superior izquierdo (dientes 21-28)  
  upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
  // Cuadrante inferior izquierdo (dientes 31-38)
  lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38],
  // Cuadrante inferior derecho (dientes 41-48)
  lowerRight: [48, 47, 46, 45, 44, 43, 42, 41]
};

export default function SimpleDentalSelector({ selectedTeeth, onSelectionChange }: SimpleDentalSelectorProps) {
  const [hoveredTooth, setHoveredTooth] = useState<number | null>(null);

  const handleToothClick = (toothNumber: number) => {
    const isSelected = selectedTeeth.includes(toothNumber);
    let newSelection: number[];
    
    if (isSelected) {
      newSelection = selectedTeeth.filter(t => t !== toothNumber);
    } else {
      newSelection = [...selectedTeeth, toothNumber];
    }
    
    onSelectionChange(newSelection);
  };

  const renderTooth = (toothNumber: number) => {
    const isSelected = selectedTeeth.includes(toothNumber);
    const isHovered = hoveredTooth === toothNumber;
    
    return (
      <motion.button
        key={toothNumber}
        onClick={() => handleToothClick(toothNumber)}
        onMouseEnter={() => setHoveredTooth(toothNumber)}
        onMouseLeave={() => setHoveredTooth(null)}
        className={`
          w-8 h-10 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-xs font-medium
          ${isSelected 
            ? 'bg-[#178582] border-[#178582] text-white shadow-lg' 
            : 'bg-white/10 border-white/30 text-white/80 hover:border-[#178582]/60 hover:bg-[#178582]/20'
          }
          ${isHovered ? 'scale-110 shadow-lg' : ''}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {toothNumber}
      </motion.button>
    );
  };

  const renderQuadrant = (teeth: number[], label: string) => (
    <div className="flex gap-1">
      {teeth.map(renderTooth)}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Selector de Dientes</h3>
        <p className="text-white/70 text-sm">Haz clic en los dientes que te faltan</p>
      </div>
      
      {/* Cuadrantes superiores */}
      <div className="mb-8">
        <div className="flex justify-between items-center gap-4 mb-2">
          <div className="text-xs text-white/60 text-center flex-1">Superior Derecho</div>
          <div className="text-xs text-white/60 text-center flex-1">Superior Izquierdo</div>
        </div>
        <div className="flex justify-between items-center gap-4">
          {renderQuadrant(TEETH_CONFIG.upperRight, "Superior Derecho")}
          {renderQuadrant(TEETH_CONFIG.upperLeft, "Superior Izquierdo")}
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-white/20 my-6"></div>

      {/* Cuadrantes inferiores */}
      <div>
        <div className="flex justify-between items-center gap-4">
          {renderQuadrant(TEETH_CONFIG.lowerLeft, "Inferior Izquierdo")}
          {renderQuadrant(TEETH_CONFIG.lowerRight, "Inferior Derecho")}
        </div>
        <div className="flex justify-between items-center gap-4 mt-2">
          <div className="text-xs text-white/60 text-center flex-1">Inferior Izquierdo</div>
          <div className="text-xs text-white/60 text-center flex-1">Inferior Derecho</div>
        </div>
      </div>

      {/* Información del diente seleccionado */}
      {hoveredTooth && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-3 bg-[#178582]/20 border border-[#178582]/30 rounded-lg text-center"
        >
          <p className="text-[#178582] text-sm font-medium">
            Diente #{hoveredTooth}
          </p>
        </motion.div>
      )}

      {/* Resumen de selección */}
      {selectedTeeth.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-[#BFA181]/10 border border-[#BFA181]/20 rounded-lg"
        >
          <p className="text-[#BFA181] text-sm font-medium text-center mb-2">
            Dientes seleccionados: {selectedTeeth.length}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedTeeth.sort((a, b) => a - b).map(tooth => (
              <span key={tooth} className="bg-[#178582] text-white px-2 py-1 rounded text-xs">
                #{tooth}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
