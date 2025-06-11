
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Star, AlertTriangle } from 'lucide-react';

interface TreatmentAlternativesProps {
  level: number;
}

export default function TreatmentAlternatives({ level }: TreatmentAlternativesProps) {
  const getTreatmentOptions = () => {
    switch (level) {
      case 1:
        return [
          {
            name: "Implante Convencional",
            duration: "3-6 meses",
            success: "95-98%",
            description: "Tratamiento estándar con excelente pronóstico",
            icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
            recommended: true
          },
          {
            name: "Carga Inmediata",
            duration: "1-3 meses",
            success: "90-95%",
            description: "Colocación y corona provisional el mismo día",
            icon: <Star className="w-5 h-5 text-[#BFA181]" />,
            recommended: true
          }
        ];
      case 2:
        return [
          {
            name: "Implante Convencional",
            duration: "4-6 meses",
            success: "90-95%",
            description: "Recomendado con preparación previa",
            icon: <CheckCircle className="w-5 h-5 text-[#178582]" />,
            recommended: true
          },
          {
            name: "Tratamiento en Etapas",
            duration: "6-9 meses",
            success: "85-92%",
            description: "Optimización de condiciones antes del implante",
            icon: <Clock className="w-5 h-5 text-[#178582]" />,
            recommended: false
          }
        ];
      case 3:
        return [
          {
            name: "Tratamiento Preparatorio",
            duration: "3-6 meses",
            success: "Variable",
            description: "Optimización de factores de riesgo antes del implante",
            icon: <Clock className="w-5 h-5 text-[#BFA181]" />,
            recommended: true
          },
          {
            name: "Implante Convencional Post-tratamiento",
            duration: "6-12 meses total",
            success: "80-90%",
            description: "Después de abordar factores de riesgo",
            icon: <CheckCircle className="w-5 h-5 text-[#BFA181]" />,
            recommended: false
          }
        ];
      case 4:
        return [
          {
            name: "Evaluación Periodontal Completa",
            duration: "2-4 meses",
            success: "Variable",
            description: "Tratamiento de condiciones previas necesario",
            icon: <AlertTriangle className="w-5 h-5 text-orange-400" />,
            recommended: true
          },
          {
            name: "Alternativas Protésicas",
            duration: "1-3 meses",
            success: "85-95%",
            description: "Prótesis removible o puente como alternativa",
            icon: <Clock className="w-5 h-5 text-orange-400" />,
            recommended: false
          }
        ];
      default:
        return [];
    }
  };

  const treatments = getTreatmentOptions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10"
    >
      <h3 className="text-lg font-semibold text-[#BFA181] mb-4">
        Alternativas de Tratamiento Recomendadas
      </h3>
      
      <div className="space-y-4">
        {treatments.map((treatment, index) => (
          <motion.div
            key={treatment.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`
              p-4 rounded-xl border transition-all
              ${treatment.recommended 
                ? 'bg-[#178582]/10 border-[#178582]/30' 
                : 'bg-white/5 border-white/10'
              }
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {treatment.icon}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-white">{treatment.name}</h4>
                    {treatment.recommended && (
                      <span className="px-2 py-1 bg-[#178582]/20 text-[#178582] text-xs rounded-full">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 text-sm mb-2">{treatment.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-white/60">
                    <span>Duración: {treatment.duration}</span>
                    <span>Éxito: {treatment.success}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
