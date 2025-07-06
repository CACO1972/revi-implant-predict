
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Instagram, Calculator, Users, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface EnhancedLandingPageProps {
  onStart: () => void;
}

export default function EnhancedLandingPage({ onStart }: EnhancedLandingPageProps) {
  const features = [
    {
      icon: Instagram,
      title: "Demo Gratuito",
      description: "Prueba nuestra evaluación con 5 preguntas principales",
      path: "/demo",
      highlight: true
    },
    {
      icon: Sparkles,
      title: "Evaluación Completa",
      description: "Análisis detallado de candidatura para implantes",
      action: onStart
    },
    {
      icon: Calculator,
      title: "Calculadora de Costos",
      description: "Estima el costo de tu tratamiento",
      path: "/calculadora"
    },
    {
      icon: Users,
      title: "Comparador",
      description: "Compara diferentes opciones de tratamiento",
      path: "/comparador"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative">
      {/* Animated stars background */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2 + i,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
            width: "4px",
            height: "4px",
            background: "white",
            borderRadius: "50%",
            filter: "blur(1px)",
            boxShadow: "0 0 10px 2px rgba(255,255,255,0.7)"
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl space-y-12 relative z-10"
      >
        {/* Logo and title section */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative mx-auto w-72 h-72 mb-6">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#178582]/30 to-[#BFA181]/30 rounded-full blur-2xl opacity-70"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div
              animate={{
                y: [0, -10, 0],
                filter: [
                  "drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))",
                  "drop-shadow(0 0 25px rgba(23, 133, 130, 0.5))",
                  "drop-shadow(0 0 15px rgba(23, 133, 130, 0.3))"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img 
                src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
                alt="ImplantDX Logo"
                className="h-40 w-auto"
              />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#178582] to-[#BFA181] bg-clip-text text-transparent">
              ImplantDX
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-white/90 font-light tracking-wider">
            Herramienta clínica predictiva basada en IA
          </h2>
          
          <p className="text-lg text-white/85 max-w-2xl mx-auto font-light leading-relaxed">
            Te ayudamos a determinar si eres un buen candidato para implantes dentales
            con evaluación personalizada y recomendaciones profesionales
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-xl border transition-all duration-300 ${
                feature.highlight
                  ? "bg-gradient-to-br from-[#BFA181]/10 to-[#178582]/10 border-[#BFA181]/30 shadow-lg"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <feature.icon className={`w-8 h-8 mb-4 ${
                feature.highlight ? "text-[#BFA181]" : "text-[#178582]"
              }`} />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70 mb-4 text-sm">
                {feature.description}
              </p>
              
              {feature.path ? (
                <Link to={feature.path}>
                  <Button
                    variant={feature.highlight ? "default" : "outline"}
                    className={feature.highlight 
                      ? "bg-[#BFA181] hover:bg-[#BFA181]/90 text-white"
                      : "border-[#178582]/30 text-[#178582] hover:bg-[#178582]/10"
                    }
                  >
                    {feature.highlight ? "Probar Demo" : "Acceder"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={feature.action}
                  variant="outline"
                  className="border-[#178582]/30 text-[#178582] hover:bg-[#178582]/10"
                >
                  Comenzar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/demo">
              <Button className="bg-[#BFA181] hover:bg-[#BFA181]/90 text-white px-8 py-3 rounded-xl">
                <Instagram className="w-5 h-5 mr-2" />
                Demo Gratuito
              </Button>
            </Link>
            
            <Link to="/contacto">
              <Button
                variant="outline"
                className="border-[#178582]/30 text-[#178582] hover:bg-[#178582]/10 px-8 py-3 rounded-xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contacto
              </Button>
            </Link>
          </div>

          <p className="text-xs text-white/50 mt-6 max-w-md mx-auto">
            *Esta herramienta no reemplaza una evaluación profesional médica
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
