
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Mail, MessageCircle, FileText, Calendar } from 'lucide-react';
import TreatmentAlternatives from './TreatmentAlternatives';
import CostBreakdown from './CostBreakdown';
import ContactOptionsModal from './ContactOptionsModal';
import { PatientInfo, AssessmentResult } from "@/types/implant";

interface TreatmentSummaryScreenProps {
  patientInfo: PatientInfo;
  result: AssessmentResult;
  onBack: () => void;
}

export default function TreatmentSummaryScreen({ 
  patientInfo, 
  result, 
  onBack 
}: TreatmentSummaryScreenProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  const getColorByLevel = () => {
    switch (result.level) {
      case 1: return "text-emerald-400";
      case 2: return "text-[#178582]";
      case 3: return "text-[#BFA181]";
      case 4: return "text-red-400";
      default: return "text-[#178582]";
    }
  };

  const getBgColorByLevel = () => {
    switch (result.level) {
      case 1: return "bg-emerald-400/10";
      case 2: return "bg-[#178582]/10";
      case 3: return "bg-[#BFA181]/10";
      case 4: return "bg-red-400/10";
      default: return "bg-[#178582]/10";
    }
  };

  const getAnalysisSummary = () => {
    switch (result.level) {
      case 1:
        return "Tu perfil clínico presenta condiciones óptimas para implantes dentales. Los factores de éxito están alineados y el pronóstico es excelente.";
      case 2:
        return "Presentas buenas condiciones para implantes dentales con algunos factores menores a considerar. El pronóstico es muy favorable.";
      case 3:
        return "Tu evaluación muestra factores que requieren optimización antes del tratamiento para asegurar el mejor resultado posible.";
      case 4:
        return "Se han identificado varios factores importantes que necesitan ser abordados antes de considerar el tratamiento con implantes.";
      default:
        return "Requiere evaluación profesional personalizada para determinar el mejor plan de tratamiento.";
    }
  };

  return (
    <div className="min-h-screen bg-starry px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-6"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold text-[#BFA181]">
            Resumen de Análisis Clínico
          </h1>
        </motion.div>

        {/* Patient Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${getBgColorByLevel()} rounded-2xl p-6 mb-6 border border-white/10`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">
                {patientInfo.name}
              </h2>
              <p className="text-white/70 text-sm">{patientInfo.age} años</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getColorByLevel()} mb-1`}>
                Nivel {result.level}
              </div>
              <p className="text-white/80 text-sm">{result.totalScore}/16 puntos</p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-4">
            <h3 className="font-semibold text-white mb-2">Análisis Personalizado:</h3>
            <p className="text-white/85 leading-relaxed">
              {getAnalysisSummary()}
            </p>
          </div>
        </motion.div>

        {/* Treatment Alternatives */}
        <TreatmentAlternatives level={result.level} />

        {/* Cost Breakdown */}
        <CostBreakdown level={result.level} />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-[#BFA181] mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Obtén tu análisis completo
          </h3>
          <p className="text-white/80 mb-6 leading-relaxed">
            Recibe un informe detallado con recomendaciones específicas, plan de tratamiento 
            personalizado y cronograma estimado directamente en tu email o WhatsApp.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={() => setShowContactModal(true)}
              className="bg-[#178582] hover:bg-[#178582]/90 text-white border border-[#BFA181]/30"
            >
              <Mail className="w-5 h-5 mr-2" />
              Enviar por Email
            </Button>
            <Button
              onClick={() => setShowContactModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Enviar por WhatsApp
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              className="w-full border-[#BFA181]/30 text-[#BFA181] hover:bg-[#BFA181]/10"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar consulta personalizada
            </Button>
          </div>
        </motion.div>

        {/* Contact Modal */}
        <ContactOptionsModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          patientInfo={patientInfo}
          result={result}
        />
      </div>
    </div>
  );
}
