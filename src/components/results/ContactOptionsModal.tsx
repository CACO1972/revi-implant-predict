
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { PatientInfo, AssessmentResult } from "@/types/implant";

interface ContactOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientInfo: PatientInfo;
  result: AssessmentResult;
}

export default function ContactOptionsModal({ 
  isOpen, 
  onClose, 
  patientInfo, 
  result 
}: ContactOptionsModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'whatsapp' | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular envío
    console.log('Enviando análisis completo:', {
      method: selectedMethod,
      email,
      phone,
      patientInfo,
      result
    });
    
    setIsSubmitted(true);
    
    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setSelectedMethod(null);
      setEmail('');
      setPhone('');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-starry border border-white/10 rounded-2xl p-6 max-w-md w-full relative"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10"
          >
            <X size={20} />
          </Button>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                ¡Análisis enviado exitosamente!
              </h3>
              <p className="text-white/70">
                Recibirás tu análisis completo en los próximos minutos.
              </p>
            </motion.div>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-[#BFA181] mb-6">
                Recibe tu análisis completo
              </h3>

              {!selectedMethod ? (
                <div className="space-y-4">
                  <p className="text-white/80 mb-6">
                    Selecciona cómo quieres recibir tu análisis detallado con 
                    recomendaciones específicas y plan de tratamiento personalizado:
                  </p>
                  
                  <Button
                    onClick={() => setSelectedMethod('email')}
                    className="w-full bg-[#178582] hover:bg-[#178582]/90 text-white border border-[#BFA181]/30 h-14"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Enviar por Email</div>
                      <div className="text-xs opacity-80">PDF completo con análisis detallado</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => setSelectedMethod('whatsapp')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-14"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Enviar por WhatsApp</div>
                      <div className="text-xs opacity-80">Resumen interactivo y consultas directas</div>
                    </div>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center mb-4 p-3 bg-white/5 rounded-lg">
                    {selectedMethod === 'email' ? (
                      <>
                        <Mail className="w-5 h-5 text-[#178582] mr-2" />
                        <span className="text-white font-medium">Envío por Email</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-white font-medium">Envío por WhatsApp</span>
                      </>
                    )}
                  </div>

                  {selectedMethod === 'email' ? (
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tucorreo@ejemplo.com"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder-white/40"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">
                        Número de WhatsApp
                      </label>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+56 9 1234 5678"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder-white/40"
                      />
                    </div>
                  )}

                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <p className="text-white/70 text-sm">
                      <strong className="text-white">Incluye:</strong>
                    </p>
                    <ul className="text-white/60 text-xs mt-1 space-y-1">
                      <li>• Análisis clínico detallado personalizado</li>
                      <li>• Plan de tratamiento específico</li>
                      <li>• Cronograma estimado</li>
                      <li>• Recomendaciones pre y post tratamiento</li>
                      <li>• Cotización detallada con opciones de financiamiento</li>
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedMethod(null)}
                      className="flex-1 border-white/20 text-white hover:bg-white/5"
                    >
                      Volver
                    </Button>
                    <Button
                      type="submit"
                      className={`flex-1 text-white ${
                        selectedMethod === 'email' 
                          ? 'bg-[#178582] hover:bg-[#178582]/90' 
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar
                    </Button>
                  </div>
                </form>
              )}
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
