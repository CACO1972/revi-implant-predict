
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cigarette, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

export default function QuestionnaireDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl text-[#178582] mb-2 flex items-center justify-center gap-2">
          <Cigarette className="w-5 h-5" />
          Cuestionario Clínico Predictivo
        </h3>
        <p className="text-white/80 text-sm">Versión interactiva con feedback en tiempo real</p>
      </div>
      
      <motion.div 
        className="bg-white/5 border border-white/10 rounded-lg p-5"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex gap-3 mb-4">
          <div className="bg-[#178582] text-white w-10 h-10 rounded-full flex items-center justify-center">
            <Cigarette className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg text-white font-medium mb-1">¿Actualmente fumas?</h4>
            <p className="text-white/60 text-sm">Factor crítico para el éxito del implante</p>
          </div>
        </div>
        
        <div className="space-y-2 pl-13">
          {[
            { label: "No, nunca he fumado", icon: <CheckCircle className="w-4 h-4 text-green-400" />, selected: true },
            { label: "Dejé hace más de 5 años", icon: <CheckCircle className="w-4 h-4 text-green-300" /> },
            { label: "Dejé hace menos de 5 años", icon: <AlertCircle className="w-4 h-4 text-yellow-400" /> },
            { label: "Sí, ocasionalmente", icon: <AlertCircle className="w-4 h-4 text-orange-400" /> },
            { label: "Sí, regularmente", icon: <AlertCircle className="w-4 h-4 text-red-400" /> }
          ].map((option, index) => (
            <motion.label
              key={index}
              className={`flex items-center gap-3 p-3 rounded-md transition-all cursor-pointer ${
                option.selected ? 'bg-[#178582]/20 border border-[#178582]/40' : 'hover:bg-white/5'
              }`}
              whileHover={{ x: 5 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`border rounded-full w-5 h-5 flex items-center justify-center ${
                option.selected ? 'border-[#178582] bg-[#178582]' : 'border-white/40'
              }`}>
                {option.selected && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-white text-sm flex-1">{option.label}</span>
              {option.icon}
            </motion.label>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex items-start gap-3 bg-gradient-to-r from-green-500/15 to-transparent p-4 rounded-lg"
        >
          <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="Rio Assistant" className="w-8 h-8" />
          <div>
            <p className="text-sm text-white/90">
              <span className="text-green-400 font-medium">🎉 Río:</span> ¡Perfecto! Sin tabaco significa mejor cicatrización y mayor éxito del implante.
            </p>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-[#178582] to-[#BFA181] hover:from-[#178582]/90 hover:to-[#BFA181]/90 text-white shadow-glow px-8 py-3 rounded-xl">
          <span>Prueba la versión completa</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
