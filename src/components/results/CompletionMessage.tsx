
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompletionMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-5 border border-[#1EAEDB]/30 rounded-xl bg-[#1EAEDB]/5"
    >
      <h3 className="text-lg font-medium text-[#1EAEDB] mb-3">
        Ahora estás mejor preparado para tu consulta
      </h3>
      
      <p className="text-white/80 text-sm mb-4">
        Esta evaluación preliminar te ha brindado información valiosa sobre tu candidatura para implantes dentales. 
        Recuerda que la tecnología actual permite soluciones personalizadas para casi cualquier situación.
      </p>
      
      <div className="space-y-3 mb-5">
        <div className="flex items-start">
          <Check className="text-green-400 mt-0.5 mr-2 h-5 w-5" />
          <p className="text-white/70 text-sm">
            <span className="font-medium">Democratizando el acceso</span>: Esta herramienta 
            está diseñada para ayudar especialmente a quienes tienen acceso limitado a servicios 
            dentales especializados por razones geográficas o económicas.
          </p>
        </div>
        
        <div className="flex items-start">
          <Check className="text-green-400 mt-0.5 mr-2 h-5 w-5" />
          <p className="text-white/70 text-sm">
            <span className="font-medium">Educación personalizada</span>: Te hemos 
            proporcionado información relevante para tu caso específico, ayudándote a 
            tomar decisiones informadas sobre tu salud oral.
          </p>
        </div>
        
        <div className="flex items-start">
          <Check className="text-green-400 mt-0.5 mr-2 h-5 w-5" />
          <p className="text-white/70 text-sm">
            <span className="font-medium">Preparación para tu consulta</span>: Ahora 
            conoces los factores importantes que afectan el éxito de los implantes y puedes 
            discutirlos con tu profesional de confianza.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
        <Button variant="outline" className="border-[#1EAEDB]/30 text-white/80 hover:bg-[#1EAEDB]/10 hover:text-white">
          <Download className="mr-2 h-4 w-4" />
          Descargar guía completa
        </Button>
        <Button className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white">
          <ExternalLink className="mr-2 h-4 w-4" />
          Encuentra especialistas cercanos
        </Button>
      </div>
    </motion.div>
  );
}
