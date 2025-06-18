
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface NextButtonProps {
  handleNext: () => void;
  disabled: boolean;
}

export default function NextButton({ handleNext, disabled }: NextButtonProps) {
  return (
    <div className="pb-16">
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
      >
        <Button
          onClick={handleNext}
          disabled={disabled}
          className="w-full bg-gradient-to-r from-[#5BCBFF] to-[#FF8C42] hover:from-[#5BCBFF]/90 hover:to-[#FF8C42]/90 text-white py-4 rounded-xl shadow-glow transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
        >
          <span className="mr-2">Siguiente</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          
          {/* Efecto de brillo al pasar el cursor */}
          <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-45 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
        </Button>
      </motion.div>
    </div>
  );
}
