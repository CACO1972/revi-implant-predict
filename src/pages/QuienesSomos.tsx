
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Globe, Brain, HeartHandshake, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";

export default function QuienesSomos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-10 pb-20 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      <div className="w-full max-w-4xl z-10 relative">
        {/* Botón de regreso */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/5 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
          </Button>
        </motion.div>
        
        {/* Encabezado */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="mb-6 flex justify-center">
            <img 
              src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
              alt="ImplantDX Logo"
              className="w-32 h-auto"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Quiénes Somos</h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Democratizando el acceso a la evaluación clínica para implantes dentales
            a través de la inteligencia artificial
          </p>
        </motion.div>
        
        {/* Contenido principal */}
        <div className="space-y-12">
          {/* Nuestra misión */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-start gap-5">
              <div className="mt-1">
                <div className="p-3 bg-[#178582]/20 rounded-full">
                  <HeartHandshake className="h-6 w-6 text-[#178582]" />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-[#BFA181] mb-4">Nuestra Misión</h2>
                
                <div className="text-white/80 space-y-4">
                  <p>
                    ImplantDX nace con un propósito claro: <strong>brindar acceso a una evaluación clínica predictiva de calidad</strong> a quienes más lo necesitan, 
                    independientemente de su ubicación geográfica o recursos económicos.
                  </p>
                  
                  <p>
                    Buscamos empoderar a las personas a través del conocimiento, educándolas sobre sus opciones de tratamiento con implantes dentales,
                    de manera que al llegar a su primera consulta presencial tengan toda la información necesaria para tomar decisiones informadas sobre su salud bucal.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Nuestro enfoque */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-start gap-5">
              <div className="mt-1">
                <div className="p-3 bg-[#178582]/20 rounded-full">
                  <Brain className="h-6 w-6 text-[#178582]" />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-[#BFA181] mb-4">Tecnología con Base Científica</h2>
                
                <div className="text-white/80 space-y-4">
                  <p>
                    ImplantDX utiliza <strong>inteligencia artificial basada en criterios científicos</strong> para evaluar la candidatura 
                    de un paciente a implantes dentales. Nuestros algoritmos analizan múltiples factores de riesgo validados por investigaciones clínicas,
                    ofreciendo una evaluación personalizada con un elevado nivel de predictibilidad.
                  </p>
                  
                  <p>
                    El sistema ha sido desarrollado siguiendo estrictos estándares médicos y odontológicos, incorporando los más recientes avances 
                    en implantología dental y análisis predictivo basado en evidencia científica.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Para quién es esto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-start gap-5">
              <div className="mt-1">
                <div className="p-3 bg-[#178582]/20 rounded-full">
                  <Users className="h-6 w-6 text-[#178582]" />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-[#BFA181] mb-4">¿Para quién es ImplantDX?</h2>
                
                <div className="text-white/80 space-y-4">
                  <p>
                    ImplantDX está diseñado para:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Personas que viven en <strong>zonas geográficamente aisladas</strong> con acceso limitado a especialistas en implantología.</li>
                    <li>Pacientes con <strong>recursos económicos limitados</strong> que necesitan evaluar su caso antes de invertir en consultas costosas.</li>
                    <li>Quienes buscan <strong>información preliminar confiable</strong> antes de acudir a una clínica dental.</li>
                    <li>Cualquier persona interesada en <strong>educarse sobre implantes dentales</strong> y conocer mejor sus opciones de tratamiento.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Nuestro equipo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-start gap-5">
              <div className="mt-1">
                <div className="p-3 bg-[#178582]/20 rounded-full">
                  <BadgeCheck className="h-6 w-6 text-[#178582]" />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-[#BFA181] mb-4">Desarrollado por Expertos</h2>
                
                <div className="text-white/80 space-y-4">
                  <p>
                    ImplantDX ha sido desarrollado por el Dr. Carlos Montoya, director de Humana, reconocido implantólogo y 
                    especialista en rehabilitación oral, junto con un equipo multidisciplinario de profesionales en odontología, 
                    inteligencia artificial y diseño de experiencia de usuario.
                  </p>
                  
                  <div className="bg-[#0A1828]/60 p-4 rounded-lg border border-[#178582]/20">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#178582]/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#178582]">CM</span>
                      </div>
                      
                      <div>
                        <h4 className="text-[#BFA181] font-medium">Dr. Carlos Montoya</h4>
                        <p className="text-sm text-white/70">Director de Humana · Implantólogo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Impacto global */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-start gap-5">
              <div className="mt-1">
                <div className="p-3 bg-[#178582]/20 rounded-full">
                  <Globe className="h-6 w-6 text-[#178582]" />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-[#BFA181] mb-4">Impacto Social</h2>
                
                <div className="text-white/80 space-y-4">
                  <p>
                    Nuestro objetivo final es <strong>cerrar la brecha en el acceso a atención especializada</strong> en implantología dental.
                    Con ImplantDX, buscamos que la distancia geográfica o la situación económica no sean barreras para acceder a una evaluación 
                    clínica de calidad.
                  </p>
                  
                  <p>
                    Trabajamos para que cada día más personas puedan recuperar su sonrisa y mejorar su calidad de vida,
                    independientemente de dónde se encuentren o cuáles sean sus recursos.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-12 text-center"
        >
          <Button 
            onClick={() => navigate('/')}
            className="bg-[#178582] hover:bg-[#178582]/90 text-white px-8 py-6 rounded-xl text-lg shadow-glow transition-all duration-300 border border-[#BFA181]/30"
          >
            Volver al Inicio
          </Button>
          
          <p className="mt-8 text-white/60 max-w-xl mx-auto text-sm">
            © 2025 ImplantDX - Una iniciativa de Humana para democratizar el acceso a evaluación clínica en implantología dental.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
