
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Instagram, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RioAssistant from "@/components/RioAssistant";

export default function SubscriptionSuccessScreen() {
  const navigate = useNavigate();

  const handleDownloadEbook = () => {
    // Abrir el enlace del eBook en una nueva ventana
    window.open('https://drive.google.com/file/d/1wmC-OtzcZr6HNyqFbZb8iRHtgyrnUnAt/view?usp=drive_link', '_blank');
  };

  return (
    <>
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
    </>
  );
}
