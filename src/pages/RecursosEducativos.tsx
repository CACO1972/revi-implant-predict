
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, User, Phone, FileText, HelpCircle, CheckCircle, Instagram, ExternalLink, BookOpen } from "lucide-react";
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

  const handleDownloadEbook = () => {
    // Abrir el enlace del eBook en una nueva ventana
    window.open('https://drive.google.com/file/d/1wmC-OtzcZr6HNyqFbZb8iRHtgyrnUnAt/view?usp=drive_link', '_blank');
  };
  
  const faqData = [
    {
      question: "¿Qué es un implante dental y cómo funciona?",
      answer: "Un implante dental es una raíz artificial de titanio que se coloca quirúrgicamente en el hueso maxilar para reemplazar la raíz de un diente perdido. El titanio se integra con el hueso (osteointegración) creando una base sólida para soportar una corona, puente o prótesis dental."
    },
    {
      question: "¿Soy candidato para implantes dentales?",
      answer: "La mayoría de las personas que han perdido uno o más dientes son candidatos para implantes. Los factores clave incluyen: tener suficiente hueso para soportar el implante, encías saludables, buena salud general y no fumar (o estar dispuesto a dejarlo). Una evaluación profesional determinará tu candidatura específica."
    },
    {
      question: "¿Cuánto dura el proceso de implantes?",
      answer: "El proceso completo típicamente toma entre 3-6 meses. Esto incluye: consulta inicial y planificación (1-2 semanas), cirugía de colocación (1 día), período de cicatrización/osteointegración (2-6 meses), y colocación de la corona final (2-3 semanas)."
    },
    {
      question: "¿Duele el procedimiento de implantes?",
      answer: "El procedimiento se realiza con anestesia local, por lo que no sentirás dolor durante la cirugía. Después puede haber molestias leves a moderadas que se controlan efectivamente con analgésicos recetados. La mayoría de pacientes reportan menos dolor del esperado."
    },
    {
      question: "¿Cuánto cuestan los implantes dentales?",
      answer: "El costo varía según múltiples factores: ubicación geográfica, complejidad del caso, materiales utilizados, y tratamientos adicionales necesarios. En Chile, un implante simple puede costar entre $800.000 - $1.500.000 pesos. Es importante considerar que es una inversión a largo plazo en tu salud y calidad de vida."
    },
    {
      question: "¿Qué cuidados requieren los implantes?",
      answer: "Los implantes requieren el mismo cuidado que los dientes naturales: cepillado regular, uso de hilo dental, y visitas periódicas al dentista. También se recomiendan productos específicos para implantes y evitar hábitos como fumar o morder objetos duros."
    },
    {
      question: "¿Pueden fallar los implantes dentales?",
      answer: "La tasa de éxito de los implantes es superior al 95%. Las causas más comunes de falla incluyen: infección, insuficiente osteointegración, sobrecarga, problemas de higiene, o condiciones médicas no controladas. Un buen diagnóstico y seguimiento minimizan estos riesgos."
    },
    {
      question: "¿Puedo hacerme implantes si tengo diabetes u otras condiciones médicas?",
      answer: "Muchas condiciones médicas no impiden los implantes si están bien controladas. La diabetes controlada (HbA1c <7%), hipertensión estable, y otras condiciones manejadas adecuadamente generalmente permiten el tratamiento con implantes, aunque pueden requerir protocolos especiales."
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
            Gracias por suscribirte. Ahora puedes descargar la "Guía Completa de Implantes Dentales" 
            y recibirás actualizaciones valiosas sobre ImplantX.
          </p>
          
          <div className="space-y-3 mb-6">
            <Button
              className="w-full bg-[#BFA181] hover:bg-[#BFA181]/90 text-[#0A1828] font-bold"
              onClick={handleDownloadEbook}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar eBook Ahora
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
          message="¡Perfecto! Ya tienes acceso al eBook educativo. Descárgalo ahora y no olvides seguirnos en Instagram para más contenido valioso sobre salud dental."
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
            Recursos Educativos Gratuitos
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Descarga nuestra guía completa y resuelve todas tus dudas sobre implantes dentales
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de suscripción mejorado */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#BFA181]/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#BFA181]" />
              </div>
              <h2 className="text-xl font-bold text-[#BFA181] mb-2">
                Guía Completa de Implantes Dentales
              </h2>
              <p className="text-white/80 text-sm mb-4">
                Todo lo que necesitas saber antes de decidirte por implantes
              </p>
              
              {/* Contenido del eBook */}
              <div className="bg-white/5 p-4 rounded-lg text-left text-xs text-white/70 mb-4">
                <h4 className="font-semibold text-[#BFA181] mb-2">Contenido incluido:</h4>
                <ul className="space-y-1">
                  <li>• ¿Qué son los implantes dentales?</li>
                  <li>• Proceso paso a paso del tratamiento</li>
                  <li>• Factores de éxito y riesgos</li>
                  <li>• Cuidados pre y post operatorios</li>
                  <li>• Alternativas de tratamiento</li>
                  <li>• Costos y financiamiento</li>
                  <li>• Preguntas frecuentes</li>
                </ul>
              </div>
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
                className="w-full bg-[#BFA181] hover:bg-[#BFA181]/90 text-[#0A1828] font-bold py-3"
              >
                <Download className="w-4 h-4 mr-2" />
                Suscribirse y Descargar Guía
              </Button>
            </form>
            
            <p className="text-xs text-white/50 mt-4 text-center">
              Al suscribirte recibirás contenido educativo valioso sobre salud dental y acceso inmediato a la descarga
            </p>
          </motion.div>

          {/* FAQ expandido */}
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
              <p className="text-white/70 text-sm">
                Respuestas a las dudas más comunes sobre implantes dentales
              </p>
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
                  <AccordionContent className="text-white/80 leading-relaxed text-sm">
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
        message="¡Aquí tienes toda la información que necesitas sobre implantes! Suscríbete para descargar la guía completa y revisa las preguntas frecuentes. Si tienes dudas específicas, ¡pregúntame!"
      />
    </div>
  );
}
