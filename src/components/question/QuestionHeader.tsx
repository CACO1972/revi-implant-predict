
import { Activity, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Question } from "@/types/implant";
import { getDetailedExplanation } from "@/utils/questionUtils";

interface QuestionHeaderProps {
  question: Question;
}

export default function QuestionHeader({ question }: QuestionHeaderProps) {
  const detailedExplanation = getDetailedExplanation(question.id);

  return (
    <div className="relative mb-8">
      {/* Decoración fondo */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-2xl -z-0"></div>
      
      <div className="flex items-start mb-6 relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1EAEDB]/20 to-gold/20 flex-shrink-0 flex items-center justify-center mr-4 p-0.5">
          <div className="w-full h-full bg-starry rounded-full flex items-center justify-center">
            <Activity className="text-[#1EAEDB]" size={20} />
          </div>
        </div>
        <div className="flex-grow pr-8">
          <span className="text-sm gold-gradient-text font-medium tracking-wide">
            Pregunta {question.id} de 11
          </span>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-[#1EAEDB] mt-1 mb-2 tracking-tight">{question.title}</h2>
            
            {/* Botón de información detallada */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full ml-2 text-white/60 hover:text-white hover:bg-white/10">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-starry border-gold/30">
                <DialogHeader>
                  <DialogTitle className="text-[#1EAEDB]">{question.title}</DialogTitle>
                  <DialogDescription className="text-white/80">
                    Información importante para tu evaluación
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <h4 className="mb-2 font-medium text-gold">¿Por qué es importante?</h4>
                  <p className="text-white/80 text-sm mb-4">
                    {detailedExplanation.importance}
                  </p>
                  
                  <h4 className="mb-2 font-medium text-gold">¿Cómo afecta a los implantes?</h4>
                  <p className="text-white/80 text-sm mb-4">
                    {detailedExplanation.impact}
                  </p>
                  
                  {detailedExplanation.clinicalImplications && (
                    <>
                      <h4 className="mb-2 font-medium text-gold">Implicaciones clínicas</h4>
                      <ul className="text-white/80 text-sm mb-4 list-disc pl-5 space-y-1">
                        {detailedExplanation.clinicalImplications.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  <h4 className="mb-2 font-medium text-gold">Recomendación profesional</h4>
                  <p className="text-white/80 text-sm">
                    {detailedExplanation.professionalAdvice}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-white/80 text-sm mb-4 font-light">{question.explanation}</p>
        </div>
      </div>
    </div>
  );
}
