import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function NavigationButtons({
  onNext,
  onPrevious,
  isFirst,
  isLast
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center gap-4 pt-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirst}
        className="border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Anterior
      </Button>
      
      <Button
        onClick={onNext}
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 max-w-[200px]"
      >
        {isLast ? (
          <>
            Finalizar
            <Send className="w-4 h-4 ml-2" />
          </>
        ) : (
          <>
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
}
