
import { AssessmentResult } from "@/types/implant";

interface RecommendationListProps {
  recommendations: string[];
}

export default function RecommendationList({ recommendations }: RecommendationListProps) {
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-gold mb-3">Recomendaciones personalizadas:</h4>
      <ul className="list-disc pl-5 space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="text-white/80 font-light">{rec}</li>
        ))}
      </ul>
    </div>
  )
}
