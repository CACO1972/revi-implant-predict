
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";

export default function QuestionnaireDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h3 className="text-xl text-[#178582] mb-2">Cuestionario Clínico Predictivo</h3>
        <p className="text-white/80">11 preguntas validadas científicamente para determinar tu candidatura a implantes dentales</p>
      </div>
      
      <motion.div 
        className="bg-white/5 border border-white/10 rounded-lg p-5"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex gap-2 mb-4">
          <div className="bg-[#178582] text-white w-8 h-8 rounded-full flex items-center justify-center">
            1
          </div>
          <h4 className="text-lg text-white font-medium">¿Actualmente fumas cigarrillos o usas tabaco?</h4>
        </div>
        
        <p className="mb-4 text-white/70 pl-10">
          El tabaquismo afecta significativamente la cicatrización y el éxito de los implantes dentales.
        </p>
        
        <div className="space-y-2 pl-10">
          <label className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5">
            <div className="border border-white/40 rounded-full w-5 h-5 flex items-center justify-center">
              <Radio className="w-3 h-3 text-[#178582]" />
            </div>
            <span className="text-white">No, nunca he fumado</span>
          </label>
          
          <label className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5">
            <div className="border border-white/40 rounded-full w-5 h-5 flex items-center justify-center"></div>
            <span className="text-white">Fumé, pero dejé hace más de 5 años</span>
          </label>
          
          <label className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5">
            <div className="border border-white/40 rounded-full w-5 h-5 flex items-center justify-center"></div>
            <span className="text-white">Fumé, pero dejé hace menos de 5 años</span>
          </label>
          
          <label className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5">
            <div className="border border-white/40 rounded-full w-5 h-5 flex items-center justify-center"></div>
            <span className="text-white">Sí, fumo ocasionalmente (menos de 10 al día)</span>
          </label>
          
          <label className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5">
            <div className="border border-white/40 rounded-full w-5 h-5 flex items-center justify-center"></div>
            <span className="text-white">Sí, fumo regularmente (más de 10 al día)</span>
          </label>
        </div>
        
        <div className="mt-6 flex justify-center">
          <div className="flex items-start gap-3 bg-gradient-to-r from-[#178582]/15 to-transparent p-4 rounded-lg max-w-md">
            <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="Rio Assistant" className="w-8 h-8 mr-2" />
            <p className="text-sm text-white/90">
              <span className="text-[#178582] font-medium">Río:</span> El tabaquismo afecta significativamente el éxito de los implantes. Si fumas, reducir o idealmente dejar el hábito mejora mucho el pronóstico.
            </p>
          </div>
        </div>
      </motion.div>
      
      <div className="flex justify-between gap-4 mt-8">
        <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">
          Anterior
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-[#178582] to-[#BFA181] hover:from-[#178582]/90 hover:to-[#BFA181]/90 text-white shadow-glow">
          Siguiente
        </Button>
      </div>
    </div>
  );
}
