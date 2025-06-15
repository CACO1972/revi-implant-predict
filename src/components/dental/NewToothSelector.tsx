
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Info, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MissingTooth {
  number: number;
  name: string;
  dateLost?: string;
  cause?: string;
}

interface NewToothSelectorProps {
  onSelectionChange: (selectedTeeth: MissingTooth[]) => void;
  selectedTeeth: MissingTooth[];
}

// Mapeo mejorado con posiciones más claras y nombres completos
const toothData = {
  // Maxilar superior (numeración FDI)
  18: { name: "Muela del juicio superior derecha", zone: "posterior-right", side: "upper" },
  17: { name: "Segunda muela superior derecha", zone: "posterior-right", side: "upper" },
  16: { name: "Primera muela superior derecha", zone: "posterior-right", side: "upper" },
  15: { name: "Segundo premolar superior derecho", zone: "premolar-right", side: "upper" },
  14: { name: "Primer premolar superior derecho", zone: "premolar-right", side: "upper" },
  13: { name: "Colmillo superior derecho", zone: "anterior", side: "upper" },
  12: { name: "Incisivo lateral superior derecho", zone: "anterior", side: "upper" },
  11: { name: "Incisivo central superior derecho", zone: "anterior", side: "upper" },
  
  21: { name: "Incisivo central superior izquierdo", zone: "anterior", side: "upper" },
  22: { name: "Incisivo lateral superior izquierdo", zone: "anterior", side: "upper" },
  23: { name: "Colmillo superior izquierdo", zone: "anterior", side: "upper" },
  24: { name: "Primer premolar superior izquierdo", zone: "premolar-left", side: "upper" },
  25: { name: "Segundo premolar superior izquierdo", zone: "premolar-left", side: "upper" },
  26: { name: "Primera muela superior izquierda", zone: "posterior-left", side: "upper" },
  27: { name: "Segunda muela superior izquierda", zone: "posterior-left", side: "upper" },
  28: { name: "Muela del juicio superior izquierda", zone: "posterior-left", side: "upper" },
  
  // Mandíbula inferior
  48: { name: "Muela del juicio inferior derecha", zone: "posterior-right", side: "lower" },
  47: { name: "Segunda muela inferior derecha", zone: "posterior-right", side: "lower" },
  46: { name: "Primera muela inferior derecha", zone: "posterior-right", side: "lower" },
  45: { name: "Segundo premolar inferior derecho", zone: "premolar-right", side: "lower" },
  44: { name: "Primer premolar inferior derecho", zone: "premolar-right", side: "lower" },
  43: { name: "Colmillo inferior derecho", zone: "anterior", side: "lower" },
  42: { name: "Incisivo lateral inferior derecho", zone: "anterior", side: "lower" },
  41: { name: "Incisivo central inferior derecho", zone: "anterior", side: "lower" },
  
  31: { name: "Incisivo central inferior izquierdo", zone: "anterior", side: "lower" },
  32: { name: "Incisivo lateral inferior izquierdo", zone: "anterior", side: "lower" },
  33: { name: "Colmillo inferior izquierdo", zone: "anterior", side: "lower" },
  34: { name: "Primer premolar inferior izquierdo", zone: "premolar-left", side: "lower" },
  35: { name: "Segundo premolar inferior izquierdo", zone: "premolar-left", side: "lower" },
  36: { name: "Primera muela inferior izquierda", zone: "posterior-left", side: "lower" },
  37: { name: "Segunda muela inferior izquierda", zone: "posterior-left", side: "lower" },
  38: { name: "Muela del juicio inferior izquierda", zone: "posterior-left", side: "lower" }
};

export default function NewToothSelector({ onSelectionChange, selectedTeeth }: NewToothSelectorProps) {
  const [selectedToothForDetails, setSelectedToothForDetails] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual');

  const handleToothClick = (toothNumber: number) => {
    const isSelected = selectedTeeth.some(tooth => tooth.number === toothNumber);
    
    if (isSelected) {
      // Remover diente
      const newSelection = selectedTeeth.filter(tooth => tooth.number !== toothNumber);
      onSelectionChange(newSelection);
    } else {
      // Agregar diente
      const newTooth: MissingTooth = {
        number: toothNumber,
        name: toothData[toothNumber as keyof typeof toothData].name
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

  const getToothPosition = (toothNumber: number) => {
    const teeth = toothData[toothNumber as keyof typeof toothData];
    if (!teeth) return { x: 50, y: 50 };

    // Posiciones mejoradas para mejor visualización
    const positions: { [key: string]: { x: number, y: number } } = {
      // Maxilar superior
      "18": { x: 15, y: 25 }, "17": { x: 22, y: 28 }, "16": { x: 29, y: 31 },
      "15": { x: 36, y: 34 }, "14": { x: 42, y: 36 }, "13": { x: 47, y: 38 },
      "12": { x: 51, y: 39 }, "11": { x: 55, y: 40 },
      
      "21": { x: 45, y: 40 }, "22": { x: 49, y: 39 }, "23": { x: 53, y: 38 },
      "24": { x: 58, y: 36 }, "25": { x: 64, y: 34 }, "26": { x: 71, y: 31 },
      "27": { x: 78, y: 28 }, "28": { x: 85, y: 25 },
      
      // Mandíbula inferior
      "48": { x: 15, y: 75 }, "47": { x: 22, y: 72 }, "46": { x: 29, y: 69 },
      "45": { x: 36, y: 66 }, "44": { x: 42, y: 64 }, "43": { x: 47, y: 62 },
      "42": { x: 51, y: 61 }, "41": { x: 55, y: 60 },
      
      "31": { x: 45, y: 60 }, "32": { x: 49, y: 61 }, "33": { x: 53, y: 62 },
      "34": { x: 58, y: 64 }, "35": { x: 64, y: 66 }, "36": { x: 71, y: 69 },
      "37": { x: 78, y: 72 }, "38": { x: 85, y: 75 }
    };

    return positions[toothNumber.toString()] || { x: 50, y: 50 };
  };

  const ToothButton = ({ toothNumber }: { toothNumber: number }) => {
    const position = getToothPosition(toothNumber);
    const isSelected = isToothSelected(toothNumber);
    const toothInfo = toothData[toothNumber as keyof typeof toothData];

    return (
      <motion.g
        key={toothNumber}
        style={{ cursor: 'pointer' }}
        onClick={() => handleToothClick(toothNumber)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Diente */}
        <circle
          cx={position.x}
          cy={position.y}
          r="3"
          fill={isSelected ? "#ef4444" : "#ffffff"}
          stroke={isSelected ? "#dc2626" : "#178582"}
          strokeWidth="0.8"
          className="drop-shadow-sm"
        />
        
        {/* Número del diente */}
        <text
          x={position.x}
          y={position.y - 5}
          fontSize="2.5"
          fill="white"
          textAnchor="middle"
          className="pointer-events-none font-mono font-bold drop-shadow-sm"
        >
          {toothNumber}
        </text>
        
        {/* Nombre del diente (visible en hover) */}
        <title>{toothInfo.name}</title>
      </motion.g>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Selecciona los dientes que te faltan
        </h3>
        <p className="text-white/70 text-sm mb-4">
          Haz clic en los dientes en el diagrama o usa la lista de abajo
        </p>
        
        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={viewMode === 'visual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('visual')}
            className="text-xs"
          >
            Vista Diagrama
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="text-xs"
          >
            Vista Lista
          </Button>
        </div>
      </div>

      {viewMode === 'visual' ? (
        // Vista de diagrama mejorada
        <div className="relative bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-80 mx-auto"
          >
            {/* Fondo de la boca */}
            <ellipse cx="50" cy="50" rx="40" ry="22" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            
            {/* Línea de separación maxilar/mandíbula */}
            <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" strokeDasharray="2,2"/>
            
            {/* Etiquetas de zonas */}
            <text x="50" y="15" fontSize="3" fill="rgba(255,255,255,0.6)" textAnchor="middle" className="font-bold">MAXILAR SUPERIOR</text>
            <text x="50" y="90" fontSize="3" fill="rgba(255,255,255,0.6)" textAnchor="middle" className="font-bold">MANDÍBULA INFERIOR</text>
            
            {/* Renderizar todos los dientes */}
            {Object.keys(toothData).map(toothNumber => (
              <ToothButton key={toothNumber} toothNumber={parseInt(toothNumber)} />
            ))}
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
      ) : (
        // Vista de lista por zonas
        <div className="space-y-4">
          {['anterior', 'premolar-right', 'premolar-left', 'posterior-right', 'posterior-left'].map(zone => {
            const zoneTeeth = Object.entries(toothData)
              .filter(([_, data]) => data.zone === zone)
              .sort(([a], [b]) => parseInt(a) - parseInt(b));
            
            if (zoneTeeth.length === 0) return null;
            
            const zoneName = {
              'anterior': 'Dientes Anteriores (Incisivos y Colmillos)',
              'premolar-right': 'Premolares Derechos',
              'premolar-left': 'Premolares Izquierdos',
              'posterior-right': 'Molares Derechos',
              'posterior-left': 'Molares Izquierdos'
            }[zone];

            return (
              <div key={zone} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-[#BFA181] font-medium mb-3">{zoneName}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {zoneTeeth.map(([toothNumber, data]) => {
                    const isSelected = isToothSelected(parseInt(toothNumber));
                    return (
                      <motion.button
                        key={toothNumber}
                        onClick={() => handleToothClick(parseInt(toothNumber))}
                        className={`text-left p-3 rounded-lg border transition-all ${
                          isSelected
                            ? "border-red-500 bg-red-500/20 text-red-300"
                            : "border-white/20 hover:border-[#178582] hover:bg-[#178582]/10 text-white"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-2">
                          {isSelected ? (
                            <Minus className="w-4 h-4 text-red-400" />
                          ) : (
                            <Plus className="w-4 h-4 text-[#178582]" />
                          )}
                          <div>
                            <div className="font-mono text-sm">#{toothNumber}</div>
                            <div className="text-xs opacity-80">{data.name}</div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

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
                    <Label className="text-white/80 text-xs">¿Cuándo lo perdiste? (aproximadamente)</Label>
                    <Input
                      type="month"
                      value={tooth.dateLost || ""}
                      onChange={(e) => updateToothDetails(tooth.number, 'dateLost', e.target.value)}
                      className="bg-white/10 border-white/20 text-white text-sm mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white/80 text-xs">¿Por qué lo perdiste?</Label>
                    <select
                      value={tooth.cause || ""}
                      onChange={(e) => updateToothDetails(tooth.number, 'cause', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm mt-1"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="caries">Caries severa</option>
                      <option value="trauma">Trauma/Accidente</option>
                      <option value="periodontitis">Periodontitis (encías)</option>
                      <option value="orthodontics">Tratamiento ortodóncico</option>
                      <option value="congenital">Nunca salió (agenesia)</option>
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
