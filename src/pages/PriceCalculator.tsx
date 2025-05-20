
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Calculator, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import AppLogo from "@/components/instagram-demo/AppLogo";
import BluAssistant from "@/components/instagram-demo/BluAssistant";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TreatmentOption = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
};

type AdditionalOption = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export default function PriceCalculator() {
  const navigate = useNavigate();
  const [selectedTreatment, setSelectedTreatment] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [complexity, setComplexity] = useState<string>("normal");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  const treatmentOptions: TreatmentOption[] = [
    {
      id: "single",
      name: "Implante Unitario",
      basePrice: 950000,
      description: "Solución ideal para reemplazar un solo diente perdido."
    },
    {
      id: "multiple",
      name: "Implantes Múltiples",
      basePrice: 850000,
      description: "Precio por implante cuando se colocan varios (descuento por volumen)."
    },
    {
      id: "full-arch",
      name: "Rehabilitación Total",
      basePrice: 4500000,
      description: "Solución completa para toda la arcada dental."
    },
    {
      id: "immediate",
      name: "Carga Inmediata",
      basePrice: 1150000,
      description: "Implantes y corona provisional en el mismo día."
    }
  ];

  const additionalOptions: AdditionalOption[] = [
    {
      id: "premium-material",
      name: "Materiales Premium",
      price: 300000,
      description: "Implantes de titanio de grado superior y coronas de zirconio premium."
    },
    {
      id: "sedation",
      name: "Sedación Consciente",
      price: 250000,
      description: "Opción para pacientes con ansiedad o procedimientos complejos."
    },
    {
      id: "guided-surgery",
      name: "Cirugía Guiada 3D",
      price: 350000,
      description: "Mayor precisión usando guías quirúrgicas personalizadas e imágenes 3D."
    },
    {
      id: "bone-graft",
      name: "Injerto Óseo Básico",
      price: 280000,
      description: "Procedimiento para aumentar el volumen óseo disponible."
    }
  ];

  const complexityFactors = {
    "simple": 0.9,
    "normal": 1.0,
    "complex": 1.25
  };

  React.useEffect(() => {
    if (!selectedTreatment) {
      setTotalPrice(0);
      return;
    }

    const treatment = treatmentOptions.find(t => t.id === selectedTreatment);
    if (!treatment) return;

    let price = treatment.basePrice;
    
    // Aplicar factor de complejidad
    price = price * (complexityFactors[complexity as keyof typeof complexityFactors] || 1.0);
    
    // Añadir opciones adicionales
    selectedOptions.forEach(optId => {
      const option = additionalOptions.find(o => o.id === optId);
      if (option) price += option.price;
    });
    
    // Redondear a miles
    price = Math.round(price / 1000) * 1000;
    
    setTotalPrice(price);
  }, [selectedTreatment, selectedOptions, complexity]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden">
      <AnimatedStarryBackground />
      <AppLogo size="small" />
      
      <div className="w-full max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold gold-gradient-text">Calculadora de Precios</h1>
            <div className="w-24"></div>
          </div>
          
          <p className="text-white/80 mb-8 text-center">
            Esta herramienta te permite estimar el costo aproximado de tu tratamiento de implantes dentales.
            Recuerda que los precios finales pueden variar según tu caso específico.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[#1EAEDB] font-medium mb-2">
                  Tipo de Tratamiento
                </label>
                <Select 
                  value={selectedTreatment} 
                  onValueChange={setSelectedTreatment}
                >
                  <SelectTrigger className="bg-background/60 border-white/20">
                    <SelectValue placeholder="Seleccionar tratamiento" />
                  </SelectTrigger>
                  <SelectContent>
                    {treatmentOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTreatment && (
                  <p className="text-white/60 text-sm mt-1">
                    {treatmentOptions.find(t => t.id === selectedTreatment)?.description}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-[#1EAEDB] font-medium mb-2">
                  Complejidad del Caso
                </label>
                <Select 
                  value={complexity} 
                  onValueChange={setComplexity}
                >
                  <SelectTrigger className="bg-background/60 border-white/20">
                    <SelectValue placeholder="Seleccionar complejidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple (-10%)</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="complex">Complejo (+25%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2">
                <label className="block text-[#1EAEDB] font-medium mb-2">
                  Opciones Adicionales
                </label>
                <div className="space-y-3">
                  {additionalOptions.map(option => (
                    <div key={option.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={option.id}
                        checked={selectedOptions.includes(option.id)}
                        onCheckedChange={() => handleOptionToggle(option.id)}
                        className="mt-1"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={option.id}
                          className="text-sm font-medium text-white cursor-pointer flex items-center"
                        >
                          {option.name} 
                          <span className="ml-2 text-xs text-white/60">
                            (+{formatPrice(option.price)})
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 text-white/60" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs w-48">{option.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 flex flex-col">
              <h3 className="text-[#1EAEDB] font-medium mb-4 flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Resumen de Precios
              </h3>
              
              {selectedTreatment ? (
                <>
                  <div className="space-y-3 flex-grow">
                    <div className="flex justify-between">
                      <span className="text-white/70">Tratamiento base:</span>
                      <span className="text-white">
                        {formatPrice(treatmentOptions.find(t => t.id === selectedTreatment)?.basePrice || 0)}
                      </span>
                    </div>
                    
                    {complexity !== "normal" && (
                      <div className="flex justify-between">
                        <span className="text-white/70">Ajuste por complejidad:</span>
                        <span className="text-white">
                          {complexity === "simple" ? "-10%" : "+25%"}
                        </span>
                      </div>
                    )}
                    
                    {selectedOptions.length > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-white/70">Opciones adicionales:</span>
                          <span className="text-white">
                            {formatPrice(selectedOptions.reduce((sum, optId) => {
                              const option = additionalOptions.find(o => o.id === optId);
                              return sum + (option?.price || 0);
                            }, 0))}
                          </span>
                        </div>
                      </>
                    )}
                    
                    <Separator className="my-2 bg-white/20" />
                    
                    <div className="flex justify-between font-bold">
                      <span className="text-white">Total estimado:</span>
                      <span className="text-[#1EAEDB] text-xl">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="p-4 rounded-lg bg-[#1EAEDB]/10 mb-4 border border-[#1EAEDB]/20">
                      <p className="text-white/80 text-sm text-center">
                        <span className="font-medium block mb-1">Democratizando el acceso a tratamientos dentales</span>
                        Esta herramienta educativa te ayuda a planificar financieramente tu tratamiento, especialmente si vives en zonas aisladas o con acceso limitado a especialistas.
                      </p>
                    </div>
                    
                    <Button
                      className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-starry shadow-gold-glow transition-all duration-300"
                    >
                      <Sparkles className="w-4 h-4 mr-2 group-hover:animate-sparkle" />
                      Solicitar Presupuesto Detallado
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                  <p className="text-white/50 mb-2">
                    Selecciona un tratamiento para ver el costo estimado
                  </p>
                  <Calculator className="h-12 w-12 text-white/20 animate-pulse mt-2" />
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 p-4 border border-white/10 rounded-lg bg-white/5">
            <p className="text-sm text-white/70">
              <span className="text-[#1EAEDB] font-medium">¿Por qué utilizamos esta calculadora?</span><br/>
              En ImplantDX creemos que la transparencia en los costos es fundamental. Muchas personas no acceden a tratamientos de implantes por desconocer opciones asequibles o no poder comparar precios. Esta herramienta busca democratizar el acceso a información clara sobre costos, especialmente para quienes tienen limitaciones geográficas o económicas.
            </p>
          </div>
        </motion.div>
      </div>
      
      <BluAssistant 
        isVisible={true} 
        message="Puedo ayudarte a entender los diferentes factores que influyen en el costo de un implante. La ubicación geográfica, el tipo de implante y las tecnologías utilizadas son factores clave en el precio final."
      />
    </div>
  );
}
