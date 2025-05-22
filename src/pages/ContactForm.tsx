
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Send,
  FileText,
  Sparkles,
  Check,
  XCircle,
  MapPin,
  User,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import AnimatedStarryBackground from "@/components/AnimatedStarryBackground";
import RioAssistant from "@/components/RioAssistant";
import { PatientInfo } from "@/types/implant";

export default function ContactForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ name: "", age: null });
  const [result, setResult] = useState<any>(null);
  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [wantContact, setWantContact] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    // Load patient info and result from sessionStorage
    const storedPatientInfo = sessionStorage.getItem('patientInfo');
    const storedResult = sessionStorage.getItem('result');
    
    if (storedPatientInfo) {
      const info = JSON.parse(storedPatientInfo);
      setPatientInfo(info);
      
      // Pre-fill message with patient info
      setMessage(`Hola, soy ${info.name} y he completado mi evaluación ImplantX. Me gustaría recibir más información sobre opciones de tratamiento con implantes dentales.`);
    }
    
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const validatePhone = (phone: string) => {
    return /^\+?[0-9]{8,15}$/.test(phone);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateEmail(email)) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa un correo electrónico válido",
        variant: "destructive"
      });
      return;
    }
    
    if (!validatePhone(phone)) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa un número de teléfono válido",
        variant: "destructive"
      });
      return;
    }
    
    if (!location) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa tu comuna o ciudad",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    console.log("Enviando datos:", {
      name: patientInfo.name,
      email,
      phone,
      location,
      message,
      wantContact
    });
    
    // Show success message
    toast({
      title: "Formulario enviado",
      description: "¡Gracias! Hemos recibido tu solicitud.",
    });
    
    // Mark as submitted
    setSubmitted(true);
  };
  
  if (submitted) {
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
        
        <motion.div
          className="glass-panel p-8 max-w-lg w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#BFA181] mb-4">
            ¡Formulario enviado con éxito!
          </h2>
          
          <p className="text-white/80 mb-6">
            Gracias por completar tu evaluación con ImplantX. Hemos enviado una copia de tu informe
            al correo electrónico proporcionado.
          </p>
          
          <div className="mb-6">
            <Button
              className="w-full mb-3 bg-[#BFA181] hover:bg-[#BFA181]/90 text-[#0A1828]"
            >
              <FileText className="w-4 h-4 mr-2" />
              Descargar informe PDF
            </Button>
            
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => window.open(`https://wa.me/?text=He completado mi evaluación de ImplantX. Mi nivel predictivo es: ${result?.level} - ${result?.prediction}`)}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Compartir por WhatsApp
            </Button>
          </div>
          
          <div className="text-center">
            <h3 className="text-[#178582] font-semibold text-lg mb-2">¿Y ahora qué sigue?</h3>
            <p className="text-white/80 text-sm mb-4">
              {wantContact ? 
                "Un especialista dental se pondrá en contacto contigo en los próximos días para resolver tus dudas y programar una evaluación clínica completa." :
                "Puedes usar tu informe para discutir opciones de tratamiento con cualquier especialista dental. Recuerda mostrarle tu informe ImplantX."}
            </p>
            
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </div>
        </motion.div>
        
        <RioAssistant 
          isVisible={true} 
          message="¡Excelente! Tu informe ya está listo y ha sido enviado. No dudes en compartirlo con tu dentista para una evaluación más detallada. ¡Te deseo mucho éxito en tu tratamiento!"
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
      
      <motion.div
        className="glass-panel p-6 max-w-xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#BFA181] mb-2">
            Solicitar mi informe clínico
          </h2>
          
          <p className="text-white/80">
            Completa tus datos para recibir el informe detallado de tu evaluación.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/80">Nombre</Label>
            <div className="relative">
              <Input
                id="name"
                value={patientInfo.name}
                readOnly
                className="bg-white/10 border-white/20 text-white pl-10"
              />
              <User className="absolute left-3 top-3 h-4 w-4 text-[#178582]" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Correo electrónico</Label>
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
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#178582]" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white/80">WhatsApp</Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/10 border-white/20 text-white pl-10"
                placeholder="+56 9 1234 5678"
                required
              />
              <Phone className="absolute left-3 top-3 h-4 w-4 text-[#178582]" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-white/80">Comuna / Ciudad</Label>
            <div className="relative">
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white/10 border-white/20 text-white pl-10"
                placeholder="Ej: Las Condes, Santiago"
                required
              />
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#178582]" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white/80">Mensaje (opcional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/10 border-white/20 text-white min-h-[100px]"
              placeholder="¿Tienes alguna consulta o petición específica?"
            />
          </div>
          
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="contact"
              checked={wantContact}
              onCheckedChange={(checked) => setWantContact(checked === true)}
              className="data-[state=checked]:bg-[#178582]"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="contact"
                className="text-sm text-white cursor-pointer"
              >
                Deseo ser contactado por un dentista de la red ImplantX
              </Label>
              <p className="text-xs text-white/60">
                Un especialista se pondrá en contacto contigo para resolver tus dudas
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 mt-2 text-xs text-white/60 italic">
            Al enviar este formulario, aceptas recibir comunicaciones relacionadas con tu evaluación dental.
            Tus datos serán tratados conforme a nuestra política de privacidad.
          </div>
          
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              className="text-white border-white/20 hover:bg-white/5"
              onClick={() => navigate('/resultados')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            
            <Button
              type="submit"
              className="bg-[#178582] hover:bg-[#178582]/90 text-white shadow-glow transition-all duration-300"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar y recibir informe
            </Button>
          </div>
        </form>
      </motion.div>
      
      <RioAssistant 
        isVisible={true} 
        message="¡Casi terminamos! Al completar este formulario recibirás un informe detallado que podrás compartir con especialistas. También puedes solicitar que un dentista de nuestra red te contacte."
      />
    </div>
  );
}
