
import React from "react";
import { Button } from "@/components/ui/button";

interface NextButtonProps {
  handleNext: () => void;
  disabled: boolean;
}

export default function NextButton({ handleNext, disabled }: NextButtonProps) {
  return (
    <div className="pb-16">
      <Button
        onClick={handleNext}
        disabled={disabled}
        className="w-full bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white py-3 rounded-xl shadow-glow transition-all duration-300"
      >
        Siguiente
      </Button>
    </div>
  );
}
