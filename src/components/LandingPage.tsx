
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gold font-formula">
            Bienvenido a ImplantDX
          </h1>
          
          <h2 className="text-lg md:text-xl text-primary font-medium max-w-xl mx-auto">
            El primer sistema basado en IA que evalúa tus probabilidades de éxito 
            con implantes dentales
          </h2>
          
          <p className="text-[15px] text-white/85 max-w-lg mx-auto">
            En pocos pasos podrás saber si eres un buen candidato, entender los 
            factores clínicos clave y recibir recomendaciones personalizadas.
          </p>
        </div>

        <div className="space-y-6">
          <Button 
            onClick={onStart}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-lg text-lg shadow-glow transition-all duration-300"
          >
            Comenzar evaluación
          </Button>

          <p className="text-[11px] text-white/50 mt-6 max-w-md mx-auto">
            *Versión beta. Esta herramienta no reemplaza una evaluación profesional. 
            Resultados orientativos.
          </p>
        </div>
      </div>
    </div>
  );
}
