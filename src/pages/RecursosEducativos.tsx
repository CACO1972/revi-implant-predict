
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, User, Phone, FileText, HelpCircle, CheckCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";

export default function RecursosEducativos() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa tu nombre y email",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    console.log("Suscripción:", { name, email, phone });
    
    toast({
      title: "¡Suscripción exitosa!",
      description: "Te enviaremos el eBook por email en unos minutos",
    });
    
    setSubmitted(true);
  };
  
  const faqData = [
    {
      question: "¿Qué es un implante dental?",
      answer: "Un implante dental es una raíz artificial de titanio que se coloca en el hueso maxilar para reemplazar la raíz de un diente perdido. Sobre él se coloca una corona que simula el diente natural."
    },
    {
      question: "¿Duele el procedimiento de implantes?",
      answer: "El procedimiento se realiza con anestesia local, por lo que no sentirás dolor durante la cirugía. Después puede haber molestias leves que se controlan con analgésicos comunes."
    },
    {
      question: "¿Cuánto dura un implante dental?",
      answer: "Con buen cuidado e higiene, los implantes pueden durar toda la vida. La tasa de éxito es superior al 95% a 10 años."
    },
    {
      question: "¿Puedo hacerme implantes si tengo diabetes?",
      answer: "Sí, siempre que la diabetes esté bien controlada (HbA1c <7%). Es importante informar al dentista para ajustar el plan de tratamiento."
    },
    {
      question: "¿Cuánto tiempo toma el proceso completo?",
      answer: "Depende del caso, pero generalmente entre 3-6 meses. Incluye: colocación del implante, período de cicatrización (osteointegración) y colocación de la corona final."
    },
    {
      question: "¿Los implantes se ven naturales?",
      answer: "Sí, los implantes modernos con coronas de cerámica son prácticamente indistinguibles de los dientes naturales en apariencia y función."
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden">
        <AnimatedStarryBackground />
        
        <div className="mb-6">
          <img 
            src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
            alt="ImplantX Logo"
            className="h-16 w-auto"
          />
        </div>
        
        <motion.div
          className="glass-panel p-8 max-w-lg w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#BFA181] mb-4">
            ¡Suscripción exitosa!
          </h2>
          
          <p className="text-white/80 mb-6">
            Te hemos enviado el eBook "Guía Completa de Implantes Dentales" a tu correo electrónico.
            También recibirás actualizaciones sobre ImplantX.
          </p>
          
          <div className="space-y-3 mb-6">
            <Button
              className="w-full bg-[#BFA181] hover:bg-[#BFA181]/90 text-[#0A1828]"
              onClick={() => window.open('mailto:' + email + '?subject=eBook ImplantX')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Revisar mi email
            </Button>
            
            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              onClick={() => window.open('https://instagram.com/reviveai.cl', '_blank')}
            >
              <Instagram className="w-4 h-4 mr-2" />
              Seguir @reviveai.cl para más contenido
            </Button>
          </div>
          
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </motion.div>
        
        <RioAssistant 
          isVisible={true} 
          message="¡Perfecto! Ya tienes acceso al eBook educativo. Revisa tu email y no olvides seguirnos en Instagram para más contenido valioso sobre salud dental."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden">
      <AnimatedStarryBackground />
      
      {/* Logo pequeño */}
      <div className="mb-6">
        <img 
          src="/lovable-uploads/9befb1bc-2faa-4657-a0d8-af2ef945c433.png"
          alt="ImplantX Logo"
          className="h-16 w-auto"
        />
      </div>
      
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#BFA181]">
            Recursos Educativos
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Descarga nuestro eBook gratuito y resuelve tus dudas sobre implantes dentales
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de suscripción */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#BFA181]/20 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#BFA181]" />
              </div>
              <h2 className="text-xl font-bold text-[#BFA181] mb-2">
                eBook Gratuito
              </h2>
              <p className="text-white/80 text-sm">
                "Guía Completa de Implantes Dentales: Todo lo que necesitas saber"
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">Nombre completo *</Label>
                <div className="relative">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white pl-10"
                    placeholder="Tu nombre"
                    required
                  />
                  <User className="absolute left-3 top-3 h-4 w-4 text-[#BFA181]" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email *</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white pl-10"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#BFA181]" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/80">WhatsApp (opcional)</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/10 border-white/20 text-white pl-10"
                    placeholder="+56 9 1234 5678"
                  />
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-[#BFA181]" />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#BFA181] hover:bg-[#BFA181]/90 text-[#0A1828] font-bold"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar eBook Gratuito
              </Button>
            </form>
            
            <p className="text-xs text-white/50 mt-4 text-center">
              Al suscribirte recibirás contenido educativo valioso sobre salud dental
            </p>
          </motion.div>

          {/* FAQ */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#178582]/20 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-[#178582]" />
              </div>
              <h2 className="text-xl font-bold text-[#178582] mb-2">
                Preguntas Frecuentes
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-2">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-white/10"
                >
                  <AccordionTrigger className="text-white hover:text-[#178582] text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>

        {/* Botón de regreso */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </motion.div>
      </div>
      
      <RioAssistant 
        isVisible={true} 
        message="¡Aquí tienes todo lo que necesitas saber sobre implantes! Descarga el eBook gratuito y revisa las preguntas frecuentes. Si tienes dudas específicas, ¡pregúntame!"
      />
    </div>
  );
}
