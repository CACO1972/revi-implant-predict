
import { motion } from "framer-motion";
import { CircleCheck, AlertCircle, Clock } from "lucide-react";

export default function ClinicalFlowDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h3 className="text-xl text-[#178582] mb-2">Flujo Clínico: Tú estás aquí</h3>
        <p className="text-white/80">Conoce cada etapa del proceso de tratamiento con implantes dentales</p>
      </div>
      
      <div className="relative py-10">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#178582] to-[#BFA181]"></div>
        
        {/* Step 1 */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative mb-16 flex items-center"
        >
          <div className="w-1/2 pr-8 text-right">
            <h4 className="text-[#BFA181] font-medium">1. Evaluación inicial</h4>
            <p className="text-white/70 text-sm">Diagnóstico completo del caso mediante evaluación clínica y radiográfica</p>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#178582] border-4 border-[#0A1828] flex items-center justify-center">
            <CircleCheck className="w-5 h-5 text-white" />
          </div>
          <div className="w-1/2 pl-8">
            <span className="text-xs text-[#178582] font-medium">Hoy</span>
          </div>
        </motion.div>
        
        {/* Step 2 - You are here */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative mb-16 flex items-center"
        >
          <div className="w-1/2 pr-8 text-right">
            <h4 className="text-[#BFA181] font-medium">2. Planificación digital</h4>
            <p className="text-white/70 text-sm">Diseño virtual de la cirugía y restauración con software especializado</p>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#BFA181] border-4 border-[#0A1828] flex items-center justify-center animate-pulse">
            <span className="text-[#0A1828] font-bold text-xs">TÚ ESTÁS AQUÍ</span>
          </div>
          <div className="w-1/2 pl-8">
            <span className="text-xs text-white/60 font-medium">1-2 semanas</span>
          </div>
        </motion.div>
        
        {/* Step 3 */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative mb-16 flex items-center"
        >
          <div className="w-1/2 pr-8 text-right">
            <h4 className="text-white/90 font-medium">3. Cirugía de implantes</h4>
            <p className="text-white/70 text-sm">Colocación quirúrgica de los implantes según el plan establecido</p>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white/20 border-4 border-[#0A1828] flex items-center justify-center">
            <Clock className="w-5 h-5 text-white/70" />
          </div>
          <div className="w-1/2 pl-8">
            <span className="text-xs text-white/60 font-medium">2-4 semanas</span>
          </div>
        </motion.div>
        
        {/* Step 4 */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative mb-16 flex items-center"
        >
          <div className="w-1/2 pr-8 text-right">
            <h4 className="text-white/90 font-medium">4. Periodo de oseointegración</h4>
            <p className="text-white/70 text-sm">Tiempo de espera para la integración del implante con el hueso</p>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white/20 border-4 border-[#0A1828] flex items-center justify-center">
            <Clock className="w-5 h-5 text-white/70" />
          </div>
          <div className="w-1/2 pl-8">
            <span className="text-xs text-white/60 font-medium">2-6 meses</span>
          </div>
        </motion.div>
        
        {/* Step 5 */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative flex items-center"
        >
          <div className="w-1/2 pr-8 text-right">
            <h4 className="text-white/90 font-medium">5. Rehabilitación protésica</h4>
            <p className="text-white/70 text-sm">Colocación de la corona o prótesis final sobre los implantes</p>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white/20 border-4 border-[#0A1828] flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-white/70" />
          </div>
          <div className="w-1/2 pl-8">
            <span className="text-xs text-white/60 font-medium">2-4 semanas</span>
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-center">
        <div className="flex items-start gap-3 bg-gradient-to-r from-[#178582]/15 to-transparent p-4 rounded-lg max-w-md">
          <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="Rio Assistant" className="w-8 h-8 mr-2" />
          <p className="text-sm text-white/90">
            <span className="text-[#178582] font-medium">Río:</span> Actualmente estás en la fase de planificación digital. El siguiente paso será la cirugía de implantes una vez que hayamos diseñado el plan óptimo para ti.
          </p>
        </div>
      </div>
    </div>
  );
}
