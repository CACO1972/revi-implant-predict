
import { AssessmentResult } from "@/types/implant";
import { motion } from "framer-motion";

interface RecommendationListProps {
  recommendations: string[];
}

export default function RecommendationList({ recommendations }: RecommendationListProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-6"
    >
      <h4 className="font-semibold text-[#1EAEDB] mb-3">Recomendaciones personalizadas:</h4>
      <ul className="list-disc pl-5 space-y-2">
        {recommendations.map((rec, index) => (
          <motion.li 
            key={index} 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
            className="text-white/80 font-light"
          >
            {rec}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
