
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DollarSign, Calculator } from "lucide-react";

export default function PriceCalculatorDemo() {
  const [implantCount, setImplantCount] = useState<number>(1);
  const [zone, setZone] = useState<string>("anterior");
  const [needsGraft, setNeedsGraft] = useState<boolean>(false);
  const [rehabType, setRehabType] = useState<string>("corona");
  
  // Simulate price calculation based on inputs
  const calculatePrice = () => {
    let basePrice = 700000; // Base price per implant in CLP
    
    // Adjustments based on zone
    if (zone === "posterior") basePrice += 100000;
    if (zone === "completo") basePrice += 200000;
    
    // Adjustments for bone graft
    const graftCost = needsGraft ? 300000 : 0;
    
    // Adjustments for rehabilitation type
    let rehabCost = 0;
    if (rehabType === "corona") rehabCost = 400000;
    if (rehabType === "puente") rehabCost = 600000;
    if (rehabType === "sobredentadura") rehabCost = 800000;
    if (rehabType === "protesisFija") rehabCost = 1200000;
    
    // Calculate totals
    const implantCost = basePrice * implantCount;
    const totalCost = implantCost + graftCost + rehabCost;
    
    // Add range for variation
    const minCost = Math.round((totalCost * 0.9) / 100000) * 100000;
    const maxCost = Math.round((totalCost * 1.1) / 100000) * 100000;
    
    return { minCost, maxCost };
  };
  
  const { minCost, maxCost } = calculatePrice();
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h3 className="text-xl text-[#178582] mb-2">Calculadora de Costos</h3>
        <p className="text-white/80">Estime el costo aproximado de su tratamiento con implantes</p>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="space-y-6">
          {/* Implant count */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="implant-count" className="text-white">Número de implantes</Label>
              <span className="text-[#BFA181] font-medium">{implantCount}</span>
            </div>
            <Slider 
              id="implant-count" 
              min={1} 
              max={8} 
              step={1} 
              value={[implantCount]} 
              onValueChange={([value]) => setImplantCount(value)} 
              className="cursor-pointer"
            />
          </div>
          
          {/* Zone selection */}
          <div className="space-y-2">
            <Label htmlFor="zone" className="text-white">Zona a implantar</Label>
            <Select value={zone} onValueChange={setZone}>
              <SelectTrigger id="zone" className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Selecciona la zona" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A1828] border-white/20 text-white">
                <SelectItem value="anterior">Anterior (dientes frontales)</SelectItem>
                <SelectItem value="posterior">Posterior (muelas)</SelectItem>
                <SelectItem value="completo">Arco completo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Bone graft */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="graft" className="text-white">¿Necesita injerto óseo?</Label>
              <p className="text-xs text-white/60">Para casos con pérdida de hueso significativa</p>
            </div>
            <Switch 
              id="graft" 
              checked={needsGraft} 
              onCheckedChange={setNeedsGraft} 
              className="data-[state=checked]:bg-[#178582]"
            />
          </div>
          
          {/* Rehabilitation type */}
          <div className="space-y-2">
            <Label htmlFor="rehab" className="text-white">Tipo de rehabilitación</Label>
            <Select value={rehabType} onValueChange={setRehabType}>
              <SelectTrigger id="rehab" className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A1828] border-white/20 text-white">
                <SelectItem value="corona">Corona unitaria</SelectItem>
                <SelectItem value="puente">Puente sobre implantes</SelectItem>
                <SelectItem value="sobredentadura">Sobredentadura removible</SelectItem>
                <SelectItem value="protesisFija">Prótesis fija completa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results */}
        <motion.div 
          className="mt-8 p-5 border border-[#BFA181]/30 rounded-lg bg-gradient-to-r from-[#178582]/10 to-[#BFA181]/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[#BFA181] font-medium flex items-center">
              <Calculator className="w-4 h-4 mr-2" />
              Estimación de costo
            </h4>
            <DollarSign className="w-5 h-5 text-[#178582]" />
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {formatCurrency(minCost)} - {formatCurrency(maxCost)}
            </div>
            <p className="text-xs text-white/60 mt-2">
              *Precios aproximados basados en promedios nacionales.
            </p>
          </div>
        </motion.div>
        
        <div className="mt-6 text-xs text-white/50 text-center">
          <p>Esta estimación no reemplaza un presupuesto clínico formal, que debe ser realizado por un profesional tras una evaluación detallada.</p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="flex items-start gap-3 bg-gradient-to-r from-[#178582]/15 to-transparent p-4 rounded-lg max-w-md">
          <img src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png" alt="Rio Assistant" className="w-8 h-8 mr-2" />
          <p className="text-sm text-white/90">
            <span className="text-[#178582] font-medium">Río:</span> Los costos pueden variar dependiendo de tu ubicación geográfica, la clínica seleccionada y las particularidades de tu caso. Esta calculadora proporciona un rango aproximado.
          </p>
        </div>
      </div>
    </div>
  );
}
