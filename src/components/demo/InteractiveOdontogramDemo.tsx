
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToothPosition {
  id: string;
  name: string;
  x: number; // porcentaje
  y: number; // porcentaje
  width: number;
  height: number;
}

// Mapeo de posiciones de dientes (ajustado para vista esquemática)
const toothPositions: ToothPosition[] = [
  // Maxilar Superior Derecho (vista del paciente)
  { id: '18', name: 'Tercer molar superior derecho', x: 15, y: 20, width: 6, height: 8 },
  { id: '17', name: 'Segundo molar superior derecho', x: 22, y: 18, width: 6, height: 8 },
  { id: '16', name: 'Primer molar superior derecho', x: 29, y: 16, width: 6, height: 8 },
  { id: '15', name: 'Segundo premolar superior derecho', x: 36, y: 14, width: 5, height: 7 },
  { id: '14', name: 'Primer premolar superior derecho', x: 42, y: 12, width: 5, height: 7 },
  { id: '13', name: 'Canino superior derecho', x: 47, y: 10, width: 4, height: 9 },
  { id: '12', name: 'Incisivo lateral superior derecho', x: 52, y: 8, width: 4, height: 8 },
  { id: '11', name: 'Incisivo central superior derecho', x: 57, y: 8, width: 4, height: 8 },
  
  // Maxilar Superior Izquierdo
  { id: '21', name: 'Incisivo central superior izquierdo', x: 62, y: 8, width: 4, height: 8 },
  { id: '22', name: 'Incisivo lateral superior izquierdo', x: 67, y: 8, width: 4, height: 8 },
  { id: '23', name: 'Canino superior izquierdo', x: 72, y: 10, width: 4, height: 9 },
  { id: '24', name: 'Primer premolar superior izquierdo', x: 77, y: 12, width: 5, height: 7 },
  { id: '25', name: 'Segundo premolar superior izquierdo', x: 83, y: 14, width: 5, height: 7 },
  { id: '26', name: 'Primer molar superior izquierdo', x: 89, y: 16, width: 6, height: 8 },
  { id: '27', name: 'Segundo molar superior izquierdo', x: 96, y: 18, width: 6, height: 8 },
  { id: '28', name: 'Tercer molar superior izquierdo', x: 103, y: 20, width: 6, height: 8 },
  
  // Mandíbula Inferior Derecha
  { id: '48', name: 'Tercer molar inferior derecho', x: 15, y: 70, width: 6, height: 8 },
  { id: '47', name: 'Segundo molar inferior derecho', x: 22, y: 72, width: 6, height: 8 },
  { id: '46', name: 'Primer molar inferior derecho', x: 29, y: 74, width: 6, height: 8 },
  { id: '45', name: 'Segundo premolar inferior derecho', x: 36, y: 76, width: 5, height: 7 },
  { id: '44', name: 'Primer premolar inferior derecho', x: 42, y: 78, width: 5, height: 7 },
  { id: '43', name: 'Canino inferior derecho', x: 47, y: 80, width: 4, height: 9 },
  { id: '42', name: 'Incisivo lateral inferior derecho', x: 52, y: 82, width: 4, height: 8 },
  { id: '41', name: 'Incisivo central inferior derecho', x: 57, y: 82, width: 4, height: 8 },
  
  // Mandíbula Inferior Izquierda
  { id: '31', name: 'Incisivo central inferior izquierdo', x: 62, y: 82, width: 4, height: 8 },
  { id: '32', name: 'Incisivo lateral inferior izquierdo', x: 67, y: 82, width: 4, height: 8 },
  { id: '33', name: 'Canino inferior izquierdo', x: 72, y: 80, width: 4, height: 9 },
  { id: '34', name: 'Primer premolar inferior izquierdo', x: 77, y: 78, width: 5, height: 7 },
  { id: '35', name: 'Segundo premolar inferior izquierdo', x: 83, y: 76, width: 5, height: 7 },
  { id: '36', name: 'Primer molar inferior izquierdo', x: 89, y: 74, width: 6, height: 8 },
  { id: '37', name: 'Segundo molar inferior izquierdo', x: 96, y: 72, width: 6, height: 8 },
  { id: '38', name: 'Tercer molar inferior izquierdo', x: 103, y: 70, width: 6, height: 8 }
];

export default function InteractiveOdontogramDemo() {
  const [absentTeeth, setAbsentTeeth] = useState<Set<string>>(new Set());
  const [rioMessage, setRioMessage] = useState("Hola, soy Río. Haz clic en cada diente que te falte para marcarlo como ausente. ¡Cuando termines, verás tu evaluación!");
  const [isVisible, setIsVisible] = useState(false);

  const toggleTooth = (toothId: string) => {
    const newAbsentTeeth = new Set(absentTeeth);
    const tooth = toothPositions.find(t => t.id === toothId);
    
    if (absentTeeth.has(toothId)) {
      newAbsentTeeth.delete(toothId);
      setRioMessage(`Has desmarcado el diente ${toothId} (${tooth?.name}).`);
    } else {
      newAbsentTeeth.add(toothId);
      setRioMessage(`Has marcado el diente ${toothId} (${tooth?.name}) como ausente.`);
    }
    
    setAbsentTeeth(newAbsentTeeth);
  };

  const handleFinish = () => {
    const count = absentTeeth.size;
    if (count === 0) {
      setRioMessage("¡Perfecto! No tienes dientes faltantes. Tu pronóstico de implantes sería excelente.");
    } else if (count <= 3) {
      setRioMessage(`Tienes ${count} diente${count > 1 ? 's' : ''} faltante${count > 1 ? 's' : ''}. Esto es manejable con implantes individuales.`);
    } else if (count <= 8) {
      setRioMessage(`Tienes ${count} dientes faltantes. Podrías necesitar implantes múltiples o una prótesis parcial.`);
    } else {
      setRioMessage(`Tienes ${count} dientes faltantes. Sería ideal considerar una rehabilitación completa con implantes.`);
    }
  };

  const resetDemo = () => {
    setAbsentTeeth(new Set());
    setRioMessage("Demo reiniciada. Haz clic en los dientes que te falten para marcarlos como ausentes.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040D18]/90 backdrop-blur-sm ${!isVisible ? 'pointer-events-none' : ''}`}
    >
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A1828] text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">ImplantDX - Odontograma Interactivo</h2>
            <p className="text-[#5BCBFF] text-sm">Marca los dientes que te faltan</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Odontograma */}
        <div className="p-6">
          <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg border-2 border-[#178582]/20 overflow-hidden">
            {/* Línea central */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-[#178582]/30 transform -translate-x-0.5"></div>
            
            {/* Línea horizontal separando maxilar de mandíbula */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#178582]/30 transform -translate-y-0.5"></div>
            
            {/* Labels */}
            <div className="absolute top-2 left-4 text-xs text-[#0A1828]/60 font-medium">Maxilar Superior</div>
            <div className="absolute bottom-2 left-4 text-xs text-[#0A1828]/60 font-medium">Mandíbula Inferior</div>
            <div className="absolute top-2 left-1/4 text-xs text-[#0A1828]/60">Derecha</div>
            <div className="absolute top-2 right-1/4 text-xs text-[#0A1828]/60">Izquierda</div>
            
            {/* Dientes */}
            {toothPositions.map((tooth) => (
              <motion.div
                key={tooth.id}
                className={`absolute cursor-pointer rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  absentTeeth.has(tooth.id)
                    ? 'bg-red-500 border-red-600 text-white'
                    : 'bg-white border-[#178582] text-[#0A1828] hover:bg-[#178582]/10 hover:scale-110'
                }`}
                style={{
                  left: `${tooth.x}%`,
                  top: `${tooth.y}%`,
                  width: `${tooth.width}%`,
                  height: `${tooth.height}%`,
                }}
                onClick={() => toggleTooth(tooth.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={tooth.name}
              >
                {tooth.id}
              </motion.div>
            ))}
          </div>

          {/* Mensaje de Río */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-[#178582]/10 border-l-4 border-[#178582] p-4 rounded-r-lg"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🤖</div>
              <p className="text-[#0A1828] text-sm leading-relaxed">{rioMessage}</p>
            </div>
          </motion.div>

          {/* Leyenda */}
          <div className="mt-4 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white border-2 border-[#178582]"></div>
              <span className="text-[#0A1828]/70">Diente presente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-600"></div>
              <span className="text-[#0A1828]/70">Diente faltante</span>
            </div>
          </div>

          {/* Estadísticas */}
          {absentTeeth.size > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 bg-[#BFA181]/10 rounded-lg p-4 text-center"
            >
              <p className="text-[#0A1828] font-semibold">
                Dientes seleccionados: {absentTeeth.size}
              </p>
              <p className="text-xs text-[#0A1828]/70 mt-1">
                {Array.from(absentTeeth).join(', ')}
              </p>
            </motion.div>
          )}

          {/* Botones */}
          <div className="flex gap-4 mt-6">
            <Button
              onClick={resetDemo}
              variant="outline"
              className="flex-1 border-[#178582] text-[#178582] hover:bg-[#178582]/10"
            >
              Reiniciar
            </Button>
            <Button
              onClick={handleFinish}
              className="flex-1 bg-[#178582] hover:bg-[#178582]/90 text-white"
            >
              Ver Evaluación
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
