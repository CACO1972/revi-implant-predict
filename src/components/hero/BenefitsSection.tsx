
import { motion } from "framer-motion";
import { CheckCircle, Zap, Home, Brain } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Brain,
      title: "IA Predictiva Avanzada",
      description: "Análisis de más de 50 variables clínicas con precisión basada en evidencia científica"
    },
    {
      icon: Zap,
      title: "Resultados en 2 Minutos",
      description: "Evaluación completa con odontograma 3D, personalización y calculadora de valores"
    },
    {
      icon: Home,
      title: "Sin Salir de Casa",
      description: "Orientación clara antes de sentarte en el sillón del dentista"
    },
    {
      icon: CheckCircle,
      title: "Plan Personalizado",
      description: "Recomendaciones específicas adaptadas a tu perfil único de riesgo"
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            ¿Por qué <span className="text-[#5BCBFF]">IMPLANTX</span>?
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto">
            La primera herramienta de evaluación dental con inteligencia artificial 
            diseñada para democratizar el acceso a orientación clínica profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-gradient-to-br from-[#5BCBFF]/10 to-[#178582]/10 border border-[#5BCBFF]/20 rounded-2xl p-6 backdrop-blur-sm hover:border-[#5BCBFF]/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#5BCBFF] to-[#178582] rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-gradient-to-r from-[#BFA181]/10 to-[#FF8C42]/10 border border-[#BFA181]/20 rounded-2xl p-6 mt-8"
        >
          <p className="text-[#BFA181] text-sm font-medium mb-2">
            🎯 Especialmente diseñado para
          </p>
          <p className="text-white/80 text-sm leading-relaxed">
            Personas con <span className="text-[#FF8C42] font-semibold">recursos limitados</span> o en 
            <span className="text-[#5BCBFF] font-semibold"> zonas geográficamente aisladas</span> que 
            necesitan orientación clínica antes de invertir en consultas presenciales
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
