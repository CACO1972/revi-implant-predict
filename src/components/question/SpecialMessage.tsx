
import React from "react";
import { motion } from "framer-motion";

interface SpecialMessageProps {
  questionNumber: number;
}

export default function SpecialMessage({ questionNumber }: SpecialMessageProps) {
  if (questionNumber !== 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="mt-4 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20"
    >
      <p className="text-xs text-yellow-400 text-center">
        💡 Para obtener el mejor resultado, responde lo más verazmente posible
      </p>
    </motion.div>
  );
}
