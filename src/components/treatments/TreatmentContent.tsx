
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import TreatmentChart from "@/components/treatments/TreatmentChart";
import TreatmentComparisonCards from "@/components/treatments/TreatmentComparisonCards";
import { treatmentTypes } from "@/data/treatmentData";

export default function TreatmentContent() {
  return (
    <>
      {Object.entries(treatmentTypes).map(([key, treatment]) => (
        <TabsContent key={key} value={key}>
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#178582] mb-2">
                {treatment.icon} {treatment.title}
              </h3>
              <p className="text-white/70">{treatment.description}</p>
            </div>

            {/* Gráfico comparativo */}
            <TreatmentChart 
              conventional={treatment.conventional}
              immediate={treatment.immediate}
            />

            {/* Comparación lado a lado */}
            <TreatmentComparisonCards
              conventional={treatment.conventional}
              immediate={treatment.immediate}
            />
          </div>
        </TabsContent>
      ))}
    </>
  );
}
