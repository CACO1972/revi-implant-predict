
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FeedbackFormProps {
  feedback: string | null;
  setFeedback: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  renderFeedbackEmoji: (val: string) => string;
  renderFeedbackLabel: (val: string) => string;
}

export default function FeedbackForm({
  feedback,
  setFeedback,
  onSubmit,
  onCancel,
  renderFeedbackEmoji,
  renderFeedbackLabel,
}: FeedbackFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold text-gold">¿Qué tan útil te pareció esta herramienta?</h3>
      <RadioGroup
        value={feedback || ""}
        onValueChange={setFeedback}
        className="flex flex-col items-center space-y-3"
      >
        {["5", "4", "3", "2", "1"].map(value => (
          <div key={value} className="flex items-center space-x-3 w-full max-w-[300px] p-3 rounded-lg hover:bg-white/5 transition-colors">
            <RadioGroupItem 
              value={value} 
              id={`feedback-${value}`}
              className="border-white/20 text-primary" 
            />
            <Label
              htmlFor={`feedback-${value}`}
              className="flex items-center space-x-3 text-white/90 font-light cursor-pointer"
            >
              <span className="text-2xl">{renderFeedbackEmoji(value)}</span>
              <span>{renderFeedbackLabel(value)}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex gap-4">
        <Button 
          type="submit"
          disabled={!feedback}
          className="flex-1 bg-primary hover:bg-primary-dark text-white shadow-glow border border-gold/30 disabled:opacity-50"
        >
          Enviar opinión
        </Button>
        <Button 
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-white/20 text-white hover:bg-white/5"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
