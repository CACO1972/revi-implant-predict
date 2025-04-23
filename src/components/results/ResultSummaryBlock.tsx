
import { AssessmentResult } from "@/types/implant";

interface ResultSummaryBlockProps {
  result: AssessmentResult;
  getColorByLevel: () => string;
  getBgColorByLevel: () => string;
}

export default function ResultSummaryBlock({
  result,
  getColorByLevel,
  getBgColorByLevel,
}: ResultSummaryBlockProps) {
  return (
    <div className={`p-6 rounded-2xl mb-6 ${getBgColorByLevel()} border border-white/10`}>
      <div className="flex flex-col items-center">
        <div className="text-5xl font-bold mb-3">
          <span className={getColorByLevel()}>{result.totalScore}/16</span>
        </div>
        <h3 className={`text-xl font-semibold mb-1 ${getColorByLevel()}`}>
          Nivel {result.level}: {result.prediction}
        </h3>
      </div>
    </div>
  )
}
