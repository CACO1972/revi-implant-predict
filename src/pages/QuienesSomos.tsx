import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserCheck, Brain, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";

export default function QuienesSomos() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0A1828] text-white relative">
      {/* Imagen de fondo con overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/lovable-uploads/4340a4e4-45cd-474b-ad0d-10e701b4f2b4.png')" }}
      />
      
      {/* Overlay gradiente para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1828]/95 via-[#0A1828]/80 to-[#0A1828]/70 z-0"></div>
      
      {/* Fondo con estrellas detrás de la imagen */}
      <AnimatedStarryBackground />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-8 text-white hover:text-white/80 hover:bg-white/5">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="max-w-3xl mx-auto space-y-12"
        >
          <div className="text-center mb-12">
            <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="ImplantDX Logo" className="w-32 h-auto mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Quiénes Somos</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-[#178582] to-[#BFA181] mx-auto"></div>
          </div>
          
          <div className="space-y-12">
            {/* Misión */}
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-[#178582]/20 text-[#178582]">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#BFA181]">Nuestra Misión</h2>
              </div>
              <p className="mb-4 text-white/80">Implant X nace con el propósito de democratizar el acceso a evaluaciones clínicas de calidad para implantes dentales, especialmente para aquellas personas con recursos limitados o que viven en zonas geográficamente aisladas de Chile y Latinoamérica</p>
              <p className="text-white/80">
                Buscamos educar, orientar y empoderar a pacientes, brindándoles información basada en evidencia científica 
                que les permita tomar decisiones informadas sobre su salud oral y llegar a su primera consulta presencial 
                con un mejor entendimiento de su caso.
              </p>
            </motion.div>
            
            {/* Tecnología */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-[#178582]/20 text-[#178582]">
                  <Brain className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#BFA181]">Nuestra Tecnología</h2>
              </div>
              <p className="mb-4 text-white/80">
                ImplantDX utiliza inteligencia artificial basada en criterios científicos y protocolos validados 
                para realizar evaluaciones predictivas sobre el éxito potencial de tratamientos con implantes dentales.
              </p>
              <p className="text-white/80">Implant X es la primera app en su tipo en Latam.</p>
            </motion.div>
            
            {/* Impacto Social */}
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-[#178582]/20 text-[#178582]">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#BFA181]">Impacto Social</h2>
              </div>
              <p className="mb-4 text-white/80">
                Nuestro objetivo es cerrar la brecha de acceso a evaluaciones clínicas especializadas. En muchas regiones, 
                el acceso a especialistas en implantología dental es limitado, costoso o requiere largos desplazamientos.
              </p>
              <p className="text-white/80">Implant X ofrece una primera evaluación gratuita y accesible desde cualquier dispositivo con conexión a internet, permitiendo que más personas puedan dar el primer paso hacia la recuperación de su sonrisa y funcionalidad oral.</p>
            </motion.div>
            
            {/* Fundador */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.8
          }} className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-[#0A1828]/80 to-[#178582]/10">
              <h2 className="text-2xl font-bold text-center text-[#BFA181] mb-6">Fundador</h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#178582] to-[#BFA181] p-1">
                  <div className="w-full h-full rounded-full bg-[#0A1828] flex items-center justify-center overflow-hidden">
                    <span className="text-4xl font-bold text-[#BFA181]">CM</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Dr. Carlos Montoya Bacigalupo</h3>
                  <p className="text-[#BFA181] mb-3">Director de Humana.ai </p>
                  <p className="text-white/80">Con más de 25 años de experiencia clínica, el Dr. Montoya ha dedicado su carrera a mejorar el acceso a tratamientos avanzados de implantología dental. A través de Implant X, combina su experiencia clínica con tecnologías emergentes para llevar evaluaciones especializadas a quienes más las necesitan.</p>
                </div>
              </div>
            </motion.div>
            
            <div className="text-center pt-6">
              <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-[#178582] to-[#BFA181] hover:opacity-90 text-white">
                Volver a Inicio
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
