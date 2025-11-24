import React from "react";
import { PatientInfo, Answer } from "@/types/implant";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";
import { MessageCircle, Clock, Heart, Shield, Cigarette, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImplantXHudScreenProps {
  patientInfo: PatientInfo;
  answers: Answer[];
  onContactRio?: () => void;
}

export default function ImplantXHudScreen({ patientInfo, answers, onContactRio }: ImplantXHudScreenProps) {
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

  return (
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
          <div className={`bg-gradient-to-b from-card/60 to-background/80 backdrop-blur-xl rounded-2xl border ${riskLevel.color} p-3 flex flex-col items-center gap-1 min-w-[160px] shadow-lg`}>
            <div className={`w-[70px] h-[70px] rounded-full border-2 ${riskLevel.color} shadow-glow flex items-center justify-center`}>
              <div className="text-2xl font-bold">{successPercentage}%</div>
            </div>
            <div className="text-[11px] text-muted-foreground">Probabilidad de éxito</div>
            <div className={`text-[11px] px-3 py-0.5 rounded-full border ${riskLevel.color} bg-primary/5`}>
              {riskLevel.label}
            </div>
          </div>
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
                <div className="w-[26%] h-[70%] rounded-[50px] bg-gradient-radial from-green-500/60 to-transparent blur-sm opacity-90" />
                <div className="w-[26%] h-[70%] rounded-[50px] bg-gradient-radial from-yellow-500/70 to-transparent blur-sm opacity-90" />
                <div className="w-[26%] h-[70%] rounded-[50px] bg-gradient-radial from-red-500/70 to-transparent blur-sm opacity-90" />
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
                <li className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Densidad ósea estimada</span>
                  <strong>0.78 · Buena</strong>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Pérdida ósea previa</span>
                  <strong>Moderada</strong>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Bruxismo</span>
                  <strong>{bruxismAnswer?.selectedValues[0] !== "no" ? "Presente" : "Ausente"}</strong>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Biotipo gingival</span>
                  <strong>Fino · Riesgo estético</strong>
                </li>
              </ul>

              {/* Mini Chart */}
              <div className="rounded-xl border border-primary/40 p-2 bg-card/40">
                <div className="text-[11px] mb-2 text-muted-foreground">Impacto de factores</div>
                <div className="space-y-1.5">
                  {[
                    { label: "Tabaco", value: smokingAnswer?.score || 0, max: 3 },
                    { label: "Higiene", value: hygieneAnswer?.score || 0, max: 2 },
                    { label: "Bruxismo", value: bruxismAnswer?.score || 0, max: 2 },
                    { label: "Condición general", value: Math.min(totalScore, 4), max: 4 }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="w-20 text-[11px]">{item.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-card/60 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-primary to-green-400"
                          style={{ width: `${(item.value / item.max) * 100}%` }}
                        />
                      </div>
                    </div>
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
              <div className="text-[11px] text-muted-foreground mb-2">Odontograma frontal 13–23</div>
              <div className="flex justify-between gap-1.5">
                {["13", "12", "11", "21", "22", "23"].map((tooth) => {
                  const isMissing = tooth === "11" || tooth === "21";
                  return (
                    <div key={tooth} className="flex flex-col items-center gap-1 text-[10px]">
                      <div className={`w-6 h-8 rounded-xl border ${isMissing ? "border-primary/90 shadow-glow" : "border-primary/50"} bg-gradient-to-b from-card/40 to-background/80`} />
                      <div className="text-muted-foreground">{tooth}</div>
                      {isMissing && (
                        <div className="text-[9px] px-2 py-0.5 rounded-full border border-primary/70 bg-primary/10">
                          Implante
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-2">
              <div className="text-[11px] text-muted-foreground">Etapas del tratamiento</div>
              <ol className="space-y-1.5 text-xs">
                {[
                  { label: "Evaluación inicial & planificación", status: "done" },
                  { label: "Extracción, limpieza y acondicionamiento", status: "active" },
                  { label: "Colocación de implantes", status: "pending" },
                  { label: "Prótesis provisional · Carga inmediata", status: "pending" },
                  { label: "Prótesis definitiva · 4–6 meses", status: "pending" }
                ].map((phase, idx) => (
                  <li key={idx} className="relative pl-5 text-foreground/90">
                    <span className={`absolute left-0 top-1.5 w-2 h-2 rounded-full border ${
                      phase.status === "done" ? "bg-green-500 border-green-500" :
                      phase.status === "active" ? "bg-primary border-primary shadow-glow" :
                      "bg-transparent border-primary/50"
                    }`} />
                    {phase.label}
                  </li>
                ))}
              </ol>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-[11px] px-2 py-1 rounded-full border border-primary/40 bg-primary/5">
                  Carga inmediata: posible
                </span>
                <span className="text-[11px] px-2 py-1 rounded-full border border-primary/40 bg-primary/5">
                  Injerto óseo: leve
                </span>
                <span className="text-[11px] px-2 py-1 rounded-full border border-primary/40 bg-primary/5">
                  Tiempo: 4–6 meses
                </span>
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
            <div className="relative h-[140px] rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-background/80 p-3">
              <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground rotate-90 origin-bottom-left">
                Higiene & hábitos
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
                Control médico
              </div>
              
              <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
                <div className="rounded border border-green-500/30 bg-green-500/5 flex items-center justify-center text-[9px] text-center p-1">
                  Alto control<br/>Buena higiene
                </div>
                <div className="rounded border border-yellow-500/30 bg-yellow-500/5 flex items-center justify-center text-[9px] text-center p-1">
                  Alto control<br/>Mala higiene
                </div>
                <div className="rounded border border-yellow-500/30 bg-yellow-500/5 flex items-center justify-center text-[9px] text-center p-1">
                  Bajo control<br/>Buena higiene
                </div>
                <div className="rounded border border-red-500/30 bg-red-500/5 flex items-center justify-center text-[9px] text-center p-1">
                  Bajo control<br/>Mala higiene
                </div>
              </div>
              
              {/* Position Dot */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-primary shadow-glow animate-pulse" />
            </div>

            {/* Risk Data */}
            <ul className="space-y-2">
              <li className="flex justify-between gap-2">
                <span className="text-muted-foreground">Tabaco</span>
                <strong>
                  {smokingAnswer?.selectedValues[0] === "no" ? "No fuma" : 
                   smokingAnswer?.selectedValues[0] === "<10" ? "≤10 cig/día · Riesgo medio" :
                   "Riesgo elevado"}
                </strong>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-muted-foreground">Higiene oral</span>
                <strong>
                  {hygieneAnswer?.selectedValues[0] === ">2" ? "Óptima" :
                   hygieneAnswer?.selectedValues[0] === "2" ? "Buena" :
                   "Mejorable"}
                </strong>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-muted-foreground">Bruxismo</span>
                <strong>
                  {bruxismAnswer?.selectedValues[0] === "no" ? "No presente" :
                   bruxismAnswer?.selectedValues[0] === "ocasional" ? "Ocasional" :
                   "Frecuente · Requiere plano"}
                </strong>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-muted-foreground">Motivación</span>
                <strong>Alta · Prioriza estética social</strong>
              </li>
            </ul>

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
  );
}
