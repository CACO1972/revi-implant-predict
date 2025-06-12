import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Brain, Activity, Lock, BadgeCheck, MoveRight, Users, Shield, ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";

export default function Index() {
  const navigate = useNavigate();
  const [animatedElement, setAnimatedElement] = useState(0);
  const [peopleCount, setPeopleCount] = useState(1247);
  const [demoButtonPulse, setDemoButtonPulse] = useState(false);

  // Efecto para animar elementos secuencialmente
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedElement(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simular contador en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setPeopleCount(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Pulso intenso del botón demo cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoButtonPulse(true);
      setTimeout(() => setDemoButtonPulse(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      <AnimatedStarryBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl space-y-8 z-10 relative py-16"
      >
        {/* Logo animado */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            filter: ["drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))", "drop-shadow(0 0 25px rgba(23, 133, 130, 0.7))", "drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8 rounded-md"
        >
          <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="ImplantX Logo" className="w-72 h-auto mx-auto" />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -z-10 inset-0 rounded-full blur-3xl bg-gradient-to-r from-[#178582]/20 to-[#BFA181]/20 opacity-60"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-4">¿Puedes hacerte Implantes Dentales?</h2>
            <p className="text-lg md:text-xl text-white/75 font-light italic">
              Descúbrelo GRATIS sin salir de casa
            </p>
          </div>
          
          <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto font-light leading-relaxed">
            Solo 2 minutos con nuestra <span className="text-[#178582] font-medium">inteligencia artificial</span>
          </p>

          {/* Badge de demo MEGA prominente */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px rgba(23, 133, 130, 0.3)",
                  "0 0 40px rgba(23, 133, 130, 0.6)",
                  "0 0 20px rgba(23, 133, 130, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#178582]/30 to-[#BFA181]/30 px-6 py-4 rounded-2xl border-2 border-[#178582]/50"
            >
              <motion.div 
                className="w-4 h-4 bg-[#178582] rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-[#178582] text-lg font-bold">🚀 DEMO GRATUITA DISPONIBLE</span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-[#BFA181]" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Flecha apuntando hacia abajo al botón */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <ArrowDown className="w-8 h-8 text-[#178582]" />
          </motion.div>

          {/* Elementos de confianza prominentes */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <motion.div 
              className="flex items-center gap-2 bg-gradient-to-r from-[#178582]/10 to-[#178582]/20 px-4 py-2 rounded-full border border-[#178582]/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Shield className="w-4 h-4 text-[#178582]" />
              <span className="text-[#178582] text-sm font-medium">Basado en evidencia científica</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 bg-gradient-to-r from-[#BFA181]/10 to-[#BFA181]/20 px-4 py-2 rounded-full border border-[#BFA181]/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Users className="w-4 h-4 text-[#BFA181]" />
              <span className="text-[#BFA181] text-sm font-medium">{peopleCount.toLocaleString()} personas evaluadas</span>
            </motion.div>
          </div>

          {/* Texto de demo beta */}
          <div className="bg-gradient-to-r from-[#BFA181]/10 to-transparent p-4 rounded-lg border border-[#BFA181]/20 max-w-lg mx-auto">
            <p className="text-[#BFA181] text-sm font-medium mb-2">
              ⚡ Solo toma 2 minutos completarlo
            </p>
            <p className="text-white/70 text-xs leading-relaxed">
              Versión demo con las 5 preguntas principales. 
              <span className="text-[#178582] font-medium"> ¡Completamente gratis y sin registro!</span>
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="glass-panel p-6 hologram-effect"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(23, 133, 130, 0.5)"
              }}
            >
              <div className="mb-4 flex justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-[#178582]/20 to-[#178582]/60 flex items-center justify-center"
                  animate={{
                    scale: animatedElement === 0 ? [1, 1.1, 1] : 1,
                    boxShadow: animatedElement === 0 ? ["0 0 0 rgba(23, 133, 130, 0.4)", "0 0 15px rgba(23, 133, 130, 0.7)", "0 0 0 rgba(23, 133, 130, 0.4)"] : "0 0 0 rgba(23, 133, 130, 0.4)"
                  }}
                  transition={{
                    duration: 1
                  }}
                >
                  <Brain className="w-8 h-8 text-[#178582]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Análisis potenciado por IA</h3>
              <p className="text-white/70 text-sm">
                Algoritmo de diagnóstico basado en criterios científicos validados para predecir 
                tu compatibilidad con implantes dentales con precisión.
              </p>
            </motion.div>
            
            <motion.div
              className="glass-panel p-6 hologram-effect"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(191, 161, 129, 0.5)"
              }}
            >
              <div className="mb-4 flex justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-[#BFA181]/20 to-[#BFA181]/60 flex items-center justify-center"
                  animate={{
                    scale: animatedElement === 1 ? [1, 1.1, 1] : 1,
                    boxShadow: animatedElement === 1 ? ["0 0 0 rgba(191, 161, 129, 0.4)", "0 0 15px rgba(191, 161, 129, 0.7)", "0 0 0 rgba(191, 161, 129, 0.4)"] : "0 0 0 rgba(191, 161, 129, 0.4)"
                  }}
                  transition={{
                    duration: 1
                  }}
                >
                  <Activity className="w-8 h-8 text-[#BFA181]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Democratización del diagnóstico</h3>
              <p className="text-white/70 text-sm">
                Acceso igualitario a evaluación clínica especializada, especialmente para personas 
                en zonas geográficamente aisladas o con recursos limitados.
              </p>
            </motion.div>
            
            <motion.div
              className="glass-panel p-6 hologram-effect"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(23, 133, 130, 0.5)"
              }}
            >
              <div className="mb-4 flex justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-[#178582]/20 to-[#178582]/60 flex items-center justify-center"
                  animate={{
                    scale: animatedElement === 2 ? [1, 1.1, 1] : 1,
                    boxShadow: animatedElement === 2 ? ["0 0 0 rgba(23, 133, 130, 0.4)", "0 0 15px rgba(23, 133, 130, 0.7)", "0 0 0 rgba(23, 133, 130, 0.4)"] : "0 0 0 rgba(23, 133, 130, 0.4)"
                  }}
                  transition={{
                    duration: 1
                  }}
                >
                  <Zap className="w-8 h-8 text-[#178582]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Reducción de costos innecesarios</h3>
              <p className="text-white/70 text-sm">
                Evita desplazamientos y gastos catastróficos mediante filtrado inteligente 
                antes de la consulta presencial con el especialista.
              </p>
            </motion.div>
            
            <motion.div
              className="glass-panel p-6 hologram-effect"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(191, 161, 129, 0.5)"
              }}
            >
              <div className="mb-4 flex justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-[#BFA181]/20 to-[#BFA181]/60 flex items-center justify-center"
                  animate={{
                    scale: animatedElement === 3 ? [1, 1.1, 1] : 1,
                    boxShadow: animatedElement === 3 ? ["0 0 0 rgba(191, 161, 129, 0.4)", "0 0 15px rgba(191, 161, 129, 0.7)", "0 0 0 rgba(191, 161, 129, 0.4)"] : "0 0 0 rgba(191, 161, 129, 0.4)"
                  }}
                  transition={{
                    duration: 1
                  }}
                >
                  <Lock className="w-8 h-8 text-[#BFA181]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Optimización de sistemas públicos</h3>
              <p className="text-white/70 text-sm">
                Derivaciones inteligentes con pacientes preparados, reduciendo la saturación 
                en centros urbanos y mejorando la eficiencia del sistema.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* BOTÓN DEMO MEGA PROMINENTE */}
        <motion.div
          className="space-y-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Efectos visuales alrededor del botón */}
            <motion.div
              className="relative"
              animate={demoButtonPulse ? {
                scale: [1, 1.02, 1],
                filter: ["drop-shadow(0 0 20px rgba(23, 133, 130, 0.5))", "drop-shadow(0 0 40px rgba(23, 133, 130, 0.8))", "drop-shadow(0 0 20px rgba(23, 133, 130, 0.5))"]
              } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Anillo de partículas alrededor del botón */}
              <motion.div
                className="absolute -inset-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#BFA181] rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-60px) translateX(-50%)`
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                  />
                ))}
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Button
                  onClick={() => navigate('/evaluacion')}
                  className="bg-[#178582] hover:bg-[#178582]/90 text-white px-12 py-8 rounded-2xl text-xl font-bold shadow-glow transition-all duration-300 border-2 border-[#BFA181]/50 relative overflow-hidden group"
                >
                  {/* Efecto de brillo que se mueve */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-200, 200] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Play className="w-6 h-6" />
                    </motion.div>
                    <span>PROBAR DEMO GRATIS AHORA</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                  </div>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Texto de urgencia debajo del botón */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <p className="text-[#BFA181] font-bold text-lg mb-1">👆 ¡HAZLO AHORA! 👆</p>
              <p className="text-white/70 text-sm">Solo 2 minutos • Sin registro • Completamente gratis</p>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => navigate('/quienes-somos')}
                variant="outline"
                className="text-white/60 border-white/20 hover:bg-white/5 px-6 py-3 rounded-xl text-sm transition-all duration-300 group"
              >
                <BadgeCheck className="w-4 h-4 mr-2" />
                <span>Quiénes Somos</span>
                <MoveRight className="ml-2 opacity-0 w-0 group-hover:opacity-100 group-hover:w-4 transition-all duration-300" />
              </Button>
            </motion.div>
          </div>
          
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-12 max-w-3xl mx-auto glass-panel p-6"
            >
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#178582] animate-pulse"></div>
                <h3 className="text-lg text-[#178582]">Información importante</h3>
                <div className="w-2 h-2 rounded-full bg-[#178582] animate-pulse"></div>
              </div>
              <p className="text-sm text-white/70 max-w-xl mx-auto">
                Esta herramienta clínica predictiva está basada en evidencia científica y diseñada para democratizar 
                el acceso a evaluación clínica especializada, especialmente para personas con recursos limitados 
                o en zonas geográficamente aisladas.
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <p className="text-sm text-white/60">© 2025 ImplantDX - <span className="text-[#BFA181]">Democratizando el acceso a evaluación clínica</span></p>
          <div className="flex items-center justify-center mt-3 space-x-6">
            <motion.a
              href="https://instagram.com/reviveai.cl"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.1,
                rotate: 5
              }}
              className="text-white/50 hover:text-[#BFA181] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                />
              </svg>
            </motion.a>
            <motion.a
              href="https://instagram.com/thehumanupgrade"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.1,
                rotate: -5
              }}
              className="text-white/50 hover:text-[#178582] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
      
      <RioAssistant 
        isVisible={true} 
        message="¡Hola! Soy Río, tu asistente virtual. ¿Listo para descubrir si puedes hacerte implantes SIN SALIR DE CASA? ¡Solo toma 2 minutos! 🦷✨" 
      />
    </div>;
}
