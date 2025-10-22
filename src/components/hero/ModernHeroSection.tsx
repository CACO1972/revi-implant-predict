import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ModernHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Geometric background elements - Trust Machines style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Teal geometric shape top left */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-3xl" />
        <div className="absolute top-20 left-20 w-32 h-2 bg-primary/30" />
        <div className="absolute top-20 left-[88px] w-2 h-32 bg-primary/30" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1]">
            <span className="block text-foreground mb-3">Evaluación de</span>
            <span className="block text-primary">
              Implantes Dentales
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Sistema predictivo basado en IA para determinar el nivel de éxito en tratamientos con implantes dentales.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              size="lg"
              variant="gold"
              onClick={() => navigate("/evaluacion")}
              className="group relative"
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
            >
              Conocer Más
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
