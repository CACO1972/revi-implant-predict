
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface RecommendationBoxProps {
  recommendation: string;
}

export default function RecommendationBox({ recommendation }: RecommendationBoxProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-2 mb-6 p-4 bg-gradient-to-r from-[#1EAEDB]/5 to-gold/5 rounded-xl border border-white/5"
    >
      <div className="flex">
        <div className="mr-3 mt-1">
          <Sparkles className="w-4 h-4 text-gold animate-pulse" />
        </div>
        <p className="text-sm text-white/80 font-light">
          <span className="font-medium text-[#1EAEDB]">Recomendación: </span>
          {recommendation}
        </p>
      </div>
    </motion.div>
  );
}
