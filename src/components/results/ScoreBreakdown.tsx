
import { motion } from "framer-motion";

interface Factor {
  name: string;
  score: number;
}

interface ScoreBreakdownProps {
  factors: Factor[];
}

export default function ScoreBreakdown({ factors }: ScoreBreakdownProps) {
  return (
    <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
      <h3 className="text-lg font-medium text-gold mb-3">Factores considerados:</h3>
      <div className="space-y-2">
        {factors.map((factor, index) => (
          <motion.div
            key={factor.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center"
          >
            <span className="text-white/80">{factor.name}</span>
            <span className={`font-medium ${factor.score > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {factor.score > 0 ? '+' : ''}{factor.score}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
