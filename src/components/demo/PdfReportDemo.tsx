
import { motion } from "framer-motion";
import { FileText, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PdfReportDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h3 className="text-xl text-[#178582] mb-2">Plan Clínico Predictivo</h3>
        <p className="text-white/80">Reporte personalizado para compartir con tu odontólogo</p>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white/90 w-full max-w-md aspect-[3/4] rounded-lg shadow-xl overflow-hidden relative">
          {/* PDF Header */}
          <div className="bg-[#0A1828] text-white p-6 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold">Plan Clínico Predictivo</h4>
              <p className="text-xs text-white/70">Generado el 23/05/2025</p>
            </div>
            <img 
              src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" 
              alt="ImplantDX Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Patient Info */}
          <div className="p-6">
            <h5 className="text-[#178582] font-medium mb-2">Información del Paciente</h5>
            <div className="space-y-1 text-gray-700 text-sm mb-4">
              <p><span className="font-medium">Nombre:</span> María González</p>
              <p><span className="font-medium">Edad:</span> 45 años</p>
              <p><span className="font-medium">Fecha de evaluación:</span> 23/05/2025</p>
            </div>
            
            <h5 className="text-[#178582] font-medium mb-2">Resultado de Evaluación</h5>
            <div className="flex items-center mb-3">
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#178582] to-[#BFA181] h-full" style={{width: '85%'}}></div>
              </div>
              <span className="ml-3 text-[#178582] font-bold">85%</span>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Candidato óptimo para tratamiento con implantes dentales, con factores de riesgo moderados que pueden ser gestionados.
            </p>
            
            <h5 className="text-[#178582] font-medium mb-2">Factores Clínicos Detectados</h5>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1 mb-4">
              <li>Historia de enfermedad periodontal controlada</li>
              <li>Necesidad de regeneración ósea localizada</li>
              <li>Diabetes tipo 2 controlada (HbA1c: 6.5%)</li>
            </ul>
            
            <h5 className="text-[#178582] font-medium mb-2">Tratamiento Recomendado</h5>
            <p className="text-gray-700 text-sm mb-4">
              Implantes en posición 14, 16, 25, 36, 37 y 46 con protocolo de carga estándar y consideración de regeneración ósea guiada en sector posterior superior.
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gray-50 p-4 flex justify-between border-t border-gray-200">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartir
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <div className="flex items-start gap-3 bg-gradient-to-r from-[#178582]/15 to-transparent p-4 rounded-lg max-w-md">
          <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="Rio Assistant" className="w-8 h-8 mr-2" />
          <p className="text-sm text-white/90">
            <span className="text-[#178582] font-medium">Río:</span> Este reporte puedes compartirlo con tu odontólogo. Contiene información detallada sobre tu evaluación y recomendaciones personalizadas para tu tratamiento.
          </p>
        </div>
      </div>
    </div>
  );
}
