
import { motion } from "framer-motion";
import { MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OdontogramDemoSectionProps {
  onOpenDemo: () => void;
}

export default function OdontogramDemoSection({ onOpenDemo }: OdontogramDemoSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-panel p-8 border border-[#BFA181]/30 bg-gradient-to-b from-[#BFA181]/5 to-transparent">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <MousePointer className="w-8 h-8 text-[#BFA181]" />
          </motion.div>
          <h3 className="text-2xl font-bold text-[#BFA181] font-montserrat">
            Prueba el Odontograma Interactivo
          </h3>
        </div>
        
        <p className="text-white/80 text-lg mb-6">
          Marca los dientes que te faltan y ve una evaluación instantánea
        </p>
        
        <Button
          onClick={onOpenDemo}
          size="lg"
          className="bg-gradient-to-r from-[#BFA181] to-[#D4BC9A] hover:from-[#D4BC9A] hover:to-[#BFA181] text-[#040D18] font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(191,161,129,0.4)] border-2 border-[#BFA181]/30 transform hover:scale-105 transition-all duration-300"
        >
          <MousePointer className="w-5 h-5 mr-2" />
          Probar Demo Interactiva
        </Button>
        
        <p className="text-[#BFA181]/60 text-xs mt-3">
          ✨ Solo toma 30 segundos probar
        </p>
      </div>
    </motion.div>
  );
}
