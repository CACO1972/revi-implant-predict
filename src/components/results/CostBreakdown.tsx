
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CostBreakdownProps {
  level: number;
}

export default function CostBreakdown({ level }: CostBreakdownProps) {
  const getCostEstimates = () => {
    switch (level) {
      case 1:
        return {
          primary: {
            treatment: "Implante + Corona",
            range: "$800.000 - $1.200.000",
            details: "Incluye implante, pilar y corona cerámica"
          },
          additional: [
            { item: "Radiografías", cost: "$30.000 - $50.000" },
            { item: "Cirugía guiada (opcional)", cost: "$150.000 - $250.000" }
          ],
          financing: "Disponible en 6-12 cuotas sin interés"
        };
      case 2:
        return {
          primary: {
            treatment: "Tratamiento Completo",
            range: "$900.000 - $1.400.000",
            details: "Incluye tratamiento preparatorio + implante + corona"
          },
          additional: [
            { item: "Limpieza profesional", cost: "$50.000 - $80.000" },
            { item: "Radiografías", cost: "$30.000 - $50.000" },
            { item: "Evaluación periodontal", cost: "$40.000 - $60.000" }
          ],
          financing: "Disponible en 6-18 cuotas"
        };
      case 3:
        return {
          primary: {
            treatment: "Tratamiento Integral",
            range: "$1.200.000 - $1.800.000",
            details: "Incluye tratamiento periodontal + implante + corona"
          },
          additional: [
            { item: "Tratamiento periodontal", cost: "$200.000 - $400.000" },
            { item: "Injerto óseo (si necesario)", cost: "$300.000 - $500.000" },
            { item: "Evaluaciones especializadas", cost: "$80.000 - $120.000" }
          ],
          financing: "Planes extendidos hasta 24 cuotas"
        };
      case 4:
        return {
          primary: {
            treatment: "Evaluación y Alternativas",
            range: "$400.000 - $1.000.000",
            details: "Tratamiento periodontal + alternativas protésicas"
          },
          additional: [
            { item: "Tratamiento periodontal completo", cost: "$300.000 - $600.000" },
            { item: "Prótesis removible", cost: "$250.000 - $450.000" },
            { item: "Puente fijo", cost: "$600.000 - $900.000" }
          ],
          financing: "Opciones flexibles según tratamiento"
        };
      default:
        return null;
    }
  };

  const costs = getCostEstimates();
  if (!costs) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10"
    >
      <div className="flex items-center mb-4">
        <DollarSign className="w-5 h-5 text-[#BFA181] mr-2" />
        <h3 className="text-lg font-semibold text-[#BFA181]">
          Estimación de Costos
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 ml-2 text-white/50 cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs">
                Costos referenciales en pesos chilenos. Los precios finales pueden variar según 
                la clínica, materiales utilizados y complejidad del caso.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Primary Treatment Cost */}
      <div className="bg-[#178582]/10 rounded-xl p-4 mb-4 border border-[#178582]/20">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-white">{costs.primary.treatment}</h4>
          <span className="text-[#178582] font-bold text-lg">{costs.primary.range}</span>
        </div>
        <p className="text-white/70 text-sm">{costs.primary.details}</p>
      </div>

      {/* Additional Costs */}
      <div className="space-y-2 mb-4">
        <h5 className="font-medium text-white/90 text-sm">Costos adicionales posibles:</h5>
        {costs.additional.map((item, index) => (
          <motion.div
            key={item.item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex justify-between items-center p-2 bg-white/5 rounded-lg"
          >
            <span className="text-white/80 text-sm">{item.item}</span>
            <span className="text-[#BFA181] font-medium text-sm">{item.cost}</span>
          </motion.div>
        ))}
      </div>

      {/* Financing */}
      <div className="bg-[#BFA181]/10 rounded-lg p-3 border border-[#BFA181]/20">
        <div className="flex items-center">
          <span className="text-[#BFA181] text-sm font-medium mr-2">💳 Financiamiento:</span>
          <span className="text-white/80 text-sm">{costs.financing}</span>
        </div>
      </div>

      <p className="text-white/50 text-xs mt-3 italic">
        * Los costos son referenciales y pueden variar. Consulta para obtener una cotización personalizada.
      </p>
    </motion.div>
  );
}
