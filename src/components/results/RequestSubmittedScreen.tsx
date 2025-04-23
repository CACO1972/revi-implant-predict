
import { Button } from "@/components/ui/button";

interface RequestSubmittedScreenProps {
  patientName: string;
  onRestart: () => void;
  onShowFeedback: () => void;
}

export default function RequestSubmittedScreen({ patientName, onRestart, onShowFeedback }: RequestSubmittedScreenProps) {
  return (
    <div className="w-full max-w-md mx-auto glass-panel p-8 text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gold mb-3">¡Solicitud enviada!</h2>
      <p className="text-white/80 mb-6 font-light">
        Gracias {patientName}, hemos recibido tu solicitud. Un especialista se pondrá en contacto contigo pronto.
      </p>
      <div className="space-y-4">
        <p className="text-white/90 mb-4">
          ¿Te gustaría darnos tu opinión sobre nuestra herramienta?
        </p>
        <Button 
          onClick={onShowFeedback}
          className="w-full bg-primary hover:bg-primary-dark text-white shadow-glow border border-gold/30"
        >
          Dar mi opinión
        </Button>
        <Button 
          variant="outline" 
          onClick={onRestart}
          className="w-full border-white/20 text-white hover:bg-white/5"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
