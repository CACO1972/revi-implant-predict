
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function NavigationButtons({ 
  onPrevious, 
  onNext, 
  isFirst, 
  isLast 
}: NavigationButtonsProps) {
  return (
    <motion.div 
      className="flex justify-between gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirst}
        className="flex-1 border-white/10 text-white hover:bg-white/5 disabled:opacity-30"
      >
        Anterior
      </Button>
      <Button
        type="button"
        onClick={onNext}
        className="flex-1 bg-gradient-to-r from-[#1EAEDB] to-gold hover:from-[#1EAEDB]/90 hover:to-gold/90 text-white shadow-glow transition-all duration-300"
      >
        {isLast ? "Ver resultados" : "Siguiente"}
      </Button>
    </motion.div>
  );
}
