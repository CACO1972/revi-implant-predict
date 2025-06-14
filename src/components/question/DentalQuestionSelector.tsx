
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ToothSelector from "../dental/ToothSelector";

interface MissingTooth {
  number: number;
  name: string;
  dateLost?: string;
  cause?: string;
}

interface DentalQuestionSelectorProps {
  selectedValues: (string | number)[];
  onSelectionChange: (values: (string | number)[]) => void;
}

export default function DentalQuestionSelector({ selectedValues, onSelectionChange }: DentalQuestionSelectorProps) {
  const [selectedTeeth, setSelectedTeeth] = useState<MissingTooth[]>([]);

  useEffect(() => {
    console.log("DEBUG - DentalQuestionSelector recibió selectedValues:", selectedValues);
    
    // Convertir selectedValues a MissingTooth array si viene de sessionStorage
    if (selectedValues.length > 0) {
      try {
        const parsed = selectedValues.map(val => {
          if (typeof val === 'string' && val.startsWith('{')) {
            const tooth = JSON.parse(val);
            console.log("DEBUG - Diente parseado:", tooth);
            return tooth;
          }
          // Fallback para valores simples
          const toothNumber = parseInt(val.toString());
          return { 
            number: toothNumber, 
            name: `Diente ${toothNumber}` 
          };
        });
        
        console.log("DEBUG - Dientes parseados totales:", parsed);
        setSelectedTeeth(parsed);
      } catch (error) {
        console.warn('Error parsing selected teeth:', error);
        setSelectedTeeth([]);
      }
    } else {
      setSelectedTeeth([]);
    }
  }, [selectedValues]);

  const handleToothSelection = (teeth: MissingTooth[]) => {
    console.log("DEBUG - Selección de dientes actualizada:", teeth);
    setSelectedTeeth(teeth);
    
    // Convertir a formato que puede manejar el sistema existente
    const values = teeth.map(tooth => JSON.stringify(tooth));
    console.log("DEBUG - Valores enviados al parent:", values);
    onSelectionChange(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-4">
        <p className="text-white/70 text-sm">
          Selecciona los dientes que te faltan en la imagen interactiva
        </p>
      </div>
      
      <ToothSelector 
        selectedTeeth={selectedTeeth}
        onSelectionChange={handleToothSelection}
      />
      
      {selectedTeeth.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center"
        >
          <p className="text-green-400 text-sm">
            ✅ {selectedTeeth.length} diente{selectedTeeth.length !== 1 ? 's' : ''} seleccionado{selectedTeeth.length !== 1 ? 's' : ''}
          </p>
          <div className="mt-2 text-xs text-white/60">
            {selectedTeeth.map(tooth => `#${tooth.number}`).join(', ')}
          </div>
        </motion.div>
      )}
      
      {selectedTeeth.length === 0 && (
        <div className="text-center">
          <p className="text-white/50 text-sm">
            👆 Toca en la imagen para seleccionar los dientes faltantes
          </p>
        </div>
      )}
    </motion.div>
  );
}
