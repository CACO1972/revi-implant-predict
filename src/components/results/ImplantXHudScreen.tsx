import React, { useState } from "react";
import { PatientInfo, Answer } from "@/types/implant";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";
import { MessageCircle, ChevronDown, ChevronUp, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ImplantXHudScreenProps {
  patientInfo: PatientInfo;
  answers: Answer[];
  onContactRio?: () => void;
}

interface ToothData {
  id: string;
  name: string;
  condition: string;
  treatment: string;
  details: string;
}

const teethData: Record<string, ToothData> = {
  "13": { id: "13", name: "Canino superior derecho", condition: "Sano", treatment: "Ninguno", details: "Pieza dental en buen estado, sirve como anclaje para prótesis adyacentes." },
  "12": { id: "12", name: "Incisivo lateral superior derecho", condition: "Sano", treatment: "Ninguno", details: "Estructura dental íntegra, encía saludable." },
  "11": { id: "11", name: "Incisivo central superior derecho", condition: "Ausente", treatment: "Implante dental", details: "Requiere implante de titanio grado 5, corona de circonio. Tiempo de oseointegración: 3-4 meses." },
  "21": { id: "21", name: "Incisivo central superior izquierdo", condition: "Ausente", treatment: "Implante dental", details: "Requiere implante de titanio grado 5, corona de circonio. Procedimiento simultáneo con pieza 11." },
  "22": { id: "22", name: "Incisivo lateral superior izquierdo", condition: "Sano", treatment: "Ninguno", details: "Estructura dental íntegra, encía saludable." },
  "23": { id: "23", name: "Canino superior izquierdo", condition: "Sano", treatment: "Ninguno", details: "Pieza dental en buen estado, sirve como anclaje para prótesis adyacentes." },
};

export default function ImplantXHudScreen({ patientInfo, answers, onContactRio }: ImplantXHudScreenProps) {
  const [selectedTooth, setSelectedTooth] = useState<ToothData | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    factors: true,
    habits: false,
    recommendations: false,
  });

  const totalScore = calculateScore(answers);
  const result = evaluateResult(totalScore);
  
  // Extract key data from answers
  const ageAnswer = answers.find(a => a.questionId === 1);
  const smokingAnswer = answers.find(a => a.questionId === 6);
  const bruxismAnswer = answers.find(a => a.questionId === 8);
  const hygieneAnswer = answers.find(a => a.questionId === 9);
  const osteoporosisAnswer = answers.find(a => a.questionId === 5);
  const missingTeethAnswer = answers.find(a => a.questionId === 4);

  const successPercentage = Math.round((100 - (totalScore / 15) * 100));
  
  const getRiskLevel = () => {
    if (successPercentage >= 85) return { label: "Riesgo bajo", color: "border-green-500/60" };
    if (successPercentage >= 70) return { label: "Riesgo moderado-bajo", color: "border-primary/60" };
    if (successPercentage >= 55) return { label: "Riesgo moderado", color: "border-yellow-500/60" };
    return { label: "Riesgo elevado", color: "border-orange-500/60" };
  };

  const riskLevel = getRiskLevel();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleToothClick = (toothId: string) => {
    setSelectedTooth(teethData[toothId]);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <main className="min-h-screen bg-gradient-radial from-background via-background to-[#020509] text-foreground font-sans p-4 flex flex-col gap-4">
        {/* HEADER */}
        <header className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-primary/70 flex items-center justify-center font-bold text-lg bg-gradient-to-b from-primary/20 to-background shadow-glow">
              IX
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider">ImplantX</div>
              <div className="text-[11px] text-muted-foreground">Clinical Predictive HUD</div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="text-center">
            <div className="text-lg font-semibold uppercase tracking-wide">{patientInfo.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              ID #IX-{Math.floor(Math.random() * 90000) + 10000} · {patientInfo.age} años
              {smokingAnswer && smokingAnswer.selectedValues[0] !== "no" && " · Fumador"}
            </div>
          </div>

          {/* Score */}
          <div className="flex justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`bg-gradient-to-b from-card/60 to-background/80 backdrop-blur-xl rounded-2xl border ${riskLevel.color} p-3 flex flex-col items-center gap-1 min-w-[160px] shadow-lg cursor-help transition-transform hover:scale-105`}>
                  <div className={`w-[70px] h-[70px] rounded-full border-2 ${riskLevel.color} shadow-glow flex items-center justify-center`}>
                    <div className="text-2xl font-bold">{successPercentage}%</div>
                  </div>
                  <div className="text-[11px] text-muted-foreground">Probabilidad de éxito</div>
                  <div className={`text-[11px] px-3 py-0.5 rounded-full border ${riskLevel.color} bg-primary/5`}>
                    {riskLevel.label}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[250px] p-3">
                <p className="text-sm font-semibold mb-1">Probabilidad de Éxito Clínico</p>
                <p className="text-xs text-muted-foreground">
                  Calculada en base a tus respuestas del cuestionario, considerando factores como edad, hábitos, salud ósea y condiciones médicas.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </header>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
          {/* DENSITYPRO CARD */}
          <section className="bg-gradient-to-br from-card/40 via-card/30 to-background/80 backdrop-blur-xl rounded-2xl border border-primary/30 p-4 flex flex-col gap-3 shadow-xl">
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <h2 className="text-sm uppercase tracking-widest font-semibold">DensityPro™ · Hueso &amp; soporte</h2>
              <span className="text-[11px] px-3 py-1 rounded-full border border-primary/40 bg-primary/10">
                Zona anterior maxilar
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-3 text-xs">
              {/* Jaw 3D Map */}
              <div className="rounded-xl border border-primary/30 p-3 bg-gradient-to-b from-primary/10 to-background/80 flex flex-col gap-2">
                <div className="text-[11px] text-muted-foreground">Mapa óseo estimado</div>
                
                <div className="relative h-[120px] rounded-[60px] border border-dashed border-primary/50 flex items-center justify-center gap-2 overflow-hidden">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-[26%] h-[70%] rounded-[50px] bg-gradient-radial from-green-500/60 to-transparent blur-sm opacity-90 cursor-help hover:opacity-100 transition-opacity" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Densidad óptima: zona lateral derecha</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-[26%] h-[70%] rounded-[50px] bg-gradient-radial from-yellow-500/70 to-transparent blur-sm opacity-90 cursor-help hover:opacity-100 transition-opacity" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Densidad normal: zona central</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-[26%] h-[70%] rounded-[50px] bg-gradient-radial from-red-500/70 to-transparent blur-sm opacity-90 cursor-help hover:opacity-100 transition-opacity" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Déficit óseo: zona lateral izquierda</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex gap-3 items-center text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />Óptimo
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />Normal
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500" />Déficit
                  </span>
                </div>
              </div>

              {/* Density Data */}
              <div className="flex flex-col gap-3">
                <ul className="space-y-2 text-xs">
                  {[
                    { label: "Densidad ósea estimada", value: "0.78 · Buena", tip: "Valor calculado a partir del perfil del paciente. Valores >0.7 son favorables para implantes." },
                    { label: "Pérdida ósea previa", value: "Moderada", tip: "Indica reabsorción ósea previa en la zona. Puede requerir injerto menor." },
                    { label: "Bruxismo", value: bruxismAnswer?.selectedValues[0] !== "no" ? "Presente" : "Ausente", tip: "El bruxismo genera fuerzas excesivas que pueden afectar la oseointegración." },
                    { label: "Biotipo gingival", value: "Fino · Riesgo estético", tip: "Encía delgada que requiere manejo cuidadoso para óptimos resultados estéticos." },
                  ].map((item, idx) => (
                    <Tooltip key={idx}>
                      <TooltipTrigger asChild>
                        <li className="flex justify-between gap-2 cursor-help hover:bg-primary/5 rounded p-1 -m-1 transition-colors">
                          <span className="text-muted-foreground flex items-center gap-1">
                            {item.label}
                            <Info className="w-3 h-3 opacity-50" />
                          </span>
                          <strong>{item.value}</strong>
                        </li>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-[200px]">
                        <p className="text-xs">{item.tip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </ul>

                {/* Mini Chart */}
                <div className="rounded-xl border border-primary/40 p-2 bg-card/40">
                  <div className="text-[11px] mb-2 text-muted-foreground">Impacto de factores</div>
                  <div className="space-y-1.5">
                    {[
                      { label: "Tabaco", value: smokingAnswer?.score || 0, max: 3, tip: "El tabaco reduce la vascularización ósea y afecta la cicatrización." },
                      { label: "Higiene", value: hygieneAnswer?.score || 0, max: 2, tip: "Una buena higiene es crucial para prevenir periimplantitis." },
                      { label: "Bruxismo", value: bruxismAnswer?.score || 0, max: 2, tip: "Genera sobrecarga mecánica en los implantes." },
                      { label: "Condición general", value: Math.min(totalScore, 4), max: 4, tip: "Factores sistémicos que influyen en la capacidad de cicatrización." }
                    ].map((item) => (
                      <Tooltip key={item.label}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-help hover:bg-primary/5 rounded p-0.5 -m-0.5 transition-colors">
                            <span className="w-20 text-[11px]">{item.label}</span>
                            <div className="flex-1 h-1.5 rounded-full bg-card/60 overflow-hidden">
                              <div 
                                className="h-full rounded-full bg-gradient-to-r from-primary to-green-400 transition-all duration-500"
                                style={{ width: `${(item.value / item.max) * 100}%` }}
                              />
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[180px]">
                          <p className="text-xs">{item.tip}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SURGICAL PLAN CARD */}
          <section className="bg-gradient-to-br from-card/40 via-card/30 to-background/80 backdrop-blur-xl rounded-2xl border border-primary/30 p-4 flex flex-col gap-3 shadow-xl">
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <h2 className="text-sm uppercase tracking-widest font-semibold">Plan quirúrgico · Área estética</h2>
              <span className="text-[11px] px-3 py-1 rounded-full border border-primary/70 bg-primary/20">
                {missingTeethAnswer?.selectedValues.length || 2} Implantes
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {/* Odontogram */}
              <div className="rounded-xl border border-primary/30 p-3 bg-gradient-to-b from-primary/10 to-background/80">
                <div className="text-[11px] text-muted-foreground mb-2">Odontograma frontal 13–23 (haz clic para detalles)</div>
                <div className="flex justify-between gap-1.5">
                  {["13", "12", "11", "21", "22", "23"].map((tooth) => {
                    const isMissing = tooth === "11" || tooth === "21";
                    return (
                      <button
                        key={tooth}
                        onClick={() => handleToothClick(tooth)}
                        className={`flex flex-col items-center gap-1 text-[10px] group cursor-pointer transition-all hover:scale-110 ${
                          selectedTooth?.id === tooth ? "scale-110" : ""
                        }`}
                      >
                        <div className={`w-6 h-8 rounded-xl border-2 transition-all ${
                          isMissing 
                            ? "border-primary shadow-glow bg-primary/20 group-hover:bg-primary/30" 
                            : "border-primary/50 bg-gradient-to-b from-card/40 to-background/80 group-hover:border-primary/80"
                        }`} />
                        <div className="text-muted-foreground group-hover:text-foreground transition-colors">{tooth}</div>
                        {isMissing && (
                          <div className="text-[9px] px-2 py-0.5 rounded-full border border-primary/70 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            Implante
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-2">
                <div className="text-[11px] text-muted-foreground">Etapas del tratamiento</div>
                <ol className="space-y-1.5 text-xs">
                  {[
                    { label: "Evaluación inicial & planificación", status: "done", tip: "Fase completada: diagnóstico y planificación digital." },
                    { label: "Extracción, limpieza y acondicionamiento", status: "active", tip: "Fase actual: preparación del sitio quirúrgico." },
                    { label: "Colocación de implantes", status: "pending", tip: "Cirugía de inserción de implantes de titanio." },
                    { label: "Prótesis provisional · Carga inmediata", status: "pending", tip: "Colocación de dientes temporales el mismo día." },
                    { label: "Prótesis definitiva · 4–6 meses", status: "pending", tip: "Coronas finales de circonio tras oseointegración." }
                  ].map((phase, idx) => (
                    <Tooltip key={idx}>
                      <TooltipTrigger asChild>
                        <li className="relative pl-5 text-foreground/90 cursor-help hover:bg-primary/5 rounded p-1 -m-1 transition-colors">
                          <span className={`absolute left-0 top-1.5 w-2 h-2 rounded-full border ${
                            phase.status === "done" ? "bg-green-500 border-green-500" :
                            phase.status === "active" ? "bg-primary border-primary shadow-glow animate-pulse" :
                            "bg-transparent border-primary/50"
                          }`} />
                          {phase.label}
                        </li>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-[200px]">
                        <p className="text-xs">{phase.tip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </ol>

                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    { label: "Carga inmediata: posible", tip: "Podrás tener dientes provisionales el mismo día de la cirugía." },
                    { label: "Injerto óseo: leve", tip: "Se requiere un pequeño aporte óseo para optimizar el resultado." },
                    { label: "Tiempo: 4–6 meses", tip: "Duración estimada del tratamiento completo." }
                  ].map((chip, idx) => (
                    <Tooltip key={idx}>
                      <TooltipTrigger asChild>
                        <span className="text-[11px] px-2 py-1 rounded-full border border-primary/40 bg-primary/5 cursor-help hover:bg-primary/10 transition-colors">
                          {chip.label}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{chip.tip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RISK MATRIX CARD */}
          <section className="bg-gradient-to-br from-card/40 via-card/30 to-background/80 backdrop-blur-xl rounded-2xl border border-primary/30 p-4 flex flex-col gap-3 shadow-xl">
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <h2 className="text-sm uppercase tracking-widest font-semibold">Risk Matrix · ImplantX™</h2>
              <span className="text-[11px] px-3 py-1 rounded-full border border-yellow-500/70 bg-yellow-500/10">
                Recomendaciones activas
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Risk Matrix Visual */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative h-[140px] rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-background/80 p-3 cursor-help hover:border-primary/50 transition-colors">
                    <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground rotate-90 origin-bottom-left">
                      Higiene & hábitos
                    </div>
                    <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
                      Control médico
                    </div>
                    
                    <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
                      <div className="rounded border border-green-500/30 bg-green-500/5 flex items-center justify-center text-[9px] text-center p-1 hover:bg-green-500/10 transition-colors">
                        Alto control<br/>Buena higiene
                      </div>
                      <div className="rounded border border-yellow-500/30 bg-yellow-500/5 flex items-center justify-center text-[9px] text-center p-1 hover:bg-yellow-500/10 transition-colors">
                        Alto control<br/>Mala higiene
                      </div>
                      <div className="rounded border border-yellow-500/30 bg-yellow-500/5 flex items-center justify-center text-[9px] text-center p-1 hover:bg-yellow-500/10 transition-colors">
                        Bajo control<br/>Buena higiene
                      </div>
                      <div className="rounded border border-red-500/30 bg-red-500/5 flex items-center justify-center text-[9px] text-center p-1 hover:bg-red-500/10 transition-colors">
                        Bajo control<br/>Mala higiene
                      </div>
                    </div>
                    
                    {/* Position Dot */}
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-primary shadow-glow animate-pulse" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-[220px]">
                  <p className="text-xs">
                    <strong>Tu posición:</strong> El punto indica dónde te encuentras según tus hábitos y control médico. El cuadrante verde es el objetivo.
                  </p>
                </TooltipContent>
              </Tooltip>

              {/* Expandable Risk Sections */}
              <div className="space-y-2">
                {/* Factors Section */}
                <Collapsible open={expandedSections.factors} onOpenChange={() => toggleSection('factors')}>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-2 rounded-lg border border-primary/30 bg-card/30 hover:bg-card/50 transition-colors">
                    <span className="text-[11px] font-semibold uppercase tracking-wide">Factores de Riesgo</span>
                    {expandedSections.factors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <ul className="space-y-2 pl-2">
                      {[
                        { label: "Tabaco", value: smokingAnswer?.selectedValues[0] === "no" ? "No fuma" : smokingAnswer?.selectedValues[0] === "<10" ? "≤10 cig/día · Riesgo medio" : "Riesgo elevado", tip: "El tabaco reduce hasta un 20% la tasa de éxito de implantes." },
                        { label: "Bruxismo", value: bruxismAnswer?.selectedValues[0] === "no" ? "No presente" : bruxismAnswer?.selectedValues[0] === "ocasional" ? "Ocasional" : "Frecuente · Requiere plano", tip: "Se recomienda férula de descarga nocturna para proteger los implantes." },
                      ].map((item, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <li className="flex justify-between gap-2 cursor-help hover:bg-primary/5 rounded p-1 transition-colors">
                              <span className="text-muted-foreground">{item.label}</span>
                              <strong>{item.value}</strong>
                            </li>
                          </TooltipTrigger>
                          <TooltipContent side="left" className="max-w-[200px]">
                            <p className="text-xs">{item.tip}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>

                {/* Habits Section */}
                <Collapsible open={expandedSections.habits} onOpenChange={() => toggleSection('habits')}>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-2 rounded-lg border border-primary/30 bg-card/30 hover:bg-card/50 transition-colors">
                    <span className="text-[11px] font-semibold uppercase tracking-wide">Hábitos de Higiene</span>
                    {expandedSections.habits ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <ul className="space-y-2 pl-2">
                      {[
                        { label: "Higiene oral", value: hygieneAnswer?.selectedValues[0] === ">2" ? "Óptima" : hygieneAnswer?.selectedValues[0] === "2" ? "Buena" : "Mejorable", tip: "Se recomienda cepillado 3 veces al día + hilo dental + enjuague." },
                        { label: "Frecuencia de cepillado", value: hygieneAnswer?.selectedValues[0] === ">2" ? "3+ veces/día" : hygieneAnswer?.selectedValues[0] === "2" ? "2 veces/día" : "1 vez/día", tip: "Mínimo recomendado: 2 veces al día durante 2 minutos." },
                      ].map((item, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <li className="flex justify-between gap-2 cursor-help hover:bg-primary/5 rounded p-1 transition-colors">
                              <span className="text-muted-foreground">{item.label}</span>
                              <strong>{item.value}</strong>
                            </li>
                          </TooltipTrigger>
                          <TooltipContent side="left" className="max-w-[200px]">
                            <p className="text-xs">{item.tip}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>

                {/* Recommendations Section */}
                <Collapsible open={expandedSections.recommendations} onOpenChange={() => toggleSection('recommendations')}>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-2 rounded-lg border border-yellow-500/40 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                    <span className="text-[11px] font-semibold uppercase tracking-wide">Recomendaciones</span>
                    {expandedSections.recommendations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <ul className="space-y-2 pl-2 text-xs">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>Dejar de fumar o reducir a menos de 5 cigarrillos diarios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>Usar férula de descarga nocturna para proteger implantes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>Limpieza dental profesional antes de la cirugía</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>Implementar rutina de higiene con hilo dental y enjuague</span>
                      </li>
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Summary Box */}
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-3 text-xs leading-relaxed">
                Tus resultados muestran una <strong>buena base ósea</strong> en la zona estética, pero{" "}
                {bruxismAnswer?.selectedValues[0] !== "no" && "el bruxismo y "}
                {hygieneAnswer?.selectedValues[0] === "<2" && "la higiene actual "}
                aumentan el riesgo de complicaciones. Si mejoramos estos factores durante las próximas 4–6 semanas, 
                tu probabilidad de éxito puede subir sobre el <strong>90%</strong>.
              </div>
            </div>
          </section>
        </section>

        {/* TOOTH DETAIL MODAL */}
        {selectedTooth && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedTooth(null)}>
            <div 
              className="bg-gradient-to-br from-card via-card/95 to-background border border-primary/40 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">Pieza #{selectedTooth.id}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTooth.name}</p>
                </div>
                <button 
                  onClick={() => setSelectedTooth(null)}
                  className="p-1 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-16 rounded-xl border-2 ${
                    selectedTooth.condition === "Ausente" 
                      ? "border-primary shadow-glow bg-primary/20" 
                      : "border-green-500/60 bg-green-500/10"
                  }`} />
                  <div>
                    <p className="text-sm font-semibold">{selectedTooth.condition}</p>
                    <p className="text-xs text-muted-foreground">{selectedTooth.treatment}</p>
                  </div>
                </div>
                
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <p className="text-sm leading-relaxed">{selectedTooth.details}</p>
                </div>
                
                {selectedTooth.condition === "Ausente" && (
                  <div className="flex gap-2">
                    <span className="text-[11px] px-3 py-1 rounded-full border border-primary/50 bg-primary/10">
                      Implante recomendado
                    </span>
                    <span className="text-[11px] px-3 py-1 rounded-full border border-green-500/50 bg-green-500/10">
                      Carga inmediata posible
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RIO BUTTON */}
        <Button
          onClick={onContactRio}
          className="fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-glow shadow-lg border border-primary/50 px-6 py-6 h-auto flex items-center gap-3 transition-all hover:scale-105"
        >
          <div className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center bg-gradient-to-br from-primary/80 to-accent/80 font-bold text-sm">
            RIO
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold">Hablar con Río</div>
            <div className="text-[11px] opacity-90">Explicación en lenguaje simple</div>
          </div>
          <MessageCircle className="w-5 h-5" />
        </Button>
      </main>
    </TooltipProvider>
  );
}