
import { Brain, Target, Clock } from "lucide-react";

export default function FeatureCards() {
  const cards = [
    {
      icon: Brain,
      title: "Análisis Predictivo",
      subtitle: "Evaluación clínica basada en evidencia"
    },
    {
      icon: Target,
      title: "Personalizado",
      subtitle: "Adaptado a tu perfil único"
    },
    {
      icon: Clock,
      title: "Inmediato",
      subtitle: "Resultados en minutos"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4 py-16">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
        >
          <card.icon className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-foreground font-semibold text-lg mb-2">
            {card.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
