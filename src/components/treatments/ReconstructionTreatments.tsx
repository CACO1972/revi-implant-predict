
import React from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { reconstructionTreatments } from "@/data/treatmentData";

export default function ReconstructionTreatments() {
  return (
    <div className="mt-12 border-t border-white/20 pt-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#BFA181] mb-2 flex items-center justify-center">
          <Wrench className="w-6 h-6 mr-2" />
          Tratamientos Previos de Reconstrucción
        </h3>
        <p className="text-white/70">
          Procedimientos necesarios antes de los implantes en casos con pérdida ósea o de tejidos
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reconstructionTreatments.map((treatment, index) => (
          <motion.div
            key={treatment.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-panel p-4 h-full">
              <h4 className="font-bold text-[#178582] mb-2">{treatment.name}</h4>
              <p className="text-white/80 text-sm mb-3">{treatment.description}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Duración:</span>
                  <span className="text-white">{treatment.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Éxito:</span>
                  <span className="text-green-400">{treatment.success}</span>
                </div>
                <div className="mt-3">
                  <span className="text-white/60 text-xs">Indicación:</span>
                  <p className="text-white/80 text-xs mt-1">{treatment.indication}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
