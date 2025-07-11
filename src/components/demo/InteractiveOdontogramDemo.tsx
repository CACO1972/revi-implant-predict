
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Odontogram3D from "./Odontogram3D";

export default function InteractiveOdontogramDemo() {
  const [missingTeeth, setMissingTeeth] = useState<string[]>([]);
  const [rioMessage, setRioMessage] = useState("¡Hola! Soy Río. Este es nuestro odontograma 3D interactivo. Rota la vista y toca los dientes que te falten para marcarlos. ¡Es súper fácil!");
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectionChange = (selectedTeeth: string[]) => {
    setMissingTeeth(selectedTeeth);
    
    const count = selectedTeeth.length;
    if (count === 0) {
      setRioMessage("¡Perfecto! No tienes dientes faltantes. Tu caso sería ideal para mantener tu sonrisa natural.");
    } else if (count <= 3) {
      setRioMessage(`Tienes ${count} diente${count > 1 ? 's' : ''} faltante${count > 1 ? 's' : ''}. Con implantes individuales podrías recuperar tu sonrisa completamente.`);
    } else if (count <= 8) {
      setRioMessage(`Con ${count} dientes faltantes, podrías necesitar implantes múltiples o una prótesis parcial sobre implantes. ¡Hay muy buenas opciones!`);
    } else {
      setRioMessage(`Tienes ${count} dientes faltantes. Una rehabilitación completa con implantes te devolvería toda la funcionalidad. ¡Es más común de lo que crees!`);
    }
  };

  const handleEvaluate = () => {
    if (missingTeeth.length === 0) {
      setRioMessage("¡Genial! Aunque no tengas dientes faltantes, siempre es bueno saber sobre opciones de tratamiento preventivo.");
    } else {
      setRioMessage(`Perfecto. Con ${missingTeeth.length} dientes faltantes, te recomiendo hacer nuestra evaluación completa para conocer tus opciones específicas y costos estimados.`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040D18]/95 backdrop-blur-sm ${!isVisible ? 'pointer-events-none' : ''}`}
    >
      <div className="w-full max-w-5xl bg-gradient-to-b from-[#0A1828] to-[#040D18] rounded-xl shadow-2xl overflow-hidden border border-[#178582]/30">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#178582] to-[#5BCBFF] text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Odontograma 3D Interactivo</h2>
            <p className="text-white/90 text-sm">Marca los dientes que te faltan - Experiencia realista en 3D</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Contenido principal */}
        <div className="p-6 space-y-6">
          {/* Odontograma 3D */}
          <Odontogram3D onChange={handleSelectionChange} />

          {/* Mensaje de Río */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#5BCBFF]/10 to-[#178582]/10 border border-[#5BCBFF]/30 p-4 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🤖</div>
              <div className="flex-1">
                <p className="text-white text-sm leading-relaxed">{rioMessage}</p>
              </div>
            </div>
          </motion.div>

          {/* Estadísticas y leyenda */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Estadísticas */}
            {missingTeeth.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#FF8C42]/10 border border-[#FF8C42]/30 rounded-lg p-4"
              >
                <h3 className="text-[#FF8C42] font-bold mb-2">Resumen de tu caso:</h3>
                <p className="text-white font-semibold">
                  {missingTeeth.length} diente{missingTeeth.length !== 1 ? 's' : ''} seleccionado{missingTeeth.length !== 1 ? 's' : ''}
                </p>
                <div className="text-xs text-white/70 mt-2 max-h-16 overflow-y-auto">
                  Dientes: {missingTeeth.sort().join(', ')}
                </div>
              </motion.div>
            )}

            {/* Leyenda */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-[#5BCBFF] font-bold mb-3">Leyenda:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-[#178582]"></div>
                  <span className="text-white/80">Diente presente</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#FF8C42]"></div>
                  <span className="text-white/80">Diente faltante</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#5BCBFF]/50 animate-pulse"></div>
                  <span className="text-white/80">Diente seleccionado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleEvaluate}
              className="flex-1 bg-gradient-to-r from-[#5BCBFF] to-[#178582] hover:from-[#178582] hover:to-[#5BCBFF] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Ver Evaluación Detallada
            </Button>
            <Button
              onClick={() => setIsVisible(false)}
              variant="outline"
              className="flex-1 border-[#BFA181] text-[#BFA181] hover:bg-[#BFA181]/10 py-3 px-6 rounded-xl"
            >
              Cerrar Demo
            </Button>
          </div>

          {/* Nota adicional */}
          <div className="text-center">
            <p className="text-[#BFA181]/80 text-xs">
              * Esta es una demostración interactiva. Para una evaluación profesional real, 
              completa nuestro cuestionario médico.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
