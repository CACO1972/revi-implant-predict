
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
    // Convertir selectedValues a MissingTooth array si viene de sessionStorage
    if (selectedValues.length > 0 && typeof selectedValues[0] === 'string') {
      try {
        const parsed = selectedValues.map(val => {
          if (typeof val === 'string' && val.startsWith('{')) {
            return JSON.parse(val);
          }
          return { number: parseInt(val.toString()), name: `Diente ${val}` };
        });
        setSelectedTeeth(parsed);
      } catch (error) {
        console.warn('Error parsing selected teeth:', error);
      }
    }
  }, []);

  const handleToothSelection = (teeth: MissingTooth[]) => {
    setSelectedTeeth(teeth);
    // Convertir a formato que puede manejar el sistema existente
    const values = teeth.map(tooth => JSON.stringify(tooth));
    onSelectionChange(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
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
        </motion.div>
      )}
    </motion.div>
  );
}
