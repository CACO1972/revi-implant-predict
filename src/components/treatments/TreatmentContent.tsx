
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import TreatmentChart from "@/components/treatments/TreatmentChart";
import TreatmentComparisonCards from "@/components/treatments/TreatmentComparisonCards";
import { treatmentTypes } from "@/data/treatmentData";

export default function TreatmentContent() {
  return (
    <>
      {Object.entries(treatmentTypes).map(([key, treatment]) => (
        <TabsContent key={key} value={key} className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#178582] mb-2 flex items-center justify-center gap-2">
              <span className="text-3xl">{treatment.icon}</span>
              {treatment.title}
            </h3>
            <p className="text-white/70 text-lg">{treatment.description}</p>
          </div>

          {/* Gráfico comparativo */}
          <div className="bg-white/5 rounded-xl p-6 border border-[#178582]/20">
            <h4 className="text-xl font-semibold text-[#BFA181] mb-4 text-center">
              Comparación Visual: Tiempo vs Éxito
            </h4>
            <TreatmentChart 
              conventional={treatment.conventional}
              immediate={treatment.immediate}
            />
          </div>

          {/* Comparación lado a lado */}
          <TreatmentComparisonCards
            conventional={treatment.conventional}
            immediate={treatment.immediate}
          />
        </TabsContent>
      ))}
    </>
  );
}
