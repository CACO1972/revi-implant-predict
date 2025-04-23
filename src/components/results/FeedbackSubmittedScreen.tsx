
import { Button } from "@/components/ui/button";

interface FeedbackSubmittedScreenProps {
  onRestart: () => void;
}

export default function FeedbackSubmittedScreen({ onRestart }: FeedbackSubmittedScreenProps) {
  return (
    <div className="w-full max-w-md mx-auto glass-panel p-8 text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          {/* No icon, per brand instructions. */}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gold mb-3">¡Gracias por tu opinión!</h2>
      <p className="text-white/80 mb-6">
        Gracias por usar ImplantDX. Tu salud es lo primero.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button 
          onClick={onRestart}
          className="bg-primary hover:bg-primary-dark text-white shadow-glow border border-gold/30"
        >
          Volver al inicio
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.open("https://instagram.com", "_blank")}
          className="border-white/20 text-white hover:bg-white/5"
        >
          Seguir en Instagram
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'ImplantDX',
                text: 'Evalúa tus probabilidades de éxito con implantes dentales',
                url: window.location.href,
              })
            }
          }}
          className="border-white/20 text-white hover:bg-white/5"
        >
          Compartir
        </Button>
      </div>
    </div>
  )
}
