
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SimpleDentalSelector from "../dental/SimpleDentalSelector";

interface DentalQuestionSelectorProps {
  selectedValues: (string | number)[];
  onSelectionChange: (values: (string | number)[]) => void;
}

export default function DentalQuestionSelector({ selectedValues, onSelectionChange }: DentalQuestionSelectorProps) {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([]);

  useEffect(() => {
    // Convertir selectedValues a números
    const teethNumbers = selectedValues
      .map(val => parseInt(val.toString()))
      .filter(num => !isNaN(num));
    
    setSelectedTeeth(teethNumbers);
  }, [selectedValues]);

  const handleToothSelection = (teeth: number[]) => {
    setSelectedTeeth(teeth);
    // Convertir números a strings para compatibilidad con el sistema existente
    onSelectionChange(teeth.map(tooth => tooth.toString()));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <SimpleDentalSelector 
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
            Números: {selectedTeeth.sort((a, b) => a - b).join(', ')}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
