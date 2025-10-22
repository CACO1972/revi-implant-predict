import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ModernHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(91,204,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(91,204,204,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Análisis con Inteligencia Artificial</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="block text-foreground">Evaluación de</span>
            <span className="block bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Implantes Dentales
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sistema predictivo basado en IA para determinar el nivel de éxito en tratamientos con implantes dentales. Análisis personalizado en minutos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="group relative px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow hover:shadow-glow-strong transition-all duration-300"
            >
              Comenzar Evaluación
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById('features');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-6 text-lg font-semibold border-primary/30 hover:border-primary hover:bg-primary/5"
            >
              Conocer Más
            </Button>
          </div>

          {/* Stats */}
          <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">AI</div>
              <div className="text-sm text-muted-foreground">Análisis Inteligente</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">&lt;5min</div>
              <div className="text-sm text-muted-foreground">Resultados Rápidos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Personalizado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
