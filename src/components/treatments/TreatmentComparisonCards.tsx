
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Zap, 
  CheckCircle, 
  AlertTriangle 
} from "lucide-react";

interface TreatmentData {
  duration: string;
  success: string;
  cost: string;
  steps: string[];
  benefits: string[];
  drawbacks: string[];
}

interface TreatmentComparisonCardsProps {
  conventional: TreatmentData;
  immediate: TreatmentData;
}

export default function TreatmentComparisonCards({ conventional, immediate }: TreatmentComparisonCardsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Carga Convencional */}
      <Card className="glass-panel p-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-6 h-6 text-[#BFA181] mr-2" />
          <h4 className="text-xl font-bold text-[#BFA181]">Carga Convencional</h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/80">Duración:</span>
            <span className="font-semibold text-white">{conventional.duration}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Éxito:</span>
            <span className="font-semibold text-green-400">{conventional.success}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Costo:</span>
            <span className="font-semibold text-white">{conventional.cost}</span>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="font-semibold text-[#178582] mb-3">Proceso:</h5>
          <ol className="space-y-2">
            {conventional.steps.map((step, idx) => (
              <li key={idx} className="flex items-start">
                <span className="bg-[#178582] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-white/80 text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <div>
            <h5 className="flex items-center text-green-400 font-medium mb-2">
              <CheckCircle className="w-4 h-4 mr-1" />
              Ventajas
            </h5>
            <ul className="text-white/80 text-sm space-y-1">
              {conventional.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="flex items-center text-amber-500 font-medium mb-2">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Consideraciones
            </h5>
            <ul className="text-white/80 text-sm space-y-1">
              {conventional.drawbacks.map((drawback, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  {drawback}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Carga Inmediata */}
      <Card className="glass-panel p-6 border-[#178582]/30">
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-[#178582] mr-2" />
          <h4 className="text-xl font-bold text-[#178582]">Carga Inmediata</h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/80">Duración:</span>
            <span className="font-semibold text-white">{immediate.duration}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Éxito:</span>
            <span className="font-semibold text-green-400">{immediate.success}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Costo:</span>
            <span className="font-semibold text-white">{immediate.cost}</span>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="font-semibold text-[#178582] mb-3">Proceso:</h5>
          <ol className="space-y-2">
            {immediate.steps.map((step, idx) => (
              <li key={idx} className="flex items-start">
                <span className="bg-[#178582] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-white/80 text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <div>
            <h5 className="flex items-center text-green-400 font-medium mb-2">
              <CheckCircle className="w-4 h-4 mr-1" />
              Ventajas
            </h5>
            <ul className="text-white/80 text-sm space-y-1">
              {immediate.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="flex items-center text-amber-500 font-medium mb-2">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Consideraciones
            </h5>
            <ul className="text-white/80 text-sm space-y-1">
              {immediate.drawbacks.map((drawback, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  {drawback}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
