
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface RecommendationBoxProps {
  questionId: number;
}

const clinicalRecommendations = {
  1: "🚭 El tabaco reduce el flujo sanguíneo hasta en un 70%, dificultando la cicatrización y la integración del implante al hueso. Los fumadores tienen 2-3 veces más riesgo de fracaso.",
  2: "💉 La diabetes afecta la cicatrización de tejidos. Con niveles de HbA1c <7%, los implantes pueden tener éxito similar a pacientes no diabéticos.",
  3: "😴 El bruxismo genera fuerzas hasta 6 veces mayores que la masticación normal. Una férula nocturna protege tanto tus dientes naturales como los implantes.",
  4: "⏰ Después de perder un diente, se pierde hasta 50% del ancho del hueso en el primer año. Mientras antes actúes, mejor será el pronóstico.",
  5: "🦷 La cantidad de dientes determina la estrategia: 1 diente = 1 implante, varios dientes = puente o implantes múltiples, muchos dientes = All-on-4/6.",
  6: "🏗️ La selección exacta de dientes nos permite crear un plan preciso: cada diente tiene un pronóstico específico según su zona, y debemos considerar si la oclusión será implante contra implante o implante contra diente natural.",
  7: "⚠️ Estas condiciones deben tratarse antes de colocar implantes para crear un ambiente oral saludable y libre de bacterias.",
  8: "🔍 La causa de pérdida dental nos indica qué cuidados extra necesitas: trauma = menos riesgo, periodontitis (por dientes sueltos) = más seguimiento.",
  9: "🪥 La higiene es el factor #1 para el éxito a largo plazo. Los implantes necesitan cuidados similares a los dientes naturales pero sin caries."
};

export default function RecommendationBox({ questionId }: RecommendationBoxProps) {
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  
  useEffect(() => {
    console.log("DEBUG - questionId recibido:", questionId, "tipo:", typeof questionId);
    
    // Validar que el questionId esté en el rango válido (1-9)
    if (questionId >= 1 && questionId <= 9) {
      const message = clinicalRecommendations[questionId as keyof typeof clinicalRecommendations];
      setSelectedMessage(message);
      console.log("DEBUG - mensaje seleccionado:", message);
    } else {
      console.warn("questionId inválido, usando 1 como fallback:", questionId);
      setSelectedMessage(clinicalRecommendations[1]);
    }
  }, [questionId]);

  if (!selectedMessage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-blue-400" />
          </div>
        </div>
        <div>
          <h4 className="text-blue-400 font-medium text-sm mb-1">
            💡 Dato clínico importante
          </h4>
          <p className="text-white/80 text-xs leading-relaxed">
            {selectedMessage}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
