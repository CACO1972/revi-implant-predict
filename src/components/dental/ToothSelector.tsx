
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MissingTooth {
  number: number;
  name: string;
  dateLost?: string;
  cause?: string;
}

interface ToothSelectorProps {
  onSelectionChange: (selectedTeeth: MissingTooth[]) => void;
  selectedTeeth: MissingTooth[];
}

const toothMapping = {
  // Maxilar superior (vista frontal)
  11: { x: 48, y: 30, name: "Incisivo central superior derecho" },
  12: { x: 44, y: 32, name: "Incisivo lateral superior derecho" },
  13: { x: 40, y: 35, name: "Canino superior derecho" },
  14: { x: 36, y: 38, name: "Primer premolar superior derecho" },
  15: { x: 32, y: 42, name: "Segundo premolar superior derecho" },
  16: { x: 28, y: 46, name: "Primer molar superior derecho" },
  17: { x: 24, y: 50, name: "Segundo molar superior derecho" },
  18: { x: 20, y: 54, name: "Tercer molar superior derecho" },
  
  21: { x: 52, y: 30, name: "Incisivo central superior izquierdo" },
  22: { x: 56, y: 32, name: "Incisivo lateral superior izquierdo" },
  23: { x: 60, y: 35, name: "Canino superior izquierdo" },
  24: { x: 64, y: 38, name: "Primer premolar superior izquierdo" },
  25: { x: 68, y: 42, name: "Segundo premolar superior izquierdo" },
  26: { x: 72, y: 46, name: "Primer molar superior izquierdo" },
  27: { x: 76, y: 50, name: "Segundo molar superior izquierdo" },
  28: { x: 80, y: 54, name: "Tercer molar superior izquierdo" },
  
  // Mandíbula inferior
  41: { x: 48, y: 70, name: "Incisivo central inferior derecho" },
  42: { x: 44, y: 68, name: "Incisivo lateral inferior derecho" },
  43: { x: 40, y: 65, name: "Canino inferior derecho" },
  44: { x: 36, y: 62, name: "Primer premolar inferior derecho" },
  45: { x: 32, y: 58, name: "Segundo premolar inferior derecho" },
  46: { x: 28, y: 54, name: "Primer molar inferior derecho" },
  47: { x: 24, y: 50, name: "Segundo molar inferior derecho" },
  48: { x: 20, y: 46, name: "Tercer molar inferior derecho" },
  
  31: { x: 52, y: 70, name: "Incisivo central inferior izquierdo" },
  32: { x: 56, y: 68, name: "Incisivo lateral inferior izquierdo" },
  33: { x: 60, y: 65, name: "Canino inferior izquierdo" },
  34: { x: 64, y: 62, name: "Primer premolar inferior izquierdo" },
  35: { x: 68, y: 58, name: "Segundo premolar inferior izquierdo" },
  36: { x: 72, y: 54, name: "Primer molar inferior izquierdo" },
  37: { x: 76, y: 50, name: "Segundo molar inferior izquierdo" },
  38: { x: 80, y: 46, name: "Tercer molar inferior izquierdo" }
};

export default function ToothSelector({ onSelectionChange, selectedTeeth }: ToothSelectorProps) {
  const [view, setView] = useState<'frontal' | 'lateral'>('frontal');
  const [selectedToothForDetails, setSelectedToothForDetails] = useState<number | null>(null);

  const handleToothClick = (toothNumber: number) => {
    const isSelected = selectedTeeth.some(tooth => tooth.number === toothNumber);
    
    if (isSelected) {
      // Remover diente
      const newSelection = selectedTeeth.filter(tooth => tooth.number !== toothNumber);
      onSelectionChange(newSelection);
    } else {
      // Agregar diente
      const toothData = toothMapping[toothNumber as keyof typeof toothMapping];
      const newTooth: MissingTooth = {
        number: toothNumber,
        name: toothData.name
      };
      onSelectionChange([...selectedTeeth, newTooth]);
      setSelectedToothForDetails(toothNumber);
    }
  };

  const updateToothDetails = (toothNumber: number, field: 'dateLost' | 'cause', value: string) => {
    const updatedTeeth = selectedTeeth.map(tooth => 
      tooth.number === toothNumber 
        ? { ...tooth, [field]: value }
        : tooth
    );
    onSelectionChange(updatedTeeth);
  };

  const isToothSelected = (toothNumber: number) => {
    return selectedTeeth.some(tooth => tooth.number === toothNumber);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Selecciona los dientes que te faltan
        </h3>
        <p className="text-white/70 text-sm mb-4">
          Toca en la imagen los dientes que has perdido
        </p>
        
        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={view === 'frontal' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('frontal')}
            className="text-xs"
          >
            Vista Frontal
          </Button>
          <Button
            variant={view === 'lateral' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('lateral')}
            className="text-xs"
          >
            Vista Lateral
          </Button>
        </div>
      </div>

      {/* Imagen interactiva de dientes */}
      <div className="relative bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-64 mx-auto cursor-pointer"
        >
          {/* Fondo de la sonrisa */}
          <ellipse cx="50" cy="50" rx="45" ry="25" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
          
          {/* Renderizar dientes */}
          {Object.entries(toothMapping).map(([toothNumber, position]) => {
            const isSelected = isToothSelected(parseInt(toothNumber));
            return (
              <motion.circle
                key={toothNumber}
                cx={position.x}
                cy={position.y}
                r="1.5"
                fill={isSelected ? "#ef4444" : "#ffffff"}
                stroke={isSelected ? "#dc2626" : "#178582"}
                strokeWidth="0.3"
                className="cursor-pointer"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleToothClick(parseInt(toothNumber))}
              />
            );
          })}
          
          {/* Números de dientes (solo algunos visibles para no saturar) */}
          {[11, 13, 16, 21, 23, 26, 31, 33, 36, 41, 43, 46].map(toothNumber => {
            const position = toothMapping[toothNumber as keyof typeof toothMapping];
            return (
              <text
                key={`label-${toothNumber}`}
                x={position.x}
                y={position.y - 3}
                fontSize="1.5"
                fill="rgba(255,255,255,0.6)"
                textAnchor="middle"
                className="pointer-events-none"
              >
                {toothNumber}
              </text>
            );
          })}
        </svg>
        
        <div className="text-center mt-4">
          <div className="flex items-center justify-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-white border border-[#178582]"></div>
              <span>Diente presente</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600"></div>
              <span>Diente faltante</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles de dientes seleccionados */}
      {selectedTeeth.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h4 className="text-[#BFA181] font-medium flex items-center gap-2">
            <Info className="w-4 h-4" />
            Dientes seleccionados ({selectedTeeth.length})
          </h4>
          
          <div className="grid gap-3">
            {selectedTeeth.map((tooth) => (
              <motion.div
                key={tooth.number}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-white font-medium">#{tooth.number}</span>
                    <p className="text-white/70 text-sm">{tooth.name}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToothClick(tooth.number)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Quitar
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label className="text-white/80 text-xs">¿Cuándo lo perdiste?</Label>
                    <Input
                      type="month"
                      value={tooth.dateLost || ""}
                      onChange={(e) => updateToothDetails(tooth.number, 'dateLost', e.target.value)}
                      className="bg-white/10 border-white/20 text-white text-sm mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/80 text-xs">Causa de pérdida</Label>
                    <select
                      value={tooth.cause || ""}
                      onChange={(e) => updateToothDetails(tooth.number, 'cause', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm mt-1"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="caries">Caries</option>
                      <option value="trauma">Trauma/Accidente</option>
                      <option value="periodontitis">Periodontitis (por dientes sueltos)</option>
                      <option value="ortodancia">Tratamiento ortodóncico</option>
                      <option value="other">Otra causa</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
