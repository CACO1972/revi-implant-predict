import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Award, Clock, Shield, CheckCircle, Star, Sparkles, Zap } from "lucide-react";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";

export default function Index() {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: <Award className="w-6 h-6" />, text: "Evaluación basada en evidencia científica" },
    { icon: <Clock className="w-6 h-6" />, text: "Resultados en solo 2 minutos" },
    { icon: <Shield className="w-6 h-6" />, text: "100% gratuito y confidencial" },
    { icon: <CheckCircle className="w-6 h-6" />, text: "Recomendaciones personalizadas" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigateToDemo = () => {
    navigate('/evaluacion');
  };

  return <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      <AnimatedStarryBackground />
      
      {/* Logo e identificación */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantDX Logo"
          className="h-24 w-auto mx-auto mb-4"
        />
        <h1 className="text-4xl md:text-6xl font-bold gold-gradient-text mb-4">
          ImplantDX
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-2">
          Evaluación predictiva para implantes dentales
        </p>
        <p className="text-lg text-[#BFA181] font-medium">
          Tecnología de IA + Evidencia científica
        </p>
      </motion.div>

      {/* Features carrusel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8"
      >
        <Card className="bg-white/5 border-[#178582]/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <motion.div 
              key={currentFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center justify-center gap-3 text-white"
            >
              <div className="text-[#178582]">
                {features[currentFeature].icon}
              </div>
              <span className="text-lg font-medium">
                {features[currentFeature].text}
              </span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Disclaimer médico prominente */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-8 max-w-2xl"
      >
        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-400/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="text-yellow-100 text-sm font-medium mb-1">
                  ⚠️ Importante: Disclaimer Médico
                </p>
                <p className="text-white/80 text-xs leading-relaxed">
                  Esta herramienta proporciona una evaluación preliminar basada en evidencia científica, 
                  pero <strong>NO constituye un diagnóstico médico</strong> y no reemplaza la evaluación 
                  profesional de un dentista u odontólogo especialista. Los resultados son orientativos 
                  y siempre debes consultar con un profesional de la salud dental.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Botón principal súper prominente */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-12"
      >
        {/* Contenedor con múltiples capas de efectos */}
        <div className="relative">
          {/* Anillos de energía que se expanden */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(23, 133, 130, 0.7)",
                "0 0 0 20px rgba(23, 133, 130, 0)",
                "0 0 0 0 rgba(23, 133, 130, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          
          {/* Segundo anillo desfasado */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(191, 161, 129, 0.7)",
                "0 0 0 25px rgba(191, 161, 129, 0)",
                "0 0 0 0 rgba(191, 161, 129, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
          />
          
          {/* Partículas flotantes alrededor del botón */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#BFA181] rounded-full"
              style={{
                top: `${20 + Math.sin(i * Math.PI / 4) * 60}%`,
                left: `${20 + Math.cos(i * Math.PI / 4) * 60}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Efecto de brillo pulsante de fondo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#178582]/20 via-[#BFA181]/20 to-[#178582]/20 rounded-2xl blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Botón principal */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <Button
              onClick={handleNavigateToDemo}
              className="bg-[#178582] hover:bg-[#178582]/90 text-white px-12 py-8 rounded-2xl text-xl font-bold shadow-glow transition-all duration-300 border-2 border-[#BFA181]/50 relative overflow-hidden group"
            >
              {/* Efecto de brillo que se mueve */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: [-200, 200]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Contenido del botón */}
              <div className="relative z-10 flex items-center gap-3">
                <Zap className="w-6 h-6" />
                <span>¡EVALÚA TU CANDIDATURA AHORA!</span>
                <Sparkles className="w-6 h-6" />
              </div>
              
              {/* Indicador de tiempo */}
              <div className="relative z-10 text-sm opacity-90 mt-1">
                ⚡ Solo 2 minutos • 100% Gratis ⚡
              </div>
            </Button>
          </motion.div>
          
          {/* Texto llamativo debajo */}
          <motion.div
            className="mt-4 text-center"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <p className="text-[#BFA181] font-bold text-lg">
              🚀 ¡MÁS DE 1,000 EVALUACIONES REALIZADAS! 🚀
            </p>
            <p className="text-white/70 text-sm mt-1">
              Descubre si eres candidato desde la comodidad de tu hogar
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Sección de características, testimonios, etc. */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Característica 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <MessageCircle className="w-8 h-8 text-[#178582]" />
          <div>
            <h4 className="text-lg font-medium text-white">
              ¿Qué es ImplantDX?
            </h4>
            <p className="text-white/70 text-sm">
              Una herramienta de evaluación predictiva para implantes dentales basada en inteligencia artificial y evidencia científica.
            </p>
          </div>
        </motion.div>

        {/* Característica 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <Star className="w-8 h-8 text-[#BFA181]" />
          <div>
            <h4 className="text-lg font-medium text-white">
              ¿Cómo funciona?
            </h4>
            <p className="text-white/70 text-sm">
              Responde unas pocas preguntas sobre tu salud bucal y estilo de vida, y recibe una evaluación personalizada en minutos.
            </p>
          </div>
        </motion.div>

        {/* Característica 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <Award className="w-8 h-8 text-[#33C3F0]" />
          <div>
            <h4 className="text-lg font-medium text-white">
              ¿Qué obtendrás?
            </h4>
            <p className="text-white/70 text-sm">
              Un reporte detallado sobre tu nivel de candidatura para implantes, recomendaciones personalizadas y los próximos pasos a seguir.
            </p>
          </div>
        </motion.div>

        {/* Característica 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <Shield className="w-8 h-8 text-[#9333EA]" />
          <div>
            <h4 className="text-lg font-medium text-white">
              ¿Es seguro y confidencial?
            </h4>
            <p className="text-white/70 text-sm">
              Sí, tus respuestas son completamente anónimas y seguras. No compartimos tu información con terceros.
            </p>
          </div>
        </motion.div>
      </div>

      <RioAssistant 
        isVisible={true} 
        message="¡Hola! Soy Río, tu asistente virtual. ¿Listo para descubrir si puedes hacerte implantes SIN SALIR DE CASA? ¡Solo toma 2 minutos! 🦷✨" 
        onNavigateToDemo={handleNavigateToDemo}
      />
    </div>;
}
