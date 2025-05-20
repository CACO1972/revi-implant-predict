
import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface EducationalSectionProps {
  patientLevel: number;
}

export default function EducationalSection({ patientLevel }: EducationalSectionProps) {
  // Información educativa basada en el nivel del paciente
  const getEducationalContent = () => {
    switch (patientLevel) {
      case 1:
        return {
          title: "Información para Candidatos Ideales",
          intro: "Eres un candidato ideal para implantes dentales. Aquí tienes información importante:",
          sections: [
            {
              title: "¿Qué esperar en tu primera consulta?",
              content: "Durante la primera consulta, se realizará un examen clínico completo, radiografías 3D y se discutirá tu plan de tratamiento personalizado. El cirujano evaluará tu salud bucal general y la calidad y cantidad de hueso disponible."
            },
            {
              title: "Proceso típico de tratamiento",
              content: "El proceso generalmente incluye: planificación digital, cirugía de colocación (1-2 horas), periodo de oseointegración (2-6 meses) y finalmente la colocación de la corona o prótesis definitiva."
            },
            {
              title: "Mantenimiento a largo plazo",
              content: "Para asegurar el éxito a largo plazo, es fundamental mantener una excelente higiene oral, realizar visitas regulares al dentista y usar los productos de limpieza específicos recomendados para implantes."
            }
          ]
        };
      case 2:
        return {
          title: "Información para Buenos Candidatos",
          intro: "Eres un buen candidato para implantes, con algunas consideraciones a tener en cuenta:",
          sections: [
            {
              title: "Optimización previa al tratamiento",
              content: "Para mejorar tus resultados, podrías necesitar algunas intervenciones previas como mejorar tu higiene oral, controlar hábitos como el tabaquismo o estabilizar condiciones médicas como la diabetes."
            },
            {
              title: "Consideraciones especiales",
              content: "Tu tratamiento podría requerir enfoques específicos como implantes de carga inmediata, regeneración ósea guiada o diseños protésicos particulares según tus necesidades individuales."
            },
            {
              title: "Seguimiento personalizado",
              content: "Se recomendarán protocolos de seguimiento más frecuentes para monitorear la salud de tus implantes, especialmente durante el primer año tras la colocación."
            }
          ]
        };
      case 3:
      case 4:
        return {
          title: "Información para Pacientes con Factores de Riesgo",
          intro: patientLevel === 3 
            ? "Se han identificado factores de riesgo moderados que deben abordarse:"
            : "Se han identificado varios factores de riesgo importantes que requieren atención:",
          sections: [
            {
              title: "Tratamientos previos necesarios",
              content: "Antes de considerar implantes, será necesario abordar condiciones como enfermedad periodontal, control glucémico, manejo del bruxismo o regeneración ósea, según tu caso específico."
            },
            {
              title: "Opciones de tratamiento alternativas",
              content: "Existen otras opciones que podrían ser más adecuadas para tu caso particular, como prótesis removibles avanzadas, puentes con diseños específicos o técnicas de preservación dentaria."
            },
            {
              title: "Pasos para convertirte en mejor candidato",
              content: "Con el enfoque adecuado, muchos pacientes con factores de riesgo pueden mejorar significativamente su pronóstico. Tu dentista te guiará en este proceso con un plan personalizado."
            }
          ]
        };
      default:
        return {
          title: "Información General sobre Implantes Dentales",
          intro: "Los implantes dentales son una solución moderna y eficaz para reemplazar dientes perdidos:",
          sections: [
            {
              title: "¿Qué son los implantes dentales?",
              content: "Los implantes dentales son raíces artificiales de titanio que se colocan en el hueso maxilar para soportar coronas, puentes o prótesis completas, reemplazando dientes perdidos."
            },
            {
              title: "Ventajas frente a otras opciones",
              content: "Los implantes preservan el hueso, no dañan dientes vecinos, ofrecen mejor estabilidad y función masticatoria, y tienen una estética más natural que las opciones tradicionales."
            },
            {
              title: "Democratización de la implantología",
              content: "Gracias a avances tecnológicos y protocolos modernos, los implantes dentales son ahora más accesibles, con opciones para diferentes presupuestos sin comprometer la calidad."
            }
          ]
        };
    }
  };

  const content = getEducationalContent();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8 bg-white/5 p-5 rounded-xl border border-white/10"
    >
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-[#1EAEDB]/20 flex items-center justify-center mr-3">
          <BookOpen className="w-4 h-4 text-[#1EAEDB]" />
        </div>
        <h3 className="text-lg font-semibold text-[#1EAEDB]">
          {content.title}
        </h3>
      </div>
      
      <p className="text-white/80 text-sm mb-4">
        {content.intro}
      </p>
      
      <div className="space-y-4">
        {content.sections.map((section, index) => (
          <div key={index} className="py-2">
            <h4 className="flex items-center text-gold text-sm font-medium mb-2">
              <Lightbulb className="w-4 h-4 mr-2" />
              {section.title}
            </h4>
            <p className="text-white/70 text-sm pl-6">
              {section.content}
            </p>
            {index < content.sections.length - 1 && <Separator className="mt-4 bg-white/10" />}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-white/50 text-xs italic">
          ImplantDX busca democratizar el acceso a información de calidad sobre implantes dentales, 
          especialmente para personas en zonas geográficamente aisladas o con recursos limitados. 
          Esta herramienta educativa te empodera para tomar decisiones informadas sobre tu salud bucal.
        </p>
      </div>
    </motion.div>
  );
}
