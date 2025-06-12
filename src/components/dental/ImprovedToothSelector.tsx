
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, RotateCcw, Info } from "lucide-react";

interface ToothData {
  number: number;
  name: string;
  position: { x: number; y: number };
  quadrant: number;
  type: 'incisor' | 'canine' | 'premolar' | 'molar';
}

interface SelectedTooth {
  number: number;
  name: string;
  dateLost?: string;
  cause?: 'caries' | 'periodontitis' | 'trauma' | 'other';
}

interface ImprovedToothSelectorProps {
  selectedTeeth: SelectedTooth[];
  onSelectionChange: (teeth: SelectedTooth[]) => void;
}

// Datos de todos los dientes con posiciones mejoradas
const allTeeth: ToothData[] = [
  // Cuadrante 1 (Superior derecho)
  { number: 18, name: "Molar 3", position: { x: 20, y: 30 }, quadrant: 1, type: 'molar' },
  { number: 17, name: "Molar 2", position: { x: 30, y: 25 }, quadrant: 1, type: 'molar' },
  { number: 16, name: "Molar 1", position: { x: 40, y: 20 }, quadrant: 1, type: 'molar' },
  { number: 15, name: "Premolar 2", position: { x: 48, y: 15 }, quadrant: 1, type: 'premolar' },
  { number: 14, name: "Premolar 1", position: { x: 56, y: 12 }, quadrant: 1, type: 'premolar' },
  { number: 13, name: "Canino", position: { x: 64, y: 10 }, quadrant: 1, type: 'canine' },
  { number: 12, name: "Incisivo lateral", position: { x: 71, y: 8 }, quadrant: 1, type: 'incisor' },
  { number: 11, name: "Incisivo central", position: { x: 78, y: 8 }, quadrant: 1, type: 'incisor' },
  
  // Cuadrante 2 (Superior izquierdo)
  { number: 21, name: "Incisivo central", position: { x: 85, y: 8 }, quadrant: 2, type: 'incisor' },
  { number: 22, name: "Incisivo lateral", position: { x: 92, y: 8 }, quadrant: 2, type: 'incisor' },
  { number: 23, name: "Canino", position: { x: 99, y: 10 }, quadrant: 2, type: 'canine' },
  { number: 24, name: "Premolar 1", position: { x: 107, y: 12 }, quadrant: 2, type: 'premolar' },
  { number: 25, name: "Premolar 2", position: { x: 115, y: 15 }, quadrant: 2, type: 'premolar' },
  { number: 26, name: "Molar 1", position: { x: 123, y: 20 }, quadrant: 2, type: 'molar' },
  { number: 27, name: "Molar 2", position: { x: 133, y: 25 }, quadrant: 2, type: 'molar' },
  { number: 28, name: "Molar 3", position: { x: 143, y: 30 }, quadrant: 2, type: 'molar' },
  
  // Cuadrante 3 (Inferior izquierdo)
  { number: 38, name: "Molar 3", position: { x: 143, y: 70 }, quadrant: 3, type: 'molar' },
  { number: 37, name: "Molar 2", position: { x: 133, y: 75 }, quadrant: 3, type: 'molar' },
  { number: 36, name: "Molar 1", position: { x: 123, y: 80 }, quadrant: 3, type: 'molar' },
  { number: 35, name: "Premolar 2", position: { x: 115, y: 85 }, quadrant: 3, type: 'premolar' },
  { number: 34, name: "Premolar 1", position: { x: 107, y: 88 }, quadrant: 3, type: 'premolar' },
  { number: 33, name: "Canino", position: { x: 99, y: 90 }, quadrant: 3, type: 'canine' },
  { number: 32, name: "Incisivo lateral", position: { x: 92, y: 92 }, quadrant: 3, type: 'incisor' },
  { number: 31, name: "Incisivo central", position: { x: 85, y: 92 }, quadrant: 3, type: 'incisor' },
  
  // Cuadrante 4 (Inferior derecho)
  { number: 41, name: "Incisivo central", position: { x: 78, y: 92 }, quadrant: 4, type: 'incisor' },
  { number: 42, name: "Incisivo lateral", position: { x: 71, y: 92 }, quadrant: 4, type: 'incisor' },
  { number: 43, name: "Canino", position: { x: 64, y: 90 }, quadrant: 4, type: 'canine' },
  { number: 44, name: "Premolar 1", position: { x: 56, y: 88 }, quadrant: 4, type: 'premolar' },
  { number: 45, name: "Premolar 2", position: { x: 48, y: 85 }, quadrant: 4, type: 'premolar' },
  { number: 46, name: "Molar 1", position: { x: 40, y: 80 }, quadrant: 4, type: 'molar' },
  { number: 47, name: "Molar 2", position: { x: 30, y: 75 }, quadrant: 4, type: 'molar' },
  { number: 48, name: "Molar 3", position: { x: 20, y: 70 }, quadrant: 4, type: 'molar' },
];

const getToothColor = (tooth: ToothData, isSelected: boolean) => {
  if (isSelected) return "#FF6B6B"; // Rojo para seleccionados
  
  switch (tooth.type) {
    case 'incisor': return "#178582";  // Verde
    case 'canine': return "#BFA181";   // Dorado
    case 'premolar': return "#33C3F0"; // Azul
    case 'molar': return "#9333EA";    // Púrpura
    default: return "#6B7280";
  }
};

export default function ImprovedToothSelector({ selectedTeeth, onSelectionChange }: ImprovedToothSelectorProps) {
  const [hoveredTooth, setHoveredTooth] = useState<number | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  const isToothSelected = (toothNumber: number) => {
    return selectedTeeth.some(t => t.number === toothNumber);
  };

  const handleToothClick = (tooth: ToothData) => {
    if (isToothSelected(tooth.number)) {
      // Remover diente
      onSelectionChange(selectedTeeth.filter(t => t.number !== tooth.number));
    } else {
      // Agregar diente
      const newTooth: SelectedTooth = {
        number: tooth.number,
        name: tooth.name,
        dateLost: new Date().toISOString().split('T')[0], // Fecha actual por defecto
        cause: 'caries' // Causa por defecto
      };
      onSelectionChange([...selectedTeeth, newTooth]);
    }
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  const selectedCount = selectedTeeth.length;

  return (
    <div className="space-y-4">
      {/* Leyenda y controles */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-[#178582]/10 text-[#178582]">
            <div className="w-3 h-3 bg-[#178582] rounded-full mr-2"></div>
            Incisivos
          </Badge>
          <Badge variant="outline" className="bg-[#BFA181]/10 text-[#BFA181]">
            <div className="w-3 h-3 bg-[#BFA181] rounded-full mr-2"></div>
            Caninos
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            Premolares
          </Badge>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            Molares
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline" 
            size="sm"
            onClick={() => setShowLabels(!showLabels)}
            className="text-white/70 border-white/20"
          >
            <Info className="w-4 h-4 mr-1" />
            {showLabels ? 'Ocultar' : 'Mostrar'} números
          </Button>
          {selectedCount > 0 && (
            <Button
              variant="outline" 
              size="sm"
              onClick={clearAll}
              className="text-red-400 border-red-400/30 hover:bg-red-400/10"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Limpiar ({selectedCount})
            </Button>
          )}
        </div>
      </div>

      {/* Odontograma */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <div className="relative w-full h-64 bg-gradient-to-b from-slate-900/20 to-slate-800/20 rounded-lg overflow-hidden">
            {/* Línea de separación */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 transform -translate-y-0.5"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 transform -translate-x-0.5"></div>
            
            {/* Etiquetas de cuadrantes */}
            <div className="absolute top-2 left-2 text-xs text-white/60">Sup. Der.</div>
            <div className="absolute top-2 right-2 text-xs text-white/60">Sup. Izq.</div>
            <div className="absolute bottom-2 left-2 text-xs text-white/60">Inf. Der.</div>
            <div className="absolute bottom-2 right-2 text-xs text-white/60">Inf. Izq.</div>

            {/* Dientes */}
            {allTeeth.map((tooth) => {
              const isSelected = isToothSelected(tooth.number);
              const isHovered = hoveredTooth === tooth.number;
              const color = getToothColor(tooth, isSelected);
              
              return (
                <motion.div
                  key={tooth.number}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${tooth.position.x}%`,
                    top: `${tooth.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => setHoveredTooth(tooth.number)}
                  onHoverEnd={() => setHoveredTooth(null)}
                  onClick={() => handleToothClick(tooth)}
                >
                  {/* Efecto de brillo para seleccionados */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          `0 0 0 0 ${color}40`,
                          `0 0 0 6px ${color}20`,
                          `0 0 0 0 ${color}40`
                        ]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Diente */}
                  <div
                    className={`w-4 h-4 rounded-lg border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'border-white shadow-lg' 
                        : 'border-white/30'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                  
                  {/* Número del diente */}
                  {showLabels && (
                    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-white/80 font-mono">
                      {tooth.number}
                    </div>
                  )}
                </motion.div>
              );
            })}
            
            {/* Tooltip para diente en hover */}
            <AnimatePresence>
              {hoveredTooth && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm z-10"
                >
                  {allTeeth.find(t => t.number === hoveredTooth)?.name}
                  <br />
                  <span className="text-xs opacity-75">Diente #{hoveredTooth}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Lista de dientes seleccionados */}
      {selectedCount > 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <h4 className="text-white font-medium mb-3">
              Dientes seleccionados ({selectedCount})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedTeeth.map((tooth) => (
                <motion.div
                  key={tooth.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between bg-white/5 rounded-lg p-2"
                >
                  <div>
                    <span className="text-white font-medium">#{tooth.number}</span>
                    <span className="text-white/60 ml-2 text-sm">{tooth.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToothClick(allTeeth.find(t => t.number === tooth.number)!)}
                    className="text-red-400 hover:bg-red-400/10 h-8 w-8 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {selectedCount === 0 && (
        <div className="text-center text-white/60 py-4">
          <p>Haz clic en los dientes que necesitas reemplazar</p>
          <p className="text-sm mt-1">Puedes seleccionar múltiples dientes</p>
        </div>
      )}
    </div>
  );
}
