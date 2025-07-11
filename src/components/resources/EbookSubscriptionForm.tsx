
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, User, Phone, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EbookSubscriptionFormProps {
  onSubmitSuccess: () => void;
}

export default function EbookSubscriptionForm({ onSubmitSuccess }: EbookSubscriptionFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
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
    
    onSubmitSuccess();
  };

  return (
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
  );
}
