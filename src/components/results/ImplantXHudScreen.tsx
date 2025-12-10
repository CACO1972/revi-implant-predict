import React, { useState } from "react";
import { PatientInfo, Answer } from "@/types/implant";
import { calculateScore, evaluateResult } from "@/utils/assessmentUtils";
import { MessageCircle, ChevronDown, ChevronUp, X, Info, CheckCircle, AlertTriangle, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [selectedTooth, setSelectedTooth] = useState<ToothData | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    factors: true,
    habits: false,
    recommendations: false,
  });

  const totalScore = calculateScore(answers);
  const result = evaluateResult(totalScore);
  
  // Extract key data from answers
  const smokingAnswer = answers.find(a => a.questionId === 6);
  const bruxismAnswer = answers.find(a => a.questionId === 8);
  const hygieneAnswer = answers.find(a => a.questionId === 9);
  const missingTeethAnswer = answers.find(a => a.questionId === 4);

  const successPercentage = Math.round((100 - (totalScore / 15) * 100));
  
  const getRiskLevel = () => {
    if (successPercentage >= 85) return { label: "Excelente pronóstico", color: "text-success", bgColor: "bg-success/10", borderColor: "border-success/30" };
    if (successPercentage >= 70) return { label: "Buen pronóstico", color: "text-primary", bgColor: "bg-primary/10", borderColor: "border-primary/30" };
    if (successPercentage >= 55) return { label: "Pronóstico moderado", color: "text-warning", bgColor: "bg-warning/10", borderColor: "border-warning/30" };
    return { label: "Requiere evaluación", color: "text-destructive", bgColor: "bg-destructive/10", borderColor: "border-destructive/30" };
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
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
                alt="ImplantX"
                className="h-8 w-auto"
              />
              <span className="font-display text-lg font-semibold text-foreground">ImplantX</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="text-sm"
            >
              Nueva evaluación
            </Button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Patient Summary Header */}
          <div className="mb-8">
            <div className="clinical-card shadow-clinical p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Patient Info */}
                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                    Hola, {patientInfo.name}
                  </h1>
                  <p className="text-muted-foreground">
                    Tu evaluación predictiva está lista
                  </p>
                </div>

                {/* Score Card */}
                <div className={`flex items-center gap-4 p-4 rounded-2xl ${riskLevel.bgColor} ${riskLevel.borderColor} border`}>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${riskLevel.color}`}>
                      {successPercentage}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Probabilidad de éxito
                    </div>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <div className={`font-semibold ${riskLevel.color}`}>
                      {riskLevel.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Basado en tu perfil clínico
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Bone Density Card */}
            <div className="clinical-card shadow-clinical p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Densidad Ósea</h2>
                <span className="badge badge-primary">Estimación</span>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Densidad estimada", value: "Buena", status: "success" },
                  { label: "Pérdida ósea", value: "Moderada", status: "warning" },
                  { label: "Biotipo gingival", value: "Fino", status: "neutral" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className={`text-sm font-medium ${
                      item.status === 'success' ? 'text-success' : 
                      item.status === 'warning' ? 'text-warning' : 'text-foreground'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Factor Impact Bars */}
              <div className="pt-4 border-t border-border space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Impacto de factores</h3>
                {[
                  { label: "Tabaco", value: smokingAnswer?.score || 0, max: 3 },
                  { label: "Higiene", value: hygieneAnswer?.score || 0, max: 2 },
                  { label: "Bruxismo", value: bruxismAnswer?.score || 0, max: 2 },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="text-foreground">{Math.round((1 - item.value / item.max) * 100)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill bg-primary"
                        style={{ width: `${(1 - item.value / item.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Plan Card */}
            <div className="clinical-card shadow-clinical p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Plan de Tratamiento</h2>
                <span className="badge badge-secondary">
                  {missingTeethAnswer?.selectedValues.length || 2} implantes
                </span>
              </div>

              {/* Odontogram */}
              <div className="p-4 bg-muted/30 rounded-xl">
                <p className="text-xs text-muted-foreground mb-3">Haz clic en un diente para más detalles</p>
                <div className="flex justify-between gap-2">
                  {["13", "12", "11", "21", "22", "23"].map((tooth) => {
                    const isMissing = tooth === "11" || tooth === "21";
                    return (
                      <button
                        key={tooth}
                        onClick={() => handleToothClick(tooth)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all hover:scale-105 ${
                          selectedTooth?.id === tooth ? "bg-primary/10" : "hover:bg-muted/50"
                        }`}
                      >
                        <div className={`w-6 h-10 rounded-lg border-2 transition-all ${
                          isMissing 
                            ? "border-primary bg-primary/20" 
                            : "border-muted-foreground/30 bg-card"
                        }`} />
                        <span className="text-[10px] text-muted-foreground">{tooth}</span>
                        {isMissing && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
                            Implante
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Etapas del tratamiento</h3>
                <ol className="space-y-2">
                  {[
                    { label: "Evaluación y planificación", status: "done" },
                    { label: "Preparación del sitio", status: "active" },
                    { label: "Colocación de implantes", status: "pending" },
                    { label: "Prótesis provisional", status: "pending" },
                    { label: "Prótesis definitiva", status: "pending" },
                  ].map((phase, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        phase.status === "done" ? "bg-success" :
                        phase.status === "active" ? "bg-primary animate-pulse" :
                        "bg-muted-foreground/30"
                      }`} />
                      <span className={phase.status === "pending" ? "text-muted-foreground" : "text-foreground"}>
                        {phase.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Treatment Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="badge badge-success">Carga inmediata posible</span>
                <span className="badge badge-primary">4-6 meses</span>
              </div>
            </div>

            {/* Risk Analysis Card */}
            <div className="clinical-card shadow-clinical p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Análisis de Riesgo</h2>
                <span className="badge badge-warning">Activo</span>
              </div>

              {/* Expandable Sections */}
              <div className="space-y-3">
                <Collapsible open={expandedSections.factors} onOpenChange={() => toggleSection('factors')}>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-sm font-medium">Factores de Riesgo</span>
                    {expandedSections.factors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 space-y-2">
                    {[
                      { 
                        label: "Tabaco", 
                        value: smokingAnswer?.selectedValues[0] === "no" ? "No fuma" : "Riesgo presente",
                        isRisk: smokingAnswer?.selectedValues[0] !== "no"
                      },
                      { 
                        label: "Bruxismo", 
                        value: bruxismAnswer?.selectedValues[0] === "no" ? "No presente" : "Presente",
                        isRisk: bruxismAnswer?.selectedValues[0] !== "no"
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted/20">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <div className="flex items-center gap-2">
                          {item.isRisk ? (
                            <AlertTriangle className="w-4 h-4 text-warning" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-success" />
                          )}
                          <span className={`text-sm font-medium ${item.isRisk ? 'text-warning' : 'text-success'}`}>
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible open={expandedSections.recommendations} onOpenChange={() => toggleSection('recommendations')}>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                    <span className="text-sm font-medium text-primary">Recomendaciones</span>
                    {expandedSections.recommendations ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 space-y-2">
                    {[
                      "Reducir o eliminar el consumo de tabaco",
                      "Usar férula de descarga nocturna",
                      "Limpieza dental profesional previa",
                      "Mejorar rutina de higiene oral",
                    ].map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{rec}</span>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Summary */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                <p className="text-sm text-foreground leading-relaxed">
                  Tus resultados muestran una <strong>buena base ósea</strong>. 
                  Mejorando los factores de riesgo identificados, tu probabilidad de éxito 
                  puede superar el <strong className="text-success">90%</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="clinical-card shadow-clinical-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  ¿Quieres recibir tu informe completo?
                </h2>
                <p className="text-muted-foreground">
                  Incluye plan detallado, estimación de costos y guía de preparación
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="btn-outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button
                  onClick={() => navigate('/recursos-educativos')}
                  className="btn-primary"
                >
                  Solicitar consulta
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Tooth Detail Modal */}
        {selectedTooth && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
            onClick={() => setSelectedTooth(null)}
          >
            <div 
              className="clinical-card shadow-clinical-xl p-6 max-w-md w-full animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Pieza #{selectedTooth.id}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTooth.name}</p>
                </div>
                <button 
                  onClick={() => setSelectedTooth(null)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-16 rounded-xl border-2 ${
                    selectedTooth.condition === "Ausente" 
                      ? "border-primary bg-primary/10" 
                      : "border-success bg-success/10"
                  }`} />
                  <div>
                    <p className="font-medium text-foreground">{selectedTooth.condition}</p>
                    <p className="text-sm text-muted-foreground">{selectedTooth.treatment}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedTooth.details}</p>
                </div>
                
                {selectedTooth.condition === "Ausente" && (
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-primary">Implante recomendado</span>
                    <span className="badge badge-success">Carga inmediata posible</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
