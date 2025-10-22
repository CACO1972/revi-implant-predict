
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Evaluación Profesional
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sistema predictivo avanzado para tratamientos de implantes dentales
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
              className="bg-gradient-to-br from-card/40 to-card/20 border border-primary/20 rounded-2xl p-6 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center border border-primary/30">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
