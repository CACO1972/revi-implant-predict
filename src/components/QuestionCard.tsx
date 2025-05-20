
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Question, Answer } from "@/types/implant";
import { getScoreFromOptions } from "@/utils/assessmentUtils";
import { motion } from "framer-motion";
import { Sparkles, Activity, HelpCircle } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentAnswer?: Answer;
}

export default function QuestionCard({
  question,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  currentAnswer
}: QuestionCardProps) {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    currentAnswer?.selectedValues || []
  );
  const [error, setError] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Reset selected values when question changes
    setSelectedValues(currentAnswer?.selectedValues || []);
    setError(false);
  }, [question.id, currentAnswer]);

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
  }, []);

  const handleSingleSelect = (value: string | number) => {
    setSelectedValues([value]);
    setError(false);
  };

  const handleMultiSelect = (value: string | number, checked: boolean) => {
    setError(false);
    
    // Special case for "none" option in conditions question
    if (question.id === 7) {
      if (value === "none" && checked) {
        // If "none" is selected, clear all other selections
        setSelectedValues(["none"]);
      } else if (checked) {
        // If any other option is selected, remove "none" if it's present
        setSelectedValues(prev => 
          prev.includes("none") 
            ? [value] 
            : [...prev.filter(v => v !== value), value]
        );
      } else {
        // If unchecking an option
        setSelectedValues(prev => prev.filter(v => v !== value));
      }
      return;
    }
    
    if (checked) {
      setSelectedValues(prev => [...prev, value]);
    } else {
      setSelectedValues(prev => prev.filter(v => v !== value));
    }
  };

  const handleNext = () => {
    if (selectedValues.length === 0) {
      setError(true);
      return;
    }

    const score = getScoreFromOptions(question.id, selectedValues);
    
    onAnswer({
      questionId: question.id,
      selectedValues,
      score
    });
    
    onNext();
  };

  // Obtener la explicación detallada para esta pregunta desde el mapa de explicaciones detalladas
  const detailedExplanation = getDetailedExplanation(question.id);

  return (
    <motion.div 
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto glass-panel p-8 shadow-lg backdrop-blur-lg"
    >
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

      <div className="mb-6 pl-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {question.multiSelect ? (
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.div 
                  key={option.value.toString()} 
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Checkbox
                    id={`option-${option.value}`}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) => {
                      handleMultiSelect(option.value, checked === true);
                    }}
                    className="border-gold/30 data-[state=checked]:bg-[#1EAEDB] data-[state=checked]:border-[#1EAEDB] mt-1"
                  />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className="text-sm font-light text-white/90 leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </motion.div>
              ))}
            </div>
          ) : (
            <RadioGroup
              value={selectedValues[0]?.toString()}
              onValueChange={handleSingleSelect}
              className="space-y-4"
            >
              {question.options.map((option, index) => (
                <motion.div 
                  key={option.value.toString()} 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <RadioGroupItem 
                    value={option.value.toString()} 
                    id={`option-${option.value}`}
                    className="border-gold/30 text-[#1EAEDB]" 
                  />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className="text-sm font-light text-white/90 leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          )}
        </motion.div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-xs mt-2"
          >
            Por favor, selecciona al menos una opción
          </motion.p>
        )}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 mb-6 p-4 bg-gradient-to-r from-[#1EAEDB]/5 to-gold/5 rounded-xl border border-white/5"
      >
        <div className="flex">
          <div className="mr-3 mt-1">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          </div>
          <p className="text-sm text-white/80 font-light">
            <span className="font-medium text-[#1EAEDB]">Recomendación: </span>
            {question.recommendation}
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="flex justify-between gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="flex-1 border-white/10 text-white hover:bg-white/5 disabled:opacity-30"
        >
          Anterior
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-[#1EAEDB] to-gold hover:from-[#1EAEDB]/90 hover:to-gold/90 text-white shadow-glow transition-all duration-300"
        >
          {isLast ? "Ver resultados" : "Siguiente"}
        </Button>
      </motion.div>
    </motion.div>
  );
}

// Función para obtener explicaciones detalladas para cada pregunta
function getDetailedExplanation(questionId: number) {
  const explanations = {
    1: {
      importance: "El tabaquismo es uno de los factores más significativos que afectan negativamente los resultados de los implantes dentales.",
      impact: "El tabaco reduce el flujo sanguíneo a las encías y huesos, disminuye la capacidad de cicatrización y aumenta el riesgo de infecciones. Los componentes tóxicos del tabaco interfieren directamente con el proceso de oseointegración (fusión del implante con el hueso).",
      clinicalImplications: [
        "Tasa de fracaso de implantes 2-3 veces mayor en fumadores",
        "Mayor riesgo de periimplantitis (infección alrededor del implante)",
        "Cicatrización más lenta y menos predecible",
        "Mayor pérdida ósea alrededor del implante con el tiempo"
      ],
      professionalAdvice: "Se recomienda suspender el consumo de tabaco al menos 1 semana antes y 2 meses después de la cirugía de implantes. Idealmente, usar esta oportunidad para dejar de fumar permanentemente."
    },
    2: {
      importance: "La diabetes afecta la cicatrización de tejidos y puede comprometer la respuesta inmune, factores fundamentales para el éxito de los implantes.",
      impact: "La diabetes mal controlada reduce la capacidad del cuerpo para combatir infecciones, altera la cicatrización y puede comprometer la calidad ósea. Todo esto puede afectar la oseointegración del implante.",
      clinicalImplications: [
        "Mayor riesgo de infecciones post-operatorias",
        "Cicatrización más lenta de tejidos blandos y duros",
        "Posible retraso en los tiempos de carga del implante",
        "Mayor vigilancia necesaria durante la fase de mantenimiento"
      ],
      professionalAdvice: "Los pacientes con diabetes bien controlada (HbA1c < 7%) pueden recibir implantes con tasas de éxito similares a los no diabéticos. Es esencial mantener un control glucémico estricto antes, durante y después del procedimiento."
    },
    3: {
      importance: "El bruxismo (rechinar o apretar los dientes) somete a los implantes y sus componentes protésicos a fuerzas excesivas que pueden comprometer su éxito a largo plazo.",
      impact: "Las fuerzas generadas durante el bruxismo pueden ser hasta 6 veces mayores que durante la masticación normal. Estas fuerzas excesivas pueden provocar aflojamiento de componentes, fracturas de la porcelana o incluso fracaso del implante.",
      clinicalImplications: [
        "Mayor riesgo de complicaciones mecánicas (aflojamiento de tornillos, fracturas)",
        "Posible pérdida ósea acelerada alrededor del implante",
        "Necesidad de componentes más robustos y diseños específicos",
        "Mayor frecuencia de mantenimiento y revisiones"
      ],
      professionalAdvice: "El uso de una férula de descarga nocturna (plano oclusal) es fundamental para proteger los implantes. En casos severos, puede ser necesario considerar un mayor número de implantes o materiales más resistentes."
    },
    4: {
      importance: "El tiempo transcurrido desde la pérdida dental influye directamente en la cantidad y calidad del hueso disponible para colocar implantes.",
      impact: "Tras la extracción dental, el hueso alveolar comienza a reabsorberse. El 50% del ancho óseo se pierde en los primeros 12 meses, y este proceso continúa a un ritmo más lento posteriormente. La calidad ósea también puede deteriorarse con el tiempo.",
      clinicalImplications: [
        "Mayor probabilidad de necesitar procedimientos de aumento óseo",
        "Posible comprometimiento estético por deficiencias de volumen",
        "Mayor complejidad quirúrgica",
        "Potencial aumento de costos y tiempo de tratamiento"
      ],
      professionalAdvice: "Idealmente, la planificación de implantes debería iniciarse poco después de la pérdida dental. Para casos de pérdida antigua, existen técnicas avanzadas de regeneración ósea que pueden recuperar el volumen perdido."
    },
    5: {
      importance: "La cantidad de dientes a reemplazar determina el diseño del plan de tratamiento, número de implantes y tipo de prótesis más adecuados.",
      impact: "El reemplazo de múltiples dientes requiere consideraciones biomecánicas específicas para distribuir adecuadamente las fuerzas masticatorias y garantizar la longevidad del tratamiento.",
      clinicalImplications: [
        "Diferentes relaciones implante-corona según el caso",
        "Consideraciones estéticas más complejas en zonas múltiples",
        "Necesidad de evaluar la oclusión global",
        "Diferentes opciones protésicas disponibles (coronas individuales vs. puentes)"
      ],
      professionalAdvice: "No siempre es necesario un implante por cada diente perdido. En muchos casos, se pueden utilizar diseños optimizados que requieren menos implantes, reduciendo costos y complejidad sin comprometer la funcionalidad."
    },
    6: {
      importance: "Cada zona de la boca presenta diferentes características de hueso, estética y fuerzas masticatorias, lo que influye directamente en el enfoque quirúrgico y protésico.",
      impact: "La densidad ósea varía significativamente entre las diferentes zonas de la boca. El maxilar posterior suele tener la menor densidad, mientras que la mandíbula anterior presenta la mayor. Esto afecta la estabilidad inicial del implante y los protocolos de carga.",
      clinicalImplications: [
        "Diferentes protocolos quirúrgicos según la zona",
        "Variación en los tiempos de oseointegración",
        "Consideraciones estéticas específicas en zona anterior",
        "Posible necesidad de técnicas avanzadas en zonas posteriores"
      ],
      professionalAdvice: "La planificación 3D y las guías quirúrgicas personalizadas han revolucionado la precisión en la colocación de implantes en todas las zonas, permitiendo aprovechar al máximo el hueso disponible y optimizar resultados estéticos y funcionales."
    },
    7: {
      importance: "Las condiciones orales actuales pueden indicar problemas subyacentes que afectarían negativamente al éxito de los implantes si no se tratan previamente.",
      impact: "Condiciones como caries, enfermedad periodontal activa o movilidad dental sugieren un entorno oral desfavorable que podría comprometer la salud de los implantes si no se estabiliza primero.",
      clinicalImplications: [
        "Necesidad de fase higiénica previa al tratamiento con implantes",
        "Posible modificación del plan de tratamiento",
        "Mayor riesgo de complicaciones si no se tratan estos problemas",
        "Importancia del mantenimiento periodontal a largo plazo"
      ],
      professionalAdvice: "Antes de proceder con los implantes, es fundamental tratar todas las patologías orales existentes para crear un ambiente favorable. Un enfoque integral mejora significativamente el pronóstico a largo plazo."
    },
    8: {
      importance: "La causa de la pérdida dental puede revelar factores de riesgo subyacentes que podrían afectar también a los implantes si no se controlan adecuadamente.",
      impact: "Si la pérdida dental fue causada por enfermedad periodontal, existe un riesgo mayor de desarrollar periimplantitis (infección similar alrededor de los implantes). Si fue por trauma, podrían existir consideraciones específicas de volumen óseo o tejidos blandos.",
      clinicalImplications: [
        "Protocolos específicos según etiología de la pérdida",
        "Mayor vigilancia en casos de antecedentes de enfermedad periodontal",
        "Posible necesidad de injertos en casos de trauma severo",
        "Educación personalizada para prevenir problemas similares"
      ],
      professionalAdvice: "Identificar y controlar la causa original de la pérdida dental es crucial para el éxito a largo plazo. Esto podría incluir terapia periodontal, control de hábitos parafuncionales o estabilización de la oclusión."
    },
    9: {
      importance: "La higiene oral es el factor más importante para el mantenimiento a largo plazo de los implantes, incluso más que las consideraciones técnicas del tratamiento.",
      impact: "Una higiene deficiente lleva a la acumulación de biofilm (placa bacteriana) alrededor del implante, lo que puede provocar inflamación de tejidos blandos (mucositis) y eventualmente periimplantitis con pérdida ósea irreversible.",
      clinicalImplications: [
        "Mayor riesgo de complicaciones biológicas con higiene deficiente",
        "Necesidad de programas de mantenimiento personalizados",
        "Posible modificación de diseños protésicos para facilitar la higiene",
        "Importancia de revisiones profesionales regulares"
      ],
      professionalAdvice: "Se recomienda cepillado al menos dos veces al día con técnicas específicas, uso de cepillos interdentales o irrigadores, y visitas de mantenimiento profesional cada 3-6 meses según el perfil de riesgo individual."
    },
    10: {
      importance: "La motivación del paciente influye en sus expectativas, compromiso con el tratamiento y satisfacción final con los resultados.",
      impact: "Entender las motivaciones permite personalizar el enfoque comunicativo, educacional y terapéutico, asegurando que los resultados se alineen con las expectativas del paciente.",
      clinicalImplications: [
        "Enfoque personalizado en aspectos estéticos vs. funcionales",
        "Adaptación de la comunicación a las expectativas individuales",
        "Mejor adherencia al tratamiento cuando se atienden las preocupaciones principales",
        "Mayor satisfacción a largo plazo"
      ],
      professionalAdvice: "Es importante mantener expectativas realistas sobre los resultados del tratamiento. Los implantes modernos ofrecen resultados excepcionales, pero tienen limitaciones específicas que deben comprenderse desde el inicio."
    },
    11: {
      importance: "Identificar las preocupaciones principales del paciente permite abordarlas directamente durante la planificación y ejecución del tratamiento.",
      impact: "Muchas preocupaciones comunes sobre los implantes (como el dolor) están basadas en ideas erróneas. Abordarlas adecuadamente mejora la experiencia del paciente y reduce la ansiedad.",
      clinicalImplications: [
        "Adaptación de protocolos anestésicos y de sedación según nivel de ansiedad",
        "Estrategias de financiamiento para preocupaciones económicas",
        "Planificación de tiempos de tratamiento según urgencia percibida",
        "Educación específica para disipar mitos comunes"
      ],
      professionalAdvice: "La odontología implantológica moderna ofrece soluciones para prácticamente todas las preocupaciones comunes. Desde técnicas mínimamente invasivas hasta opciones de sedación avanzadas, existen alternativas para hacer el tratamiento cómodo y accesible."
    }
  };

  return explanations[questionId as keyof typeof explanations] || {
    importance: "Esta información es relevante para tu evaluación.",
    impact: "Este factor puede influir en el éxito de tu tratamiento con implantes.",
    clinicalImplications: [],
    professionalAdvice: "Consulta con un especialista para una evaluación personalizada."
  };
}
